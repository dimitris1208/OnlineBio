"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";

export default function Hero({ locale }: { locale: "en"|"el" }) {
  const t = locale === "el"
    ? { h1: "Γεια, είμαι ο Δημήτρης — Μετατρέπω το αδύνατο σε ψηφιακή πραγματικότητα.", cta: "Δες Έργα" }
    : { h1: "Hi, I'm Dimitris — Turning the impossible into digital reality.", cta: "View Projects" };

  // magnetic CTA
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useTransform(y, [-40, 40], [8, -8]);
  const rotateY = useTransform(x, [-40, 40], [-8, 8]);

  return (
    <section className="space-y-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
        className="text-4xl md:text-6xl font-semibold tracking-tight"
      >
        {t.h1}
      </motion.h1>

      <motion.div
        onMouseMove={(e) => {
          const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ perspective: 600 }}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="inline-block"
        >
          <Link href={`/${locale}/projects`} className="inline-block rounded-2xl border border-stroke bg-card px-6 py-3 hover:border-primary hover:shadow-soft transition">
            {t.cta}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
