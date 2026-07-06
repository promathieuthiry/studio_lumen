import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Réseaux sociaux", value: "social-media" },
          { title: "Témoignages", value: "testimonial" },
          { title: "Interviews", value: "interview" },
          { title: "Corporate", value: "corporate" },
          { title: "Podcasts", value: "podcast" },
          { title: "Photos", value: "photo" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "youtubeVideoId",
      title: "YouTube Video ID",
      type: "string",
      description:
        "The video ID from the YouTube URL (e.g. dQw4w9WgXcQ from youtube.com/watch?v=dQw4w9WgXcQ)",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "uploadDate",
      title: "Upload Date",
      type: "date",
      description:
        "Date the video was published on YouTube (used for SEO structured data). Falls back to the document creation date if empty.",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
