# Travel Old Hollywood — Implementation Blueprint

This document turns the visual/design brief into an executable web build plan.

## 1) Build Strategy (How to achieve this without losing the aesthetic)

Treat this as a **design system + CMS architecture project**, not a one-off page design.

- Build a reusable **"Poster UI system"** (typography treatments, frames, texture layers, diagonal sections, card variants).
- Drive all editorial pages from a **headless CMS** with strict content modeling (stars, films, destinations, decades, watchlists).
- Keep animations cinematic but lightweight (GPU-friendly transforms, reduced motion support, lazy-loading media).

---

## 2) Recommended Tech Stack

### Frontend
- **Next.js (App Router) + TypeScript** for SEO, performance, metadata, and content routing.
- **Tailwind CSS + CSS modules** (or vanilla CSS layers) to compose ornate styles with maintainable tokens.
- **Framer Motion** for reveal choreography, card tilt, and transition effects.
- **Lenis** (optional) for smooth-scroll feel, if performance budget allows.

### CMS / Content
- **Sanity** (recommended) or **Contentful**.
  - Sanity is ideal for custom structured content and editorial workflows.
- Content models should include:
  - `article`, `star`, `film`, `destination`, `decade`, `series`, `shopItem`.
- Every article must have:
  - destination tags (multi-reference)
  - decade tag(s)
  - star references
  - film references
  - watchlist items

### Search
- **Algolia** (best UX) or **Typesense/Meilisearch** for card-catalog style search.

### Map
- **Leaflet** with a custom vintage basemap tile layer OR an **SVG-illustrated custom map**.
- Destination metadata source of truth should be CMS-driven.

### Analytics + SEO
- **GA4 + Google Tag Manager**.
- `next-seo` or App Router metadata config.
- JSON-LD for Article, Breadcrumb, Organization.

---

## 3) Information Architecture (pages in v1)

1. `/` Home
2. `/destinations` (interactive map + destination index)
3. `/stars` (grid)
4. `/films-stars-index` (A–Z directory)
5. `/decades` (timeline + filters)
6. `/articles/[slug]` (article template)
7. `/about`
8. `/shop`
9. `/newsletter` (plus embedded modules)
10. search overlay (global)

---

## 4) Design System: Poster-First Component Library

Create these primitives first before page assembly:

### Core tokens
- `--paper-cream`, `--sepia`, `--riviera-blue`, `--panam-red`, `--gold-ink`, `--navy-night`, `--dusty-rose`, `--palm-green`
- gradient presets:
  - `sunset-sky`
  - `deco-dusk`
  - `amber-nightfall`

### Typography groups
- **Display Deco** (headlines)
- **Brush Script Accent** (taglines)
- **Condensed Credits** (meta lines)
- **Editorial Serif** (body copy)

> Note: license production-ready font families (Adobe Fonts/Commercial Type/MyFonts). Avoid placeholder Google-font compromises for final brand fidelity.

### Reusable components
- `PosterHero`
- `DiagonalSectionDivider`
- `MiniPosterCard`
- `StarPortraitFrame`
- `TicketButton`
- `TelegramSignup`
- `LuggageTag` (destination chips)
- `TitleCardQuote`
- `FilmStripCarousel`
- `LibraryCardSources`
- `MarqueeNav`

### Texture layers
- Global paper grain overlay (`mix-blend-mode: multiply`, low opacity).
- Optional halftone layer for hero sections.
- Subtle vignette around viewport to mimic printed poster edges.

---

## 5) Content Modeling (critical for scale + SEO)

### `article`
- title, slug, standfirst, heroImage, body (portable text)
- readTime, publishedAt, seoTitle, seoDescription
- references: destinations[], stars[], films[], decades[], series
- watchlist[] (film title, year, platform/affiliate)
- relatedArticles[] (manual curation only)

### `destination`
- name, slug, country, region, coordinates
- posterImage, shortSummary
- mapPopupDescription
- relatedArticles[]

### `star`
- name, slug, portrait, bio
- decades[], destinations[]
- relatedArticles[]

### `film`
- title, year, slug, poster, settingDestinations[]
- relatedArticles[]

### `decade`
- label, slug, accentColor, description

### `shopItem`
- title, affiliateUrl, image, staffPickNote, category

---

## 6) Visual Execution Checklist (to match the reference quality)

- Use **angled masks and skewed containers** for major sections.
- Build headline styling with:
  - layered text shadows
  - stroke/outline
  - pseudo-element extrusion offsets
- Use **ornamental framed images** with gold border and inner shadow.
- Keep body copy calmer to balance visual drama.
- Add period micro-details:
  - tiny stars, compass marks, route dots, vintage icon ornaments.

Avoid:
- flat white backgrounds
- generic rounded cards
- modern glassmorphism/neumorphism
- default UI controls without skinning

---

## 7) Performance Plan (so art direction doesn’t kill speed)

- Preprocess hero/poster imagery to AVIF/WebP variants.
- Use responsive `sizes` and prioritized first-view assets only.
- Lazy-load map, heavy animations, and below-fold artwork.
- Cache CMS responses and ISR pages.
- Keep texture overlays as compressed reusable assets.
- Target Core Web Vitals:
  - LCP < 2.5s
  - CLS < 0.1
  - INP < 200ms

---

## 8) Motion Language

- Section reveals: `opacity + y + mask` with stagger.
- Poster cards: tiny rotate/tilt + warm spotlight glow on hover.
- Nav hover: marquee/neon bloom effect.
- Route lines on map: animated dashed stroke draw.
- Page transition: quick cinematic fade/iris variant (respect `prefers-reduced-motion`).

---

## 9) Launch Content Ops

Seed the 10 launch articles as CMS entries from day 1.

Required taxonomy sanity checks:
- each article has at least one destination
- each article has at least one decade
- star-specific guides map back to star profiles
- destination pages auto-list tagged articles

---

## 10) Delivery Roadmap (practical order)

### Phase 1 — Foundation (Week 1)
- Set up Next.js app structure and global design tokens.
- Implement marquee nav, hero, poster card system, texture pipeline.

### Phase 2 — CMS + Content Graph (Week 2)
- Define schemas and editorial studio.
- Ingest launch articles, stars, films, destinations, decades.

### Phase 3 — Core Pages (Week 3)
- Home, Article, Stars, Index, Decades, About, Shop.
- Global newsletter modules and search overlay.

### Phase 4 — Interactive Map (Week 4)
- Custom-styled Leaflet/SVG map.
- Postcard popups from CMS tags.

### Phase 5 — QA + SEO + Analytics (Week 5)
- Structured data, metadata, perf pass, mobile polish.
- GA4 events and conversion tracking for newsletter/affiliate clicks.

---

## 11) Team Roles (minimum)

- Art director / visual designer (poster composition authority)
- Frontend engineer (motion + component system)
- CMS engineer/content architect
- Editorial lead (taxonomy governance)
- Image treatment pipeline support (batch color grading/grain consistency)

---

## 12) Definition of Done

You are done when:
- The site is instantly recognizable as **vintage cinematic poster art**, not a modern blog with filters.
- All page templates are CMS-driven and non-dev editable.
- Destination/decade/star/film relationships power map, filters, and related content.
- Mobile experience preserves drama and readability.
- Lighthouse/perf and SEO baselines pass production thresholds.

