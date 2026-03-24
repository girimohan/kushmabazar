"use client";
// src/components/ui/FormFields.tsx

import React from "react";

// ── Shared label ────────────────────────────────────────────────

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

export function Label({ required, children, className = "", ...rest }: LabelProps) {
  return (
    <label
      className={`block text-sm font-semibold text-ink mb-1.5 ${className}`}
      {...rest}
    >
      {children}
      {required && <span className="text-brand-red ml-1">*</span>}
    </label>
  );
}

// ── Shared input styles ─────────────────────────────────────────

const inputBase =
  "w-full rounded-xl border border-surface-border bg-white px-4 py-2.5 text-sm text-ink " +
  "placeholder:text-ink-subtle " +
  "focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue " +
  "transition-colors duration-150 " +
  "disabled:bg-surface-subtle disabled:cursor-not-allowed";

// ── Input ───────────────────────────────────────────────────────

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  error?: string;
}

export function Input({
  label,
  required,
  error,
  id,
  className = "",
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <input
        id={id}
        className={`${inputBase} ${error ? "border-brand-red focus:ring-brand-red/30" : ""} ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-brand-red mt-1">{error}</p>}
    </div>
  );
}

// ── Select ──────────────────────────────────────────────────────

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  required?: boolean;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  label,
  required,
  error,
  id,
  options,
  placeholder,
  className = "",
  ...rest
}: SelectProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <select
        id={id}
        className={`${inputBase} appearance-none cursor-pointer ${
          error ? "border-brand-red focus:ring-brand-red/30" : ""
        } ${className}`}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-brand-red mt-1">{error}</p>}
    </div>
  );
}

// ── Textarea ────────────────────────────────────────────────────

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
}

export function Textarea({
  label,
  required,
  error,
  id,
  className = "",
  rows = 4,
  ...rest
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`${inputBase} resize-y ${
          error ? "border-brand-red focus:ring-brand-red/30" : ""
        } ${className}`}
        {...rest}
      />
      {error && <p className="text-xs text-brand-red mt-1">{error}</p>}
    </div>
  );
}
