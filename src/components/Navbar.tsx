"use client";
// src/components/Navbar.tsx
// ──────────────────────────────────────────────────────────────
// Sticky top navigation bar.
// Contains: Logo/brand, nav links, language toggle button.
// Mobile: hamburger menu that slides open/closes.
// ──────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LanguageContext";

// Category icon shown alongside logo
function KushmaBazarLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      {/* Stylised market stall / mountain icon */}
      <rect width="32" height="32" rx="8" fill="#003893" />
      <path
        d="M6 22 L16 8 L26 22"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 22 L22 22"
        stroke="#DC143C"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="17" r="2.5" fill="#2E8B57" />
    </svg>
  );
}

export function Navbar() {
  const { t, lang, toggleLang } = useLang();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add shadow when page is scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/listings", label: t.nav.listings },
    { href: "/submit", label: t.nav.submit },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "shadow-nav" : ""
      }`}
    >
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* ── Logo / Brand ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity"
          >
            <KushmaBazarLogo />
            <div className="leading-tight">
              <span className="block font-display font-bold text-brand-blue text-lg">
                {t.siteName}
              </span>
              <span className="block text-[10px] text-ink-subtle font-medium tracking-wide uppercase">
                {t.tagline}
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isActive(link.href)
                    ? "bg-brand-blue/8 text-brand-blue font-semibold"
                    : "text-ink-muted hover:text-brand-blue hover:bg-brand-blue/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Right side: lang toggle + mobile burger ── */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              aria-label={`Switch to ${lang === "en" ? "Nepali" : "English"}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-border text-xs font-semibold text-ink hover:border-brand-blue hover:text-brand-blue transition-colors duration-150"
            >
              {/* Flag emoji for current language */}
              <span className="text-base leading-none">
                {lang === "en" ? "🇳🇵" : "🇬🇧"}
              </span>
              <span>{lang === "en" ? "नेपाली" : "English"}</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-surface-subtle transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-5 h-0.5 bg-ink transition-transform duration-200 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-ink transition-opacity duration-200 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-ink transition-transform duration-200 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-200 ${
            menuOpen ? "max-h-80 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-surface-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
                  isActive(link.href)
                    ? "bg-brand-blue/8 text-brand-blue font-semibold"
                    : "text-ink-muted hover:bg-surface-subtle hover:text-brand-blue"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
