import { ArrowUpRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import cadImg from "@/assets/cad-exploded.jpg";
import simImg from "@/assets/sim-training.jpg";
import { REPO, STAGES } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { cn } from "@/utils/cn";
import { CodeBlock } from "./ui/CodeBlock";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const AUTO_MS = 6500;

type Visual = { type: "image"; src: string; alt: string } | { type: "code"; code: string; title: string };

const VISUALS: Record<string, Visual> = {
  mech: { type: "image", src: cadImg, alt: "Exploded view of an OpenDoge leg module" },
  desc: {
    type: "code",
    title: "OpenDoge_description/URDF",
    code: `urdf/
├── Opendoge.urdf        # 运动学 & 动力学模型
└── Opendoge.csv         # 关节/连杆映射表
meshes/
├── base_link.STL
├── FL_{hip,thigh,calf,foot}.STL
├── FR_{hip,thigh,calf,foot}.STL
├── RL_{hip,thigh,calf,foot}.STL
└── RR_{hip,thigh,calf,foot}.STL
launch/
├── display.launch       # RViz
└── gazebo.launch        # Gazebo
xml/
├── Opendoge.xml         # MuJoCo MJCF
└── scene.xml`,
  },
  train: { type: "image", src: simImg, alt: "Thousands of OpenDoge robots training in parallel simulation" },
  sim2sim: {
    type: "code",
    title: "deploy/deploy_mujoco",
    code: `conda activate himloco

# 键盘控制 Sim2Sim
python deploy/deploy_mujoco/deploy_opendoge.py

# Xbox 手柄控制 Sim2Sim
python deploy/deploy_mujoco/deploy_opendoge_xbox.py

# 指定 ONNX 模型（推荐：全向策略 9000 轮）
python deploy/deploy_mujoco/deploy_opendoge.py \\
  --onnx onnx/flat_opendoge_9000_omni.onnx`,
  },
  deploy: {
    type: "code",
    title: "opendoge_deploy · control loop",
    code: `opendoge_deploy (single process)
  → CPU ONNX policy inference      @  100 Hz
  → Position target hold           @  200 Hz
  → EL05 q/dq/tau/kp/kd control    @ 1000 Hz
  → SocketCAN can0 / can1 / can2 / can3
  → USB-to-4×CAN adapter
  → 12× EL05 / RobStride motors

can0: FL  motors  1/2/3   = hip/thigh/calf
can1: FR  motors  4/5/6   = hip/thigh/calf
can2: RL  motors  7/8/9   = hip/thigh/calf
can3: RR  motors 10/11/12 = hip/thigh/calf`,
  },
};

export function Pipeline() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Only auto-advance while the section is on screen and the user hasn't taken control.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const id = window.setTimeout(() => {
      setActive((a) => (a + 1) % STAGES.length);
      setProgressKey((k) => k + 1);
    }, AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, inView]);

  const select = (i: number) => {
    setActive(i);
    setPaused(true);
  };

  const stage = STAGES[active];
  const visual = VISUALS[stage.id];

  return (
    <section id="pipeline" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t({ zh: "系统架构", en: "Architecture" })}
          title={t({ zh: "一条链路，从零件到行走", en: "One pipeline, from parts to walking" })}
          desc={t({
            zh: "五个仓库、五个阶段，首尾相接。每个阶段的输出就是下一阶段的输入：STEP → URDF/MJCF → 策略 → ONNX → CAN 帧。",
            en: "Five repositories, five stages, chained end to end. Each stage's output is the next stage's input: STEP → URDF/MJCF → policy → ONNX → CAN frames.",
          })}
        />

        {/* Stepper */}
        <Reveal>
          <div className="relative">
            <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <ol className="relative grid min-w-[760px] grid-cols-5 gap-3 sm:min-w-0">
                {/* connector line */}
                <svg
                  className="pointer-events-none absolute left-[10%] right-[10%] top-[26px] h-px w-[80%] overflow-visible"
                  aria-hidden
                >
                  <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  <line
                    x1="0"
                    y1="0.5"
                    x2="100%"
                    y2="0.5"
                    stroke="rgba(52,211,153,0.55)"
                    strokeWidth="1"
                    strokeDasharray="6 18"
                    className="animate-dash"
                  />
                </svg>

                {STAGES.map((s, i) => {
                  const Icon = s.icon;
                  const isActive = i === active;
                  const isDone = i < active;
                  return (
                    <li key={s.id} className="relative">
                      <button
                        type="button"
                        onClick={() => select(i)}
                        className="group flex w-full flex-col items-center text-center focus:outline-none"
                        aria-current={isActive ? "step" : undefined}
                      >
                        <span
                          className={cn(
                            "relative flex h-[52px] w-[52px] items-center justify-center rounded-2xl border transition-all duration-300",
                            isActive
                              ? "border-mint-400 bg-mint-500 text-ink-950 shadow-[0_0_36px_-6px_rgba(52,211,153,0.9)] scale-105"
                              : isDone
                                ? "border-mint-500/40 bg-ink-850 text-mint-300"
                                : "border-white/10 bg-ink-850 text-zinc-400 group-hover:border-white/25 group-hover:text-zinc-200",
                          )}
                        >
                          {isDone && !isActive ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                          {isActive && !paused ? (
                            <span
                              key={progressKey}
                              className="absolute -bottom-2 left-1/2 h-0.5 w-8 -translate-x-1/2 overflow-hidden rounded-full bg-white/10"
                            >
                              <span
                                className="block h-full bg-mint-300"
                                style={{ animation: `progress ${AUTO_MS}ms linear forwards` }}
                              />
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-4 font-mono text-[10.5px] tracking-[0.2em] text-zinc-500">{s.index}</span>
                        <span
                          className={cn(
                            "mt-1 text-[14px] font-semibold transition-colors",
                            isActive ? "text-white" : "text-zinc-300",
                          )}
                        >
                          {t(s.title)}
                        </span>
                        <span className="mt-0.5 font-mono text-[11px] text-zinc-500">{t(s.short)}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </Reveal>

        {/* Detail panel */}
        <Reveal delay={120} className="mt-12">
          <div
            className="card grid gap-0 overflow-hidden lg:grid-cols-12"
            onMouseEnter={() => setPaused(true)}
          >
            <div key={stage.id} className="animate-fade-up min-w-0 p-7 md:p-10 lg:col-span-6">
              <div className="flex items-center gap-3">
                <span className="rounded-md border border-mint-500/30 bg-mint-500/10 px-2 py-0.5 font-mono text-[11px] text-mint-300">
                  {stage.index} / 05
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">{t(stage.short)}</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-[28px]">{t(stage.title)}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">{t(stage.desc)}</p>

              <ul className="mt-6 space-y-2.5">
                {stage.bullets.map((b) => (
                  <li key={b.en} className="flex items-start gap-3 text-[14px] text-zinc-300">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-mint-400" aria-hidden />
                    <span>{t(b)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-2">
                {stage.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-white/8 bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-zinc-400"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <a
                href={REPO(stage.repo)}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-1.5 text-[14px] font-medium text-mint-300 hover:text-mint-200"
              >
                <span className="font-mono">{stage.repo}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="relative min-h-[320px] min-w-0 border-t border-white/6 bg-ink-900/60 lg:col-span-6 lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-grid-fine opacity-60" aria-hidden />
              <div key={`${stage.id}-visual`} className="animate-fade-up relative flex h-full items-center justify-center p-6 md:p-8">
                {visual.type === "image" ? (
                  <img
                    src={visual.src}
                    alt={visual.alt}
                    className="max-h-[440px] w-full rounded-xl border border-white/10 object-cover shadow-2xl shadow-black/50"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <CodeBlock code={visual.code} title={visual.title} className="w-full" compact />
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>
    </section>
  );
}
