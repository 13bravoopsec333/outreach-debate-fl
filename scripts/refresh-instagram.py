#!/usr/bin/env python3
"""Refresh Outreach Debate Florida's Instagram feed data.

Fetches recent posts from the public profile and regenerates data/posts.json
plus local thumbnails in assets/instagram/. Run from the repo root:

    python3 scripts/refresh-instagram.py

Uses Instagram's public GraphQL web_profile_info endpoint with a browser UA —
no login, no API key. If Instagram changes/block it, the script exits non-zero
and leaves the existing posts.json untouched.
"""

from __future__ import annotations

import json
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

USERNAME = "outreachdebate.fl"
ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "posts.json"
IMG_DIR = ROOT / "assets" / "instagram"
MAX_POSTS = 9
APP_ID = "936619743392459"

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)


def fetch(url: str, headers: dict[str, str] | None = None, attempts: int = 3) -> bytes:
    last: Exception | None = None
    for i in range(attempts):
        try:
            req = urllib.request.Request(
                url,
                headers={
                    "User-Agent": UA,
                    "Accept": "*/*",
                    "Accept-Language": "en-US,en;q=0.9",
                    **(headers or {}),
                },
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read()
        except urllib.error.HTTPError as exc:
            last = exc
            if exc.code == 429 and i < attempts - 1:
                time.sleep(2 ** (i + 1) * 2)
            else:
                raise
        except Exception as exc:
            last = exc
            if i < attempts - 1:
                time.sleep(2)
    raise last if last else RuntimeError("fetch failed")


def api_endpoint() -> str:
    qs = urllib.parse.urlencode({"username": USERNAME})
    return f"https://i.instagram.com/api/v1/users/web_profile_info/?{qs}"


def download_image(url: str, dest: Path) -> bool:
    if dest.exists():
        return True
    try:
        data = fetch(url, {"Referer": "https://www.instagram.com/"})
    except Exception:
        return False
    if len(data) < 1024:
        return False
    if data[:3] == b"\xff\xd8\xff" or data[:4] == b"\x89PNG":
        dest.write_bytes(data)
        return True
    return False


def main() -> int:
    try:
        body = fetch(api_endpoint(), {"X-IG-App-ID": APP_ID})
        info = json.loads(body.decode("utf-8", "ignore"))
    except Exception as exc:
        print(f"[refresh] failed: {exc}", file=sys.stderr)
        return 1

    user = info["data"]["user"]
    edges = user["edge_owner_to_timeline_media"]["edges"][:MAX_POSTS]

    posts = []
    for edge in edges:
        node = edge["node"]
        shortcode = node["shortcode"]
        caption = ""
        if node.get("edge_media_to_caption", {}).get("edges"):
            caption = (
                node["edge_media_to_caption"]["edges"][0]["node"].get("text", "") or ""
            )
        caption = re.sub(r"\s+", " ", caption).strip()

        ts = node.get("taken_at_timestamp")
        ts_iso = datetime.fromtimestamp(ts, tz=timezone.utc).isoformat() if ts else None

        local = None
        dest = IMG_DIR / f"{shortcode}.jpg"
        if download_image(node.get("display_url", ""), dest):
            local = f"assets/instagram/{shortcode}.jpg"

        posts.append(
            {
                "shortcode": shortcode,
                "image_url": node.get("display_url", ""),
                "caption": caption,
                "timestamp": ts_iso,
                "permalink": f"https://www.instagram.com/p/{shortcode}/",
                "local": local,
            }
        )

    payload = {
        "username": user.get("username", USERNAME),
        "profile_pic": user.get("profile_pic_url_hd") or user.get("profile_pic_url"),
        "bio": user.get("biography"),
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "posts": posts,
    }

    DATA.parent.mkdir(parents=True, exist_ok=True)
    DATA.write_text(json.dumps(payload, indent=2, ensure_ascii=False))
    print(f"[refresh] wrote {len(posts)} posts to {DATA}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
