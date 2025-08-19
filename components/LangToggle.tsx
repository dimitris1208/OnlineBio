"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { motion } from "framer-motion";

export default function LangToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other = locale === "en" ? "el" : "en";
  const target = pathname.replace(/^\/(en|el)/, `/${other}`);
  return (
    <Link href={target} className="relative inline-flex items-center rounded-full border border-stroke p-1 bg-card hover:bg-white/10 transition">
      <motion.span
        layout
        className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white/15 ${locale === "en" ? "" : "translate-x-full"}`}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      <span className={`z-10 px-3 py-1 text-xs ${locale === "en" ? "text-white" : "text-muted"}`}>EN</span>
      <span className={`z-10 px-3 py-1 text-xs ${locale === "el" ? "text-white" : "text-muted"}`}>EL</span>
    </Link>
  );
}