import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/projects";
import { site } from "@/lib/content";

export const alt = "Project case study by Dimitris Stragalinos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const lime = "#c8ff2e";
const ink = "#07080b";
const fg = "#f2f4ef";

type Params = { locale: string; slug: string };

export default async function OpengraphImage({ params }: { params: Params | Promise<Params> }) {
  const { slug } = await params;
  // English for both locales, like the home card: the built-in font has no Greek glyphs
  const project = await getProjectBySlug("en", slug);
  const title = (project?.title ?? site.name).replace(/‑/g, "-");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: ink,
          color: fg,
          padding: "64px 72px",
          borderLeft: `14px solid ${lime}`,
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: lime }}>
          {`PROJECT${project ? ` · ${project.year}` : ""} · ${site.name.toUpperCase()}`}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 34 ? 68 : 84, fontWeight: 700, lineHeight: 1.05 }}>
          {title}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {(project?.stack ?? []).slice(0, 5).map((s) => (
            <div
              key={s}
              style={{ display: "flex", border: `3px solid ${fg}`, padding: "8px 20px", fontSize: 26, letterSpacing: 2 }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
