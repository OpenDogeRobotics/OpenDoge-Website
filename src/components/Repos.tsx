import { ArrowUpRight, GitFork, Scale } from "lucide-react";
import { CORE_REPOS, ECOSYSTEM_REPOS, REPO_TREE, REPO_TREE_EN, type Repo } from "@/data/repos";
import { GITHUB_ORG, REPO } from "@/data/site";
import { useLang } from "@/lib/i18n";
import { cn } from "@/utils/cn";
import { CodeBlock } from "./ui/CodeBlock";
import { GithubIcon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

function RepoMeta({ repo }: { repo: Repo }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[11px] text-zinc-500">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: repo.langColor }} aria-hidden />
        {repo.lang}
      </span>
      {repo.license ? (
        <span className="inline-flex items-center gap-1.5">
          <Scale className="h-3 w-3" />
          {repo.license}
        </span>
      ) : null}
    </div>
  );
}

function RepoCard({ repo, className, featured = false }: { repo: Repo; className?: string; featured?: boolean }) {
  const { t, lang } = useLang();
  return (
    <a
      href={REPO(repo.name)}
      target="_blank"
      rel="noreferrer"
      className={cn("group card card-hover relative flex h-full flex-col p-6", className)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <GithubIcon className="h-4 w-4 shrink-0 text-zinc-500 transition-colors group-hover:text-mint-300" />
            <h3 className="truncate font-mono text-[15px] font-semibold text-white">{repo.name}</h3>
          </div>
          <p className="mt-1.5 text-[13px] font-medium text-mint-300/90">{t(repo.tagline)}</p>
        </div>
        <ArrowUpRight className="h-4.5 w-4.5 shrink-0 text-zinc-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint-300" />
      </div>

      <p className="mt-4 text-[13.5px] leading-relaxed text-zinc-400">{t(repo.desc)}</p>

      {featured ? (
        <div className="mt-5">
          <CodeBlock code={lang === "zh" ? REPO_TREE : REPO_TREE_EN} title="OpenDoge/" compact highlight={false} />
        </div>
      ) : null}

      {repo.facts ? (
        <dl className="mt-5 grid grid-cols-3 divide-x divide-white/6 overflow-hidden rounded-xl border border-white/8 bg-ink-950/50">
          {repo.facts.map((f) => (
            <div key={f.k.en} className="px-3 py-2.5">
              <dd className="truncate font-mono text-[13px] font-semibold text-white">{f.v}</dd>
              <dt className="mt-0.5 truncate text-[10.5px] text-zinc-500">{t(f.k)}</dt>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap gap-1.5">
          {repo.tags.map((tag) => (
            <span key={tag} className="rounded border border-white/8 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10.5px] text-zinc-400">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 border-t border-white/6 pt-4">
          <RepoMeta repo={repo} />
        </div>
      </div>
    </a>
  );
}

export function Repos() {
  const { t } = useLang();
  const [origin, hardware, description, firmware, train] = CORE_REPOS;

  return (
    <section id="repos" className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={t({ zh: "代码仓库", en: "Repositories" })}
          title={t({ zh: "五个核心仓库，一个完整机器人", en: "Five core repositories, one complete robot" })}
          desc={t({
            zh: "硬件、描述、固件、训练与文档各自独立演进，通过 URDF 与 ONNX 两个契约彼此衔接。",
            en: "Hardware, description, firmware, training and docs evolve independently, glued together by two contracts: URDF and ONNX.",
          })}
          action={
            <a
              href={GITHUB_ORG}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-zinc-200 transition-colors hover:border-mint-500/40 hover:text-white"
            >
              <GitFork className="h-4 w-4" />
              github.com/OpenDogeRobotics
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
            </a>
          }
        />

        {/* Bento */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <RepoCard repo={origin} featured />
          </Reveal>
          <Reveal delay={80}>
            <RepoCard repo={hardware} />
          </Reveal>
          <Reveal delay={0}>
            <RepoCard repo={description} />
          </Reveal>
          <Reveal delay={80}>
            <RepoCard repo={firmware} />
          </Reveal>
          <Reveal delay={160}>
            <RepoCard repo={train} />
          </Reveal>
        </div>

        {/* Ecosystem */}
        <Reveal className="mt-14">
          <div className="mb-5 flex items-center gap-3">
            <h3 className="text-[15px] font-semibold text-white">{t({ zh: "生态与教程仓库", en: "Ecosystem & tutorials" })}</h3>
            <span className="h-px flex-1 bg-white/8" />
            <span className="font-mono text-[11px] text-zinc-500">{ECOSYSTEM_REPOS.length} repos</span>
          </div>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ECOSYSTEM_REPOS.map((repo, i) => (
            <Reveal key={repo.name} delay={i * 60}>
              <a
                href={REPO(repo.name)}
                target="_blank"
                rel="noreferrer"
                className="group card card-hover flex h-full flex-col p-5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-mono text-[13px] font-semibold text-white">{repo.name}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-600 transition-colors group-hover:text-mint-300" />
                </div>
                <p className="mt-2 text-[12.5px] font-medium leading-snug text-mint-300/80">{t(repo.tagline)}</p>
                <p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-zinc-500">{t(repo.desc)}</p>
                <div className="mt-auto pt-4">
                  <RepoMeta repo={repo} />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
