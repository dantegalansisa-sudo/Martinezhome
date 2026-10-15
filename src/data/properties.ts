import { t } from '../i18n';
export type Operation = 'venta' | 'alquiler';
export type PropertyKind = 'Casa' | 'Apartamento' | 'Villa' | 'Penthouse';
export type Status = 'planos' | 'entrega';
export type Currency = 'USD' | 'DOP';

export interface Price {
  amount: number;
  currency: Currency;
  /** "Desde" for projects with several units */
  from?: boolean;
  /** Upper bound of a price range */
  to?: number;
  /** Rent: amount is per month */
  monthly?: boolean;
}

export interface Unit {
  name: string;
  area?: string;
  detail?: string;
  price?: Price;
}

export interface PaymentStep {
  label: string;
  value: string;
}

export interface Property {
  id: number;
  slug: string;
  title: string;
  kind: PropertyKind;
  operation: Operation;
  status?: Status;
  delivery?: string;
  zone: string;
  city: string;
  coords: [number, number];
  price?: Price;
  beds?: string;
  baths?: string;
  area?: string;
  lot?: string;
  parking?: string;
  /** Minimum bedrooms, used by the filter */
  bedsMin?: number;
  summary: string;
  description: string;
  highlights: string[];
  sections: { title: string; items: string[] }[];
  units?: Unit[];
  payment?: PaymentStep[];
  tags: string[];
  images: number;
  render?: boolean;
  featured?: boolean;
  /** Sold listings stay visible as social proof but drop out of searches */
  sold?: boolean;
  /** CSS object-position for the cover photo, when the subject isn't centred */
  coverFocus?: string;
  agent: string;
}

const P: Property[] = [
  {
    id: 1,
    slug: 'casa-duplex-prado-oriental',
    title: 'Exclusiva casa dúplex en Prado Oriental',
    kind: 'Casa',
    operation: 'venta',
    zone: 'Prado Oriental',
    city: 'Santo Domingo Este',
    coords: [18.4952, -69.8046],
    price: { amount: 235000, currency: 'USD' },
    beds: '3', bedsMin: 3, baths: '2.5', area: '201.95 m²', lot: '201.48 m²', parking: '4',
    summary: 'Dúplex con patio de 41 m², techo de 87.50 m² para terraza y marquesina para 4 vehículos.',
    description:
      'Una casa pensada para la familia: amplios espacios sociales en el primer nivel, tres habitaciones en el segundo y un techo de 87.50 m² listo para convertirse en tu terraza. Terminaciones de primera y preinstalaciones para piscina, jacuzzi y calentador solar.',
    highlights: ['Patio de ~41 m²', 'Terraza en techo de 87.50 m²', 'Marquesina para 4 vehículos', 'Preinstalación para piscina'],
    sections: [
      { title: 'Primer nivel', items: ['Sala y comedor', 'Cocina con desayunador', 'Medio baño para visitas', 'Cuarto de servicio con baño', 'Área de lavado', 'Marquesina para 4 vehículos', 'Amplio patio'] },
      { title: 'Segundo nivel', items: ['3 habitaciones', 'Principal con baño privado, walk-in clóset y vista al patio', 'Sala de estar familiar', '1 baño común', 'Balcón en una de las habitaciones'] },
      { title: 'Amenidades y extras', items: ['Portón motorizado', 'Cisterna y pozo tubular', 'Preinstalación para piscina', 'Preinstalación para jacuzzi en el techo', 'Preinstalación para calentador solar', 'Preinstalación para aires acondicionados', 'Cuarto de máquinas', 'Acceso a terraza en el techo'] },
      { title: 'Terminaciones', items: ['Pisos en porcelanato importado', 'Cocina modular con tope de granito', 'Puerta principal en madera preciosa', 'Cerámica de alta calidad en baños'] },
    ],
    tags: ['Dúplex'],
    images: 8,
    featured: true,
    agent: 'cristhian-almanzar',
  },
  {
    id: 2,
    slug: 'residencial-gaia-3-prado-oriental',
    title: 'Residencial Gaia 3 — Apartamentos y Penthouse',
    kind: 'Apartamento',
    operation: 'venta',
    zone: 'Prado Oriental',
    city: 'Santo Domingo Este',
    coords: [18.4968, -69.8021],
    price: { amount: 164268, currency: 'USD', from: true, to: 255132 },
    baths: '2.5', area: '197 – 250 m²', parking: '2',
    summary: 'Unidades amplias con terrazas de hasta 60 m² y 2 parqueos en Residencial Gaia 3.',
    description:
      'Espacios amplios, terraza y una excelente distribución en una de las zonas residenciales más buscadas de Santo Domingo Este. Elige entre la unidad de primer nivel con gran terraza o el penthouse.',
    highlights: ['Terrazas de hasta 60.78 m²', '2.5 baños', '2 parqueos por unidad', 'Opción penthouse'],
    sections: [{ title: 'Incluye', items: ['2.5 baños', '2 parqueos', 'Terraza / balcón', 'Excelente distribución'] }],
    units: [
      { name: 'Primer nivel', area: '197.67 m² totales', detail: '136.89 m² de construcción + 60.78 m² de terraza/balcón', price: { amount: 164268, currency: 'USD' } },
      { name: 'Penthouse', area: '250.86 m² totales', detail: '199.86 m² de construcción + 51 m² de terraza', price: { amount: 255132, currency: 'USD' } },
    ],
    tags: ['Penthouse disponible'],
    images: 7,
    agent: 'alba-peguero',
  },
  {
    id: 3,
    slug: 'villa-amueblada-punta-cana',
    title: 'Villa amueblada en Brisa Punta Cana',
    kind: 'Villa',
    operation: 'venta',
    status: 'entrega',
    zone: 'Brisa Punta Cana',
    city: 'Punta Cana',
    coords: [18.6905, -68.4365],
    price: { amount: 289000, currency: 'USD' },
    beds: '3', bedsMin: 3, baths: '3', lot: '250 m²',
    summary: 'Piscina, jacuzzi y área de BBQ, a 5 minutos de Coco Bongo y Downtown Center.',
    description:
      'Comodidad, privacidad y una ubicación privilegiada en Punta Cana. Una villa completamente amueblada, ideal para vivir, vacacionar o generar ingresos por renta vacacional.',
    highlights: ['Completamente amueblada', 'Piscina + jacuzzi', 'Área de BBQ', 'A 5 min de Downtown Center'],
    sections: [{ title: 'Características', items: ['3 habitaciones', '3 baños', 'Piscina y jacuzzi', 'Área de BBQ', '250 m² de terreno', 'Completamente amueblada'] }],
    tags: ['Amueblada', 'Con piscina'],
    images: 7,
    featured: true,
    agent: 'vanessa-martinez',
  },
  {
    id: 4,
    slug: 'torre-apartamentos-prado-oriental',
    title: 'Torre de apartamentos con línea blanca',
    kind: 'Apartamento',
    operation: 'venta',
    status: 'planos',
    delivery: 'Julio 2027',
    zone: 'Prado Oriental',
    city: 'Santo Domingo Este',
    coords: [18.4939, -69.8068],
    beds: '3', bedsMin: 3, parking: 'Techado',
    summary: 'Proyecto moderno con piscina, ascensor, planta full y seguridad 24/7. Línea blanca incluida.',
    description:
      'Invierte en un proyecto moderno pensado para ofrecerte comodidad, seguridad y excelentes terminaciones. Tu apartamento incluye línea blanca y un plan de pago organizado para asegurar tu unidad desde ahora.',
    highlights: ['Línea blanca incluida', 'Piscina y área social', 'Planta eléctrica full', 'Seguridad 24/7'],
    sections: [{ title: 'Características del proyecto', items: ['Apartamentos de 3 habitaciones', 'Línea blanca incluida', 'Piscina y área social', 'Ascensor', 'Planta eléctrica full', 'Parqueo techado', 'Seguridad 24/7', 'Terminaciones modernas'] }],
    payment: [
      { label: 'Bloqueo', value: 'US$2,000' },
      { label: 'Separación', value: 'US$8,000' },
      { label: 'Completivo del inicial', value: '30%' },
      { label: 'Balance', value: 'Financiamiento con el banco de su preferencia' },
    ],
    tags: ['Ascensor'],
    images: 7,
    render: true,
    featured: true,
    agent: 'joel-polanco',
  },
  {
    id: 5,
    slug: 'apartamentos-autopista-san-isidro',
    title: 'Apartamentos de 3 habitaciones en la Autopista de San Isidro',
    kind: 'Apartamento',
    operation: 'venta',
    zone: 'Autopista de San Isidro',
    city: 'Santo Domingo Este',
    coords: [18.4991, -69.8167],
    price: { amount: 116500, currency: 'USD', from: true, to: 149500 },
    beds: '3', bedsMin: 3, baths: '2', area: 'Desde 115 m²', parking: '1',
    summary: 'Espacios amplios, agua permanente y terrazas adicionales desde 32 m².',
    description:
      'Vive en una zona estratégica de Santo Domingo Este con acceso directo a la Autopista de San Isidro. Apartamentos amplios, con excelentes terminaciones y la opción de terrazas adicionales.',
    highlights: ['Terrazas desde 32 m²', 'Agua permanente', 'Intercom de seguridad', 'Parqueo techado'],
    sections: [{ title: 'Características', items: ['Desde 115 m² de construcción', '3 habitaciones', 'Principal con baño privado', 'Sala y comedor', '1 parqueo techado', 'Terminaciones de primera', 'Agua permanente', 'Intercom de seguridad', 'Terrazas adicionales desde 32 m²'] }],
    tags: [],
    images: 6,
    agent: 'radaisa-martinez',
  },
  {
    id: 6,
    slug: 'casas-brisa-oriental',
    title: 'Casas a estrenar en Brisa Oriental',
    kind: 'Casa',
    operation: 'venta',
    status: 'entrega',
    zone: 'Brisa Oriental',
    city: 'Santo Domingo Este',
    coords: [18.4874, -69.7898],
    price: { amount: 204000, currency: 'USD', from: true, to: 209000 },
    beds: '3', bedsMin: 3, baths: '3.5', area: '201 m²', parking: '2',
    summary: 'Cada habitación con su baño, cocina con isla, family room y amplia terraza.',
    description:
      '¡Estrena la casa que tu familia merece! Diseño moderno, cocina con isla, family room y preinstalaciones listas para jacuzzi, inversor, cámaras y portón eléctrico.',
    highlights: ['3 habitaciones con baño', 'Cocina moderna con isla', 'Family room', '2 parqueos techados'],
    sections: [
      { title: 'Distribución', items: ['201 m² de construcción', '3 habitaciones, cada una con baño', 'Principal con walk-in closet', 'Sala, comedor y family room', 'Cocina moderna con isla', 'Amplia terraza', '2 parqueos techados', 'Habitación de servicio con baño'] },
      { title: 'Preinstalaciones', items: ['Jacuzzi', 'Kitchenette', 'Aires acondicionados', 'Inversor', 'Cámaras', 'Portón eléctrico'] },
    ],
    units: [
      { name: 'Casa del centro', price: { amount: 204000, currency: 'USD' } },
      { name: 'Casa de esquina', price: { amount: 209000, currency: 'USD' } },
    ],
    tags: ['A estrenar'],
    images: 7,
    agent: 'cristhian-almanzar',
  },
  {
    id: 7,
    slug: 'residencial-dn-honduras',
    title: 'Residencial DN en el sector Honduras',
    kind: 'Apartamento',
    operation: 'venta',
    status: 'planos',
    zone: 'Honduras',
    city: 'Distrito Nacional',
    coords: [18.4581, -69.9466],
    summary: 'Ubicación estratégica con acceso inmediato a la Av. Independencia, Churchill y el Malecón.',
    description:
      'Vive o invierte en una de las zonas con mayor proyección del Distrito Nacional. Un proyecto diseñado para brindar comodidad, funcionalidad y calidad de vida, conectado en minutos con universidades, hospitales y centros comerciales.',
    highlights: ['Zona de alta proyección', 'Cerca del Malecón', 'Ideal para inversión', 'Acceso a vías principales'],
    sections: [
      { title: 'Acceso inmediato a', items: ['Av. Independencia', 'Av. Winston Churchill', 'Av. Italia', 'Av. George Washington (Malecón)'] },
      { title: 'Te conecta en minutos con', items: ['Universidades', 'Hospitales', 'Supermercados', 'Centros comerciales', 'Restaurantes', 'Áreas recreativas'] },
    ],
    tags: ['Distrito Nacional'],
    images: 4,
    render: true,
    agent: 'alba-peguero',
  },
  {
    id: 8,
    slug: 'apartamentos-mirador-del-este',
    title: 'Apartamentos y penthouses en Mirador del Este',
    kind: 'Apartamento',
    operation: 'venta',
    zone: 'Mirador del Este',
    city: 'Santo Domingo Este',
    coords: [18.4846, -69.8571],
    price: { amount: 123000, currency: 'USD', from: true },
    beds: '3', bedsMin: 3, baths: 'Hasta 3.5', area: '123 – 263 m²', parking: '2',
    summary: 'Penthouses de 2 niveles con terraza privada y jacuzzi. Varias unidades ya vendidas.',
    description:
      'Exclusivos apartamentos con terminaciones de primera, amplios espacios y excelente distribución para toda la familia. También disponibles penthouses de dos niveles con terraza privada, jacuzzi y sala de estar.',
    highlights: ['Penthouses de 2 niveles', 'Terraza privada con jacuzzi', 'Habitación de servicio', 'Parqueo para 2 vehículos'],
    sections: [
      { title: 'Características', items: ['3 habitaciones', 'Hasta 3½ baños', 'Sala y comedor', 'Cocina moderna', 'Área de lavado', 'Habitación de servicio', 'Balcón (según disponibilidad)', 'Parqueo para 2 vehículos'] },
      { title: 'También disponibles', items: ['Penthouses de 2 niveles con terraza privada, jacuzzi y sala de estar', 'Apartamentos con amplias terrazas'] },
    ],
    tags: ['Últimas unidades'],
    images: 7,
    agent: 'joel-polanco',
  },
  {
    id: 11,
    slug: 'ultimas-unidades-prado-oriental',
    title: 'Apartamento y penthouse — últimas unidades',
    kind: 'Apartamento',
    operation: 'venta',
    zone: 'Prado Oriental',
    city: 'Santo Domingo Este',
    coords: [18.4979, -69.8059],
    price: { amount: 136000, currency: 'USD', from: true, to: 185250 },
    area: '141 – 237 m²',
    summary: 'Zona residencial tranquila con fácil acceso a la Autopista San Isidro y la Av. Ecológica.',
    description:
      'Apartamentos amplios y modernos en una de las mejores zonas de Santo Domingo Este, con alta valorización y cerca de supermercados, colegios, farmacias y plazas comerciales.',
    highlights: ['Penthouse con terraza privada', 'Alta valorización', 'Zona tranquila y segura', 'Excelente distribución'],
    sections: [{ title: 'Beneficios', items: ['Amplios espacios interiores', 'Excelente distribución', 'Zona residencial tranquila y segura', 'Alta valorización', 'Fácil acceso a Autopista San Isidro, Av. Ecológica y principales vías', 'Cerca de supermercados, colegios, farmacias y plazas comerciales'] }],
    units: [
      { name: 'Apartamento 3er nivel', area: '141 m²', price: { amount: 136000, currency: 'USD' } },
      { name: 'Penthouse exclusivo', area: '237 m²', detail: 'Amplia terraza privada', price: { amount: 185250, currency: 'USD' } },
    ],
    tags: ['Últimas unidades'],
    images: 6,
    agent: 'alba-peguero',
  },
  {
    id: 12,
    slug: 'apartamentos-nuevo-amanecer',
    title: 'Apartamentos listos en Nuevo Amanecer',
    kind: 'Apartamento',
    operation: 'venta',
    status: 'entrega',
    zone: 'Nuevo Amanecer',
    city: 'Santo Domingo Este',
    coords: [18.5051, -69.7962],
    price: { amount: 165000, currency: 'USD' },
    beds: '3', bedsMin: 3, baths: '2.5', area: '116 m² + 65 m² terraza', parking: '2',
    summary: 'Entre la Autopista San Isidro y la Av. Ecológica. Proyecto listo para entrega.',
    description:
      'Vive o invierte en una de las zonas de mayor crecimiento de Santo Domingo Este. Unidad de segundo nivel con una terraza de 65 m², terminaciones de primera y dos parqueos.',
    highlights: ['Terraza de 65 m²', 'Listo para entrega', 'Walk-in closet', 'Tope de granito'],
    sections: [
      { title: 'Características', items: ['3 habitaciones', 'Principal con baño y walk-in closet', 'Habitación de servicio con baño', 'Sala y comedor integrados', 'Cocina moderna con desayunador y tope de granito', 'Área de lavado', 'Parqueo techado', 'Portón eléctrico', 'Gas común', 'Preinstalación para aire acondicionado'] },
      { title: 'Terminaciones', items: ['Pisos en porcelanato', 'Madera preciosa', 'Cornisas en yeso'] },
    ],
    tags: [],
    images: 5,
    agent: 'cristhian-almanzar',
  },
  {
    id: 13,
    slug: 'casa-moderna-terraza-bbq',
    title: 'Casa moderna con terraza, pérgola y BBQ',
    kind: 'Casa',
    operation: 'venta',
    status: 'planos',
    zone: 'Santo Domingo Este',
    city: 'Santo Domingo Este',
    coords: [18.4898, -69.8312],
    price: { amount: 275000, currency: 'USD', from: true },
    beds: '3', bedsMin: 3, parking: '2',
    summary: 'Cocina con isla, amplio patio con jardín y opción de piscina y jacuzzi.',
    description:
      'El hogar ideal para disfrutar en familia con comodidad, privacidad y estilo: cocina con isla, habitación principal con vestidor y dos balcones, y una terraza con pérgola, baño y área de BBQ.',
    highlights: ['Piscina y jacuzzi opcional', 'Terraza con pérgola y BBQ', 'Principal con 2 balcones', 'Patio con jardín'],
    sections: [{ title: 'Características', items: ['Cocina con isla', '3 habitaciones', 'Principal con vestidor y 2 balcones', 'Cuarto de servicio con baño', 'Amplio patio con jardín', 'Piscina y jacuzzi opcional', 'Terraza con pérgola, baño y área de BBQ', '2 parqueos'] }],
    tags: ['Piscina opcional'],
    images: 7,
    render: true,
    agent: 'joel-polanco',
  },
  {
    id: 14,
    slug: 'casa-con-piscina-ciudad-jardin',
    title: 'Casa moderna con piscina en Ciudad Jardín',
    kind: 'Casa',
    operation: 'venta',
    status: 'planos',
    zone: 'Residencial Ciudad Jardín',
    city: 'Santo Domingo Este',
    coords: [18.4655, -69.7262],
    price: { amount: 290000, currency: 'USD' },
    beds: '4', bedsMin: 4, baths: '4.5', area: '270 m²', lot: '181 m²', parking: '2',
    summary: 'Piscina privada, aires incluidos y residencial con casa club, a 7 min del aeropuerto.',
    description:
      'Un proyecto de casa amplia y moderna, en planos, dentro de un residencial con seguridad 24/7, casa club con piscina, restaurante y hasta una cueva natural. A solo 7 minutos del Aeropuerto Internacional de Las Américas.',
    highlights: ['Piscina privada', 'Aires acondicionados incluidos', 'Casa club con piscina', 'Seguridad 24/7'],
    sections: [
      { title: 'La casa', items: ['4 habitaciones', '4 baños + baño de visitas', 'Piscina privada', 'Cocina fría y cocina caliente', 'Sala de estar familiar', 'Cuarto de servicio', 'Terraza destechada', 'Marquesina doble'] },
      { title: 'Incluye', items: ['Aires acondicionados en las 4 habitaciones', 'Estufa', 'Portón eléctrico', 'Cerco eléctrico'] },
      { title: 'Amenidades del residencial', items: ['Seguridad 24/7', 'Control de acceso', 'Casa club con piscina', 'Restaurante', 'Patrullaje motorizado', 'Cueva natural'] },
      { title: 'Ubicación', items: ['A 7 minutos del Aeropuerto de Las Américas', 'Cerca de supermercados, comercios y servicios', 'Fácil acceso a San Isidro, Av. Ecológica y Las Américas'] },
    ],
    tags: ['Con piscina', 'Alta demanda'],
    images: 7,
    render: true,
    featured: true,
    agent: 'alba-peguero',
  },
  {
    id: 15,
    slug: 'proyecto-cerrado-prado-oriental',
    title: 'Apartamentos en proyecto cerrado',
    kind: 'Apartamento',
    operation: 'venta',
    zone: 'Prado Oriental',
    city: 'Santo Domingo Este',
    coords: [18.4961, -69.8094],
    price: { amount: 121600, currency: 'USD', from: true },
    beds: '2 – 3', bedsMin: 2, baths: 'Hasta 3.5', area: '96.56 – 219.18 m²', parking: '2',
    summary: 'Unidades climatizadas, terrazas estilo madera y opciones tipo penthouse.',
    description:
      'Apartamentos en una de las zonas de mayor crecimiento y plusvalía de Santo Domingo Este. Proyecto cerrado con parqueos techados, unidades totalmente climatizadas y terrazas privadas.',
    highlights: ['Proyecto cerrado', 'Totalmente climatizados', 'Preinstalación de jacuzzi', 'Vistas norte, sur y oeste'],
    sections: [
      { title: 'El proyecto', items: ['Proyecto cerrado', 'Parqueos techados', 'Apartamentos de 2 y 3 habitaciones', 'Opciones tipo penthouse con terraza privada', 'Segundo nivel con amplia terraza privada'] },
      { title: 'Opciones destacadas', items: ['Apartamentos totalmente climatizados', 'Amplias terrazas estilo madera', 'Preinstalación de jacuzzi', 'Vistas norte, sur y oeste', 'Hasta 3.5 baños', '2 parqueos por unidad'] },
    ],
    tags: ['Alta plusvalía'],
    images: 6,
    agent: 'radaisa-martinez',
  },
  {
    id: 16,
    slug: 'villa-vista-cana-punta-cana',
    title: 'Villa moderna en Vista Cana',
    kind: 'Villa',
    operation: 'venta',
    zone: 'Vista Cana',
    city: 'Punta Cana',
    coords: [18.6531, -68.5171],
    price: { amount: 265000, currency: 'USD' },
    beds: '3', bedsMin: 3, baths: '2.5', parking: '2',
    summary: 'Villa con piscina y jacuzzi dentro de una de las comunidades más exclusivas de Punta Cana.',
    description:
      'Vive en una villa moderna, ideal para disfrutar en familia, con espacios cómodos y funcionales. Perfecta para quienes buscan confort, privacidad y un ambiente tranquilo en el Caribe.',
    highlights: ['Comunidad exclusiva', 'Terraza con jacuzzi', 'Walk-in closet', 'Parqueo para 2'],
    sections: [
      { title: 'Primer nivel', items: ['Parqueo para 2 vehículos', 'Sala amplia', 'Comedor', 'Cocina', '½ baño de visitas', 'Terraza', 'Jacuzzi'] },
      { title: 'Segundo nivel', items: ['Habitación principal con baño y walk-in closet', '2 habitaciones secundarias', 'Baño compartido'] },
    ],
    tags: ['Con piscina'],
    images: 6,
    agent: 'vanessa-martinez',
  },
  {
    id: 17,
    slug: 'apartamentos-bani',
    title: 'Proyecto exclusivo de 6 apartamentos en Baní',
    kind: 'Apartamento',
    operation: 'venta',
    status: 'planos',
    delivery: 'Noviembre 2026',
    zone: 'Baní',
    city: 'Peravia',
    coords: [18.2796, -70.3317],
    beds: '3', bedsMin: 3, baths: '2', parking: '1 – 2',
    summary: 'Solo 2 apartamentos por nivel y área social con terraza de 110 m².',
    description:
      'Un residencial íntimo y moderno con solo seis apartamentos, sala y comedor separados, cocina modular y terminaciones premium. Ideal para vivir o invertir.',
    highlights: ['Solo 6 apartamentos', 'Área social de 110 m²', 'Terminaciones premium', 'Seguridad'],
    sections: [{ title: 'Características', items: ['3 habitaciones', '2 baños', 'Sala y comedor separados', 'Cocina modular', '1–2 parqueos', 'Balcón / terraza (3er nivel)', 'Área social con terraza (110 m²)', 'Terminaciones premium + seguridad'] }],
    tags: ['Solo 6 unidades'],
    images: 7,
    render: true,
    agent: 'vanessa-martinez',
  },
  {
    id: 18,
    slug: 'casa-de-lujo-avenida-ecologica',
    title: 'Casa de lujo con piscina y cascada',
    kind: 'Casa',
    operation: 'venta',
    status: 'entrega',
    zone: 'Av. Ecológica / Charles de Gaulle',
    city: 'Santo Domingo Este',
    coords: [18.5113, -69.8046],
    price: { amount: 24500000, currency: 'DOP' },
    beds: '4', bedsMin: 4, baths: '4.5', area: '330 m²', lot: '232 m²', parking: '2',
    summary: 'Sótano con piscina y cascada, cocina fría y caliente, y puertas en roble brasileño.',
    description:
      'Una casa diseñada para brindar confort, elegancia y cada detalle que tu familia merece. Escalera iluminada con sensor, jardín seco interior, área de oficina y una zona social con piscina con cascada en el sótano. Lista para entrega inmediata.',
    highlights: ['Piscina con cascada', 'Cerradura inteligente', 'Puertas en roble brasileño', 'Entrega inmediata'],
    sections: [
      { title: 'Primer nivel', items: ['Amplia sala y comedor', '½ baño para visitas', 'Antesala', 'Cocina caliente equipada', 'Cocina fría full equipada', 'Isla en la cocina', 'Área de lavado', 'Marquesina doble', 'Cisterna, tinaco y pozo sumergible', 'Canalización para cámaras'] },
      { title: 'Sótano', items: ['Habitación con baño y clóset', '½ baño para área de piscina', 'Piscina con cascada', 'Área social techada y destechada', 'Depósito funcional'] },
      { title: 'Segundo nivel', items: ['2 habitaciones con baño y walk-in closet (una con balcón)', 'Principal con walk-in revestido en cedro + baño', 'Área de oficina', 'Escalera iluminada con sensor', 'Jardín seco interior', 'Clóset de ropa blanca'] },
      { title: 'Detalles', items: ['Puertas en roble brasileño', 'Puerta principal con cerradura inteligente'] },
    ],
    tags: ['Con piscina', 'Lujo'],
    images: 8,
    sold: true,
    agent: 'cristhian-almanzar',
  },
  {
    id: 19,
    slug: 'residencial-avenida-ecologica',
    title: 'Casa con terraza de 75 m² y BBQ',
    kind: 'Casa',
    operation: 'venta',
    status: 'planos',
    zone: 'Av. Ecológica',
    city: 'Santo Domingo Este',
    coords: [18.5079, -69.7998],
    price: { amount: 248000, currency: 'USD' },
    beds: '3', bedsMin: 3, baths: '2.5', area: '308.37 m²', lot: '185 m²',
    summary: 'Cocina en alto brillo con tope de cuarzo y preinstalación para cargador de vehículo eléctrico.',
    description:
      'Vive con estilo, amplitud y elegancia en una propiedad diseñada para el confort de toda tu familia: 233.37 m² de construcción más 75 m² de terraza techada con BBQ.',
    highlights: ['Terraza techada de 75 m²', 'Tope en cuarzo', 'Cargador de vehículo eléctrico', 'Plan de pago'],
    sections: [
      { title: 'Distribución', items: ['3 habitaciones', 'Principal con baño y walk-in closet', '2.5 baños', 'Sala y comedor integrados', '233.37 m² de construcción', '185 m² de solar', '75 m² de terraza techada'] },
      { title: 'Acabados', items: ['Porcelanato y cerámica importada', 'Diseño estructural moderno', 'Decoración en facia en sala, comedor y estar', 'Puerta principal en roble importado', 'Techo en yeso', 'Cocina en melamina alto brillo con tope en cuarzo'] },
      { title: 'Preinstalaciones', items: ['Inversor', 'Aire acondicionado', 'Motores eléctricos', 'Cargador de vehículo eléctrico', 'Cisterna'] },
      { title: 'Terraza', items: ['BBQ con gabinete y tope en granito', '½ baño en área social'] },
    ],
    payment: [
      { label: 'Reserva', value: 'US$2,000' },
      { label: 'Firma del contrato', value: 'A los 15 días' },
      { label: '10% inicial', value: 'A la firma' },
      { label: '20% inicial', value: 'En cuotas mensuales o bimensuales' },
      { label: '70% restante', value: 'Contra entrega (financiamiento disponible)' },
    ],
    tags: [],
    images: 8,
    render: true,
    agent: 'radaisa-martinez',
  },
  {
    id: 20,
    slug: 'residencia-brisa-oriental',
    title: 'Amplia residencia en Brisa Oriental',
    kind: 'Casa',
    operation: 'venta',
    zone: 'Brisa Oriental',
    city: 'Santo Domingo Este',
    coords: [18.4856, -69.7871],
    price: { amount: 16500000, currency: 'DOP' },
    beds: '6', bedsMin: 6, baths: '5.5', parking: '2',
    summary: 'Tres niveles con sótano independiente, galería, terraza y 3 habitaciones con baño.',
    description:
      'Una propiedad ideal para familias que buscan amplitud, comodidad y espacios para disfrutar cada momento. El sótano funciona como un espacio independiente con su propia sala, cocina y tres habitaciones.',
    highlights: ['Sótano independiente', 'Principal con balcón', 'Galería y patio', 'Marquesina doble'],
    sections: [
      { title: 'Sótano', items: ['3 habitaciones', '1 baño', 'Sala', 'Cocina', 'Comedor', 'Store'] },
      { title: 'Primer nivel', items: ['Sala y antesala', 'Comedor', 'Cocina', 'Baño de visita', 'Cuarto de servicio con baño', 'Patio y galería', 'Marquesina doble', 'Área de lavado'] },
      { title: 'Segundo nivel', items: ['Sala de estar y sala íntima', 'Terraza', '3 habitaciones, cada una con su baño', 'Habitación principal con balcón'] },
    ],
    tags: ['Ideal para familias'],
    images: 8,
    agent: 'vanessa-martinez',
  },
  {
    id: 21,
    slug: 'apartamentos-ensanche-isabelita',
    title: 'Apartamentos modernos en Ensanche Isabelita',
    kind: 'Apartamento',
    operation: 'venta',
    zone: 'Ensanche Isabelita',
    city: 'Santo Domingo Este',
    coords: [18.4935, -69.8642],
    price: { amount: 7150000, currency: 'DOP', from: true },
    beds: '2 – 3', bedsMin: 2,
    summary: 'Planta tipo de 2 y 3 habitaciones con walk-in closet, seguridad 24/7 y garantía real de 1 año.',
    description:
      'Apartamentos modernos y funcionales, diseñados para brindarte comodidad, seguridad y excelente terminación. Construidos con estructura en concreto armado bajo estándares ASTM y acabados de estándar americano.',
    highlights: ['Garantía real de 1 año', 'Seguridad 24/7', 'Inversor en área común', 'Baños en porcelanato español'],
    sections: [
      { title: 'Planta tipo', items: ['2 y 3 habitaciones', 'Sala / comedor', 'Cocina modular con desayunador', 'Habitación principal con walk-in closet + baño', 'Opción de parqueo(s) adicional(es) — aplican condiciones'] },
      { title: 'Terminaciones', items: ['Estructura en concreto armado (estándares ASTM)', 'Pisos en porcelanato', 'Baños en porcelanato español', 'Puertas en láminas de roble', 'Puerta principal en roble prensado', 'Piezas de baño monolíticas', 'Estándares americanos en general'] },
      { title: 'Amenidades del proyecto', items: ['Cisterna', 'Pozo tubular', 'Preinstalación para tinacos', 'Área de tendedero', 'Inversor en área común', 'Portón eléctrico', 'Seguridad 24/7', 'Garantía real de 1 año'] },
    ],
    tags: ['Garantía 1 año'],
    images: 7,
    agent: 'joel-polanco',
  },
  {
    id: 22,
    slug: 'penthouse-alquiler-avenida-espana',
    title: 'Penthouse en alquiler con terraza privada',
    kind: 'Penthouse',
    operation: 'alquiler',
    zone: 'Próximo a la Av. España',
    city: 'Santo Domingo Este',
    coords: [18.4782, -69.8705],
    price: { amount: 50000, currency: 'DOP', monthly: true },
    beds: '3', bedsMin: 3, area: '256 m²', parking: '2',
    summary: 'Amplio penthouse de 256 m² con terraza privada techada, baño en la terraza y 2 parqueos techados.',
    description:
      'Una propiedad amplia y cómoda, ideal para quienes buscan disfrutar de una terraza privada y una excelente ubicación próxima a la Avenida España, con vistas abiertas de la ciudad.',
    highlights: ['256 m²', 'Terraza privada techada', 'Baño en la terraza', '2 parqueos techados'],
    sections: [
      { title: 'Distribución', items: ['3 habitaciones', 'Sala y comedor', 'Cocina', 'Área de lavado', 'Habitación de servicio'] },
      { title: 'Extras', items: ['Terraza privada techada', 'Baño en el área de la terraza', '2 parqueos techados'] },
    ],
    tags: ['Terraza privada'],
    images: 8,
    agent: 'mary-rivas',
  },
  {
    id: 23,
    slug: 'apartamento-amueblado-vista-al-mar',
    title: 'Apartamento amueblado con vista al mar',
    kind: 'Apartamento',
    operation: 'alquiler',
    zone: 'Charles de Gaulle / Autopista San Isidro',
    city: 'Santo Domingo Este',
    coords: [18.5034, -69.8112],
    price: { amount: 45000, currency: 'DOP', monthly: true },
    beds: '3', bedsMin: 3, parking: 'Sí',
    summary: 'Totalmente amueblado, con balcón al mar, piscina, ascensor y seguridad 24 horas. Listo para mudarte.',
    description:
      'Disfruta de comodidad, seguridad y una hermosa vista al mar en un apartamento completamente amueblado y listo para mudarte, con fácil conexión a la Autopista San Isidro y a pocos minutos de plazas, supermercados y servicios.',
    highlights: ['Totalmente amueblado', 'Balcón con vista al mar', 'Piscina en la azotea', 'Seguridad 24 horas'],
    sections: [
      { title: 'El apartamento', items: ['3 habitaciones', '2 habitaciones con aire acondicionado', 'Sala y comedor', 'Cocina', 'Balcón con vista al mar', 'Totalmente amueblado'] },
      { title: 'El edificio', items: ['Ascensor', 'Lobby climatizado', 'Seguridad 24 horas', 'Picuzzi', 'Área social', 'Parqueo'] },
    ],
    tags: ['Amueblado', 'Vista al mar'],
    images: 8,
    coverFocus: '50% 0%',
    featured: true,
    agent: 'mary-rivas',
  },
  {
    id: 24,
    slug: 'casa-gurabo-santiago',
    title: 'Elegante casa en Gurabo, Santiago',
    kind: 'Casa',
    operation: 'venta',
    zone: 'Urb. Don Fernando, Gurabo',
    city: 'Santiago',
    coords: [19.4793, -70.6676],
    price: { amount: 25000000, currency: 'DOP' },
    beds: '4', bedsMin: 4, baths: '4.5', area: '300 m²', lot: '302 m²', parking: '4',
    summary: 'Proyecto cerrado con seguridad 24/7: 4 habitaciones con baño, cocina fría con isla y patio de 100 m². Precio negociable.',
    description:
      'Ubicada en la Urbanización Don Fernando, un proyecto cerrado con acceso controlado y seguridad 24/7. Una casa elegante con family room, cocina fría con isla y cocina caliente, terraza integrada a un patio de 100 m² y terminaciones de primera.',
    highlights: ['Precio negociable', 'Patio de 100 m²', 'Cocina con isla y tope de cuarzo', 'Marquesina para 4 vehículos'],
    sections: [
      { title: 'Primer nivel', items: ['Recibidor y sala de estar', 'Amplio comedor', 'Habitación con clóset y baño', 'Cocina fría con isla', 'Cocina caliente', 'Área de lavado', 'Terraza con acceso directo al patio', 'Baño de visitas'] },
      { title: 'Segundo nivel', items: ['Family room', 'Clóset de ropa blanca', 'Principal con walk-in closet, baño y balcón', '2 habitaciones con walk-in closet y baño'] },
      { title: 'Equipamiento y terminaciones', items: ['Estufa empotrable, extractor y horno de gas', 'Topes en cuarzo', 'Ventanas P92', 'Sistema de cámaras y alarma', 'Calentador eléctrico', 'Cisterna de 4,000 galones'] },
    ],
    tags: ['Negociable', 'Proyecto cerrado'],
    images: 8,
    render: true,
    agent: 'cristhian-almanzar',
  },
];

export const PROPERTIES = P;
/** Listings that can still be bought or rented. */
export const AVAILABLE = P.filter((p) => !p.sold);

export const img = (p: Property, n: number, size: 'sm' | 'lg' = 'lg') =>
  `/props/${p.slug}/${String(n).padStart(2, '0')}${size === 'sm' ? '-sm' : ''}.webp`;

export const gallery = (p: Property) => Array.from({ length: p.images }, (_, i) => i + 1);

export const ZONES = Array.from(new Set(P.map((p) => p.zone))).sort();
export const CITIES = Array.from(new Set(P.map((p) => p.city)));

export const statusLabel = (p: Property) =>
  p.status === 'planos' ? (p.delivery ? t('Entrega {d}', { d: p.delivery }) : t('En planos')) : p.status === 'entrega' ? t('Lista para entrega') : undefined;

/** Auto + manual tags shown on cards */
export const autoTags = (p: Property) => {
  const out: string[] = [];
  const s = statusLabel(p);
  if (s) out.push(s);
  return [...out, ...p.tags].slice(0, 2);
};
