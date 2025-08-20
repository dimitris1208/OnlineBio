import { Locale } from "@/lib/i18n";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const t = locale === "el"
    ? {
        title: "Σχετικά με εμένα",
        intro:
          "Είμαι ο Δημήτρης Στραγαλινός, απόφοιτος Πληροφορικής στο Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης. Ειδικεύομαι στην ανάπτυξη web εφαρμογών, ERP συστημάτων και ασφαλών πλατφορμών, με εμπειρία για μικρομεσαίες επιχειρήσεις και εταιρείες.",
        sections: {
          education: "Σπουδές",
          skills: "Ικανότητες",
          langs: "Δεξιότητες",
          experience: "Επαγγελματική Εμπειρία",
          contact: "Μπορείς να με βρεις εδώ:",
        },
        education: [
          "Απόφητος του Τμήματος Πληροφορικής, ΑΠΘ (Κατεύθυνση: Δεδομένα Ιστού & Δίκτυα).",
          "Πτυχιακή εργασία: Ανάπτυξη ασφαλούς online exam system με Next.js, NestJS, Prisma και PostgreSQL.",
          "Ειδικός Σχεδιασμού Ιστοσελίδων και Εφαρμογών - UCERT | 2023",
        ],
        skills: {
          frameworks: [
            "Next.js, React, TailwindCSS",
            "NestJS, FastAPI, Flask",
            "Elixir Phoenix (μελέτη για ERP system)",
            "WordPress, WooCommerce, Shopify APIs",
          ],
          backend: [
            "Python (Flask, FastAPI, αυτοματισμοί)",
            "Node.js, NestJS",
            "API development (REST, GraphQL)",
          ],
          databases: ["PostgreSQL, Prisma ORM", "MongoDB + GridFS", "SQLite, MySQL"],
          tools: ["Docker & Docker Compose", "Git/GitHub, CI/CD pipelines", "Linux server administration"],
          soft: [
            "Συνεργασία σε ομάδες startup",
            "Επίλυση προβλημάτων",
            "Διαχείριση έργων και οργάνωση",
            "Μιλάω Ελληνικά (native) και Αγγλικά (fluent)",
          ],
        },
        experience: [
          {
            role: "Καθηγητής Προγραμματισμού",
            org: "Εκπαιδευτήρια Μαντουλίδη",
            period: "2022 – 2023",
            bullets: [
              "Διδασκαλία προγραμματισμού σε μαθητές Γυμνασίου-Λυκείου.",
              "Δημιουργία κατανοητών οδηγών Python για τους μαθητές.",
            ],
          },
          {
            role: "Επαγγελματίας Web & Streaming",
            org: "LiveMedia",
            period: "2021 – 2025",
            bullets: [
              "Υποστήριξη ροών εργασίας live streaming.",
              "Ειδικός στη διαχείριση εξοπλισμού.",
              "Επίλυση προβλημάτων σε πραγματικό χρόνο.",
            ],
          },
          {
            role: "Ελεύθερος Επαγγελματίας – Web Developer",
            org: "Αυτό-απασχόληση",
            period: "2023 – σήμερα",
            bullets: [
              "Ανάπτυξη e-shops (WooCommerce / Shopify sync scripts).",
              "Next.js εφαρμογές, API integrations, αυτοματισμοί Python.",
            ],
          },
        ],
      }
    : {
        title: "About Me",
        intro:
          "I am Dimitris Stragalinos, a Computer Science graduate from the Aristotle University of Thessaloniki. I specialize in developing web applications, ERP systems, and secure platforms, with experience working with small and medium-sized businesses as well as companies.",
        sections: {
          education: "Education",
          skills: "Skills",
          langs: "Soft Skills",
          experience: "Professional Experience",
          contact: "You can find me here:",
        },
        education: [
          "Graduate of Computer Science, AUTH (Web Data & Networks track).",
          "Thesis: Development of a secure online exam system with Next.js, NestJS, Prisma, and PostgreSQL.",
          "Web and Application Design Specialist - UCERT | 2023",
        ],
        skills: {
          frameworks: [
            "Next.js, React, TailwindCSS",
            "NestJS, FastAPI, Flask",
            "Elixir Phoenix (research for ERP system)",
            "WordPress, WooCommerce, Shopify APIs",
          ],
          backend: ["Python (Flask, FastAPI, automation)", "Node.js, NestJS", "API development (REST, GraphQL)"],
          databases: ["PostgreSQL, Prisma ORM", "MongoDB + GridFS", "SQLite, MySQL"],
          tools: ["Docker & Docker Compose", "Git/GitHub, CI/CD pipelines", "Linux server administration"],
          soft: [
            "Startup teamwork",
            "Problem-solving mindset",
            "Project management & organization",
            "Languages: Greek (native), English (fluent)",
          ],
        },
        experience: [
          {
            role: "Programming teacher",
            org: "Mandoulides Schools",
            period: "2022 – 2023",
            bullets: [
              "Teaching programming to High-School students.",
              "Made python tutorials easy for students to understand",
            ],
          },
          {
            role: "Web & Streaming Specialist",
            org: "LiveMedia",
            period: "2021 – 2025",
            bullets: [
              "Assisted live streaming workflows.",
              "Equiments Handling Specialist",
              "Troubleshooting in real time"
            ],
          },
          {
            role: "Freelance Web Developer",
            org: "Self-employed",
            period: "2023 – present",
            bullets: [
              "Built e-commerce integrations (WooCommerce / Shopify).",
              "Developed Next.js apps, API integrations, Python automations.",
            ],
          },
        ],
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
            <ul className="space-y-1">{t.skills.frameworks.map((s: string, i: number) => <li key={i}>• {s}</li>)}</ul>
          </div>
          <div className="p-4 rounded-xl border border-white/10 hover:bg-white/5 transition">
            <h3 className="font-semibold mb-2">Backend</h3>
            <ul className="space-y-1">{t.skills.backend.map((s: string, i: number) => <li key={i}>• {s}</li>)}</ul>
          </div>
          <div className="p-4 rounded-xl border border-white/10 hover:bg-white/5 transition">
            <h3 className="font-semibold mb-2">Databases</h3>
            <ul className="space-y-1">{t.skills.databases.map((s: string, i: number) => <li key={i}>• {s}</li>)}</ul>
          </div>
          <div className="p-4 rounded-xl border border-white/10 hover:bg-white/5 transition">
            <h3 className="font-semibold mb-2">Tools</h3>
            <ul className="space-y-1">{t.skills.tools.map((s: string, i: number) => <li key={i}>• {s}</li>)}</ul>
          </div>
          <div className="p-4 rounded-xl border border-white/10 hover:bg-white/5 transition sm:col-span-2">
            <h3 className="font-semibold mb-2">{t.sections.langs}</h3>
            <ul className="space-y-1">{t.skills.soft.map((s: string, i: number) => <li key={i}>• {s}</li>)}</ul>
          </div>
        </div>
      </div>

      {/* Experience (μετά το Skills) */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">{t.sections.experience}</h2>
        <ol className="relative border-s border-white/10 space-y-8 ms-3">
          {t.experience.map((item, i: number) => (
            <li key={i} className="ms-4">
              {/* dot */}
              <span className="absolute -start-2.5 mt-2 h-2.5 w-2.5 rounded-full bg-blue-400 shadow" />
              {/* card */}
              <div className="rounded-xl border border-white/10 bg-card/30 p-5 hover:border-blue-400/50 transition">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-medium">
                    {item.role} <span className="text-gray-400">• {item.org}</span>
                  </h3>
                  <span className="text-xs text-gray-400">{item.period}</span>
                </div>
                <ul className="mt-3 space-y-2 text-gray-300">
                  {item.bullets.map((b: string, j: number) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/30" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
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
