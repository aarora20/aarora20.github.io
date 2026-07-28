import { Reveal } from "./Reveal";
import {
  experience,
  profile,
  projects,
  socials,
  stack,
} from "../data/content";

/* Small shared building blocks ------------------------------------------ */

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
      <span className="text-accent">//</span>
      {children}
    </div>
  );
}

function Section({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-content scroll-mt-24 px-6 py-20 sm:py-28"
    >
      {children}
    </section>
  );
}

/* About ------------------------------------------------------------------ */

export function About() {
  return (
    <Section id="about">
      <SectionLabel>about</SectionLabel>
      <Reveal>
        <p className="max-w-3xl text-2xl font-medium leading-snug sm:text-3xl">
          {profile.about}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-2">
          {stack.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* Projects --------------------------------------------------------------- */

export function Projects() {
  return (
    <Section id="projects">
      <SectionLabel>projects</SectionLabel>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06}>
            <article className="group relative flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/60">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {p.year && (
                  <span className="font-mono text-xs text-muted">{p.year}</span>
                )}
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {p.blurb}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-4 font-mono text-xs">
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-fg underline decoration-border underline-offset-4 hover:decoration-accent"
                  >
                    live ↗
                  </a>
                )}
                {p.repo && (
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-fg underline decoration-border underline-offset-4 hover:decoration-accent"
                  >
                    source ↗
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* Experience ------------------------------------------------------------- */

export function Experience() {
  return (
    <Section id="experience">
      <SectionLabel>experience</SectionLabel>
      <div className="space-y-10">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={i * 0.06}>
            <div className="grid gap-2 border-t border-border pt-6 sm:grid-cols-[12rem_1fr]">
              <div className="font-mono text-xs text-muted">{job.period}</div>
              <div>
                <h3 className="text-lg font-semibold">
                  {job.title}{" "}
                  <span className="text-muted">· {job.company}</span>
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                  {job.points.map((pt, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-accent">–</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* Contact ---------------------------------------------------------------- */

export function Contact() {
  return (
    <Section id="contact">
      <SectionLabel>contact</SectionLabel>
      <Reveal>
        <h2 className="max-w-2xl text-3xl font-semibold sm:text-4xl">
          Let's talk.
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Open to new roles and interesting problems. The fastest way to reach
          me is below.
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-wrap gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
