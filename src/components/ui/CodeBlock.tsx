import { Check, Copy } from "lucide-react";
import { useCallback, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type CodeBlockProps = {
  code: string;
  title?: string;
  className?: string;
  /** Show a minimal bash-flavoured highlight. */
  highlight?: boolean;
  compact?: boolean;
};

const KNOWN_CMDS = new Set([
  "conda",
  "pip",
  "python",
  "export",
  "cd",
  "ls",
  "git",
  "colcon",
  "source",
  "chmod",
  "npm",
  "sudo",
  "POLICY_PATH=policy/gen52_model4800.onnx",
]);

function highlightLine(line: string, key: number): ReactNode {
  const trimmed = line.trimStart();
  if (trimmed.startsWith("#")) {
    return (
      <span key={key} className="text-zinc-500 italic">
        {line}
      </span>
    );
  }
  const parts = line.split(/(\s+)/);
  let firstWordSeen = false;
  return (
    <span key={key}>
      {parts.map((p, i) => {
        if (/^\s+$/.test(p) || p === "") return p;
        if (!firstWordSeen) {
          firstWordSeen = true;
          if (p.startsWith("./") || KNOWN_CMDS.has(p) || /^[A-Z_]+=/.test(p)) {
            return (
              <span key={i} className="text-mint-300">
                {p}
              </span>
            );
          }
        }
        if (p.startsWith("--") || p.startsWith("-")) {
          return (
            <span key={i} className="text-sky-300">
              {p}
            </span>
          );
        }
        if (p.startsWith("<") && p.endsWith(">")) {
          return (
            <span key={i} className="text-amber-300">
              {p}
            </span>
          );
        }
        if (p === "\\") {
          return (
            <span key={i} className="text-zinc-500">
              {p}
            </span>
          );
        }
        return p;
      })}
    </span>
  );
}

export function CodeBlock({ code, title, className, highlight = true, compact = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  }, [code]);

  const lines = code.split("\n");

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/8 bg-ink-950/90 text-left shadow-inner shadow-black/40",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/6 bg-white/[0.02] px-3.5 py-2">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <i className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            <i className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
          </span>
          {title ? <span className="ml-2 font-mono text-[11px] text-zinc-500">{title}</span> : null}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px] transition-colors",
            copied
              ? "border-mint-500/40 bg-mint-500/10 text-mint-300"
              : "border-white/8 bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200",
          )}
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className={cn("overflow-x-auto font-mono text-[12.5px] leading-relaxed text-zinc-200", compact ? "p-3.5" : "p-4")}>
        <code>
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {highlight ? highlightLine(line, i) : line}
              {line === "" ? " " : null}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
