"use client";
// src/app/submit/page.tsx
// ──────────────────────────────────────────────────────────────
// Submit Listing form page.
// On submit, POSTs to /api/submit-listing which writes to
// Airtable. Shows success/error state after submission.
// ──────────────────────────────────────────────────────────────

import React, { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/FormFields";
import type { SubmissionFormData } from "@/types/listing";

const emptyForm: SubmissionFormData = {
  title: "",
  description: "",
  category: "",
  location: "",
  price: "",
  contactName: "",
  contactPhone: "",
  contactEmail: "",
};

export default function SubmitPage() {
  const { t } = useLang();
  const [form, setForm] = useState<SubmissionFormData>(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof SubmissionFormData, string>>>({});

  const set = (field: keyof SubmissionFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear error on change
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  function validate(): boolean {
    const errs: typeof errors = {};
    if (!form.title.trim()) errs.title = "Required";
    if (!form.description.trim()) errs.description = "Required";
    if (!form.category) errs.category = "Required";
    if (!form.location.trim()) errs.location = "Required";
    if (!form.contactName.trim()) errs.contactName = "Required";
    if (!form.contactPhone.trim()) errs.contactPhone = "Required";
    if (form.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) {
      errs.contactEmail = "Invalid email";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/submit-listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("API error");
      setStatus("success");
      setForm(emptyForm);
    } catch {
      setStatus("error");
    }
  }

  const categoryOptions = t.categories.map((c) => ({ value: c, label: c }));
  const locationOptions = t.locations.map((l) => ({ value: l, label: l }));

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink mb-2">
          {t.submit.pageTitle}
        </h1>
        <p className="text-ink-muted">{t.submit.subtitle}</p>
      </div>

      {/* Success state */}
      {status === "success" && (
        <div className="mb-6 p-5 rounded-2xl bg-brand-green/10 border border-brand-green/20 text-brand-green font-medium">
          {t.submit.success}
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div className="mb-6 p-5 rounded-2xl bg-brand-red/10 border border-brand-red/20 text-brand-red font-medium">
          {t.submit.error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="bg-white rounded-2xl shadow-card p-6 space-y-5">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-subtle border-b border-surface-border pb-3">
            📋 Listing Details
          </p>

          <Input
            id="title"
            label={t.submit.fields.title}
            required
            placeholder={t.submit.fields.titlePlaceholder}
            value={form.title}
            onChange={set("title")}
            error={errors.title}
          />

          <Textarea
            id="description"
            label={t.submit.fields.description}
            required
            rows={4}
            placeholder={t.submit.fields.descriptionPlaceholder}
            value={form.description}
            onChange={set("description")}
            error={errors.description}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              id="category"
              label={t.submit.fields.category}
              required
              placeholder="— Select —"
              options={categoryOptions}
              value={form.category}
              onChange={set("category")}
              error={errors.category}
            />

            <Select
              id="location"
              label={t.submit.fields.location}
              required
              placeholder="— Select —"
              options={locationOptions}
              value={form.location}
              onChange={set("location")}
              error={errors.location}
            />
          </div>

          <Input
            id="price"
            label={t.submit.fields.price}
            type="number"
            min="0"
            placeholder={t.submit.fields.pricePlaceholder}
            value={form.price}
            onChange={set("price")}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-card p-6 space-y-5">
          <p className="text-xs font-bold uppercase tracking-widest text-ink-subtle border-b border-surface-border pb-3">
            👤 Contact Info
          </p>

          <Input
            id="contactName"
            label={t.submit.fields.contactName}
            required
            placeholder={t.submit.fields.contactNamePlaceholder}
            value={form.contactName}
            onChange={set("contactName")}
            error={errors.contactName}
          />

          <Input
            id="contactPhone"
            label={t.submit.fields.contactPhone}
            type="tel"
            required
            placeholder={t.submit.fields.contactPhonePlaceholder}
            value={form.contactPhone}
            onChange={set("contactPhone")}
            error={errors.contactPhone}
          />

          <Input
            id="contactEmail"
            label={t.submit.fields.contactEmail}
            type="email"
            placeholder={t.submit.fields.contactEmailPlaceholder}
            value={form.contactEmail}
            onChange={set("contactEmail")}
            error={errors.contactEmail}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          variant="primary"
          loading={status === "submitting"}
          className="w-full"
        >
          {status === "submitting" ? t.submit.submitting : t.submit.submit}
        </Button>
      </form>
    </div>
  );
}
