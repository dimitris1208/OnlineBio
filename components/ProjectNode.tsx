import Link from "next/link";
import MiniFlow from "@/components/MiniFlow";
import type { Project } from "@/lib/projects";
import type { Dict } from "@/lib/content";

export function CaseStudy({ project, t }: { project: Project; t: Dict["projects"] }) {
  const rows = [
    [t.problem, project.problem],
    [t.built, project.built],
    [t.result, project.result],
  ].filter((r): r is [string, string] => Boolean(r[1]));
  if (rows.length === 0) return null;

  return (
    <dl className="grid gap-6 md:grid-cols-3 md:gap-8">
      {rows.map(([label, text]) => (
        <div key={label} className="border-t-2 border-fg pt-3 last:border-lime">
          <dt className="label text-lime">{label}</dt>
          <dd className="mt-2 text-[0.95rem] leading-relaxed text-fg/90">{text}</dd>
        </div>
      ))}
    </dl>
  );
}

// A project row on the flow: closed it is a connector, open it is a short case study.
export default function ProjectNode({
  project,
  href,
  t,
}: {
  project: Project;
  href: string;
  t: Dict["projects"];
}) {
  return (
    <details className="project tap" data-reveal>
      <summary>
        <span className="tap-port" aria-hidden="true" />
        <span className="tap-line" aria-hidden="true" />
        <span className="label block text-muted">
          {project.year} · {project.stack.slice(0, 3).join(" / ")}
        </span>
        <h3 className="display project-title mt-2 text-[clamp(1.8rem,4.2vw,2.75rem)]">{project.title}</h3>
        {project.summary && <span className="mt-3 block max-w-2xl text-muted">{project.summary}</span>}
        <span className="plus" aria-hidden="true" />
      </summary>

      <div className="project-body">
        <MiniFlow steps={project.flow} className="mb-8" />
        <CaseStudy project={project} t={t} />
        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Stack">
          {project.stack.map((s) => (
            <li key={s} className="chip">{s}</li>
          ))}
        </ul>
        <Link href={href} className="btn mt-7">
          {t.full} <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </details>
  );
}
