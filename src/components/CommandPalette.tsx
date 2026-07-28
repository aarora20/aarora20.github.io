import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { socials } from "../data/content";
import type { Theme } from "../hooks/useTheme";

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
  onToggleTheme: () => void;
  theme: Theme;
};

type Action = {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
};

export function CommandPalette({
  open,
  onClose,
  onNavigate,
  onToggleTheme,
  theme,
}: Props) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: Action[] = useMemo(() => {
    const nav = (id: string, label: string): Action => ({
      id,
      label,
      hint: "section",
      run: () => {
        onNavigate(id);
        onClose();
      },
    });
    return [
      nav("about", "Go to About"),
      nav("projects", "Go to Projects"),
      nav("experience", "Go to Experience"),
      nav("contact", "Go to Contact"),
      {
        id: "theme",
        label: `Switch to ${theme === "dark" ? "light" : "dark"} mode`,
        hint: "theme",
        run: () => {
          onToggleTheme();
          onClose();
        },
      },
      ...socials.map<Action>((s) => ({
        id: `open-${s.label}`,
        label: `Open ${s.label}`,
        hint: "link",
        run: () => {
          window.open(s.href, "_blank", "noreferrer");
          onClose();
        },
      })),
    ];
  }, [onClose, onNavigate, onToggleTheme, theme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => a.label.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // focus after the frame so the input exists
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-label="Command palette"
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search…"
              spellCheck={false}
              className="w-full border-b border-border bg-transparent px-4 py-3.5 font-mono text-sm text-fg outline-none placeholder:text-muted"
            />
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center font-mono text-sm text-muted">
                  no matches
                </li>
              )}
              {filtered.map((a, i) => (
                <li key={a.id}>
                  <button
                    onMouseEnter={() => setActive(i)}
                    onClick={a.run}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm ${
                      i === active
                        ? "bg-accent/15 text-fg"
                        : "text-muted"
                    }`}
                  >
                    <span>{a.label}</span>
                    {a.hint && (
                      <span className="font-mono text-xs text-muted">
                        {a.hint}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
