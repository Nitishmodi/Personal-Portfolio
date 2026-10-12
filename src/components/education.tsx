import { education } from "@/lib/data";
import { Section } from "@/components/ui";

export function Education() {
  return (
    <Section id="study" kicker="Education" title="NIT Meghalaya, and Intermediate.">
      <div className="grid gap-3 md:grid-cols-2">
        {education.map((item) => (
          <article
            key={item.school}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-amber/50"
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-amber">{item.span}</p>
            <h3 className="mt-3 font-serif text-2xl tracking-tight">{item.school}</h3>
            <p className="mt-2 text-sm text-muted">{item.credential}</p>
            <p className="mt-4 font-serif text-3xl">{item.result}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.note}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
