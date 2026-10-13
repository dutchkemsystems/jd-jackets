import Link from "next/link";
import { CUSTOMIZATION_CATALOGUE_URL, FULL_BRIEF_URL } from "@/lib/utils";

export default function CustomizationSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-jd-offwhite sm:text-4xl">
          Customize your jacket.
        </h2>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <Link
            href={CUSTOMIZATION_CATALOGUE_URL}
            className="inline-flex items-center gap-2 rounded-md border border-jd-dark px-6 py-3 text-base font-medium text-jd-offwhite transition-colors hover:border-jd-orange"
          >
            View the original Customization System catalogue
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
          </Link>
          <Link
            href={FULL_BRIEF_URL}
            className="inline-flex items-center gap-2 rounded-md bg-jd-orange px-6 py-3 text-base font-semibold text-jd-black transition-opacity hover:opacity-90"
          >
            Planning a detailed project? Complete a full brief
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
          </Link>
        </div>
      </div>
    </section>
  );
}
