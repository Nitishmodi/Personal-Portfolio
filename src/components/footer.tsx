import { links, nav } from "@/lib/data";

const profiles = [
  { label: "LinkedIn", href: links.linkedin },
  { label: "GitHub", href: links.github },
  { label: "LeetCode", href: links.leetcode },
  { label: "CodeChef", href: links.codechef },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr_0.8fr_0.9fr]">
          <div>
            <p className="font-serif text-2xl tracking-tight">Nitish Modi</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Working as a software engineer at Cimpress.
            </p>
            <a
              href={`mailto:${links.email}`}
              className="mt-6 inline-flex rounded-full bg-amber px-5 py-2.5 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:bg-sand"
            >
              {links.email}
            </a>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-amber">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="text-sm text-bone/85 transition hover:text-amber">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-amber">Profiles</p>
            <ul className="mt-4 space-y-2.5">
              {profiles.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-sm text-bone/85 transition hover:text-amber"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-amber">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-bone/85">
              <li>
                <a href={links.phoneHref} className="transition hover:text-amber">
                  {links.phone}
                </a>
              </li>
              <li>
                <a href={links.resume} className="transition hover:text-amber">
                  Resume PDF
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
