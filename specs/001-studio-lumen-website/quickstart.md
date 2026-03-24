# Quickstart: Studio Lumen Website

**Feature**: 001-studio-lumen-website
**Date**: 2026-03-23

## Prerequisites

- Node.js 20 LTS
- npm or pnpm
- Sanity account (free tier sufficient)
- Cloudflare Stream account (for video hosting)
- Vercel account (for deployment)

## Initial Setup

```bash
# Clone and install
git clone <repo-url> studio-lumen
cd studio-lumen
npm install

# Environment variables (.env.local)
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-23
SANITY_API_READ_TOKEN=<viewer-token>
SANITY_REVALIDATE_SECRET=<random-secret>
NEXT_PUBLIC_GA_MEASUREMENT_ID=<G-XXXXXXXXXX>
NEXT_PUBLIC_CALENDLY_URL=<calendly-scheduling-url>
NEXT_PUBLIC_CLOUDFLARE_CUSTOMER_CODE=<customer-subdomain>
```

## Development

```bash
# Start Next.js dev server (includes embedded Sanity Studio at /studio)
npm run dev

# Generate Sanity types after schema changes
npx sanity schema extract --enforce-required-fields
npx sanity typegen generate
```

## Key URLs (Development)

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | Homepage |
| `http://localhost:3000/studio` | Sanity Studio CMS |
| `http://localhost:3000/a-propos` | About page |
| `http://localhost:3000/mentions-legales` | Legal page |
| `http://localhost:3000/politique-de-confidentialite` | Privacy page |

## Build & Validate

```bash
# Production build (must pass with zero errors per constitution)
npm run build

# Lighthouse CI audit (target: ≥ 90 on Performance, SEO, Accessibility)
npx lighthouse http://localhost:3000 --output json --output html
```

## Sanity Webhook Setup (Production)

Configure a webhook in the Sanity dashboard:

- **URL**: `https://studiolumen.fr/api/revalidate/tag`
- **Secret**: Value of `SANITY_REVALIDATE_SECRET`
- **Filter**: `_type in ["project", "testimonial", "service", "equipment", "clientLogo", "founderProfile", "siteSettings", "page"]`
- **Projection**: `{ "tags": [_type, _type + ":" + slug.current] }`

## Deployment

Deploy to Vercel via Git integration. Environment variables must be set in Vercel project settings. The embedded Sanity Studio deploys alongside the site — no separate Studio deployment needed.

## Content Seeding

After initial deployment, access `/studio` to create:

1. **siteSettings** (singleton) — site title, description, OG image, CTA text/URL
2. **founderProfile** (singleton) — Cyril's bio, photo, milestones
3. **service** entries — one per service offering
4. **project** entries — portfolio videos with Cloudflare Stream IDs
5. **equipment** entries — truck equipment with hotspot coordinates
6. **clientLogo** entries — past client logos
7. **testimonial** entries — client quotes
8. **page** entries — mentions légales, politique de confidentialité
