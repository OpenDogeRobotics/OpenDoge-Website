import { useMemo, useState } from "react";
import { FlaskConical, Gauge, Layers3, ShieldCheck, Waypoints } from "lucide-react";
import {
  COST_CATEGORIES,
  COST_ITEMS,
  COST_PRESETS,
  applyPreset,
  costTotals,
  countParts,
  fmtCny,
  unitPrice,
  type CostPresetId,
  type CostState,
} from "@/data/cost";
import { REPO } from "@/data/site";
import { l, useLang } from "@/lib/i18n";
import { cn } from "@/utils/cn";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const PRESET_ICONS = { flask: FlaskConical, shield: ShieldCheck, waypoints: Waypoints } as const;

function CardHeader({ icon: Icon, title, meta }: { icon: typeof Gauge; title: string; meta: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/6 px-6 py-4">
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-mint-300" />
        <h3 className="text-[14px] font-semibold text-white">{title}</h3>
      </div>
      <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">{meta}</span>
    </div>
  );
}

function Switch({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full border transition-colors",
        on ? "border-mint-500/70 bg-mint-500/90" : "border-white/15 bg-white/5",
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full transition-all",
          on ? "left-[17px] bg-ink-950" : "left-[3px] bg-zinc-500",
        )}
      />
    </span>
  );
}

export function CostEstimator() {
  const { t } = useLang();
  const [preset, setPreset] = useState<CostPresetId | null>("std");
  const [state, setState] = useState<CostState>(() => applyPreset("std"));

  const totals = useMemo(() => costTotals(state), [state]);
  const partCount = useMemo(() => countParts(state), [state]);
  const presetTotals = useMemo(
    () => Object.fromEntries(COST_PRESETS.map((p) => [p.id, costTotals(applyPreset(p.id)).cost])),
    [],
  );

  const optionalItems = useMemo(() => COST_ITEMS.filter((item) => !item.required), []);
  const activeOptional = optionalItems.filter((item) => state.on[item.id]);
  const actuatorShare = totals.cost > 0 ? Math.round(((totals.byCat.actuator ?? 0) / totals.cost) * 100) : 0;

  const patch = (fn: (next: CostState) => void) =>
    setState((prev) => {
      const next: CostState = { qty: { ...prev.qty }, on: { ...prev.on }, edulite: prev.edulite };
      fn(next);
      return next;
    });

  const onPreset = (id: CostPresetId) => {
    setPreset(id);
    setState(applyPreset(id));
  };

  const onToggle = (id: string) => {
    setPreset(null);
    patch((next) => {
      next.on[id] = !next.on[id];
    });
  };

  const onMotor = (edulite: boolean) => {
    setPreset(null);
    patch((next) => {
      next.edulite = edulite;
    });
  };

  return (
    <section id="cost" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-fine mask-fade-radial opacity-30" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t(l("硬件报价", "Hardware cost"))}
          title={t(l("选配即报价，整机成本实时估算", "Configure it, price it — live BOM estimate"))}
          desc={t({
            zh: "基于 8 大类 27 项物料清单与 2026 年市场预估价：切换电机型号、勾选选配，总价与成本结构实时重算。价格为预算参考，不含运费、损耗与工具。",
            en: "Based on a 27-line BOM across 8 categories and 2026 street prices: switch the motor variant or toggle add-ons and the total recalculates live. Budget reference only — shipping, attrition and tools extra.",
          })}
          action={
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-zinc-400">
              <Gauge className="h-3.5 w-3.5 text-mint-400" />
              {t(l("2026 市场预估价", "2026 street prices"))}
            </span>
          }
        />

        {/* Presets */}
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          {COST_PRESETS.map((p, i) => {
            const Icon = PRESET_ICONS[p.icon];
            const active = preset === p.id;
            return (
              <Reveal key={p.id} delay={i * 60}>
                <button
                  type="button"
                  onClick={() => onPreset(p.id)}
                  aria-pressed={active}
                  className={cn(
                    "card card-hover group h-full w-full p-5 text-left",
                    active && "border-mint-500/60 bg-mint-500/[0.07]",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg border transition-colors",
                        active
                          ? "border-mint-500/60 bg-mint-500/15 text-mint-300"
                          : "border-white/8 text-zinc-500 group-hover:text-mint-300",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[10px] tracking-[0.18em]",
                        active ? "text-mint-300" : "text-zinc-600",
                      )}
                    >
                      {active ? "● " : ""}
                      {p.en}
                    </span>
                  </div>
                  <div className="mt-3.5 text-[14px] font-semibold text-white">{t(p.name)}</div>
                  <p className="mt-1 text-[12px] leading-relaxed text-zinc-500">{t(p.desc)}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag.en}
                        className="rounded border border-white/8 bg-ink-950/60 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500"
                      >
                        {t(tag)}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between border-t border-white/6 pt-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                      {t(l("预估", "Estimate"))}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[16px] font-semibold tabular-nums",
                        active ? "text-mint-300" : "text-white",
                      )}
                    >
                      {fmtCny(presetTotals[p.id])}
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Left: configuration + breakdown */}
          <div className="space-y-4 lg:col-span-7">
            <Reveal>
              <div className="card overflow-hidden">
                <CardHeader
                  icon={Gauge}
                  title={t(l("配置选项", "Configuration"))}
                  meta={t(l("实时重算", "live"))}
                />

                {/* Motor variant */}
                <div className="border-b border-white/6 px-6 py-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-[13px] font-medium text-zinc-200">{t(l("关节电机型号", "Joint motor variant"))}</div>
                      <div className="mt-0.5 text-[11.5px] text-zinc-500">
                        {t(l(
                          "RS05 官方款 ¥499 / EL05 经济款 ¥399 · 差价在 12 个电机上放大",
                          "RS05 ¥499 vs EL05 ¥399 — multiplied across 12 motors",
                        ))}
                      </div>
                    </div>
                    <div className="inline-flex rounded-lg border border-white/10 bg-ink-950/60 p-0.5">
                      {[
                        { value: false, label: l("RS05 · ¥499", "RS05 · ¥499") },
                        { value: true, label: l("EL05 · ¥399", "EL05 · ¥399") },
                      ].map((option) => (
                        <button
                          key={option.label.en}
                          type="button"
                          onClick={() => onMotor(option.value)}
                          aria-pressed={state.edulite === option.value}
                          className={cn(
                            "rounded-md px-3 py-1.5 font-mono text-[11px] transition-colors",
                            state.edulite === option.value
                              ? "bg-mint-500 font-semibold text-ink-950"
                              : "text-zinc-400 hover:text-white",
                          )}
                        >
                          {t(option.label)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Optional add-ons */}
                <ul className="divide-y divide-white/6">
                  {optionalItems.map((item) => {
                    const on = state.on[item.id];
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => onToggle(item.id)}
                          aria-pressed={on}
                          className={cn(
                            "flex w-full items-center gap-4 px-6 py-3.5 text-left transition-colors hover:bg-white/[0.03]",
                            !on && "opacity-55",
                          )}
                        >
                          <Switch on={on} />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[13px] font-medium text-zinc-200">{t(item.name)}</span>
                            <span className="mt-0.5 block truncate text-[11.5px] text-zinc-500">{t(item.spec)}</span>
                          </span>
                          <span className="shrink-0 text-right">
                            <span className="block font-mono text-[12.5px] tabular-nums text-zinc-300">
                              {fmtCny(unitPrice(item, state))}
                            </span>
                            <span className="block font-mono text-[10px] text-zinc-600">
                              {on ? t(l("已计入", "included")) : t(l("未计入", "excluded"))}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <p className="border-t border-white/6 px-6 py-3 font-mono text-[10.5px] leading-relaxed text-zinc-600">
                  {t(l(
                    "其余 22 项为必需件，已固定计入预算，数量为设计定值。",
                    "The other 22 lines are required and always included at fixed design quantities.",
                  ))}
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="card overflow-hidden">
                <CardHeader
                  icon={Layers3}
                  title={t(l("成本构成", "Cost breakdown"))}
                  meta={`${COST_CATEGORIES.length} ${t(l("类", "groups"))} · ${partCount} ${t(l("件", "parts"))}`}
                />
                <ul className="divide-y divide-white/6">
                  {COST_CATEGORIES.map((category) => {
                    const amount = totals.byCat[category.id] ?? 0;
                    const share = totals.cost > 0 ? (amount / totals.cost) * 100 : 0;
                    return (
                      <li key={category.id} className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: category.color }}
                            aria-hidden
                          />
                          <span className="min-w-0 flex-1 truncate text-[12.5px] text-zinc-300">
                            {t(category.name)}
                          </span>
                          <span className="font-mono text-[10.5px] tabular-nums text-zinc-600">
                            {share.toFixed(0)}%
                          </span>
                          <span className="w-20 text-right font-mono text-[12px] tabular-nums text-zinc-200">
                            {fmtCny(amount)}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className="h-full rounded-full transition-[width] duration-500"
                            style={{ width: `${Math.max(share, 0.8)}%`, background: category.color }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right: live summary */}
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-24">
              <div className="card overflow-hidden">
                <div className="border-b border-white/6 px-6 py-4">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                    {t(l("整套硬件预估", "Estimated BOM"))}
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-semibold tracking-tight text-white tabular-nums">
                      {fmtCny(totals.cost)}
                    </span>
                    <span className="text-[12px] text-zinc-500">CNY</span>
                  </div>
                  <div className="mt-1.5 font-mono text-[11.5px] text-zinc-500">
                    {t(l("价格区间", "Range"))}: {fmtCny(totals.low)} – {fmtCny(totals.high)}
                  </div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-white/6 border-b border-white/6">
                  {[
                    { label: l("采买件数", "Parts"), value: `${partCount}` },
                    { label: l("选配项", "Add-ons"), value: `${activeOptional.length}/${optionalItems.length}` },
                    { label: l("电机型号", "Motor"), value: state.edulite ? "EL05" : "RS05" },
                    { label: l("执行器占比", "Actuators"), value: `${actuatorShare}%` },
                  ].map((stat, i) => (
                    <div key={stat.label.en} className={cn("px-6 py-4", i >= 2 && "border-t border-white/6")}>
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                        {t(stat.label)}
                      </div>
                      <div className="mt-1 font-mono text-[16px] font-semibold text-white tabular-nums">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>

                {activeOptional.length > 0 && (
                  <div className="border-b border-white/6 px-6 py-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                      {t(l("已选选配", "Selected add-ons"))}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {activeOptional.map((item) => (
                        <span
                          key={item.id}
                          className="rounded-md border border-mint-500/25 bg-mint-500/[0.06] px-2 py-0.5 text-[11px] text-mint-200"
                        >
                          {t(item.name)}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="px-6 py-4">
                  <p className="text-[11.5px] leading-relaxed text-zinc-500">
                    {t(l(
                      "价格来源：OpenDoge_hardware 规格书、GOUJIAO 硬件篇与 RobStride 官方指导价；为 2026 年市场预估价，仅供预算参考。",
                      "Sources: OpenDoge_hardware datasheets, the GOUJIAO hardware guide and RobStride list prices. 2026 street estimates for budgeting only.",
                    ))}
                  </p>
                  <a
                    href={REPO("OpenDoge_hardware")}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11.5px] text-mint-300 transition-colors hover:text-mint-200"
                  >
                    {t(l("查看 BOM 与硬件资料", "Browse the hardware repo"))}
                    <span aria-hidden>↗</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
