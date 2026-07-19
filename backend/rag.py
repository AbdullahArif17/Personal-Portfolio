"""Chunking, ingestion, and retrieval for the Upstash-backed portfolio RAG system."""

from __future__ import annotations

import os
from functools import lru_cache
from typing import Iterable, Literal

import tiktoken
from upstash_vector import Index
from upstash_vector.types import Data


SOURCES: tuple[Literal["cv", "github"], ...] = ("cv", "github")
CHUNK_SIZE = 300
CHUNK_OVERLAP = 50
RANGE_PAGE_SIZE = 1_000


class RagConfigurationError(RuntimeError):
    """Raised when Upstash Vector is not configured."""


@lru_cache(maxsize=1)
def _tokenizer():
    # text-embedding-3-small uses the cl100k_base tokenizer family.
    return tiktoken.get_encoding("cl100k_base")


@lru_cache(maxsize=1)
def _index() -> Index:
    url = os.getenv("UPSTASH_VECTOR_REST_URL")
    token = os.getenv("UPSTASH_VECTOR_REST_TOKEN")
    if not url or not token:
        raise RagConfigurationError(
            "UPSTASH_VECTOR_REST_URL and UPSTASH_VECTOR_REST_TOKEN "
            "must both be configured."
        )
    return Index(url=url, token=token)


def chunk_text(text: str) -> list[str]:
    """Split text into 300-token chunks with a 50-token overlap."""
    normalized = " ".join(text.split())
    if not normalized:
        return []

    tokenizer = _tokenizer()
    token_ids = tokenizer.encode(normalized)
    step = CHUNK_SIZE - CHUNK_OVERLAP
    chunks: list[str] = []

    for start in range(0, len(token_ids), step):
        chunk_ids = token_ids[start : start + CHUNK_SIZE]
        if not chunk_ids:
            break

        chunk = tokenizer.decode(chunk_ids).strip()
        if chunk:
            chunks.append(chunk)
        if start + CHUNK_SIZE >= len(token_ids):
            break

    return chunks


def _existing_ids(namespace: str) -> set[str]:
    index = _index()
    if namespace not in set(index.list_namespaces()):
        return set()

    ids: set[str] = set()
    cursor = ""

    while True:
        page = index.range(
            cursor=cursor,
            limit=RANGE_PAGE_SIZE,
            include_vectors=False,
            include_metadata=False,
            include_data=False,
            namespace=namespace,
        )
        ids.update(str(vector.id) for vector in page.vectors)
        cursor = page.next_cursor
        if not cursor:
            return ids


def ingest_documents(
    documents: Iterable[str],
    source: Literal["cv", "github"],
) -> int:
    """Replace one source namespace without disturbing the other source."""
    chunks = [
        chunk
        for document in documents
        for chunk in chunk_text(document)
    ]
    if not chunks:
        raise ValueError("No non-empty content was available to ingest.")

    existing_ids = _existing_ids(source)
    records = [
        Data(
            id=f"{source}:{index}",
            data=chunk,
            metadata={"source": source, "chunk_index": index},
        )
        for index, chunk in enumerate(chunks)
    ]

    index = _index()
    index.upsert(vectors=records, namespace=source)

    current_ids = {str(record.id) for record in records}
    stale_ids = sorted(existing_ids - current_ids)
    if stale_ids:
        index.delete(ids=stale_ids, namespace=source)

    return len(records)


def retrieve_context(message: str, limit: int = 5) -> list[str]:
    """Return the best matching chunks across the CV and GitHub namespaces."""
    index = _index()
    available_namespaces = set(index.list_namespaces())
    matches: list[tuple[float, str]] = []

    for source in SOURCES:
        if source not in available_namespaces:
            continue

        results = index.query(
            data=message,
            top_k=limit,
            include_vectors=False,
            include_metadata=False,
            include_data=True,
            namespace=source,
        )
        for result in results:
            if isinstance(result.data, str) and result.data.strip():
                matches.append((float(result.score), result.data.strip()))

    matches.sort(key=lambda match: match[0], reverse=True)
    return [text for _, text in matches[:limit]]
