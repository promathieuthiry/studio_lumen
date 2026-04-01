import { urlFor, type SanityImageSource } from "@/sanity/image";

export type SeoFields = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: SanityImageSource | null;
};

/**
 * Build an OG-safe image URL from a Sanity image source.
 * Returns null if the reference is broken or missing.
 */
export function buildOgImageUrl(source: SanityImageSource): string | null {
  try {
    const url = urlFor(source).width(1200).height(630).url();
    if (url.includes("undefined")) return null;
    return url;
  } catch {
    return null;
  }
}
