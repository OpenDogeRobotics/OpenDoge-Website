import { ArrowRight, ChevronRight } from "lucide-react";
import heroImg from "@/assets/opendoge-hero.jpg";
import { GITHUB_ORG, HERO, STATS } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { GithubIcon } from "./ui/Icons";

/**
 * Renders "|"-separated groups as unbreakable inline units so the browser can
 * only wrap between groups. An optional highlight prefix inside a group is
 * rendered in the accent colour.
 */
function HeadlineGroups({ text, highlight, joiner }: { text: string; highlight?: string; joiner: string }) {
  const groups = text.split("|");
  return (
    <>
      {groups.map((group, i) => {
        const hasHighlight = highlight && group.startsWith(highlight);
        return (
          <span key={`${group}-${i}`}>
            {i > 0 ? joiner : null}
            <span className="inline-block whitespace-nowrap">
              {hasHighlight ? (
                <>
                  <span className="text-mint-400 text-glow">{highlight}</span>
                  {group.slice(highlight.length)}
                </>
              ) : (
                group
              )}
            </span>
          </span>
        );
      })}
    </>
  );
}

export function Hero() {
  const { t, lang } = useLang();

  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-fade-b opacity-70" />
        <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-mint-500/12 blur-[140px]" />
        <div className="absolute right-[-10%] top-[20%] h-[420px] w-[420px] rounded-full bg-cyan-400/8 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-6">
            <div className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-mint-500/25 bg-mint-500/8 py-1.5 pl-2 pr-4 text-[12.5px] font-medium text-mint-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping-slow rounded-full bg-mint-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint-400" />
              </span>
              {t(HERO.badge)}
            </div>

            <h1
              className="animate-fade-up mt-6 text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[3.4rem] xl:text-[4.1rem]"
              style={{ animationDelay: "80ms" }}
            >
              <HeadlineGroups text={t(HERO.titleLine1)} joiner={lang === "zh" ? "" : " "} />
              <br />
              <HeadlineGroups
                text={t(HERO.titleLine2)}
                highlight={t(HERO.titleHighlight)}
                joiner={lang === "zh" ? "" : " "}
              />
            </h1>

            <p
              className="animate-fade-up mt-6 max-w-xl text-[15.5px] leading-relaxed text-zinc-400 md:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              {t(HERO.desc)}
            </p>

            <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "240ms" }}>
              <a
                href={GITHUB_ORG}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-mint-500 px-5 py-3 text-[14.5px] font-semibold text-ink-950 shadow-[0_0_40px_-10px_rgba(52,211,153,0.8)] transition-all hover:bg-mint-400 hover:shadow-[0_0_50px_-8px_rgba(52,211,153,0.95)]"
              >
                <GithubIcon className="h-4.5 w-4.5" />
                {t(HERO.ctaPrimary)}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#quickstart"
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-[14.5px] font-medium text-zinc-200 transition-colors hover:border-white/25 hover:bg-white/[0.06]"
              >
                {t(HERO.ctaSecondary)}
                <ChevronRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-300" />
              </a>
            </div>

            <ul
              className="animate-fade-up mt-9 flex flex-wrap gap-2"
              style={{ animationDelay: "320ms" }}
              aria-label="Tech stack"
            >
              {HERO.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-md border border-white/8 bg-white/[0.025] px-2.5 py-1 font-mono text-[11.5px] text-zinc-400"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="relative lg:col-span-6">
            <div
              className="animate-fade-up relative mx-auto max-w-[560px] lg:ml-auto"
              style={{ animationDelay: "200ms" }}
            >
              <div className="absolute -inset-px rounded-[28px] bg-gradient-to-b from-mint-500/40 via-white/10 to-transparent opacity-70 blur-[1px]" />
              <figure className="relative overflow-hidden rounded-[28px] border border-white/10 bg-ink-900 shadow-2xl shadow-black/60">
                <img
                  src={heroImg}
                  alt="OpenDoge quadruped robot render"
                  className="aspect-square w-full object-cover"
                  width={1400}
                  height={1400}
                  decoding="async"
                  fetchPriority="high"
                />
                {/* scanline overlay */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                  <div className="absolute inset-x-0 h-1/4 animate-scan bg-gradient-to-b from-transparent via-mint-400/10 to-transparent" />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />

                {/* corner ticks */}
                <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-mint-400/70" aria-hidden />
                <span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-mint-400/70" aria-hidden />
                <span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-mint-400/70" aria-hidden />
                <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-mint-400/70" aria-hidden />

                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-mint-300/90">
                      OpenDoge · NO.01
                    </div>
                    <div className="mt-1 text-sm text-zinc-300">{t(HERO.imageCaption)}</div>
                  </div>
                  <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/60 px-2.5 py-1 font-mono text-[10.5px] text-zinc-300 backdrop-blur sm:flex">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint-400" />
                    12-DOF
                  </div>
                </figcaption>
              </figure>

              {/* floating stat chips */}
              <div className="pointer-events-none absolute -left-4 top-8 hidden flex-col gap-3 sm:flex lg:-left-10">
                {HERO.floating.map((f, i) => (
                  <div
                    key={f.v}
                    className="animate-float rounded-xl border border-white/10 bg-ink-900/85 px-3.5 py-2.5 shadow-xl shadow-black/50 backdrop-blur"
                    style={{ animationDelay: `${i * 700}ms` }}
                  >
                    <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">{t(f.k)}</div>
                    <div className="mt-0.5 font-mono text-[15px] font-semibold text-white">{f.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="animate-fade-up mt-20 md:mt-28" style={{ animationDelay: "420ms" }}>
          <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/8 bg-ink-900/60 backdrop-blur md:grid-cols-5">
            {STATS.map((s, i) => (
              <div
                key={s.label.en}
                className={[
                  "relative px-6 py-6 md:py-7",
                  i % 2 === 0 ? "border-r border-white/6 md:border-r" : "",
                  i < STATS.length - 1 ? "md:border-r md:border-white/6" : "",
                  i < 2 ? "border-b border-white/6 md:border-b-0" : "",
                  i === 2 || i === 3 ? "border-b border-white/6 md:border-b-0" : "",
                  i === STATS.length - 1 ? "col-span-2 md:col-span-1" : "",
                ].join(" ")}
              >
                <dd className="font-mono text-[26px] font-semibold tracking-tight text-white md:text-[30px]">
                  {s.value}
                </dd>
                <dt className="mt-1 text-[13px] font-medium text-zinc-300">{t(s.label)}</dt>
                <div className="mt-0.5 font-mono text-[11px] text-zinc-500">{t(s.hint)}</div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
