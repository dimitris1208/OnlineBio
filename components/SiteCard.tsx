import Image from "next/image";
import type { Site } from "@/lib/sites";

// size the previews are captured at (scripts/site-previews.mjs), halved
const PREVIEW = { width: 640, height: 1200 };

export default function SiteCard({ site }: { site: Site }) {
  return (
    <a href={site.url} target="_blank" rel="noopener noreferrer" className="site" data-reveal>
      <span className="site-window">
        <span className="site-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="ml-2 truncate">{site.host}</span>
        </span>
        <span className="site-view">
          {site.image ? (
            <Image
              src={site.image}
              alt=""
              {...PREVIEW}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
              className="site-shot"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center font-mono text-xs text-muted">{site.host}</span>
          )}
        </span>
      </span>
      <span className="mt-4 flex items-baseline justify-between gap-3">
        <span className="display site-name text-3xl">{site.name}</span>
        <span className="label shrink-0 text-lime">
          {site.platform} <span aria-hidden="true">↗</span>
        </span>
      </span>
    </a>
  );
}
