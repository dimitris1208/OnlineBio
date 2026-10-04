import type { ReactNode } from "react";

// A section of the page, drawn as a node tapped onto the flow bus.
export default function FlowNode({
  id,
  kind,
  title,
  children,
}: {
  id: string;
  kind: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-node
      data-label={`${kind} · ${title}`}
      aria-labelledby={`${id}-title`}
      className="node"
    >
      <div className="tap tap-lg" data-reveal>
        <span className="tap-port" aria-hidden="true" />
        <span className="tap-line" aria-hidden="true" />
        <p className="label text-lime">{kind}</p>
        <h2 id={`${id}-title`} className="display mt-3 text-[clamp(2.75rem,8vw,4.75rem)]">
          {title}
        </h2>
      </div>
      <div className="mt-8 max-w-4xl md:mt-10">{children}</div>
    </section>
  );
}
