"use client";

import { useState } from "react";
import Jacket360 from "@/components/Jacket360";
import { JACKET_STYLES, getFramesForJacket } from "@/lib/jackets";
import { cn } from "@/lib/utils";

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStyle = JACKET_STYLES[activeIndex];
  const frames = getFramesForJacket(activeStyle.slug);

  return (
    <section id="gallery" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-jd-offwhite sm:text-4xl">
          Custom jacket examples. Every angle. Every detail.
        </h2>

        {/* Style selector */}
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Jacket styles">
          {JACKET_STYLES.map((style, index) => (
            <button
              key={style.slug}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls="gallery-panel"
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                index === activeIndex
                  ? "bg-jd-orange text-jd-black"
                  : "border border-jd-dark text-jd-mid hover:border-jd-orange hover:text-jd-offwhite"
              )}
              onClick={() => setActiveIndex(index)}
            >
              {style.name}
            </button>
          ))}
        </div>

        {/* 360 viewer */}
        <div
          id="gallery-panel"
          role="tabpanel"
          aria-label={`${activeStyle.name} 360 degree view`}
          className="mt-8 flex justify-center"
        >
          <div className="w-full max-w-md">
            <Jacket360
              frames={frames}
              alt={`${activeStyle.name} — 360 degree rotatable view`}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/order"
            className="inline-flex items-center gap-2 rounded-md bg-jd-orange px-8 py-4 text-lg font-semibold text-jd-black transition-opacity hover:opacity-90"
          >
            EXPLORE CUSTOM JACKETS
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
          </a>
        </div>
      </div>
    </section>
  );
}
