"""Load and format public repository metadata from GitHub."""

from __future__ import annotations

import os
from typing import Any

import httpx


GITHUB_USERS = ("AbdullahArif17", "abdullahh-dev")
GITHUB_API_URL = "https://api.github.com"


class GitHubLoaderError(RuntimeError):
    """Raised when repository metadata cannot be loaded."""


def _headers() -> dict[str, str]:
    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "abdullah-portfolio-rag",
    }
    token = os.getenv("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"
    return headers


def _fetch_user_repositories(
    client: httpx.Client,
    username: str,
) -> list[dict[str, Any]]:
    repositories: list[dict[str, Any]] = []

    for page in range(1, 11):
        response = client.get(
            f"{GITHUB_API_URL}/users/{username}/repos",
            params={
                "per_page": 100,
                "page": page,
                "sort": "updated",
                "direction": "desc",
                "type": "owner",
            },
        )
        response.raise_for_status()
        batch = response.json()
        if not isinstance(batch, list):
            raise GitHubLoaderError(
                f"GitHub returned an unexpected response for {username}."
            )

        repositories.extend(repo for repo in batch if isinstance(repo, dict))
        if len(batch) < 100:
            break

    return repositories


def _prefer_repository(
    current: dict[str, Any],
    candidate: dict[str, Any],
) -> dict[str, Any]:
    """Keep the most recently pushed copy when both accounts share a repo name."""
    current_date = str(current.get("pushed_at") or current.get("updated_at") or "")
    candidate_date = str(candidate.get("pushed_at") or candidate.get("updated_at") or "")
    return candidate if candidate_date > current_date else current


def _format_repository(repository: dict[str, Any]) -> str:
    topics = repository.get("topics")
    topic_text = ", ".join(str(topic) for topic in topics) if topics else "None listed"
    owner = repository.get("owner") or {}

    return "\n".join(
        [
            f"GitHub repository: {repository.get('name', 'Unnamed repository')}",
            f"Owner: {owner.get('login', 'Unknown') if isinstance(owner, dict) else 'Unknown'}",
            f"Description: {repository.get('description') or 'No description provided'}",
            f"Primary language: {repository.get('language') or 'Not specified'}",
            f"Stars: {repository.get('stargazers_count') or 0}",
            f"Topics: {topic_text}",
            f"URL: {repository.get('html_url') or ''}",
        ]
    )


def load_github_documents() -> list[str]:
    """Fetch both GitHub accounts and return one text document per unique repo name."""
    deduplicated: dict[str, dict[str, Any]] = {}

    try:
        with httpx.Client(timeout=20.0, headers=_headers(), follow_redirects=True) as client:
            for username in GITHUB_USERS:
                for repository in _fetch_user_repositories(client, username):
                    name = str(repository.get("name") or "").strip()
                    if not name:
                        continue

                    key = name.casefold()
                    if key in deduplicated:
                        deduplicated[key] = _prefer_repository(
                            deduplicated[key], repository
                        )
                    else:
                        deduplicated[key] = repository
    except (httpx.HTTPError, ValueError) as exc:
        raise GitHubLoaderError("Unable to fetch Abdullah's GitHub repositories.") from exc

    return [
        _format_repository(repository)
        for _, repository in sorted(
            deduplicated.items(), key=lambda item: item[0]
        )
    ]
