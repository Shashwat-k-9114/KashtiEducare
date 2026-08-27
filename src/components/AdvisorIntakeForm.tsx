"use client";

import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Upload } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";

import { compressImageToBase64 } from "@/lib/imageCompression";

type FormState = {
  name: string;
  email: string;
  phone: string;
  institution: string;
  designation: string;
  bio: string;
  // Honeypot: real visitors never see or fill this field (hidden via CSS,
  // not `type="hidden"`, since some bots skip truly hidden inputs but
  // still fill anything present in the DOM). Any value here means a bot.
  website: string;
};

type FormErrors = Partial<Record<keyof FormState | "institutionLogo" | "personalPhoto" | "consent", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB cap on the original file, before compression

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  institution: "",
  designation: "",
  bio: "",
  website: "",
};

const inputClasses =
  "w-full rounded-lg border bg-kashti-bg-light px-4 py-2.5 text-sm text-kashti-charcoal placeholder:text-kashti-charcoal/35 transition-colors focus:outline-none focus:ring-2 focus:ring-kashti-green/25";

function fieldBorder(hasError: boolean) {
  return hasError ? "border-kashti-coral focus:border-kashti-coral" : "border-kashti-border-light focus:border-kashti-green";
}

export function AdvisorIntakeForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [institutionLogo, setInstitutionLogo] = useState<File | null>(null);
  const [personalPhoto, setPersonalPhoto] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleFile = (key: "institutionLogo" | "personalPhoto", setter: (file: File | null) => void) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file && file.size > MAX_IMAGE_BYTES) {
      setErrors((prev) => ({ ...prev, [key]: "Image is too large (max 5MB)." }));
      setter(null);
      return;
    }
    setter(file);
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (state.name.trim().length < 2) next.name = "Enter your full name.";
    if (!emailPattern.test(state.email.trim())) next.email = "Enter a valid email address.";
    if (state.phone.trim().length < 7) next.phone = "Enter a valid phone number.";
    if (state.institution.trim().length < 2) next.institution = "Enter your institution's name.";
    if (state.designation.trim().length < 2) next.designation = "Enter your role or designation.";
    if (state.bio.trim().length < 20) next.bio = "Tell us a little more — at least 20 characters.";
    if (!institutionLogo) next.institutionLogo = "Upload your institution's logo.";
    if (!personalPhoto) next.personalPhoto = "Upload a personal photo.";
    if (!consent) next.consent = "Please confirm to continue.";
    return next;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Honeypot: a bot that fills every field (including the hidden one)
    // gets silently "succeeded" rather than told why, so it doesn't learn
    // to leave the field blank next time.
    if (state.website.trim().length > 0) {
      setStatus("success");
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const endpoint = process.env.NEXT_PUBLIC_ADVISOR_FORM_ENDPOINT;
    if (!endpoint) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const [logoBase64, photoBase64] = await Promise.all([
        compressImageToBase64(institutionLogo as File),
        compressImageToBase64(personalPhoto as File),
      ]);

      const response = await fetch(endpoint, {
        method: "POST",
        // text/plain avoids a CORS preflight OPTIONS request against the
        // Apps Script Web App, which doesn't handle preflight the way a
        // normal API does. The script still JSON.parse()s the body.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: state.name.trim(),
          email: state.email.trim(),
          phone: state.phone.trim(),
          institution: state.institution.trim(),
          designation: state.designation.trim(),
          bio: state.bio.trim(),
          institutionLogo: logoBase64,
          personalPhoto: photoBase64,
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || result?.status !== "ok") throw new Error(result?.message ?? "Submission failed");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center rounded-xl border bg-kashti-bg-light p-10 text-center"
        style={{ borderColor: "var(--kashti-border-light)" }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(26, 168, 118, 0.14)" }}>
          <CheckCircle2 size={28} strokeWidth={1.75} className="text-kashti-green-deep" />
        </div>
        <h3 className="font-display mt-5 text-xl font-semibold text-kashti-charcoal">Application received</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-kashti-charcoal/65">
          Thanks for your interest in advising Kashti Educare — we&apos;ll review your application and be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
            Full name
          </label>
          <input
            id="name"
            type="text"
            value={state.name}
            onChange={(e) => setField("name", e.target.value)}
            className={`${inputClasses} mt-1.5 ${fieldBorder(!!errors.name)}`}
            placeholder="Your name"
          />
          {errors.name ? <FieldError message={errors.name} /> : null}
        </div>
        <div>
          <label htmlFor="email" className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={state.email}
            onChange={(e) => setField("email", e.target.value)}
            className={`${inputClasses} mt-1.5 ${fieldBorder(!!errors.email)}`}
            placeholder="you@institution.edu"
          />
          {errors.email ? <FieldError message={errors.email} /> : null}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={state.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className={`${inputClasses} mt-1.5 ${fieldBorder(!!errors.phone)}`}
            placeholder="+91 XXXXX XXXXX"
          />
          {errors.phone ? <FieldError message={errors.phone} /> : null}
        </div>
        <div>
          <label htmlFor="institution" className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
            Institution
          </label>
          <input
            id="institution"
            type="text"
            value={state.institution}
            onChange={(e) => setField("institution", e.target.value)}
            className={`${inputClasses} mt-1.5 ${fieldBorder(!!errors.institution)}`}
            placeholder="Institution name"
          />
          {errors.institution ? <FieldError message={errors.institution} /> : null}
        </div>
      </div>

      <div>
        <label htmlFor="designation" className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
          Role / Designation
        </label>
        <input
          id="designation"
          type="text"
          value={state.designation}
          onChange={(e) => setField("designation", e.target.value)}
          className={`${inputClasses} mt-1.5 ${fieldBorder(!!errors.designation)}`}
          placeholder="e.g. Principal, Dean, Director"
        />
        {errors.designation ? <FieldError message={errors.designation} /> : null}
      </div>

      <div>
        <label htmlFor="bio" className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
          Short bio / message
        </label>
        <textarea
          id="bio"
          rows={5}
          value={state.bio}
          onChange={(e) => setField("bio", e.target.value)}
          className={`${inputClasses} mt-1.5 resize-none ${fieldBorder(!!errors.bio)}`}
          placeholder="Tell us about your background and why you'd like to advise Kashti."
        />
        {errors.bio ? <FieldError message={errors.bio} /> : null}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FileField
          id="institutionLogo"
          label="Institution logo"
          file={institutionLogo}
          onChange={handleFile("institutionLogo", setInstitutionLogo)}
          error={errors.institutionLogo}
        />
        <FileField
          id="personalPhoto"
          label="Personal photo"
          file={personalPhoto}
          onChange={handleFile("personalPhoto", setPersonalPhoto)}
          error={errors.personalPhoto}
        />
      </div>

      {/* Honeypot — hidden from sighted users and excluded from tab order, but present in the DOM for bots that fill every field blindly. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={state.website}
          onChange={(e) => setField("website", e.target.value)}
        />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-kashti-charcoal/70">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (errors.consent) setErrors((prev) => ({ ...prev, consent: undefined }));
          }}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-kashti-border-light text-kashti-green focus:ring-kashti-green/25"
        />
        <span>
          By submitting, you agree to let Kashti Educare store this information, including your photo, for advisor
          consideration.
        </span>
      </label>
      {errors.consent ? <FieldError message={errors.consent} /> : null}

      {status === "error" ? (
        <div className="flex items-center gap-2 rounded-lg border border-kashti-coral/40 bg-kashti-coral/10 px-4 py-3 text-sm text-kashti-coral-deep">
          <AlertCircle size={16} strokeWidth={2} />
          Something went wrong sending your application. Please try again.
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-kashti-green px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-kashti-green-soft disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            Submit Application
            <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}

function FileField({
  id,
  label,
  file,
  onChange,
  error,
}: {
  id: string;
  label: string;
  file: File | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
        {label}
      </label>
      <label
        htmlFor={id}
        className={`mt-1.5 flex cursor-pointer items-center gap-2.5 rounded-lg border px-4 py-2.5 text-sm transition-colors ${fieldBorder(!!error)} ${file ? "text-kashti-charcoal" : "text-kashti-charcoal/40"}`}
      >
        <Upload size={15} strokeWidth={1.75} className="shrink-0 text-kashti-green-soft" />
        {file ? file.name : "Choose an image"}
        <input id={id} type="file" accept="image/*" onChange={onChange} className="sr-only" />
      </label>
      {error ? <FieldError message={error} /> : null}
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-kashti-coral-deep">
      <AlertCircle size={12} strokeWidth={2.25} />
      {message}
    </p>
  );
}
