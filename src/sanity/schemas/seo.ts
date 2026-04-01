import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Titre affiché dans l'onglet du navigateur et les résultats Google (max ~60 caractères).",
      validation: (r) => r.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Description affichée dans les résultats Google (max ~160 caractères).",
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "ogImage",
      title: "Image Open Graph",
      type: "image",
      description: "Image affichée lors du partage sur les réseaux sociaux (1200×630 recommandé).",
    }),
  ],
});
