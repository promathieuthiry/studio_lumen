import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Site Logo",
      type: "image",
      description: "Logo displayed in the navbar. Recommended: transparent PNG or SVG.",
    }),
    defineField({
      name: "heroBackground",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Full-screen background image for the hero section",
      hidden: true,
      deprecated: { reason: "Use heroBackgroundDark and heroBackgroundLit instead" },
    }),
    defineField({
      name: "heroBackgroundDark",
      title: "Hero Background — Lights Off",
      type: "image",
      options: { hotspot: true },
      description: "Dark version of the hero background (lights off). Visible on page load.",
    }),
    defineField({
      name: "heroBackgroundLit",
      title: "Hero Background — Lights On",
      type: "image",
      options: { hotspot: true },
      description: "Lit version of the hero background (lights on). Revealed as user scrolls.",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "valuePropositions",
      title: "Value Propositions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon (Lucide name)",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "statValue",
              title: "Stat Number",
              type: "number",
              description: "Animated number displayed on the card (e.g. 3, 99.9, 150)",
            }),
            defineField({
              name: "statSuffix",
              title: "Stat Suffix",
              type: "string",
              description: "Unit or symbol after the number (e.g. GW, %, +)",
            }),
          ],
        },
      ],
      validation: (r) => r.required().min(3).max(3),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "platform", title: "Platform", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
        },
      ],
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      initialValue: "Réserver",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA Target URL",
      type: "string",
      initialValue: "#reserver",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "expertiseVideo",
      title: "Expertise Section Video",
      type: "file",
      options: { accept: "video/*" },
      description: "Video displayed above the services accordion (16:9 recommended). MP4 format.",
    }),
    defineField({
      name: "founderPhoto",
      title: "Founder Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "founderBio",
      title: "Founder Bio (short)",
      type: "text",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      initialValue: "cyril@studiolumen.fr",
    }),
    defineField({
      name: "contactPhone",
      title: "Téléphone",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "address",
      title: "Adresse",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "street", title: "Rue", type: "string" }),
        defineField({ name: "postalCode", title: "Code postal", type: "string" }),
        defineField({ name: "city", title: "Ville", type: "string" }),
      ],
    }),
    defineField({
      name: "openingHours",
      title: "Horaires d'ouverture",
      type: "string",
      description: "Format schema.org (ex : Mo-Fr 09:00-18:00)",
      group: "seo",
    }),
    defineField({
      name: "priceRange",
      title: "Fourchette de prix",
      type: "string",
      description: "Ex : €€ ou €€€",
      group: "seo",
    }),
    defineField({
      name: "areaServed",
      title: "Zone desservie",
      type: "array",
      of: [{ type: "string" }],
      description: "Villes ou régions desservies (ex : Paris, Lyon, France entière)",
      group: "seo",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  groups: [
    { name: "seo", title: "SEO" },
  ],
});
