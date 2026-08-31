import type { MetadataRoute } from "next";
import { alleArtikel, artikelUrl, SITE_URL } from "@/lib/artikel";
import { TESTS, testUrl } from "@/lib/tests";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const heute = new Date().toISOString().slice(0, 10);

  const statisch: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: heute, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/wissen/`, lastModified: heute, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/tests/`, lastModified: heute, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/balanced-parenting/`, lastModified: heute, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/impressum/`, lastModified: heute, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/datenschutz/`, lastModified: heute, changeFrequency: "yearly", priority: 0.1 },
  ];

  const artikel: MetadataRoute.Sitemap = alleArtikel().map((a) => ({
    url: `${SITE_URL}${artikelUrl(a.slug)}`,
    lastModified: a.aktualisiert ?? a.datum,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const tests: MetadataRoute.Sitemap = TESTS.map((t) => ({
    url: `${SITE_URL}${testUrl(t.slug)}`,
    lastModified: heute,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...statisch, ...artikel, ...tests];
}
