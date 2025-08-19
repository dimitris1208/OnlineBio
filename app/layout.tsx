import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dimitris — Portfolio",
  description: "EN/EL portfolio",
};

export default function RootAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="noise relative min-h-screen antialiased bg-[#0b0f19] text-[#E6E8EF]">
        {children}
      </body>
    </html>
  );
}

