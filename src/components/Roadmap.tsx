import { Check, CircleDashed, Loader } from "lucide-react";
import { ROADMAP, ROADMAP_STATUS_LABEL, type RoadmapStatus } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { cn } from "@/utils/cn";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const ORDER: RoadmapStatus[] = ["done", "progress", "planned"];

const STYLE: Record<RoadmapStatus, { dot: string; pill: string; icon: typeof Check; col: string }> = {
  done: {
    dot: "bg-mint-500 text-ink-950",
    pill: "border-mint-500/40 bg-mint-500/10 text-mint-300",
    icon: Check,
    col: "from-mint-500/50",
  },
  progress: {
    dot: "bg-amber-400 text-ink-950",
    pill: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    icon: Loader,
    col: "from-amber-400/50",
  },
  planned: {
    dot: "border border-white/20 bg-ink-900 text-zinc-500",
    pill: "border-white/10 bg-white/[0.03] text-zinc-400",
    icon: CircleDashed,
    col: "from-white/20",
  },
};

export function Roadmap() {
  const { t } = useLang();
  const done = ROADMAP.filter((r) => r.status === "done").length;
  const progress = ROADMAP.filter((r) => r.status === "progress").length;
  const pct = Math.round((done / ROADMAP.length) * 100);

  return (
    <section id="roadmap" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t({ zh: "开发路线图", en: "Roadmap" })}
          title={t({ zh: "已经跑通的，和接下来要做的", en: "What's working, and what's next" })}
          desc={t({
            zh: "硬件、模型、固件、训练与 Sim2Sim 五个基础模块已经就绪；下一步是专属训练配置与实机稳定行走，最终发布包含完整 BOM 与组装教程的 v1.0。",
            en: "Hardware, model, firmware, training and Sim2Sim are in place; next up are the hardware-tuned training config and stable real-robot walking, leading to a v1.0 release with full BOM and build guide.",
          })}
          action={
            <div className="w-full min-w-[240px] rounded-xl border border-white/8 bg-ink-850/70 p-4 md:w-auto">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                    {t({ zh: "总体进度", en: "Overall progress" })}
                  </div>
                  <div className="mt-1 font-mono text-2xl font-semibold text-white">
                    {done}
                    <span className="text-zinc-600"> / {ROADMAP.length}</span>
                  </div>
                </div>
                <div className="font-mono text-[12px] text-mint-300">{pct}%</div>
              </div>
              <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <span className="h-full bg-mint-500" style={{ width: `${pct}%` }} />
                <span className="h-full bg-amber-400/70" style={{ width: `${(progress / ROADMAP.length) * 100}%` }} />
              </div>
            </div>
          }
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {ORDER.map((status, colIdx) => {
            const items = ROADMAP.filter((r) => r.status === status);
            const s = STYLE[status];
            const Icon = s.icon;
            return (
              <Reveal key={status} delay={colIdx * 100}>
                <div className="card relative h-full overflow-hidden">
                  <div className={cn("absolute inset-x-0 top-0 h-px bg-gradient-to-r to-transparent", s.col)} aria-hidden />
                  <div className="flex items-center justify-between border-b border-white/6 px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <span className={cn("flex h-6 w-6 items-center justify-center rounded-full", s.dot)}>
                        <Icon className={cn("h-3.5 w-3.5", status === "progress" && "animate-spin [animation-duration:3s]")} />
                      </span>
                      <h3 className="text-[14px] font-semibold text-white">{t(ROADMAP_STATUS_LABEL[status])}</h3>
                    </div>
                    <span className="font-mono text-[11px] text-zinc-500">{items.length}</span>
                  </div>
                  <ul className="space-y-2.5 p-4">
                    {items.map((item, i) => (
                      <li
                        key={item.title.en}
                        className={cn(
                          "rounded-xl border border-white/6 bg-ink-950/50 p-4 transition-colors hover:border-white/15",
                          status === "planned" && "opacity-80",
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-[14px] font-semibold text-white">{t(item.title)}</h4>
                          <span className="shrink-0 font-mono text-[10.5px] text-zinc-600">
                            {String(ROADMAP.indexOf(item) + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-zinc-400">{t(item.desc)}</p>
                        {status === "progress" && i === 0 ? (
                          <span className={cn("mt-3 inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[10.5px]", s.pill)}>
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                            </span>
                            {t({ zh: "当前焦点", en: "Current focus" })}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
