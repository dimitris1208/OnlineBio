import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type Project = {
  title: string;
  slug: string;
  year: number;
  stack?: string[];
  summary?: string;
  content: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export async function getAllProjects(): Promise<Project[]> {
  const files = await fs.readdir(CONTENT_DIR);
  const mdx = files.filter(f => f.endsWith(".mdx"));
  const items = await Promise.all(
    mdx.map(async (f) => {
      const raw = await fs.readFile(path.join(CONTENT_DIR, f), "utf8");
      const { data, content } = matter(raw);
      return {
        title: data.title,
        slug: data.slug,
        year: Number(data.year),
        stack: data.stack ?? [],
        summary: data.summary ?? "",
        content
      } as Project;
    })
  );
  return items.sort((a,b) => b.year - a.year);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(raw);
    return {
      title: data.title,
      slug: data.slug,
      year: Number(data.year),
      stack: data.stack ?? [],
      summary: data.summary ?? "",
      content
    };
  } catch {
    return null;
  }
}
