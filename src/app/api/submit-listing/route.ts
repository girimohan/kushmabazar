// src/app/api/submit-listing/route.ts
// ──────────────────────────────────────────────────────────────
// API route: POST /api/submit-listing
//
// Receives form data from the Submit Listing page and writes a
// new record to the Airtable "Submissions" table with a default
// Status of "Pending".
//
// Required environment variables (set in .env.local / Vercel):
//   AIRTABLE_API_KEY          — Personal Access Token from airtable.com/account
//   AIRTABLE_BASE_ID          — e.g. "appXXXXXXXXXXXXXX" (from your base URL)
//   AIRTABLE_SUBMISSIONS_TABLE — Name of your submissions table, e.g. "Submissions"
// ──────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

// ── Airtable config ─────────────────────────────────────────────
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE = process.env.AIRTABLE_SUBMISSIONS_TABLE ?? "Submissions";

// The Airtable REST endpoint for creating records
function airtableUrl() {
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`;
}

export async function POST(req: NextRequest) {
  // ── Check env vars ────────────────────────────────────────────
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn(
      "[submit-listing] Airtable env vars not set. " +
        "Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID in .env.local"
    );
    // Return 200 in development so the form still shows success
    // while Airtable is not yet configured.
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json(
        { ok: true, dev: true, message: "Dev mode: Airtable not configured." },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { error: "Server not configured." },
      { status: 503 }
    );
  }

  // ── Parse body ────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const {
    title,
    description,
    category,
    location,
    price,
    contactName,
    contactPhone,
    contactEmail,
  } = body as Record<string, string>;

  // ── Basic server-side validation ──────────────────────────────
  if (!title || !description || !category || !location || !contactName || !contactPhone) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  // ── Build Airtable fields ─────────────────────────────────────
  // Column names must match EXACTLY what you have in Airtable.
  const fields: Record<string, unknown> = {
    Title: title,
    Description: description,
    Category: category,
    Location: location,
    ContactName: contactName,
    ContactPhone: contactPhone,
    Status: "Pending", // Default — moderator will set to "Approved"
  };

  // Optional fields
  if (price && !isNaN(Number(price))) {
    fields.Price = Number(price);
  }
  if (contactEmail) {
    fields.ContactEmail = contactEmail;
  }

  // ── POST to Airtable ──────────────────────────────────────────
  try {
    const atRes = await fetch(airtableUrl(), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });

    if (!atRes.ok) {
      const err = await atRes.json();
      console.error("[submit-listing] Airtable error:", err);
      return NextResponse.json(
        { error: "Airtable rejected the request.", detail: err },
        { status: 502 }
      );
    }

    const record = await atRes.json();
    return NextResponse.json({ ok: true, id: record.id }, { status: 201 });
  } catch (err) {
    console.error("[submit-listing] Network error:", err);
    return NextResponse.json(
      { error: "Failed to reach Airtable." },
      { status: 502 }
    );
  }
}
