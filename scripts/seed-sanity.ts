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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function portableText(text: string) {
  return text.split("\n\n").map((paragraph, i) => ({
    _type: "block",
    _key: `block-${i}`,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `span-${i}`,
        text: paragraph.trim(),
        marks: [],
      },
    ],
  }));
}

async function seed(doc: Record<string, unknown>) {
  const id = doc._id as string;
  const type = doc._type as string;
  console.log(`  → Creating ${type}: ${id}`);
  await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
}

// ---------------------------------------------------------------------------
// Site Settings (singleton)
// ---------------------------------------------------------------------------

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  siteTitle: "Studio Lumen",
  description:
    "Studio Lumen — Le premier studio de production vidéo mobile en France. Contenu professionnel livré en 48h, directement depuis notre camion studio.",
  heroHeadline: "Commencez avec Studio Lumen",
  heroSubtitle: "Contenu livré en 48h",
  valuePropositions: [
    {
      _key: "vp-1",
      _type: "object",
      title: "3X plus rapide",
      description:
        "Notre studio mobile se déplace directement chez vous. Pas de studio à réserver, pas de logistique complexe — on tourne et on livre trois fois plus vite qu'un studio traditionnel.",
      icon: "Zap",
    },
    {
      _key: "vp-2",
      _type: "object",
      title: "Zéro contrainte logistique",
      description:
        "Oubliez la location de salle, le transport de matériel et la coordination d'équipes. Notre camion studio arrive équipé et prêt à tourner, où que vous soyez.",
      icon: "Truck",
    },
    {
      _key: "vp-3",
      _type: "object",
      title: "Livraison en 48h",
      description:
        "Du tournage à la livraison finale, vos contenus sont prêts en 48 heures. Un workflow optimisé pour que votre communication n'attende jamais.",
      icon: "Clock",
    },
  ],
  socialLinks: [
    {
      _key: "social-linkedin",
      _type: "object",
      platform: "LinkedIn",
      url: "https://www.linkedin.com/company/studio-lumen",
    },
    {
      _key: "social-instagram",
      _type: "object",
      platform: "Instagram",
      url: "https://www.instagram.com/studiolumen.fr",
    },
  ],
  ctaText: "Réserver",
  ctaUrl: "#reserver",
  founderBio:
    "Cyril Ben Said, fondateur de Studio Lumen. Passionné de vidéo et d'entrepreneuriat, il a créé le premier studio de production mobile en France.",
  contactEmail: "cyril@studiolumen.fr",
};

// ---------------------------------------------------------------------------
// Founder Profile (singleton)
// ---------------------------------------------------------------------------

const founderProfile = {
  _id: "founderProfile",
  _type: "founderProfile",
  fullName: "Cyril Ben Said",
  title: "Fondateur & Réalisateur — Studio Lumen",
  bio: portableText(
    `Passionné par l'image et l'entrepreneuriat depuis toujours, j'ai fondé Studio Lumen avec une conviction simple : la production vidéo professionnelle doit être accessible, rapide et sans friction.

Après plusieurs années dans l'audiovisuel et la communication digitale, j'ai constaté un problème récurrent : les entreprises veulent du contenu vidéo de qualité, mais le processus traditionnel — réservation de studio, coordination d'équipes, délais de post-production — est trop lourd et trop lent.

Studio Lumen est né de cette frustration. En transformant un véhicule en studio de production mobile entièrement équipé, j'ai éliminé les contraintes logistiques. Résultat : un contenu professionnel livré en 48 heures, tourné directement chez mes clients.

Mon approche est centrée sur l'efficacité et la qualité. Chaque projet bénéficie du même niveau d'exigence technique — éclairage professionnel, captation 4K, son broadcast — dans un format agile qui s'adapte à vos contraintes.`
  ),
  journey: [
    {
      _key: "j-1",
      _type: "object",
      year: "2018",
      title: "Débuts dans l'audiovisuel",
      description:
        "Premiers projets vidéo en freelance pour des startups et PME. Découverte des contraintes de production classiques.",
    },
    {
      _key: "j-2",
      _type: "object",
      year: "2020",
      title: "Production digitale",
      description:
        "Spécialisation dans le contenu vidéo pour les réseaux sociaux et la communication corporate. Plus de 100 projets réalisés.",
    },
    {
      _key: "j-3",
      _type: "object",
      year: "2023",
      title: "Le concept du studio mobile",
      description:
        "L'idée naît : un studio de production complet dans un véhicule, pour supprimer toute contrainte logistique côté client.",
    },
    {
      _key: "j-4",
      _type: "object",
      year: "2024",
      title: "Lancement de Studio Lumen",
      description:
        "Aménagement du camion studio, acquisition du matériel professionnel et lancement officiel de Studio Lumen.",
    },
  ],
  vision:
    "Rendre la production vidéo professionnelle aussi simple qu'un appel téléphonique. Pas de brief interminable, pas de logistique complexe — juste du contenu de qualité, livré rapidement.",
  motivations:
    "J'ai créé Studio Lumen parce que je crois que chaque entreprise mérite du contenu vidéo à la hauteur de son ambition, sans les contraintes d'une production traditionnelle. Le studio mobile, c'est la liberté de créer partout, pour tous.",
  skills: [
    "Réalisation vidéo",
    "Direction artistique",
    "Captation 4K",
    "Éclairage studio",
    "Prise de son broadcast",
    "Montage & post-production",
    "Motion design",
    "Stratégie de contenu",
  ],
  socialLinks: [
    {
      _key: "social-linkedin",
      _type: "object",
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/cyrilbensaid",
    },
  ],
};

// ---------------------------------------------------------------------------
// Services (collection)
// ---------------------------------------------------------------------------

const services = [
  {
    _id: "service-reseaux-sociaux",
    _type: "service",
    title: "Réseaux sociaux",
    description:
      "Contenu vidéo optimisé pour Instagram, LinkedIn, TikTok et YouTube. Formats courts, dynamiques et engageants, adaptés aux codes de chaque plateforme.",
    icon: "Share2",
    deliverables: [
      "Vidéos courtes (Reels, Shorts, TikTok)",
      "Carrousels vidéo",
      "Stories animées",
      "Sous-titrage intégré",
    ],
    turnaround: "48h",
    order: 1,
  },
  {
    _id: "service-temoignages",
    _type: "service",
    title: "Témoignages",
    description:
      "Captez la voix de vos clients satisfaits avec des témoignages vidéo authentiques et professionnels. Le format le plus puissant pour bâtir la confiance.",
    icon: "MessageSquareQuote",
    deliverables: [
      "Interview client filmée",
      "Montage dynamique avec sous-titres",
      "Version longue + extraits courts",
      "Habillage graphique personnalisé",
    ],
    turnaround: "48h",
    order: 2,
  },
  {
    _id: "service-interviews",
    _type: "service",
    title: "Interviews",
    description:
      "Interviews dirigeants, experts ou collaborateurs dans un cadre professionnel. Idéal pour le personal branding, la communication interne ou les relations presse.",
    icon: "Mic",
    deliverables: [
      "Interview cadrée multi-angles",
      "Montage avec transitions fluides",
      "Extraits optimisés réseaux sociaux",
      "Version podcast audio",
    ],
    turnaround: "48–72h",
    order: 3,
  },
  {
    _id: "service-corporate",
    _type: "service",
    title: "Corporate",
    description:
      "Films institutionnels, présentations d'entreprise et contenus de marque. Une production soignée qui reflète l'identité et les valeurs de votre organisation.",
    icon: "Building2",
    deliverables: [
      "Film de présentation entreprise",
      "Vidéo marque employeur",
      "Contenu événementiel",
      "Motion design & habillage",
    ],
    turnaround: "72h–1 semaine",
    order: 4,
  },
  {
    _id: "service-podcasts",
    _type: "service",
    title: "Podcasts",
    description:
      "Production podcast vidéo complète, du tournage au montage. Un format en pleine croissance pour positionner votre expertise et engager votre audience.",
    icon: "Headphones",
    deliverables: [
      "Captation vidéo multi-caméras",
      "Enregistrement audio broadcast",
      "Montage épisode complet",
      "Clips promotionnels pour réseaux sociaux",
    ],
    turnaround: "48–72h",
    order: 5,
  },
  {
    _id: "service-photos",
    _type: "service",
    title: "Photos",
    description:
      "Portraits professionnels, photos corporate et packshots réalisés dans notre studio mobile. Un éclairage maîtrisé pour des images percutantes.",
    icon: "Camera",
    deliverables: [
      "Portraits corporate",
      "Photos d'équipe",
      "Packshots produit",
      "Retouche professionnelle",
    ],
    turnaround: "24–48h",
    order: 6,
  },
];

// ---------------------------------------------------------------------------
// Equipment (collection)
// ---------------------------------------------------------------------------

const equipment = [
  {
    _id: "equipment-camera",
    _type: "equipment",
    name: "Caméra 4K Cinema",
    description:
      "Captation cinématographique en 4K avec rendu colorimétrique professionnel pour un résultat broadcast.",
    specs: "Sony FX6 — Capteur plein format, 4K 120fps, 15+ stops de dynamique",
    hotspotX: 35,
    hotspotY: 45,
    order: 1,
  },
  {
    _id: "equipment-eclairage",
    _type: "equipment",
    name: "Éclairage LED Studio",
    description:
      "Panneaux LED professionnels bi-couleur pour un éclairage studio maîtrisé en toute situation.",
    specs: "Aputure 300d III + Softboxes — Lumière continue, CRI 96+, température réglable",
    hotspotX: 65,
    hotspotY: 30,
    order: 2,
  },
  {
    _id: "equipment-audio",
    _type: "equipment",
    name: "Prise de son broadcast",
    description:
      "Microphones et enregistreur broadcast pour une qualité audio irréprochable, essentielle pour interviews et podcasts.",
    specs: "Sennheiser MKH 416 + Zoom F6 — Enregistrement 32-bit float, anti-saturation",
    hotspotX: 20,
    hotspotY: 65,
    order: 3,
  },
  {
    _id: "equipment-prompteur",
    _type: "equipment",
    name: "Prompteur professionnel",
    description:
      "Prompteur intégré pour guider vos intervenants et garantir des prises fluides dès le premier essai.",
    specs: "Écran 17\" haute luminosité — Compatible tablette, vitesse réglable",
    hotspotX: 50,
    hotspotY: 40,
    order: 4,
  },
  {
    _id: "equipment-fond",
    _type: "equipment",
    name: "Fonds interchangeables",
    description:
      "Fonds de studio modulables pour adapter le décor à votre identité visuelle ou au ton de votre contenu.",
    specs: "Système rail — Fonds noir, blanc, vert (chroma key), personnalisable",
    hotspotX: 80,
    hotspotY: 55,
    order: 5,
  },
  {
    _id: "equipment-montage",
    _type: "equipment",
    name: "Station de montage embarquée",
    description:
      "Poste de montage haute performance intégré au camion pour un pré-montage immédiat après le tournage.",
    specs: "MacBook Pro M3 Max + DaVinci Resolve — Montage, étalonnage, export 4K en temps réel",
    hotspotX: 50,
    hotspotY: 75,
    order: 6,
  },
];

// ---------------------------------------------------------------------------
// Pages (collection) — skeleton legal content
// ---------------------------------------------------------------------------

const pages = [
  {
    _id: "page-mentions-legales",
    _type: "page",
    title: "Mentions légales",
    slug: { _type: "slug", current: "mentions-legales" },
    body: portableText(
      `Conformément aux dispositions des articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, il est porté à la connaissance des utilisateurs du site studiolumen.fr les informations suivantes :

Éditeur du site : Studio Lumen — Cyril Ben Said. Adresse e-mail : cyril@studiolumen.fr.

Hébergeur : Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.

Propriété intellectuelle : L'ensemble du contenu de ce site (textes, images, vidéos, logos) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable.

Données personnelles : Les informations recueillies via le formulaire de contact sont destinées exclusivement à Studio Lumen pour le traitement de votre demande. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à cyril@studiolumen.fr.`
    ),
  },
  {
    _id: "page-politique-de-confidentialite",
    _type: "page",
    title: "Politique de confidentialité",
    slug: { _type: "slug", current: "politique-de-confidentialite" },
    body: portableText(
      `La présente politique de confidentialité décrit la manière dont Studio Lumen collecte, utilise et protège les informations personnelles des visiteurs du site studiolumen.fr.

Collecte des données : Studio Lumen peut collecter des informations personnelles lorsque vous utilisez le formulaire de contact ou le système de réservation (nom, adresse e-mail, numéro de téléphone, nom d'entreprise).

Utilisation des données : Les données collectées sont utilisées exclusivement pour répondre à vos demandes, planifier des prestations et améliorer nos services. Elles ne sont jamais cédées à des tiers à des fins commerciales.

Cookies : Ce site utilise des cookies techniques nécessaires à son fonctionnement. Des cookies analytiques (Google Analytics) sont utilisés uniquement avec votre consentement explicite, conformément aux recommandations de la CNIL.

Conservation des données : Vos données personnelles sont conservées pour une durée maximale de 3 ans à compter de votre dernier contact avec Studio Lumen.

Vos droits : Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Vous pouvez exercer ces droits en nous contactant à cyril@studiolumen.fr.

Modifications : Studio Lumen se réserve le droit de modifier la présente politique à tout moment. Les modifications prennent effet dès leur publication sur cette page.`
    ),
  },
];

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

async function main() {
  console.log("🎬 Seeding Sanity content for Studio Lumen...\n");

  console.log("[Singletons]");
  await seed(siteSettings);
  await seed(founderProfile);

  console.log("\n[Services]");
  for (const s of services) {
    await seed(s);
  }

  console.log("\n[Equipment]");
  for (const e of equipment) {
    await seed(e);
  }

  console.log("\n[Pages]");
  for (const p of pages) {
    await seed(p);
  }

  console.log("\n✅ Seeding complete! Open https://studio-lumen.sanity.studio/ to verify.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
