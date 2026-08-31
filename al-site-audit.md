# Outreach Debate Alabama — Site Audit (Style/Model Reference)

**Target:** https://www.outreachdebateal.org/
**Purpose:** Reference for rebuilding a sister Florida debate club site to match this site's vibe, structure, and polish (Florida content).
**Platform:** Squarespace (custom Brine/versioned template). All content blocks are standard Squarespace (image, text, button, FAQ/accordion, social links, embed).
**Method:** Static HTML + CSS analysis, plus headless-Chromium rendering (computed styles, DOM order, full-text extraction). Computed colors/fonts below are ground truth from the live render at 1440×900.

---

## 1. Pages / Sections Inventory

The site is intentionally small — 3 real pages plus a redirect.

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | One-pager: news highlight + scholarship hero + sponsors + footer CTA. Almost all marketing happens here. |
| Apply | `/apply-to-the-scholarship` | Scholarship application status + FAQ accordion + email contact. |
| Press | `/press` | Long-form press release (blog-style single article). |
| Donate | `/the-mockingbird-project` | **Redirects to Home** — Donate link points here but serves homepage content. Note: do not expect a dedicated donation page; the CTA is the hero's "Donate" button. |
| (PDF) | `/s/TheMockingbirdScholarship.pdf` | Scholarship one-pager linked from the hero. |
| (PDF) | `/s/The-Mockingbird-Scholarship-Procedures-1.pdf` | Application procedures linked from Apply page. |

### Homepage section order (top → bottom)

1. **Header/navbar** — transparent, thin white bottom border, ~60px tall. Logo image + 3 text links.
2. **News banner** (full-bleed 1440×658 image): "Scholarship Winners at NSDA Nationals" → "Learn More" button (→ `/press`). This is a styled announcement/news card, not a rotating hero slider.
3. **Scholarship hero** ("THE MOCKINGBIRD SCHOLARSHIP"): giant coral headline + mission paragraph + flyer image block + "Donate" CTA button (→ `/the-mockingbird-project`).
4. **Sponsors strip** (full-bleed 1440×686 dark-tint banner image): "— Platinum Sponsors —" (3 names) → "— Partner Organizations —" (5 logo images).
5. **Footer** (dark, full-bleed image bg 1440×160): "National Nonprofit" descriptor + 5 text links + social icons.
6. **Legal bar** (1440×60 image bg): "© 2025 Outreach Debate Alabama".

### Apply page structure
Hero "Ready to compete?" heading → "— 2026 NSDA Nationals Application —" section with application status text + email CTA → "Frequently Asked Questions" accordion (4 items) → "Have additional questions?" email CTA → shared footer.

### Press page structure
Single article: dateline ("JUNE 25, 2025") + headline + deck + photo + press-release body (Montgomery dateline, news-style). No article list/index — just one long page.

---

## 2. Design System

### Colors (extracted from computed render + CSS HSL tokens)

| Role | Value | Hex | Source token |
|---|---|---|---|
| **Primary / background** | HSL(198.38, 57.51%, 37.84%) | **#297698** (teal/steel blue) | `--accent-hsl` / `--lightAccent-hsl` |
| **Accent / CTA / headings** | HSL(359.61, 79.17%, 62.35%) | **#EB5354** (coral/red) | `--darkAccent-hsl` |
| **Text (body)** | HSL(0, 0%, 100%) | **#FFFFFF** (white) | `--black-hsl` (inverted naming) |
| **On light banners (subpages)** | — | **#000000** (black) | headings on Apply/Press use black |

Notes:
- The Squarespace token names are *inverted* (`white-hsl` = pure black, `black-hsl` = pure white) — the site is effectively a **dark teal background** with **white text** and **coral accents**.
- Buttons: coral `#EB5354` background, white text.
- Page background is the teal everywhere (`body` computed `rgb(41,118,152)`); no background image on body.
- Secondary pages (Apply, Press) keep the teal body but render **black** headings — i.e., their content sits on light image banners (Squarespace "black"/"white" section themes), giving a white-card feel inside the teal frame.

### Typography
- **Single brand font: Poppins** (loaded via Squarespace font CDN — `@font-face` blocks in head; weights 500, 600, italic 700 declared). Not Google Fonts, but a hosted web font; Google-Fonts equivalent is trivial to swap in.
- Headings: Poppins, **weight 500**, uppercase-style big sizes:
  - H1 (hero): **66.4px**, line-height ~1.23 → computed `66.4px / 81.8px`, coral.
  - H2 (news headline): **46.24px** / 60px, coral.
  - H3 (subpage headlines): **36.16px**, black on light banners.
- Body text: **16px / 24px**, Poppins (base computed `sans-serif`; all visible text resolves to Poppins).
- Nav links: Poppins **16px, weight 400**, white.
- Buttons: Poppins **16px**, white on coral.

### Layout patterns
- **Full-bleed banner images** as section backgrounds (news 1440×658, sponsors 1440×686, footer 1440×160, legal 1440×60) — the design language is "banner strips" rather than plain color sections.
- **Hero = stacked text block + image block** (flyer 550×712 on the right/adjacent), not a centered type-only hero.
- **Transparent header** floating over the top banner with a thin white divider line.
- **Rounded CTA buttons**: `border-radius: 15px`, padding `0 32px` (horizontal pill-ish, medium radius).
- **Sponsor row**: grayscale/transparent partner logos in a horizontal row; platinum sponsors listed by name.
- Generous vertical rhythm; sections are tall (854–686px content regions) with a spacious, uncluttered feel.
- Site max width ~1500px container; 8-column CSS grid (Squarespace default gutters).

### Overall aesthetic (3–5 sentences)
A polished nonprofit/cause site with a **dark teal + coral + white** palette: deep teal reads "education / trust," coral provides energetic accent CTAs and headline pops. Typography is a single humanist sans (Poppins) in large, weight-500 headings — modern, friendly, premium-school feel rather than corporate. Layout relies on **full-width designed banner images** (Canva-style graphics) between clean text sections, giving it a graphic-design-forward look. The overall vibe is **"premium student nonprofit"**: confident, cause-driven, minimal clutter, high visual polish with image-driven storytelling.

---

## 3. Copy Tone (verbatim)

Educated, mission-driven, student-accessible nonprofit voice. Formal but warm; uses full sentences, journalistic flavor on news. No exclamation points; declarative and confident.

Representative quotes:

- **Headline (hero):** `THE MOCKINGBIRD SCHOLARSHIP`
- **News headline:** `Scholarship Winners at NSDA Nationals`
- **Mission paragraph:** *"Educational opportunities in Alabama have historically been inaccessible to marginalized communities. The same applies to Speech & Debate, an educational activity that teaches students the skills of critical thinking, research, and public speaking to produce the future professionals of Alabama."*
- **Call-to-action (hero, verbatim):** *"We are on a mission to make this activity equally accessible to every student in Alabama. You can join this mission by contacting us or by directly contributing below."*
- **Apply hero:** `Ready to compete?`

CTA button labels are short and imperative: `Learn More`, `Donate`, `Apply`.

---

## 4. Key Components

### Navbar
- Transparent background, ~60px desktop height, thin **white bottom border**.
- Brand: **image logo** ("Outreach Debate Alabama" wordmark) on the left.
- Links (right): `The Mockingbird Scholarship` (→ `/`), `Apply to the Scholarship` (→ `/apply-to-the-scholarship`), `Press` (→ `/press`).
- All links Poppins 16px/400, white.
- No sign-in / cart visible; there is a `cart` link (hidden, weight 0).

### Hero (home)
- H1 `THE MOCKINGBIRD SCHOLARSHIP` (coral, 66px Poppins 500).
- Mission paragraph (white) + flyer image block (550×712) + scholarship PDF link.
- CTA button: `Donate` → `/the-mockingbird-project` (coral bg, white text, radius 15px).

### News banner (home)
- Full-bleed banner image; H2 `Scholarship Winners at NSDA Nationals` (coral) + coral paragraph + `Learn More` button → `/press`.

### Sponsors strip (home)
- `— Platinum Sponsors —` → 3 individual names (Ingu Hwang, Gabe Seidman, Adithya Vaidyanathan).
- `— Partner Organizations —` → logo row (Civic Debate Academy, The Law Office of Changjae Lee, Outreach Debate Alabama, Calvin Coolidge Presidential Foundation, Outreach Debate / SpeakFirst, etc.).
- Rendered on a full-bleed dark-tint banner image.

### Footer
- Dark band (image bg): descriptor `National Nonprofit` + links:
  - `Website` → https://outreachdebate.com
  - `LinkedIn` → linkedin.com/company/outreachdebate
  - `Scholarships` → `/`
  - `Donate` → `/the-mockingbird-project`
  - `Apply` → `/apply-to-the-scholarship`
- Social icon set: **Instagram, YouTube, LinkedIn, email (mailto:info@outreachdebateal.org)**.
- Legal bar below: `© 2025 Outreach Debate Alabama`.

### Apply page components
- Heading `Ready to compete?` → status panel (`— 2026 NSDA Nationals Application —`, applications closed message) → **FAQ accordion** (4 questions) → email CTA (`Have additional questions or concerns? Send us an email at info@outreachdebateal.org`).
- Includes a link to the procedures PDF.

### Newsletter signup
**None.** No newsletter block, no email capture form anywhere on the site.

---

## 5. Unknowns / Not determinable statically

- **Scroll/reveal animations** (Squarespace "scroll-reveal" on images/headings) — present in template but not verifiable from static analysis.
- **Button hover states** (color shift / lift) — not captured; template default expected.
- **Mobile menu behavior** — at 390px viewport the desktop nav links are hidden and no standard burger selector matched; assume a Squarespace hamburger overlay, but exact behavior unverified.
- **Header scroll behavior** (sticky vs static) — static at capture; sticky-on-scroll not confirmed.
- **Exact background-image art** (banner graphics) and their baked-in text — the news/sponsors/footer banners are designed PNGs; their precise colors/typography inside the art can't be extracted from CSS.
- **Font weight coverage** — only Poppins 500/600/italic-700 are loaded, yet nav computes at weight 400 (falls back/synthesizes); heading "500" is the declared intent.
- **Donate flow** — "Donate" button targets a page that redirects to Home; whether a real donation widget (GoFundMe embed) exists inside that redirect target is unconfirmed from static analysis (the homepage mention of "contributing below" suggests an embed block).

---

## Quick replication checklist (for the Florida rebuild)
1. Platform: Squarespace (or mimic on any stack with: one-page hero + full-bleed banner images).
2. Palette: bg `#297698`, accent/headings `#EB5354`, text white; black headings on light banners.
3. Font: Poppins (weights 500/600), big uppercase-ish headings, 16px/24px body.
4. Navbar: transparent, white hairline bottom border, 3 links + image logo.
5. Buttons: coral bg, white text, radius 15px, padding 0 32px.
6. Sections: news banner → scholarship hero (text + flyer image) → sponsors strip (platinum names + partner logos) → dark footer (5 links + socials) → legal bar.
7. Copy: declarative, mission-first, short imperative CTAs (`Learn More` / `Donate` / `Apply`), no newsletter.
8. Socials: Instagram, YouTube, LinkedIn, email.