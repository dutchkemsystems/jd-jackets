"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#industries", label: "Industries" },
  { href: "#gallery", label: "Gallery" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    toggleRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [closeMenu]
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-jd-orange focus:text-jd-black focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-jd-black/95 backdrop-blur-sm border-b border-jd-dark"
            : "bg-transparent"
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-jd-offwhite"
          >
            JD<span className="text-jd-orange">Jackets</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-jd-mid transition-colors hover:text-jd-offwhite"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/order"
                className="rounded-md bg-jd-orange px-4 py-2 text-sm font-semibold text-jd-black transition-opacity hover:opacity-90"
              >
                Order Custom Jackets
              </Link>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-jd-offwhite md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((v) => !v)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            ref={menuRef}
            className="border-t border-jd-dark bg-jd-black/95 backdrop-blur-sm md:hidden"
            onKeyDown={handleKeyDown}
          >
            <ul className="space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-jd-offwhite hover:bg-jd-dark"
                    onClick={closeMenu}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/order"
                  className="mt-2 block rounded-md bg-jd-orange px-3 py-2 text-center text-base font-semibold text-jd-black"
                  onClick={closeMenu}
                >
                  Order Custom Jackets
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
