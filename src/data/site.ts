/** Canonical production origin (apex redirects here). Used for the sitemap, canonical links and social previews. */
export const SITE_URL = 'https://www.martinezhomerd.com';

export const CONTACT = {
  phone: '829-798-2079',
  phoneHref: 'tel:+18297982079',
  phones: ['829-798-2079', '849-878-2079', '809-524-3477'],
  whatsapp: 'https://wa.me/18297982079',
  instagram: 'https://www.instagram.com/martinezhomerd/',
  threads: 'https://www.threads.net/@martinezhomerd',
  address: 'Calle Torrente de Cedrón #4, Prado Oriental, 2do nivel, Autopista San Isidro, Santo Domingo Este',
  ceo: 'Lic. Vanessa Martínez',
};

/** Reference exchange rate used only for approximate conversions shown with "≈". */
export const USD_TO_DOP = 63;

export const waLink = (text: string) => `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export const NAV: { label: string; to: string }[] = [
  { label: 'Propiedades', to: '/propiedades' },
  { label: 'Compra', to: '/propiedades?op=venta' },
  { label: 'Alquiler', to: '/propiedades?op=alquiler' },
  { label: 'Proyectos', to: '/propiedades?estado=planos' },
  { label: 'Equipo', to: '/equipo' },
  { label: 'Contacto', to: '/#contacto' },
];

export const REELS = [
  { src: '/videos/nuevo-recorrido.mp4', poster: '/videos/nuevo-recorrido.jpg', views: '9.8K', title: 'Recorrido: casa con fachada en piedra' },
  { src: '/videos/casa-sde.mp4', poster: '/videos/casa-sde.jpg', views: '12.4K', title: 'Casa 210 m² · ¡Casi lista para entrega!' },
  { src: '/videos/oportunidad-sde.mp4', poster: '/videos/oportunidad-sde.jpg', views: '8.7K', title: 'A 2 min de City Center y Lady Lee' },
  { src: '/videos/ultimas-unidades.mp4', poster: '/videos/ultimas-unidades.jpg', views: '15.2K', title: '¡Últimas unidades disponibles!' },
];
