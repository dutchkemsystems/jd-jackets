const TAGS = [
  "Companies",
  "Businesses",
  "Corporate teams",
  "Staff teams",
  "Organizations",
  "Schools",
  "Construction companies",
  "Security companies",
  "Logistics companies",
  "Hospitality businesses",
  "Sports teams",
  "Events & associations",
];

export default function WhoWeServe() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-jd-offwhite sm:text-4xl">
          Your company. Your people. Your identity.
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-jd-mid">
          We work with organizations of all sizes to create custom branded
          jackets that unite teams and elevate brands. Whether you need ten
          jackets for a small team or thousands for a nationwide workforce, we
          deliver consistent quality and professional branding every time.
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-jd-dark bg-jd-dark/50 px-4 py-2 text-sm text-jd-mid"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
