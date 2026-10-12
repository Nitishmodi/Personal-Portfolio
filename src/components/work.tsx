"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type KeyboardEvent } from "react";
import { experience, links, type Role } from "@/lib/data";
import { cx, Section } from "@/components/ui";

const tone: Record<string, string> = {
  cimpress: "#e4b15a",
  siemens: "#7dd3fc",
  ias: "#4ade80",
  club: "#c4b5fd",
};

export function Work() {
  const [current, setCurrent] = useState(experience[0].id);
  const reduced = useReducedMotion();
  const role = experience.find((item) => item.id === current) ?? experience[0];

  function onKey(event: KeyboardEvent, index: number) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "ArrowDown"
        ? (index + 1) % experience.length
        : event.key === "ArrowUp"
          ? (index - 1 + experience.length) % experience.length
          : event.key === "Home"
            ? 0
            : experience.length - 1;
    setCurrent(experience[next].id);
    document.getElementById(`role-${experience[next].id}`)?.focus();
  }

  return (
    <Section id="work" kicker="Work" title="Pick a chapter. The points are all here.">
      <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
        <div role="tablist" aria-label="Roles" className="relative flex flex-col gap-2">
          <span aria-hidden className="absolute bottom-4 left-[1.15rem] top-4 w-px bg-white/10" />
          {experience.map((item, index) => {
            const selected = item.id === role.id;
            const color = tone[item.id];
            return (
              <button
                key={item.id}
                id={`role-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setCurrent(item.id)}
                onKeyDown={(event) => onKey(event, index)}
                className={cx(
                  "relative rounded-2xl border px-4 py-4 pl-10 text-left transition",
                  selected
                    ? "border-white/20 bg-white/[0.05]"
                    : "border-transparent hover:bg-white/[0.03]",
                )}
              >
                <span
                  aria-hidden
                  className="absolute left-[0.85rem] top-6 h-2.5 w-2.5 rounded-full"
                  style={{
                    background: color,
                    boxShadow: selected ? `0 0 16px ${color}` : undefined,
                  }}
                />
                <span className="block text-[10px] uppercase tracking-[0.16em]" style={{ color }}>
                  {item.span}
                </span>
                <span className="mt-1 block font-serif text-xl text-bone">{item.org}</span>
                <span className="mt-1 block text-sm text-muted">{item.title}</span>
              </button>
            );
          })}
        </div>

        <RoleStage role={role} reduced={Boolean(reduced)} />
      </div>
    </Section>
  );
}

function RoleStage({ role, reduced }: { role: Role; reduced: boolean }) {
  const color = tone[role.id] ?? "#e4b15a";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={role.id}
        id="role-panel"
        role="tabpanel"
        aria-labelledby={`role-${role.id}`}
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7"
        style={{ boxShadow: `0 0 48px ${color}18` }}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color }}>
              {role.place}
            </p>
            <h3 className="mt-2 font-serif text-3xl tracking-tight">{role.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{role.summary}</p>
            {role.note ? <p className="mt-1 text-sm text-muted">{role.note}</p> : null}
          </div>
          {role.id === "ias" ? (
            <a
              href={links.ias}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border px-4 py-2 text-sm transition hover:-translate-y-0.5"
              style={{ borderColor: color, color }}
            >
              iassathi.com
            </a>
          ) : null}
        </div>

        <ol className="mt-6 space-y-3">
          {role.points.map((point, index) => (
            <li
              key={point.title}
              className="rounded-2xl border border-white/10 bg-ink/40 p-4 transition hover:border-white/25"
            >
              <div className="flex gap-4">
                <span
                  className="font-mono text-xs tracking-[0.14em]"
                  style={{ color }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h4 className="text-base text-bone">{point.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {point.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-bone/75"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>
    </AnimatePresence>
  );
}
