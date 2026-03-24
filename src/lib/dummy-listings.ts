// src/lib/dummy-listings.ts
// ──────────────────────────────────────────────────────────────
// Fallback listings shown in the UI when Airtable is not yet
// configured or when AIRTABLE_API_KEY is not set.
// ──────────────────────────────────────────────────────────────

import type { Listing } from "@/types/listing";

export const dummyListings: Listing[] = [
  {
    id: "dummy-1",
    title: "Hero Splendor+ — 2019 Model",
    description:
      "Well-maintained Hero Splendor+ motorcycle. Single owner since purchase. Recently serviced, new tyres. Perfect for daily commute in Kushma. All documents up to date. Selling because upgrading to a bigger bike.",
    category: "Vehicles",
    location: "Kushma Bazaar",
    price: 145000,
    contactName: "Ram Bahadur Thapa",
    contactPhone: "9856012345",
    contactEmail: "ram@example.com",
    imageURL:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80",
    status: "Approved",
    createdAt: "2024-11-01",
  },
  {
    id: "dummy-2",
    title: "2BHK Flat for Rent — Near Kushma Hospital",
    description:
      "Spacious 2-bedroom flat available from December 2024. Ground floor, attached bathroom, kitchen with chimney. Walking distance to hospital and market. Suitable for family or working couple.",
    category: "Real Estate",
    location: "Ward 3",
    price: 8000,
    contactName: "Sita Gurung",
    contactPhone: "9841098765",
    contactEmail: "",
    imageURL:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    status: "Approved",
    createdAt: "2024-11-03",
  },
  {
    id: "dummy-3",
    title: "Samsung Galaxy A54 — Like New",
    description:
      "Samsung Galaxy A54 5G, 8GB RAM / 256GB storage. Used for only 3 months. Comes with original box, charger, and a spare case. No scratches on screen (tempered glass installed from day 1).",
    category: "Electronics",
    location: "Ward 5",
    price: 38000,
    contactName: "Suresh Magar",
    contactPhone: "9800123456",
    contactEmail: "suresh@example.com",
    imageURL:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
    status: "Approved",
    createdAt: "2024-11-05",
  },
  {
    id: "dummy-4",
    title: "Fresh Organic Vegetables — Daily Delivery",
    description:
      "We supply fresh organic vegetables grown in our farm in Kushma Ward 9. Available: tomato, cauliflower, spinach, beans, radish. Daily delivery to Kushma Bazaar area. Bulk orders welcome.",
    category: "Agriculture",
    location: "Ward 9",
    price: null,
    contactName: "Kamala Devi Pun",
    contactPhone: "9867054321",
    contactEmail: "",
    imageURL:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    status: "Approved",
    createdAt: "2024-11-06",
  },
  {
    id: "dummy-5",
    title: "Plumber Available — Residential & Commercial",
    description:
      "Experienced plumber with 10+ years offering all kinds of plumbing work: pipe fitting, bathroom installation, leak repair, solar water heater installation. Available 7 days a week. Reasonable rates.",
    category: "Services",
    location: "Kushma Bazaar",
    price: null,
    contactName: "Bikram Shrestha",
    contactPhone: "9812345678",
    contactEmail: "",
    imageURL:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
    status: "Approved",
    createdAt: "2024-11-07",
  },
  {
    id: "dummy-6",
    title: "Wooden Dining Table Set — 6 Chairs",
    description:
      "Solid wood dining table with 6 chairs. Good condition, minor scratches on table surface. Dimensions: 5ft x 3ft. Selling because moving to a smaller house. Buyer to arrange transport.",
    category: "Furniture",
    location: "Phalewas",
    price: 22000,
    contactName: "Prem Bahadur KC",
    contactPhone: "9856078901",
    contactEmail: "",
    imageURL:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    status: "Approved",
    createdAt: "2024-11-08",
  },
  {
    id: "dummy-7",
    title: "Part-time Accounting Job — Kushma NGO",
    description:
      "A local NGO in Kushma is looking for a part-time accountant (3 days/week). Requirements: minimum SLC/SEE passed, basic Tally knowledge, honest and punctual. Salary: Rs 8,000–12,000/month depending on experience.",
    category: "Jobs",
    location: "Kushma Bazaar",
    price: null,
    contactName: "Pratima Rana",
    contactPhone: "9800234567",
    contactEmail: "ngo@example.com",
    imageURL:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    status: "Approved",
    createdAt: "2024-11-09",
  },
  {
    id: "dummy-8",
    title: "Men's & Women's Traditional Dhaka Clothing",
    description:
      "Handwoven Dhaka fabric daura-suruwal sets and kurta-salwar sets. Made by local weavers in Kushma. Multiple colours available. Custom sizing possible with 7-day lead time. Supports local artisans.",
    category: "Clothing",
    location: "Ward 2",
    price: 2500,
    contactName: "Laxmi Oli",
    contactPhone: "9841123456",
    contactEmail: "",
    imageURL:
      "https://images.unsplash.com/photo-1532635241-17e820acc59f?w=600&q=80",
    status: "Approved",
    createdAt: "2024-11-10",
  },
];
