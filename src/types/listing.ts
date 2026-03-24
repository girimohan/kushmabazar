// src/types/listing.ts

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  price?: number | null;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  imageURL?: string;
  status: "Approved" | "Pending" | "Rejected";
  createdAt?: string;
}

export interface SubmissionFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  price: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
