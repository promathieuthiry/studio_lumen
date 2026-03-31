import { sanityFetch } from "@/sanity/live";
import { SITE_LOGO_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { Navbar } from "./Navbar";

export async function SiteNavbar() {
  let logoUrl: string | undefined;
  try {
    const { data } = await sanityFetch({ query: SITE_LOGO_QUERY });
    if (data?.logo) {
      logoUrl = urlFor(data.logo).height(400).quality(100).auto("format").url();
    }
  } catch (error) {
    console.error("[SiteNavbar] Failed to fetch logo:", error);
  }

  return <Navbar logoUrl={logoUrl} />;
}
