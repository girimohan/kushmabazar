"use client";
// src/components/Footer.tsx

import React from "react";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-brand-blue text-white mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand column */}
          <div>
            <p className="font-display font-bold text-xl mb-2">{t.siteName}</p>
            <p className="text-blue-200 text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex gap-1 mt-4">
              {/* Nepali flag colour bar decoration */}
              <span className="block h-1 w-8 rounded-full bg-brand-red" />
              <span className="block h-1 w-4 rounded-full bg-brand-green" />
              <span className="block h-1 w-6 rounded-full bg-white/40" />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-blue-200 mb-3">
              {t.footer.quickLinks}
            </p>
            <ul className="space-y-2">
              {[
                { href: "/", label: t.nav.home },
                { href: "/listings", label: t.nav.listings },
                { href: "/submit", label: t.nav.submit },
                { href: "/about", label: t.nav.about },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-100 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-blue-200 mb-3">
              {t.footer.contact}
            </p>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>📍 {t.contact.address}</li>
              <li>
                <a
                  href={`mailto:${t.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  ✉️ {t.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t.contact.phone}`}
                  className="hover:text-white transition-colors"
                >
                  📞 {t.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-200">
          <span>
            © {new Date().getFullYear()} {t.siteName}. {t.footer.rights}
          </span>
          <span className="flex items-center gap-1">
            Made with <span className="text-brand-red">♥</span> in Kushma, Nepal
          </span>
        </div>
      </div>
    </footer>
  );
}
