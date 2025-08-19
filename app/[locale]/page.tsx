import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";
import { Github, Linkedin } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const projects = await getAllProjects();

  return (
    <div className="space-y-12">
      <Hero locale={locale} />
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.slice(0, 4).map((p) => (
          <ProjectCard
            key={p.slug}
            href={`/${locale}/project/${p.slug}`}
            title={p.title}
            meta={`${p.year} • ${p.stack?.join(", ")}`}
            summary={p.summary ?? ""}
          />
        ))}
      </div>
            {/* Social Icons */}
      <div className="flex gap-4">
        <a
          href="https://github.com/dimitris1208"
          target="_blank"
          className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://linkedin.com/in/dimitris-stragalinos-229384299"
          target="_blank"
          className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition"
        >
          <Linkedin className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
