"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { links } from "@/lib/data";
import { Section } from "@/components/ui";

const channels = [
  { label: "LinkedIn", value: "nitish-modi-a11b17227", href: links.linkedin },
  { label: "GitHub", value: "github.com/Nitishmodi", href: links.github },
  { label: "LeetCode", value: "B21CS030", href: links.leetcode },
  { label: "CodeChef", value: "nitishmodi20", href: links.codechef },
];

const contactInitialState: ContactState = { status: "idle", message: "" };

const fieldClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-bone outline-none transition placeholder:text-muted focus:border-amber";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(submitContact, contactInitialState);

  useEffect(() => {
    if (state.status === "sent") formRef.current?.reset();
  }, [state]);

  return (
    <Section
      id="contact"
      kicker="Recruiters"
      title="Contact me."
      lede="If you are hiring, submit the form. I'll get an email with your name, company, the role, and how to reply."
    >
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <form
          ref={formRef}
          action={formAction}
          className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7"
        >
          <div>
            <h3 className="font-serif text-2xl text-bone">For recruiters</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Enter the details and submit. I receive them by email at {links.email}. You stay on
              this page.
            </p>
          </div>
          <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            Company website
            <input name="company_website" tabIndex={-1} autoComplete="off" />
          </label>

          <label className="grid gap-1.5">
            <span className="text-sm text-bone">Your name</span>
            <span className="text-xs text-muted">Who should I reply to?</span>
            <input className={fieldClass} name="name" required autoComplete="name" placeholder="Your name" />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="text-sm text-bone">Company name</span>
              <span className="text-xs text-muted">The company hiring.</span>
              <input
                className={fieldClass}
                name="company"
                required
                autoComplete="organization"
                placeholder="Company name"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-sm text-bone">Role</span>
              <span className="text-xs text-muted">The position you want to talk about.</span>
              <input className={fieldClass} name="role" required placeholder="Software Engineer" />
            </label>
          </div>

          <label className="grid gap-1.5">
            <span className="text-sm text-bone">Your work email</span>
            <span className="text-xs text-muted">So I can write back.</span>
            <input
              className={fieldClass}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
            />
          </label>

          <label className="grid gap-1.5">
            <span className="text-sm text-bone">Note</span>
            <span className="text-xs text-muted">Optional. Location, team, or a link to the job.</span>
            <textarea className={`${fieldClass} min-h-28 resize-y`} name="note" placeholder="A short note" />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-sand disabled:translate-y-0 disabled:opacity-60"
            >
              {pending ? "Submitting…" : "Submit"}
            </button>
            {state.message ? (
              <p className="text-sm text-muted" aria-live="polite">
                {state.message}
              </p>
            ) : null}
          </div>
        </form>

        <div className="grid content-start gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
            <h3 className="font-serif text-2xl text-bone">Or write directly</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Email, phone, and the resume, if you already have a note ready.
            </p>
            <ul className="mt-5 grid gap-3">
              <li>
                <a
                  href={`mailto:${links.email}`}
                  className="block rounded-2xl border border-white/10 px-4 py-3 transition hover:border-amber"
                >
                  <span className="block text-xs text-amber">Email</span>
                  <span className="mt-1 block break-all text-sm text-bone">{links.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={links.phoneHref}
                  className="block rounded-2xl border border-white/10 px-4 py-3 transition hover:border-amber"
                >
                  <span className="block text-xs text-amber">Phone</span>
                  <span className="mt-1 block text-sm text-bone">{links.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={links.resume}
                  className="block rounded-2xl border border-white/10 px-4 py-3 transition hover:border-amber"
                >
                  <span className="block text-xs text-amber">Resume</span>
                  <span className="mt-1 block text-sm text-bone">Open the PDF</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7">
            <h3 className="font-serif text-2xl text-bone">Profiles</h3>
            <ul className="mt-4 grid gap-2">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between rounded-2xl border border-white/10 px-4 py-3 transition hover:border-amber"
                  >
                    <span>
                      <span className="block text-xs text-amber">{channel.label}</span>
                      <span className="mt-1 block text-sm text-bone">{channel.value}</span>
                    </span>
                    <span className="text-muted transition group-hover:translate-x-1 group-hover:text-amber">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
