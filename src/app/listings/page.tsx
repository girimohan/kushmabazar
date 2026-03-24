"use client";
// src/app/listings/page.tsx
// ──────────────────────────────────────────────────────────────
// Listings grid page with category + location filters.
// On load, tries to fetch from /api/listings (Airtable).
// If the API returns an error or is not configured, falls back
// to the dummyListings array so the UI always looks populated.
// ──────────────────────────────────────────────────────────────

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLang } from "@/context/LanguageContext";
import { ListingCard } from "@/components/ListingCard";
import { Select } from "@/components/ui/FormFields";
import { dummyListings } from "@/lib/dummy-listings";
import type { Listing } from "@/types/listing";

function ListingsContent() {
  const { t } = useLang();
  const searchParams = useSearchParams();

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(
    searchParams.get("category") ?? ""
  );
  const [location, setLocation] = useState(
    searchParams.get("location") ?? ""
  );

  // Fetch listings from API; fall back to dummies on failure
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/listings");
        if (!res.ok) throw new Error("API error");
        const data: Listing[] = await res.json();
        // If API is set up but empty, still use dummies in dev
        setListings(data.length > 0 ? data : dummyListings);
      } catch {
        // Airtable not configured or network error — use dummies
        setListings(dummyListings);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Filtered view
  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchCat = !category || l.category === category;
      const matchLoc = !location || l.location === location;
      return matchCat && matchLoc;
    });
  }, [listings, category, location]);

  // Build select options from dictionary
  const categoryOptions = [
    { value: "", label: t.listings.allCategories },
    ...t.categories.map((c) => ({ value: c, label: c })),
  ];
  const locationOptions = [
    { value: "", label: t.listings.allLocations },
    ...t.locations.map((l) => ({ value: l, label: l })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-1">
          {t.listings.pageTitle}
        </h1>
        <p className="text-ink-muted text-sm">
          {filtered.length} listing{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex-1">
          <Select
            id="cat-filter"
            options={categoryOptions}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label={t.listings.filterCategory}
          />
        </div>
        <div className="flex-1">
          <Select
            id="loc-filter"
            options={locationOptions}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label={t.listings.filterLocation}
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-64 rounded-2xl bg-surface-subtle animate-pulse"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-ink-muted">
          <p className="text-4xl mb-3">🔍</p>
          <p className="font-semibold">{t.listings.noResults}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10"><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{Array.from({ length: 8 }).map((_, i) => (<div key={i} className="h-64 rounded-2xl bg-surface-subtle animate-pulse" />))}</div></div>}>
      <ListingsContent />
    </Suspense>
  );
}
