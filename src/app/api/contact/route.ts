// src/app/api/contact/route.ts
// ──────────────────────────────────────────────────────────────
// API route: POST /api/contact
//
// Receives name, email, message and writes a new record to the
// Airtable "ContactMessages" table with Status "New".
//
// Required environment variables:
//   AIRTABLE_API_KEY   — Personal Access Token from airtable.com/account
//   AIRTABLE_BASE_ID   — e.g. "appXXXXXXXXXXXXXX"
// ──────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE = "ContactMessages";

function airtableUrl() {
  return `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE)}`;
}

export async function POST(req: NextRequest) {
  // ── Check env vars ────────────────────────────────────────────
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    console.warn("[contact] Airtable env vars not set.");
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({ success: true, dev: true }, { status: 200 });
    }
    return NextResponse.json({ error: "Server not configured." }, { status: 503 });
  }

  // ── Parse body ────────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, string>;

  // ── Validate ──────────────────────────────────────────────────
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // ── Build Airtable fields ─────────────────────────────────────
  const fields = {
    Name: name.trim(),
    Email: email.trim(),
    Message: message.trim(),
    Status: "New",
  };

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
      console.error("[contact] Airtable error:", err);
      return NextResponse.json(
        { error: "Airtable rejected the request.", detail: err },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("[contact] Network error:", err);
    return NextResponse.json({ error: "Failed to reach Airtable." }, { status: 502 });
  }
}
