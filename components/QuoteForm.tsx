"use client";

import { useState } from "react";

const PROBLEMS = [
  "Door is hard to slide or drags",
  "Door came off the track",
  "Lock or handle problem",
  "Leak or draft at the door",
  "Fogged or cracked glass",
  "Screen door repair",
  "Closet door repair",
  "Thinking about a new door",
  "Something else",
];

type Status = { kind: "idle" | "sending" | "ok" | "error"; message?: string };

/** Florida ZIP codes fall in the 32000-34999 range. */
const FL_ZIP = /^3[2-4]\d{3}$/;

export function QuoteForm({ wide = false }: { wide?: boolean } = {}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const zip = String(data.get("zip") || "").trim();
    if (!FL_ZIP.test(zip)) {
      setStatus({ kind: "error", message: "Please enter a Florida ZIP code (it starts with 32, 33 or 34)." });
      (form.elements.namedItem("zip") as HTMLInputElement)?.focus();
      return;
    }
    const photo = data.get("photo");
    if (photo instanceof File && photo.size > 4 * 1024 * 1024) {
      setStatus({ kind: "error", message: "That photo is over 4 MB. Please send a smaller one, or text it to us after you submit." });
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/quote", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) throw new Error(json.message || "Something went wrong.");
      form.reset();
      setStatus({ kind: "ok", message: json.message });
    } catch (err) {
      setStatus({ kind: "error", message: (err as Error).message });
    }
  }

  if (status.kind === "ok") {
    return (
      <div role="status" className="panel p-6">
        <p className="config-label">RECEIVED</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold">Thanks, we have your request.</p>
        <p className="mt-2">{status.message || "We'll call you back at the number you gave us."}</p>
      </div>
    );
  }

  const field = "mt-1 block w-full rounded border border-alu bg-white px-3 py-2.5 text-frame focus:border-teal";
  return (
    <form onSubmit={onSubmit} noValidate={false} className="space-y-4" aria-describedby="form-note">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block font-medium">
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block font-medium">
          Phone
          <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9()+\-.\s]{10,}" className={field} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block font-medium">
          ZIP code
          <input name="zip" required inputMode="numeric" autoComplete="postal-code" maxLength={5} pattern="3[2-4][0-9]{3}" className={field} />
        </label>
        <label className="block font-medium">
          What&apos;s going on?
          <select name="problem" required defaultValue="" className={field}>
            <option value="" disabled>Choose one</option>
            {PROBLEMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block font-medium">
        Details
        <textarea name="message" rows={4} maxLength={2000} className={field} placeholder="What the door does, roughly how old it is, anything you've tried" />
      </label>
      <label className="block font-medium">
        Photo of the door (optional, up to 4 MB)
        <input name="photo" type="file" accept="image/*" className="mt-1 block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-sea file:px-3 file:py-2 file:font-semibold file:text-teal" />
      </label>
      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p id="form-note" className="text-sm text-frame-soft">
        We use your details only to reply to this request. See our <a href="/privacy-policy" className="underline">privacy policy</a>.
      </p>
      {status.kind === "error" && (
        <p role="alert" className="rounded border border-bronze bg-white px-3 py-2 text-bronze-dark">{status.message}</p>
      )}
      <button
        type="submit"
        disabled={status.kind === "sending"}
        className={`rounded-md bg-bronze px-6 py-3.5 text-lg font-bold text-white shadow-sm transition hover:bg-bronze-dark disabled:opacity-60 ${wide ? "w-full" : ""}`}
      >
        {status.kind === "sending" ? "Sending..." : "Send request"}
      </button>
    </form>
  );
}
