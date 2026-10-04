"use client";
import { useEffect } from "react";

// Drives the flow from the scroll position: fills the bus, moves the pulse,
// marks the node the pulse is in and reveals items as they enter the viewport.
// Only transform/opacity are touched; everything else is CSS reacting to attributes.
export default function FlowRuntime() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = <T extends HTMLElement>(s: string) => document.querySelector<T>(s);
    const qa = (s: string) => Array.from(document.querySelectorAll<HTMLElement>(s));

    const nodes = qa("[data-node]");
    const reveals = qa("[data-reveal]");
    const steps = qa("[data-step]");
    const rail = q("[data-rail]");
    const fill = q("[data-rail-fill]");
    const head = q("[data-rail-head]");
    const status = q("[data-status]");
    const bar = q("[data-status-bar]");

    let io: IntersectionObserver | undefined;
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.setAttribute("data-in", ""));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.setAttribute("data-in", "");
            io?.unobserve(e.target);
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
      );
      reveals.forEach((el) => io?.observe(el));
    }

    let raf = 0;
    let active = -1;

    const update = () => {
      raf = 0;
      // the pulse sits a little below mid-screen and slides to the bottom edge as the page runs out,
      // so the last node is reached and the bus fills completely
      const vh = window.innerHeight;
      const left = document.documentElement.scrollHeight - window.scrollY - vh;
      const mid = vh * (0.55 + 0.45 * Math.min(1, Math.max(0, 1 - left / vh)));

      let p = 0;
      let railH = 0;
      if (rail) {
        const r = rail.getBoundingClientRect();
        railH = r.height;
        p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      }
      let idx = 0;
      nodes.forEach((n, i) => {
        if (n.getBoundingClientRect().top <= mid) idx = i;
      });

      if (!reduce) {
        if (fill) fill.style.transform = `scaleY(${p})`;
        if (head) head.style.transform = `translate3d(0,${p * railH}px,0)`;
      }
      if (bar) bar.style.transform = `scaleX(${p})`;

      if (idx !== active) {
        active = idx;
        nodes.forEach((n, i) => n.toggleAttribute("data-active", i === idx));
        steps.forEach((s, i) => s.toggleAttribute("data-on", i <= idx));
        const node = nodes[idx];
        if (node) {
          document.body.dataset.node = node.id;
          if (status) status.textContent = node.dataset.label ?? "";
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
      delete document.body.dataset.node;
    };
  }, []);

  return null;
}
