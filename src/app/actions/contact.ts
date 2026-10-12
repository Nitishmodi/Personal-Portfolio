"use server";

import { headers } from "next/headers";
import { links } from "@/lib/data";

export type ContactState = {
  status: "idle" | "sent" | "error";
  message: string;
};

const sent = "Submitted. I'll get an email with these details.";
const failed = "The form did not go through. Use the email on the right.";

function pageAddress(headerList: Headers) {
  const referer = headerList.get("referer");
  if (referer) return referer;
  const origin = headerList.get("origin");
  if (origin) return origin;
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  if (!host) return "http://localhost:3000/";
  const proto = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  return `${proto}://${host}/`;
}

function text(formData: FormData, key: string, max: number) {
  return String(formData.get(key) ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  if (text(formData, "company_website", 200)) {
    return { status: "sent", message: sent };
  }

  const name = text(formData, "name", 80);
  const company = text(formData, "company", 120);
  const role = text(formData, "role", 120);
  const email = text(formData, "email", 160);
  const note = String(formData.get("note") ?? "").trim().slice(0, 2000);

  if (!name || !company || !role || !email) {
    return { status: "error", message: "Add your name, company, the role, and a work email." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "The work email does not look complete." };
  }

  const headerList = await headers();
  const referer = pageAddress(headerList);

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(links.email)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Referer: referer,
      },
      body: JSON.stringify({
        name,
        email,
        company,
        role,
        note: note || "—",
        message: [
          `Name: ${name}`,
          `Company: ${company}`,
          `Role: ${role}`,
          `Work email: ${email}`,
          `Note: ${note || "—"}`,
        ].join("\n"),
        _subject: `Portfolio · ${role} · ${company}`,
        _template: "table",
        _captcha: "false",
        _replyto: email,
      }),
      cache: "no-store",
    });
    const payload = (await response.json()) as { success?: string };
    if (String(payload.success) !== "true") {
      return { status: "error", message: failed };
    }
  } catch {
    return { status: "error", message: failed };
  }

  return { status: "sent", message: sent };
}
