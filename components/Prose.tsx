import { ReactNode } from "react";

export default function Prose({ children }: { children: ReactNode }) {
  return (
    <article
      className={[
        "prose prose-invert max-w-3xl",
        "prose-headings:scroll-mt-24",
        "prose-h1:text-4xl prose-h1:font-bold",
        "prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-2xl",
        "prose-p:leading-relaxed prose-p:text-gray-200/90",
        "prose-li:marker:text-gray-400",
        "prose-img:rounded-xl",
        "prose-a:text-blue-300 hover:prose-a:text-blue-200",
        "prose-code:text-blue-100 prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10",
        "prose-table:overflow-hidden prose-table:rounded-xl prose-th:bg-white/5 prose-td:bg-white/[0.02]",
      ].join(" ")}
    >
      {children}
    </article>
  );
}
