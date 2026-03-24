"use client";
// src/app/listing/[id]/page.tsx
// ──────────────────────────────────────────────────────────────
// Single listing detail page.
// Fetches listing by ID from the API. Falls back to dummies.
// ──────────────────────────────────────────────────────────────

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { dummyListings } from "@/lib/dummy-listings";
import type { Listing } from "@/types/listing";

export default function ListingDetailPage() {
  const { t } = useLang();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // Try fetching all listings; find by id
        const res = await fetch("/api/listings");
        if (res.ok) {
          const data: Listing[] = await res.json();
          const found = data.find((l) => l.id === params.id);
          if (found) {
            setListing(found);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Ignore — fall through to dummies
      }

      // Fallback to dummies
      const found = dummyListings.find((l) => l.id === params.id);
      if (found) {
        setListing(found);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-96 rounded-2xl bg-surface-subtle animate-pulse mb-6" />
        <div className="h-8 w-2/3 rounded-xl bg-surface-subtle animate-pulse mb-3" />
        <div className="h-4 w-full rounded bg-surface-subtle animate-pulse" />
      </div>
    );
  }

  if (notFound || !listing) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-24 text-center">
        <p className="text-5xl mb-4">😕</p>
        <h1 className="font-display font-bold text-2xl text-ink mb-2">
          Listing Not Found
        </h1>
        <p className="text-ink-muted mb-6">
          This listing may have been removed or the ID is invalid.
        </p>
        <Link href="/listings">
          <Button variant="outline">{t.detail.backToListings}</Button>
        </Link>
      </div>
    );
  }

  const priceLabel =
    listing.price == null || listing.price === 0
      ? t.listings.negotiable
      : `NPR ${listing.price.toLocaleString()}`;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/listings"
        className="inline-flex items-center text-sm font-medium text-brand-blue hover:underline mb-6"
      >
        {t.detail.backToListings}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: image + description */}
        <div className="lg:col-span-3 space-y-6">
          {/* Image */}
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-surface-subtle">
            {listing.imageURL ? (
              <Image
                src={listing.imageURL}
                alt={listing.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-6xl">
                📦
              </div>
            )}
          </div>

          {/* Title + category badge */}
          <div>
            <span className="inline-block mb-2 text-xs font-semibold uppercase tracking-wider text-brand-blue bg-brand-blue/8 px-3 py-1 rounded-full">
              {listing.category}
            </span>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink leading-tight">
              {listing.title}
            </h1>
          </div>

          {/* Description */}
          <div className="prose prose-sm text-ink-muted leading-relaxed whitespace-pre-line">
            {listing.description}
          </div>
        </div>

        {/* Right: price + contact card */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 bg-white rounded-2xl shadow-card p-6 space-y-5">
            {/* Price */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-subtle mb-1">
                {t.detail.price}
              </p>
              <p className="font-display font-bold text-3xl text-brand-blue">
                {priceLabel}
              </p>
            </div>

            {/* Details list */}
            <dl className="divide-y divide-surface-border text-sm">
              {[
                { label: t.detail.category, value: listing.category },
                { label: t.detail.location, value: listing.location },
                {
                  label: t.detail.postedBy,
                  value: listing.contactName,
                },
                ...(listing.createdAt
                  ? [{ label: "Date", value: listing.createdAt }]
                  : []),
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2.5">
                  <dt className="text-ink-subtle">{row.label}</dt>
                  <dd className="font-medium text-ink text-right">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Contact buttons */}
            <div className="space-y-2.5 pt-2">
              <a href={`tel:${listing.contactPhone}`} className="block">
                <Button size="lg" variant="primary" className="w-full">
                  📞 {t.detail.callSeller}
                </Button>
              </a>
              {listing.contactEmail && (
                <a href={`mailto:${listing.contactEmail}`} className="block">
                  <Button size="lg" variant="outline" className="w-full">
                    ✉️ {t.detail.emailSeller}
                  </Button>
                </a>
              )}
            </div>

            {/* Share */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: listing.title,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied!");
                }
              }}
              className="w-full text-sm text-ink-muted hover:text-brand-blue transition-colors"
            >
              🔗 {t.detail.share}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
