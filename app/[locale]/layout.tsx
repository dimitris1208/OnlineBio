import type { Metadata } from "next";
import { ReactNode } from "react";
import { locales, type Locale } from "@/lib/i18n";
import LangToggle from "@/components/LangToggle";
import ParticlesCanvas from "@/components/ParticlesCanvas";
import { nav } from "framer-motion/client";

export const metadata: Metadata = {
  title: "Dimitris — Portfolio",
  description: "EN/EL portfolio",
};



export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) return children;
  const nav = locale === "el"
  ? { projects: "Έργα", about: "Σχετικά", contact: "Επικοινωνία" }
  : { projects: "Projects", about: "About", contact: "Contact" }

  return (
    <>
      <ParticlesCanvas />
      <header className="fixed inset-x-0 top-0 z-20">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between rounded-b-2xl backdrop-blur bg-white/5 border-b border-white/10">
          <a href={`/${locale}`} className="text-sm text-gray-400 hover:text-white transition">
            Dimitris • Portfolio
          </a>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
            <a className="hover:text-white transition" href={`/${locale}/projects`}>
              {nav.projects}
            </a>
            <a className="hover:text-white transition" href={`/${locale}/about`}>
              {nav.about}
            </a>
            <a className="hover:text-white transition" href={`/${locale}/contact`}>
              {nav.contact}
            </a>
          </nav>

          <LangToggle locale={locale} />
        </div>
      </header>

      <main className="relative z-10 pt-24 px-6 max-w-6xl mx-auto">
        {children}
      </main>

      <footer className="relative z-10 mt-24 px-6 py-12 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Dimitris — Built with Next.js
      </footer>
    </>
  );
}
