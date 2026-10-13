"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "@/lib/faq";

interface AccordionItemProps {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: AccordionItemProps) {
  const buttonId = `faq-button-${index}`;
  const panelId = `faq-panel-${index}`;

  // Strip HTML comments for display
  const cleanAnswer = item.answer.replace(/<!--.*?-->/g, "").trim();

  return (
    <div className="border-b border-jd-dark">
      <h3>
        <button
          id={buttonId}
          type="button"
          className="flex w-full items-center justify-between py-4 text-left"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="text-base font-medium text-jd-offwhite">
            {item.question}
          </span>
          <svg
            className={cn(
              "h-5 w-5 shrink-0 text-jd-mid transition-transform duration-200",
              isOpen && "rotate-180"
            )}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-jd-mid">{cleanAnswer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight text-jd-offwhite sm:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 rounded-lg border border-jd-dark bg-jd-dark/30 px-6">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => toggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
