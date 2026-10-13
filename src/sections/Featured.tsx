import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealText from '../components/RevealText';
import PropertyCard from '../components/PropertyCard';
import { PROPERTIES, type Property } from '../data/properties';

const TABS: { label: string; match: (p: Property) => boolean }[] = [
  { label: 'Destacadas', match: (p) => !!p.featured },
  { label: 'Casas', match: (p) => p.kind === 'Casa' },
  { label: 'Apartamentos', match: (p) => p.kind === 'Apartamento' },
  { label: 'Villas', match: (p) => p.kind === 'Villa' },
  { label: 'En planos', match: (p) => p.status === 'planos' },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };

export default function Featured() {
  const [tab, setTab] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const list = PROPERTIES.filter(TABS[tab].match).slice(0, 8);

  const slide = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>('.prop');
    el.scrollBy({ left: dir * ((first?.offsetWidth ?? 300) + 20), behavior: 'smooth' });
  };

  return (
    <section className="section featured" id="propiedades">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Propiedades destacadas</p>
            <RevealText tag="h2" className="h2">Encuentra tu próximo hogar</RevealText>
          </div>
          <div className="featured__tools">
            <div className="tabs" role="tablist">
              {TABS.map((t, i) => (
                <button key={t.label} role="tab" aria-selected={tab === i} className={`tab${tab === i ? ' tab--active' : ''}`} onClick={() => setTab(i)}>
                  {t.label}
                  {tab === i && <motion.span layoutId="tab-pill" className="tab__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                </button>
              ))}
            </div>
            <Link to="/propiedades" className="link-arrow">
              Ver las {PROPERTIES.length} propiedades <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="featured__wrap container">
        <button className="slider-btn slider-btn--prev" onClick={() => slide(-1)} aria-label="Anterior"><ChevronLeft size={18} /></button>
        <motion.div
          ref={track}
          key={tab}
          className="featured__track"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {list.map((p) => <PropertyCard key={p.id} p={p} />)}
        </motion.div>
        <button className="slider-btn slider-btn--next" onClick={() => slide(1)} aria-label="Siguiente"><ChevronRight size={18} /></button>
      </div>
    </section>
  );
}
