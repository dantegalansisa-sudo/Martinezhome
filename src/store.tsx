import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Currency, Price, Property } from './data/properties';
import { USD_TO_DOP } from './data/site';
import { t } from './i18n';

/** 'original' shows each listing in the currency it was published in. */
export type CurrencyMode = 'original' | Currency;

interface Store {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  currency: CurrencyMode;
  setCurrency: (c: CurrencyMode) => void;
  visit: { open: boolean; property?: Property };
  openVisit: (property?: Property) => void;
  closeVisit: () => void;
}

const Ctx = createContext<Store | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
};
const write = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — keep in memory only */
  }
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => read('mh:favs', []));
  const [currency, setCurrency] = useState<CurrencyMode>(() => read('mh:currency', 'original'));
  const [visit, setVisit] = useState<Store['visit']>({ open: false });

  useEffect(() => write('mh:favs', favorites), [favorites]);
  useEffect(() => write('mh:currency', currency), [currency]);

  const toggleFavorite = useCallback(
    (id: number) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
    []
  );

  const value = useMemo<Store>(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite: (id) => favorites.includes(id),
      currency,
      setCurrency,
      visit,
      openVisit: (property) => setVisit({ open: true, property }),
      closeVisit: () => setVisit((v) => ({ ...v, open: false })),
    }),
    [favorites, toggleFavorite, currency, visit]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useStore = () => {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside StoreProvider');
  return s;
};

/* ---------- Money helpers ---------- */

export const toUSD = (amount: number, c: Currency) => (c === 'USD' ? amount : amount / USD_TO_DOP);
export const fromUSD = (usd: number, c: Currency) => (c === 'USD' ? usd : usd * USD_TO_DOP);

export const money = (amount: number, c: Currency, compact = false) => {
  const sym = c === 'USD' ? 'US$' : 'RD$';
  if (compact && amount >= 1_000_000) return `${sym}${(amount / 1_000_000).toLocaleString('en-US', { maximumFractionDigits: 1 })}M`;
  if (compact && amount >= 1_000) return `${sym}${Math.round(amount / 1_000)}K`;
  return `${sym} ${Math.round(amount).toLocaleString('en-US')}`;
};

/** Price in the user's chosen display currency; converted values are marked with ≈. */
export function formatPrice(price: Price | undefined, mode: CurrencyMode, compact = false) {
  if (!price) return t('Precio a consultar');
  const target: Currency = mode === 'original' ? price.currency : mode;
  const conv = (n: number) => fromUSD(toUSD(n, price.currency), target);
  const approx = target !== price.currency ? '≈ ' : '';
  const main = `${approx}${money(conv(price.amount), target, compact)}${price.monthly ? (compact ? t('/mes') : t(' / mes')) : ''}`;
  return price.from ? t('Desde {v}', { v: main }) : main;
}

/** Normalized USD value used to filter and sort mixed-currency listings. */
export const priceUSD = (p: Property) => (p.price ? toUSD(p.price.amount, p.price.currency) : undefined);
