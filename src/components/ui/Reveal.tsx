import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the reveal transition begins. */
  delay?: number;
  /** Translate distance (px) for the initial hidden state. */
  distance?: number;
  once?: boolean;
  style?: CSSProperties;
};

/**
 * Fades + slides children in when they enter the viewport.
 * Pure CSS transition driven by IntersectionObserver — no animation library required.
 */
export function Reveal({ children, className, delay = 0, distance = 20, once = true, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        transform: shown ? "translateY(0)" : `translateY(${distance}px)`,
      }}
      className={cn(
        "min-w-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform]",
        shown ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
