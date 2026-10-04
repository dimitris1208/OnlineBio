import Link from "next/link";
import LangToggle from "@/components/LangToggle";
import MobileMenu from "@/components/MobileMenu";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/content";

const NODES = ["about", "skills", "experience", "projects", "contact"] as const;

export default function SiteHeader({ locale, t }: { locale: Locale; t: Dict["nav"] }) {
  const items = NODES.map((id) => ({ id, label: t[id], href: `/${locale}#${id}` }));

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 md:px-10">
        <Link href={`/${locale}`} className="font-display text-2xl font-black uppercase leading-none tracking-wide">
          Dimitris<span className="text-lime">/</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {items.map((it) => (
            <Link key={it.id} href={it.href} data-nav={it.id} className="navlink font-mono text-xs uppercase tracking-widest">
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LangToggle locale={locale} />
          </div>
          <MobileMenu items={items} labels={{ menu: t.menu, close: t.close }}>
            <LangToggle locale={locale} />
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
