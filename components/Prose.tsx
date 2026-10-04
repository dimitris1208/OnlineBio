import { ReactNode } from "react";

export default function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className={[
        "prose prose-invert max-w-3xl",
        "prose-headings:scroll-mt-24",
        "prose-p:leading-relaxed",
        "prose-a:underline-offset-4",
        "prose-code:text-lime prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-panel prose-pre:border prose-pre:border-line prose-pre:rounded-none",
        "prose-blockquote:border-lime prose-blockquote:text-fg",
        "prose-strong:text-fg",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
