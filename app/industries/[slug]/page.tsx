import { notFound } from "next/navigation";
import Link from "next/link";
import { INDUSTRIES, getIndustryBySlug } from "@/lib/industries";

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({
    slug: industry.slug,
  }));
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-8">
        <Link
          href="/#industries"
          className="text-sm text-jd-mid transition-colors hover:text-jd-offwhite"
        >
          &larr; All Industries
        </Link>
      </nav>
      <h1 className="text-3xl font-bold tracking-tight text-jd-offwhite sm:text-4xl">
        {industry.name}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-jd-mid">
        {industry.detail}
      </p>
      <div className="mt-12 rounded-lg border border-jd-dark bg-jd-dark/50 p-8">
        <h2 className="text-xl font-semibold text-jd-offwhite">
          Ready to outfit your team?
        </h2>
        <p className="mt-2 text-jd-mid">
          Tell us what you need and we will prepare a custom quote for your{" "}
          {industry.name.toLowerCase()} team.
        </p>
        <Link
          href="/order"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-jd-orange px-6 py-3 text-base font-semibold text-jd-black transition-opacity hover:opacity-90"
        >
          Start your order
        </Link>
      </div>
    </main>
  );
}
