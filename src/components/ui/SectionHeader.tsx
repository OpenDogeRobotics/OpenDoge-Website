import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  desc?: ReactNode;
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
};

export function SectionHeader({ eyebrow, title, desc, align = "left", className, action }: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <Reveal className={cn("mb-12 md:mb-16", className)}>
      <div
        className={cn(
          "flex flex-col gap-5",
          centered ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        )}
      >
        <div className={cn("max-w-2xl", centered && "mx-auto")}>
          <span className="eyebrow">
            <span className="h-px w-6 bg-mint-500/70" aria-hidden />
            {eyebrow}
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-[2.6rem] md:leading-[1.15]">
            {title}
          </h2>
          {desc ? <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">{desc}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </Reveal>
  );
}
