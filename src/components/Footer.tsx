import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CORE_REPOS, ECOSYSTEM_REPOS } from "@/data/repos";
import { GITHUB_ORG, NAV_LINKS, REPO } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { GithubIcon } from "./ui/Icons";
import { Logo, LogoMark } from "./ui/Logo";
import { Reveal } from "./ui/Reveal";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative">
      {/* CTA */}
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-mint-500/25 bg-ink-900 px-7 py-14 text-center md:px-12 md:py-20">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-60 mask-fade-radial" aria-hidden />
            <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint-500/20 blur-[120px]" aria-hidden />
            <div className="relative">
              <LogoMark className="mx-auto h-14 w-14 shadow-[0_0_60px_-10px_rgba(52,211,153,0.9)]" />
              <h2 className="mt-7 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                {t({ zh: "准备好造一只自己的机器狗了吗？", en: "Ready to build your own robot dog?" })}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-400 md:text-lg">
                {t({
                  zh: "克隆仓库、打印零件、训练策略、上电行走。所有设计文件、代码与预训练模型均已开源。",
                  en: "Clone the repos, print the parts, train a policy, power on and walk. Every design file, line of code and pre-trained model is open.",
                })}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={GITHUB_ORG}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-mint-500 px-6 py-3 text-[14.5px] font-semibold text-ink-950 shadow-[0_0_40px_-10px_rgba(52,211,153,0.9)] transition-all hover:bg-mint-400"
                >
                  <GithubIcon className="h-4.5 w-4.5" />
                  github.com/OpenDogeRobotics
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#quickstart"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-[14.5px] font-medium text-zinc-200 transition-colors hover:border-white/25"
                >
                  {t({ zh: "查看快速开始", en: "See quick start" })}
                </a>
              </div>
              <pre className="mx-auto mt-8 inline-block rounded-lg border border-white/8 bg-ink-950/80 px-4 py-2.5 text-left font-mono text-[12px] text-zinc-400">
                <span className="text-mint-300">git</span> clone https://github.com/OpenDogeRobotics/OpenDoge_origin.git
              </pre>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Footer body */}
      <div className="border-t border-white/8 bg-ink-900/40">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <Logo />
              <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-zinc-500">
                {t({
                  zh: "开源的小型四足机器人项目 —— 低成本、可复现、端到端。",
                  en: "An open-source mini quadruped robot — low-cost, reproducible, end-to-end.",
                })}
              </p>
              <a
                href={GITHUB_ORG}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[13px] text-zinc-400 transition-colors hover:text-white"
              >
                <GithubIcon className="h-4 w-4" />
                OpenDogeRobotics
                <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
              </a>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">{t({ zh: "导航", en: "Site" })}</h4>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((n) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} className="text-[13.5px] text-zinc-400 transition-colors hover:text-white">
                      {t(n.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">{t({ zh: "核心仓库", en: "Core repos" })}</h4>
              <ul className="mt-4 space-y-2.5">
                {CORE_REPOS.map((r) => (
                  <li key={r.name}>
                    <a
                      href={REPO(r.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[12.5px] text-zinc-400 transition-colors hover:text-mint-300"
                    >
                      {r.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">{t({ zh: "生态与教程", en: "Ecosystem" })}</h4>
              <ul className="mt-4 space-y-2.5">
                {ECOSYSTEM_REPOS.map((r) => (
                  <li key={r.name}>
                    <a
                      href={REPO(r.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-[12.5px] text-zinc-400 transition-colors hover:text-mint-300"
                    >
                      {r.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/6 pt-6 text-[12px] text-zinc-500 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} OpenDogeRobotics · OpenDoge</p>
            <p className="font-mono text-[11.5px]">
              {t({
                zh: "各子模块分别遵循其自身的开源许可证：MIT · Apache-2.0 · BSD",
                en: "Each submodule follows its own open-source license: MIT · Apache-2.0 · BSD",
              })}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
