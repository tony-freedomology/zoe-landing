"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Lock } from "lucide-react";
import {
  isWaitlistEmailValid,
  isWaitlistNameValid,
  isWaitlistPhoneValid,
} from "../../../lib/waitlistValidation";
import { usePhoneFormatter } from "../../hooks/usePhoneFormatter";

const dashboardUrl = process.env.NEXT_PUBLIC_CHURCH_DASHBOARD_URL ?? "https://church.zoe.live";

type Status = "idle" | "submitting" | "sent";

export default function ChurchPilotStartPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [contactName, setContactName] = useState("");
  const [churchName, setChurchName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = usePhoneFormatter("");
  const [role, setRole] = useState("Pastor / clergy");
  const [size, setSize] = useState("100-500");
  const [readiness, setReadiness] = useState("ready-to-pilot");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const valid =
    isWaitlistNameValid(contactName) &&
    churchName.trim().length >= 2 &&
    isWaitlistEmailValid(email) &&
    isWaitlistPhoneValid(phone);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid) {
      setError("Add your name, church name, email, and a valid phone number.");
      return;
    }

    setStatus("submitting");
    setError(null);

    const fullPayload = {
      contactName: contactName.trim(),
      churchName: churchName.trim(),
      email: email.trim().toLowerCase(),
      phone,
      role,
      size,
      readiness,
      notes: notes.trim(),
      source: "churches-pilot-request",
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("zoe_church_pilot_request", JSON.stringify(fullPayload));
    } catch {}

    const crmPayload = {
      name: `${fullPayload.contactName} — ${fullPayload.churchName}`,
      phone: fullPayload.phone,
      email: fullPayload.email,
      source: `churches-pilot:${readiness}:${size}:${role}`,
    };

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crmPayload),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) {
        throw new Error(data?.details || data?.error || "Unable to save pilot request.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-zoe-oat px-5 pb-16 pt-28 text-zoe-ink sm:px-8 lg:pt-36">
      <div className="mx-auto max-w-6xl">
        <Link href="/churches" className="inline-flex items-center gap-2 text-sm font-bold text-zoe-forest">
          <ArrowLeft className="h-4 w-4" />
          For churches
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <aside className="rounded-[2rem] bg-zoe-surface p-7 shadow-zoe-card ring-1 ring-zoe-outline/45 lg:sticky lg:top-28">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zoe-forest">Church pilot</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tighter-editorial sm:text-5xl">
              Tell us enough to set up the right first conversation.
            </h1>
            <p className="mt-5 text-base font-medium leading-8 text-zoe-muted">
              This short request helps us understand your church, your questions, and whether a careful pilot is the right next step. We will talk with your team before any member-facing launch.
            </p>
            <div className="mt-8 space-y-3">
              {["No member data requested here", "Dashboard access comes after approval", "Returning admins use church.zoe.live/login"].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-white px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-zoe-leaf" />
                  <span className="text-sm font-bold text-zoe-ink">{item}</span>
                </div>
              ))}
            </div>
            <a href={`${dashboardUrl}/login`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-zoe-forest">
              Already approved? Log in
              <ArrowRight className="h-4 w-4" />
            </a>
          </aside>

          <section className="rounded-[2rem] bg-white p-5 shadow-zoe-card ring-1 ring-zoe-outline/45 sm:p-8">
            {status === "sent" ? (
              <div className="flex min-h-[520px] flex-col justify-center rounded-[1.5rem] bg-zoe-surface p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zoe-leaf text-white">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="mx-auto mt-8 max-w-xl text-4xl font-bold leading-tight tracking-tighter-editorial">
                  We have your church pilot request.
                </h2>
                <p className="mx-auto mt-5 max-w-lg text-base font-medium leading-8 text-zoe-muted">
                  The next step is a human one: we will review fit, talk through boundaries, and help your team decide whether a small pilot makes sense.
                </p>
                <Link href="/churches" className="mx-auto mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-zoe-ink ring-1 ring-zoe-outline/45">
                  Back to churches
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Your name">
                    <input value={contactName} onChange={(event) => setContactName(event.target.value)} autoComplete="name" className={inputClass} placeholder="Tony Allen" />
                  </Field>
                  <Field label="Church name">
                    <input value={churchName} onChange={(event) => setChurchName(event.target.value)} className={inputClass} placeholder="Reality Church" />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email">
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" className={inputClass} placeholder="pastor@church.org" />
                  </Field>
                  <Field label="Phone">
                    <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" className={inputClass} placeholder="(555) 123-4567" />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Field label="Your role">
                    <select value={role} onChange={(event) => setRole(event.target.value)} className={inputClass}>
                      <option>Pastor / clergy</option>
                      <option>Church staff</option>
                      <option>Discipleship leader</option>
                      <option>Operations / admin</option>
                      <option>Other</option>
                    </select>
                  </Field>
                  <Field label="Church size">
                    <select value={size} onChange={(event) => setSize(event.target.value)} className={inputClass}>
                      <option>Under 100</option>
                      <option>100-500</option>
                      <option>500-1,500</option>
                      <option>1,500+</option>
                    </select>
                  </Field>
                  <Field label="Readiness">
                    <select value={readiness} onChange={(event) => setReadiness(event.target.value)} className={inputClass}>
                      <option value="ready-to-pilot">Ready to pilot</option>
                      <option value="want-walkthrough">Want a walkthrough</option>
                      <option value="exploring">Exploring</option>
                    </select>
                  </Field>
                </div>

                <Field label="What would make a pilot worthwhile?">
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    className={`${inputClass} min-h-36 resize-none leading-7`}
                    placeholder="A few sentences about your church, what you are trying to solve, or the guardrails you would want in place."
                  />
                </Field>

                {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p> : null}

                <button
                  disabled={status === "submitting" || !valid}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-zoe-leaf px-7 py-4 text-sm font-bold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Request church pilot
                  {status !== "submitting" ? <ArrowRight className="h-4 w-4" /> : null}
                </button>

                <p className="flex items-start gap-2 text-xs font-medium leading-6 text-zoe-muted">
                  <Lock className="mt-0.5 h-4 w-4 shrink-0 text-zoe-forest" />
                  This request goes to the Zoe team. It does not create a public church workspace, invite members, or share member data.
                </p>
              </form>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-zoe-forest">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-3xl border border-zoe-outline/55 bg-zoe-surface px-5 py-4 text-base font-semibold text-zoe-ink outline-none transition placeholder:text-zoe-muted/55 focus:border-zoe-leaf focus:bg-white focus:ring-4 focus:ring-zoe-leaf/10";
