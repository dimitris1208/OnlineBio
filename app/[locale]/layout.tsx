import "../globals.css";
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { getDict, site, siteUrl } from "@/lib/content";
import { body, display, mono } from "@/lib/fonts";
import SiteHeader from "@/components/SiteHeader";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#07080b",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale as Locale);
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: t.meta.title, template: `%s — ${site.name}` },
    description: t.meta.description,
    authors: [{ name: site.name, url: site.linkedin }],
    creator: site.name,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === "el" ? "el_GR" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  const locale = raw as Locale;
  const t = getDict(locale);

  return (
    <html
      lang={locale}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* reveals are only hidden when JS can show them again */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="relative min-h-screen font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-lime focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
        >
          {t.nav.skip}
        </a>

        <SiteHeader locale={locale} t={t.nav} />

        <main id="main">{children}</main>

        <footer className="border-t border-line px-5 pb-16 pt-8 font-mono text-xs text-muted md:px-10 min-[1440px]:pb-8">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2">
            <span>© {new Date().getFullYear()} {site.name}</span>
            <span>{t.footer}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
