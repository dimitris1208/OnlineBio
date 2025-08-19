"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectCard({ href, title, meta, summary }:{
  href: string; title: string; meta: string; summary: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="rounded-2xl border border-stroke bg-card p-5 hover:border-primary/60"
    >
      <Link href={href} className="block">
        <div className="text-sm text-muted">{meta}</div>
        <div className="text-lg font-medium mt-1">{title}</div>
        <div className="text-sm mt-2 text-muted line-clamp-2">{summary}</div>
      </Link>
    </motion.div>
  );
}
