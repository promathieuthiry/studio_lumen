import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroBackground",
      title: "Hero Background Image",
      type: "image",
      options: { hotspot: true },
      description: "Full-screen background image for the hero section",
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
  ],
});
