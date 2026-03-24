# Research: Studio Lumen Website

**Feature**: 001-studio-lumen-website
**Date**: 2026-03-23

## 1. Next.js + Sanity Integration

### Decision: Use `defineLive` from `next-sanity/live` as primary data-fetching layer

**Rationale**: `defineLive` is the current recommended pattern from Sanity's agent-toolkit best practices. It handles fetching, caching, and real-time invalidation automatically. The `SanityLive` component subscribes to mutations and triggers re-renders when editors publish.

**Alternatives considered**:
- Manual `sanityFetch` wrapper with custom caching — only needed for granular cache control beyond `defineLive`
- Separate Studio deployment — adds operational complexity; embedded is simpler for a single-developer site

### Decision: Typed GROQ via `defineQuery` + Sanity TypeGen

**Rationale**: `defineQuery`-wrapped queries get auto-inferred return types when passed to `sanityFetch`. Run `npx sanity schema extract && npx sanity typegen generate` to produce types. Zero manual type annotations.

### Decision: Embed Sanity Studio at `/studio/[[...tool]]/page.tsx` with `NextStudio`

**Rationale**: Single deployment on Vercel. Set `basePath: '/studio'` in `sanity.config.ts`. Export `metadata` and `viewport` from `next-sanity/studio` to handle mobile viewport and noindex.

---

## 2. ISR / Revalidation Strategy

### Decision: Tag-based revalidation via `revalidateTag` + Sanity webhooks

**Rationale**: Tag-based is superior for a portfolio site because a single document change (e.g., updating a testimonial) can appear on multiple pages. `revalidateTag` invalidates all pages using that tag without enumerating paths. Lazy re-render on next visit prevents thundering herd on bulk updates.

**Webhook configuration**:
- Filter: `_type in ["project", "testimonial", "service", "equipment", "clientLogo", "founderProfile", "siteSettings", "page"]`
- Projection: `{ "tags": [_type, _type + ":" + slug.current] }`
- URL: `https://studiolumen.fr/api/revalidate/tag`
- Secret: `SANITY_REVALIDATE_SECRET` env var

**Alternatives considered**:
- `revalidatePath` — fragile for content appearing on multiple routes
- Time-based (`revalidate: 60`) — stale content window, wasted API calls
- Note: time-based and tag-based cannot be combined on the same fetch call

---

## 3. Sanity Schema Patterns

### Decision: Singleton pattern with Structure Builder filtering

For `siteSettings` and `founderProfile`:
- Structure Builder: explicit `S.document()` entries with fixed `documentId`
- Template filtering: hide singletons from "New document" menu
- Action filtering: only allow publish/discard/restore (no duplicate/delete)

**Gotcha**: Create singleton documents *before* adding their type to the filter set.

### Decision: Use `defineType` / `defineField` for all schemas with validation rules

Collection schemas (project, testimonial, service, equipment, clientLogo, page) use standard patterns with `validation: (r) => r.required()` on mandatory fields.

---

## 4. Image Handling

### Decision: `next-sanity/image` Image component + `@sanity/image-url` urlFor helper

**Rationale**: The `Image` component from `next-sanity/image` wraps `next/image` with a Sanity-aware loader. URLs point directly to Sanity CDN with transforms — no Next.js image optimization proxy needed. No `remotePatterns` config required.

**Key detail**: Always pass the full image object (not just asset reference) to `urlFor` so crop/hotspot settings are respected.

---

## 5. Cloudflare Stream Video Embedding

### Decision: `@cloudflare/stream-react` with thumbnail facade (click-to-load)

**Rationale**: Official React component, TypeScript-typed, handles responsive sizing. The facade pattern (show thumbnail first, mount `<Stream>` on click) means zero iframe/JS until interaction.

**Thumbnails**: Use Stream's URL-based system:
```
https://customer-{code}.cloudflarestream.com/{videoUid}/thumbnails/thumbnail.jpg?time=2s&height=720
```

**Adaptive bitrate**: Automatic. Stream handles HLS/DASH transcoding with no configuration.

**Cookies/CNIL**: Stream player does NOT set tracking cookies. Only functional Cloudflare infrastructure cookies which are CNIL-exempt. The facade pattern adds extra defensibility.

---

## 6. CNIL Cookie Consent

### Decision: Custom lightweight consent banner (no library)

**Rationale**: For a simple site with only GA4 and Calendly as non-essential services, a full library (tarteaucitron ~100KB, Orejime ~37KB) is overkill. Custom solution gives full control over design, zero extra dependency (~2-3KB), and exact CNIL-specific behavior.

**Fallback**: If the site grows to 5+ third-party services, switch to Orejime (best accessibility, French-made, RGAA compliant).

**Architecture**:
- `ConsentProvider` React context reads/writes a first-party `cookie_consent` cookie
- `ConsentBanner` shows equally prominent "Tout accepter" / "Tout refuser" buttons
- GA4 uses Google Consent Mode v2 (default denied, update to granted on consent)
- Calendly: facade pattern — loads embed only on consent + interaction; fallback = direct link
- Stream: facade (thumbnail-first) — no consent gate needed (no tracking cookies)
- Footer "Gérer les cookies" link reopens the banner
- Consent cookie expiry: 6 months (CNIL best practice)

---

## 7. Framer Motion UI Patterns

### Glass-morphism cards (Tailwind)
```
bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
shadow-lg shadow-black/20 ring-1 ring-white/5
```
Pure presentation — can remain Server Component.

### Interactive hotspots
- `AnimatePresence mode="wait"` for one-at-a-time tooltip transitions
- Pulsing dot: repeating `scale: [1, 2.2]` + `opacity: [0.6, 0]` animation
- Spring transition: `damping: 25, stiffness: 300`
- Minimum 44x44 tap target for mobile accessibility

### Portfolio carousel with 3D tilt
- `motion.div` with `drag="x"` and `dragConstraints`
- `useTransform` maps horizontal offset to `rotateY` (clamped ±25°), `scale`, and `opacity`
- `animate(x, 0)` resets on category filter change
- Touch swipe support is native with Framer Motion drag

### Hero parallax
- `useScroll` with `offset: ["start start", "end start"]`
- `useTransform(scrollYProgress, [0, 1], ["0%", "30%"])` for background Y movement
- Runs on compositor thread (transform + opacity only) — no layout reflow

### Video modal
- `AnimatePresence` backdrop + modal with spring enter, quick exit
- Scroll lock: `body.style.position = "fixed"` + restore `scrollTo` on close
- Escape key handler for keyboard accessibility

### Scroll-triggered fade-in
- `whileInView="visible"` with `viewport={{ once: true, amount: 0.3 }}`
- Configurable direction (up/down/left/right) and stagger delay
- `MotionConfig reducedMotion="user"` for accessibility

### Server vs Client Component Strategy
| Pattern | Type | Reason |
| ------- | ---- | ------ |
| GlassCard | Server | Pure presentation |
| FadeIn | Client | motion.div, whileInView |
| HeroBackground | Client | useScroll, useTransform |
| TechnologyHotspots | Client | useState, AnimatePresence |
| PortfolioCarousel | Client | useMotionValue, drag |
| VideoModal | Client | AnimatePresence, useEffect |
| Section layouts | Server | Static layout, pass data to client children |
