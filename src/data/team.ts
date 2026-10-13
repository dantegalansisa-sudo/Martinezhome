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
}

// Only the contact data the client supplied is listed; missing fields stay empty on purpose.
export const TEAM: Member[] = [
  { id: 'vanessa-martinez', name: 'Lic. Vanessa Martínez', role: 'CEO & Fundadora', photo: '/team/vanessa-martinez.webp', phone: '829-797-2079', email: 'Vanessam.martinezp@gmail.com', lead: true },
  { id: 'cristhian-almanzar', name: 'Cristhian Almanzar', role: 'Asesor inmobiliario', photo: '/team/cristhian-almanzar.webp', fullBody: true, phone: '849-917-2926', email: 'chrisdaniel2929@gmail.com' },
  { id: 'joel-polanco', name: 'Joel Polanco', role: 'Asesor inmobiliario', photo: '/team/joel-polanco.webp', phone: '809-714-8785' },
  { id: 'alba-peguero', name: 'Alba Peguero', role: 'Asesora inmobiliaria', photo: '/team/alba-peguero.webp', fullBody: true, phone: '829-801-6986', email: 'albapeguero74@gmail.com' },
  { id: 'radaisa-martinez', name: 'Radaisa Martínez', role: 'Asesora inmobiliaria', photo: '/team/radaisa-martinez.webp', fullBody: true, phone: '809-421-5148', email: 'radaisamartinez15@gmail.com' },
  { id: 'mary-rivas', name: 'Mary Rivas', role: 'Asesora inmobiliaria', photo: '/team/mary-rivas.webp', fullBody: true },
];

export const member = (id: string) => TEAM.find((m) => m.id === id);
export const telHref = (phone: string) => `tel:+1${phone.replace(/\D/g, '')}`;
export const waHref = (phone: string, text?: string) =>
  `https://wa.me/1${phone.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
