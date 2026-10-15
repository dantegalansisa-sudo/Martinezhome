import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { InstagramIcon, ThreadsIcon, WhatsAppIcon } from '../components/BrandIcons';
import { CONTACT, NAV } from '../data/site';
import { Brand } from './Navbar';
import { t } from '../i18n';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Brand />
          <nav className="footer__nav" aria-label={t('Pie de página')}>
            {NAV.map((n) => <Link key={n.label} to={n.to}>{t(n.label)}</Link>)}
            <Link to="/vende-con-nosotros">{t('Vende con nosotros')}</Link>
          </nav>
          <div className="footer__social">
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href={CONTACT.threads} target="_blank" rel="noopener noreferrer" aria-label="Threads"><ThreadsIcon /></a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsAppIcon /></a>
          </div>
        </div>
        <div className="footer__info">
          <a href={CONTACT.phoneHref}><Phone size={14} /> {CONTACT.phone}</a>
          <span><MapPin size={14} /> {CONTACT.address}</span>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Martínez Home Inmobiliaria. {t('Todos los derechos reservados.')}</span>
          <span><Link to="/terminos">{t('Términos y condiciones')}</Link> | <Link to="/privacidad">{t('Política de privacidad')}</Link></span>
        </div>
        <div className="footer__credit">
          <span>{t('Diseño y desarrollo web por')}</span>
          <a href="https://www.nexixtechstudio.com" target="_blank" rel="noopener">
            NEXIX Tech Studio <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
