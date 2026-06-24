"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Heart,
  LineChart,
  Loader2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import {
  isWaitlistEmailValid,
  isWaitlistNameValid,
  isWaitlistPhoneValid,
} from "../../../lib/waitlistValidation";
import { usePhoneFormatter } from "../../hooks/usePhoneFormatter";
import { createMetaEventId, trackMetaLead } from "../../../lib/metaPixel";

type Status = "idle" | "submitting" | "sent";

const benefits = [
  {
    icon: Sparkles,
    title: "A pastoral assistant for your ministry",
    body: "Extend your teaching, prayers, and care throughout the week.",
  },
  {
    icon: LineChart,
    title: "Stay connected to what matters",
    body: "Understand where your people are growing and where they need support.",
  },
  {
    icon: Heart,
    title: "Care for every soul entrusted to you",
    body: "Reach people with timely encouragement and prayer—when they need it most.",
  },
];

export default function ChurchPilotStartPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [contactName, setContactName] = useState("");
  const [churchName, setChurchName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = usePhoneFormatter("");
  const [role, setRole] = useState("Pastor / Clergy");
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
      eventId: createMetaEventId(),
      eventSourceUrl: window.location.href,
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
      trackMetaLead(crmPayload.eventId, crmPayload.source);
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-5 pb-20 pt-28 text-zoe-ink sm:px-8 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-6xl">
          <Link
            href="/churches"
            className="inline-flex items-center gap-2 text-sm font-bold text-zoe-forest transition-colors hover:text-zoe-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            For Churches
          </Link>

          <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-[0_28px_80px_rgba(45,50,49,0.12)] ring-1 ring-zoe-outline/30 sm:mt-10">
            {status === "sent" ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zoe-leaf text-white">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h2 className="mx-auto mt-8 max-w-xl text-4xl font-bold leading-tight tracking-tighter-editorial">
                  We have your church pilot request.
                </h2>
                <p className="mx-auto mt-5 max-w-lg text-base font-medium leading-8 text-zoe-muted">
                  The next step is a human one: we will review fit, talk through boundaries, and help your team decide whether a small pilot makes sense.
                </p>
                <Link
                  href="/churches"
                  className="mx-auto mt-8 inline-flex items-center justify-center rounded-full bg-zoe-surface px-7 py-4 text-sm font-bold text-zoe-ink ring-1 ring-zoe-outline/45"
                >
                  Back to churches
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
                <aside className="flex flex-col border-b border-zoe-outline/25 px-6 py-8 sm:px-8 sm:py-10 lg:border-b-0 lg:border-r lg:py-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zoe-forest">Church pilot</p>
                  <h1 className="mt-4 max-w-md text-[2.2rem] font-bold leading-[1.06] tracking-tighter-editorial text-zoe-ink sm:text-[2.45rem]">
                    Want to bring Zoe to your church?
                  </h1>
                  <div className="mt-5 h-[3px] w-14 rounded-full bg-zoe-leaf" />
                  <p className="mt-6 max-w-md text-base font-medium leading-8 text-zoe-muted">
                    Tell us about your church and your goals. We&apos;ll follow up to explore how Zoe can support your ministry and your people.
                  </p>

                  <div className="mt-8 space-y-6">
                    {benefits.map(({ icon: Icon, title, body }) => (
                      <div key={title} className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zoe-surface ring-1 ring-zoe-outline/30">
                          <Icon className="h-5 w-5 text-zoe-forest" strokeWidth={2.2} />
                        </div>
                        <div>
                          <p className="text-sm font-bold leading-6 text-zoe-ink">{title}</p>
                          <p className="mt-1 text-sm font-medium leading-6 text-zoe-muted">{body}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="mt-auto pt-10 text-xs font-medium leading-6 text-zoe-muted">
                    This request goes to the Zoe team. It does not create a public church workspace, invite members, or share member data.
                  </p>
                </aside>

                <section className="px-6 py-8 sm:px-8 sm:py-10">
                  <form onSubmit={handleSubmit} className="grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Your name">
                        <input
                          value={contactName}
                          onChange={(event) => setContactName(event.target.value)}
                          autoComplete="name"
                          className={inputClass}
                          placeholder="Tony Allen"
                        />
                      </Field>
                      <Field label="Church name">
                        <input
                          value={churchName}
                          onChange={(event) => setChurchName(event.target.value)}
                          className={inputClass}
                          placeholder="Reality Church"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Email">
                        <input
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          autoComplete="email"
                          className={inputClass}
                          placeholder="pastor@church.org"
                        />
                      </Field>
                      <Field label="Phone">
                        <input
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          autoComplete="tel"
                          className={inputClass}
                          placeholder="(555) 123-4567"
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-3">
                      <Field label="Your role">
                        <select value={role} onChange={(event) => setRole(event.target.value)} className={inputClass}>
                          <option>Pastor / Clergy</option>
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
                        <select
                          value={readiness}
                          onChange={(event) => setReadiness(event.target.value)}
                          className={inputClass}
                        >
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
                        className={`${inputClass} min-h-32 resize-none leading-7`}
                        placeholder="A few sentences about your church, what you are trying to solve, or the guardrails you would want in place."
                      />
                    </Field>

                    {error ? (
                      <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</p>
                    ) : null}

                    <button
                      disabled={status === "submitting" || !valid}
                      className="inline-flex h-[58px] w-full items-center justify-center gap-2 rounded-full bg-zoe-leaf px-7 text-sm font-bold text-white transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      Request church pilot
                      {status !== "submitting" ? <ArrowRight className="h-4 w-4" /> : null}
                    </button>

                    <p className="flex items-center justify-center gap-2 text-sm font-medium text-zoe-muted">
                      <MessageCircle className="h-4 w-4 shrink-0 text-zoe-forest" />
                      Questions? Email us anytime at{" "}
                      <a href="mailto:hello@zoe.live" className="font-bold text-zoe-forest hover:text-zoe-ink">
                        hello@zoe.live
                      </a>
                    </p>
                  </form>
                </section>
              </div>
            )}
          </div>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2.5">
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zoe-forest">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-[1.35rem] border border-zoe-outline/45 bg-zoe-surface px-5 py-4 text-base font-semibold text-zoe-ink outline-none transition placeholder:text-zoe-muted/55 focus:border-zoe-leaf focus:bg-white focus:ring-4 focus:ring-zoe-leaf/10";