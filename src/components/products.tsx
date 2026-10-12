"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { products } from "@/lib/data";
import { buttonGhost, buttonPrimary, cx, Section, Tilt } from "@/components/ui";

const devpilotModes = [
  {
    id: "role",
    label: "Role",
    title: "A brief, with a status",
    body: "Draft, visible, or closed. The post carries the work, the skills, and the years the interview is built from.",
  },
  {
    id: "screen",
    label: "Screen",
    title: "Written for this person",
    body: "20 skill questions, 5 spoken, 5 written. A second candidate on the same role gets a different paper.",
  },
  {
    id: "score",
    label: "Scorecard",
    title: "One read, both desks",
    body: "Move forward only when every section and the overall score clear 80. Charts and a PDF. The recruiter decides.",
  },
] as const;

const flowModes = [
  {
    id: "doctor",
    label: "doctor",
    command: "flowpilot doctor",
    lines: [
      ["repository", "your-repo"],
      ["branch", "main"],
      ["local checks", "16"],
      ["missing script", "unavailable, never passed"],
    ],
  },
  {
    id: "pr",
    label: "pr-check",
    command: "flowpilot pr-check",
    lines: [
      ["format", "pass"],
      ["lint", "pass"],
      ["types", "pass"],
      ["unit tests", "pass"],
      ["secret scan", "pass"],
      ["review", "pass"],
    ],
  },
  {
    id: "secrets",
    label: "secrets",
    command: "flowpilot secrets",
    lines: [
      ["file", "src/config.ts:42"],
      ["value", "••••••••"],
      ["source", "stays on the machine"],
      ["site", "does not receive it"],
    ],
  },
] as const;

export function Products() {
  return (
    <Section id="products" kicker="Products" title="Two live products.">
      <div className="space-y-20">
        <Product product={products[0]} widget={<DevPilotDesk />} />
        <Product product={products[1]} widget={<FlowPilotTerm />} reverse />
      </div>
    </Section>
  );
}

function Product({
  product,
  widget,
  reverse = false,
}: {
  product: (typeof products)[number];
  widget: ReactNode;
  reverse?: boolean;
}) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className={reverse ? "lg:order-2" : undefined}>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
          {product.index} · {product.kicker}
        </p>
        <h3 className="mt-3 font-serif text-4xl tracking-tight text-bone md:text-5xl">
          {product.name}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted">{product.summary}</p>
        <ul className="mt-6 space-y-3">
          {product.points.slice(0, 3).map((point) => (
            <li
              key={point}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-bone/85 transition hover:-translate-y-0.5 hover:border-amber/50"
            >
              {point}
            </li>
          ))}
        </ul>
        <ul className="mt-6 flex flex-wrap gap-2">
          {product.stack.map((item) => (
            <li
              key={item}
              className="bg-panel px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            className={buttonPrimary}
            href={product.href}
            target="_blank"
            rel="noreferrer noopener"
          >
            Open live
          </a>
          {product.repo ? (
            <a
              className={buttonGhost}
              href={product.repo}
              target="_blank"
              rel="noreferrer noopener"
            >
              Source
            </a>
          ) : null}
        </div>
      </div>
      <div className={reverse ? "lg:order-1" : undefined}>{widget}</div>
    </article>
  );
}

function DevPilotDesk() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [locked, setLocked] = useState(false);
  const [visibility, setVisibility] = useState<"Draft" | "Visible" | "Closed">("Visible");
  const reduced = useReducedMotion();
  const mode = devpilotModes[index];

  useEffect(() => {
    if (paused || locked || reduced) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % devpilotModes.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [paused, locked, reduced]);

  return (
    <Tilt className="overflow-hidden rounded-3xl border border-white/10 bg-ink">
      <div
        className="relative p-4 md:p-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            DevPilot · model of the desk
          </p>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            Live site separate
          </span>
        </div>
        <div role="tablist" aria-label="DevPilot stages" className="mt-4 grid grid-cols-3 gap-2">
          {devpilotModes.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              onClick={() => {
                setLocked(true);
                setIndex(itemIndex);
              }}
              className={cx(
                "border px-2 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition",
                itemIndex === index
                  ? "border-amber bg-amber text-ink"
                  : "border-line text-muted hover:text-bone",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode.id}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-5 min-h-52 border border-line bg-panel/70 p-5"
          >
            <h4 className="font-serif text-2xl text-bone">{mode.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{mode.body}</p>
            {mode.id === "role" ? (
              <div className="mt-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                  Platform engineer · Bengaluru
                </p>
                <div className="mt-3 flex gap-2">
                  {(["Draft", "Visible", "Closed"] as const).map((state) => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => setVisibility(state)}
                      className={cx(
                        "border px-3 py-1.5 text-xs transition",
                        visibility === state
                          ? "border-amber text-amber"
                          : "border-line text-muted hover:text-bone",
                      )}
                    >
                      {state}
                    </button>
                  ))}
                </div>
                <ul className="mt-4 space-y-2">
                  <Weight label="Skills" width="55%" />
                  <Weight label="Experience" width="25%" />
                  <Weight label="Title" width="20%" />
                </ul>
              </div>
            ) : null}
            {mode.id === "screen" ? (
              <ul className="mt-5 space-y-2 font-mono text-xs text-bone/80">
                <li>20 skill questions, drawn from the role</li>
                <li>5 voice answers, stored with the rest</li>
                <li>5 written answers, scored with them</li>
              </ul>
            ) : null}
            {mode.id === "score" ? (
              <div className="mt-5 space-y-2">
                <Score label="Skills" value={84} />
                <Score label="Voice" value={81} />
                <Score label="Written" value={88} />
                <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-amber">
                  Example read · not a live candidate
                </p>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </Tilt>
  );
}

function Weight({ label, width }: { label: string; width: string }) {
  return (
    <li className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-2 text-xs text-muted">
      <span>{label}</span>
      <span className="h-1 bg-line">
        <span className="block h-1 bg-amber" style={{ width }} />
      </span>
      <span className="text-right font-mono text-bone">{width}</span>
    </li>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr_2rem] items-center gap-2 text-xs">
      <span className="text-muted">{label}</span>
      <span className="h-1.5 bg-line">
        <span className="block h-1.5 bg-amber" style={{ width: `${value}%` }} />
      </span>
      <span className="text-right font-mono text-bone">{value}</span>
    </div>
  );
}

function FlowPilotTerm() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [locked, setLocked] = useState(false);
  const reduced = useReducedMotion();
  const mode = flowModes[index];

  useEffect(() => {
    if (paused || locked || reduced) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % flowModes.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [paused, locked, reduced]);

  return (
    <Tilt className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0b09]">
      <div
        className="relative p-4 md:p-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-bone/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-bone/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Local run · example
          </p>
        </div>
        <div role="tablist" aria-label="FlowPilot commands" className="mt-4 flex flex-wrap gap-2">
          {flowModes.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              onClick={() => {
                setLocked(true);
                setIndex(itemIndex);
              }}
              className={cx(
                "border px-3 py-1.5 font-mono text-xs transition",
                itemIndex === index
                  ? "border-amber text-amber"
                  : "border-line text-muted hover:text-bone",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode.id}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            className="mt-4 min-h-56 bg-panel/80 p-5 font-mono text-sm"
          >
            <p className="text-amber">$ {mode.command}</p>
            <ul className="mt-4 space-y-2">
              {mode.lines.map(([key, value]) => (
                <li key={key} className="grid grid-cols-[9rem_1fr] gap-3">
                  <span className="text-muted">{key}</span>
                  <span className={value === "pass" ? "text-sand" : "text-bone"}>
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </Tilt>
  );
}
