import { Github, Linkedin } from "lucide-react";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const t = locale === "el"
    ? {
        title: "Επικοινωνία",
        desc: "Μπορείς να επικοινωνήσεις μαζί μου μέσω email ή social media.",
        email: "Στείλε μου email"
      }
    : {
        title: "Contact",
        desc: "You can reach me via email or social media.",
        email: "Send me an email"
      };

  return (
    <section className="prose prose-invert space-y-6">
      <h1>{t.title}</h1>
      <p>{t.desc}</p>

      {/* Email */}
      <a
        href="mailto:dimitstraga2002@gmail.com"
        className="inline-block rounded-lg border border-white/10 px-5 py-2 hover:bg-white/5 transition"
      >
        {t.email}
      </a>

      {/* Socials */}
      <div className="flex gap-4 mt-6">
        <a
          href="https://github.com/dimitris1208"
          target="_blank"
          className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://linkedin.com/in/dimitris-stragalinos-229384299"
          target="_blank"
          className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition"
        >
          <Linkedin className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
}
