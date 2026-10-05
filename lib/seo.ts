import type { Metadata } from "next";
import { defaultLocale, locales, type Locale } from "./i18n";
import { site, siteUrl, type Dict } from "./content";
import type { Project } from "./projects";

const ogLocale = (l: Locale) => (l === "el" ? "el_GR" : "en_US");

// hreflang set for a page that exists under every locale; path is locale-less ("" or "/project/x")
export function languageAlternates(path: string, base = "") {
  return {
    ...Object.fromEntries(locales.map((l) => [l, `${base}/${l}${path}`])),
    "x-default": `${base}/${defaultLocale}${path}`,
  };
}

// openGraph and twitter are replaced, not merged, by a child segment — so every page gets the full set here
export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
}: {
  locale: Locale;
  path: string;
  title: string;
  description?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `/${locale}${path}`;
  return {
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      siteName: site.name,
      title,
      description,
      url,
      locale: ogLocale(locale),
      alternateLocale: locales.filter((l) => l !== locale).map(ogLocale),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const personId = () => `${siteUrl()}/#person`;
const websiteId = () => `${siteUrl()}/#website`;

// Home page: who the site is about, as one linked graph
export function homeJsonLd(locale: Locale, t: Dict) {
  const base = siteUrl();
  const url = `${base}/${locale}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId(),
        url: `${base}/`,
        name: site.name,
        alternateName: [site.nameEl, new URL(base).hostname],
        inLanguage: [...locales],
        publisher: { "@id": personId() },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: locale,
        isPartOf: { "@id": websiteId() },
        about: { "@id": personId() },
        mainEntity: { "@id": personId() },
        primaryImageOfPage: `${base}/avatar.jpeg`,
      },
      {
        "@type": "Person",
        "@id": personId(),
        name: locale === "el" ? site.nameEl : site.name,
        alternateName: locale === "el" ? site.name : site.nameEl,
        url,
        image: `${base}/avatar.jpeg`,
        email: `mailto:${site.email}`,
        jobTitle: site.jobTitle,
        description: t.about.intro,
        alumniOf: { "@type": "CollegeOrUniversity", name: "Aristotle University of Thessaloniki" },
        knowsLanguage: ["el", "en"],
        knowsAbout: t.skills.groups.flatMap((g) => g.items),
        hasCredential: t.skills.certs.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          name: `${c.issuer} ${c.name}`,
          credentialCategory: "certification",
          recognizedBy: { "@type": "Organization", name: c.issuer },
        })),
        sameAs: [site.github, site.linkedin],
      },
    ],
  };
}

// Project page: the write-up as an article by the same person, plus its breadcrumb trail
export function projectJsonLd(locale: Locale, project: Project, t: Dict) {
  const base = siteUrl();
  const home = `${base}/${locale}`;
  const url = `${home}/project/${project.slug}`;
  const images = Array.from(project.content.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)/g), (m) => `${base}${m[1]}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline: project.title,
        description: project.summary,
        inLanguage: locale,
        dateCreated: String(project.year),
        keywords: project.stack.join(", "),
        ...(images.length ? { image: images } : {}),
        author: { "@type": "Person", "@id": personId(), name: site.name, url: home },
        isPartOf: { "@id": websiteId() },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { name: site.name, item: home },
          { name: t.projects.title, item: `${home}#projects` },
          { name: project.title, item: url },
        ].map((crumb, i) => ({ "@type": "ListItem", position: i + 1, ...crumb })),
      },
    ],
  };
}
