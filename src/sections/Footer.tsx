import { MapPin, Phone } from 'lucide-react';
import { InstagramIcon, ThreadsIcon, WhatsAppIcon } from '../components/BrandIcons';
import { CONTACT, NAV } from '../data';
import { Brand } from './Navbar';

const HREF: Record<string, string> = {
  Propiedades: '#propiedades', Compra: '#propiedades', Alquiler: '#propiedades', Proyectos: '#propiedades',
  Servicios: '#servicios', 'Sobre Nosotros': '#fundadora', Contacto: '#contacto',
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <Brand />
          <nav className="footer__nav" aria-label="Pie de página">
            {NAV.map((n) => <a key={n} href={HREF[n]}>{n}</a>)}
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
          <span>© 2026 Martínez Home Inmobiliaria. Todos los derechos reservados.</span>
          <span><a href="#inicio">Términos y condiciones</a> | <a href="#inicio">Política de privacidad</a></span>
        </div>
      </div>
    </footer>
  );
}
