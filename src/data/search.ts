import { AVAILABLE, CITIES, ZONES, type Property } from './properties';
import { priceUSD } from '../store';
import { t } from '../i18n';

export const OPERATIONS = ['Todos', 'Venta', 'Alquiler', 'Proyectos'] as const;
export type OperationFilter = (typeof OPERATIONS)[number];

export const ANY_LOCATION = 'Todas las zonas';
export const ANY_TYPE = 'Todos los tipos';
export const LOCATIONS = [ANY_LOCATION, ...CITIES, ...ZONES.filter((z) => !CITIES.includes(z))];
export const TYPES = [ANY_TYPE, 'Casa', 'Apartamento', 'Penthouse', 'Villa'];

/** Slider bounds in USD (RD$ listings are converted with the reference rate). The top value means "no limit". */
export const BUDGET_MIN = 50000;
export const BUDGET_MAX = 500000;
export const BUDGET_STEP = 5000;
export const ANY_BUDGET: [number, number] = [BUDGET_MIN, BUDGET_MAX];

/** Quick shortcuts shown above the slider. */
export const BUDGETS: { label: string; range: [number, number] }[] = [
  { label: 'Hasta 120K', range: [BUDGET_MIN, 120000] },
  { label: '120K – 180K', range: [120000, 180000] },
  { label: '180K – 250K', range: [180000, 250000] },
  { label: '250K – 400K', range: [250000, 400000] },
  { label: '400K +', range: [400000, BUDGET_MAX] },
];

export const budgetActive = ([lo, hi]: [number, number]) => lo > BUDGET_MIN || hi < BUDGET_MAX;

const k = (n: number) => `${Math.round(n / 1000)}K`;
export function budgetLabel([lo, hi]: [number, number]) {
  if (!budgetActive([lo, hi])) return t('Cualquier presupuesto');
  if (lo <= BUDGET_MIN) return t('Hasta {v}', { v: `US$${k(hi)}` });
  if (hi >= BUDGET_MAX) return t('Desde {v}', { v: `US$${k(lo)}` });
  return `US$${k(lo)} – ${k(hi)}`;
}

export interface SearchState {
  op: OperationFilter;
  loc: string;
  type: string;
  budget: [number, number];
}

export function matches(p: Property, s: SearchState) {
  if (s.op === 'Venta' && p.operation !== 'venta') return false;
  if (s.op === 'Alquiler' && p.operation !== 'alquiler') return false;
  if (s.op === 'Proyectos' && p.status !== 'planos') return false;
  if (s.loc !== ANY_LOCATION && p.city !== s.loc && p.zone !== s.loc) return false;
  if (s.type !== ANY_TYPE && p.kind !== s.type) return false;
  if (budgetActive(s.budget)) {
    const [lo, hi] = s.budget;
    const usd = priceUSD(p);
    // Listings without a published price can't be placed in a budget range.
    // Rents are monthly amounts, and listings without a price can't be placed in a purchase-budget range.
    if (usd === undefined || p.price?.monthly) return false;
    if (usd < lo) return false;
    if (hi < BUDGET_MAX && usd > hi) return false;
  }
  return true;
}

export const search = (s: SearchState) => AVAILABLE.filter((p) => matches(p, s));

/** Same search expressed as catalog query params. */
export function toQuery(s: SearchState) {
  const q = new URLSearchParams();
  if (s.op === 'Venta') q.set('op', 'venta');
  if (s.op === 'Alquiler') q.set('op', 'alquiler');
  if (s.op === 'Proyectos') q.set('estado', 'planos');
  if (s.loc !== ANY_LOCATION) q.set(CITIES.includes(s.loc) ? 'ciudad' : 'zona', s.loc);
  if (s.type !== ANY_TYPE) q.set('tipo', s.type);
  const [lo, hi] = s.budget;
  if (lo > BUDGET_MIN) q.set('min', String(lo));
  if (hi < BUDGET_MAX) q.set('max', String(hi));
  const str = q.toString();
  return `/propiedades${str ? `?${str}` : ''}`;
}

/** Price distribution for the slider histogram: how many listings fall in each bucket. */
export function histogram(buckets = 18) {
  const size = (BUDGET_MAX - BUDGET_MIN) / buckets;
  const counts = Array.from({ length: buckets }, () => 0);
  AVAILABLE.forEach((p) => {
    const usd = priceUSD(p);
    if (usd === undefined || p.price?.monthly) return;
    const i = Math.min(Math.max(Math.floor((usd - BUDGET_MIN) / size), 0), buckets - 1);
    counts[i]++;
  });
  return { counts, size };
}
