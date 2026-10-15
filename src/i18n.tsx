import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { EN } from './i18n.en';

export type Lang = 'es' | 'en';

// The app re-mounts when the language changes (see LangProvider), so a module-level value
// is enough for `t()` to be called anywhere — components, helpers and data formatters alike.
let current: Lang = 'es';

const missing = new Set<string>();

/**
 * Translate a Spanish UI string. Spanish is the source text and the dictionary key, so
 * untranslated strings simply fall back to Spanish. `{name}` placeholders are filled from `vars`.
 */
export function t(es: string, vars?: Record<string, string | number>) {
  let out = current === 'en' ? EN[es] : es;
  if (out === undefined) {
    if (import.meta.env.DEV && !missing.has(es)) {
      missing.add(es);
      console.warn('[i18n] missing EN:', es);
    }
    out = es;
  }
  if (vars) for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(String(v));
  return out;
}

export const getLang = () => current;
/** Locale for dates and number formatting. */
export const locale = () => (current === 'en' ? 'en-US' : 'es-DO');

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'es', setLang: () => {} });

const initial = (): Lang => {
  try {
    const saved = localStorage.getItem('mh:lang');
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* storage unavailable */
  }
  return typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
};

export function LangProvider({ children }: { children: (lang: Lang) => ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    current = initial();
    return current;
  });

  const setLang = (l: Lang) => {
    current = l;
    try {
      localStorage.setItem('mh:lang', l);
    } catch {
      /* storage unavailable */
    }
    setLangState(l);
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : 'es-DO';
  }, [lang]);

  current = lang;
  return <Ctx.Provider value={{ lang, setLang }}>{children(lang)}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
