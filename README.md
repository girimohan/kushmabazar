# KushmaBazar 🇳🇵

A modern, bilingual (Nepali/English) local marketplace web app for Kushma, Parbat, Nepal.

Built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**.  
Listings backend powered by **Airtable**.

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in:

| Variable | Description |
|---|---|
| `AIRTABLE_API_KEY` | Personal Access Token from [airtable.com/account](https://airtable.com/account) |
| `AIRTABLE_BASE_ID` | Your base ID from the base URL (e.g. `appXXXXXXXXXXXX`) |
| `AIRTABLE_SUBMISSIONS_TABLE` | Table for new submissions (default: `Submissions`) |
| `AIRTABLE_LISTINGS_TABLE` | Table for approved listings (default: `Listings`) |

> **Note:** The app runs perfectly without Airtable — it uses built-in dummy listings for the UI.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Airtable Setup

### "Listings" table (for displaying approved listings)

| Column name | Type |
|---|---|
| Title | Single line text |
| Description | Long text |
| Category | Single select |
| Location | Single line text |
| Price | Number |
| ContactName | Single line text |
| ContactPhone | Phone number |
| ContactEmail | Email |
| ImageURL | URL |
| Status | Single select: `Approved`, `Pending`, `Rejected` |
| CreatedAt | Date |

### "Submissions" table (for receiving new form submissions)

Same columns as above; `Status` defaults to `Pending`.

---

## Deploying to Vercel

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add environment variables under **Project → Settings → Environment Variables**
4. Deploy!

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts + providers
│   ├── globals.css             # Tailwind base styles
│   ├── page.tsx                # Home page
│   ├── listings/page.tsx       # Listings grid with filters
│   ├── listing/[id]/page.tsx   # Single listing detail
│   ├── submit/page.tsx         # Submit listing form
│   ├── about/page.tsx          # About page
│   ├── contact/page.tsx        # Contact page
│   └── api/
│       ├── listings/route.ts         # GET approved listings from Airtable
│       └── submit-listing/route.ts   # POST new submission to Airtable
├── components/
│   ├── Navbar.tsx              # Sticky nav with language toggle
│   ├── Footer.tsx
│   ├── ListingCard.tsx
│   └── ui/
│       ├── Button.tsx
│       └── FormFields.tsx      # Input, Select, Textarea, Label
├── context/
│   └── LanguageContext.tsx     # Language provider + useLang hook
├── lib/
│   ├── dictionary.ts           # All UI text in EN + NE
│   └── dummy-listings.ts       # Fallback listings for dev/demo
└── types/
    └── listing.ts              # TypeScript interfaces
```

---

## Features

- 🌐 **Bilingual** — Toggle between English and Nepali. Language preference is saved to localStorage.
- 🏪 **Listings** — Grid view with category and location filters
- 📝 **Submit Listing** — Form that posts to Airtable via REST API
- 🎨 **Nepali aesthetic** — Colours inspired by the Nepali flag: deep blue, crimson red, green
- 📱 **Mobile-first** — Fully responsive on all screen sizes
- ⚡ **Fast** — Static where possible, ISR revalidation for listings

---

Made with ♥ for Kushma, Parbat, Nepal.
