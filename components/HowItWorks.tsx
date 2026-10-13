const STEPS = [
  {
    number: "01",
    title: "Choose Your Industry",
    description:
      "Select the sector that best describes your team to see relevant jacket styles and options.",
  },
  {
    number: "02",
    title: "Tell Us What You Need",
    description:
      "Fill in our simple order form with your sizes, colours, branding, and delivery details.",
  },
  {
    number: "03",
    title: "Send Your Order on WhatsApp",
    description:
      "Review your order summary and send it directly to our team via WhatsApp.",
  },
  {
    number: "04",
    title: "Get Your Quote",
    description:
      "We review your requirements and send you a detailed quote within one business day.",
  },
  {
    number: "05",
    title: "Approve & Produce",
    description:
      "Once you approve the quote, we begin production and deliver to your specified location.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-jd-offwhite sm:text-4xl">
          How it works
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-jd-orange text-lg font-bold text-jd-black">
                {step.number}
              </div>
              <h3 className="mt-4 text-base font-semibold text-jd-offwhite">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-jd-mid">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
