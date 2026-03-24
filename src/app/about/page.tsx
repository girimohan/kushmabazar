"use client";
// src/app/about/page.tsx

import React from "react";
import { useLang } from "@/context/LanguageContext";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  const { t } = useLang();

  return (
    <div>
      {/* Hero banner */}
      <section className="bg-brand-blue text-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display font-bold text-4xl sm:text-5xl mb-4">
            {t.about.pageTitle}
          </h1>
          <p className="text-blue-200 text-lg leading-relaxed">
            {t.about.missionBody}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">
              {t.about.mission}
            </span>
            <h2 className="font-display font-bold text-3xl text-ink mb-4">
              {t.about.mission}
            </h2>
            <p className="text-ink-muted leading-relaxed text-lg">
              {t.about.missionBody}
            </p>
          </div>
          <div className="flex justify-center">
            {/* Decorative Nepali flag colours */}
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full bg-brand-blue/10" />
              <div className="absolute inset-6 rounded-full bg-brand-red/10" />
              <div className="absolute inset-12 rounded-full bg-brand-green/10 flex items-center justify-center text-5xl">
                🇳🇵
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section>
          <h2 className="font-display font-bold text-3xl text-ink text-center mb-8">
            {t.about.howItWorks}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {t.about.steps.map((step, i) => (
              <div
                key={step.title}
                className="bg-white rounded-2xl shadow-card p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-brand-blue text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-ink text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="bg-surface-muted rounded-2xl p-8 text-center">
          <h2 className="font-display font-bold text-2xl text-ink mb-3">
            {t.about.team}
          </h2>
          <p className="text-ink-muted leading-relaxed max-w-xl mx-auto">
            {t.about.teamBody}
          </p>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link href="/submit">
            <Button size="lg" variant="primary">
              {t.cta_section.button}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
