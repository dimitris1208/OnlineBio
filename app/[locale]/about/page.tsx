import { Locale } from "@/lib/i18n";
import Image from "next/image";
import { Code, Database, Globe, Network, Laptop, Github, Linkedin, Terminal, Cpu } from "lucide-react";

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const t = locale === "el"
    ? {
        title: "Σχετικά με εμένα",
        intro: "Είμαι ο Δημήτρης Στραγαλινός, απόφοιτος Πληροφορικής στο Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης. Ειδικεύομαι στην ανάπτυξη web εφαρμογών, ERP συστημάτων και ασφαλών πλατφορμών, με εμπειρία σε ακαδημαϊκά έργα (πτυχιακή) αλλά και πραγματικά projects για e-shops και επιχειρήσεις.",
        sections: {
          education: "Σπουδές",
          skills: "Ικανότητες",
          langs: "Δεξιότητες",
          contact: "Μπορείς να με βρεις εδώ:"
        },
        education: [
          "Απόφητος του Τμήματος Πληροφορικής, ΑΠΘ (Κατεύθυνση: Δεδομένα Ιστού & Δίκτυα).",
          "Πτυχιακή εργασία: Ανάπτυξη ασφαλούς online exam system με Next.js, NestJS, Prisma και PostgreSQL.",
          "Ειδικός Σχεδιασμού Ιστοσελίδων και Εφαρμογών -  UCERT | 2023"
        ],
        skills: {
          frameworks: [
            "Next.js, React, TailwindCSS",
            "NestJS, FastAPI, Flask",
            "Elixir Phoenix (μελέτη για ERP system)",
            "WordPress, WooCommerce, Shopify APIs"
          ],
          backend: [
            "Python (Flask, FastAPI, αυτοματισμοί)",
            "Node.js, NestJS",
            "API development (REST, GraphQL)"
          ],
          databases: [
            "PostgreSQL, Prisma ORM",
            "MongoDB + GridFS",
            "SQLite, MySQL"
          ],
          tools: [
            "Docker & Docker Compose",
            "Git/GitHub, CI/CD pipelines",
            "Linux server administration"
          ],
          soft: [
            "Συνεργασία σε ομάδες startup",
            "Επίλυση προβλημάτων",
            "Διαχείριση έργων και οργάνωση",
            "Μιλάω Ελληνικά (native) και Αγγλικά (fluent)"
          ]
        }
      }
    : {
        title: "About Me",
        intro: "I am Dimitris Stragalinos, graduate of Computer Science at Aristotle University of Thessaloniki. I specialize in building web applications, ERP systems, and secure platforms, with experience from both academic projects (thesis) and real-world e-commerce / business software development.",
        sections: {
          education: "Education",
          skills: "Skills",
          langs: "Soft Skills",
          contact: "You can find me here:"
        },
        education: [
          "Graduate of Computer Science, AUTH (Web Data & Networks track).",
          "Thesis: Development of a secure online exam system with Next.js, NestJS, Prisma, and PostgreSQL.",
          "Web and Application Design Specialist - UCERT | 2023"
        
        ],
        skills: {
          frameworks: [
            "Next.js, React, TailwindCSS",
            "NestJS, FastAPI, Flask",
            "Elixir Phoenix (research for ERP system)",
            "WordPress, WooCommerce, Shopify APIs"
          ],
          backend: [
            "Python (Flask, FastAPI, automation)",
            "Node.js, NestJS",
            "API development (REST, GraphQL)"
          ],
          databases: [
            "PostgreSQL, Prisma ORM",
            "MongoDB + GridFS",
            "SQLite, MySQL"
          ],
          tools: [
            "Docker & Docker Compose",
            "Git/GitHub, CI/CD pipelines",
            "Linux server administration"
          ],
          soft: [
            "Startup teamwork",
            "Problem-solving mindset",
            "Project management & organization",
            "Languages: Greek (native), English (fluent)"
          ]
        }
      };

  return (
    <section className="prose prose-invert max-w-4xl mx-auto space-y-12">
      {/* Avatar + Intro */}
      <div className="text-center space-y-6">
        <Image
          src="/avatar.jpeg"
          alt="Dimitris Avatar"
          width={160}
          height={160}
          className="mx-auto rounded-full border-4 border-white/10 shadow-lg"
        />
        <h1 className="text-4xl font-bold">{t.title}</h1>
        <p className="text-gray-300 text-lg">{t.intro}</p>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">{t.sections.education}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-300">
          {t.education.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">{t.sections.skills}</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl border border-white/10 hover:bg-white/5 transition">
            <h3 className="font-semibold mb-2">Frameworks</h3>
            <ul className="space-y-1">{t.skills.frameworks.map((s, i) => <li key={i}>• {s}</li>)}</ul>
          </div>
          <div className="p-4 rounded-xl border border-white/10 hover:bg-white/5 transition">
            <h3 className="font-semibold mb-2">Backend</h3>
            <ul className="space-y-1">{t.skills.backend.map((s, i) => <li key={i}>• {s}</li>)}</ul>
          </div>
          <div className="p-4 rounded-xl border border-white/10 hover:bg-white/5 transition">
            <h3 className="font-semibold mb-2">Databases</h3>
            <ul className="space-y-1">{t.skills.databases.map((s, i) => <li key={i}>• {s}</li>)}</ul>
          </div>
          <div className="p-4 rounded-xl border border-white/10 hover:bg-white/5 transition">
            <h3 className="font-semibold mb-2">Tools</h3>
            <ul className="space-y-1">{t.skills.tools.map((s, i) => <li key={i}>• {s}</li>)}</ul>
          </div>
          <div className="p-4 rounded-xl border border-white/10 hover:bg-white/5 transition sm:col-span-2">
            <h3 className="font-semibold mb-2">{t.sections.langs}</h3>
            <ul className="space-y-1">{t.skills.soft.map((s, i) => <li key={i}>• {s}</li>)}</ul>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">{t.sections.contact}</h2>
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/dimitris1208"
            target="_blank"
            className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/dimitris-stragalinos-229384299"
            target="_blank"
            className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
