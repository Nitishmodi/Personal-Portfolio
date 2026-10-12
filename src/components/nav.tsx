"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/data";
import { cx } from "@/components/ui";

export function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > lastY.current && y > 120 && !open);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const update = () => {
      const line = window.scrollY + window.innerHeight * 0.32;
      let current = "";
      for (const item of nav) {
        const node = document.getElementById(item.id);
        if (!node) continue;
        const top = node.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = item.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("hashchange", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#work"
        className="absolute left-4 top-4 z-[80] -translate-y-24 rounded-full bg-amber px-3 py-2 text-sm text-ink focus:translate-y-0"
      >
        Skip to work
      </a>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-transform duration-300 md:px-5",
          hidden && !open && "-translate-y-full",
        )}
      >
        <div
          className={cx(
            "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border px-3 md:px-4",
            scrolled || open
              ? "border-white/10 bg-ink/80 shadow-[0_10px_40px_rgb(0_0_0_/_0.35)] backdrop-blur-xl"
              : "border-white/10 bg-ink/45 backdrop-blur-md",
          )}
        >
          <a href="#top" className="flex items-center gap-2 pl-1">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-amber font-serif text-sm text-ink">
              N
            </span>
            <span className="hidden font-serif text-base tracking-tight sm:inline">
              Nitish Modi
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {nav.map((item) => {
              const selected = active === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={selected ? "true" : undefined}
                  className={cx(
                    "relative rounded-full px-3 py-1.5 text-sm transition",
                    selected ? "text-ink" : "text-bone/80 hover:text-bone",
                  )}
                >
                  {selected ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-amber"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden rounded-full bg-bone px-3 py-1.5 text-sm font-medium text-ink transition hover:bg-sand sm:inline-flex"
            >
              Contact me
            </a>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 lg:hidden"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="flex w-4 flex-col gap-1.5">
                <span
                  className={cx(
                    "h-px bg-bone transition",
                    open && "translate-y-[3.5px] rotate-45",
                  )}
                />
                <span
                  className={cx(
                    "h-px bg-bone transition",
                    open && "-translate-y-[3.5px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="site-menu"
          className="fixed inset-0 z-40 bg-ink/95 px-6 pt-24 backdrop-blur-xl lg:hidden"
        >
          <nav className="mx-auto flex max-w-lg flex-col" aria-label="Mobile sections">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-serif text-4xl"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex w-fit rounded-full bg-amber px-5 py-3 text-sm font-medium text-ink"
            >
              Contact me
            </a>
          </nav>
        </div>
      ) : null}
    </>
  );
}
