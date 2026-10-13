import Jacket360 from "@/components/Jacket360";
import { getFramesForJacket } from "@/lib/jackets";

const BRAND_FRAMES = getFramesForJacket("executive-puffer");

const TAGS = [
  "FOR BUSINESSES",
  "FOR ORGANIZATIONS",
  "CUSTOM BRANDING",
  "ORDER THROUGH WHATSAPP",
];

export default function BrandSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-jd-offwhite sm:text-4xl">
              Your company. Your identity.
            </h2>
            <p className="mt-4 text-lg text-jd-mid">
              Staff. Teams. Organisations. One professional look.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-jd-dark bg-jd-dark/50 px-3 py-1 text-xs font-medium text-jd-mid"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <Jacket360
              frames={BRAND_FRAMES}
              alt="Executive Puffer Jacket — featured style"
            />
            <p className="mt-4 text-center text-sm text-jd-mid">
              Featured: Executive Puffer Jacket
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
