import type { Property } from './properties';
import { LISTINGS_EN } from './properties.en';
import { getLang } from '../i18n';

const cache = new Map<string, Property>();

/** The listing with its copy in the active language (Spanish is the source; English overrides text fields). */
export function localize(p: Property): Property {
  if (getLang() !== 'en') return p;
  const hit = cache.get(p.slug);
  if (hit) return hit;
  const out = { ...p, ...LISTINGS_EN[p.slug] };
  cache.set(p.slug, out);
  return out;
}
