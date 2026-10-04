import fs from "node:fs";
import path from "node:path";
import sites from "@/content/sites.json";

export type Site = {
  name: string;
  url: string;
  platform: string;
  host: string;
  // preview image under /public/sites, captured by scripts/site-previews.mjs
  image: string | null;
};

// To add a website: add it to content/sites.json, then run `node scripts/site-previews.mjs`.
export function getSites(): Site[] {
  return sites.map((s) => {
    const host = new URL(s.url).hostname;
    const file = `${host}.webp`;
    const exists = fs.existsSync(path.join(process.cwd(), "public", "sites", file));
    return { ...s, host, image: exists ? `/sites/${file}` : null };
  });
}
