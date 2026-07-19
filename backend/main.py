"""FastAPI entrypoint for Abdullah's portfolio chat RAG service."""

from __future__ import annotations

import os
import secrets
from typing import Annotated, Literal

from dotenv import load_dotenv
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel, Field

from gemini_client import (
    GeminiConfigurationError,
    generate_reply,
    get_guardrail_reply,
)
from github_loader import GitHubLoaderError, load_github_documents
from rag import RagConfigurationError, ingest_documents, retrieve_context


load_dotenv()

app = FastAPI(
    title="Abdullah Portfolio Chat API",
    description="RAG API grounded in Abdullah's CV and public GitHub repositories.",
    version="1.0.0",
)


class HistoryMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=2_000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2_000)
    history: list[HistoryMessage] = Field(default_factory=list, max_length=20)


class ChatResponse(BaseModel):
    reply: str


class IngestRequest(BaseModel):
    source: Literal["cv", "github"]
    content: str | None = None


class IngestResponse(BaseModel):
    source: Literal["cv", "github"]
    chunks_upserted: int


def _build_search_query(message: str, history: list[HistoryMessage]) -> str:
    """Include recent user turns so short follow-ups retrieve the right context."""
    recent_user_messages = [
        item.content.strip()[:1_000]
        for item in history
        if item.role == "user" and item.content.strip()
    ][-2:]

    parts: list[str] = []
    seen: set[str] = set()
    for part in [*recent_user_messages, message]:
        key = part.casefold()
        if key not in seen:
            parts.append(part)
            seen.add(key)
    return "\n".join(parts)


def _authorize_ingestion(x_ingest_key: str | None) -> None:
    configured_key = os.getenv("INGEST_API_KEY")
    if configured_key and (
        not x_ingest_key or not secrets.compare_digest(configured_key, x_ingest_key)
    ):
        raise HTTPException(status_code=401, detail="Invalid ingestion key.")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/ingest", response_model=IngestResponse)
def ingest(
    request: IngestRequest,
    x_ingest_key: Annotated[str | None, Header()] = None,
) -> IngestResponse:
    _authorize_ingestion(x_ingest_key)

    try:
        if request.source == "cv":
            content = (request.content or "").strip()
            if not content:
                raise HTTPException(
                    status_code=400,
                    detail="content is required when source is 'cv'.",
                )
            documents = [content]
        else:
            documents = load_github_documents()

        count = ingest_documents(documents, request.source)
        return IngestResponse(source=request.source, chunks_upserted=count)
    except HTTPException:
        raise
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except RagConfigurationError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except GitHubLoaderError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Ingestion failed.") from exc


@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    message = request.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail="message cannot be blank.")

    guardrail_reply = get_guardrail_reply(message)
    if guardrail_reply:
        return ChatResponse(reply=guardrail_reply)

    try:
        search_query = _build_search_query(message, request.history)
        context = retrieve_context(search_query, limit=5)
        history = [item.model_dump() for item in request.history]
        reply = generate_reply(message, history, context)
        return ChatResponse(reply=reply)
    except (RagConfigurationError, GeminiConfigurationError) as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=502,
            detail="The AI assistant could not generate a response.",
        ) from exc
