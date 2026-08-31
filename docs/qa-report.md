# QA Report — Outreach Debate Florida ("AL Look, Clean" redesign)

**Date:** 2026-08-31 · **Tester:** QA/verification agent (deepseek-v4-flash)
**Scope:** `index.html`, `mentor-program.html`, `css/style.css`, `js/main.js`, `js/instagram.js`
**Contract:** `docs/design-contract.md` (v3, "AL Look, Clean")

---

## 1. Static checks — PASS

| Check | Result |
|---|---|
| Deleted raster icons (`assets/img/ig-icon.png`, `assets/img/yt-icon.png`) | ✅ deleted; zero references remain in html/css/js (grep across repo) |
| Forbidden patterns (`blur(`, `backdrop-filter`, `marquee`, `blob`, `hero-badge`, `soon-pill`, `track-icon`, `btn-ghost`, `#F7F5F0`, `#8C2F39`, `--paper`, `--font-serif`, `Source Serif`) | ✅ no hits in site files |
| Emoji characters | ✅ none |
| Poppins in HTML font links | ✅ both pages, exact contract URL `family=Poppins:wght@400;500;600;700&display=swap`, preconnect ✓ |
| Poppins in CSS font vars | ✅ `--font: "Poppins", …` |
| Bug-fix #1 no "Scholarship" nav link | ✅ both pages = Home · Mentor Program · Field Notes |
| Bug-fix #2 brand = image only, no text span | ✅ `.nav-brand`/`.footer-brand` contain only `<img>` (verified zero spans) |
| Bug-fix #3 no "Scholarships" footer link | ✅ footer Explore = Home · Mentor Program · Field Notes |
| Bug-fix #4 Field Notes centered | ✅ `.section-head` center-aligned; `.ig-grid` `margin-inline:auto` + `justify-content:center`; icon-btn row centered |
| Bug-fix #5 two `.icon-btn` inline SVGs | ✅ exactly 2 on home (Instagram + YouTube verbatim contract SVGs) |
| Bug-fix #6 footer Connect = `.footer-social` inline SVGs | ✅ 2 SVG links, no raster |
| Bug-fix #7 mentor page one `mentor.png` | ✅ count == 1 (hero figure), `.split` section removed, centered section-head |
| Bug-fix #8 mentor nav = home, no Apply | ✅ nav identical, no button in nav |
| Bug-fix #9 home hero buttons | ✅ `.btn` "Mentor Program"→mentor-program.html; `.btn-outline` "Field Notes"→index.html#field-notes |
| Class coverage (HTML+JS classes vs CSS selectors) | ✅ all 44 classes styled; `data-ig-grid`/`data-delay` are JS hooks (no CSS needed) |
| Internal links/anchors | ✅ `#scholarship`, `#mentorship`, `#field-notes`, `#apply` all resolve (cross-page `#field-notes` on mentor → exists on index) |
| Assets | ✅ favicon.ico, outreach-logo.png, hero.jpg, mentor.png, css/js, data/posts.json + 3 local `assets/instagram/*.jpg` all exist |
| Hard facts (Google Form / IG / YT URLs) | ✅ exact contract strings |
| Img attributes (lazy/async/w-h, fetchpriority hero) | ✅ per contract |

## 2. Browser verification — PASS (Playwright, Chromium, desktop 1440×900)

| Assertion | Home | Mentor |
|---|---|---|
| Console / page errors | NONE | NONE |
| body bg = rgb(41,118,152) teal | ✅ | ✅ |
| h1 font-family contains Poppins | ✅ | ✅ |
| nav = exactly 3 links, no Scholarship | ✅ | ✅ |
| brand = image only | ✅ | ✅ |
| footer-social = 2 SVG links | ✅ | ✅ |
| `.ig-card` count == 3 | ✅ (from data/posts.json) | n/a |
| `.icon-btn` count == 2 | ✅ | n/a |
| Field Notes `.section-head` / `.ig-grid` / icon-btn row centered | ✅ delta 0.0px vs container center | n/a |
| hero buttons = Mentor Program + Field Notes | ✅ | n/a |
| mentor.png count == 1, no `.split` | n/a | ✅ |
| `.section-head` centered | n/a | ✅ delta 0.0px |
| `.reveal.in` after full scroll (fresh load) | ✅ 0 → 13/13 | — |
| horizontal overflow @1440 | ✅ 0px | ✅ 0px |

**Mobile (390×844):** burger visible ✅; `body.menu-open` toggles ✅; panel fully in viewport when open (x=70, w=320 on 390 viewport — correct right-anchored geometry) ✅; **burger tap now closes the menu** (fixed, see §4) ✅; clicking a nav link closes the menu ✅; horizontal overflow @390 ✅ 0px.

Screenshots: `/tmp/opencode/al-home.png`, `/tmp/opencode/al-mentor.png`.

## 3. Lighthouse (headless Chromium 1234, local http.server, perf/a11y/seo)

| Category | Target | Result |
|---|---|---|
| Performance | ≥90 | **95** (LCP 2.9s, TBT 0ms, no perf opportunities) |
| Accessibility | ≥90 | **95** |
| SEO | ≥90 (task target 95) | **100** |

**Contrast flags (documented, not fixed):** 5 nodes fail WCAG AA, all from **contract-mandated** colors: `.hero-eyebrow` (coral `#EB5354` on teal = 1.42:1), `.hero-dek` (`--white-dim` = 4.14:1), `.hero-meta`/`.figcaption` (`--white-faint` = 2.97:1), `.btn` (white on coral = 3.56:1). The contract palette (§2) specifies these exact hex/alpha values and only claims "white on teal passes" — which it does (headings unflagged). Fixing would require deviating from the authoritative contract palette. Score 95 far exceeds the 90 target; flag for the client only if the palette can change.

## 4. Fix log (changes made by QA)

| File | Change | Reason |
|---|---|---|
| `assets/img/ig-icon.png`, `assets/img/yt-icon.png` | Deleted | Contract §1/§7 — replaced by inline SVGs |
| `css/style.css` | `.burger` in `@media (max-width:720px)`: added `position: relative; z-index: 96;` | **Mobile menu close bug:** the open `--teal-deep` panel (z-index 95) covered the burger at 390px, so the burger intercepted clicks and the menu could not be closed by tapping it. Verified: before fix Playwright reported "ul.nav-links intercepts pointer events"; after fix burger closes the panel (off-screen x=406) ✅ |

## 5. Verdict

**READY TO PUSH.** All static contract checks pass, browser behavior is clean (zero console/page errors, no overflow at 1440/390, reveal 0→13, nav/brand/footer fixes all confirmed), Lighthouse exceeds every target (95 / 95 / 100). Only outstanding item is the contract-specified coral/white-dim/white-faint contrast tradeoff (§3), which does not block release.