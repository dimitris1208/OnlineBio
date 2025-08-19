import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";

export default async function Projects({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const projects = await getAllProjects(locale);

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">
        {locale === "el" ? "Έργα" : "Projects"}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/${locale}/project/${p.slug}`}
            className="rounded-2xl border border-white/10 p-5 hover:bg-white/5 transition"
          >
            <div className="text-sm text-gray-400">{p.year} • {p.stack?.join(", ")}</div>
            <div className="text-xl font-medium mt-1">{p.title}</div>
            {p.summary && <div className="text-sm mt-2 text-gray-400 line-clamp-2">{p.summary}</div>}
          </Link>
        ))}
      </div>
    </div>
  );
}
