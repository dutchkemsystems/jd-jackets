import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-jd-dark py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-jd-offwhite"
            >
              JD<span className="text-jd-orange">Jackets</span>
            </Link>
            <p className="mt-3 text-sm text-jd-mid">
              Custom branded jackets for businesses and organizations.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-jd-offwhite">
              Quick links
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="#industries"
                  className="text-sm text-jd-mid transition-colors hover:text-jd-offwhite"
                >
                  Industries
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-sm text-jd-mid transition-colors hover:text-jd-offwhite"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-jd-mid transition-colors hover:text-jd-offwhite"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sm text-jd-mid transition-colors hover:text-jd-offwhite"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-jd-offwhite">
              Get started
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/order"
                  className="text-sm text-jd-mid transition-colors hover:text-jd-offwhite"
                >
                  Order custom jackets
                </Link>
              </li>
              <li>
                <Link
                  href="/#industries"
                  className="text-sm text-jd-mid transition-colors hover:text-jd-offwhite"
                >
                  Explore industries
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-jd-offwhite">
              Contact
            </h3>
            <p className="mt-3 text-sm text-jd-mid">
              Send us a message on WhatsApp to get started with your custom
              jacket order.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-jd-dark pt-8 text-center">
          <p className="text-sm text-jd-mid">
            &copy; {new Date().getFullYear()} JD Jackets. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
