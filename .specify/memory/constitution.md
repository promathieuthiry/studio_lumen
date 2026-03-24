<!--
  Sync Impact Report
  ==================
  Version change: 0.0.0 → 1.0.0 (initial ratification)
  Modified principles: N/A (first version)
  Added sections:
    - Core Principles (7 principles)
    - Tech Stack Constraints
    - Development Workflow
    - Governance
  Removed sections: N/A
  Templates requiring updates:
    - .specify/templates/plan-template.md ✅ No updates needed (generic)
    - .specify/templates/spec-template.md ✅ No updates needed (generic)
    - .specify/templates/tasks-template.md ✅ No updates needed (generic)
  Follow-up TODOs: None
-->

# Studio Lumen Constitution

## Core Principles

### I. Static-First Performance

Every page MUST be statically generated (SSG) at build time via
Next.js App Router. Dynamic content from Sanity MUST use ISR
(Incremental Static Regeneration) with webhook-triggered
revalidation. Client-side JavaScript MUST be limited to
interactive elements (Calendly embed, Framer Motion animations,
video players). Third-party scripts (GA4, Calendly) MUST load
via `afterInteractive` or on user interaction.

**Rationale**: The site's credibility hinges on sub-second loads.
Lighthouse performance score MUST be ≥ 90. Static pages served
from Vercel's edge CDN ensure global performance.

### II. CMS-Driven Content Autonomy

All user-facing text, media, and structured content MUST be
managed through Sanity v3 schemas — never hardcoded in source.
This includes: portfolio projects, testimonials, services,
equipment hotspots, client logos, founder profile, site settings,
and legal pages. The client (Cyril) MUST be able to update any
content independently after launch without developer assistance.

**Rationale**: Content autonomy is a key deliverable. The CMS is
the client's primary interface with the site post-launch.

### III. Premium Dark-Mode Design System

The visual identity MUST follow the established client mockups:
dark charcoal backgrounds (#0F0F1A to #1A1A2E), lime-green
accent (#B8E040) for all CTAs and interactive states, white/light
gray text, glass-morphism cards (backdrop-blur + semi-transparent
backgrounds). All components MUST adhere to this design language.
No alternative themes or light modes in v1.

**Rationale**: The dark cinematic aesthetic is the brand identity.
Consistency across all sections builds the premium perception
that justifies the client's B2B positioning.

### IV. TypeScript Strict Mode

The entire codebase MUST use TypeScript with strict mode enabled.
All Sanity GROQ queries MUST have typed return values. Component
props MUST be explicitly typed. No `any` types except where
unavoidable with third-party libraries (and these MUST be
isolated behind typed wrappers).

**Rationale**: Type safety prevents runtime errors in production
and ensures CMS schema changes surface as build-time errors
rather than broken pages.

### V. SEO & GEO as First-Class Concerns

Every page and section MUST implement: Next.js Metadata API for
meta tags and Open Graph, JSON-LD structured data (LocalBusiness,
VideoObject, FAQPage, Person as applicable), semantic HTML with
proper heading hierarchy and alt texts, canonical URLs. Content
MUST be structured for AI search engines (Perplexity, Google AI
Overviews) — clear, factual, parseable.

**Rationale**: Organic discovery is the primary growth channel.
The site MUST rank for "studio vidéo mobile + [ville]" and
related B2B content creation queries.

### VI. Mobile-First Responsiveness

All components MUST be designed mobile-first, progressively
enhanced for larger screens. Breakpoints: mobile (< 640px),
tablet (640–1024px), desktop (> 1024px). Glass cards MUST stack
vertically on mobile. Portfolio carousel MUST be swipeable.
Technology hotspots MUST have a mobile-friendly alternative
(tappable dots or scrollable list). Navigation MUST collapse to
a hamburger menu on mobile.

**Rationale**: Responsiveness is a primary pain point with the
current site. B2B prospects research on mobile; a broken mobile
experience directly costs leads.

### VII. Scope Discipline (v1 Boundary)

Features MUST NOT exceed the v1 scope defined in the PRD.
Explicitly out of scope: online payments, pricing pages with
rates, newsletter signup (space reserved only), HubSpot deep
integration, multi-language, client login/dashboard, custom
booking system, video hosting portal. When in doubt, defer to
Phase 2. Every addition MUST be justified against the PRD's
explicit scope.

**Rationale**: The client has a defined budget and summer 2026
target. Scope creep is the primary risk to on-time delivery.

## Tech Stack Constraints

The following stack is mandated and MUST NOT be substituted
without a constitution amendment:

| Layer | Technology | Locked |
|-------|-----------|--------|
| Framework | Next.js 14+ (App Router, SSG/ISR) | Yes |
| Language | TypeScript (strict) | Yes |
| CMS | Sanity v3 (hosted, embedded at /studio) | Yes |
| Styling | Tailwind CSS | Yes |
| Animations | Framer Motion | Yes |
| Deployment | Vercel | Yes |
| Analytics | Google Analytics 4 | Yes |
| Booking | Calendly (embedded widget) | Yes |
| Video | Cloudflare Stream (HLS/DASH) | Yes |
| Icons | Lucide React | Yes |
| SEO | Next.js Metadata API + JSON-LD | Yes |

Dependencies outside this list MAY be added for utilities
(e.g., `clsx`, `@portabletext/react`) but MUST NOT introduce
alternative patterns for any locked layer.

## Development Workflow

- **Branching**: Feature branches off `main`. PRs required for
  merge. No direct commits to `main`.
- **Build validation**: Every PR MUST pass `next build` without
  errors or warnings. TypeScript strict compilation MUST succeed.
- **Performance gate**: Lighthouse audit MUST score ≥ 90 on
  Performance before any production deploy.
- **Content schema changes**: Sanity schema modifications MUST
  include corresponding TypeScript type updates and GROQ query
  adjustments in the same commit.
- **Image optimization**: All images MUST use `next/image` with
  appropriate `width`, `height`, `priority` (hero only), and
  format auto-optimization (WebP/AVIF).
- **Commit discipline**: Commits MUST be atomic and descriptive.
  Use conventional commits format (feat:, fix:, docs:, style:,
  refactor:, perf:, chore:).

## Governance

This constitution is the authoritative source for architectural
and process decisions on the Studio Lumen project. All
implementation work MUST verify compliance with these principles.

**Amendment procedure**: Any change to this constitution MUST be
documented with a version bump, rationale, and impact assessment.
Principle additions or material expansions require a MINOR bump.
Clarifications and wording fixes require a PATCH bump. Removing
or redefining a principle requires a MAJOR bump.

**Compliance review**: The Constitution Check section in
plan-template.md MUST validate against all seven principles
before implementation begins and again after design phase
completes.

**Version**: 1.0.0 | **Ratified**: 2026-03-23 | **Last Amended**: 2026-03-23
