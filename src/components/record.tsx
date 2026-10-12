"use client";

import { useState } from "react";
import { contests, ratings } from "@/lib/data";
import { Count, cx, Section } from "@/components/ui";

const accent: Record<string, string> = {
  LeetCode: "#f5c451",
  CodeChef: "#d4a017",
  InfoEdge: "#7dd3fc",
  GeeksforGeeks: "#4ade80",
  AlgoUniversity: "#c4b5fd",
};

export function Record() {
  const [open, setOpen] = useState<string>(contests[0].id);

  return (
    <Section id="record" kicker="Record" title="Ratings and contest ranks.">
      <div className="grid gap-3 md:grid-cols-2">
        {ratings.map((rating) => (
          <a
            key={rating.label}
            href={rating.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1"
            style={{ boxShadow: `0 0 0 1px ${accent[rating.label]}22` }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl transition group-hover:opacity-70"
              style={{ background: accent[rating.label] }}
            />
            <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: accent[rating.label] }}>
              {rating.label}
            </p>
            <p className="mt-3 font-serif text-6xl tracking-tight">
              <Count value={rating.value} />
            </p>
            <p className="mt-2 text-sm text-muted">
              {rating.level} · {rating.hint}
            </p>
          </a>
        ))}
      </div>

      <ol className="mt-4 overflow-hidden rounded-3xl border border-white/10">
        {contests.map((contest) => {
          const expanded = open === contest.id;
          const color = accent[contest.host] ?? "#e4b15a";
          return (
            <li key={contest.id} className="border-b border-white/10 last:border-b-0">
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? "" : contest.id)}
                className="flex w-full items-center gap-4 px-4 py-4 text-left transition hover:bg-white/[0.04] md:px-6"
              >
                <span className="hidden w-32 shrink-0 text-[10px] uppercase tracking-[0.16em] sm:block" style={{ color }}>
                  {contest.host}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-bone">{contest.event}</span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] sm:hidden" style={{ color }}>
                    {contest.host}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-serif text-2xl" style={{ color }}>
                    {contest.result}
                  </span>
                  <span className="block text-xs text-muted">{contest.context}</span>
                </span>
              </button>
              <div
                className={cx(
                  "grid transition-[grid-template-rows] duration-300",
                  expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="px-4 pb-4 text-sm leading-relaxed text-muted md:px-6 md:pl-44">
                    {contest.detail}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
