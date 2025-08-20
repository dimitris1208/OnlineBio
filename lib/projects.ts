import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "./i18n";

export type Project = {
  slug: string;
  title: string;
  year: number;
  stack: string[];
  summary?: string;
  content: string;
  locale: Locale;
};

type ProjectFrontmatter = {
  slug: string;
  title: string;
  year?: number | string;
  date?: number | string;        // για backward-compat
  stack?: string[];
  tech?: string[];               // για backward-compat
  summary?: string;
  locale?: Locale | string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

async function readAllMdx(): Promise<Array<{ data: ProjectFrontmatter; content: string }>> {
  const files = await fs.readdir(CONTENT_DIR);
  const mdx = files.filter((f) => f.endsWith(".mdx"));
  return Promise.all(
    mdx.map(async (f) => {
      const raw = await fs.readFile(path.join(CONTENT_DIR, f), "utf8");
      const { data, content } = matter(raw);
      // κάνουμε narrow στο αναμενόμενο σχήμα frontmatter
      const fm = data as ProjectFrontmatter;
      return { data: fm, content };
    })
  );
}

function normalize(data: ProjectFrontmatter, content: string): Project {
  const yearRaw = data.year ?? data.date;
  const year = typeof yearRaw === "string" ? Number(yearRaw) : (yearRaw ?? new Date().getFullYear());

  const stack =
    Array.isArray(data.stack)
      ? data.stack
      : Array.isArray(data.tech)
      ? data.tech
      : [];

  const locale = (data.locale ?? "en") as Locale;

  return {
    slug: String(data.slug),
    title: String(data.title),
    year: Number.isFinite(year) ? (year as number) : new Date().getFullYear(),
    stack,
    summary: data.summary ? String(data.summary) : undefined,
    content,
    locale,
  };
}

export async function getAllProjects(locale: Locale): Promise<Project[]> {
  const all = (await readAllMdx()).map(({ data, content }) => normalize(data, content));
  const filtered = all.filter((p) => p.locale === locale);

  const dedup = Array.from(new Map(filtered.map((p) => [p.slug, p])).values());
  return dedup.sort((a, b) => b.year - a.year);
}

export async function getProjectBySlug(locale: Locale, slug: string): Promise<Project | null> {
  const all = (await readAllMdx()).map(({ data, content }) => normalize(data, content));
  const byLocale = all.find((p) => p.slug === slug && p.locale === locale);
  if (byLocale) return byLocale;

  const fallback = all.find((p) => p.slug === slug && p.locale === "en");
  return fallback ?? null;
}
