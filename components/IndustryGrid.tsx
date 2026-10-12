import Link from "next/link";
import { INDUSTRIES } from "@/lib/industries";

export default function IndustryGrid() {
  return (
    <section id="industries" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-jd-offwhite sm:text-4xl">
          Industries we serve
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-jd-mid">
          Whatever your sector, we have the right jacket for your team.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group rounded-lg border border-jd-dark bg-jd-dark/50 p-6 transition-colors hover:border-jd-orange/50"
            >
              <h3 className="text-lg font-semibold text-jd-offwhite group-hover:text-jd-orange">
                {industry.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-jd-mid">
                {industry.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-jd-orange">
                Explore Jackets
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12l-7.5 7.5M21 12H3"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
