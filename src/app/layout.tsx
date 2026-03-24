// src/app/layout.tsx
// ──────────────────────────────────────────────────────────────
// Root layout: loads fonts, wraps everything in LanguageProvider,
// mounts Navbar and Footer around the page slot.
// ──────────────────────────────────────────────────────────────

import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Playfair_Display,
  Noto_Sans_Devanagari,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ── Font definitions ────────────────────────────────────────────

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["700", "800"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-noto-devanagari",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// ── Metadata ────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "KushmaBazar — Local Marketplace",
    template: "%s | KushmaBazar",
  },
  description:
    "Buy, sell, and discover goods and services in Kushma, Parbat. Your free, community-driven local marketplace.",
  keywords: ["Kushma", "Parbat", "Nepal", "marketplace", "bazaar", "local"],
  openGraph: {
    title: "KushmaBazar",
    description: "Your free local marketplace in Kushma, Parbat, Nepal.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${playfair.variable} ${notoDevanagari.variable}`}
    >
      <body className="font-sans bg-surface text-ink antialiased min-h-screen flex flex-col">
        {/*
          LanguageProvider must wrap Navbar + content + Footer
          so all client components can call useLang().
        */}
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
