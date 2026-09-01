import type { MetadataRoute } from "next";
import { alleArtikel, artikelUrl, siloUrl, SILOS, SITE_URL, type SiloSlug } from "@/lib/artikel";
import { TESTS, testUrl } from "@/lib/tests";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const heute = new Date().toISOString().slice(0, 10);

  const statisch: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: heute, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/wissen/`, lastModified: heute, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/tests/`, lastModified: heute, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/balanced-parenting/`, lastModified: heute, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/ueber-sarah/`, lastModified: heute, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/impressum/`, lastModified: heute, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/datenschutz/`, lastModified: heute, changeFrequency: "yearly", priority: 0.1 },
  ];

  const artikel: MetadataRoute.Sitemap = alleArtikel().map((a) => ({
    url: `${SITE_URL}${artikelUrl(a.slug)}`,
    lastModified: a.aktualisiert ?? a.datum,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Die sechs Themenseiten stehen zwischen Uebersicht und Artikel und sind
  // fuer die interne Struktur wichtiger als ein einzelner Artikel.
  const silos: MetadataRoute.Sitemap = (Object.keys(SILOS) as SiloSlug[]).map((s) => ({
    url: `${SITE_URL}${siloUrl(s)}`,
    lastModified: heute,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const tests: MetadataRoute.Sitemap = TESTS.map((t) => ({
    url: `${SITE_URL}${testUrl(t.slug)}`,
    lastModified: heute,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...statisch, ...silos, ...artikel, ...tests];
}
