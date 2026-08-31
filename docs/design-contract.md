# Outreach Debate Florida — Design Contract v3 ("AL Look, Clean")

Restore the look of the sister site **outreachdebateal.org** — deep teal + coral + Poppins,
rounded coral buttons, white text on teal — but WITHOUT the laggy/AI-slop effects from v1
(no gradient blobs, no marquee, no emoji, no pulsing badges, no hover-lift, no blur()).
Keep the fast, static structure. This contract is authoritative; follow it exactly.

## 1. Non-negotiable rules

- REMOVE forever: `.marquee`, `.hero-blobs`/`.blob`, `filter: blur()`, `backdrop-filter`,
  infinite keyframe animations, emoji in content, floating/pulsing badges, hover-lift card
  transforms (no translateY on hover), the ivory/ink/oxblood "academic" palette, serif font.
- Motion: reveals are opacity-only, 0.5s ease. `@media (prefers-reduced-motion: reduce)`
  disables all transitions. No infinite loops. Hover states are color/background changes only.
- Fast: no heavy shadows (max `0 4px 20px rgba(10,40,60,0.25)` on large figures only), no
  gradients, Google Fonts with `display=swap` + preconnect. LCP hero image gets
  `fetchpriority="high"`; all other imgs `loading="lazy" decoding="async"` + explicit
  width/height.
- Fonts: `Poppins` (400,500,600,700). Google link:
  `https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap`
- `<meta name="theme-color" content="#297698" />` on both pages. Favicon stays
  `assets/img/favicon.ico`.
- Accessibility: WCAG AA contrast (white on teal passes), `alt` on all imgs, `:focus-visible`
  outline 2px coral.

## 2. Palette + type (exact CSS variables)

```
--teal:      #297698   /* page background */
--teal-dark: #1E5D7B   /* alt sections / card tint */
--teal-deep: #16485E   /* footer */
--coral:     #EB5354   /* accents, CTAs, eyebrows */
--coral-dark:#D94546   /* button hover */
--white:     #FFFFFF
--white-dim: rgba(255,255,255,0.85)   /* body text */
--white-faint:rgba(255,255,255,0.62)  /* meta/captions */
--card:      rgba(255,255,255,0.07)   /* card bg on teal */
--line:      rgba(255,255,255,0.16)   /* hairline borders */
--radius:    15px                     /* pill/round buttons & cards */
```

- h1: `clamp(2.3rem, 4.6vw, 3.9rem)` Poppins 600, white, line-height 1.15
- h2: `clamp(1.8rem, 3.4vw, 2.7rem)` Poppins 600, white
- h3: `1.2rem` Poppins 600, white
- body: `1rem/1.7` Poppins 400, `--white-dim`
- `.eyebrow`: `0.78rem` Poppins 600, `letter-spacing:0.22em`, uppercase, `--coral`

## 3. Components (exact class names)

- `.nav` — fixed top, TRANSPARENT background (page bg is teal), 1px `rgba(255,255,255,0.25)`
  bottom border, white links, z-index 100. On scroll `.nav.scrolled` = solid `--teal-dark`
  background (no blur, no shadow). `.nav-brand` = logo IMAGE ONLY (see fixes), height 40px,
  width auto. `.nav-links` white 16px/400, hover = coral, `.active` = coral. `.burger` (3 white
  lines) visible < 720px; `body.menu-open .nav-links` slides in as a `--teal-deep` panel from
  the right.
- `.btn` — inline-flex, height 50px, padding 0 32px, background `--coral`, white text, radius
  `15px`, Poppins 600 1rem. Hover: background `--coral-dark`. NO transform.
  `.btn-outline` — transparent, 1px `rgba(255,255,255,0.7)` border, white text; hover: white
  bg + teal text. `.btn-invert` — white bg, `--coral` text; hover `#fff`→lighten.
- `.hero` — teal bg, `min-height:100vh`, flex center, text CENTERED (eyebrow, h1, dek,
  meta, actions all centered). `.hero-dek` max-width 640px, margin auto, `--white-dim`.
  `.hero-figure` — centered, image radius 15px, thin white border, subtle shadow.
  `.figcaption` `--white-faint`, 0.85rem, centered.
- `.section` — padding 90px 0, teal bg. `.section-head` centered, max-width 720px margin auto.
  `.section-head h2` + `.section-head p` (`--white-dim`) centered.
- `.split` — 2-col grid (1.05fr / 0.95fr, gap 56px, align-items center). `.brand-block` = card
  (`--card` bg, 1px `--line`, radius 15px, padding 36px), stacked serif-free Poppins 700 words,
  middle word `--coral`. `.split-copy` eyebrow + h2 + `.status` + p.
- `.status` — quiet pill: `--card` bg, 1px `--line`, `--white-dim` text, radius 999px,
  padding 8px 18px, 0.75rem uppercase letter-spaced, with a 8px `--coral` dot (no animation).
- `.grid-3` — `grid-template-columns:repeat(3,1fr); gap:24px;`. `.item` card: `--card` bg,
  1px `--line`, radius 15px, padding 32px. Hover = background lighten to
  `rgba(255,255,255,0.12)` only. `.item-num` Poppins 600 `--coral`. `.item h3` white,
  `.item p` `--white-dim` 0.95rem.
- `.ig-grid` — 3-col grid, gap 20px, CENTERED in container. `.ig-card` — `--card` bg, 1px
  `--line`, radius 15px, overflow hidden. `.ig-card img` aspect-ratio 4/5, object-fit cover,
  width 100%. Hover: image opacity 0.9 only. `.ig-cap` + `.ig-meta` padding 12px 14px,
  `--white-dim` / `--white-faint` (serif NOT used — Poppins). `.ig-empty` centered `--white-dim`.
- Icon buttons (Field Notes): `.icon-btn` — 56×56, radius 15px, `--coral` bg, white SVG fill,
  centered grid. Hover `--coral-dark`. SVG inside sized 26×26.
- `.footer-social` — flex row, gap 12px, links = 44×44, radius 12px, `--card` bg, 1px `--line`,
  white SVG fill 22×22, hover → `--coral` bg.
- `.footer` — `--teal-deep` bg, padding 64px 0 0. `.footer-grid` 3-col (brand+desc / Explore /
  Connect). `.footer-links` vertical white-dim, hover coral. `.legal` top hairline
  `rgba(255,255,255,0.15)`, `--white-faint`, centered, 0.85rem.
- `.cta-band` (mentor page) — `--coral` bg, centered, padding 80px 0, white text, `.btn-invert`.

## 4. Brand SVG icons (use verbatim, `fill="currentColor"`)

Instagram (viewBox 0 0 24 24):
`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`

YouTube (viewBox 0 0 24 24):
`<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`

## 5. Bug-fix checklist (ALL agents must honor)

1. Remove the **"Scholarship" link from the nav** on BOTH pages. Nav = Home · Mentor Program · Field Notes.
2. Remove the brand **text** in the nav and footer — `.nav-brand` and `.footer-brand` contain the logo IMAGE ONLY (no "OUTREACH DEBATE FL" span). Delete the `<span>`.
3. Remove "Scholarships" from the footer **Explore** links (both pages).
4. **Field Notes section**: `.section-head`, the `.ig-grid`, AND the icon buttons must all be CENTERED (text-center, grid centered, `margin-inline:auto`).
5. Field Notes buttons = **two icon-only `.icon-btn`** links (Instagram, YouTube) using the SVGs above (NOT the old raster ig-icon.png/yt-icon.png, NOT text buttons).
6. Footer **Connect** column = `.footer-social` row of the two inline SVGs (white), no raster icons.
7. **Mentor page**: remove the duplicate mentor.png in the `.split` section — that section becomes a centered `.section-head` (eyebrow + h2 + paragraph), text-only. Keep the hero figure image.
8. **Mentor page**: the nav must match home exactly (Home / Mentor Program / Field Notes) — no Apply button in the top-right nav.
9. Home hero buttons: `.btn` "Mentor Program" → mentor-program.html; `.btn-outline` "Field Notes" → index.html#field-notes.

## 6. Pages

**index.html** (keep existing content verbatim): Nav → Hero (centered; eyebrow
`— Outreach Debate · Florida Branch —`; h1 "Every Florida student deserves a seat at the table.";
dek = existing mission sentence; meta "Est. 2025 · Student-Run Initiative"; actions per fix #9;
figure hero.jpg 1399×933 + figcaption) → Mandate section (eyebrow `— Our Mandate —`, h2, lede) →
Scholarship section `#scholarship` (split: brand-block + copy w/ `.status` "Applications open 2026") →
Access section (3 `.item`s I/II/III) → Mentorship section `#mentorship` (3 `.item`s + `.btn-outline`
"Visit the Mentor Program") → Field Notes `#field-notes` (section-head + `.ig-grid[data-ig-grid]` +
2 centered `.icon-btn`s) → Footer (brand logo only, Explore, Connect SVGs) + `.legal` "© 2026 Outreach Debate Florida".

**mentor-program.html**: Nav (same 3 links) → Hero (eyebrow `— Mentor / Mentee Program —`, h1,
dek, meta "Free · Online · Open to all Florida students", `.btn` "Apply for a mentor" →
Google Form, figure mentor.png 1148×1148 + figcaption) → "A match built for your goals." centered →
centered "Better preparation. Braver voices." section (eyebrow `What mentorship looks like` + paragraph, NO image) →
Three ways to grow `.grid-3` (3 `.item`s) → `.cta-band` id="apply" "Find your debate mentor." +
`.btn-invert` "Open the application" → Steps section (3 `.step`s Apply/Match/Grow) + `.btn`
"Open the application" + `.btn-outline` "Back to home" → Footer + legal. Scripts: only js/main.js.

## 7. Hard facts (never change)

- Google Form: `https://docs.google.com/forms/d/e/1FAIpQLSeQl3MDoxXcfdM1gK86OGTmhlUQ4IDT9byaoDeiJ93dtXHfgA/viewform?usp=header`
- Instagram: `https://www.instagram.com/outreachdebate.fl/` (feed = data/posts.json via js/instagram.js)
- YouTube: `https://www.youtube.com/@outreachdebate`
- Assets: `assets/img/outreach-logo.png` (brand, height 40 in nav), `assets/img/hero.jpg` (1399×933),
  `assets/img/mentor.png` (1148×1148), `assets/img/favicon.ico`. Delete `assets/img/ig-icon.png` and
  `assets/img/yt-icon.png` (replaced by inline SVGs).