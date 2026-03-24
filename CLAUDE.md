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
<!-- MANUAL ADDITIONS END -->
