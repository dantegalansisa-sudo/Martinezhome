/**
 * POST /api/lead — receives the contact, visit and "sell with us" forms.
 *
 * Sends two emails through Resend (https://resend.com):
 *   1. a notification to the agency (LEADS_TO), with reply-to set to the client;
 *   2. a confirmation to the client, when they left an email (visits include a calendar invite).
 *
 * Environment variables (Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY  required — without it the endpoint answers 503 and the site falls back to WhatsApp
 *   LEADS_TO        inbox that receives the requests (default: the CEO's email)
 *   RESEND_FROM     sender, e.g. "Martínez Home <notificaciones@martinezhomerd.com>" once the domain is verified
 */

const DEFAULT_TO = 'Vanessam.martinezp@gmail.com';
const DEFAULT_FROM = 'Martínez Home <onboarding@resend.dev>';
const SITE = 'https://www.martinezhomerd.com';
const PHONE = '829-798-2079';
const ADDRESS = 'Calle Torrente de Cedrón #4, Prado Oriental, 2do nivel, Autopista San Isidro, Santo Domingo Este';

const TYPES = {
  contacto: { subject: 'Nueva solicitud de contacto', title: 'Nueva solicitud desde la web', confirm: 'Recibimos tu solicitud' },
  visita: { subject: 'Nueva cita agendada', title: 'Un cliente agendó una visita', confirm: 'Tu visita está agendada' },
  venta: { subject: 'Nuevo propietario quiere vender', title: 'Un propietario quiere trabajar con ustedes', confirm: 'Recibimos los datos de tu propiedad' },
};

// English copy for the client's confirmation when the visitor browsed the site in English.
// The agency notification stays in Spanish, with a note on the visitor's language.
const CONFIRM_EN = {
  contacto: 'We received your request',
  visita: 'Your visit is booked',
  venta: 'We received your property details',
};
const EN_WORDS = {
  Nombre: 'Name', Teléfono: 'Phone', Correo: 'Email', Interés: 'Interest', 'Tipo de propiedad': 'Property type', Presupuesto: 'Budget',
  'Precio esperado': 'Expected price', 'Zona de interés': 'Area of interest', 'Contactar por': 'Contact by', Mensaje: 'Message',
  Propiedad: 'Property', Fecha: 'Date', Hora: 'Time', Modalidad: 'Format', Enlace: 'Link', Quiere: 'Wants to',
  'Sector / ciudad': 'Neighborhood / city', Detalles: 'Details',
  Comprar: 'Buy', Alquilar: 'Rent', Vender: 'Sell', Invertir: 'Invest', Casa: 'House', Apartamento: 'Apartment', Villa: 'Villa',
  Solar: 'Lot', Local: 'Commercial space', 'Local comercial': 'Commercial space', Llamada: 'Phone call', Presencial: 'In person',
  Videollamada: 'Video call', 'Más de US$400K': 'Over US$400K', 'Hasta US$100K': 'Up to US$100K',
};
const en = (v) => EN_WORDS[v] ?? String(v).replace(/^(\d{1,2}:\d{2}) ([ap])\. m\.$/, (_, h, ap) => `${h} ${ap.toUpperCase()}M`);

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const clean = (v, max = 600) => String(v ?? '').trim().slice(0, max);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function layout(heading, inner, lang = 'es') {
  return `<!doctype html><html lang="${lang}"><body style="margin:0;background:#f7f4ef;font-family:Arial,Helvetica,sans-serif;color:#1b2433">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;padding:32px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden">
        <tr><td style="background:#1b2433;padding:22px 28px">
          <img src="${SITE}/images/logo-mark.png" width="64" alt="Martínez Home" style="display:inline-block;vertical-align:middle">
          <span style="display:inline-block;vertical-align:middle;margin-left:12px;color:#ffffff;font-size:15px;letter-spacing:3px;font-weight:bold">MARTÍNEZ HOME RD</span>
        </td></tr>
        <tr><td style="padding:28px">
          <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#1b2433">${heading}</h1>
          ${inner}
        </td></tr>
        <tr><td style="padding:18px 28px;background:#f7f4ef;font-size:12px;color:#6b7180;line-height:1.6">
          ${lang === 'en' ? 'Martínez Home Real Estate' : 'Martínez Home Inmobiliaria'} · ${ADDRESS}<br>${lang === 'en' ? 'Phone' : 'Tel.'}/WhatsApp ${PHONE} · <a href="${SITE}" style="color:#e1141b">martinezhomerd.com</a>
        </td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

function rows(fields) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
    ${fields
      .map(
        ([k, v]) => `<tr>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#6b7180;width:38%;vertical-align:top">${esc(k)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #eee;font-weight:bold;white-space:pre-line">${esc(v)}</td>
        </tr>`
      )
      .join('')}
  </table>`;
}

/** Visit invite in Santo Domingo time (UTC-4, no daylight saving). */
function ics({ date, hour, minute }, summary, description) {
  const [y, m, d] = date.split('-').map(Number);
  const start = new Date(Date.UTC(y, m - 1, d, hour + 4, minute));
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const fmt = (dt) => dt.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const text = (s) => s.replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Martinez Home RD//Visitas//ES',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@martinezhomerd.com`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${text(summary)}`,
    `DESCRIPTION:${text(description)}`,
    `LOCATION:${text(ADDRESS)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

async function send(key, payload) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
}

export default async function handler(req, res) {
  // The site asks first whether email is available, to decide between email and the WhatsApp fallback.
  if (req.method === 'GET') return res.status(200).json({ configured: !!process.env.RESEND_API_KEY });
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, reason: 'method' });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) return res.status(503).json({ ok: false, reason: 'not-configured' });

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  body = body || {};

  // Honeypot: real visitors never fill this hidden field.
  if (body.website) return res.status(200).json({ ok: true });

  const type = TYPES[body.type] ? body.type : 'contacto';
  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  if (name.length < 2 || phone.replace(/\D/g, '').length < 7) {
    return res.status(400).json({ ok: false, reason: 'invalid' });
  }

  const extra = Array.isArray(body.fields) ? body.fields.slice(0, 20).map(([k, v]) => [clean(k, 60), clean(v)]).filter(([, v]) => v) : [];
  const english = body.lang === 'en';
  const fields = [['Nombre', name], ['Teléfono', phone], ...(email ? [['Correo', email]] : []), ...extra, ...(english ? [['Idioma', 'Inglés — responder en inglés']] : [])];
  const t = TYPES[type];
  const to = process.env.LEADS_TO || DEFAULT_TO;
  const from = process.env.RESEND_FROM || DEFAULT_FROM;
  const wa = `https://wa.me/1${phone.replace(/\D/g, '').replace(/^1/, '')}`;

  try {
    await send(key, {
      from,
      to: [to],
      reply_to: isEmail(email) ? email : undefined,
      subject: `${t.subject} · ${name}`,
      html: layout(
        t.title,
        `${rows(fields)}
        <p style="margin:22px 0 0">
          <a href="${wa}" style="display:inline-block;background:#25d366;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:bold;font-size:14px">Responder por WhatsApp</a>
          ${isEmail(email) ? `<a href="mailto:${esc(email)}" style="display:inline-block;margin-left:8px;color:#1b2433;font-size:14px">o por correo</a>` : ''}
        </p>`
      ),
    });

    if (isEmail(email)) {
      const visit = type === 'visita' && body.visit && /^\d{4}-\d{2}-\d{2}$/.test(body.visit.date) ? body.visit : null;
      const confirm = english ? CONFIRM_EN[type] : t.confirm;
      const shown = (extra.length ? extra : fields).map(([k, v]) => (english ? [en(k), en(v)] : [k, v]));
      const copy = english
        ? {
            intro: 'Thank you for reaching out. A Martínez Home advisor will contact you within 24 hours.',
            invite: 'The appointment is attached so you can add it to your calendar.',
            more: 'Need anything sooner? Message us at',
            event: 'Visit with Martínez Home',
            file: 'visit-martinez-home.ics',
          }
        : {
            intro: 'Gracias por escribirnos. Un asesor de Martínez Home te contactará en menos de 24 horas.',
            invite: 'Adjuntamos la cita para que la agregues a tu calendario.',
            more: '¿Necesitas algo antes? Escríbenos al',
            event: 'Visita con Martínez Home',
            file: 'visita-martinez-home.ics',
          };
      await send(key, {
        from,
        to: [email],
        reply_to: to,
        subject: `${confirm} · Martínez Home`,
        html: layout(
          `${esc(confirm)}, ${esc(name.split(' ')[0])}`,
          `<p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#2a3446">
            ${copy.intro}
            ${visit ? copy.invite : ''}
          </p>
          ${rows(shown)}
          <p style="margin:22px 0 0;font-size:14px;color:#6b7180">${copy.more} <a href="https://wa.me/18297982079" style="color:#e1141b">${PHONE}</a>.</p>`,
          english ? 'en' : 'es'
        ),
        attachments: visit
          ? [
              {
                filename: copy.file,
                content: Buffer.from(
                  ics(
                    { date: visit.date, hour: Number(visit.hour) || 9, minute: Number(visit.minute) || 0 },
                    copy.event,
                    shown.map(([k, v]) => `${k}: ${v}`).join('\n')
                  )
                ).toString('base64'),
              },
            ]
          : undefined,
      });
    }

    return res.status(200).json({ ok: true, confirmation: isEmail(email) });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ ok: false, reason: 'send-failed' });
  }
}
