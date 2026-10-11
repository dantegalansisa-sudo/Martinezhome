import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { NAV, waLink } from '../data';

const TARGET: Record<string, string> = {
  Propiedades: '#propiedades',
  Compra: '#propiedades',
  Alquiler: '#propiedades',
  Proyectos: '#propiedades',
  Servicios: '#servicios',
  'Sobre Nosotros': '#fundadora',
  Contacto: '#contacto',
};

const CITA = waLink('Hola Martínez Home, me gustaría agendar una cita.');

export const Brand = ({ light }: { light?: boolean }) =>
  light ? (
    <a href="#inicio" className="brand brand--light" aria-label="Martínez Home Inmobiliaria — inicio">
      <img src="./images/logo-light.png" alt="Martínez Home Inmobiliaria" className="brand__full" />
    </a>
  ) : (
    <a href="#inicio" className="brand" aria-label="Martínez Home RD — inicio">
      <img src="./images/logo-icon.png" alt="" className="brand__icon" />
      <span className="brand__text">
        <span>MARTÍNEZ</span>
        <span>HOME RD</span>
      </span>
    </a>
  );

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <motion.header
      className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.8, 0.25, 1] }}
    >
      <div className="container nav__inner">
        <Brand />
        <nav className="nav__links" aria-label="Principal">
          {NAV.map((n) => (
            <a key={n} href={TARGET[n]} className="nav__link">{n}</a>
          ))}
        </nav>
        <div className="nav__cta">
          <MagneticButton href={CITA} external className="btn-pill">
            <span>Agenda una cita</span>
            <span className="btn-pill__icon"><ArrowRight size={16} /></span>
          </MagneticButton>
        </div>
        <button className="nav__burger" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {NAV.map((n, i) => (
              <motion.a
                key={n}
                href={TARGET[n]}
                onClick={() => setOpen(false)}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
              >
                {n}
              </motion.a>
            ))}
            <a className="btn-dark" href={CITA} target="_blank" rel="noopener noreferrer">
              Agenda una cita <ArrowRight size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
