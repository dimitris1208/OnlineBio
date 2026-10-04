"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type Item = { id: string; label: string; href: string };

export default function MobileMenu({
  items,
  labels,
  children,
}: {
  items: Item[];
  labels: { menu: string; close: string };
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  // Κλείσιμο με ESC, κλείδωμα scroll και παγίδευση focus όσο είναι ανοιχτό
  useEffect(() => {
    if (!open) return;
    const opener = trigger.current;
    const focusables = () =>
      Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const f = focusables();
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
      opener?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen(true)}
        className="grid h-10 w-10 place-items-center border-2 border-fg"
        aria-label={labels.menu}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>

      {open && (
        <div
          id="mobile-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={labels.menu}
          className="fixed inset-0 z-50 flex h-[100dvh] flex-col bg-ink px-5 pb-8 pt-3"
        >
          <div className="flex items-center justify-between">
            <span className="label text-lime">{labels.menu}</span>
            <button
              type="button"
              onClick={close}
              className="grid h-10 w-10 place-items-center border-2 border-fg"
              aria-label={labels.close}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <nav className="mt-8 flex flex-1 flex-col justify-center gap-1" aria-label={labels.menu}>
            {items.map((it) => (
              <Link
                key={it.id}
                href={it.href}
                onClick={close}
                className="display py-1.5 text-[clamp(2.5rem,11vw,3.75rem)] hover:text-lime"
              >
                {it.label}
              </Link>
            ))}
          </nav>

          <div onClick={close}>{children}</div>
        </div>
      )}
    </div>
  );
}
