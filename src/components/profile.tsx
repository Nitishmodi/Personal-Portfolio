"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { facts } from "@/lib/data";
import { cx } from "@/components/ui";

export function Profile() {
  const [current, setCurrent] = useState<(typeof facts)[number]["id"]>("now");
  const reduced = useReducedMotion();
  const fact = facts.find((item) => item.id === current) ?? facts[0];

  return (
    <section id="profile" className="relative z-10 scroll-mt-28 px-5 pt-10 pb-4 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div role="tablist" aria-label="About" className="flex flex-wrap gap-2">
          {facts.map((item) => {
            const selected = item.id === current;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setCurrent(item.id)}
                onMouseEnter={() => setCurrent(item.id)}
                className={cx(
                  "relative rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition",
                  selected ? "border-transparent text-ink" : "border-white/10 text-muted hover:text-bone",
                )}
              >
                {selected ? (
                  <motion.span
                    layoutId="fact-fill"
                    className="absolute inset-0 rounded-full bg-amber"
                    transition={{ duration: reduced ? 0 : 0.25 }}
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={fact.id}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="mt-4 max-w-2xl"
          >
            <h2 className="font-serif text-3xl tracking-tight text-bone">{fact.title}</h2>
            <ul className="mt-4 space-y-2">
              {fact.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-muted">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
