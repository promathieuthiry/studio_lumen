# Implementation Plan: Studio Lumen Website

**Branch**: `001-studio-lumen-website` | **Date**: 2026-03-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-studio-lumen-website/spec.md`

## Summary

Build the Studio Lumen website — a high-performance static site on Next.js 14+ App Router with Sanity v3 CMS, deployed on Vercel. The site serves as a credibility showcase and lead generation hub for France's first mobile video production studio. Technical approach: SSG/ISR with tag-based revalidation via Sanity webhooks, `defineLive` for data fetching, embedded Sanity Studio at `/studio`, Cloudflare Stream video with facade pattern, custom CNIL-compliant cookie consent (~2-3KB), Framer Motion animations (parallax, carousel, hotspots, modal), and Tailwind CSS dark-mode design system.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode) on Node.js 20 LTS
**Primary Dependencies**: Next.js 14+ (App Router), Sanity v3, Tailwind CSS 3.x, Framer Motion 11+, `next-sanity`, `@sanity/image-url`, `@cloudflare/stream-react`, `@portabletext/react`, Lucide React
**Storage**: Sanity hosted dataset (CDN-backed), Cloudflare Stream (video hosting)
**Testing**: Lighthouse CI (performance ≥ 90, SEO ≥ 90, accessibility ≥ 90), TypeScript strict compilation, `next build` zero-error gate
**Target Platform**: Web (Vercel edge CDN), responsive (mobile-first: <640px, 640-1024px, >1024px)
**Project Type**: Static website (SSG/ISR)
**Performance Goals**: Lighthouse ≥ 90 all categories, above-the-fold render < 2s, sub-second TTFB via edge CDN
**Constraints**: French-language only (v1), no server-side runtime (static + ISR only), CNIL cookie compliance, zero tracking before consent
**Scale/Scope**: Single-page homepage + /a-propos + /studio + 2 legal pages, ~10 portfolio videos, ~8 CMS document types

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| # | Principle | Status | Evidence |
|---|-----------|--------|----------|
| I | Static-First Performance | PASS | SSG via App Router, ISR with tag-based revalidation, third-party scripts deferred (`afterInteractive` / on-interaction facade). Lighthouse ≥ 90 gate in CI. |
| II | CMS-Driven Content Autonomy | PASS | All 8 content types in Sanity v3 schemas. Embedded Studio at /studio. Singleton pattern for siteSettings/founderProfile. Client can manage all content post-launch. |
| III | Premium Dark-Mode Design System | PASS | Tailwind config with #0F0F1A–#1A1A2E backgrounds, #B8E040 accent. Glass-morphism via `bg-white/5 backdrop-blur-xl border-white/10`. No light mode in v1. |
| IV | TypeScript Strict Mode | PASS | `strict: true` in tsconfig. `defineQuery` + Sanity TypeGen for typed GROQ. All component props explicitly typed. No `any` escapes. |
| V | SEO & GEO as First-Class Concerns | PASS | Next.js Metadata API per page, JSON-LD (LocalBusiness, VideoObject, Person, FAQPage), semantic HTML, sitemap.xml, robots.txt blocking /studio. |
| VI | Mobile-First Responsiveness | PASS | Tailwind mobile-first breakpoints. Carousel swipeable via Framer Motion drag. Hotspots tappable with 44x44 targets + list fallback. Hamburger nav < 640px. |
| VII | Scope Discipline (v1 Boundary) | PASS | No payments, pricing, newsletter, HubSpot, multi-language, client dashboard, or custom booking. Calendly embed only. Space reserved for future newsletter. |

**Post-Design Re-Check**: All 7 principles remain PASS. The research phase confirmed all technical choices align with constitution constraints. No violations detected.

## Project Structure

### Documentation (this feature)

```text
specs/001-studio-lumen-website/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0: technology research
├── data-model.md        # Phase 1: Sanity CMS schema design
├── quickstart.md        # Phase 1: developer setup guide
├── checklists/
│   └── requirements.md  # Spec quality validation
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, metadata, providers)
│   ├── page.tsx                      # Homepage (SSG, fetches all section data)
│   ├── a-propos/
│   │   └── page.tsx                  # About page (founderProfile query)
│   ├── mentions-legales/
│   │   └── page.tsx                  # Legal page (generic page query)
│   ├── politique-de-confidentialite/
│   │   └── page.tsx                  # Privacy page (generic page query)
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx              # Embedded Sanity Studio (NextStudio)
│   ├── api/
│   │   └── revalidate/
│   │       └── tag/
│   │           └── route.ts          # Sanity webhook → revalidateTag
│   ├── sitemap.ts                    # Dynamic sitemap generation
│   └── robots.ts                     # robots.txt (block /studio)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                # Sticky nav with anchors + hamburger
│   │   └── Footer.tsx                # Footer with founder photo + links
│   ├── sections/
│   │   ├── Hero.tsx                  # Full-bleed hero with parallax
│   │   ├── ValueProposition.tsx      # Glass cards + client logo bar
│   │   ├── Services.tsx              # Service cards + timeline
│   │   ├── Portfolio.tsx             # Carousel with 3D tilt + category filter
│   │   ├── CtaBanner.tsx             # Mid-page CTA with founder photo
│   │   ├── Technology.tsx            # Truck image + hotspot overlay
│   │   ├── Testimonials.tsx          # Testimonial carousel/cards
│   │   └── Booking.tsx              # Calendly embed with facade
│   ├── ui/
│   │   ├── GlassCard.tsx             # Server Component: glass-morphism card
│   │   ├── FadeIn.tsx                # Client Component: scroll-triggered fade
│   │   ├── VideoModal.tsx            # Client Component: lightbox overlay
│   │   ├── VideoFacade.tsx           # Client Component: click-to-load Stream
│   │   ├── HotspotOverlay.tsx        # Client Component: interactive dots
│   │   ├── PortfolioCarousel.tsx     # Client Component: drag carousel
│   │   └── HeroBackground.tsx        # Client Component: parallax background
│   ├── consent/
│   │   ├── ConsentProvider.tsx       # React context for cookie consent state
│   │   ├── ConsentBanner.tsx         # CNIL banner (accept/reject equal)
│   │   └── ConsentGate.tsx           # Wrapper: loads children only on consent
│   └── portable-text/
│       └── PortableTextRenderer.tsx  # @portabletext/react custom components
│
├── sanity/
│   ├── client.ts                     # createClient config
│   ├── live.ts                       # defineLive setup
│   ├── image.ts                      # urlFor helper with @sanity/image-url
│   ├── queries.ts                    # All GROQ queries wrapped in defineQuery
│   └── schemas/
│       ├── index.ts                  # Schema array export
│       ├── project.ts                # Portfolio project schema
│       ├── testimonial.ts            # Testimonial schema
│       ├── service.ts                # Service schema
│       ├── equipment.ts              # Equipment hotspot schema
│       ├── clientLogo.ts             # Client logo schema
│       ├── founderProfile.ts         # Singleton: founder profile
│       ├── siteSettings.ts           # Singleton: global settings
│       └── page.ts                   # Generic content page schema
│
├── lib/
│   ├── consent.ts                    # Consent cookie read/write utilities
│   └── analytics.ts                  # GA4 + Consent Mode v2 integration
│
├── types/
│   └── sanity.d.ts                   # Auto-generated Sanity TypeGen types
│
└── styles/
    └── globals.css                   # Tailwind directives + custom properties

sanity.config.ts                      # Sanity Studio config (basePath: '/studio')
sanity.cli.ts                         # Sanity CLI config
tailwind.config.ts                    # Tailwind theme (colors, fonts, glass tokens)
next.config.ts                        # Next.js config
tsconfig.json                         # TypeScript strict config
```

**Structure Decision**: Next.js App Router single-project structure. All source code under `src/` with collocated Sanity schemas. No separate backend — Sanity hosted handles all data. No `tests/` directory in v1 — validation via TypeScript strict compilation, `next build` gate, and Lighthouse CI audits (per constitution). Contracts directory omitted — this is a static website with no public API surface beyond the Sanity webhook endpoint.

## Complexity Tracking

No constitution violations detected. All architectural decisions align with the 7 core principles.
