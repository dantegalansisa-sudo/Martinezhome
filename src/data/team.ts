import { AVAILABLE } from './properties';

export interface Member {
  id: string;
  name: string;
  role: string;
  photo: string;
  phone?: string;
  email?: string;
  lead?: boolean;
  /** Full-length studio portrait — cropped to the upper body in cards */
  fullBody?: boolean;
  /** Years in real estate — placeholder until the client confirms */
  years: number;
  specialties: string[];
  quote: string;
}

// Contact data comes from the client. Years, specialties and quotes are realistic placeholders
// (approved by the agency) until each advisor confirms their own.
export const TEAM: Member[] = [
  {
    id: 'vanessa-martinez', name: 'Lic. Vanessa Martínez', role: 'CEO & Fundadora', photo: '/team/vanessa-martinez.webp',
    phone: '829-797-2079', email: 'Vanessam.martinezp@gmail.com', lead: true,
    years: 15, specialties: ['Inversión', 'Proyectos en planos', 'Negociación'],
    quote: 'Mi compromiso es acompañarte a encontrar el lugar donde realmente quieras estar.',
  },
  {
    id: 'cristhian-almanzar', name: 'Cristhian Almanzar', role: 'Asesor inmobiliario', photo: '/team/cristhian-almanzar.webp', fullBody: true,
    phone: '849-917-2926', email: 'chrisdaniel2929@gmail.com',
    years: 6, specialties: ['Casas', 'Santo Domingo Este'],
    quote: 'Cada familia merece una casa que se sienta suya desde el primer día.',
  },
  {
    id: 'joel-polanco', name: 'Joel Polanco', role: 'Asesor inmobiliario', photo: '/team/joel-polanco.webp',
    phone: '809-714-8785',
    years: 8, specialties: ['Proyectos en planos', 'Financiamiento'],
    quote: 'Te explico cada número del plan de pago para que inviertas con tranquilidad.',
  },
  {
    id: 'alba-peguero', name: 'Alba Peguero', role: 'Asesora inmobiliaria', photo: '/team/alba-peguero.webp', fullBody: true,
    phone: '829-801-6986', email: 'albapeguero74@gmail.com',
    years: 7, specialties: ['Apartamentos', 'Prado Oriental'],
    quote: 'Escucho lo que buscas y te muestro solo lo que vale tu tiempo.',
  },
  {
    id: 'mary-rivas', name: 'Mary Rivas', role: 'Asesora inmobiliaria', photo: '/team/mary-rivas.webp', fullBody: true,
    years: 3, specialties: ['Alquileres', 'Primera vivienda'],
    quote: 'Te acompaño paso a paso, desde la primera visita hasta la entrega de llaves.',
  },
  {
    id: 'radaisa-martinez', name: 'Radaisa Martínez', role: 'Asesora inmobiliaria', photo: '/team/radaisa-martinez.webp', fullBody: true,
    phone: '809-421-5148', email: 'radaisamartinez15@gmail.com',
    years: 5, specialties: ['Inversión', 'Punta Cana'],
    quote: 'Una buena inversión empieza con la información correcta.',
  },
];

export const member = (id: string) => TEAM.find((m) => m.id === id);
/** Number of published listings assigned to an advisor. */
export const listingsOf = (id: string) => AVAILABLE.filter((p) => p.agent === id).length;
export const telHref = (phone: string) => `tel:+1${phone.replace(/\D/g, '')}`;
export const waHref = (phone: string, text?: string) =>
  `https://wa.me/1${phone.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
