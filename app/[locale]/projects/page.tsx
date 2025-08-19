import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default async function Projects({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const projects = await getAllProjects();
  const t = locale === "el" ? { title: "Έργα" } : { title: "Projects" };

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">{t.title}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard
            key={p.slug}
            href={`/${locale}/project/${p.slug}`}
            title={p.title}
            meta={`${p.year} • ${p.stack?.join(", ")}`}
            summary={p.summary ?? ""}
          />
        ))}
      </div>
    </div>
  );
}
