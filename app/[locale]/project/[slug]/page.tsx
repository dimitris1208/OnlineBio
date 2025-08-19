import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";
import Mdx from "@/components/Mdx";

export async function generateStaticParams() {
  const locales: Locale[] = ["en", "el"];
  const perLocale = await Promise.all(
    locales.map(async (l) => {
      const items = await getAllProjects(l);
      return items.map((p) => ({ locale: l, slug: p.slug }));
    })
  );
  return perLocale.flat();
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(locale, slug);
  if (!project) return notFound();

  return (
    <article className="prose prose-invert max-w-5xl mx-auto">
      <h1>{project.title}</h1>
      {project.summary && <p className="text-gray-400">{project.summary}</p>}
      <Mdx source={project.content} />
    </article>
  );
}
