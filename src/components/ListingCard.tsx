"use client";
// src/components/ListingCard.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Listing } from "@/types/listing";
import { useLang } from "@/context/LanguageContext";

// Maps category name → emoji badge
const categoryEmoji: Record<string, string> = {
  Vehicles: "🏍️",
  "सवारी साधन": "🏍️",
  Electronics: "📱",
  "इलेक्ट्रोनिक्स": "📱",
  Furniture: "🪑",
  "फर्निचर": "🪑",
  Clothing: "👗",
  "कपडा": "👗",
  Agriculture: "🌿",
  "कृषि": "🌿",
  "Real Estate": "🏠",
  "घरजग्गा": "🏠",
  Services: "🔧",
  "सेवाहरू": "🔧",
  Jobs: "💼",
  "जागिर": "💼",
  "Food & Grocery": "🛒",
  "खाना र किराना": "🛒",
  Other: "📦",
  "अन्य": "📦",
};

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const { t } = useLang();

  const emoji = categoryEmoji[listing.category] ?? "📦";

  const priceLabel =
    listing.price == null || listing.price === 0
      ? t.listings.negotiable
      : `NPR ${listing.price.toLocaleString()}`;

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group block bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-200 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-44 w-full bg-surface-subtle overflow-hidden">
        {listing.imageURL ? (
          <Image
            src={listing.imageURL}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-5xl">{emoji}</span>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-ink text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {emoji} {listing.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-ink text-sm leading-snug line-clamp-2 mb-1 group-hover:text-brand-blue transition-colors">
          {listing.title}
        </h3>

        <p className="text-xs text-ink-muted line-clamp-2 mb-3">
          {listing.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="font-bold text-brand-blue text-sm">{priceLabel}</p>
            <p className="text-xs text-ink-subtle">
              📍 {listing.location}
            </p>
          </div>
          <span className="text-xs font-medium text-brand-blue bg-brand-blue/8 px-2.5 py-1 rounded-full whitespace-nowrap">
            {t.listings.viewDetails}
          </span>
        </div>
      </div>
    </Link>
  );
}
