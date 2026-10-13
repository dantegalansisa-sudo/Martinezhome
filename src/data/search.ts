import { CITIES, PROPERTIES, ZONES, type Property } from './properties';
import { priceUSD } from '../store';

export const OPERATIONS = ['Todos', 'Venta', 'Alquiler', 'Proyectos'] as const;
export type OperationFilter = (typeof OPERATIONS)[number];

export const ANY_LOCATION = 'Todas las zonas';
export const ANY_TYPE = 'Todos los tipos';
export const LOCATIONS = [ANY_LOCATION, ...CITIES, ...ZONES.filter((z) => !CITIES.includes(z))];
export const TYPES = [ANY_TYPE, 'Casa', 'Apartamento', 'Villa'];

/** Budget presets in USD (RD$ listings are converted with the reference rate). */
export const BUDGETS: { id: string; label: string; min?: number; max?: number }[] = [
  { id: 'any', label: 'Cualquier presupuesto' },
  { id: 'hasta-120', label: 'Hasta US$120K', max: 120000 },
  { id: '120-180', label: 'US$120K – 180K', min: 120000, max: 180000 },
  { id: '180-250', label: 'US$180K – 250K', min: 180000, max: 250000 },
  { id: '250-400', label: 'US$250K – 400K', min: 250000, max: 400000 },
  { id: 'mas-400', label: 'Más de US$400K', min: 400000 },
];

export interface SearchState {
  op: OperationFilter;
  loc: string;
  type: string;
  budget: string;
}

export function matches(p: Property, s: SearchState) {
  if (s.op === 'Venta' && p.operation !== 'venta') return false;
  if (s.op === 'Alquiler' && p.operation !== 'alquiler') return false;
  if (s.op === 'Proyectos' && p.status !== 'planos') return false;
  if (s.loc !== ANY_LOCATION && p.city !== s.loc && p.zone !== s.loc) return false;
  if (s.type !== ANY_TYPE && p.kind !== s.type) return false;
  const b = BUDGETS.find((x) => x.id === s.budget);
  if (b && (b.min !== undefined || b.max !== undefined)) {
    const usd = priceUSD(p);
    // Listings without a published price can't be placed in a budget range.
    if (usd === undefined) return false;
    if (b.min !== undefined && usd < b.min) return false;
    if (b.max !== undefined && usd > b.max) return false;
  }
  return true;
}

export const search = (s: SearchState) => PROPERTIES.filter((p) => matches(p, s));

/** Same search expressed as catalog query params. */
export function toQuery(s: SearchState) {
  const q = new URLSearchParams();
  if (s.op === 'Venta') q.set('op', 'venta');
  if (s.op === 'Alquiler') q.set('op', 'alquiler');
  if (s.op === 'Proyectos') q.set('estado', 'planos');
  if (s.loc !== ANY_LOCATION) q.set(CITIES.includes(s.loc) ? 'ciudad' : 'zona', s.loc);
  if (s.type !== ANY_TYPE) q.set('tipo', s.type);
  const b = BUDGETS.find((x) => x.id === s.budget);
  if (b?.min) q.set('min', String(b.min));
  if (b?.max) q.set('max', String(b.max));
  const str = q.toString();
  return `/propiedades${str ? `?${str}` : ''}`;
}
