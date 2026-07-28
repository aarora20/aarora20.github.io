/*
 * ─────────────────────────────────────────────────────────────
 *  EDIT ME. This is the single place to update site content.
 *  Everything below is placeholder — swap in your real details.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Aryaman Arora",
  role: "Software Engineer",
  // One punchy line — this is what `whoami` prints and what a recruiter reads first.
  tagline: "I build web software end to end.",
  location: "TODO: City, Country",
  // 2–4 sentences, plain and confident. Used in the About section.
  about:
    "TODO: A short bio. What you work on, what you're good at, and what " +
    "you're looking for next. Keep it human — this is the paragraph a " +
    "recruiter actually reads. Two or three sentences is plenty.",
  resumeUrl: "/resume.pdf", // drop a resume.pdf in /public, or link elsewhere
};

export type Social = {
  label: string;
  href: string;
  // shown by the `contact` terminal command
  handle: string;
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/aarora20", handle: "@aarora20" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/TODO",
    handle: "in/TODO",
  },
  { label: "Email", href: "mailto:aryamanarora85@gmail.com", handle: "aryamanarora85@gmail.com" },
];

export type Project = {
  name: string;
  blurb: string;
  tags: string[];
  href?: string; // live demo
  repo?: string; // source
  year?: string;
};

export const projects: Project[] = [
  {
    name: "TODO — Project One",
    blurb:
      "One or two sentences on what it does and why it's interesting. Lead " +
      "with impact, not the tech list.",
    tags: ["React", "TypeScript", "Node"],
    href: "https://example.com",
    repo: "https://github.com/aarora20/todo",
    year: "2025",
  },
  {
    name: "TODO — Project Two",
    blurb:
      "Another real project. Replace these three placeholders with your " +
      "actual best work — quality over quantity.",
    tags: ["Python", "Postgres"],
    repo: "https://github.com/aarora20/todo",
    year: "2024",
  },
  {
    name: "TODO — Project Three",
    blurb: "Short, specific, and honest about what you built.",
    tags: ["Go", "Docker", "AWS"],
    href: "https://example.com",
    year: "2024",
  },
];

export type Job = {
  company: string;
  title: string;
  period: string;
  points: string[];
};

export const experience: Job[] = [
  {
    company: "TODO — Company",
    title: "Software Engineer",
    period: "2023 — Present",
    points: [
      "TODO: A concrete accomplishment with a number if you have one.",
      "TODO: A second bullet — what you owned or shipped.",
    ],
  },
  {
    company: "TODO — Earlier Company",
    title: "Software Engineer Intern",
    period: "Summer 2022",
    points: ["TODO: What you did and its impact."],
  },
];

// Tech shown as a simple, readable list (no logo-soup like the old template).
export const stack: string[] = [
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Docker",
  "AWS",
];
