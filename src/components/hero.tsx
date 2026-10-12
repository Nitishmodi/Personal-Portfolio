"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import { buttonGhost, buttonPrimary } from "@/components/ui";

const cityLights = [
  { left: "61%", top: "44%", delay: "0s" },
  { left: "66%", top: "51%", delay: "1.1s" },
  { left: "70%", top: "47%", delay: "0.4s" },
  { left: "74%", top: "56%", delay: "1.8s" },
  { left: "78%", top: "49%", delay: "0.7s" },
  { left: "82%", top: "58%", delay: "2.2s" },
  { left: "86%", top: "46%", delay: "1.4s" },
  { left: "90%", top: "54%", delay: "0.2s" },
  { left: "64%", top: "60%", delay: "2.6s" },
  { left: "73%", top: "63%", delay: "1.6s" },
  { left: "84%", top: "64%", delay: "0.9s" },
  { left: "93%", top: "50%", delay: "2.9s" },
] as const;

const roles = [
  {
    title: "Software Engineer, Cimpress India",
    line: "Working as a software engineer at Cimpress. Planned shipments, packing slips, and labels into iPack.",
  },
  {
    title: "Former SDE intern, Siemens",
    line: "SDE intern at Siemens. Copier templates, Ruff on the lint path, and Amazon Nova on Bedrock.",
  },
  {
    title: "Competitive programmer",
    line: "LeetCode Guardian and CodeChef 5 star. Coding club head at NIT Meghalaya.",
  },
] as const;

const welcome = ["Welcome", "to", "my", "portfolio."] as const;

function WelcomeLine({ reduced }: { reduced: boolean }) {
  return (
    <div className="mb-5 w-fit max-w-full">
      <p
        className="flex flex-wrap gap-x-[0.32em] font-serif text-[1.7rem] leading-none tracking-tight md:text-[2.15rem]"
        aria-label="Welcome to my portfolio."
      >
        {welcome.map((word, index) => (
          <motion.span
            key={word}
            className={index === 0 ? "text-amber" : "text-bone"}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: reduced ? 0 : 0.08 + index * 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </p>
      <motion.span
        aria-hidden
        className="mt-3 block h-px origin-left bg-gradient-to-r from-amber via-amber/80 to-transparent"
        initial={reduced ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.85, delay: reduced ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const role = roles[roleIndex];

  useEffect(() => {
    if (reduced) return;
    const timer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [reduced]);

  function onMove(event: MouseEvent<HTMLElement>) {
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--hx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--hy", `${event.clientY - rect.top}px`);
  }

  return (
    <section id="top" className="hero-live relative min-h-[100svh] overflow-hidden" onMouseMove={onMove}>
      <div className="cover-photo absolute inset-0 overflow-hidden">
        <div className="cover-drift absolute inset-0">
          <Image
            src="/cover.jpg"
            alt="A desk lamp in a dark room, looking out over a city at night"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center]"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/45 md:bg-gradient-to-r md:from-ink md:from-[8%] md:via-ink/88 md:via-[42%] md:to-ink/15" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="lamp-glow" />
        {cityLights.map((light) => (
          <span
            key={`${light.left}-${light.top}`}
            className="city-light"
            style={{ left: light.left, top: light.top, animationDelay: light.delay }}
          />
        ))}
        <div className="hero-glow" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-16 pt-28 md:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <WelcomeLine reduced={Boolean(reduced)} />
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
            He/Him · Hazaribagh, Jharkhand
          </p>
          <h1 className="mt-4 font-serif text-[clamp(3.6rem,11vw,8.25rem)] leading-[0.88] tracking-tight text-bone">
            Nitish
            <span className="block">Modi</span>
          </h1>
          <div className="mt-6 min-h-[7.5rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={role.title}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-serif text-xl text-bone [text-shadow:0_2px_18px_rgb(0_0_0)] md:text-2xl">
                  {role.title}
                </p>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-sand [text-shadow:0_2px_16px_rgb(0_0_0)]">
                  {role.line}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <a className={buttonPrimary} href="#work">
              See the work
            </a>
            <a className={buttonGhost} href="#products">
              Two live products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
