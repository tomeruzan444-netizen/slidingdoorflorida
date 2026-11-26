import { NextResponse } from "next/server";
import { business } from "@/content/business";

export const runtime = "nodejs";

const FL_ZIP = /^3[2-4]\d{3}$/;
const MAX_PHOTO = 4 * 1024 * 1024; // Vercel functions accept ~4.5 MB request bodies
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

// Best-effort rate limit per IP (per function instance). Swap for Upstash/KV if spam becomes a problem.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ message: `Too many requests. Please call us at ${business.phone}.` }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ message: "We couldn't read that form. Please try again." }, { status: 400 });
  }

  // Honeypot filled: pretend success, send nothing.
  if (String(form.get("company_website") || "")) return NextResponse.json({ message: "Thanks." });

  const name = String(form.get("name") || "").trim().slice(0, 120);
  const phone = String(form.get("phone") || "").trim().slice(0, 40);
  const zip = String(form.get("zip") || "").trim();
  const problem = String(form.get("problem") || "").trim().slice(0, 120);
  const message = String(form.get("message") || "").trim().slice(0, 2000);
  const photo = form.get("photo");

  if (!name || phone.replace(/\D/g, "").length < 10 || !FL_ZIP.test(zip) || !problem) {
    return NextResponse.json({ message: "Please fill in your name, a 10-digit phone number, a Florida ZIP code and the problem type." }, { status: 400 });
  }

  const attachments: { filename: string; content: string }[] = [];
  if (photo instanceof File && photo.size > 0) {
    if (photo.size > MAX_PHOTO || !photo.type.startsWith("image/")) {
      return NextResponse.json({ message: "The photo must be an image under 4 MB." }, { status: 400 });
    }
    attachments.push({ filename: photo.name || "door-photo.jpg", content: Buffer.from(await photo.arrayBuffer()).toString("base64") });
  }

  const { RESEND_API_KEY, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !QUOTE_TO_EMAIL || !QUOTE_FROM_EMAIL) {
    // Email provider not configured yet ({{EMAIL_PROVIDER}}). Don't pretend the lead was delivered.
    console.error("[quote] email delivery not configured; lead not sent", { zip, problem });
    return NextResponse.json({ message: `Our online form isn't connected yet. Please call us at ${business.phone}.` }, { status: 503 });
  }

  const html = `<h2>New quote request</h2>
<p><b>Name:</b> ${esc(name)}<br><b>Phone:</b> ${esc(phone)}<br><b>ZIP:</b> ${esc(zip)}<br><b>Problem:</b> ${esc(problem)}</p>
<p>${esc(message).replace(/\n/g, "<br>")}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: QUOTE_FROM_EMAIL, to: QUOTE_TO_EMAIL, subject: `Quote request: ${problem} (${zip})`, html, attachments }),
  });
  if (!res.ok) {
    console.error("[quote] email send failed", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ message: `We couldn't send that. Please call us at ${business.phone}.` }, { status: 502 });
  }
  return NextResponse.json({ message: "We'll call you back at the number you gave us." });
}
