import { config } from "dotenv";
import { createClient } from "@sanity/client";

config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-03-23",
  token,
  useCdn: false,
});

const faqs = [
  {
    _id: "faq-deroulement",
    _type: "faq",
    question: "Comment se déroule une prestation ?",
    answer:
      "Nous commençons par un brief pour comprendre vos besoins, puis nous organisons le tournage sur site avec notre équipement mobile professionnel. Les rushes sont montés et livrés en 48h.",
    order: 1,
  },
  {
    _id: "faq-delais",
    _type: "faq",
    question: "Quels sont vos délais de livraison ?",
    answer:
      "Notre promesse : un contenu livré en 48 heures après le tournage. Pour les projets plus complexes (corporate, podcast multi-épisodes), un planning sur mesure est établi dès le brief.",
    order: 2,
  },
  {
    _id: "faq-deplacement",
    _type: "faq",
    question: "Vous déplacez-vous partout en France ?",
    answer:
      "Oui, notre studio est 100 % mobile. Nous intervenons dans toute la France et pouvons nous adapter à tout type de lieu : bureaux, événements, extérieurs.",
    order: 3,
  },
  {
    _id: "faq-tarif",
    _type: "faq",
    question: "Quel est le tarif d'une prestation ?",
    answer:
      "Chaque projet est unique. Le tarif dépend du format (réseaux sociaux, corporate, podcast…), de la durée du tournage et du nombre de livrables. Contactez-nous pour un devis gratuit.",
    order: 4,
  },
  {
    _id: "faq-equipement",
    _type: "faq",
    question: "Quel équipement utilisez-vous ?",
    answer:
      "Nous utilisons du matériel professionnel haut de gamme : caméras, éclairage, micros et stabilisateurs — tout ce qu'il faut pour un rendu cinématographique, directement sur votre lieu de tournage.",
    order: 5,
  },
  {
    _id: "faq-preparation",
    _type: "faq",
    question: "Faut-il prévoir quelque chose pour le tournage ?",
    answer:
      "Nous nous occupons de tout le matériel. Il suffit de prévoir le lieu et les personnes à filmer. Nous vous envoyons un guide de préparation simple avant chaque tournage.",
    order: 6,
  },
  {
    _id: "faq-revisions",
    _type: "faq",
    question: "Peut-on modifier le montage après livraison ?",
    answer:
      "Bien sûr. Une boucle de révision est incluse dans chaque prestation. Vous recevez le premier montage, puis nous intégrons vos retours pour la version finale.",
    order: 7,
  },
  {
    _id: "faq-formats",
    _type: "faq",
    question: "Dans quels formats sont livrés les contenus ?",
    answer:
      "Les vidéos sont livrées dans les formats adaptés à vos plateformes : 16:9 (YouTube, site web), 9:16 (Reels, TikTok, Stories), 1:1 (LinkedIn, Instagram). Vous recevez tous les formats convenus.",
    order: 8,
  },
];

async function main() {
  console.log("🎬 Seeding FAQ content for Studio Lumen...\n");

  for (const faq of faqs) {
    console.log(`  → ${faq._id} — ${faq.question}`);
  }

  await Promise.all(faqs.map((faq) => client.createOrReplace(faq)));

  console.log(`\n✅ ${faqs.length} FAQ items seeded successfully.`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
