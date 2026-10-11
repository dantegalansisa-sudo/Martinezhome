export const CONTACT = {
  phone: '829-798-2079',
  phoneHref: 'tel:+18297982079',
  whatsapp: 'https://wa.me/18297982079',
  instagram: 'https://www.instagram.com/martinezhomerd/',
  threads: 'https://www.threads.net/@martinezhomerd',
  address: 'Calle Torrente de Cedrón #4, Prado Oriental, 2do nivel, Autopista San Isidro, Santo Domingo Este',
  ceo: 'Lic. Vanessa Martínez',
};

export const waLink = (text: string) =>
  `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const NAV = ['Propiedades', 'Compra', 'Alquiler', 'Proyectos', 'Servicios', 'Sobre Nosotros', 'Contacto'];

export type PropertyType = 'Venta' | 'Alquiler' | 'Proyecto';

export interface Property {
  id: number;
  type: PropertyType;
  tag?: string;
  image: string;
  location: string;
  title: string;
  price: string;
  beds: string;
  baths: string;
  area: string;
}

export const PROPERTIES: Property[] = [
  {
    id: 1, type: 'Proyecto', tag: 'Últimas unidades', image: './videos/oportunidad-sde.jpg',
    location: 'Cerca de City Center, Santo Domingo Este',
    title: 'Apartamentos a 2 minutos de City Center',
    price: 'Desde US$ 98,000', beds: '2-3', baths: '2', area: '85 - 120 m²',
  },
  {
    id: 2, type: 'Venta', tag: 'Casi lista', image: './images/villa-moderna.webp',
    location: 'Prado Oriental, Santo Domingo Este',
    title: 'Casa contemporánea de dos niveles',
    price: 'US$ 265,000', beds: '4', baths: '3.5', area: '210 m²',
  },
  {
    id: 3, type: 'Alquiler', image: './images/loft-noche.webp',
    location: 'Naco, Santo Domingo',
    title: 'Penthouse dúplex con vista a la ciudad',
    price: 'US$ 3,500 / mes', beds: '3', baths: '3.5', area: '290 m²',
  },
  {
    id: 4, type: 'Proyecto', image: './images/torre-proyecto.webp',
    location: 'Autopista San Isidro, Santo Domingo Este',
    title: 'Torre residencial con amenidades premium',
    price: 'Desde US$ 145,000', beds: '1-3', baths: '1-2.5', area: '70 - 160 m²',
  },
  {
    id: 5, type: 'Venta', image: './images/residencia-noche.webp',
    location: 'Arroyo Hondo, Santo Domingo',
    title: 'Residencia de lujo con terrazas',
    price: 'US$ 680,000', beds: '5', baths: '5.5', area: '540 m²',
  },
  {
    id: 6, type: 'Alquiler', image: './images/penthouse-luz.webp',
    location: 'Piantini, Santo Domingo',
    title: 'Apartamento amueblado con ventanales',
    price: 'US$ 2,800 / mes', beds: '2', baths: '2.5', area: '180 m²',
  },
];

export const REELS = [
  { src: './videos/casa-sde.mp4', poster: './videos/casa-sde.jpg', views: '12.4K', title: 'Casa 210 m² · ¡Casi lista para entrega!' },
  { src: './videos/oportunidad-sde.mp4', poster: './videos/oportunidad-sde.jpg', views: '8.7K', title: 'A 2 min de City Center y Lady Lee' },
  { src: './videos/ultimas-unidades.mp4', poster: './videos/ultimas-unidades.jpg', views: '15.2K', title: '¡Últimas unidades disponibles!' },
];
