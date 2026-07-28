import { useCallback, useEffect, useState } from "react";
import { useTheme, type Theme } from "./hooks/useTheme";
import { Nav } from "./components/Nav";
import { Terminal } from "./components/Terminal";
import { CommandPalette } from "./components/CommandPalette";
import { About, Contact, Experience, Projects } from "./components/Sections";
import { Reveal } from "./components/Reveal";
import { profile } from "./data/content";

export default function App() {
  const { theme, setTheme, toggle } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);

  const navigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const onTheme = useCallback(
    (next: Theme | "toggle") => {
      if (next === "toggle") toggle();
      else setTheme(next);
    },
    [setTheme, toggle]
  );

  // ⌘K / Ctrl+K toggles the palette.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen">
      <Nav
        theme={theme}
        onToggle={toggle}
        onOpenPalette={() => setPaletteOpen(true)}
        onNavigate={navigate}
      />

      {/* Hero */}
      <section className="mx-auto w-full max-w-content px-6 pb-16 pt-16 sm:pt-24">
        <Reveal>
          <p className="font-mono text-sm text-accent">{profile.role}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
            {profile.name}.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-xl text-lg text-muted sm:text-xl">
            {profile.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12">
            <Terminal onTheme={onTheme} onNavigate={navigate} />
          </div>
        </Reveal>
      </section>

      <main>
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <footer className="mx-auto w-full max-w-content px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-2 border-t border-border pt-6 font-mono text-xs text-muted sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>Built with React · TypeScript · Tailwind</span>
        </div>
      </footer>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onNavigate={navigate}
        onToggleTheme={toggle}
        theme={theme}
      />
    </div>
  );
}
