"use client";
// src/context/LanguageContext.tsx
// ──────────────────────────────────────────────────────────────
// Simple client-side language context.
// Wraps the app in a provider so any component can call useLang()
// to get the current dictionary and a toggle function.
// Language preference is persisted to localStorage.
// ──────────────────────────────────────────────────────────────

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { dictionary, type Lang, type Dictionary } from "@/lib/dictionary";

interface LanguageContextValue {
  lang: Lang;
  toggleLang: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "kushmabazar-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default to English; hydrate from localStorage on mount
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "ne" || stored === "en") {
      setLang(stored);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "ne" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const t = dictionary[lang] as Dictionary;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Convenience hook — throws if used outside provider
export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}
