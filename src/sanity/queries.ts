import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    siteTitle,
    description,
    ogImage,
    logo,
    heroBackgroundDark,
    heroBackgroundLit,
    heroHeadline,
    heroSubtitle,
    valuePropositions[]{
      title,
      description,
      icon,
      statValue,
      statSuffix
    },
    socialLinks[]{
      platform,
      url
    },
    ctaText,
    ctaUrl,
    founderPhoto,
    founderBio,
    contactEmail
  }
`);

export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(order asc){
    _id,
    title,
    description,
    icon,
    deliverables,
    turnaround,
    order
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(order asc){
    _id,
    title,
    slug,
    category,
    description,
    youtubeVideoId,
    thumbnail,
    featured,
    order
  }
`);

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonial"] | order(order asc){
    _id,
    clientName,
    company,
    role,
    quote,
    avatar,
    featured,
    order
  }
`);

export const CLIENT_LOGOS_QUERY = defineQuery(`
  *[_type == "clientLogo"] | order(order asc){
    _id,
    name,
    logo,
    url,
    order
  }
`);

export const EQUIPMENT_QUERY = defineQuery(`
  *[_type == "equipment"] | order(order asc){
    _id,
    name,
    description,
    image,
    specs,
    hotspotX,
    hotspotY,
    order
  }
`);

export const FOUNDER_PROFILE_QUERY = defineQuery(`
  *[_type == "founderProfile"][0]{
    fullName,
    title,
    bio,
    photo,
    journey[]{
      year,
      title,
      description
    },
    vision,
    motivations,
    skills,
    socialLinks[]{
      platform,
      url
    }
  }
`);

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    body
  }
`);

export const SITE_LOGO_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{ logo }
`);
