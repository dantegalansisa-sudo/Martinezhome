import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { WhatsAppIcon } from './BrandIcons';
import { telHref, waHref, type Member } from '../data/team';
import { EASINGS } from '../easings';

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASINGS.premium } },
};

export default function TeamCard({ m, compact }: { m: Member; compact?: boolean }) {
  const hasContact = m.phone || m.email;
  return (
    <motion.article className={`member${compact ? ' member--compact' : ''}${m.lead ? ' member--lead' : ''}${m.fullBody ? ' member--full' : ''}`} variants={variants}>
      <div className="member__photo">
        <img src={m.photo} alt={m.name} loading="lazy" />
        <span className="member__shade" />
        {m.lead && <span className="member__badge">Fundadora</span>}
        <div className="member__info">
          <span className="member__role">{m.role}</span>
          <h3 className="member__name">{m.name}</h3>
          {hasContact && (
            <div className="member__actions">
              {m.phone && (
                <>
                  <a href={waHref(m.phone, `Hola ${m.name.replace('Lic. ', '')}, vi tu perfil en la web de Martínez Home.`)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp de ${m.name}`}><WhatsAppIcon size={16} /></a>
                  <a href={telHref(m.phone)} aria-label={`Llamar a ${m.name}`}><Phone size={15} /></a>
                </>
              )}
              {m.email && <a href={`mailto:${m.email}`} aria-label={`Correo de ${m.name}`}><Mail size={15} /></a>}
            </div>
          )}
        </div>
      </div>
      {!compact && hasContact && (
        <ul className="member__contact">
          {m.phone && <li><Phone size={14} /> <a href={telHref(m.phone)}>{m.phone}</a></li>}
          {m.email && <li><Mail size={14} /> <a href={`mailto:${m.email}`}>{m.email}</a></li>}
        </ul>
      )}
    </motion.article>
  );
}
