# Data Model: Studio Lumen Website

**Feature**: 001-studio-lumen-website
**Date**: 2026-03-23
**Source**: spec.md Key Entities + PRD Section 7

## Sanity CMS Document Types

All content is managed via Sanity v3. Documents are either **collections** (multiple instances) or **singletons** (one instance globally).

---

### project (Collection)

Portfolio video production item displayed in the carousel.

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| title | string | Yes | Project display name |
| slug | slug (from title) | Yes | URL-friendly identifier |
| category | string (list) | Yes | One of: social-media, testimonial, interview, corporate, podcast, photo |
| description | text | No | Short project description |
| cloudflareVideoId | string | Yes | Cloudflare Stream video ID for HLS embed |
| thumbnail | image | Yes | Video thumbnail for carousel display |
| featured | boolean | No | Whether to highlight in carousel (default: false) |
| order | number | No | Display order (lower = first) |

**Validation**: title, slug, category, cloudflareVideoId, and thumbnail are required before publishing.

---

### testimonial (Collection)

Client endorsement displayed in the testimonials section.

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| clientName | string | Yes | Client's full name |
| company | string | Yes | Company name |
| role | string | No | Client's role/title at company |
| quote | text | Yes | Testimonial text |
| avatar | image | No | Client photo |
| featured | boolean | No | Whether to prioritize display (default: false) |
| order | number | No | Display order (lower = first) |

**Validation**: clientName, company, and quote are required.

---

### service (Collection)

Service offering displayed as a card on the homepage.

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| title | string | Yes | Service name |
| description | text | Yes | Brief description of the service |
| icon | string | Yes | Lucide icon name identifier |
| deliverables | array of string | No | List of what the client receives |
| turnaround | string | No | Expected delivery timeline |
| order | number | No | Display order (lower = first) |

**Validation**: title, description, and icon are required.

---

### equipment (Collection)

Truck equipment item shown as an interactive hotspot.

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| name | string | Yes | Equipment display name |
| description | text | Yes | One-line equipment description |
| image | image | No | Optional equipment photo |
| specs | string | No | Technical specifications text |
| hotspotX | number (0-100) | Yes | X position as percentage on truck image |
| hotspotY | number (0-100) | Yes | Y position as percentage on truck image |
| order | number | No | Display order for mobile list alternative |

**Validation**: name, description, hotspotX, and hotspotY are required. hotspotX/Y must be between 0 and 100.

---

### clientLogo (Collection)

Past client logo displayed in the trust bar.

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| name | string | Yes | Company name |
| logo | image | Yes | Logo image (preferably SVG or transparent PNG) |
| url | url | No | Company website URL |
| order | number | No | Display order (lower = first) |

**Validation**: name and logo are required.

---

### founderProfile (Singleton)

Cyril's profile data for the About page and contextual elements.

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| fullName | string | Yes | "Cyril Ben Said" |
| title | string | Yes | Professional title |
| bio | Portable Text (block) | Yes | Full biography with rich text formatting |
| photo | image | Yes | Professional portrait photo |
| journey | array of object | No | Career milestones: { year: string, title: string, description: text } |
| vision | text | No | Vision statement |
| motivations | text | No | Why Studio Lumen was created |
| skills | array of string | No | List of professional skills/expertise |
| socialLinks | array of object | No | Social profiles: { platform: string, url: url } |

**Validation**: fullName, title, bio, and photo are required.

---

### siteSettings (Singleton)

Global site configuration.

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| siteTitle | string | Yes | "Studio Lumen" |
| description | text | Yes | Default meta description |
| ogImage | image | Yes | Default Open Graph image |
| heroHeadline | string | Yes | Hero section headline (e.g., "Commencez avec Studio Lumen") |
| heroSubtitle | string | Yes | Hero section subtitle (e.g., "Contenu livré en 48h") |
| valuePropositions | array of object | Yes | Value proposition cards: { title: string, description: text, icon: string } (exactly 3 items) |
| socialLinks | array of object | No | Social profiles: { platform: string, url: url } |
| ctaText | string | Yes | Global CTA button label (default: "Réserver") |
| ctaUrl | string | Yes | CTA target (default: "#reserver") |
| founderPhoto | image | No | Founder photo for footer/CTA banner |
| founderBio | text | No | Short founder bio for footer |
| contactEmail | string | No | Contact email (default: cyril@studiolumen.fr) |

**Validation**: siteTitle, description, ogImage, heroHeadline, heroSubtitle, valuePropositions, ctaText, and ctaUrl are required.

---

### page (Collection)

Generic content page for legal/privacy pages.

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| title | string | Yes | Page title |
| slug | slug (from title) | Yes | URL path segment |
| body | Portable Text (block) | Yes | Full page content with rich text |

**Validation**: title, slug, and body are required.

---

## Entity Relationships

```text
siteSettings (singleton)
  └── referenced by: all pages (global config, CTA, social links)

founderProfile (singleton)
  └── referenced by: About page, Hero (photo link), Footer, CTA Banner

project (collection)
  └── displayed in: Portfolio carousel
  └── category field enables: filtering

testimonial (collection)
  └── displayed in: Testimonials section (hidden if empty)

service (collection)
  └── displayed in: Services section

equipment (collection)
  └── displayed in: Technology hotspot overlay
  └── hotspotX/Y position on: truck interior image

clientLogo (collection)
  └── displayed in: Value proposition logo bar

page (collection)
  └── routes: /mentions-legales, /politique-de-confidentialite
```

## Category Enumeration

Portfolio project categories (managed as a string list in the schema):

| Value | Display Label |
| ----- | ------------- |
| social-media | Réseaux sociaux |
| testimonial | Témoignages |
| interview | Interviews |
| corporate | Corporate |
| podcast | Podcasts |
| photo | Photos |

## State & Lifecycle

All documents follow Sanity's built-in draft/published lifecycle:
- **Draft**: Created or edited, not yet visible on the live site.
- **Published**: Visible on the live site after the next rebuild or ISR revalidation.
- **Archived**: Not a native Sanity concept. For soft-deletion, a `hidden` boolean field could be added in a future phase.

No custom state machines are needed for v1.
