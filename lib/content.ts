import type { Locale } from "./i18n";

export const site = {
  name: "Dimitris Stragalinos",
  nameEl: "Δημήτρης Στραγαλινός",
  jobTitle: "Integration Engineer",
  email: "dimstragalinos@outlook.com",
  github: "https://github.com/dimitris1208",
  linkedin: "https://linkedin.com/in/dimitris-stragalinos-229384299",
};

// The production domain: canonical URLs, hreflang, sitemap, OG and JSON-LD are all built from it.
// NEXT_PUBLIC_SITE_URL overrides it, if the site ever moves.
export function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  return "https://stragalinos.gr";
}

const en = {
  meta: {
    title: "Dimitris Stragalinos — Integration Engineer & Developer",
    description:
      "Dimitris Stragalinos, integration engineer and full-stack developer: MuleSoft, Dell Boomi, API-led integration, Python, web apps and e-commerce.",
  },
  nav: {
    about: "About",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    skip: "Skip to content",
  },
  hero: {
    kind: "LISTENER",
    h1a: "Hi, I’m Dimitris —",
    h1b: "I build ideas into things that actually work.",
    sub: "Integration engineer and full-stack developer. Enterprise integrations, APIs, web apps, e-commerce and the automation that connects them.",
    steps: ["Idea", "Build", "Works"],
    cta: "View projects",
    cta2: "Get in touch",
    scroll: "Scroll to run the flow",
  },
  about: {
    kind: "SOURCE",
    title: "About",
    intro:
      "I am Dimitris Stragalinos, a Computer Science graduate from the Aristotle University of Thessaloniki. I work on enterprise integration, web applications, ERP systems and secure platforms, with experience across small and medium-sized businesses as well as large companies.",
    avatarAlt: "Portrait of Dimitris Stragalinos",
    educationTitle: "Education",
    education: [
      "Graduate of Computer Science, AUTH (Web Data & Networks track).",
      "Thesis: a secure online exam system built with Next.js, NestJS, Prisma and PostgreSQL.",
      "Web and Application Design Specialist — UCERT, 2023.",
    ],
    softTitle: "How I work",
    soft: [
      "Startup teamwork",
      "Problem-solving mindset",
      "Project management & organization",
      "Languages: Greek (native), English (fluent)",
    ],
  },
  skills: {
    kind: "TRANSFORM",
    title: "Skills",
    groups: [
      {
        label: "Integration",
        items: ["MuleSoft (Anypoint Platform)", "Dell Boomi", "API-led integration", "REST APIs", "GraphQL"],
      },
      { label: "Backend", items: ["Python (Flask, FastAPI, automation)", "Node.js", "NestJS"] },
      {
        label: "Frontend & frameworks",
        items: ["Next.js", "React", "TailwindCSS", "Elixir Phoenix (research for an ERP system)"],
      },
      { label: "E-commerce", items: ["Shopify", "WooCommerce", "WordPress"] },
      { label: "Databases", items: ["PostgreSQL, Prisma ORM", "MongoDB + GridFS", "SQLite, MySQL"] },
      {
        label: "Infrastructure",
        items: ["Linux administration", "Docker & Docker Compose", "Git/GitHub, CI/CD pipelines"],
      },
    ],
    certTitle: "Certifications",
    certTag: "Certified",
    // TODO: add issue dates and credential links if you want them shown.
    certs: [
      { issuer: "MuleSoft", name: "Developer 1" },
      { issuer: "Dell Boomi", name: "Associate Integration Architect" },
      { issuer: "Dell Boomi", name: "Professional Integration Developer" },
    ],
  },
  experience: {
    kind: "ROUTE",
    title: "Experience",
    items: [
      {
        role: "Integration Engineer",
        org: "Deloitte",
        period: "2025 – 2026",
        // TODO: add the outcomes of the Deloitte work (what was integrated, for whom, what it enabled).
        bullets: ["Enterprise integration work: connecting enterprise systems and the data that moves between them."],
      },
      {
        role: "Freelance Web Developer",
        org: "Self-employed",
        period: "2023 – present",
        bullets: [
          "Shipped WooCommerce / Shopify integrations that keep store catalogs aligned without duplicates or stale items.",
          "Delivered Next.js apps, API integrations and Python automations for clients.",
        ],
      },
      {
        role: "Web & Streaming Specialist",
        org: "LiveMedia",
        period: "2021 – 2025",
        bullets: [
          "Kept live-streaming workflows running.",
          "Handled the streaming equipment.",
          "Troubleshot problems in real time, while on air.",
        ],
      },
      {
        role: "Programming Teacher",
        org: "Mandoulides Schools",
        period: "2022 – 2023",
        bullets: [
          "Taught programming to high-school students.",
          "Wrote Python tutorials that students could follow on their own.",
        ],
      },
    ],
  },
  projects: {
    kind: "CONNECTORS",
    title: "Projects",
    hint: "Open a project for the short case study.",
    problem: "Problem",
    built: "What I built",
    result: "Result",
    full: "Read the full write-up",
    back: "All projects",
  },
  websites: {
    title: "Websites",
    lead: "Websites I have made, live right now. Each window opens the real site.",
  },
  contact: {
    kind: "RESPONSE",
    title: "Contact",
    display: "Let’s build something that works.",
    lead: "You can reach me via email or social media.",
  },
  footer: "Flow complete. Built with Next.js.",
};

export type Dict = typeof en;

const el: Dict = {
  meta: {
    title: "Δημήτρης Στραγαλινός — Integration Engineer & Developer",
    description:
      "Δημήτρης Στραγαλινός, integration engineer και full-stack developer: MuleSoft, Dell Boomi, API-led integration, Python, web εφαρμογές και e-commerce.",
  },
  nav: {
    about: "Σχετικά",
    skills: "Δεξιότητες",
    experience: "Εμπειρία",
    projects: "Έργα",
    contact: "Επικοινωνία",
    menu: "Μενού",
    close: "Κλείσιμο",
    skip: "Μετάβαση στο περιεχόμενο",
  },
  hero: {
    kind: "LISTENER",
    h1a: "Γεια, είμαι ο Δημήτρης —",
    h1b: "Μετατρέπω ιδέες σε πράγματα που πραγματικά δουλεύουν.",
    sub: "Integration engineer και full-stack developer. Enterprise integrations, APIs, web εφαρμογές, e-commerce και οι αυτοματισμοί που τα συνδέουν.",
    steps: ["Ιδέα", "Υλοποίηση", "Δουλεύει"],
    cta: "Δες τα έργα",
    cta2: "Επικοινωνία",
    scroll: "Κάνε scroll για να τρέξει το flow",
  },
  about: {
    kind: "SOURCE",
    title: "Σχετικά",
    intro:
      "Είμαι ο Δημήτρης Στραγαλινός, απόφοιτος Πληροφορικής του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης. Ασχολούμαι με enterprise integration, web εφαρμογές, ERP συστήματα και ασφαλείς πλατφόρμες, με εμπειρία τόσο σε μικρομεσαίες επιχειρήσεις όσο και σε μεγάλες εταιρείες.",
    avatarAlt: "Πορτρέτο του Δημήτρη Στραγαλινού",
    educationTitle: "Σπουδές",
    education: [
      "Απόφοιτος του Τμήματος Πληροφορικής, ΑΠΘ (Κατεύθυνση: Δεδομένα Ιστού & Δίκτυα).",
      "Πτυχιακή εργασία: ασφαλές online exam system με Next.js, NestJS, Prisma και PostgreSQL.",
      "Ειδικός Σχεδιασμού Ιστοσελίδων και Εφαρμογών — UCERT, 2023.",
    ],
    softTitle: "Πώς δουλεύω",
    soft: [
      "Συνεργασία σε ομάδες startup",
      "Επίλυση προβλημάτων",
      "Διαχείριση έργων και οργάνωση",
      "Γλώσσες: Ελληνικά (μητρική), Αγγλικά (άπταιστα)",
    ],
  },
  skills: {
    kind: "TRANSFORM",
    title: "Δεξιότητες",
    groups: [
      {
        label: "Integration",
        items: ["MuleSoft (Anypoint Platform)", "Dell Boomi", "API-led integration", "REST APIs", "GraphQL"],
      },
      { label: "Backend", items: ["Python (Flask, FastAPI, αυτοματισμοί)", "Node.js", "NestJS"] },
      {
        label: "Frontend & frameworks",
        items: ["Next.js", "React", "TailwindCSS", "Elixir Phoenix (μελέτη για ERP σύστημα)"],
      },
      { label: "E-commerce", items: ["Shopify", "WooCommerce", "WordPress"] },
      { label: "Βάσεις δεδομένων", items: ["PostgreSQL, Prisma ORM", "MongoDB + GridFS", "SQLite, MySQL"] },
      {
        label: "Υποδομές",
        items: ["Διαχείριση Linux", "Docker & Docker Compose", "Git/GitHub, CI/CD pipelines"],
      },
    ],
    certTitle: "Πιστοποιήσεις",
    certTag: "Πιστοποίηση",
    certs: [
      { issuer: "MuleSoft", name: "Developer 1" },
      { issuer: "Dell Boomi", name: "Associate Integration Architect" },
      { issuer: "Dell Boomi", name: "Professional Integration Developer" },
    ],
  },
  experience: {
    kind: "ROUTE",
    title: "Εμπειρία",
    items: [
      {
        role: "Integration Engineer",
        org: "Deloitte",
        period: "2025 – 2026",
        // TODO: πρόσθεσε τα αποτελέσματα της δουλειάς στη Deloitte.
        bullets: ["Enterprise integration: διασύνδεση επιχειρησιακών συστημάτων και των δεδομένων που κινούνται ανάμεσά τους."],
      },
      {
        role: "Freelance Web Developer",
        org: "Αυτοαπασχόληση",
        period: "2023 – σήμερα",
        bullets: [
          "WooCommerce / Shopify integrations που κρατούν τους καταλόγους συγχρονισμένους, χωρίς διπλότυπα ή παρωχημένα προϊόντα.",
          "Next.js εφαρμογές, API integrations και αυτοματισμοί Python για πελάτες.",
        ],
      },
      {
        role: "Web & Streaming Specialist",
        org: "LiveMedia",
        period: "2021 – 2025",
        bullets: [
          "Υποστήριξη ροών εργασίας live streaming.",
          "Διαχείριση του εξοπλισμού μετάδοσης.",
          "Επίλυση προβλημάτων σε πραγματικό χρόνο, κατά τη μετάδοση.",
        ],
      },
      {
        role: "Καθηγητής Προγραμματισμού",
        org: "Εκπαιδευτήρια Μαντουλίδη",
        period: "2022 – 2023",
        bullets: [
          "Διδασκαλία προγραμματισμού σε μαθητές Γυμνασίου-Λυκείου.",
          "Οδηγοί Python που οι μαθητές μπορούσαν να ακολουθήσουν μόνοι τους.",
        ],
      },
    ],
  },
  projects: {
    kind: "CONNECTORS",
    title: "Έργα",
    hint: "Άνοιξε ένα έργο για το σύντομο case study.",
    problem: "Πρόβλημα",
    built: "Τι έφτιαξα",
    result: "Αποτέλεσμα",
    full: "Διάβασε την πλήρη περιγραφή",
    back: "Όλα τα έργα",
  },
  websites: {
    title: "Ιστοσελίδες",
    lead: "Ιστοσελίδες που έχω φτιάξει, ζωντανές αυτή τη στιγμή. Κάθε παράθυρο ανοίγει την πραγματική σελίδα.",
  },
  contact: {
    kind: "RESPONSE",
    title: "Επικοινωνία",
    display: "Ας φτιάξουμε κάτι που δουλεύει.",
    lead: "Μπορείς να επικοινωνήσεις μαζί μου μέσω email ή social media.",
  },
  footer: "Το flow ολοκληρώθηκε. Φτιαγμένο με Next.js.",
};

export function getDict(locale: Locale): Dict {
  return locale === "el" ? el : en;
}
