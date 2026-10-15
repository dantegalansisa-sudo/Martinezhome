import { AVAILABLE, type Property } from './properties';

export interface ZoneGroup {
  id: string;
  name: string;
  hint: string;
  image: string;
  match: (p: Property) => boolean;
}

/** Areas shown in "Explora por zona"; `id` is also the catalog's ?area= filter. */
export const ZONE_GROUPS: ZoneGroup[] = [
  { id: 'prado-oriental', name: 'Prado Oriental', hint: 'Santo Domingo Este', image: '/props/torre-apartamentos-prado-oriental/02.webp', match: (p) => p.zone === 'Prado Oriental' },
  { id: 'punta-cana', name: 'Punta Cana', hint: 'Villas en el Caribe', image: '/props/villa-amueblada-punta-cana/01.webp', match: (p) => p.city === 'Punta Cana' },
  { id: 'avenida-ecologica', name: 'Avenida Ecológica', hint: 'Santo Domingo Este', image: '/props/casa-de-lujo-avenida-ecologica/03.webp', match: (p) => /Ecológica|Nuevo Amanecer/.test(p.zone) },
  { id: 'brisa-oriental', name: 'Brisa Oriental', hint: 'Santo Domingo Este', image: '/props/casas-brisa-oriental/01.webp', match: (p) => p.zone === 'Brisa Oriental' },
  { id: 'distrito-nacional', name: 'Distrito Nacional', hint: 'Sector Honduras', image: '/props/residencial-dn-honduras/01.webp', match: (p) => p.city === 'Distrito Nacional' },
  { id: 'bani', name: 'Baní', hint: 'Provincia Peravia', image: '/props/apartamentos-bani/01.webp', match: (p) => p.zone === 'Baní' },
];

export const zoneGroup = (id: string) => ZONE_GROUPS.find((z) => z.id === id);
export const countIn = (z: ZoneGroup) => AVAILABLE.filter(z.match).length;
