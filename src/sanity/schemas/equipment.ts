import { defineType, defineField } from "sanity";

export const equipment = defineType({
  name: "equipment",
  title: "Equipment",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
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
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "string",
    }),
    defineField({
      name: "hotspotX",
      title: "Hotspot X (%)",
      type: "number",
      validation: (r) => r.required().min(0).max(100),
    }),
    defineField({
      name: "hotspotY",
      title: "Hotspot Y (%)",
      type: "number",
      validation: (r) => r.required().min(0).max(100),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
});
