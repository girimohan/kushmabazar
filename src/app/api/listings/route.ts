// src/app/api/listings/route.ts
// ──────────────────────────────────────────────────────────────
// API route: GET /api/listings
//
// Fetches records from the Airtable "Listings" table where
// the Status field equals "Approved", and returns them as JSON
// matching the Listing type used by the frontend.
//
// Required environment variables:
//   AIRTABLE_API_KEY       — Personal Access Token
//   AIRTABLE_BASE_ID       — e.g. "appXXXXXXXXXXXXXX"
//   AIRTABLE_LISTINGS_TABLE — Table name, e.g. "Listings"
//
// Expected Airtable columns:
//   Title, Description, Category, Location, Price (number),
//   ContactName, ContactPhone, ContactEmail, ImageURL, Status
// ──────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import type { Listing } from "@/types/listing";

// ── Airtable config ─────────────────────────────────────────────
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE = process.env.AIRTABLE_LISTINGS_TABLE ?? "Listings";

// Build the Airtable URL, filtering by Status = "Approved"
// and sorted newest-first (requires a "CreatedAt" field or
// just rely on Airtable's default sort order).
function buildAirtableUrl(): string {
  const base = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`;

  // Filter: only return records where Status is "Approved"
  const filterFormula = encodeURIComponent(`{Status} = "Approved"`);

  // Request up to 100 records (Airtable max per page)
  return `${base}?filterByFormula=${filterFormula}&maxRecords=100&sort[0][field]=CreatedAt&sort[0][direction]=desc`;
}

// Shape of a raw Airtable record from the REST API
interface AirtableRecord {
  id: string;
  fields: {
    Title?: string;
    Description?: string;
    Category?: string;
    Location?: string;
    Price?: number;
    ContactName?: string;
    ContactPhone?: string;
    ContactEmail?: string;
    ImageURL?: string;
    Status?: string;
    CreatedAt?: string;
  };
  createdTime?: string;
}

// Transform an Airtable record into our Listing type
function mapRecord(record: AirtableRecord): Listing {
  const f = record.fields;
  return {
    id: record.id,
    title: f.Title ?? "(No title)",
    description: f.Description ?? "",
    category: f.Category ?? "Other",
    location: f.Location ?? "",
    price: f.Price ?? null,
    contactName: f.ContactName ?? "",
    contactPhone: f.ContactPhone ?? "",
    contactEmail: f.ContactEmail ?? "",
    imageURL: f.ImageURL ?? "",
    status: (f.Status as Listing["status"]) ?? "Approved",
    createdAt: f.CreatedAt ?? record.createdTime ?? "",
  };
}

export async function GET() {
  // ── If not configured, return empty array ─────────────────────
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn(
      "[listings] Airtable env vars not set. Returning empty array. " +
        "The frontend will fall back to dummy listings."
    );
    return NextResponse.json([], { status: 200 });
  }

  // ── Fetch from Airtable (with basic pagination) ───────────────
  let allRecords: AirtableRecord[] = [];
  let offset: string | undefined;

  try {
    // Airtable paginates in pages of 100. Loop until no more offset.
    do {
      const url =
        buildAirtableUrl() + (offset ? `&offset=${offset}` : "");

      const atRes = await fetch(url, {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
        // Cache for 60 seconds on Vercel edge — adjust as needed
        next: { revalidate: 60 },
      });

      if (!atRes.ok) {
        const err = await atRes.json();
        console.error("[listings] Airtable error:", err);
        return NextResponse.json([], { status: 200 });
      }

      const data: { records: AirtableRecord[]; offset?: string } =
        await atRes.json();

      allRecords = [...allRecords, ...data.records];
      offset = data.offset; // undefined when no more pages
    } while (offset);

    const listings: Listing[] = allRecords.map(mapRecord);
    return NextResponse.json(listings, { status: 200 });
  } catch (err) {
    console.error("[listings] Network error:", err);
    // Return empty so the frontend gracefully falls back to dummies
    return NextResponse.json([], { status: 200 });
  }
}
