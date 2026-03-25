import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/live";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/queries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import type { PortableTextBlock } from "@portabletext/types";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles de Studio Lumen.",
};

type PageData = {
  title: string;
  body: PortableTextBlock[];
} | null;

async function fetchPage(): Promise<PageData> {
  try {
    const { data } = await sanityFetch({
      query: PAGE_BY_SLUG_QUERY,
      params: { slug: "politique-de-confidentialite" },
    });
    return data as PageData;
  } catch {
    return null;
  }
}

export default async function PolitiqueConfidentialitePage() {
  const page = await fetchPage();

  return (
    <>
      <Navbar />
      <main className="pt-28 section-padding">
        <div className="container-site max-w-3xl">
          <h1 className="font-display text-[35px] sm:text-[48px] font-semibold text-white mb-10 leading-[1]">
            {page?.title || "Politique de confidentialité"}
          </h1>
          {page?.body ? (
            <PortableTextRenderer value={page.body} />
          ) : (
            <p className="text-text-muted">Contenu bientôt disponible.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
