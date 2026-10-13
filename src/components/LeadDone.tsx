import { motion } from 'framer-motion';
import { AlertCircle, Check, MailCheck } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { waLink } from '../data/site';
import type { LeadResult } from '../lib/lead';

interface Props {
  result: LeadResult;
  name: string;
  email?: string;
  whatsappText: string;
  onAgain?: () => void;
  againLabel?: string;
}

/** Shared "request received" screen for the contact, visit and sell forms. */
export default function LeadDone({ result, name, email, whatsappText, onAgain, againLabel = 'Enviar otra solicitud' }: Props) {
  const first = name.split(' ')[0];
  const failed = result.via === 'failed';
  const Icon = failed ? AlertCircle : result.via === 'email' ? MailCheck : Check;

  return (
    <div className="cform__done">
      <motion.span
        className={`cform__check${failed ? ' cform__check--warn' : ''}`}
        initial={{ scale: 0, rotate: -40 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 }}
      >
        <Icon size={30} strokeWidth={2.2} />
      </motion.span>

      {result.via === 'email' && (
        <>
          <h3>¡Gracias, {first || 'por escribirnos'}!</h3>
          <p>
            Recibimos tu solicitud y un asesor te contactará en menos de 24 horas.
            {result.confirmation && email && <> Te enviamos un correo de confirmación a <strong>{email}</strong>.</>}
          </p>
        </>
      )}
      {result.via === 'whatsapp' && (
        <>
          <h3>¡Gracias, {first || 'por escribirnos'}!</h3>
          <p>Abrimos WhatsApp con tu solicitud lista para enviar. Si no se abrió, usa el botón de abajo.</p>
        </>
      )}
      {failed && (
        <>
          <h3>No pudimos enviar tu solicitud</h3>
          <p>Hubo un problema de conexión. Envíanosla por WhatsApp y te respondemos de inmediato.</p>
        </>
      )}

      {(result.via !== 'email' || failed) && (
        <a className="btn-wa" href={waLink(whatsappText)} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={17} /> {failed ? 'Enviar por WhatsApp' : 'Abrir WhatsApp'}
        </a>
      )}
      {onAgain && <button type="button" className="cform__again" onClick={onAgain}>{againLabel}</button>}
    </div>
  );
}
