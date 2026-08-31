# GitHub Prep — Static Site Repo (outreach / debate / FL)

Research only. No repo created, nothing pushed, nothing committed.

Date: 2026-08-31

## 1. GitHub CLI auth
- `gh` installed and authenticated: **yes** (`gh version 2.98.0`)
- Account: **13bravoopsec333** (logged in via keyring, HTTPS protocol)
- Token scopes: `gist`, `read:org`, `repo`, `workflow` → sufficient to create repos and push. (No `delete_repo` scope.)
- Active account: true

## 2. Git identity
- `user.name` — **NOT SET**
- `user.email` — **NOT SET**
- Global git config has no identity. Will need `git config` (local to repo or global) before the first commit. Left unchanged as instructed.

## 3. Existing repos (13bravoopsec333)
Listed via `gh repo list --limit 20` (5 total):
- `13bravoopsec333/ivy-admissions-agent` (public)
- `13bravoopsec333/androbase` (private)
- `13bravoopsec333/13bravoopsec333.github.io` (public) — **the user site is already taken** (Velocity PWA)
- `13bravoopsec333/brewsters-bar-site` (public)
- `13bravoopsec333/ar-research` (public)

No existing repos match "outreach", "debate", or "fl". Name is free.

## 4. Tooling
- `git` — /usr/bin/git, version 2.55.0
- `gh` — /usr/bin/gh, version 2.98.0 (2026-08-21)
- `node` — v26.7.0
- `npm` — 12.0.2
- `python3` — Python 3.14.6

All present. Plain static HTML/CSS/JS needs no framework; any of the above can serve it locally (e.g. `python3 -m http.server`).

## 5. GitHub Pages hosting
- GitHub Pages is **free for public repos** on this account (free plan, public repo). Works for static HTML/CSS/JS, no build step needed — just enable Pages and point at the repo's root (or `/docs`).
- Naming convention:
  - `username.github.io` = user site. **Already used** (`13bravoopsec333.github.io` → Velocity). Do NOT reuse this name.
  - Project repo `outreach-debate-fl` with Pages enabled → served at `https://13bravoopsec333.github.io/outreach-debate-fl/`
  - Alternative: name the repo `outreach-debate-fl.github.io` → served at `https://outreach-debate-fl.github.io/`. Works, but not recommended; use the plain `outreach-debate-fl` name + project Pages URL.
- Recommend: **public repo named `outreach-debate-fl`**, enable Pages from main branch root, deploy at `https://13bravoopsec333.github.io/outreach-debate-fl/`.

## 6. Local workspace
- `~/Opencode/` exists, owned by `alex`, **writable**.
- New project dir `~/Opencode/outreach-debate-fl/` created for this report.
- Repo checkout should live at `~/Opencode/outreach-debate-fl/` per the global workspace rule.

## Pre-push checklist (for later)
1. Set git identity (repo-local): `git config user.name "..."` / `git config user.email "..."`
2. `gh repo create outreach-debate-fl --public` (or push to existing)
3. Enable Pages: repo → Settings → Pages → Deploy from branch (main, root)