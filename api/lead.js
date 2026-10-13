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

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const clean = (v, max = 600) => String(v ?? '').trim().slice(0, max);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function layout(heading, inner) {
  return `<!doctype html><html lang="es"><body style="margin:0;background:#f7f4ef;font-family:Arial,Helvetica,sans-serif;color:#1b2433">
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
          Martínez Home Inmobiliaria · ${ADDRESS}<br>Tel./WhatsApp ${PHONE} · <a href="${SITE}" style="color:#e1141b">martinezhomerd.com</a>
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
  const fields = [['Nombre', name], ['Teléfono', phone], ...(email ? [['Correo', email]] : []), ...extra];
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
      await send(key, {
        from,
        to: [email],
        reply_to: to,
        subject: `${t.confirm} · Martínez Home`,
        html: layout(
          `${esc(t.confirm)}, ${esc(name.split(' ')[0])}`,
          `<p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#2a3446">
            Gracias por escribirnos. Un asesor de Martínez Home te contactará en menos de 24 horas.
            ${visit ? 'Adjuntamos la cita para que la agregues a tu calendario.' : ''}
          </p>
          ${rows(extra.length ? extra : fields)}
          <p style="margin:22px 0 0;font-size:14px;color:#6b7180">¿Necesitas algo antes? Escríbenos al <a href="https://wa.me/18297982079" style="color:#e1141b">${PHONE}</a>.</p>`
        ),
        attachments: visit
          ? [
              {
                filename: 'visita-martinez-home.ics',
                content: Buffer.from(
                  ics(
                    { date: visit.date, hour: Number(visit.hour) || 9, minute: Number(visit.minute) || 0 },
                    'Visita con Martínez Home',
                    extra.map(([k, v]) => `${k}: ${v}`).join('\n')
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
