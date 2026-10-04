"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function LangToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other = locale === "en" ? "el" : "en";
  const target = pathname.replace(/^\/(en|el)/, `/${other}`);
  const cell = "px-2.5 py-1.5 transition-colors";
  return (
    <Link
      href={target}
      hrefLang={other}
      className="inline-flex border-2 border-fg font-mono text-xs tracking-widest hover:border-lime"
    >
      <span className={`${cell} ${locale === "en" ? "bg-fg text-ink" : "text-muted"}`}>EN</span>
      <span className={`${cell} ${locale === "el" ? "bg-fg text-ink" : "text-muted"}`}>EL</span>
      <span className="sr-only">{other === "el" ? "Αλλαγή γλώσσας σε Ελληνικά" : "Switch language to English"}</span>
    </Link>
  );
}
