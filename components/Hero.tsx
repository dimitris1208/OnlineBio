import Link from "next/link";
import MiniFlow from "@/components/MiniFlow";
import type { Dict } from "@/lib/content";

export default function Hero({ locale, t }: { locale: string; t: Dict["hero"] }) {
  return (
    <section
      id="top"
      data-node
      data-label={t.kind}
      aria-labelledby="hero-title"
      className="node min-h-[100svh] !pt-28 !pb-20"
    >
      <div className="tap tap-lg">
        <span className="tap-port" aria-hidden="true" />
        <span className="tap-line" aria-hidden="true" />
        <p className="label text-lime">{t.kind} · GET /dimitris</p>
      </div>

      <h1 id="hero-title" className="display mt-6 max-w-5xl text-[clamp(2.9rem,7vw,5.75rem)]">
        <span className="hero-line text-lime">{t.h1a}</span>
        <span className="hero-line">{t.h1b}</span>
      </h1>

      <div className="hero-fade">
        <MiniFlow steps={t.steps} live className="mt-9" />
        <p className="mt-8 max-w-2xl text-base text-muted md:text-xl">{t.sub}</p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link href={`/${locale}#projects`} className="btn btn-solid">
            {t.cta} <span className="arrow" aria-hidden="true">→</span>
          </Link>
          <Link href={`/${locale}#contact`} className="btn">
            {t.cta2}
          </Link>
        </div>

        <p className="label mt-12 text-muted" aria-hidden="true">
          ↓ {t.scroll}
        </p>
      </div>
    </section>
  );
}
