import { ArrowUpRight, BookOpen, Package } from "lucide-react";
import { useState } from "react";
import { DEPENDENCIES, QUICK_TABS } from "@/data/quickstart";
import { REPO } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { cn } from "@/utils/cn";
import { CodeBlock } from "./ui/CodeBlock";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

export function QuickStart() {
  const { t } = useLang();
  const [tabId, setTabId] = useState(QUICK_TABS[0].id);
  const tab = QUICK_TABS.find((x) => x.id === tabId) ?? QUICK_TABS[0];

  return (
    <section id="quickstart" className="relative overflow-x-clip py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-40 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-mint-500/6 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t({ zh: "快速开始", en: "Quick start" })}
          title={t({ zh: "四步，从零到一只会走的狗", en: "Four steps from zero to a walking dog" })}
          desc={t({
            zh: "硬件制造 → 仿真训练 → Sim2Sim 验证 → 实机部署。每一步的命令都可以直接复制。",
            en: "Hardware → training → Sim2Sim → deployment. Every command below is copy-paste ready.",
          })}
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            {/* Tabs */}
            <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <div className="inline-flex min-w-full gap-1 rounded-xl border border-white/8 bg-ink-850/70 p-1 sm:min-w-0" role="tablist">
                {QUICK_TABS.map((qt, i) => (
                  <button
                    key={qt.id}
                    type="button"
                    role="tab"
                    aria-selected={qt.id === tabId}
                    onClick={() => setTabId(qt.id)}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-[13.5px] font-medium transition-all",
                      qt.id === tabId ? "bg-white text-ink-950 shadow" : "text-zinc-400 hover:bg-white/[0.04] hover:text-white",
                    )}
                  >
                    <span className={cn("font-mono text-[11px]", qt.id === tabId ? "text-ink-950/60" : "text-zinc-600")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {t(qt.label)}
                  </button>
                ))}
              </div>
            </div>

            {/* Panel */}
            <div key={tab.id} className="animate-fade-up card mt-4 p-6 md:p-8">
              <p className="text-[14.5px] leading-relaxed text-zinc-400">{t(tab.intro)}</p>
              <ol className="mt-7 space-y-7">
                {tab.steps.map((step, i) => (
                  <li key={step.title.en} className="relative pl-11">
                    <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-mint-500/40 bg-mint-500/10 font-mono text-[12px] font-semibold text-mint-300">
                      {i + 1}
                    </span>
                    {i < tab.steps.length - 1 ? (
                      <span className="absolute left-[13.5px] top-8 h-[calc(100%-8px)] w-px bg-white/8" aria-hidden />
                    ) : null}
                    <h4 className="text-[15.5px] font-semibold text-white">{t(step.title)}</h4>
                    {step.desc ? <p className="mt-1.5 text-[13.5px] leading-relaxed text-zinc-400">{t(step.desc)}</p> : null}
                    {step.code ? <CodeBlock code={step.code} title={step.lang} className="mt-3.5" /> : null}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* Sidebar */}
          <Reveal delay={120} className="lg:col-span-4">
            <div className="space-y-4 lg:sticky lg:top-24">
              <div className="card p-6">
                <div className="flex items-center gap-2.5">
                  <Package className="h-4 w-4 text-mint-300" />
                  <h3 className="text-[14px] font-semibold text-white">{t({ zh: "关键依赖", en: "Key dependencies" })}</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {DEPENDENCIES.map((d) => (
                    <li key={d.name} className="flex items-center justify-between gap-3 rounded-lg border border-white/6 bg-ink-950/50 px-3 py-2">
                      <span className="font-mono text-[12px] text-zinc-200">{d.name}</span>
                      <span className="text-right text-[11.5px] text-zinc-500">{t(d.note)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card overflow-hidden">
                <div className="border-b border-white/6 bg-amber-400/[0.06] px-6 py-3">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-amber-300">
                    {t({ zh: "安全提示", en: "Safety note" })}
                  </span>
                </div>
                <p className="px-6 py-4 text-[13px] leading-relaxed text-zinc-400">
                  {t({
                    zh: "首次上电请先使用 start_robot.sh dry 进行 Dry-run，确认 CAN、IMU 与手柄桥接均正常后再加载策略。任何故障、过温或急停都会触发自动阻尼。",
                    en: "On first power-up, run start_robot.sh dry to validate CAN, IMU and joystick bridges before loading a policy. Any fault, over-temperature or E-Stop triggers automatic damping.",
                  })}
                </p>
              </div>

              <a
                href={`${REPO("OpenDoge_origin")}#quick-start`}
                target="_blank"
                rel="noreferrer"
                className="group card card-hover flex items-center gap-3 p-5"
              >
                <BookOpen className="h-4.5 w-4.5 text-mint-300" />
                <div className="min-w-0 flex-1">
                  <div className="text-[13.5px] font-semibold text-white">{t({ zh: "阅读完整 README", en: "Read the full README" })}</div>
                  <div className="truncate font-mono text-[11px] text-zinc-500">OpenDoge_origin / README_cn.md</div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-mint-300" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
