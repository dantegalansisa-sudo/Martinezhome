import { waLink } from '../data/site';

export type LeadType = 'contacto' | 'visita' | 'venta';

export interface Lead {
  type: LeadType;
  name: string;
  phone: string;
  email?: string;
  /** Extra label/value pairs shown in both emails */
  fields: [string, string][];
  visit?: { date: string; hour: number; minute: number };
  /** Honeypot value — must stay empty */
  website?: string;
  /** Visitor's language, so the client's confirmation email matches it */
  lang?: 'es' | 'en';
}

/**
 * - 'email': the server emailed the agency (and the client, when `confirmation`).
 * - 'whatsapp': email isn't set up yet, so WhatsApp was opened with the request.
 * - 'failed': email is set up but sending failed — the UI offers WhatsApp as a manual fallback.
 */
export type LeadResult = { via: 'email'; confirmation: boolean } | { via: 'whatsapp' } | { via: 'failed' };

let status: Promise<boolean> | null = null;

/** Whether /api/lead can send email. Cached; false in local dev where the API doesn't exist. */
export function emailEnabled() {
  status ??= fetch('/api/lead')
    .then((r) => r.json())
    .then((d) => !!d.configured)
    .catch(() => false);
  return status;
}

/** Call when a form mounts so the answer is ready by the time the visitor submits. */
export const warmLead = () => void emailEnabled();

export async function sendLead(lead: Lead, whatsappText: string): Promise<LeadResult> {
  if (!(await emailEnabled())) {
    // The status promise is warmed on mount, so this still runs within the click's user activation.
    const w = window.open(waLink(whatsappText), '_blank');
    if (!w) window.location.href = waLink(whatsappText);
    return { via: 'whatsapp' };
  }
  try {
    const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
    const data = await r.json().catch(() => ({}));
    if (r.ok && data.ok) return { via: 'email', confirmation: !!data.confirmation };
  } catch {
    /* handled below */
  }
  return { via: 'failed' };
}

