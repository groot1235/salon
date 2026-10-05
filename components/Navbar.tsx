"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/data";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToBooking = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#booking");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 h-16">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Left: Brand Logo Text */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-base font-semibold tracking-tight text-slate-900 hover:opacity-85 transition-opacity"
          >
            {SITE_CONFIG.brandName}
          </Link>

          {/* Center-left: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-normal text-slate-500 hover:text-slate-900 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Book Appointment Outline Button & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#booking"
            onClick={scrollToBooking}
            className="inline-flex items-center justify-center h-9 px-3.5 sm:px-5 text-xs font-medium border border-slate-900 text-slate-900 bg-transparent rounded-none transition-colors duration-200 hover:bg-slate-900 hover:text-white"
          >
            Book Appointment
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="1.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="1.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-600 hover:text-slate-900 py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={(e) => {
              setMobileMenuOpen(false);
              scrollToBooking(e);
            }}
            className="block text-sm font-medium text-slate-900 py-1 border-t border-slate-100 pt-2"
          >
            Book Appointment
          </a>
        </div>
      )}
    </header>
  );
}
