'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import LangToggle from '@/components/LangToggle';

type Props = { locale: string };

export default function SiteHeader({ locale }: Props) {
  const nav =
    locale === 'el'
      ? { projects: 'Έργα', about: 'Σχετικά', contact: 'Επικοινωνία' }
      : { projects: 'Projects', about: 'About', contact: 'Contact' };

  const [open, setOpen] = useState(false);

  // Κλείσιμο με ESC & κλείδωμα scroll όταν είναι ανοιχτό το drawer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    if (open) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between rounded-b-2xl backdrop-blur bg-white/5 border-b border-white/10">
          <Link
            href={`/${locale}`}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Dimitris • Portfolio
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
            <Link className="hover:text-white transition" href={`/${locale}/projects`}>
              {nav.projects}
            </Link>
            <Link className="hover:text-white transition" href={`/${locale}/about`}>
              {nav.about}
            </Link>
            <Link className="hover:text-white transition" href={`/${locale}/contact`}>
              {nav.contact}
            </Link>
          </nav>

          {/* Desktop LangToggle */}
          <div className="hidden sm:block">
            <LangToggle locale={locale as any} />
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="sm:hidden p-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Overlay */}
      {open && (
        <button
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px]"
          onClick={close}
          aria-label="Close menu overlay"
        />
      )}

      {/* Side drawer */}
      <aside
        id="mobile-drawer"
        className={`fixed left-0 top-0 bottom-0 z-50 w-72 transform transition-transform duration-200
        bg-white/10 backdrop-blur border-r border-white/10
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <span className="text-sm text-gray-300">Menu</span>
          <button
            onClick={close}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/10 transition"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href={`/${locale}/projects`}
            onClick={close}
            className="block rounded-lg px-3 py-2 text-sm text-gray-200 hover:bg-white/10"
          >
            {nav.projects}
          </Link>
          <Link
            href={`/${locale}/about`}
            onClick={close}
            className="block rounded-lg px-3 py-2 text-sm text-gray-200 hover:bg-white/10"
          >
            {nav.about}
          </Link>
          <Link
            href={`/${locale}/contact`}
            onClick={close}
            className="block rounded-lg px-3 py-2 text-sm text-gray-2 00 hover:bg-white/10"
          >
            {nav.contact}
          </Link>
        </nav>

        {/* Mobile LangToggle μέσα στο drawer */}
        <div className="mt-auto p-4 border-t border-white/10">
          <LangToggle locale={locale as any} />
        </div>
      </aside>
    </>
  );
}
