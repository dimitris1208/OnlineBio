import type { MetadataRoute } from "next";
import { getDict, site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Stragalinos",
    description: getDict("en").meta.description,
    start_url: "/",
    display: "browser",
    background_color: "#07080b",
    theme_color: "#07080b",
    icons: [
      { src: "/icon", sizes: "192x192", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
