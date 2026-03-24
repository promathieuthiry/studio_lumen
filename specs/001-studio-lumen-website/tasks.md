# Tasks: Studio Lumen Website

**Input**: Design documents from `/specs/001-studio-lumen-website/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: No test tasks included — validation is via TypeScript strict compilation, `next build` zero-error gate, and Lighthouse CI audits (per constitution).

**Organization**: Tasks are grouped by user story (from spec.md) to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Project Initialization)

**Purpose**: Create the Next.js project with all locked dependencies from the constitution.

- [x] T001 Initialize Next.js 14+ project with App Router, TypeScript strict mode, and install locked dependencies (next-sanity, @sanity/image-url, sanity, framer-motion, @cloudflare/stream-react, @portabletext/react, lucide-react, clsx) — configure tsconfig.json with strict: true and next.config.ts
- [x] T002 [P] Configure Tailwind CSS with dark-mode design tokens (#0F0F1A, #1A1A2E backgrounds, #B8E040 accent, glass-morphism utilities) in tailwind.config.ts
- [x] T003 [P] Create environment variables template listing all required vars (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_READ_TOKEN, SANITY_REVALIDATE_SECRET, NEXT_PUBLIC_GA_MEASUREMENT_ID, NEXT_PUBLIC_CALENDLY_URL, NEXT_PUBLIC_CLOUDFLARE_CUSTOMER_CODE) in .env.local.example

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Sanity CMS infrastructure, shared UI components, layout, and consent system. MUST complete before any user story.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

### Sanity CMS Infrastructure

- [x] T004 Create Sanity client with CDN and stega config in src/sanity/client.ts, defineLive setup in src/sanity/live.ts, and image URL helper (urlFor) in src/sanity/image.ts
- [x] T005 [P] Create siteSettings singleton schema with fields: siteTitle, description, ogImage, heroHeadline, heroSubtitle, valuePropositions (array of {title, description, icon}), socialLinks, ctaText, ctaUrl, founderPhoto, founderBio, contactEmail — with required validation on siteTitle, description, ogImage, heroHeadline, heroSubtitle, valuePropositions, ctaText, ctaUrl — in src/sanity/schemas/siteSettings.ts
- [x] T006 [P] Create founderProfile singleton schema with fields: fullName, title, bio (Portable Text), photo, journey (array of {year, title, description}), vision, motivations, skills, socialLinks — with required validation — in src/sanity/schemas/founderProfile.ts
- [x] T007 [P] Create project collection schema with fields: title, slug, category (string list: social-media, testimonial, interview, corporate, podcast, photo), description, cloudflareVideoId, thumbnail, featured, order — with required validation — in src/sanity/schemas/project.ts
- [x] T008 [P] Create testimonial collection schema with fields: clientName, company, role, quote, avatar, featured, order — with required validation — in src/sanity/schemas/testimonial.ts
- [x] T009 [P] Create service collection schema with fields: title, description, icon (Lucide name), deliverables (array of string), turnaround, order — with required validation — in src/sanity/schemas/service.ts
- [x] T010 [P] Create equipment collection schema with fields: name, description, image, specs, hotspotX (0-100), hotspotY (0-100), order — with min/max validation on hotspot coordinates — in src/sanity/schemas/equipment.ts
- [x] T011 [P] Create clientLogo collection schema with fields: name, logo (image), url, order — with required validation — in src/sanity/schemas/clientLogo.ts
- [x] T012 [P] Create page collection schema with fields: title, slug, body (Portable Text) — with required validation — in src/sanity/schemas/page.ts
- [x] T013 Create schema index exporting all types in src/sanity/schemas/index.ts, and configure Sanity Studio in sanity.config.ts with Structure Builder (singletons as top-level items with fixed documentId, divider, then collections), template filtering (hide singletons from "New document"), and action filtering (publish/discardChanges/restore only for singletons)
- [x] T014 Define all GROQ queries wrapped in defineQuery: homepage (siteSettings including heroHeadline, heroSubtitle, valuePropositions; services; projects; testimonials; clientLogos; equipment), founderProfile, page by slug — in src/sanity/queries.ts
- [x] T015 Run Sanity schema extract and typegen generate to produce typed query results in src/types/sanity.d.ts, and configure sanity.cli.ts
- [x] T016 Create revalidation webhook API route parsing Sanity webhook body with parseBody, validating SANITY_REVALIDATE_SECRET signature, and calling revalidateTag for each tag — in src/app/api/revalidate/tag/route.ts

### Shared UI Components

- [x] T017 [P] Create GlassCard server component with glass-morphism styles (bg-white/5 backdrop-blur-xl border-white/10 rounded-2xl shadow-lg ring-1 ring-white/5) accepting children and className — in src/components/ui/GlassCard.tsx
- [x] T018 [P] Create FadeIn client component with whileInView animation, configurable direction (up/down/left/right), delay for staggering, viewport once:true amount:0.3 — in src/components/ui/FadeIn.tsx

### Cookie Consent System

- [x] T019 Create consent cookie read/write utilities (cookie name, accepted/rejected values, 6-month expiry, SameSite: Lax) in src/lib/consent.ts
- [x] T020 Create ConsentProvider React context reading consent cookie on mount, exposing consent state and update function, plus ConsentBanner with equally prominent "Tout accepter"/"Tout refuser" buttons, and ConsentGate wrapper that renders children only when consent is granted — in src/components/consent/ConsentProvider.tsx, src/components/consent/ConsentBanner.tsx, src/components/consent/ConsentGate.tsx
- [x] T021 Create GA4 integration with Google Consent Mode v2: default-denied gtag consent in head, gtag('consent', 'update') on acceptance, no load on rejection — in src/lib/analytics.ts

### Layout

- [x] T022 Create global styles with Tailwind directives (@tailwind base/components/utilities), custom CSS properties for theme colors, and base body styles (dark background, antialiased text) in src/styles/globals.css
- [x] T023 Create root layout importing global styles, loading fonts, setting base metadata (title, description, OG), wrapping children in ConsentProvider, rendering ConsentBanner and SanityLive component — in src/app/layout.tsx
- [x] T024 Create Navbar with sticky top positioning, logo (left, scrolls to top), section anchor links as centered pills (Expertise, Portfolio, Technologie), highlighted green "Réserver" CTA button (right), hamburger menu below 640px, smooth scroll behavior — in src/components/layout/Navbar.tsx
- [x] T025 Create Footer with founder photo background, "Merci" message, contact email (cyril@studiolumen.fr), "Découvrir mon parcours" link to /a-propos, social links (LinkedIn), legal page links, and "Gérer les cookies" link to reopen consent banner — in src/components/layout/Footer.tsx

**Checkpoint**: Foundation ready — Sanity Studio works at /studio, schemas defined, shared components available, consent system functional, layout renders. User story implementation can now begin.

---

## Phase 3: User Story 1 — Prospect Discovers Studio Lumen and Books a Call (Priority: P1) 🎯 MVP

**Goal**: Complete the core homepage-to-booking conversion funnel — a prospect scrolls through the AIDA-model homepage and books a discovery call.

**Independent Test**: Navigate to homepage, scroll through Hero → Value Proposition → Services → Testimonials → CTA Banner → Booking sections, verify each renders with CMS content, click "Réserver" CTA and confirm Calendly widget opens (or fallback link appears if consent denied).

### Implementation for User Story 1

- [x] T026 [P] [US1] Create HeroBackground client component with useScroll/useTransform parallax (background Y 0%→30%, opacity fade), dark gradient overlay — in src/components/ui/HeroBackground.tsx
- [x] T027 [US1] Create Hero section composing HeroBackground with headline and subtitle from siteSettings (heroHeadline, heroSubtitle), green CTA button scrolling to #reserver, founder photo linking to /a-propos with hover effect — in src/components/sections/Hero.tsx
- [x] T028 [P] [US1] Create ValueProposition section rendering siteSettings.valuePropositions as GlassCard items (title, description, icon) in a responsive grid, and a client logo bar (horizontal scroll of clientLogo images) below — in src/components/sections/ValueProposition.tsx
- [x] T029 [P] [US1] Create Services section with categorized service cards (icon from Lucide, title, description, deliverables), "Sur devis" indicator, and a visual booking-to-delivery timeline — in src/components/sections/Services.tsx
- [x] T030 [P] [US1] Create Testimonials section with carousel/card layout showing clientName, company, role, quote, avatar — hide section entirely if no testimonials exist in CMS — in src/components/sections/Testimonials.tsx
- [x] T031 [P] [US1] Create CtaBanner section with prominent green booking button, persuasive copy, founder photo, and subtle secondary link "Qui est derrière Studio Lumen ?" to /a-propos — in src/components/sections/CtaBanner.tsx
- [x] T032 [US1] Create Booking section with Calendly facade pattern: show styled placeholder until user interacts, wrap Calendly embed in ConsentGate, display direct Calendly link as fallback when consent denied, lazy-load embed script on interaction — in src/components/sections/Booking.tsx
- [x] T033 [US1] Create homepage page.tsx as Server Component fetching siteSettings, services, testimonials, clientLogos from Sanity via sanityFetch with appropriate tags, composing all US1 sections in AIDA order (Hero, ValueProposition, Services, CtaBanner, Testimonials, Booking), with placeholder comments for Portfolio and Technology sections — in src/app/page.tsx
- [x] T034 [US1] Validate US1 end-to-end: verify all homepage sections render with content, smooth scroll works for all anchor links, CTA buttons scroll to booking section, Calendly loads on interaction with consent, fallback link works without consent

**Checkpoint**: Homepage conversion funnel is fully functional. A prospect can scroll the AIDA flow and book a call. This is the MVP — deployable standalone.

---

## Phase 4: User Story 2 — Prospect Evaluates Work Quality via Portfolio (Priority: P2)

**Goal**: Add the portfolio carousel with video playback so prospects can evaluate production quality.

**Independent Test**: Scroll to portfolio section, verify thumbnails display, filter by category, click a thumbnail, confirm video modal opens with streaming playback, close modal and verify scroll position preserved.

### Implementation for User Story 2

- [x] T035 [P] [US2] Create VideoFacade client component: render Cloudflare Stream thumbnail image with play button overlay, mount @cloudflare/stream-react Stream component on click (click-to-load pattern, zero iframe until interaction) — in src/components/ui/VideoFacade.tsx
- [x] T036 [P] [US2] Create VideoModal client component with AnimatePresence backdrop (bg-black/80 backdrop-blur-sm) + centered modal with spring enter/quick exit, scroll lock (body position fixed + restore scrollTo), escape key handler, close button — in src/components/ui/VideoModal.tsx
- [x] T037 [US2] Create PortfolioCarousel client component with motion.div drag="x" and dragConstraints, useTransform mapping horizontal offset to rotateY (±25°), scale (0.85–1.0), opacity (0.5–1.0), category filter pills (lime-green active state), animate(x, 0) reset on filter change, swipe support — in src/components/ui/PortfolioCarousel.tsx
- [x] T038 [US2] Create Portfolio section integrating PortfolioCarousel, VideoFacade thumbnails, and VideoModal — pass project data from Sanity, manage modal open/close state, pass selected video to modal — in src/components/sections/Portfolio.tsx
- [x] T039 [US2] Integrate Portfolio section into homepage page.tsx between Services and CtaBanner, add projects query to data fetching with 'project' revalidation tag — in src/app/page.tsx

**Checkpoint**: Portfolio carousel is functional — prospects can browse, filter, and watch videos. Combined with US1, the site now shows work quality alongside the booking funnel.

---

## Phase 5: User Story 3 — Prospect Explores the Mobile Studio Technology (Priority: P3)

**Goal**: Add the interactive truck equipment hotspot overlay so prospects can explore the mobile studio's technology.

**Independent Test**: Scroll to Technology section, verify truck image with pulsing hotspot dots, hover/tap a dot to see glass-effect tooltip, activate a different dot to confirm previous tooltip closes, test on mobile with tap interaction.

### Implementation for User Story 3

- [x] T040 [US3] Create HotspotOverlay client component with absolute-positioned buttons at X/Y percentages, pulsing dot animation (scale [1, 2.2] + opacity [0.6, 0] repeating), AnimatePresence mode="wait" for tooltips, spring transition (damping: 25, stiffness: 300), one-tooltip-at-a-time state, GlassCard tooltips, minimum 44x44px tap targets — in src/components/ui/HotspotOverlay.tsx
- [x] T041 [US3] Create Technology section with full-bleed truck interior image (only show hotspot dots after image loaded), overlay HotspotOverlay with equipment data from Sanity, mobile alternative layout (tappable dots with adequate targets or scrollable equipment list) — in src/components/sections/Technology.tsx
- [x] T042 [US3] Integrate Technology section into homepage page.tsx between CtaBanner and Testimonials, add equipment query to data fetching with 'equipment' revalidation tag — in src/app/page.tsx

**Checkpoint**: Technology section is interactive — prospects can explore the truck's equipment. The homepage now has all AIDA sections complete.

---

## Phase 6: User Story 4 — Prospect Learns About the Founder (Priority: P4)

**Goal**: Create the About page so prospects can learn about Cyril's story via contextual links from the homepage.

**Independent Test**: Click founder's photo in Hero or "Découvrir mon parcours" in Footer, navigate to /a-propos, verify biography, journey timeline, skills, and booking CTA render. Verify page works as standalone (direct URL access).

### Implementation for User Story 4

- [x] T043 [P] [US4] Create PortableText renderer with custom block components for rich text rendering (headings, paragraphs, links, lists, images) — in src/components/portable-text/PortableTextRenderer.tsx
- [x] T044 [US4] Create About page (/a-propos) as Server Component fetching founderProfile from Sanity: render professional photo, biography via PortableText, career journey timeline (animated with FadeIn stagger), vision statement, skills list, social links, and a prominent green CTA button to book a discovery call — set page metadata (title, description, OG) — in src/app/a-propos/page.tsx

**Checkpoint**: About page is complete. All contextual links from Hero (founder photo), Footer ("Découvrir mon parcours"), and CtaBanner ("Qui est derrière Studio Lumen ?") now navigate to a working /a-propos page.

---

## Phase 7: User Story 5 — Client Manages All Content Independently (Priority: P5)

**Goal**: Expose the embedded CMS at /studio so Cyril can manage all content post-launch.

**Independent Test**: Navigate to /studio, verify the CMS dashboard shows all 8 document types, create/edit/publish a testimonial, trigger revalidation, confirm the change appears on the live site.

### Implementation for User Story 5

- [x] T045 [US5] Create embedded Sanity Studio page with NextStudio, export metadata and viewport from next-sanity/studio for mobile and noindex, set dynamic='force-static' — in src/app/studio/[[...tool]]/page.tsx
- [x] T046 [US5] Validate CMS workflow end-to-end: verify all 8 document types are listed (singletons at top, collections below), create a test document in each collection type, verify required field validation blocks publishing, publish a testimonial and confirm it appears on the homepage after revalidation

**Checkpoint**: CMS is fully operational. Cyril can independently manage all content types.

---

## Phase 8: User Story 6 — Prospect Finds Studio Lumen via Search (Priority: P6)

**Goal**: Implement structured data, metadata, sitemap, and robots.txt so the site ranks for targeted search queries.

**Independent Test**: View page source to verify meta tags and JSON-LD, request /sitemap.xml and verify all public pages listed, request /robots.txt and verify /studio is blocked, run an SEO audit targeting ≥ 90.

### Implementation for User Story 6

- [x] T047 [P] [US6] Add page-specific metadata using Next.js Metadata API: generateMetadata for homepage (siteSettings data), /a-propos (founderProfile data), and legal pages (page title/description) with canonical URLs, OG image, Twitter cards — in each page route file
- [x] T048 [P] [US6] Create JSON-LD structured data: LocalBusiness on homepage (business name, contact, services, address), VideoObject for each portfolio project, Person on /a-propos (founder details), FAQPage where applicable — render as script type="application/ld+json" in page components
- [x] T049 [US6] Create dynamic sitemap listing all public pages (homepage, /a-propos, legal pages) with last-modified dates, excluding /studio — in src/app/sitemap.ts
- [x] T050 [US6] Create robots.txt allowing all public page crawling, blocking /studio, referencing sitemap URL — in src/app/robots.ts

**Checkpoint**: Full SEO implementation. Search engines receive structured data, proper metadata, and crawl directives.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Legal pages, responsive validation, performance audit, build verification.

- [x] T051 [P] Create /mentions-legales page fetching the "mentions-legales" page document from Sanity, rendering body with PortableText, setting metadata — in src/app/mentions-legales/page.tsx
- [x] T052 [P] Create /politique-de-confidentialite page fetching the "politique-de-confidentialite" page document from Sanity, rendering body with PortableText, setting metadata — in src/app/politique-de-confidentialite/page.tsx
- [ ] T053 Responsive audit across all 3 breakpoints: verify glass cards stack vertically on mobile, carousel is swipeable, hotspots are tappable (44x44 targets), navigation collapses to hamburger, all sections render without horizontal overflow
- [ ] T054 Run Lighthouse CI audit on homepage and /a-propos targeting ≥ 90 on Performance, SEO, Accessibility, and Best Practices — fix any issues found
- [x] T055 Validate production build: run npm run build with zero TypeScript errors and zero warnings, verify all static pages generate successfully
- [ ] T056 Run quickstart.md validation: follow setup steps from scratch, verify all development URLs work, confirm Sanity Studio loads, test webhook revalidation flow

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Stories (Phase 3–8)**: All depend on Foundational phase completion
  - US1 (Phase 3): Can start immediately after Phase 2
  - US2 (Phase 4): Can start after Phase 2 (independent of US1, but integrates into homepage)
  - US3 (Phase 5): Can start after Phase 2 (independent of US1, but integrates into homepage)
  - US4 (Phase 6): Can start after Phase 2 (fully independent page)
  - US5 (Phase 7): Can start after Phase 2 (Studio config already in foundational)
  - US6 (Phase 8): Best after US1–US4 so all pages exist for metadata/sitemap
- **Polish (Phase 9)**: Depends on US1–US6 completion

### User Story Dependencies

- **US1 (P1)**: No dependencies on other stories — produces the homepage MVP
- **US2 (P2)**: Integration task (T039) modifies src/app/page.tsx — run after T033 (US1 creates the file)
- **US3 (P3)**: Integration task (T042) modifies src/app/page.tsx — run after T033
- **US4 (P4)**: Fully independent page — no file conflicts with other stories
- **US5 (P5)**: Fully independent — Studio page is a separate route
- **US6 (P6)**: Best run after all pages exist — metadata/sitemap cover all routes

### Within Each User Story

- Components before sections (components are composed into sections)
- Sections before page integration (sections are composed into pages)
- Page integration before validation

### Parallel Opportunities

**Phase 2 parallelism**: T005–T012 (all 8 Sanity schemas) can run in parallel. T017–T018 (GlassCard, FadeIn) can run in parallel. T024–T025 (Navbar, Footer) can run in parallel after T023.

**US1 parallelism**: T026, T028, T029, T030, T031 can run in parallel (different component files). T027 depends on T026 (HeroBackground).

**US2 parallelism**: T035 and T036 can run in parallel. T037 depends on both. T038 depends on T037.

**Cross-story parallelism**: US4 and US5 are fully independent and can run in parallel with US2/US3. Component-building tasks in US2 (T035–T037) and US3 (T040) can run in parallel.

---

## Parallel Example: User Story 1

```text
# After Phase 2 checkpoint, launch parallel component creation:
T026 [P] HeroBackground parallax — src/components/ui/HeroBackground.tsx
T028 [P] ValueProposition section — src/components/sections/ValueProposition.tsx
T029 [P] Services section — src/components/sections/Services.tsx
T030 [P] Testimonials section — src/components/sections/Testimonials.tsx
T031 [P] CtaBanner section — src/components/sections/CtaBanner.tsx

# Then sequential:
T027 Hero section (depends on T026)
T032 Booking section (consent integration)
T033 Homepage page.tsx (composes all sections)
T034 Validation
```

## Parallel Example: US2 + US3 + US4 Concurrent

```text
# All can start after Phase 2. Components built in parallel:
T035 [P] VideoFacade — src/components/ui/VideoFacade.tsx
T036 [P] VideoModal — src/components/ui/VideoModal.tsx
T040 HotspotOverlay — src/components/ui/HotspotOverlay.tsx
T043 [P] PortableText renderer — src/components/portable-text/PortableTextRenderer.tsx

# Then each story completes independently:
US2: T037 → T038 → T039
US3: T041 → T042
US4: T044
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1 (homepage conversion funnel)
4. **STOP and VALIDATE**: Test homepage end-to-end — CTA → booking flow works
5. Deploy MVP to Vercel

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. US1 → Homepage MVP → Deploy
3. US2 → Portfolio carousel added → Deploy
4. US3 → Technology hotspots added → Deploy (homepage complete)
5. US4 → About page live → Deploy
6. US5 → CMS validated for client handoff
7. US6 → SEO optimized for launch
8. Polish → Legal pages, audits, responsive fixes → Production launch

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps task to specific user story for traceability
- Each user story is independently testable after its checkpoint
- Commit after each task or logical group
- No test files — validation via TypeScript strict + next build + Lighthouse (per constitution)
- All content fetched via sanityFetch with defineQuery for end-to-end type safety
- Run `npx sanity typegen generate` after any schema change
