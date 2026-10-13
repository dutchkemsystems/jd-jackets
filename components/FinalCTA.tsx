import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-jd-offwhite sm:text-4xl">
          Ready to create custom jackets for your business?
        </h2>
        <p className="mt-4 text-lg text-jd-mid">
          Your staff. Your team. Your company identity.
        </p>
        <Link
          href="/order"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-jd-orange px-8 py-4 text-lg font-semibold text-jd-black transition-opacity hover:opacity-90"
        >
          Start your order
          <svg
            className="h-5 w-5"
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
    </section>
  );
}
