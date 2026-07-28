import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { profile, projects, socials } from "../data/content";
import type { Theme } from "../hooks/useTheme";

type Props = {
  onTheme: (next: Theme | "toggle") => void;
  onNavigate: (sectionId: string) => void;
};

type Line = { id: number; node: ReactNode };

const PROMPT = "visitor@aryamanarora";

let uid = 0;
const nextId = () => ++uid;

function Prompt() {
  return (
    <span>
      <span className="text-accent">{PROMPT}</span>
      <span className="text-muted">:</span>
      <span className="text-fg/70">~</span>
      <span className="text-muted">$ </span>
    </span>
  );
}

export function Terminal({ onTheme, onNavigate }: Props) {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const history = useRef<string[]>([]);
  const histIdx = useRef<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const push = useCallback((node: ReactNode) => {
    setLines((prev) => [...prev, { id: nextId(), node }]);
  }, []);

  const echoCommand = useCallback(
    (raw: string) =>
      push(
        <div className="whitespace-pre-wrap break-words">
          <Prompt />
          <span>{raw}</span>
        </div>
      ),
    [push]
  );

  const run = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      echoCommand(raw);
      if (trimmed) {
        history.current.push(trimmed);
        histIdx.current = history.current.length;
      }
      const [cmd, ...args] = trimmed.split(/\s+/);
      const arg = args.join(" ").toLowerCase();

      const out = (node: ReactNode) => push(node);
      const line = (text: string, className = "") =>
        out(<div className={`whitespace-pre-wrap break-words ${className}`}>{text}</div>);

      switch (cmd.toLowerCase()) {
        case "":
          break;
        case "help":
          out(
            <div className="grid grid-cols-[7rem_1fr] gap-x-4 gap-y-1">
              {[
                ["whoami", "who is this"],
                ["about", "the short version"],
                ["projects", "selected work"],
                ["experience", "where I've worked"],
                ["contact", "how to reach me"],
                ["theme", "toggle light / dark"],
                ["clear", "clear the screen"],
              ].map(([c, d]) => (
                <div key={c} className="contents">
                  <span className="text-accent">{c}</span>
                  <span className="text-muted">{d}</span>
                </div>
              ))}
            </div>
          );
          break;
        case "whoami":
          line(`${profile.name} — ${profile.role}. ${profile.tagline}`);
          break;
        case "about":
          line(profile.about, "text-muted max-w-2xl");
          out(
            <button
              className="mt-1 text-accent underline underline-offset-4 hover:opacity-80"
              onClick={() => onNavigate("about")}
            >
              → read more
            </button>
          );
          break;
        case "ls":
          out(
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {["about/", "experience/", "projects/", "contact/"].map((s) => (
                <span key={s} className="text-accent">
                  {s}
                </span>
              ))}
            </div>
          );
          break;
        case "projects":
        case "work":
          out(
            <div className="space-y-1">
              {projects.map((p) => (
                <div key={p.name}>
                  <span className="text-muted">{p.year ?? ""} </span>
                  <span className="text-fg">{p.name}</span>
                  <span className="text-muted"> — {p.tags.join(", ")}</span>
                </div>
              ))}
            </div>
          );
          out(
            <button
              className="mt-1 text-accent underline underline-offset-4 hover:opacity-80"
              onClick={() => onNavigate("projects")}
            >
              → open projects
            </button>
          );
          break;
        case "experience":
          onNavigate("experience");
          line("Scrolling to experience…", "text-muted");
          break;
        case "contact":
          out(
            <div className="space-y-1">
              {socials.map((s) => (
                <div key={s.label}>
                  <span className="text-muted w-24 inline-block">{s.label}</span>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent underline underline-offset-4 hover:opacity-80"
                  >
                    {s.handle}
                  </a>
                </div>
              ))}
            </div>
          );
          break;
        case "theme":
          if (arg === "light" || arg === "dark") onTheme(arg);
          else onTheme("toggle");
          line(`theme → ${arg === "light" || arg === "dark" ? arg : "toggled"}`, "text-muted");
          break;
        case "echo":
          line(args.join(" "));
          break;
        case "clear":
          setLines([]);
          break;
        case "sudo":
          line("Nice try. You already have everything you need. :)", "text-muted");
          break;
        default:
          out(
            <div>
              <span className="text-fg">{cmd}</span>
              <span className="text-muted">
                : command not found. Try{" "}
              </span>
              <button
                className="text-accent underline underline-offset-4"
                onClick={() => run("help")}
              >
                help
              </button>
            </div>
          );
      }
    },
    [echoCommand, onNavigate, onTheme, push]
  );

  // Boot sequence: type `whoami`, run it, then a hint. Runs once.
  useEffect(() => {
    let cancelled = false;
    const boot = async () => {
      const wait = (ms: number) =>
        new Promise((r) => setTimeout(r, ms));
      await wait(350);
      const target = "whoami";
      for (let i = 1; i <= target.length; i++) {
        if (cancelled) return;
        setInput(target.slice(0, i));
        await wait(90);
      }
      await wait(250);
      if (cancelled) return;
      setInput("");
      run("whoami");
      await wait(150);
      if (cancelled) return;
      push(
        <div className="text-muted">
          Type <span className="text-accent">help</span> to explore, or just
          scroll. Press{" "}
          <kbd className="rounded border border-border px-1.5 py-0.5 text-xs">
            ⌘K
          </kbd>{" "}
          anywhere.
        </div>
      );
      setBooted(true);
      // Focus so visitors can type immediately, without yanking the page
      // down to the input on load.
      inputRef.current?.focus({ preventScroll: true });
    };
    boot();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep scrolled to the newest line.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (histIdx.current > 0) {
        histIdx.current -= 1;
        setInput(history.current[histIdx.current] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx.current < history.current.length - 1) {
        histIdx.current += 1;
        setInput(history.current[histIdx.current] ?? "");
      } else {
        histIdx.current = history.current.length;
        setInput("");
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      className="mx-auto w-full max-w-3xl overflow-hidden rounded-xl border border-border shadow-2xl shadow-black/5"
      style={{ backgroundColor: "rgb(var(--term-bg))" }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-xs text-muted">
          {PROMPT} — zsh
        </span>
      </div>

      {/* body */}
      <div
        ref={scrollRef}
        className="h-[19rem] overflow-y-auto px-4 py-4 font-mono text-sm leading-relaxed sm:h-[21rem]"
      >
        <div className="space-y-2">
          {lines.map((l) => (
            <div key={l.id}>{l.node}</div>
          ))}
        </div>

        {/* live input line */}
        <div className="mt-2 flex items-center">
          <Prompt />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="terminal input"
            className="flex-1 bg-transparent font-mono text-sm text-fg outline-none"
          />
          {!booted && input === "" && (
            <span className="ml-0.5 inline-block h-4 w-2 animate-blink bg-accent" />
          )}
        </div>
      </div>
    </div>
  );
}
