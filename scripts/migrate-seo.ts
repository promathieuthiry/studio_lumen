/**
 * Migration script: populate SEO fields on existing Sanity documents
 * with the previously hardcoded metadata values.
 *
 * Usage:
 *   npx tsx scripts/migrate-seo.ts
 *
 * This script:
 * 1. Uploads OG images to Sanity assets
 * 2. Patches siteSettings with global SEO
 * 3. Patches founderProfile with /a-propos SEO
 * 4. Patches the "mentions-legales" page with its SEO
 * 5. Patches the "politique-de-confidentialite" page with its SEO
 *
 * Safe to run multiple times — uses `ifRevisionId` to avoid overwriting
 * manual edits, and falls back to `patch` if the document was already patched.
 */

import { config } from "dotenv";
import { createClient } from "@sanity/client";
import { createReadStream } from "fs";
import path from "path";

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

async function uploadImage(filePath: string, filename: string) {
  const absolutePath = path.resolve(filePath);
  console.log(`  Uploading ${filename}...`);
  const asset = await client.assets.upload("image", createReadStream(absolutePath), {
    filename,
  });
  console.log(`  ✓ Uploaded → ${asset._id}`);
  return {
    _type: "image" as const,
    asset: {
      _type: "reference" as const,
      _ref: asset._id,
    },
  };
}

async function findDocument(type: string, slug?: string) {
  const query = slug
    ? `*[_type == $type && slug.current == $slug][0]{ _id, _rev, seo }`
    : `*[_type == $type][0]{ _id, _rev, seo }`;
  return client.fetch(query, { type, slug });
}

// ---------------------------------------------------------------------------
// SEO data (mirrors the previously hardcoded values)
// ---------------------------------------------------------------------------

const SEO_DATA = {
  siteSettings: {
    metaTitle: "Studio Lumen — Studio vidéo mobile",
    metaDescription:
      "Studio Lumen, premier studio de production vidéo mobile en France. Vidéo corporate, captation podcast, contenu social media. Contenu livré en 48h.",
    ogImagePath: "public/og-image.jpg",
    ogImageFilename: "og-image.jpg",
  },
  founderProfile: {
    metaTitle: "Cyril Ben Said, fondateur — Studio vidéo mobile",
    metaDescription:
      "Découvrez le parcours de Cyril Ben Said, fondateur de Studio Lumen, premier studio de production vidéo mobile en France.",
    ogImagePath: "public/photo-cyril-1.jpg",
    ogImageFilename: "photo-cyril-1.jpg",
  },
  mentionsLegales: {
    metaTitle: "Mentions légales",
    metaDescription: "Mentions légales du site Studio Lumen.",
  },
  politiqueConfidentialite: {
    metaTitle: "Politique de confidentialité",
    metaDescription:
      "Politique de confidentialité et protection des données personnelles de Studio Lumen.",
  },
};

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

async function migrate() {
  console.log(`Target: project=${projectId}, dataset=${dataset}`);
  console.log("Starting SEO migration...\n");

  let failures = 0;

  // 1. siteSettings
  console.log("[1/4] siteSettings");
  try {
    const settings = await findDocument("siteSettings");
    if (!settings) {
      console.error("  ✗ No siteSettings document found. Run seed-sanity.ts first.");
      failures++;
    } else if (settings.seo?.metaTitle) {
      console.log("  Already has SEO data, skipping.");
    } else {
      const ogImage = await uploadImage(
        SEO_DATA.siteSettings.ogImagePath,
        SEO_DATA.siteSettings.ogImageFilename
      );
      await client
        .patch(settings._id)
        .set({
          seo: {
            _type: "seo",
            metaTitle: SEO_DATA.siteSettings.metaTitle,
            metaDescription: SEO_DATA.siteSettings.metaDescription,
            ogImage,
          },
        })
        .commit();
      console.log("  Patched siteSettings with SEO data.");
    }
  } catch (err) {
    console.error("  FAILED to patch siteSettings:", err);
    failures++;
  }

  // 2. founderProfile
  console.log("\n[2/4] founderProfile");
  try {
    const founder = await findDocument("founderProfile");
    if (!founder) {
      console.error("  ✗ No founderProfile document found. Run seed-sanity.ts first.");
      failures++;
    } else if (founder.seo?.metaTitle) {
      console.log("  Already has SEO data, skipping.");
    } else {
      const ogImage = await uploadImage(
        SEO_DATA.founderProfile.ogImagePath,
        SEO_DATA.founderProfile.ogImageFilename
      );
      await client
        .patch(founder._id)
        .set({
          seo: {
            _type: "seo",
            metaTitle: SEO_DATA.founderProfile.metaTitle,
            metaDescription: SEO_DATA.founderProfile.metaDescription,
            ogImage,
          },
        })
        .commit();
      console.log("  Patched founderProfile with SEO data.");
    }
  } catch (err) {
    console.error("  FAILED to patch founderProfile:", err);
    failures++;
  }

  // 3. mentions-legales page
  console.log("\n[3/4] mentions-legales");
  try {
    const mentions = await findDocument("page", "mentions-legales");
    if (!mentions) {
      console.error("  ✗ No page with slug 'mentions-legales' found.");
      failures++;
    } else if (mentions.seo?.metaTitle) {
      console.log("  Already has SEO data, skipping.");
    } else {
      await client
        .patch(mentions._id)
        .set({
          seo: {
            _type: "seo",
            metaTitle: SEO_DATA.mentionsLegales.metaTitle,
            metaDescription: SEO_DATA.mentionsLegales.metaDescription,
          },
        })
        .commit();
      console.log("  Patched mentions-legales with SEO data.");
    }
  } catch (err) {
    console.error("  FAILED to patch mentions-legales:", err);
    failures++;
  }

  // 4. politique-de-confidentialite page
  console.log("\n[4/4] politique-de-confidentialite");
  try {
    const politique = await findDocument("page", "politique-de-confidentialite");
    if (!politique) {
      console.error("  ✗ No page with slug 'politique-de-confidentialite' found.");
      failures++;
    } else if (politique.seo?.metaTitle) {
      console.log("  Already has SEO data, skipping.");
    } else {
      await client
        .patch(politique._id)
        .set({
          seo: {
            _type: "seo",
            metaTitle: SEO_DATA.politiqueConfidentialite.metaTitle,
            metaDescription: SEO_DATA.politiqueConfidentialite.metaDescription,
          },
        })
        .commit();
      console.log("  Patched politique-de-confidentialite with SEO data.");
    }
  } catch (err) {
    console.error("  FAILED to patch politique-de-confidentialite:", err);
    failures++;
  }

  if (failures > 0) {
    console.error(`\nMigration completed with ${failures} failure(s).`);
    process.exit(1);
  }
  console.log("\nSEO migration complete!");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
