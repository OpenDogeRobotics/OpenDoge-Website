import { TECH_STACK } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

export function TechStack() {
  const { t } = useLang();

  return (
    <section id="stack" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t({ zh: "技术栈", en: "Tech stack" })}
          title={t({ zh: "十二层技术栈，全部开放", en: "Twelve layers, all in the open" })}
          desc={t({
            zh: "从 CAD 到 CAN 帧，每一层都选用成熟、可获取的工具链；训练与仿真用 Python，实机部署用 C++。",
            en: "From CAD to CAN frames, every layer uses mature, accessible tooling — Python for training and simulation, C++ for deployment.",
          })}
        />

        <Reveal>
          <div className="grid overflow-hidden rounded-2xl border border-white/8 bg-ink-850/60 sm:grid-cols-2 lg:grid-cols-3">
            {TECH_STACK.map((row, i) => {
              const Icon = row.icon;
              return (
                <div
                  key={row.tech}
                  className="group relative flex gap-4 border-b border-white/6 p-6 transition-colors hover:bg-white/[0.025] sm:[&:nth-child(2n)]:border-l lg:[&:nth-child(2n)]:border-l-0 lg:[&:nth-child(3n+2)]:border-l lg:[&:nth-child(3n)]:border-l lg:[&:nth-last-child(-n+3)]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-ink-900 text-zinc-400 transition-colors group-hover:border-mint-500/40 group-hover:text-mint-300">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                      {String(i + 1).padStart(2, "0")} · {t(row.layer)}
                    </div>
                    <div className="mt-1 text-[15px] font-semibold text-white">{row.tech}</div>
                    <div className="mt-1 text-[12.5px] leading-relaxed text-zinc-500">{t(row.purpose)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
