import { profile } from "../data/content";
import type { Theme } from "../hooks/useTheme";

type Props = {
  theme: Theme;
  onToggle: () => void;
  onOpenPalette: () => void;
  onNavigate: (id: string) => void;
};

const links = [
  ["about", "about"],
  ["projects", "work"],
  ["experience", "experience"],
  ["contact", "contact"],
] as const;

export function Nav({ theme, onToggle, onOpenPalette, onNavigate }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-bg/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-sm font-semibold tracking-tight"
        >
          <span className="text-accent">~/</span>
          {profile.name.toLowerCase().replace(/\s+/g, "")}
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:flex">
            {links.map(([id, label]) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className="rounded-md px-3 py-1.5 font-mono text-sm text-muted transition-colors hover:text-fg"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-md border border-border px-2.5 py-1.5 font-mono text-xs text-muted transition-colors hover:text-fg sm:flex"
            aria-label="Open command palette"
          >
            <span>⌘K</span>
          </button>

          <button
            onClick={onToggle}
            className="rounded-md border border-border p-2 text-muted transition-colors hover:text-fg"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              // sun
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
              </svg>
            ) : (
              // moon
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
