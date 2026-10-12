"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-sand active:translate-y-0";

export const buttonGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-bone backdrop-blur transition hover:-translate-y-0.5 hover:border-amber hover:text-amber active:translate-y-0";

export function Section({
  id,
  kicker,
  title,
  lede,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-amber">
            {kicker}
          </p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-bone md:text-5xl">
            {title}
          </h2>
          {lede ? (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{lede}</p>
          ) : null}
        </Reveal>
        <div className="mt-8 md:mt-10">{children}</div>
      </div>
    </section>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Count({
  value,
  digits = 0,
}: {
  value: number;
  digits?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = reduced ? 0 : 900;
    let frame = 0;
    const tick = (now: number) => {
      const progress = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, value]);

  const text = digits
    ? current.toFixed(digits)
    : Math.round(current).toLocaleString("en-IN");

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}

export function Tilt({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  function onMove(event: MouseEvent<HTMLDivElement>) {
    const node = ref.current;
    if (reduced || !node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
    node.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
    node.style.transform = `perspective(1000px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  }

  function onLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cx("relative transition-transform duration-200 ease-out", className)}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={
          {
            background:
              "radial-gradient(420px circle at var(--mx, 80%) var(--my, 20%), rgb(228 177 90 / 0.16), transparent 42%)",
          } as CSSProperties
        }
      />
    </div>
  );
}
