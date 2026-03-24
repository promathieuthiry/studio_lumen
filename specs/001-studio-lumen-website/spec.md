# Feature Specification: Studio Lumen Website

**Feature Branch**: `001-studio-lumen-website`
**Created**: 2026-03-23
**Status**: Draft
**Input**: User description: "Build the Studio Lumen website — a high-performance static site serving as credibility showcase, lead generation hub, and frictionless booking experience for France's first mobile video production studio."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Prospect Discovers Studio Lumen and Books a Call (Priority: P1)

A B2B prospect (marketing director, HR manager, or business owner) lands on studiolumen.fr — either directly or via search. They scroll through a cinematic single-page experience that follows the AIDA model: an attention-grabbing hero with the truck, value proposition cards proving speed and simplicity, service offerings, social proof via testimonials, and finally a clear booking section. Within minutes, they click "Réserver" and schedule a discovery call via an embedded calendar widget. The entire flow is designed to convert curiosity into a booked meeting.

**Why this priority**: This is the core revenue-generating journey. Without a working homepage-to-booking funnel, the site delivers zero business value.

**Independent Test**: Navigate to the homepage, scroll through all sections top-to-bottom, verify each AIDA section renders with content, and complete a booking action via the embedded calendar widget.

**Acceptance Scenarios**:

1. **Given** a prospect visits the homepage on desktop, **When** the page loads, **Then** they see a full-bleed hero with truck imagery, headline "Commencez avec Studio Lumen", subtitle mentioning 48h delivery, a green "Réserver" CTA button, and the founder's photo.
2. **Given** a prospect scrolls past the hero, **When** they reach the value proposition section, **Then** they see three glass-effect cards (speed, zero logistics, 48h delivery) and a client logo bar.
3. **Given** a prospect scrolls to the services section, **When** it renders, **Then** they see categorized service cards (social media, testimonials, interviews, corporate, podcasts) with descriptions and a booking-to-delivery timeline — no prices displayed.
4. **Given** a prospect clicks "Réserver" in the navigation or any CTA button, **When** the page scrolls to the booking section, **Then** they see an embedded calendar widget where they can select an available date and schedule a discovery call.
5. **Given** a prospect views the page on a slow connection, **When** the page loads, **Then** the static HTML and critical content render immediately while third-party widgets (calendar, analytics) load progressively.

---

### User Story 2 — Prospect Evaluates Work Quality via Portfolio (Priority: P2)

A prospect wants to see examples of Studio Lumen's production quality before committing to a call. They navigate to the portfolio section and browse a horizontal carousel of video thumbnails. They can filter by category and click any thumbnail to watch the video. The cinematic presentation (3D tilt effects, smooth animations) reinforces the premium positioning.

**Why this priority**: Portfolio is the primary trust-builder. Prospects need proof of quality before booking, but the site can still convert without it (testimonials and value props carry initial weight).

**Independent Test**: Navigate to the portfolio section, verify thumbnails load, interact with the carousel (scroll, filter by category), click a thumbnail and verify the video player opens and streams content.

**Acceptance Scenarios**:

1. **Given** a prospect scrolls to the portfolio section, **When** it loads, **Then** they see a horizontal carousel of video project thumbnails with a center-focused layout.
2. **Given** the portfolio displays multiple categories, **When** the prospect selects a category filter, **Then** only projects matching that category are shown.
3. **Given** a prospect clicks a video thumbnail, **When** the player opens, **Then** a modal/lightbox overlay appears with the video streaming smoothly, and the page behind is dimmed.
4. **Given** a prospect views the portfolio on mobile, **When** they interact with the carousel, **Then** it responds to swipe gestures with smooth horizontal scrolling.

---

### User Story 3 — Prospect Explores the Mobile Studio Technology (Priority: P3)

A prospect is intrigued by the truck concept and wants to understand the equipment inside. They scroll to the Technology section and see a full-bleed interior photo of the truck. Animated pulsing dots mark each piece of equipment. Hovering or tapping a dot reveals a glass-effect tooltip with the equipment name and a brief description. Only one tooltip is open at a time. On mobile, the dots remain tappable or a scrollable list alternative is provided.

**Why this priority**: The truck is the core differentiator. Showcasing the technology builds desire (AIDA), but is not blocking for initial conversions.

**Independent Test**: Navigate to the Technology section, verify the truck image loads with positioned hotspot dots, interact with each dot to verify tooltips appear with equipment details, and confirm only one tooltip is open at a time.

**Acceptance Scenarios**:

1. **Given** a prospect scrolls to the Technology section, **When** the image loads, **Then** they see a full-bleed truck interior photo with animated pulsing dots at equipment positions.
2. **Given** a prospect hovers over (desktop) or taps (mobile) a hotspot dot, **When** the interaction occurs, **Then** a glass-effect tooltip smoothly animates in showing the equipment name and description.
3. **Given** a tooltip is open and the prospect interacts with a different dot, **When** the new dot is activated, **Then** the previous tooltip closes and the new one opens.
4. **Given** a prospect views this section on mobile, **When** they interact with hotspots, **Then** dots are tappable with appropriately sized touch targets, or a scrollable equipment list is provided as an alternative.

---

### User Story 4 — Prospect Learns About the Founder (Priority: P4)

A prospect considering booking wants to know who is behind Studio Lumen. They discover the About page through contextual links: the founder's clickable photo in the hero, a "Découvrir mon parcours" link in the footer, secondary links in the CTA banner or testimonials section. The page tells Cyril's professional story — his background, motivations, journey milestones, and vision. It builds personal trust and ends with a strong CTA back to booking.

**Why this priority**: Trust-building through personal story supports conversions, but is a secondary path — most prospects will book based on the homepage alone.

**Independent Test**: Click the founder's photo in the hero or the footer link, verify navigation to /a-propos, confirm the page displays biography content with journey milestones, and verify the page ends with a booking CTA.

**Acceptance Scenarios**:

1. **Given** a prospect clicks the founder's photo in the hero section, **When** the navigation completes, **Then** they arrive at /a-propos showing Cyril's full biography.
2. **Given** a prospect reads the About page, **When** they scroll through it, **Then** they see a professional bio, a timeline of career milestones, motivations for creating Studio Lumen, and relevant skills.
3. **Given** a prospect finishes reading the About page, **When** they reach the bottom, **Then** they see a prominent CTA to book a discovery call.
4. **Given** a prospect clicks "Découvrir mon parcours" in the footer, **When** the page loads, **Then** it navigates to /a-propos with the same content.

---

### User Story 5 — Client Manages All Content Independently (Priority: P5)

After launch, Cyril (the client) needs to update the website content without developer assistance. He accesses the embedded CMS at /studio and can: add or edit portfolio projects (with video references), manage testimonials, update service descriptions, modify equipment hotspot details and positions, add client logos, edit his founder profile, and update global site settings (title, description, CTA text, social links). Changes trigger a site rebuild and appear on the live site.

**Why this priority**: Content autonomy is a contractual deliverable, but the CMS is only needed post-launch — the initial content is seeded during development.

**Independent Test**: Access /studio, create a new testimonial entry with all fields, publish it, trigger a rebuild, and verify it appears on the live site in the testimonials section.

**Acceptance Scenarios**:

1. **Given** Cyril navigates to /studio, **When** the page loads, **Then** he sees the CMS dashboard with document types for projects, testimonials, services, equipment, client logos, founder profile, site settings, and pages.
2. **Given** Cyril creates a new portfolio project with title, category, video reference, and thumbnail, **When** he publishes it, **Then** it appears in the portfolio section after a site rebuild.
3. **Given** Cyril edits the equipment hotspot positions (X/Y percentages), **When** the changes are published and the site rebuilds, **Then** the dots on the Technology section reflect the new positions.
4. **Given** Cyril updates the site settings (CTA text, social links), **When** the changes propagate, **Then** all pages reflect the updated global settings.

---

### User Story 6 — Prospect Finds Studio Lumen via Search (Priority: P6)

A marketing manager searches for "studio vidéo mobile entreprise" on Google. Studio Lumen appears in the results with a rich snippet showing the business name, description, and service details (via structured data). The prospect clicks through and lands on the homepage. AI search engines (Perplexity, Google AI Overviews) can also cite Studio Lumen's content accurately thanks to structured, factual content and FAQ sections.

**Why this priority**: SEO is essential for long-term growth but takes months to show results. The site must be SEO-ready at launch, but organic traffic is a lagging indicator.

**Independent Test**: Validate that all pages generate correct meta tags, Open Graph tags, structured data, a valid sitemap.xml, and robots.txt. Run an SEO audit and verify a score of 90 or higher.

**Acceptance Scenarios**:

1. **Given** a search engine crawls the homepage, **When** it parses the HTML, **Then** it finds valid LocalBusiness structured data with business name, contact, and service descriptions.
2. **Given** a search engine crawls a portfolio project, **When** it parses the page, **Then** it finds VideoObject structured data for each video.
3. **Given** any page is rendered, **When** the HTML is inspected, **Then** it contains proper meta title, description, canonical URL, Open Graph tags, and Twitter Card tags.
4. **Given** a crawler requests /sitemap.xml, **When** it loads, **Then** all public pages are listed with correct URLs and last-modified dates.
5. **Given** a crawler requests /robots.txt, **When** it loads, **Then** it references the sitemap and allows crawling of all public pages while blocking /studio.

---

### Edge Cases

- What happens when a prospect visits on an extremely slow connection (2G/3G)? Static HTML MUST render first; third-party widgets and videos MUST lazy-load without blocking the page.
- What happens when a video in the portfolio fails to load? A graceful fallback MUST display (thumbnail with a "video unavailable" message) rather than a broken player.
- What happens when the calendar widget fails to load? A fallback MUST display a direct link to the scheduling page.
- What happens when no testimonials exist in the CMS? The testimonials section MUST hide entirely rather than showing an empty carousel.
- What happens when the hotspot truck image hasn't loaded yet? Hotspot dots MUST only appear after the background image has fully loaded.
- What happens when a prospect navigates directly to /a-propos via URL? The page MUST work independently as a standalone page with full navigation.
- What happens when Cyril adds a portfolio project without a video reference? The CMS MUST validate that required fields are filled before publishing.
- What happens when a user rejects cookies? Analytics MUST not load, and the calendar embed MUST be replaced with a direct booking link. All other site functionality MUST work normally.

## Requirements *(mandatory)*

### Functional Requirements

**Homepage & Navigation**

- **FR-001**: The site MUST present a single-page scrolling homepage following the AIDA model with sections in this order: Hero, Value Proposition, Services, Portfolio, CTA Banner, Technology, Testimonials, Booking, Footer.
- **FR-002**: Navigation MUST be a sticky top bar with: logo (left, scrolls to top), section anchors (Expertise, Portfolio, Technologie) as centered pill items, and a highlighted "Réserver" CTA button (right).
- **FR-003**: Navigation MUST collapse to a hamburger menu on screens smaller than 640px.
- **FR-004**: All anchor links MUST smooth-scroll to their target section.

**Hero Section**

- **FR-005**: The hero MUST display a full-bleed truck photograph as background with a dark cinematic overlay, headline text, subtitle mentioning 48h delivery, a green CTA button, and the founder's profile photo.
- **FR-006**: The founder's photo in the hero MUST link to /a-propos with a hover effect.

**Value Proposition**

- **FR-007**: The value proposition MUST display three glass-effect cards showing key differentiators: speed (3X plus rapide), zero logistics constraints, and 48h content delivery.
- **FR-008**: A client logo bar MUST display below the value proposition cards, showing logos of past clients.

**Services**

- **FR-009**: Services MUST be displayed as categorized cards covering: social media content, client testimonials, interviews, corporate videos, and podcasts.
- **FR-010**: Service cards MUST NOT display any pricing information. A "Sur devis" (quote-based) indicator MAY be shown.
- **FR-011**: A visual timeline from booking to content delivery MUST be included in or near the services section.

**Portfolio**

- **FR-012**: The portfolio MUST display as a horizontal carousel of video project thumbnails with a center-focused layout.
- **FR-013**: Portfolio projects MUST be filterable by category.
- **FR-014**: Clicking a thumbnail MUST open a modal/lightbox overlay with a video player using adaptive streaming. The overlay MUST be centered on screen with a dimmed background. Closing the modal MUST return the user to their previous scroll position in the portfolio carousel.
- **FR-015**: Videos MUST lazy-load — no video content downloads until the user explicitly interacts.

**Technology Hotspots**

- **FR-016**: The Technology section MUST display a full-bleed truck interior photograph with interactive hotspot dots positioned via percentage-based coordinates.
- **FR-017**: Hotspot dots MUST animate with a pulsing glow effect in the idle state.
- **FR-018**: Interacting with a hotspot (hover on desktop, tap on mobile) MUST reveal a glass-effect tooltip showing equipment name and description.
- **FR-019**: Only one tooltip MUST be open at a time — activating a new hotspot closes the previous tooltip.
- **FR-020**: On mobile, hotspots MUST be accessible via tappable dots with adequate touch targets or an alternative scrollable equipment list.

**Testimonials**

- **FR-021**: Testimonials MUST display as a carousel or card layout showing: client name, company, role, quote, and avatar.
- **FR-022**: If no testimonials exist in the CMS, the section MUST be hidden entirely.

**Booking**

- **FR-023**: The booking section MUST embed a third-party calendar widget for scheduling discovery calls.
- **FR-024**: The calendar widget MUST lazy-load — it MUST NOT block initial page rendering.
- **FR-025**: If the calendar widget fails to load, a fallback direct link MUST be displayed.

**CTA Banners**

- **FR-026**: A mid-page CTA banner MUST appear between the portfolio and technology sections with a prominent booking button, persuasive copy, and the founder's photo.
- **FR-027**: The CTA banner MUST include a secondary subtle link ("Qui est derrière Studio Lumen ?") to /a-propos.

**Footer**

- **FR-028**: The footer MUST include: founder photo background, "Merci" message, contact email (cyril@studiolumen.fr), link to /a-propos ("Découvrir mon parcours"), social links (LinkedIn primary), and legal page links.

**About Page (/a-propos)**

- **FR-029**: The About page MUST display: Cyril's full biography, a timeline of career milestones, motivations for creating Studio Lumen, skills/expertise, and social links.
- **FR-030**: The About page MUST NOT appear in the main navigation. It is accessible via contextual links (hero photo, footer, CTA banner, testimonials section).
- **FR-031**: The About page MUST end with a prominent CTA to book a discovery call.

**Legal Pages**

- **FR-032**: The site MUST include /mentions-legales and /politique-de-confidentialite pages as required by French law.

**Content Management**

- **FR-033**: An embedded CMS MUST be accessible at /studio for authorized content editors.
- **FR-034**: The CMS MUST support creating and editing: portfolio projects, testimonials, services, equipment hotspots, client logos, founder profile, site settings, and legal pages.
- **FR-035**: Equipment hotspots in the CMS MUST include configurable X/Y percentage coordinates for positioning on the truck image.
- **FR-036**: The CMS MUST validate required fields before allowing content to be published.
- **FR-037**: Content changes MUST trigger a site rebuild or on-demand revalidation so updates appear on the live site.

**SEO & Discoverability**

- **FR-038**: Every page MUST include: meta title, meta description, canonical URL, Open Graph tags, and Twitter Card tags.
- **FR-039**: The site MUST generate structured data (LocalBusiness for the homepage, VideoObject for portfolio items, Person for the About page, FAQPage where applicable).
- **FR-040**: The site MUST generate a valid sitemap.xml listing all public pages.
- **FR-041**: The site MUST generate a robots.txt that allows crawling of public pages and blocks the CMS admin (/studio).

**Performance & Responsiveness**

- **FR-042**: All pages MUST be statically generated at build time, with content-driven pages using incremental revalidation.
- **FR-043**: All images MUST be optimized with automatic format conversion and responsive sizing.
- **FR-044**: The site MUST be fully responsive across three breakpoints: mobile (< 640px), tablet (640–1024px), desktop (> 1024px).

**Cookie Consent & Privacy (CNIL Compliance)**

- **FR-045**: The site MUST display a cookie consent banner on first visit, before any non-essential cookies are set.
- **FR-046**: Non-essential scripts (analytics, third-party calendar embed) MUST NOT load until the user explicitly grants consent via the banner.
- **FR-047**: The consent banner MUST present "Accept" and "Reject" options with equal visual prominence, as required by CNIL regulations.
- **FR-048**: The user's consent choice MUST be persisted so the banner does not reappear on subsequent visits within a reasonable retention period.
- **FR-049**: If the user rejects cookies, the site MUST remain fully functional — the calendar section MUST fall back to a direct booking link, and analytics MUST not load.

### Key Entities

- **Project**: A portfolio item representing a video production. Key attributes: title, slug, category, description, video reference, thumbnail image, featured flag, display order.
- **Testimonial**: A client endorsement. Key attributes: client name, company, role, quote text, avatar image, featured flag, display order.
- **Service**: A service offering. Key attributes: title, description, icon identifier, list of deliverables, turnaround time, display order.
- **Equipment**: A piece of truck equipment shown as a hotspot. Key attributes: name, description, image, technical specs, X position (%), Y position (%), display order.
- **Client Logo**: A past client's logo for the trust bar. Key attributes: company name, logo image, website URL, display order.
- **Founder Profile**: Singleton entity for the About page. Key attributes: full name, title, biography (rich text), photo, journey milestones (year + title + description), vision statement, motivations, skills list, social links.
- **Site Settings**: Singleton global configuration. Key attributes: site title, meta description, default OG image, social links, CTA text, CTA URL, founder photo, founder short bio.
- **Page**: Generic content page for legal/privacy. Key attributes: title, slug, body (rich text).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can navigate from homepage load to booking a discovery call in under 3 clicks and under 60 seconds.
- **SC-002**: All pages achieve a performance score of 90 or higher in standard web performance audits.
- **SC-003**: The homepage fully renders (above-the-fold content visible) in under 2 seconds on a standard broadband connection.
- **SC-004**: The site is fully functional and visually correct on the latest versions of Chrome, Safari, Firefox, and Edge on both desktop and mobile.
- **SC-005**: The content editor (Cyril) can independently add a new portfolio project, publish it, and see it live on the site within 10 minutes — without developer assistance.
- **SC-006**: All public pages pass SEO audits with a score of 90 or higher, including valid structured data, meta tags, and sitemap.
- **SC-007**: The site scores 90 or above on accessibility audits for color contrast, heading hierarchy, alt texts, and keyboard navigation.
- **SC-008**: Average session duration exceeds 2 minutes, indicating visitors engage with multiple sections.
- **SC-009**: The booking conversion funnel (CTA clicks → calendar widget opens → booking completed) is trackable end-to-end via analytics events.
- **SC-010**: The portfolio section supports displaying at least 10 video projects simultaneously with smooth scrolling and no visible performance degradation.

## Clarifications

### Session 2026-03-23

- Q: Does the site require a CNIL-compliant cookie consent banner given its use of analytics and third-party calendar embeds? → A: Yes — full CNIL-compliant cookie consent banner required. Non-essential scripts (analytics, calendar embed) MUST load only after explicit user consent. The reject option MUST be as prominent as the accept option.
- Q: What interaction pattern should the portfolio video player use? → A: Modal/lightbox overlay. Video plays in a centered overlay on top of the page with dimmed background. Closing the modal returns the user to their previous scroll position.

## Assumptions

- The client has finalized the dark-mode visual identity with lime-green accent as shown in existing mockups — no further brand explorations needed.
- The client's logo files, truck photographs (exterior and interior), and founder portrait are available in high resolution before development begins.
- Approximately 10 portfolio videos will be uploaded and ready for embedding before launch.
- At least 2–3 testimonials will be available at launch, with the CMS allowing more to be added post-launch.
- The client will handle calendar booking tool account setup and configuration (appointment type, availability) independently.
- Legal page content (mentions légales, politique de confidentialité) will be provided by the client or a legal advisor.
- The domain studiolumen.fr is owned by the client and DNS can be migrated.
- The site is French-language only for v1 — no multi-language support required.
