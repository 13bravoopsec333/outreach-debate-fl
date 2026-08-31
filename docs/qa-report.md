# QA Report — Outreach Debate Florida (Academic Editorial redesign)

**Date:** 2026-08-31 · **Tester:** QA/verification agent (deepseek-v4-flash)
**Scope:** `index.html`, `mentor-program.html`, `css/style.css`, `js/main.js`, `js/instagram.js`
**Contract:** `docs/design-contract.md` (v2, "Academic Editorial")

---

## 1. Static checks — PASS (after fixes)

| Check | Result |
|---|---|
| Forbidden patterns (`blur(`, `backdrop-filter`, `marquee`, `blob`, `hero-badge`, `soon-pill`, `track-icon`, `btn-ghost`, `Poppins`, old hex `#297698`/`#eb5354`) | Clean in all 4 site files (matches only in `*-raw.html` scrape artifacts, excluded) |
| Emoji (🧠🎙️🏆✨ etc.) | None in site files (only in `*-raw.html` artifacts) |
| Box-shadows | All `var(--shadow-card)` = `0 1px 3px rgba(0,0,0,0.08)` — contract max |
| Class cross-check (HTML classes vs CSS selectors) | **`.hero-copy` unstyled → FIXED** (added `min-width: 0`); all others styled |
| Internal anchors | All resolve (`#scholarship`, `#field-notes`, `#apply` exist) |
| Local file refs / assets | All exist (`assets/img/*`, `assets/instagram/*`) |
| Google Form URL | Present in mentor-program.html (3×) — exact match |
| Instagram URL | Present in both pages — exact match |
| YouTube URL | Present in both pages — exact match |
| Hero img `fetchpriority="high"` | Both pages ✓; added `decoding="async"` to index hero |
| Non-hero imgs `loading="lazy" decoding="async"` + w/h | **FIXED**: index nav/footer logo + social icons, mentor nav logo + footer icons lacked attrs; mentor footer icons lacked `width`/`height` |
| IG cards JS | `width/height` (720×900), lazy + async, `data/posts.json` (3 posts), local images exist |
| Fonts | Exactly 2 families (`Source Serif 4`, `Inter`), `display=swap`, preconnect ✓ |
| `theme-color` = `#F7F5F0` | Both pages ✓ |
| `prefers-reduced-motion` | Disables all transitions, forces `.reveal` visible ✓ |
| Reveal motion | Opacity-only 0.6s ease, no transform ✓ |

## 2. Browser verification — PASS (Playwright, 1440×900)

| Assertion | Home | Mentor |
|---|---|---|
| Console / page errors | NONE | NONE |
| Hero `h1` | ✓ | ✓ |
| `.ig-card` count | 3 (posts.json) | n/a (no grid on page) |
| `.ig-empty` fallback | not shown | n/a |
| `body` background | `rgb(247,245,240)` = paper | same |
| Hero img aspect ratio | 1.499 (target ≈1.5) | 1.0 (mentor.png is square 1148×1148, correct) |
| Horizontal overflow | none (1440≤1440) | none |
| `.reveal.in` before → after full scroll | 0 → 13 | 1 → 14 |
| `.nav.scrolled` after scroll | ✓ | ✓ |

**Mobile (390×844):** burger visible, `body.menu-open` toggles correctly (false→true→false), no horizontal overflow. Full-page screenshots: `/tmp/opencode/qa-home.png`, `/tmp/opencode/qa-mentor.png`, `/tmp/opencode/qa-mobile.png`.

## 3. Lighthouse (headless Chromium, local server)

| Category | Target | Before | After fixes |
|---|---|---|---|
| Performance | ≥90 | 95 | **95** |
| Accessibility | ≥90 | 91 | **95** |
| SEO | ≥95 | 100 | **100** |

- Performance: no `overallSavingsMs` opportunities listed; target met with margin.
- Accessibility +4 points from: adding `<main>` landmark, fixing heading order (footer `h4`→`h3`), fixing invisible index footer wordmark.
- **Remaining a11y flag (not fixed):** `color-contrast` — all flagged nodes are `--muted` `#7A838F` text (`.hero-meta`, `.figcaption`, `.footer-desc`, `.footer-links`, `.legal`), which the design contract specifies verbatim in its palette and component specs (figcaption/ig-meta "color `--muted`", footer "`--muted` text"). Fixing requires deviating from the contract's exact hex values; left as a documented design tradeoff. Score 95 still far exceeds the 90 target.

## 4. Fix log (files changed by QA)

| File | Change | Reason |
|---|---|---|
| `css/style.css` | Added `.hero-copy { min-width: 0; }` | Unstyled class used on mentor page (cross-check) |
| `css/style.css` | `.footer h4` → `.footer h3` | Heading-order skip (h2→h4) |
| `index.html` | Hero img: added `decoding="async"` | LCP best practice |
| `index.html` | Nav logo, footer logo, ig-icon, yt-icon: added `loading="lazy" decoding="async"` | Contract img-attribute rule |
| `index.html` | Footer brand span: added `class="fb-name"` | Wordmark inherited `--ink-soft` on dark footer = 1.8:1 contrast (near-invisible) |
| `index.html` | Wrapped content in `<main>` | Landmark-one-main a11y |
| `mentor-program.html` | Nav logo, footer logo, ig-icon, yt-icon: added `loading="lazy" decoding="async"`; footer icons got `width/height=32` | Contract img-attribute rule |
| `mentor-program.html` | Footer `h4`→`h3`; wrapped content in `<main>` | a11y |

Note: `index.html` nav-brand span was briefly removed during a faulty edit and immediately restored (verified line 23). HTML validates well-formed on both pages.

## 5. Verdict

**READY TO PUSH.** All contract rules hold, browser behavior is clean (no errors, no overflow, correct reveal/nav/menu), Lighthouse exceeds every target (95 / 95 / 100). Only outstanding item is the contract-specified `--muted` contrast tradeoff, which does not block release and should be revisited only if the client accepts a palette change.