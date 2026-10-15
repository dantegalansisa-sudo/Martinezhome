import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Heart, Menu, X } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { NAV } from '../data/site';
import { useStore } from '../store';
import LangSwitch from '../components/LangSwitch';
import { t } from '../i18n';

export const Brand = () => (
  <Link to="/" className="brand" aria-label={t('Martínez Home RD — inicio')}>
    <img src="/images/logo-mark.png" alt="" className="brand__icon" />
    <span className="brand__text">
      <span>MARTÍNEZ</span>
      <span>HOME RD</span>
    </span>
  </Link>
);

/** Matches the current URL (path + query) so query-based items like "Alquiler" highlight correctly. */
const useIsActive = () => {
  const { pathname, search, hash } = useLocation();
  return (to: string) => {
    const [path, rest = ''] = to.split(/(?=[?#])/);
    if (rest.startsWith('#')) return pathname === path && hash === rest;
    if (rest.startsWith('?')) return pathname === path && search === rest;
    return path === '/propiedades' ? pathname === path && !search : pathname.startsWith(path) && path !== '/';
  };
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { favorites, openVisit } = useStore();
  const isActive = useIsActive();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);
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
        <nav className="nav__links" aria-label={t('Principal')}>
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} className={`nav__link${isActive(n.to) ? ' is-active' : ''}`}>{t(n.label)}</Link>
          ))}
        </nav>
        <div className="nav__actions">
          <LangSwitch />
          <Link to="/favoritos" className="nav__fav" aria-label={`${t('Favoritos')} (${favorites.length})`}>
            <Heart size={18} />
            <AnimatePresence>
              {favorites.length > 0 && (
                <motion.span key={favorites.length} className="nav__badge" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  {favorites.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <div className="nav__cta">
            <MagneticButton onClick={() => openVisit()} className="btn-pill">
              <span>{t('Agenda una cita')}</span>
              <span className="btn-pill__icon"><ArrowRight size={16} /></span>
            </MagneticButton>
          </div>
          <button className="nav__burger" aria-label={open ? t('Cerrar menú') : t('Abrir menú')} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
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
            {[...NAV, { label: 'Favoritos', to: '/favoritos' }, { label: 'Vende con nosotros', to: '/vende-con-nosotros' }].map((n, i) => (
              <motion.div key={n.label} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.04 }}>
                <Link to={n.to} className="mobile-menu__link">{t(n.label)}</Link>
              </motion.div>
            ))}
            <button className="btn-dark" onClick={() => { setOpen(false); openVisit(); }}>
              {t('Agenda una cita')} <ArrowRight size={16} />
            </button>
            <div className="mobile-menu__lang"><LangSwitch id="menu" /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
