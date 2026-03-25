# studio_lumen Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-23

## Active Technologies

- TypeScript 5.x (strict mode) on Node.js 20 LTS + Next.js 14+ (App Router), Sanity v3, Tailwind CSS 3.x, Framer Motion 11+, `next-sanity`, `@sanity/image-url`, `@cloudflare/stream-react`, `@portabletext/react`, Lucide React (001-studio-lumen-website)

## Project Structure

```text
src/
├── app/           # Next.js App Router pages and API routes
├── components/    # React components (layout, sections, ui, consent, portable-text)
├── sanity/        # Sanity client, queries, schemas
├── lib/           # Utilities (consent, analytics)
├── types/         # TypeGen auto-generated types
└── styles/        # Tailwind globals
```

## Commands

```bash
npm run dev          # Start dev server (site + embedded Sanity Studio)
npm run build        # Production build (must pass with zero errors)
npx sanity schema extract --enforce-required-fields  # Extract Sanity schema
npx sanity typegen generate                          # Generate TypeScript types
```

## Code Style

- TypeScript strict mode: no `any`, all props explicitly typed
- Sanity GROQ queries wrapped in `defineQuery` for type inference
- Server Components by default; `"use client"` only for interactive elements
- Tailwind utility classes; glass-morphism: `bg-white/5 backdrop-blur-xl border-white/10`
- Conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `chore:`

## Recent Changes

- 001-studio-lumen-website: Added full tech stack (Next.js 14+, Sanity v3, Tailwind CSS, Framer Motion, Cloudflare Stream)

<!-- MANUAL ADDITIONS START -->

## Design Guidelines (inspired by DSGN® — dsgngroup.it)

### Typography

| Role           | Font Family     | Weight | Size (desktop)       | Size (mobile)  | Line Height | Letter Spacing |
|----------------|-----------------|--------|----------------------|----------------|-------------|----------------|
| Display / Hero | ClashDisplay    | 600    | 55px – 20vw         | 30px – 10vw    | 1.0         | —              |
| H1             | ClashDisplay    | 600    | 48–55px              | 28–30px        | 1.0 – 1.18  | —              |
| H2             | DM Sans         | 600    | 30–35px              | 22–24px        | 1.18         | —              |
| H3             | DM Sans         | 500    | 20–24px              | 18–20px        | 28–30px      | —              |
| Body           | DM Sans         | 400    | 16–18px              | 16px           | 26–28px      | —              |
| Caption / Label| DM Sans         | 500    | 13–14px (uppercase)  | 13px           | 1.18         | 1.4px          |
| Serif accent   | Cardo           | 400    | 18–22px (italic)     | 16–18px        | 30–33px      | —              |
| Fallback stack | Roboto, Roboto Slab | — | —                    | —              | —            | —              |

**Rules:**
- Display text uses vw units for fluid scaling (e.g. `font-size: 20.1vw`)
- Labels / tags are always uppercase with `letter-spacing: 1.4px`
- Serif font (Cardo) used sparingly for editorial accent (subtitles, quotes)
- ClashDisplay is the primary personality font (headings, hero)
- DM Sans is the workhorse for body, UI, and secondary headings

### Colors

**Core palette:**
| Token                | Hex        | Usage                                      |
|----------------------|------------|---------------------------------------------|
| `--color-bg-dark`    | `#030303`  | Primary background, dark sections, footer   |
| `--color-bg-light`   | `#F8F8F8`  | Light cards, alternate sections              |
| `--color-bg-warm`    | `#F1EFEB`  | Warm white backgrounds                       |
| `--color-text`       | `#FFFFFF`  | Primary text on dark backgrounds             |
| `--color-text-muted` | `#C2C2C2`  | Secondary / muted text                       |
| `--color-text-dark`  | `#030303`  | Text on light backgrounds                    |
| `--color-text-body`  | `#7A7A7A`  | Body text mid-gray                           |
| `--color-accent`     | `#61CE70`  | Green accent (sparingly used)                |
| `--color-accent-blue`| `#6EC1E4`  | Blue accent (Elementor default — secondary)  |

**Borders & dividers:**
| Token                    | Value          | Usage                         |
|--------------------------|----------------|-------------------------------|
| `--color-border-light`   | `#FFFFFF26`    | White @ 15% opacity — dividers on dark bg |
| `--color-border-lighter` | `#FFFFFF1A`    | White @ 10% opacity — subtle separators   |
| `--color-border-warm`    | `#F8F8F81A`    | Off-white @ 10% — footer/section borders  |

**Overlay:**
| Token                | Value          | Usage                    |
|----------------------|----------------|--------------------------|
| `--color-overlay`    | `#03030326`    | Dark overlay @ 15% on hero images |

### Spacing & Layout

**Grid system:**
- Container max-width: `1770px`
- Container horizontal padding: `3.906vw` (≈ 56px at 1440px)
- Columns: Flexbox-based, not CSS Grid

**Section spacing (vertical):**
| Context               | Value              |
|-----------------------|--------------------|
| Large section padding | `5vw – 7.8vw` (≈ 72–112px at 1440px) |
| Standard section gap  | `3.6vw` (≈ 52px)  |
| Inner content gap     | `6.094vw` (≈ 88px)|
| Mobile section padding| `40px 15px`        |

**Element spacing:**
| Context               | Value       |
|-----------------------|-------------|
| Card internal padding | `42px 60px` (desktop), `40px 15px` (mobile) |
| Inline element gap    | `16px – 22px` |
| Negative overlap      | `-70px` to `-95px` (images/sections overlapping) |
| Sticky offset         | `top: 30px` (sidebar), `top: 100px` (nav-aware) |

### Components

**Buttons:**
| Variant    | Background  | Text Color | Border        | Radius   | Padding                          | Min Width |
|------------|-------------|------------|---------------|----------|----------------------------------|-----------|
| Primary    | `#FFFFFF`   | `#030303`  | none          | `9999px` | `calc(.667em + 2px) calc(1.333em + 2px)` | `200px`   |
| Inverse    | `#030303`   | `#FFFFFF`  | none          | `9999px` | same                             | `200px`   |
| Outline    | transparent | `#FFFFFF`  | 1px `#FFFFFF` | `9999px` | same                             | `200px`   |

- Font size: `1.125em` (≈ 18px)
- Font weight: 500
- Max width: `322px`
- Arrow icon: right-aligned with `margin-left: 17px`
- All buttons are fully rounded (pill shape)

**Cards:**
| Property        | Value                               |
|-----------------|-------------------------------------|
| Background      | `#F8F8F8` (light) or `#030303` (dark) |
| Border radius   | `8px` (standard), `25px` (featured) |
| Padding         | `42px 60px`                         |
| Shadow          | none (flat design)                  |
| Border          | `1px solid #FFFFFF1A` on dark cards |

**Navigation:**
- Transparent / blur backdrop on scroll
- Logo: max-height `62px`
- Menu links: white `#FFFFFF`, line-height `70px`
- Sticky with `top: 100px` offset
- Container: `1770px` max-width

**Footer:**
- Background: `#030303`
- Three-column layout (33.33% each)
- Text: `#FFFFFF`
- Border: `1px solid #F8F8F81A`
- Contains: logo + info, navigation + services, contact form
- Form inputs with white borders on dark background

**Marquee / Logo carousel:**
- Horizontal auto-scrolling ticker
- Client logos at `max-height: 50px`
- Fixed item width: `515px`
- Uppercase text labels with `letter-spacing: 1.4px`

### Motion

| Property               | Value / Pattern                                |
|------------------------|------------------------------------------------|
| Default transition     | `300ms ease` (buttons, links, opacity)         |
| Parallax offset        | `bottom: -100px` on background images           |
| Sticky columns         | `position: sticky; top: 30px / 100px`          |
| Hover — buttons        | Background color swap (white ↔ dark)            |
| Hover — links          | Opacity / color shift                           |
| Hover — images         | Subtle scale via `object-fit: cover` containers |
| Scroll reveal          | Margin-based slide-up (`margin: -95px → 0`)    |
| Rotation               | `rotateZ: 180deg` on decorative elements        |
| Blur effect            | `filter: blur(100px)` on decorative bg blobs    |
| Marquee                | Continuous horizontal scroll (CSS / JS)         |

### Responsive Breakpoints

| Name              | Width      |
|-------------------|------------|
| Large desktop     | `> 1366px` |
| Desktop           | `≤ 1200px` |
| Tablet landscape  | `≤ 1024px` |
| Tablet portrait   | `≤ 880px`  |
| Mobile            | `≤ 767px`  |

### Aesthetic Direction

**Style:** Contemporary luxury minimalism with editorial sensibility — comparable to studios like STRV, Basement Studio, or high-end European creative agencies.

**Key principles:**
1. **Dark-mode dominant** — near-black (#030303) as primary canvas, not pure black
2. **Typography as hero** — oversized display type (up to 20vw) is the primary visual element, not imagery
3. **Generous whitespace** — luxurious spacing (5–8vw vertical padding) creates premium pacing
4. **Flat design** — no box shadows on cards; depth created through layering, overlap, and opacity
5. **Restrained color** — monochromatic (black/white/gray) with a single green accent used sparingly
6. **Semi-transparent borders** — dividers at 10–15% white opacity create subtle structure without visual weight
7. **Overlapping elements** — negative margins (-70px to -95px) create depth and visual interest
8. **Pill-shaped CTAs** — fully rounded buttons (`border-radius: 9999px`) with arrow icons
9. **Decorative blur blobs** — `blur(100px)` filter on background shapes for ambient glow effects
10. **Serif as editorial accent** — Cardo italic for subtitles/quotes adds typographic warmth to the tech-forward aesthetic

**Icon style:** Minimal, line-based SVG icons (arrows, navigation indicators). No filled icon sets.

**Image treatment:** Full-bleed with `object-fit: cover`, rounded corners (8px), parallax on hero backgrounds. No heavy masking or clipping.

<!-- MANUAL ADDITIONS END -->
