import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { getDict, site } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import Mdx from "@/components/Mdx";
import MiniFlow from "@/components/MiniFlow";
import { CaseStudy } from "@/components/ProjectNode";

type Params = { params: Promise<{ locale: Locale; slug: string }> };

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

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(locale, slug);
  if (!project) return {};
  const path = `/project/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, el: `/el${path}`, "x-default": `/en${path}` },
    },
    openGraph: {
      type: "article",
      siteName: site.name,
      title: project.title,
      description: project.summary,
      url: `/${locale}${path}`,
      locale: locale === "el" ? "el_GR" : "en_US",
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { locale, slug } = await params;
  const project = await getProjectBySlug(locale, slug);
  if (!project) return notFound();
  const t = getDict(locale).projects;

  return (
    <article className="mx-auto max-w-5xl px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <Link href={`/${locale}#projects`} className="label text-muted hover:text-lime">
        ← {t.back}
      </Link>

      <header className="mt-8">
        <p className="label text-lime">
          {project.year} · {t.kind}
        </p>
        <h1 className="display mt-3 text-[clamp(2.75rem,7vw,4.75rem)]">{project.title}</h1>
        {project.summary && <p className="mt-6 max-w-3xl text-lg text-muted md:text-2xl">{project.summary}</p>}
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Stack">
          {project.stack.map((s) => (
            <li key={s} className="chip">{s}</li>
          ))}
        </ul>
      </header>

      <section className="mt-12 border-y border-line py-10">
        <MiniFlow steps={project.flow} live className="mb-9" />
        <CaseStudy project={project} t={t} />
      </section>

      <div className="mt-12">
        <Mdx source={project.content} />
      </div>
    </article>
  );
}
