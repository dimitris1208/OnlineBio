import type { Dict } from "@/lib/content";

// Decorative read-out of where the pulse is: the payload picks up a field per node.
// Hidden from assistive tech — it repeats the page structure, it adds no content.
export default function Inspector({ t }: { t: Dict }) {
  const fields: Array<[string, string]> = [
    ["listener", "GET /dimitris"],
    ["source", t.nav.about],
    ["transform", t.nav.skills],
    ["route", t.nav.experience],
    ["connectors", t.nav.projects],
    ["response", "200 OK"],
  ];

  return (
    <div aria-hidden="true">
      <div className="insp-panel">
        <p className="flex items-center gap-2 text-lime">
          <span className="live-dot" /> LIVE · flow/portfolio
        </p>
        <p className="mt-1 text-muted">payload {"{"}</p>
        <ul className="pl-4">
          {fields.map(([k, v]) => (
            <li key={k} data-step>
              <span className="k">{k}</span>: &quot;{v}&quot;
            </li>
          ))}
        </ul>
        <p className="text-muted">{"}"}</p>
      </div>

      <div className="insp-bar">
        <span className="track"><span data-status-bar /></span>
        <span className="live-dot" />
        <span data-status className="truncate text-fg">{t.hero.kind}</span>
      </div>
    </div>
  );
}
