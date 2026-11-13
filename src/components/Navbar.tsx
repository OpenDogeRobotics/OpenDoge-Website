import { Menu, X } from "lucide-react";
import { GithubIcon } from "./ui/Icons";
import { useEffect, useState } from "react";
import { GITHUB_ORG, NAV_LINKS } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { cn } from "@/utils/cn";
import { Logo } from "./ui/Logo";

function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5 font-mono text-[11px]",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {(["zh", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className={cn(
            "rounded-full px-2.5 py-1 transition-colors",
            lang === code ? "bg-mint-500 text-ink-950 font-semibold" : "text-zinc-400 hover:text-white",
          )}
          aria-pressed={lang === code}
        >
          {code === "zh" ? "中" : "EN"}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Nothing should be highlighted while the hero is on screen.
      if (window.scrollY < 320) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "border-b border-white/8 bg-ink-950/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-colors",
                  active === link.id ? "text-white" : "text-zinc-400 hover:text-white",
                )}
              >
                {active === link.id ? (
                  <span className="absolute inset-0 -z-10 rounded-full bg-white/[0.06]" aria-hidden />
                ) : null}
                {t(link.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LangToggle />
          <a
            href={GITHUB_ORG}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-ink-950 transition-all hover:bg-mint-300 hover:shadow-[0_0_28px_-6px_rgba(52,211,153,0.7)]"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LangToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-300 hover:text-white"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 lg:hidden",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <ul className="mx-auto max-w-7xl space-y-1 px-5 pb-5 pt-2 sm:px-8">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                >
                  {t(link.label)}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={GITHUB_ORG}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-[14px] font-semibold text-ink-950"
              >
                <GithubIcon className="h-4 w-4" />
                GitHub · OpenDogeRobotics
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
