const BENEFITS = [
  {
    title: "Professional appearance",
    description:
      "Custom jackets give your team a polished, unified look that reflects your company's professionalism and attention to detail.",
  },
  {
    title: "Team identity",
    description:
      "Branded outerwear creates a sense of belonging and pride among staff, reinforcing your company culture every day.",
  },
  {
    title: "Brand visibility",
    description:
      "Every jacket is a walking billboard. Your logo and colours stay visible in public, at events, and on the move.",
  },
  {
    title: "Staff & company branding",
    description:
      "Align your team's appearance with your brand values. Custom jackets show employees they are part of something bigger.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-jd-offwhite sm:text-4xl">
          Why businesses choose custom jackets
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-lg border border-jd-dark bg-jd-dark/50 p-6"
            >
              <h3 className="text-lg font-semibold text-jd-offwhite">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-jd-mid">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
