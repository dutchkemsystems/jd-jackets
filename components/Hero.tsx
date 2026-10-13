"use client";

import { motion } from "framer-motion";
import Jacket360 from "@/components/Jacket360";
import { getFramesForJacket } from "@/lib/jackets";

const HERO_FRAMES = getFramesForJacket("executive-puffer");

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-jd-offwhite sm:text-5xl lg:text-6xl">
              Custom jackets for businesses &amp; organizations.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-jd-mid">
              Create professional branded jackets for your staff, team, company
              or organization. Choose your style, colours, sizes and branding,
              then tell us what you need.
            </p>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-3 text-jd-offwhite">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-jd-orange"
                  aria-hidden="true"
                />
                Your company logo &amp; colours
              </li>
              <li className="flex items-center gap-3 text-jd-offwhite">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-jd-orange"
                  aria-hidden="true"
                />
                Mixed sizes for your team
              </li>
            </ul>
            <a
              href="#industries"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-jd-orange px-6 py-3 text-base font-semibold text-jd-black transition-opacity hover:opacity-90"
            >
              Find your industry
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
            </a>
          </motion.div>

          {/* 360 viewer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Jacket360
              frames={HERO_FRAMES}
              alt="Executive Puffer Jacket — 360 degree view"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
