"use client";
// src/app/page.tsx — Home page

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

// Category cards shown on the home page
const categoryData = [
  { emoji: "🏍️", enName: "Vehicles", neName: "सवारी साधन", color: "bg-blue-50 border-blue-100 text-brand-blue" },
  { emoji: "📱", enName: "Electronics", neName: "इलेक्ट्रोनिक्स", color: "bg-purple-50 border-purple-100 text-purple-700" },
  { emoji: "🏠", enName: "Real Estate", neName: "घरजग्गा", color: "bg-amber-50 border-amber-100 text-amber-700" },
  { emoji: "🌿", enName: "Agriculture", neName: "कृषि", color: "bg-green-50 border-green-100 text-brand-green" },
  { emoji: "🔧", enName: "Services", neName: "सेवाहरू", color: "bg-red-50 border-red-100 text-brand-red" },
  { emoji: "💼", enName: "Jobs", neName: "जागिर", color: "bg-teal-50 border-teal-100 text-teal-700" },
  { emoji: "🪑", enName: "Furniture", neName: "फर्निचर", color: "bg-orange-50 border-orange-100 text-orange-700" },
  { emoji: "🛒", enName: "Food & Grocery", neName: "खाना र किराना", color: "bg-lime-50 border-lime-100 text-lime-700" },
];

const stats = [
  { value: "500+", enLabel: "Listings", neLabel: "सूचीहरू" },
  { value: "1,200+", enLabel: "Community Members", neLabel: "समुदाय सदस्यहरू" },
  { value: "9", enLabel: "Wards Covered", neLabel: "वडाहरू" },
  { value: "Free", enLabel: "Always", neLabel: "सधैं" },
];

export default function HomePage() {
  const { t, lang } = useLang();

  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-hero-pattern py-16 md:py-24 lg:py-28">
        {/* Decorative background circles */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-blue/5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 -left-16 w-64 h-64 rounded-full bg-brand-green/6"
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <span className="inline-block mb-5 px-4 py-1.5 rounded-full bg-brand-blue/8 text-brand-blue text-sm font-semibold border border-brand-blue/15">
            {t.hero.badge}
          </span>

          {/* Heading */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-ink leading-tight mb-5">
            {t.hero.heading}
          </h1>

          {/* Sub-heading */}
          <p className="text-lg text-ink-muted leading-relaxed max-w-2xl mx-auto mb-8">
            {t.hero.subheading}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/listings">
              <Button size="lg" variant="primary">
                {t.hero.cta}
              </Button>
            </Link>
            <Link href="/submit">
              <Button size="lg" variant="outline">
                {t.hero.ctaSecondary}
              </Button>
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.value}
                className="bg-white rounded-2xl shadow-card px-4 py-3"
              >
                <p className="font-display font-bold text-2xl text-brand-blue leading-none">
                  {s.value}
                </p>
                <p className="text-xs text-ink-muted mt-1">
                  {lang === "en" ? s.enLabel : s.neLabel}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What is KushmaBazar ──────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl text-ink mb-4">
            {t.about_section.heading}
          </h2>
          <p className="text-ink-muted leading-relaxed text-lg">
            {t.about_section.body}
          </p>
        </div>
      </section>

      {/* ── Categories ──────────────────────────────────────── */}
      <section className="py-16 bg-surface-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-ink text-center mb-10">
            {t.categories_section.heading}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categoryData.map((cat) => (
              <Link
                key={cat.enName}
                href={`/listings?category=${encodeURIComponent(cat.enName)}`}
                className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 ${cat.color} hover:scale-105 transition-transform duration-150 font-semibold text-sm`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span>{lang === "en" ? cat.enName : cat.neName}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-3xl text-ink text-center mb-10">
            {t.about.howItWorks}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.about.steps.map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface-muted"
              >
                <div className="w-12 h-12 rounded-full bg-brand-blue text-white font-bold text-lg flex items-center justify-center mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-ink mb-2 text-lg">{step.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────── */}
      <section className="py-16 bg-brand-blue text-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl mb-4">
            {t.cta_section.heading}
          </h2>
          <p className="text-blue-200 text-lg mb-8 leading-relaxed">
            {t.cta_section.body}
          </p>
          <Link href="/submit">
            <Button
              size="lg"
              className="bg-white text-brand-blue hover:bg-blue-50 border-0 shadow-lg font-bold"
            >
              {t.cta_section.button}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
