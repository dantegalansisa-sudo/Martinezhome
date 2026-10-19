import { motion } from 'framer-motion';
import { Briefcase, Mail, Phone, Quote } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { telHref, waHref, type Member } from '../data/team';
import { waLink } from '../data/site';
import { EASINGS } from '../easings';
import { t } from '../i18n';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASINGS.premium } },
};

/** Advisor card: photo on top, a always-visible info panel with experience, focus areas and contact buttons below. */
export default function TeamCard({ m, compact }: { m: Member; compact?: boolean }) {
  const first = m.name.replace('Lic. ', '').split(' ')[0];
  const greeting = t('Hola {name}, vi tu perfil en la web de Martínez Home y me gustaría recibir asesoría.', { name: first });
  const chips = compact ? m.specialties.slice(0, 2) : m.specialties;

  return (
    <motion.article
      className={`member${compact ? ' member--compact' : ''}${m.lead ? ' member--lead' : ''}${m.fullBody ? ' member--full' : ''}`}
      variants={variants}
    >
      <div className="member__photo">
        <img src={m.photo} alt={m.name} loading="lazy" />
        <span className="member__shade" />
        {m.lead && <span className="member__badge">{t('Fundadora')}</span>}
        <span className="member__years">{t('{n}+ años', { n: m.years })}</span>
        <div className="member__info">
          <span className="member__role">{t(m.role)}</span>
          <h3 className="member__name">{m.name}</h3>
        </div>
      </div>

      <div className="member__panel">
        <ul className="member__stats">
          <li><Briefcase size={13} /> {t('{n} años de experiencia', { n: m.years })}</li>
        </ul>
        <div className="member__chips">
          {chips.map((s) => <span key={s}>{t(s)}</span>)}
        </div>
        {!compact && (
          <p className="member__quote"><Quote size={14} /> {t(m.quote)}</p>
        )}
        <div className="member__buttons">
          {m.phone ? (
            <>
              <a className="member__wa" href={waHref(m.phone, greeting)} target="_blank" rel="noopener noreferrer" aria-label={t('WhatsApp de {name}', { name: m.name })}>
                <WhatsAppIcon size={15} /> <span>WhatsApp</span>
              </a>
              <a className="member__icon" href={telHref(m.phone)} aria-label={t('Llamar a {name}', { name: m.name })}><Phone size={15} /></a>
            </>
          ) : (
            <a className="member__wa" href={waLink(t('Hola Martínez Home, me gustaría hablar con {name}.', { name: m.name }))} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={15} /> <span>{t('Contactar')}</span>
            </a>
          )}
          {m.email && <a className="member__icon" href={`mailto:${m.email}`} aria-label={t('Correo de {name}', { name: m.name })}><Mail size={15} /></a>}
        </div>
      </div>
    </motion.article>
  );
}
