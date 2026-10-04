import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getAllProjects } from "@/lib/projects";
import { siteUrl } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const entry = (path: string, priority: number) =>
    locales.map((l) => ({
      url: `${base}/${l}${path}`,
      priority,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${base}/${x}${path}`])) },
    }));

  const slugs = (await getAllProjects("en")).map((p) => p.slug);
  return [...entry("", 1), ...slugs.flatMap((s) => entry(`/project/${s}`, 0.7))];
}
