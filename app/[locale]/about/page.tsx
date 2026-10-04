import { redirect } from "next/navigation";

// This page now lives on the home flow; keep the old URL working.
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}#about`);
}
