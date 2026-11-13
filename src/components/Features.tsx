import type { MouseEvent } from "react";
import { FEATURES } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

function onMove(e: MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--x", `${e.clientX - rect.left}px`);
  el.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

export function Features() {
  const { t } = useLang();

  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t({ zh: "核心特性", en: "Features" })}
          title={t({ zh: "为真实世界而设计的工程细节", en: "Engineering details built for the real world" })}
          desc={t({
            zh: "不只是能在仿真里跑通 —— OpenDoge 从第一天起就为上实机、可维护、可复现而设计。",
            en: "Not just something that works in simulation — OpenDoge is designed from day one to be deployable, maintainable and reproducible.",
          })}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title.en} delay={(i % 4) * 70}>
                <div
                  onMouseMove={onMove}
                  className="group card card-hover relative h-full overflow-hidden p-6"
                  style={{ ["--x" as string]: "50%", ["--y" as string]: "50%" }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(240px circle at var(--x) var(--y), rgba(52,211,153,0.12), transparent 60%)",
                    }}
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink-900 text-mint-300 shadow-inner shadow-black/40 transition-colors group-hover:border-mint-500/40 group-hover:text-mint-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-[16px] font-semibold text-white">{t(f.title)}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-zinc-400">{t(f.desc)}</p>
                  </div>
                  <span className="absolute right-5 top-5 font-mono text-[10.5px] text-zinc-600 transition-colors group-hover:text-mint-500/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
