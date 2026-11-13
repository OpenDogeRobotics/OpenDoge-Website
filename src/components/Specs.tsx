import { Activity, Cable, Cpu, Sparkles } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  DEPLOY_CHAIN,
  JOINT_LABEL,
  JOINT_SEGMENTS,
  LEGS,
  ONNX_MODELS,
  PD_PARAMS,
  POLICY_BACKENDS,
  type LegId,
} from "@/data/specs";
import { useLang } from "@/lib/i18n";
import { cn } from "@/utils/cn";
import { RobotDiagram } from "./RobotDiagram";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

function CardTitle({ icon: Icon, children, meta }: { icon: typeof Cpu; children: ReactNode; meta?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/6 px-6 py-4">
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 text-mint-300" />
        <h3 className="text-[14px] font-semibold text-white">{children}</h3>
      </div>
      {meta ? <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">{meta}</span> : null}
    </div>
  );
}

export function Specs() {
  const { t } = useLang();
  const [selected, setSelected] = useState<LegId>("FL");
  const [hovered, setHovered] = useState<LegId | null>(null);
  const active = hovered ?? selected;
  const leg = useMemo(() => LEGS.find((l) => l.id === active)!, [active]);

  return (
    <section id="specs" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dots mask-fade-radial opacity-40" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t({ zh: "技术规格", en: "Specifications" })}
          title={t({ zh: "12 个关节、4 路 CAN、三层控制频率", en: "12 joints, 4 CAN buses, three control rates" })}
          desc={t({
            zh: "每条 CAN 总线独立驱动一条腿的 3 个电机；策略、位置保持与运控帧以 100 / 200 / 1000 Hz 分层运行。点击或悬停腿部查看映射关系。",
            en: "Each CAN bus independently drives one leg's three motors; policy, target hold and motor frames run at 100 / 200 / 1000 Hz. Click or hover a leg to inspect its mapping.",
          })}
        />

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Joint / CAN map */}
          <Reveal className="lg:col-span-7">
            <div className="card h-full overflow-hidden">
              <CardTitle icon={Cable} meta="joint · can map">
                {t({ zh: "关节与 CAN 总线映射", en: "Joint & CAN bus mapping" })}
              </CardTitle>
              <div className="grid gap-6 p-6 md:grid-cols-2 md:items-center">
                <div className="relative mx-auto w-full max-w-[380px]">
                  <RobotDiagram active={active} onSelect={setSelected} onHover={setHovered} />
                </div>

                <div key={leg.id} className="animate-fade-up">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full shadow-[0_0_16px]" style={{ background: leg.color, color: leg.color }} aria-hidden />
                    <span className="font-mono text-lg font-semibold text-white">{leg.id}</span>
                    <span className="text-[14px] text-zinc-400">{t(leg.name)}</span>
                    <span className="ml-auto rounded-md border px-2 py-0.5 font-mono text-[11px]" style={{ borderColor: `${leg.color}55`, color: leg.color, background: `${leg.color}14` }}>
                      {leg.can}
                    </span>
                  </div>

                  <ul className="mt-5 divide-y divide-white/6 overflow-hidden rounded-xl border border-white/8 bg-ink-950/60">
                    {JOINT_SEGMENTS.map((seg, i) => (
                      <li key={seg} className="flex items-center gap-3 px-4 py-3">
                        <span
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md font-mono text-[12px] font-bold text-ink-950"
                          style={{ background: leg.color }}
                        >
                          {leg.motors[i]}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-mono text-[12.5px] text-zinc-200">
                            {leg.id}_{seg}_joint
                          </div>
                          <div className="text-[11.5px] text-zinc-500">{t(JOINT_LABEL[seg])}</div>
                        </div>
                        <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-600">{seg}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-3 px-4 py-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 font-mono text-[11px] text-zinc-500">
                        —
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-[12.5px] text-zinc-400">{leg.id}_foot</div>
                        <div className="text-[11.5px] text-zinc-600">{t({ zh: "足端（固定关节）", en: "Foot (fixed joint)" })}</div>
                      </div>
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-zinc-600">fixed</span>
                    </li>
                  </ul>

                  <div className="mt-4 grid grid-cols-4 gap-1.5" role="tablist" aria-label="Select leg">
                    {LEGS.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        role="tab"
                        aria-selected={selected === l.id}
                        onClick={() => setSelected(l.id)}
                        className={cn(
                          "rounded-lg border py-1.5 font-mono text-[12px] font-semibold transition-all",
                          selected === l.id
                            ? "border-transparent text-ink-950"
                            : "border-white/8 text-zinc-400 hover:border-white/20 hover:text-white",
                        )}
                        style={selected === l.id ? { background: l.color } : undefined}
                      >
                        {l.id}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Deployment chain */}
          <Reveal delay={100} className="lg:col-span-5">
            <div className="card h-full overflow-hidden">
              <CardTitle icon={Activity} meta="opendoge_deploy">
                {t({ zh: "实机部署链路", en: "Deployment pipeline" })}
              </CardTitle>
              <ol className="relative px-6 py-6">
                <span className="absolute bottom-10 left-[35px] top-10 w-px bg-gradient-to-b from-mint-500/60 via-white/15 to-amber-400/60" aria-hidden />
                {DEPLOY_CHAIN.map((node, i) => {
                  const tone =
                    node.kind === "software"
                      ? "border-mint-500/40 bg-mint-500/10 text-mint-300"
                      : node.kind === "bus"
                        ? "border-sky-400/40 bg-sky-400/10 text-sky-300"
                        : "border-amber-400/40 bg-amber-400/10 text-amber-300";
                  return (
                    <li key={node.label.en} className="relative flex items-center gap-4 py-2.5">
                      <span
                        className={cn(
                          "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-semibold",
                          tone,
                        )}
                      >
                        {i + 1}
                      </span>
                      <div className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-lg border border-white/6 bg-ink-950/50 px-3.5 py-2.5">
                        <span className="truncate text-[13px] text-zinc-200">{t(node.label)}</span>
                        {node.meta ? (
                          <span className="shrink-0 rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[11.5px] font-semibold text-white">
                            {node.meta}
                          </span>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 border-t border-white/6 px-6 py-3.5 font-mono text-[10.5px] text-zinc-500">
                <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-mint-400" />{t({ zh: "软件", en: "software" })}</span>
                <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-sky-400" />{t({ zh: "总线", en: "bus" })}</span>
                <span className="inline-flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-amber-400" />{t({ zh: "硬件", en: "hardware" })}</span>
              </div>
            </div>
          </Reveal>

          {/* PD parameters */}
          <Reveal className="lg:col-span-5">
            <div className="card h-full overflow-hidden">
              <CardTitle icon={Cpu} meta="train ↔ real">
                {t({ zh: "PD 参数对齐", en: "PD parameter alignment" })}
              </CardTitle>
              <table className="w-full text-left">
                <tbody className="divide-y divide-white/6">
                  {PD_PARAMS.map((p) => (
                    <tr key={p.key} className="group">
                      <td className="px-6 py-3 font-mono text-[12.5px] text-zinc-300">{p.key}</td>
                      <td className="px-3 py-3 text-right font-mono text-[13px] font-semibold text-white">{p.value}</td>
                      <td className="px-6 py-3 text-right text-[12px] text-zinc-500">{t(p.note)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="border-t border-white/6 px-6 py-3.5 text-[12px] leading-relaxed text-zinc-500">
                {t({
                  zh: "训练、Sim2Sim 与实机共用同一组增益与缩放，配置见 deploy/deploy_mujoco/configs/opendoge.yaml。",
                  en: "Training, Sim2Sim and hardware share the same gains and scaling — see deploy/deploy_mujoco/configs/opendoge.yaml.",
                })}
              </p>
            </div>
          </Reveal>

          {/* Policy backends + models */}
          <Reveal delay={100} className="lg:col-span-7">
            <div className="card h-full overflow-hidden">
              <CardTitle icon={Sparkles} meta="policy">
                {t({ zh: "策略后端与预训练模型", en: "Policy backends & pre-trained models" })}
              </CardTitle>
              <div className="grid gap-0 md:grid-cols-5">
                <div className="border-b border-white/6 p-6 md:col-span-2 md:border-b-0 md:border-r">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                    {t({ zh: "策略后端", en: "Backends" })}
                  </div>
                  <ul className="mt-3 space-y-2">
                    {POLICY_BACKENDS.map((b) => (
                      <li key={b.name} className="flex items-center justify-between gap-3 rounded-lg border border-white/6 bg-ink-950/50 px-3 py-2">
                        <code className="text-[12.5px] text-mint-300">{b.name}</code>
                        <span className="text-right text-[11.5px] text-zinc-500">{t(b.desc)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 md:col-span-3">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-zinc-500">
                    {t({ zh: "预训练 ONNX 策略", en: "Pre-trained ONNX policies" })}
                  </div>
                  <ul className="mt-3 space-y-2">
                    {ONNX_MODELS.map((m) => (
                      <li key={m.file} className="flex items-center gap-3 rounded-lg border border-white/6 bg-ink-950/50 px-3 py-2">
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-mono text-[12px] text-zinc-200">{m.file}</div>
                          <div className="text-[11.5px] text-zinc-500">{t(m.desc)}</div>
                        </div>
                        {m.recommended ? (
                          <span className="shrink-0 rounded-md border border-mint-500/40 bg-mint-500/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-mint-300">
                            {t({ zh: "推荐", en: "REC" })}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
