import { motion } from 'framer-motion';
import { Briefcase, Home, Mail, Phone, Quote } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { listingsOf, telHref, waHref, type Member } from '../data/team';
import { waLink } from '../data/site';
import { EASINGS } from '../easings';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASINGS.premium } },
};

/** Advisor card: photo on top, a always-visible info panel with experience, focus areas and contact buttons below. */
export default function TeamCard({ m, compact }: { m: Member; compact?: boolean }) {
  const first = m.name.replace('Lic. ', '').split(' ')[0];
  const greeting = `Hola ${first}, vi tu perfil en la web de Martínez Home y me gustaría recibir asesoría.`;
  const listings = listingsOf(m.id);
  const chips = compact ? m.specialties.slice(0, 2) : m.specialties;

  return (
    <motion.article
      className={`member${compact ? ' member--compact' : ''}${m.lead ? ' member--lead' : ''}${m.fullBody ? ' member--full' : ''}`}
      variants={variants}
    >
      <div className="member__photo">
        <img src={m.photo} alt={m.name} loading="lazy" />
        <span className="member__shade" />
        {m.lead && <span className="member__badge">Fundadora</span>}
        <span className="member__years">{m.years}+ años</span>
        <div className="member__info">
          <span className="member__role">{m.role}</span>
          <h3 className="member__name">{m.name}</h3>
        </div>
      </div>

      <div className="member__panel">
        <ul className="member__stats">
          <li><Briefcase size={13} /> {m.years} años de experiencia</li>
          {listings > 0 && <li><Home size={13} /> {listings} {listings === 1 ? 'propiedad' : 'propiedades'}</li>}
        </ul>
        <div className="member__chips">
          {chips.map((s) => <span key={s}>{s}</span>)}
        </div>
        {!compact && (
          <p className="member__quote"><Quote size={14} /> {m.quote}</p>
        )}
        <div className="member__buttons">
          {m.phone ? (
            <>
              <a className="member__wa" href={waHref(m.phone, greeting)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp de ${m.name}`}>
                <WhatsAppIcon size={15} /> <span>WhatsApp</span>
              </a>
              <a className="member__icon" href={telHref(m.phone)} aria-label={`Llamar a ${m.name}`}><Phone size={15} /></a>
            </>
          ) : (
            <a className="member__wa" href={waLink(`Hola Martínez Home, me gustaría hablar con ${m.name}.`)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={15} /> <span>Contactar</span>
            </a>
          )}
          {m.email && <a className="member__icon" href={`mailto:${m.email}`} aria-label={`Correo de ${m.name}`}><Mail size={15} /></a>}
        </div>
      </div>
    </motion.article>
  );
}
