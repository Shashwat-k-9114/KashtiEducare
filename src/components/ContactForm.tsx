"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { easeOutExpo } from "@/components/motion";
import { contactIntents, type ContactIntent } from "@/data/contact";
import { trackEvent } from "@/lib/analytics";

type FormState = {
  intent: ContactIntent | "";
  name: string;
  organisation: string;
  email: string;
  phone: string;
  programme: string;
  message: string;
  // Honeypot: real visitors never see or fill this field (hidden via CSS,
  // not `type="hidden"`, since some bots skip truly hidden inputs but
  // still fill anything present in the DOM). Any value here means a bot.
  website: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(state: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!state.intent) errors.intent = "Please select who you're reaching out as.";
  if (state.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!emailPattern.test(state.email.trim())) errors.email = "Enter a valid email address.";
  if (state.message.trim().length < 10) errors.message = "Tell us a little more — at least 10 characters.";
  return errors;
}

const inputClasses =
  "w-full rounded-lg border bg-kashti-bg-light px-4 py-2.5 text-sm text-kashti-charcoal placeholder:text-kashti-charcoal/35 transition-colors focus:outline-none focus:ring-2 focus:ring-kashti-green/25";

function fieldBorder(hasError: boolean) {
  return hasError ? "border-kashti-coral focus:border-kashti-coral" : "border-kashti-border-light focus:border-kashti-green";
}

export function ContactForm({ defaultProgramme = "", defaultIntent = "" }: { defaultProgramme?: string; defaultIntent?: string }) {
  const reduce = useReducedMotion();
  const [state, setState] = useState<FormState>({
    intent: (contactIntents.some((i) => i.value === defaultIntent) ? (defaultIntent as ContactIntent) : ""),
    name: "",
    organisation: "",
    email: "",
    phone: "",
    programme: defaultProgramme,
    message: defaultProgramme ? `Hi Kashti team, I'd like to know more about ${defaultProgramme}.` : "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
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

    const nextErrors = validate(state);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_FORM_ENDPOINT;
    if (!endpoint) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        // text/plain avoids a CORS preflight OPTIONS request against the
        // Apps Script Web App, which doesn't handle preflight the way a
        // normal API does. The script still JSON.parse()s the body.
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          intent: state.intent,
          name: state.name.trim(),
          email: state.email.trim(),
          phone: state.phone.trim(),
          institution: state.organisation.trim(),
          programmeName: state.programme.trim(),
          message: state.message.trim(),
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || result?.status !== "ok") throw new Error(result?.message ?? "Submission failed");

      setStatus("success");
      trackEvent("contact_form_submit", {
        intent: state.intent,
        programme: state.programme || "(none)",
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.01 : 0.4, ease: easeOutExpo }}
        className="flex flex-col items-center rounded-xl border bg-kashti-bg-light p-10 text-center"
        style={{ borderColor: "var(--kashti-border-light)" }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(26, 168, 118, 0.14)" }}>
          <CheckCircle2 size={28} strokeWidth={1.75} className="text-kashti-green-deep" />
        </div>
        <h3 className="font-display mt-5 text-xl font-semibold text-kashti-charcoal">Message sent</h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-kashti-charcoal/65">
          Thanks for reaching out — our team will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setState({ intent: "", name: "", organisation: "", email: "", phone: "", programme: "", message: "", website: "" });
            setStatus("idle");
          }}
          className="font-mono-label mt-6 text-xs font-semibold tracking-wide text-kashti-green-deep uppercase"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div>
        <label htmlFor="intent" className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
          I&apos;m reaching out as
        </label>
        <select
          id="intent"
          value={state.intent}
          onChange={(e) => setField("intent", e.target.value as ContactIntent)}
          className={`${inputClasses} mt-1.5 ${fieldBorder(!!errors.intent)}`}
        >
          <option value="" disabled>
            Select one
          </option>
          {contactIntents.map((intent) => (
            <option key={intent.value} value={intent.value}>
              {intent.label}
            </option>
          ))}
        </select>
        {errors.intent ? <FieldError message={errors.intent} /> : null}
      </div>

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
          <label htmlFor="organisation" className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
            Institution / Organisation
          </label>
          <input
            id="organisation"
            type="text"
            value={state.organisation}
            onChange={(e) => setField("organisation", e.target.value)}
            className={`${inputClasses} mt-1.5 ${fieldBorder(false)}`}
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
        <div>
          <label htmlFor="phone" className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={state.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className={`${inputClasses} mt-1.5 ${fieldBorder(false)}`}
            placeholder="Optional"
          />
        </div>
      </div>

      <div>
        <label htmlFor="programme" className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
          Programme of interest
        </label>
        <input
          id="programme"
          type="text"
          value={state.programme}
          onChange={(e) => setField("programme", e.target.value)}
          className={`${inputClasses} mt-1.5 ${fieldBorder(false)}`}
          placeholder="Optional — e.g. STEM Tours, Global Immersion"
        />
      </div>

      <div>
        <label htmlFor="message" className="font-mono-label text-[11px] tracking-widest text-kashti-charcoal/55 uppercase">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={state.message}
          onChange={(e) => setField("message", e.target.value)}
          className={`${inputClasses} mt-1.5 resize-none ${fieldBorder(!!errors.message)}`}
          placeholder="Tell us about your institution, group size, and what you're looking for."
        />
        {errors.message ? <FieldError message={errors.message} /> : null}
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

      {status === "error" ? (
        <div className="flex items-center gap-2 rounded-lg border border-kashti-coral/40 bg-kashti-coral/10 px-4 py-3 text-sm text-kashti-coral-deep">
          <AlertCircle size={16} strokeWidth={2} />
          Something went wrong sending your message. Please try again.
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
            Sending…
          </>
        ) : (
          <>
            Send Message
            <ArrowRight size={16} strokeWidth={2.25} className="transition-transform duration-200 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
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
