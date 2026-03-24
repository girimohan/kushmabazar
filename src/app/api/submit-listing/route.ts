// src/app/api/submit-listing/route.ts
// ──────────────────────────────────────────────────────────────
// API route: POST /api/submit-listing
//
// Accepts multipart/form-data from the Submit Listing page.
// Uploads any attached images to Vercel Blob, then writes a new
// record to the Airtable "Submissions" table.
//
// Required environment variables (set in .env.local / Vercel):
//   AIRTABLE_API_KEY           — Personal Access Token from airtable.com/account
//   AIRTABLE_BASE_ID           — e.g. "appXXXXXXXXXXXXXX"
//   AIRTABLE_SUBMISSIONS_TABLE — e.g. "Submissions"
//   BLOB_READ_WRITE_TOKEN      — From Vercel Dashboard → Storage → Blob
// ──────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE = process.env.AIRTABLE_SUBMISSIONS_TABLE ?? "Submissions";

function airtableUrl() {
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE)}`;
}

export async function POST(req: NextRequest) {
  // ── Check Airtable env vars ───────────────────────────────────
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn("[submit-listing] Airtable env vars not set.");
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json(
        { success: true, dev: true, message: "Dev mode: Airtable not configured." },
        { status: 200 }
      );
    }
    return NextResponse.json({ error: "Server not configured." }, { status: 503 });
  }

  // ── Parse multipart/form-data ─────────────────────────────────
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const title        = (formData.get("title")        as string | null)?.trim() ?? "";
  const description  = (formData.get("description")  as string | null)?.trim() ?? "";
  const category     = (formData.get("category")     as string | null)?.trim() ?? "";
  const location     = (formData.get("location")     as string | null)?.trim() ?? "";
  const price        = (formData.get("price")        as string | null)?.trim() ?? "";
  const contactName  = (formData.get("contactName")  as string | null)?.trim() ?? "";
  const contactPhone = (formData.get("contactPhone") as string | null)?.trim() ?? "";
  const contactEmail = (formData.get("contactEmail") as string | null)?.trim() ?? "";

  // ── Validate required fields ──────────────────────────────────
  if (!title || !description || !category || !location || !contactName || !contactPhone) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  // ── Upload images to Vercel Blob ──────────────────────────────
  const imageFiles = formData.getAll("images") as File[];
  const imageUrls: string[] = [];

  for (const file of imageFiles) {
    if (!file || file.size === 0) continue;
    try {
      const blob = await put(
        `listings/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`,
        file,
        { access: "public" }
      );
      imageUrls.push(blob.url);
    } catch (err) {
      console.warn("[submit-listing] Image upload failed, skipping:", err);
    }
  }

  // ── Build Airtable fields ─────────────────────────────────────
  const fields: Record<string, unknown> = {
    Title: title,
    Description: description,
    Category: category,
    Location: location,
    ContactName: contactName,
    ContactPhone: contactPhone,
    Status: "Pending",
    ImportedToListings: false,
  };

  if (price && !isNaN(Number(price))) {
    fields.Price = Number(price);
  }
  if (contactEmail) {
    fields.ContactEmail = contactEmail;
  }
  if (imageUrls.length > 0) {
    // Airtable attachment field expects array of { url } objects
    fields.Images = imageUrls.map((url) => ({ url }));
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

    return NextResponse.json(
      { success: true, message: "Listing submitted successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[submit-listing] Network error:", err);
    return NextResponse.json({ error: "Failed to reach Airtable." }, { status: 502 });
  }
}
