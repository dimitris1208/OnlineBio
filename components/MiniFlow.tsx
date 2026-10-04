import { Fragment } from "react";

// step — wire — step: the same shape as the page, at the scale of one project.
export default function MiniFlow({
  steps,
  live = false,
  className = "",
}: {
  steps: string[];
  live?: boolean;
  className?: string;
}) {
  if (steps.length === 0) return null;
  return (
    <div className={`miniflow ${live ? "miniflow-live" : ""} ${className}`} role="img" aria-label={steps.join(" → ")}>
      {steps.map((s, i) => (
        <Fragment key={s}>
          {i > 0 && <span className="wire" aria-hidden="true" />}
          <span className="step" aria-hidden="true">{s}</span>
        </Fragment>
      ))}
    </div>
  );
}
