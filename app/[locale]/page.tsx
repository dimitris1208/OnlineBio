import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Github, Linkedin } from "lucide-react";
import Hero from "@/components/Hero";
import FlowNode from "@/components/FlowNode";
import FlowRuntime from "@/components/FlowRuntime";
import Inspector from "@/components/Inspector";
import ProjectNode from "@/components/ProjectNode";
import SiteCard from "@/components/SiteCard";
import { getSites } from "@/lib/sites";
import { getAllProjects, type Project } from "@/lib/projects";
import JsonLd from "@/components/JsonLd";
import { getDict, site } from "@/lib/content";
import { homeJsonLd, pageMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

type Params = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMetadata({ locale, path: "", title: t.meta.title, description: t.meta.description });
}

export default async function Page({ params }: Params) {
  const { locale } = await params;
  const t = getDict(locale);
  const projects = await getAllProjects(locale);
  const projectNode = (p: Project) => (
    <ProjectNode key={p.slug} project={p} href={`/${locale}/project/${p.slug}`} t={t.projects} />
  );

  const sites = getSites();
  const platforms = Array.from(new Set(sites.map((s) => s.platform)));
  // projects are listed newest first; the websites row sits after the 2025 ones
  const older = projects.findIndex((p) => p.year < 2025);
  const websitesAt = older === -1 ? projects.length : older;

  return (
    <>
      <JsonLd data={homeJsonLd(locale, t)} />

      <div className="flow">
        <div className="rail" data-rail aria-hidden="true">
          <span className="rail-fill" data-rail-fill />
          <span className="rail-head" data-rail-head />
        </div>

        <Hero locale={locale} t={t.hero} />

        {/* SOURCE */}
        <FlowNode id="about" kind={t.about.kind} title={t.about.title}>
          <div className="grid gap-8 md:grid-cols-[11rem_1fr] md:gap-12" data-reveal>
            <Image
              src="/avatar.jpeg"
              alt={t.about.avatarAlt}
              width={176}
              height={176}
              sizes="176px"
              className="h-36 w-36 border-2 border-lime object-cover md:h-44 md:w-44"
            />
            <p className="text-lg leading-relaxed md:text-xl md:leading-relaxed">{t.about.intro}</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="card" data-reveal>
              <h3 className="label text-lime">{t.about.educationTitle}</h3>
              <ul className="mt-4 space-y-3 text-fg/90">
                {t.about.education.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
            <div className="card" data-reveal>
              <h3 className="label text-lime">{t.about.softTitle}</h3>
              <ul className="mt-4 space-y-3 text-fg/90">
                {t.about.soft.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </FlowNode>

        {/* TRANSFORM */}
        <FlowNode id="skills" kind={t.skills.kind} title={t.skills.title}>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.skills.groups.map((g) => (
              <div key={g.label} className="card" data-reveal>
                <h3 className="label text-lime">{g.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="chip">{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="tap mt-14" data-reveal>
            <span className="tap-port" aria-hidden="true" />
            <span className="tap-line" aria-hidden="true" />
            <h3 className="label text-lime">{t.skills.certTitle}</h3>
          </div>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {t.skills.certs.map((c) => (
              <li key={c.name} className="card flex flex-col" data-reveal>
                <span className="label text-muted">{c.issuer}</span>
                <span className="display mt-3 text-3xl">{c.name}</span>
                <span className="label mt-auto flex items-center gap-2 pt-6 text-lime">
                  <BadgeCheck className="h-4 w-4" aria-hidden="true" /> {t.skills.certTag}
                </span>
              </li>
            ))}
          </ul>
        </FlowNode>

        {/* ROUTE */}
        <FlowNode id="experience" kind={t.experience.kind} title={t.experience.title}>
          <ol className="space-y-4">
            {t.experience.items.map((item) => (
              <li key={`${item.org}-${item.period}`} className="card tap" data-reveal>
                <span className="tap-port" aria-hidden="true" />
                <span className="tap-line" aria-hidden="true" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <h3 className="display text-[clamp(1.8rem,4.2vw,2.75rem)]">{item.role}</h3>
                  <p className="label text-lime">{item.period}</p>
                </div>
                <p className="mt-2 font-mono text-sm text-muted">@ {item.org}</p>
                <ul className="mt-4 space-y-2 text-fg/90">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-lime" aria-hidden="true">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </FlowNode>

        {/* CONNECTORS */}
        <FlowNode id="projects" kind={t.projects.kind} title={t.projects.title}>
          <p className="mb-6 text-muted">{t.projects.hint}</p>
          {projects.slice(0, websitesAt).map(projectNode)}

          {/* the websites take the slot the single company-portfolio project used to have */}
          <details id="websites" className="project tap" data-reveal>
            <summary>
              <span className="tap-port" aria-hidden="true" />
              <span className="tap-line" aria-hidden="true" />
              <span className="label block text-muted">{platforms.join(" / ")}</span>
              <h3 className="display project-title mt-2 text-[clamp(1.8rem,4.2vw,2.75rem)]">{t.websites.title}</h3>
              <span className="mt-3 block max-w-2xl text-muted">{t.websites.lead}</span>
              <span className="plus" aria-hidden="true" />
            </summary>
            <div className="project-body">
              <ul className="grid gap-x-5 gap-y-9 pt-2 sm:grid-cols-2 lg:grid-cols-3">
                {sites.map((s) => (
                  <li key={s.url}>
                    <SiteCard site={s} />
                  </li>
                ))}
              </ul>
            </div>
          </details>

          {projects.slice(websitesAt).map(projectNode)}
        </FlowNode>

        {/* RESPONSE */}
        <FlowNode id="contact" kind={t.contact.kind} title={t.contact.title}>
          <div data-reveal>
            <p className="display text-[clamp(2rem,5vw,3.25rem)] text-lime">{t.contact.display}</p>
            <p className="mt-6 text-muted md:text-lg">{t.contact.lead}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block break-all border-b-2 border-lime pb-1 font-mono text-lg hover:text-lime md:text-3xl"
            >
              {site.email}
            </a>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={site.github} target="_blank" rel="noopener noreferrer me" className="btn">
                <Github className="h-4 w-4" aria-hidden="true" /> GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer me" className="btn">
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </div>
        </FlowNode>
      </div>

      <Inspector t={t} />
      <FlowRuntime />
    </>
  );
}
