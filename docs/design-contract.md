# Outreach Debate Florida — Design Contract v2 ("Academic Editorial")

Rebuild the site as a restrained, academic nonprofit site. Purpose: kill the "AI slop"
feel (gradient blobs, marquee, emoji icons, pill buttons, pulsing badges, hover-lift cards,
candy coral/teal palette, heavy blur) and the lag (blur(), backdrop-filter, infinite
animations). Target aesthetic: a prestigious university / policy-institute / classic
program-brochure look. Scholarly, editorial, typography-forward, quiet, confident.

## Non-negotiable rules

- **Remove entirely:** `.marquee`/ticker, `.hero-blobs`/`.blob`, all `filter: blur()`,
  `backdrop-filter`, infinite keyframe animations, floating/pulsing badges,
  emoji icons (🧠🎙️🏆 in content), hover-lift card transforms, the coral pill buttons,
  the `COMING SOON` pulsing badge.
- **Motion policy:** reveals are OPACITY-only, 0.6s ease, no translate/scale/blur. Respect
  `@media (prefers-reduced-motion: reduce)` by disabling all transitions. No infinite loops.
- **Performance:** no box-shadows heavier than `0 1px 3px rgba(0,0,0,0.08)` on cards. No
  gradients except a very subtle paper wash if needed. LCP hero image gets
  `fetchpriority="high"`; every other `<img>` gets `loading="lazy" decoding="async"` plus
  explicit `width`/`height` attributes (use the natural dims below).
- **Fonts:** exactly two Google Fonts families, `display=swap`, with `preconnect`.
  - `Source Serif 4` (weights 500,600) — ALL headings, serif display.
  - `Inter` (weights 400,500,600) — body, nav, labels, buttons, captions.
- **Copy voice:** academic, declarative, formal-but-warm. NO exclamation points, NO emoji.
  Section labels use em-dashes, e.g. `— Our Mandate —`. Keep all real content (scholarship,
  mentor tracks, application Google Form link, Instagram, YouTube links).

## Palette (CSS variables — use these exact names)

```
--paper:      #F7F5F0   /* warm ivory page background */
--paper-card: #FFFFFF   /* cards, nav, white panels */
--ink:        #212A38   /* primary text (deep navy-ink) */
--ink-soft:   #46505E   /* secondary text */
--muted:      #7A838F   /* tertiary / metadata text */
--line:       #E4DED2   /* hairline borders */
--accent:     #8C2F39   /* oxblood — used sparingly */
--accent-soft:#F3E7E8   /* very light accent wash */
--gold:       #A98E63   /* decorative rules / tiny labels */
--paper-dark: #212A38   /* dark footer + dark CTA band */
--on-dark:    #F7F5F0   /* text on dark surfaces */
--radius:     4px       /* minimal, squared-academic */
```

## Typography scale

- `--font-serif: "Source Serif 4", Georgia, serif`
- `--font-sans: "Inter", system-ui, -apple-system, sans-serif`
- h1: `clamp(2.2rem, 4.5vw, 3.6rem)`, serif 600, line-height 1.15, color `--ink`
- h2: `clamp(1.7rem, 3vw, 2.4rem)`, serif 600, color `--ink`
- h3: `1.15rem`, sans 600, color `--ink`
- body: `1rem/1.7`, sans 400, color `--ink-soft` (on light) / `--ink` for emphasis
- `.eyebrow`: `0.75rem`, sans 600, `letter-spacing:0.18em`, uppercase, color `--accent`, with a
  small `--gold` rule (e.g. `────` or a 32×2px inline-block) before it
- figcaptions / `.ig-meta`: serif italic, `0.85rem`, color `--muted`

## Component contract (exact class names — HTML agents MUST use these; CSS agent MUST style these)

- `.nav` — fixed top, `--paper-card` bg, 1px `--line` bottom border, ink text, height ~68px.
  `.nav-brand` (logo img 40px + wordmark, sans 600). `.nav-links` right-aligned, links ink,
  hover = accent underline (2px, left-aligned). `.burger` mobile (3 lines). `body.menu-open`
  opens mobile panel. On scroll >40px add `.nav.scrolled` (solid already; just keep border).
- `.hero` — `--paper` bg, left-aligned editorial. `.hero-eyebrow` (small caps + gold rule).
  `.hero h1` serif. `.hero-dek` lede paragraph, `1.15rem`, `--ink-soft`, max-width 620px.
  `.hero-meta` small caps line (e.g. `Est. 2025 · Florida Branch`). `.hero-figure` = image in a
  frame: 1px `--line` border, `--paper-card` padding 12px, subtle 0 1px 3px shadow. `.figcaption`
  below, serif italic, `--muted`. `.hero-actions` = `.btn` + `.btn-outline`.
- `.btn` — inline-flex, height 48px, padding 0 28px, `--radius:4px`, background `--ink`, color
  `--on-dark`, sans 600, 0.95rem. Hover: background `--accent`, no lift. `.btn-outline` — bg
  transparent, 1px `--ink` border, `--ink` text; hover: `--ink` bg + white text. No shadows, no
  transforms.
- `.section` — padding 96px 0, `--paper` bg. Alternate sections may use `--paper-card` or a
  white panel band. `.section-head` centered (`.eyebrow` + `.section-head h2` + `.section-head p`
  lede, `--ink-soft`, max-width 680px, margin auto).
- `.split` — 2-col grid (1fr 1fr, gap 64px, `align-items:center`). `.split-copy` (eyebrow, h2,
  p). `.split img` framed like `.hero-figure` (border, padding, caption below).
- `.grid-3` — `grid-template-columns: repeat(3, 1fr); gap: 28px;` for the on-ramps and the
  three growth tracks. `.item` card: `--paper-card` bg, 1px `--line` border, `--radius`, padding
  32px, NO hover transform. `.item-num` serif 600, `--accent`, e.g. `I` `II` `III`. `.item h3`
  (sans 600, `--ink`). `.item p` (`--ink-soft`, 0.95rem).
- `.status` — quiet label replacing the pulsing badge: inline-flex, 1px `--line` border,
  `--paper-card` bg, `--muted` text, sans 600, 0.75rem uppercase, letter-spaced, padding 6px 14px,
  `border-radius:999px`, with an 8px `--accent` dot (no animation). Text like `Applications open 2026`.
- `.brand-block` — academic wordmark panel for "OUTREACH DEBATE FLORIDA": `--paper-card` bg, 1px
  `--line` border, padding 40px. Words stacked serif 600, `--ink`; the middle word `--accent`;
  last line small caps `--muted`.
- `.cta-band` — dark band (`--paper-dark` bg, `--on-dark` text), centered, padding 90px 0,
  serif h2, `.btn` white-bg ink-text version (`.btn-invert`: bg `--on-dark`, color `--ink`).
- `.steps` — 3-col grid of numbered steps (`.step`, `.step-num` 44px circle `--accent` bg white
  text, serif number; `.step h3`; `.step p`). No hover transform.
- `.ig-grid` — 3-col, gap 20px, `aspect-ratio: 4/5` cards. `.ig-card` = `<a>` block, image
  `object-fit:cover`, 1px `--line` border. Hover = only a slight image darken (opacity 0.92),
  NO scale/transform. `.ig-card .ig-cap` below image inside card, serif italic `--muted`,
  `-webkit-line-clamp:2`. `.ig-meta` small caps `--muted`. Remove the gradient overlay entirely.
- `.footer` — `--paper-dark` bg, `--on-dark`/`--muted` text, padding 64px 0 0, `.footer-grid`
  3-col (brand+desc / links / socials). `.footer-links` vertical, hover accent underline.
  `.legal` — top hairline `rgba(247,245,240,0.15)`, small `--muted` text centered.

## Pages

**index.html section order (academic labels in parentheses):**
1. Nav
2. Hero (eyebrow: `— Outreach Debate · Florida Branch —`; meta: `Est. 2025 · Student-Run Initiative`)
3. Mandate (eyebrow `— Our Mandate —`): centered serif pull-quote + supporting paragraph
4. Scholarship (eyebrow `— The Orange Blossom Scholarship —`): `.split` of `.brand-block` + copy
   with `.status` ("Applications open 2026") — keep the scholarship description verbatim
5. Access (`— Access —`): "Access changes the conversation." + `.grid-3` `.item`s (I Scholarships /
   II Mentorship / III Network) using existing content
6. Mentorship (`— Mentor Program —`): "Three ways to grow." + `.grid-3` (Case development,
   Speaking drills, Advanced debate) + outline button to mentor-program.html
7. Field Notes (`— Field Notes —`): Instagram grid (`.ig-grid`), note "@outreachdebate.fl",
   link button to Instagram + YouTube
8. Footer + legal `© 2026 Outreach Debate Florida`

**mentor-program.html section order:**
1. Nav (active link = Mentor Program)
2. Hero (eyebrow `— Mentor / Mentee Program —`, h1 "Your next round starts with a mentor in
   your corner.", apply `.btn` → Google Form link, `.hero-figure` mentor.png with figcaption)
3. "A match built for your goals." centered section
4. `.split` "Better preparation. Braver voices." (eyebrow `What mentorship looks like`) + mentor.png
5. `.grid-3` Three ways to grow (same three items)
6. `.cta-band` "Find your debate mentor." + `.btn btn-invert` "Open the application" → Google Form
7. Steps (Apply / Match / Grow)
8. Footer

## Hard facts to preserve (do not change)
- Google Form URL: `https://docs.google.com/forms/d/e/1FAIpQLSeQl3MDoxXcfdM1gK86OGTmhlUQ4IDT9byaoDeiJ93dtXHfgA/viewform?usp=header`
- Instagram: `https://www.instagram.com/outreachdebate.fl/` (feed reads `data/posts.json` via `js/instagram.js`)
- YouTube: `https://www.youtube.com/@outreachdebate`
- Logo: `assets/img/logo.png` · Hero photo: `assets/img/hero.jpg` (natural 1399×933) · Mentor illustration: `assets/img/mentor.png` (1148×1148) · Social icons: `assets/img/ig-icon.png`, `assets/img/yt-icon.png`
- `sitemap.xml`, `robots.txt` already exist; keep theme-color updated to `#F7F5F0`.
- Keep `<meta name="theme-color" content="#F7F5F0" />` in both pages.
- Accessibility: WCAG AA contrast (ink on paper passes; accent text `#8C2F39` on `--paper` passes),
  `alt` on all images, `:focus-visible` outline (2px `--accent`).