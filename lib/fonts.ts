import { Geologica, JetBrains_Mono, Sofia_Sans_Extra_Condensed } from "next/font/google";

// All three ship Greek glyphs, so EN and EL render in the same faces.
export const display = Sofia_Sans_Extra_Condensed({
  subsets: ["latin", "greek"],
  weight: ["700", "900"],
  variable: "--font-display",
  display: "swap",
});

export const body = Geologica({
  subsets: ["latin", "greek"],
  variable: "--font-body",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin", "greek"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});
