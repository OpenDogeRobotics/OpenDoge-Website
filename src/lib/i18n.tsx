import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "zh" | "en";

/** A bilingual string pair. */
export type L = { zh: string; en: string };

/** Convenience constructor for bilingual strings. */
export const l = (zh: string, en: string): L => ({ zh, en });

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Resolve a bilingual pair to the active language. */
  t: (pair: L) => string;
};

const STORAGE_KEY = "opendoge.lang";

const LangContext = createContext<LangContextValue | null>(null);

/** Chinese is the default; an explicit user choice is remembered across visits. */
function detectInitialLang(): Lang {
  if (typeof window === "undefined") return "zh";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "zh" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  return "zh";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(() => setLangState((p) => (p === "zh" ? "en" : "zh")), []);
  const t = useCallback((pair: L) => pair[lang], [lang]);

  const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang, setLang, toggle, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within <LangProvider>");
  return ctx;
}
