import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/live";
import { PAGE_BY_SLUG_QUERY } from "@/sanity/queries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import type { PortableTextBlock } from "@portabletext/types";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Studio Lumen.",
};

type PageData = {
  title: string;
  body: PortableTextBlock[];
} | null;

async function fetchPage(): Promise<PageData> {
  try {
    const { data } = await sanityFetch({
      query: PAGE_BY_SLUG_QUERY,
      params: { slug: "mentions-legales" },
    });
    return data as PageData;
  } catch {
    return null;
  }
}

export default async function MentionsLegalesPage() {
  const page = await fetchPage();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8">
            {page?.title || "Mentions légales"}
          </h1>
          {page?.body ? (
            <PortableTextRenderer value={page.body} />
          ) : (
            <p className="text-white/60">Contenu bientôt disponible.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
