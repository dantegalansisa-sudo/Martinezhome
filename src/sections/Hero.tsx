import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Building2, CalendarDays, ChevronDown, Home, MapPin, Play, Search, Tag, Waves } from 'lucide-react';
import RevealText from '../components/RevealText';
import AnimatedCounter from '../components/AnimatedCounter';
import MagneticButton from '../components/MagneticButton';
import { EASINGS } from '../easings';
import { CITIES, ZONES } from '../data/properties';
import { useIsDesktop } from '../useMedia';

const MotionLink = motion.create(Link);

const FILTERS = [
  { label: 'Todos', icon: Home },
  { label: 'Venta', icon: Tag },
  { label: 'Alquiler', icon: CalendarDays },
  { label: 'Proyectos', icon: Building2 },
];
const LOCATIONS = ['Todas las zonas', ...CITIES, ...ZONES.filter((z) => !CITIES.includes(z))];
const TYPES = ['Todos los tipos', 'Casa', 'Apartamento', 'Villa'];
const OP: Record<string, string> = { Venta: 'op=venta', Alquiler: 'op=alquiler', Proyectos: 'estado=planos' };

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASINGS.smooth },
});

export default function Hero({ onTour }: { onTour: () => void }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todos');
  const [loc, setLoc] = useState(LOCATIONS[0]);
  const [type, setType] = useState(TYPES[0]);
  const desktop = useIsDesktop();
  const { scrollY } = useScroll();
  // Translate-only parallax (no scaling) keeps the large image on the GPU; skipped on touch devices.
  const bgY = useTransform(scrollY, [0, 900], [0, 140]);

  const search = () => {
    const q = new URLSearchParams(OP[filter] ?? '');
    if (loc !== LOCATIONS[0]) q.set(CITIES.includes(loc) ? 'ciudad' : 'zona', loc);
    if (type !== TYPES[0]) q.set('tipo', type);
    navigate(`/propiedades${q.toString() ? `?${q}` : ''}`);
  };

  return (
    <section className="hero" id="inicio">
      <motion.div className="hero__bg" style={desktop ? { y: bgY } : undefined}>
        <motion.img
          src="/images/hero.webp"
          alt="Torre residencial moderna frente al mar al atardecer"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASINGS.smooth }}
        />
      </motion.div>
      <div className="hero__veil" />
      <motion.button className="hero__tour-pill" onClick={onTour} {...fadeUp(0.2)}>
        <span><Play size={12} fill="currentColor" /></span> Recorrido virtual
      </motion.button>

      <div className="container hero__grid">
        <div className="hero__left">
          <motion.p className="eyebrow" {...fadeUp(0.3)}>Tu próximo hogar en República Dominicana</motion.p>
          <h1 className="hero__title" aria-label="Martínez Home RD">
            <RevealText tag="span" className="hero__title-a" delay={0.4} immediate>MARTÍNEZ</RevealText>
            <RevealText tag="span" className="hero__title-b" delay={0.6} immediate>HOME RD</RevealText>
          </h1>
          <motion.p className="hero__lead" {...fadeUp(0.9)}>
            Propiedades que se adaptan a tu estilo de vida. Compra, vende o invierte con asesoría experta y acompañamiento personalizado.
          </motion.p>

          <motion.div className="chips" {...fadeUp(1.05)} role="tablist" aria-label="Tipo de operación">
            {FILTERS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                role="tab"
                aria-selected={filter === label}
                className={`chip${filter === label ? ' chip--active' : ''}`}
                onClick={() => setFilter(label)}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </motion.div>

          <motion.div className="searchbar" {...fadeUp(1.2)}>
            <label className="searchbar__field">
              <MapPin size={18} />
              <span className="searchbar__text">
                <small>Ubicación</small>
                <select value={loc} onChange={(e) => setLoc(e.target.value)}>
                  {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </span>
              <ChevronDown size={16} className="searchbar__chev" />
            </label>
            <span className="searchbar__divider" />
            <label className="searchbar__field">
              <Home size={18} />
              <span className="searchbar__text">
                <small>Tipo de propiedad</small>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </span>
              <ChevronDown size={16} className="searchbar__chev" />
            </label>
            <MagneticButton className="searchbar__btn" onClick={search} ariaLabel="Buscar propiedades" strength={0.4}>
              <Search size={20} />
            </MagneticButton>
          </motion.div>

          <div className="hero__bottom">
            <MotionLink
              to="/propiedades"
              className="seal"
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: EASINGS.bounce }}
            >
              <svg viewBox="0 0 100 100" className="seal__shape" aria-hidden>
                <path d="M50 2C58 2 60 8 67 10C74 12 79 8 85 13C91 18 88 25 91 31C94 38 100 41 98 50C100 59 94 62 91 69C88 75 91 82 85 87C79 92 74 88 67 90C60 92 58 98 50 98C42 98 40 92 33 90C26 88 21 92 15 87C9 82 12 75 9 69C6 62 0 59 2 50C0 41 6 38 9 31C12 25 9 18 15 13C21 8 26 12 33 10C40 8 42 2 50 2Z" />
              </svg>
              <span className="seal__content">
                <ArrowUpRight size={16} />
                Encuentra tu propiedad ideal
              </span>
            </MotionLink>

            <motion.div className="stats" {...fadeUp(1.5)}>
              <div><strong><AnimatedCounter target={500} prefix="+" /></strong><span>Propiedades<br />disponibles</span></div>
              <div><strong><AnimatedCounter target={300} prefix="+" /></strong><span>Familias<br />felices</span></div>
              <div><strong><AnimatedCounter target={15} prefix="+" /></strong><span>Años de<br />experiencia</span></div>
            </motion.div>
          </div>
        </div>

        <div className="hero__right">
          <motion.div className="tour" {...fadeUp(1.1)}>
            <button className="tour__media" onClick={onTour} aria-label="Ver recorrido virtual">
              <img src="/props/villa-amueblada-punta-cana/01-sm.webp" alt="" />
              <span className="tour__play"><Play size={20} fill="currentColor" /></span>
            </button>
            <div className="tour__row">
              <span className="tour__title">Recorrido virtual<br />3D</span>
              <button className="tour__go" onClick={onTour} aria-label="Abrir recorrido"><ArrowUpRight size={18} /></button>
            </div>
            <span className="tour__line" aria-hidden />
          </motion.div>
          <motion.p className="tour__caption" {...fadeUp(1.25)}>
            Explora nuestras propiedades desde cualquier lugar con recorridos virtuales inmersivos.
          </motion.p>

          <motion.div className="social-proof" {...fadeUp(1.4)}>
            <div className="social-proof__row">
              <div className="avatars" aria-hidden>
                <img src="/team/vanessa-martinez.webp" alt="" />
                <span style={{ background: '#c9a77c' }}>JP</span>
                <span style={{ background: '#b9442f' }}>AL</span>
              </div>
              <div className="social-proof__num"><strong>+300</strong><span>Clientes satisfechos</span></div>
            </div>
            <a href="#redes" className="social-proof__link">Conoce sus historias <ArrowUpRight size={16} /></a>
          </motion.div>
        </div>
      </div>

      <motion.div className="hotspot hotspot--sea" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.7, duration: 0.8 }}>
        <span className="hotspot__icon"><Waves size={16} /></span> Vista al mar
        <span className="hotspot__tail" aria-hidden />
      </motion.div>
      <motion.div className="hotspot hotspot--amen" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.9, duration: 0.8 }}>
        <span className="hotspot__icon"><Building2 size={16} /></span> Amenidades
      </motion.div>
    </section>
  );
}
