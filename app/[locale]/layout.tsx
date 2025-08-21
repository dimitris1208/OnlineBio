import type { Metadata } from "next";
import { ReactNode } from "react";
import { locales, type Locale } from "@/lib/i18n";
import ParticlesCanvas from "@/components/ParticlesCanvas";
import SiteHeader from "@/components/SiteHeader"; // ← ΝΕΟ import

export const metadata: Metadata = {
  title: "Dimitris — Portfolio",
  description: "EN/EL portfolio",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) return children;

  return (
    <>
      <ParticlesCanvas />

      {/* ΝΕΟ: Responsive Header με hamburger + drawer */}
      <SiteHeader locale={locale} />

      <main className="relative z-10 pt-24 px-6 max-w-6xl mx-auto">
        {children}
      </main>

      <footer className="relative z-10 mt-24 px-6 py-12 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Dimitris — Built with Next.js
      </footer>
    </>
  );
}
