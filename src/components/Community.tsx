import { ArrowUpRight, BookOpen, Bug, GitPullRequest, GraduationCap, Heart, Star } from "lucide-react";
import { ACKS, GITHUB_ORG, REPO } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { GithubIcon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const ROS2_CHAPTERS = [
  "01 安装",
  "02 Turtlesim",
  "03 First Demo",
  "04 Interfaces",
  "05 Launch",
  "06 TF2",
  "07 URDF",
  "08 DDS",
  "09 Testing",
  "10 RViz",
  "11 Simulation",
  "12 rosbag2",
];

export function Community() {
  const { t } = useLang();

  const contribute = [
    {
      icon: Star,
      title: t({ zh: "Star 支持项目", en: "Star the project" }),
      desc: t({ zh: "让更多人看到这只开源机器狗。", en: "Help more people discover this open-source robot dog." }),
      href: REPO("OpenDoge_origin"),
      cta: "OpenDoge_origin",
    },
    {
      icon: Bug,
      title: t({ zh: "提交 Issue", en: "File an issue" }),
      desc: t({ zh: "发现代码或文档问题？欢迎在对应仓库提交 Issue。", en: "Found a bug or a docs gap? Open an issue in the matching repo." }),
      href: `${GITHUB_ORG}?tab=repositories`,
      cta: t({ zh: "选择仓库", en: "Pick a repo" }),
    },
    {
      icon: GitPullRequest,
      title: t({ zh: "贡献 Pull Request", en: "Send a pull request" }),
      desc: t({ zh: "新示例、修复、教程 —— 每一份贡献都会被认真审阅。", en: "New examples, fixes, tutorials — every contribution gets a careful review." }),
      href: GITHUB_ORG,
      cta: "OpenDogeRobotics",
    },
  ];

  return (
    <section id="community" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t({ zh: "教程与社区", en: "Tutorials & community" })}
          title={t({ zh: "不只是代码，还有一整套学习路径", en: "More than code — a complete learning path" })}
          desc={t({
            zh: "OpenDogeRobotics 同时维护面向初学者的具身机器狗制作教程与中文 ROS 2 实战课程，帮助你从零起步。",
            en: "OpenDogeRobotics also maintains a beginner-friendly embodied-robot-dog build course and a hands-on Chinese ROS 2 curriculum to get you started from zero.",
          })}
        />

        {/* Tutorials */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal>
            <a
              href={REPO("GOUJIAO")}
              target="_blank"
              rel="noreferrer"
              className="group card card-hover relative flex h-full flex-col overflow-hidden p-7 md:p-9"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-mint-500/15 blur-3xl transition-opacity group-hover:opacity-100" aria-hidden />
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-mint-500/30 bg-mint-500/10 px-2.5 py-1 font-mono text-[11px] text-mint-300">
                  <GraduationCap className="h-3.5 w-3.5" />
                  {t({ zh: "系列教程", en: "Course" })}
                </span>
                <ArrowUpRight className="h-5 w-5 text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint-300" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white md:text-[28px]">
                {t({ zh: "《精品大狗不可能不叫》", en: "“GOUJIAO” — A Fine Big Dog Can't Not Bark" })}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
                {t({
                  zh: "带你从零开始，制作设计具身机器狗。从机械、电控到强化学习与部署，按章节循序渐进，配合 OpenDoge 仓库实操。",
                  en: "From zero to your own embodied robot dog — mechanics, electronics, reinforcement learning and deployment, chapter by chapter, hands-on with the OpenDoge repos.",
                })}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
                {["GOUJIAO", "MDX", "Fumadocs", "Next.js"].map((tag) => (
                  <span key={tag} className="rounded border border-white/8 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10.5px] text-zinc-400">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>

          <Reveal delay={100}>
            <a
              href={REPO("BEEF-ROS2")}
              target="_blank"
              rel="noreferrer"
              className="group card card-hover relative flex h-full flex-col overflow-hidden p-7 md:p-9"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sky-400/12 blur-3xl" aria-hidden />
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-1 font-mono text-[11px] text-sky-300">
                  <BookOpen className="h-3.5 w-3.5" />
                  ROS 2 · 12 {t({ zh: "章", en: "chapters" })}
                </span>
                <ArrowUpRight className="h-5 w-5 text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white md:text-[28px]">
                BEEF-ROS2
                <span className="ml-3 align-middle text-base font-medium text-zinc-400">
                  {t({ zh: "也许是第二好的中文 ROS 2 教程！", en: "Maybe the 2nd-best Chinese ROS 2 tutorial!" })}
                </span>
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-400">
                {t({
                  zh: "实战型 ROS 2 教程与代码示例：一键安装脚本、C++ / Python 双版本节点、TF2、Launch、DDS、测试调试与 rosbag2。",
                  en: "A hands-on ROS 2 course with code: one-shot install script, C++ / Python twin nodes, TF2, Launch, DDS, testing and rosbag2.",
                })}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-7">
                {ROS2_CHAPTERS.map((c) => (
                  <span key={c} className="rounded border border-white/8 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10.5px] text-zinc-400">
                    {c}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>
        </div>

        {/* Contribute */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {contribute.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 80}>
                <a href={c.href} target="_blank" rel="noreferrer" className="group card card-hover flex h-full flex-col p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/8 bg-ink-900 text-mint-300">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h4 className="mt-4 text-[15px] font-semibold text-white">{c.title}</h4>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">{c.desc}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-[12px] text-zinc-500 transition-colors group-hover:text-mint-300">
                    <GithubIcon className="h-3.5 w-3.5" />
                    {c.cta}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* Acknowledgments */}
        <Reveal className="mt-16">
          <div className="rounded-2xl border border-white/8 bg-gradient-to-br from-ink-850/80 to-ink-900/40 p-7 md:p-9">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="max-w-sm">
                <span className="eyebrow">
                  <Heart className="h-3.5 w-3.5" />
                  {t({ zh: "致谢", en: "Acknowledgments" })}
                </span>
                <p className="mt-3 text-[14px] leading-relaxed text-zinc-400">
                  {t({
                    zh: "OpenDoge 站在这些开源工作的肩膀上，感谢它们的启发与支持。",
                    en: "OpenDoge stands on the shoulders of these open-source projects — thank you for the inspiration and support.",
                  })}
                </p>
              </div>
              <ul className="grid flex-1 gap-2.5 sm:grid-cols-2">
                {ACKS.map((a) => {
                  const inner = (
                    <>
                      <div className="min-w-0">
                        <div className="truncate font-mono text-[13px] font-semibold text-white">{a.name}</div>
                        <div className="text-[12px] text-zinc-500">{t(a.desc)}</div>
                      </div>
                      {a.href ? <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-600 transition-colors group-hover:text-mint-300" /> : null}
                    </>
                  );
                  return (
                    <li key={a.name}>
                      {a.href ? (
                        <a
                          href={a.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-between gap-3 rounded-xl border border-white/6 bg-ink-950/50 px-4 py-3 transition-colors hover:border-mint-500/30"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/6 bg-ink-950/50 px-4 py-3">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
