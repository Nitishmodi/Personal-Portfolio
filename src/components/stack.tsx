"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiGit,
  SiGooglegemini,
  SiHelm,
  SiJavascript,
  SiKoa,
  SiKubernetes,
  SiLangchain,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { groups, skills, type Skill } from "@/lib/data";
import { cx, Section } from "@/components/ui";

const icons: Record<string, IconType> = {
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "C++": SiCplusplus,
  Python: SiPython,
  Java: SiOpenjdk,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Tailwind: SiTailwindcss,
  "Node.js": SiNodedotjs,
  Koa: SiKoa,
  Express: SiExpress,
  NestJS: SiNestjs,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  LangChain: SiLangchain,
  Helm: SiHelm,
  Git: SiGit,
  Gemini: SiGooglegemini,
};

export function Stack() {
  const [group, setGroup] = useState<(typeof groups)[number]>("All");
  const [pinned, setPinned] = useState(skills[0].name);
  const [hover, setHover] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const visible =
    group === "All" ? skills : skills.filter((skill) => skill.group === group);
  const activeName =
    hover && visible.some((skill) => skill.name === hover)
      ? hover
      : visible.some((skill) => skill.name === pinned)
        ? pinned
        : visible[0]?.name;
  const shown = skills.find((skill) => skill.name === activeName) ?? skills[0];

  return (
    <Section id="stack" kicker="Stack" title="The tools that actually show up.">
      <div role="tablist" aria-label="Skill groups" className="flex gap-2 overflow-x-auto pb-2">
        {groups.map((item) => {
          const selected = item === group;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setGroup(item)}
              className={cx(
                "relative shrink-0 rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.16em] transition",
                selected ? "border-transparent text-ink" : "border-white/10 text-muted hover:text-bone",
              )}
            >
              {selected ? (
                <motion.span
                  layoutId="group-fill"
                  className="absolute inset-0 rounded-full bg-amber"
                  transition={{ duration: reduced ? 0 : 0.25 }}
                />
              ) : null}
              <span className="relative z-10">{item}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
        {visible.map((skill) => (
          <li key={skill.name}>
            <SkillTile
              skill={skill}
              pressed={pinned === skill.name}
              active={shown.name === skill.name}
              onPick={() => {
                setPinned(skill.name);
                setHover(null);
              }}
              onPreview={(name) => setHover(name)}
            />
          </li>
        ))}
      </ul>

      <AnimatePresence mode="wait">
        <motion.div
          key={shown.name}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="mt-6 flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5"
          style={{ boxShadow: `0 0 40px ${shown.hex}22` }}
        >
          <SkillMark skill={shown} className="h-10 w-10" />
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: shown.hex }}>
              {shown.group}
              {pinned === shown.name ? " · pinned" : " · preview"}
            </p>
            <h3 className="mt-1 font-serif text-3xl text-bone">{shown.name}</h3>
            <p className="mt-1 text-sm text-muted">{shown.note}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}

function SkillMark({ skill, className }: { skill: Skill; className?: string }) {
  const Icon = icons[skill.name];
  if (Icon) return <Icon aria-hidden className={className} style={{ color: skill.hex }} />;
  return (
    <span className="font-mono text-xs tracking-[0.14em]" style={{ color: skill.hex }}>
      {skill.mark}
    </span>
  );
}

function SkillTile({
  skill,
  pressed,
  active,
  onPick,
  onPreview,
}: {
  skill: Skill;
  pressed: boolean;
  active: boolean;
  onPick: () => void;
  onPreview: (name: string | null) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onPick}
      onMouseEnter={() => onPreview(skill.name)}
      onMouseLeave={() => onPreview(null)}
      onFocus={() => onPreview(skill.name)}
      onBlur={() => onPreview(null)}
      className={cx(
        "group flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl border bg-white/[0.03] transition duration-200 hover:-translate-y-1.5",
        active ? "border-transparent" : "border-white/10 hover:border-white/30",
      )}
      style={
        active
          ? {
              borderColor: skill.hex,
              boxShadow: `0 12px 30px ${skill.hex}33, inset 0 0 0 1px ${skill.hex}`,
              background: `${skill.hex}18`,
            }
          : undefined
      }
    >
      <span className="transition duration-200 group-hover:scale-110">
        <SkillMark skill={skill} className="h-7 w-7" />
      </span>
      <span className="px-1 text-center text-[10px] leading-tight text-muted group-hover:text-bone">
        {skill.name}
      </span>
    </button>
  );
}
