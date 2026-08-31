# Instagram extraction notes — @outreachdebate.fl

Generated: 2026-08-31

## Method that worked

Method 4 (out of the prescribed chain): the public profile GraphQL endpoint
`https://i.instagram.com/api/v1/users/web_profile_info/?username=outreachdebate.fl`

- The r.jina.ai reader (method 1) returned `403 AbuseAlleviationError` (anonymous
  access to instagram.com blocked for suspected DDoS).
- `~/Opencode/tools/fetchmd.py` (method 1) returned HTTP 200 but only the
  login-wall shell: profile summary + the 3 post cards (alt text + `s640x640`
  cover images). No `__additionalDataLoaded` / `edge_owner_to_timeline_media` /
  `display_url` embedded JSON server-side.
- Crawl4AI JS render (method 2) loaded the same login-wall shell — no embedded
  JSON; profile grid (3 post cards) was present in the DOM.
- Mirrors (method 3): imginn.com and pixwox.com both 403 / Cloudflare-blocked;
  Wayback Machine had no snapshots of the profile or any of the posts; websearch
  found no mirror content for this account.

Key trick: the GraphQL endpoint required a browser User-Agent AND the header
`x-ig-app-id: 936619743392459`. Without the header it returned
`{"message":"useragent mismatch"}`; with it, a clean JSON profile with
`edge_owner_to_timeline_media` (captions, ISO timestamps, `p1080x1080` display
URLs) was returned. No auth/credentials used.

## Results

- Posts extracted: **3** (the account has exactly 3 posts; the "last ~9" was
  capped by the profile). Newest first:
  1. `DcruF2VlMlG` — 2026-08-30 (mentorship program announcement)
  2. `DbROXZ3FMMT` — 2026-07-26 (FL leadership board intro)
  3. `Da9UMl2jZNt` — 2026-07-19 (welcome post)
- Timestamps are real `taken_at_timestamp` epoch values (UTC ISO), not the
  display dates scraped from alt text.
- Captions are the true post captions from `edge_media_to_caption`, collapsed to
  a single trimmed line (newlines → spaces).

## Images

Downloaded all 3 with curl (-L, browser UA, >=3s between requests):

| shortcode | local file | size | dims |
|---|---|---|---|
| DcruF2VlMlG | assets/instagram/DcruF2VlMlG.jpg | 159 KB | 1080x1350 |
| DbROXZ3FMMT | assets/instagram/DbROXZ3FMMT.jpg | 174 KB | 1080x1350 |
| Da9UMl2jZNt | assets/instagram/Da9UMl2jZNt.jpg | 67 KB | 1080x1356 |

All verified as progressive JPEG (JFIF 1.01).

## Caveats

- All 3 posts are carousels; the downloaded image is the carousel cover
  (`display_url`), not each slide.
- Profile pic URL in posts.json is the `s320x320` HD variant of the avatar.
- `profile_pic`, `bio`, and `posts[*].local` are populated; no failures.
- Instagram login-wall pages still render 3 post cards in HTML, but that HTML
  lacks clean captions/timestamps — the GraphQL endpoint was strictly better.