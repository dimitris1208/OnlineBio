import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import Mdx from "@/components/Mdx";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  const locales: Locale[] = ["en", "el"];
  return projects.flatMap((p) => locales.map((l) => ({ locale: l, slug: p.slug })));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return notFound();

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{project.title}</h1>
      {project.summary && <p className="text-gray-400">{project.summary}</p>}
      <Mdx source={project.content} />
    </article>
  );
}
