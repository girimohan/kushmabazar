"use client";
// src/app/contact/page.tsx

import React, { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { Input, Textarea } from "@/components/ui/FormFields";
import { Button } from "@/components/ui/Button";
import type { ContactFormData } from "@/types/listing";

const emptyForm: ContactFormData = { name: "", email: "", message: "" };

export default function ContactPage() {
  const { t } = useLang();
  const [form, setForm] = useState<ContactFormData>(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set =
    (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
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

  return (
    <div>
      {/* Header */}
      <section className="bg-brand-blue text-white py-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <h1 className="font-display font-bold text-4xl mb-3">
            {t.contact.pageTitle}
          </h1>
          <p className="text-blue-200 text-lg">{t.contact.subtitle}</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="md:col-span-2 space-y-6">
            {[
              { icon: "📍", label: t.contact.address },
              {
                icon: "✉️",
                label: t.contact.email,
                href: `mailto:${t.contact.email}`,
              },
              {
                icon: "📞",
                label: t.contact.phone,
                href: `tel:${t.contact.phone}`,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-brand-blue hover:underline"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <p className="text-sm text-ink-muted">{item.label}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 bg-white rounded-2xl shadow-card p-6 space-y-4"
          >
            {status === "success" && (
              <div className="p-4 rounded-xl bg-brand-green/10 text-brand-green font-medium text-sm">
                {t.contact.success}
              </div>
            )}
            {status === "error" && (
              <div className="p-4 rounded-xl bg-brand-red/10 text-brand-red font-medium text-sm">
                {t.contact.error}
              </div>
            )}

            <Input
              id="c-name"
              label={t.contact.fields.name}
              required
              value={form.name}
              onChange={set("name")}
            />
            <Input
              id="c-email"
              label={t.contact.fields.email}
              type="email"
              required
              value={form.email}
              onChange={set("email")}
            />
            <Textarea
              id="c-message"
              label={t.contact.fields.message}
              required
              rows={5}
              placeholder={t.contact.fields.messagePlaceholder}
              value={form.message}
              onChange={set("message")}
            />
            <Button
              type="submit"
              size="lg"
              variant="primary"
              loading={status === "submitting"}
              className="w-full"
            >
              {status === "submitting"
                ? t.contact.submitting
                : t.contact.submit}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
