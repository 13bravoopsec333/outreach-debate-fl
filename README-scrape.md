# Outreach Debate Florida — Scrape Summary

Scraped: 2026-08-31. Source: https://outreachdebatefl.framer.website/ (Framer site, site ID 6Ng6vUEyQxrlUCPhqbuxg2).

## Page count: 2

| Slug | URL | Title |
|------|-----|-------|
| `/` (index) | https://outreachdebatefl.framer.website/ | Outreach Debate Florida |
| `/mentor-program` | https://outreachdebatefl.framer.website/mentor-program | Mentor Program — Outreach Debate Florida |

## How the page set was determined

- `robots.txt` allows full crawling; it exposes `sitemap.xml`, which lists exactly these 2 URLs.
- The homepage HTML only links to `/mentor-program` plus in-page anchors (`/#scholarship`).
- Probed 12 common slugs (about, contact, tournaments, programs, scholarship, team, apply, donate, community, news, blog, faq) — all return 404.
- Framer's per-page search-index JSON (`searchIndex-*.json`) confirms the same 2 routes with full text content.

## Site structure

Single-page-style marketing site with a two-page surface:

- **Navigation (both pages):** `OUTREACH DEBATE FL` logo → `/`, `Home` → `/`, `Mentor Program` → `/mentor-program`, `Scholarship` → `/#scholarship`.
- **Home (`/`):**
  - Hero: "Every Florida student deserves a seat at the table." + tagline + "Learn More" button → `/#scholarship`.
  - **Orange Blossom Scholarship** section — a scholarship for Florida students (tournament fees, travel, coaching, research). Badge: "Application Coming Soon".
  - "Access changes the conversation." / "COMING SOON" section describing the mission (critical thinking, research fluency, confidence).
- **Mentor Program (`/mentor-program`):**
  - Hero: "Your next round starts with a mentor in your corner." + **"Apply for a mentor"** button.
  - "A match built for your goals." / "Better preparation. Braver voices." sections.
  - "THREE WAYS TO GROW": Case development, Speaking drills, Advanced debate.
  - "READY TO GET STARTED?" → **"Open the application"** button.
  - "WHAT HAPPENS AFTER YOU APPLY" section.
- **Footer (both pages):** `OUTREACH / DEBATE / FLORIDA`, links Mentor Program, Scholarships, and a **Contact label that has no URL** (dead text — worth fixing in rebuild). Social: Instagram `https://www.instagram.com/outreachdebate.fl/`, YouTube `https://www.youtube.com/@outreachdebate`.

## Forms

One external form: **Google Form** (mentor application), linked from both "Apply for a mentor" and "Open the application" buttons:
`https://docs.google.com/forms/d/e/1FAIpQLSeQl3MDoxXcfdM1gK86OGTmhlUQ4IDT9byaoDeiJ93dtXHfgA/viewform?usp=header`

No newsletter signup, no contact form, no email address anywhere on the site.

## Content quirks / noteworthy

1. **No event list, no dates/venues** — no tournaments, no calendar. The site is promotional/scholarship only.
2. **No email contact** — the only outreach channels are Instagram and YouTube.
3. **"Contact" footer label has no link** (both pages).
4. The `/mentor-program` page's rendered text was missed by plain extraction (trafilatura returned Framer's empty-page placeholder) but the raw HTML and Framer search-index JSON both contain the full copy — the page markdown was reconstructed from the raw HTML text layer, cross-checked against the search index.
5. Scholarship is explicitly **"COMING SOON" / "Application Coming Soon"** — the scholarship page/app is not yet live.

## Files in this folder

- `homepage-raw.html` — raw HTML of the homepage (as downloaded).
- `mentor-program-raw.html` — raw HTML of the mentor-program page (as downloaded).
- `pages/index.md` — verbatim text of the homepage.
- `pages/mentor-program.md` — verbatim text of the mentor program page.
- `assets-list.txt` — URLs of all images/fonts/icons referenced (not downloaded).
- `README-scrape.md` — this summary.

## Rebuild notes

- 5 images total (1 logo/brand mark, 2 social icons, 1 hero photo, 1 illustration); no favicon customized (Framer defaults).
- 5 Fontshare webfonts are self-hosted through framerusercontent — good candidates to bundle locally in the static rebuild.
- All internal nav is `./`-relative; anchor `/#scholarship` is the only in-page jump.