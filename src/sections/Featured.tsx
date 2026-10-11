import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Bath, BedDouble, ChevronLeft, ChevronRight, Heart, MapPin, Maximize, Expand } from 'lucide-react';
import RevealText from '../components/RevealText';
import { PROPERTIES, waLink } from '../data';
import { EASINGS } from '../easings';

const TABS = ['Todos', 'Venta', 'Alquiler', 'Proyectos'] as const;
const toType = (t: string) => (t === 'Proyectos' ? 'Proyecto' : t);

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const card = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASINGS.premium } },
};

export default function Featured() {
  const [tab, setTab] = useState<string>('Todos');
  const [favs, setFavs] = useState<number[]>([]);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = (e: Event) => setTab((e as CustomEvent<string>).detail);
    window.addEventListener('mh:filter', on);
    return () => window.removeEventListener('mh:filter', on);
  }, []);

  useEffect(() => {
    track.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [tab]);

  const list = PROPERTIES.filter((p) => tab === 'Todos' || p.type === toType(tab));
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
              {TABS.map((t) => (
                <button key={t} role="tab" aria-selected={tab === t} className={`tab${tab === t ? ' tab--active' : ''}`} onClick={() => setTab(t)}>
                  {t}
                  {tab === t && <motion.span layoutId="tab-pill" className="tab__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                </button>
              ))}
            </div>
            <a href={waLink('Hola, quisiera ver todas las propiedades disponibles.')} target="_blank" rel="noopener noreferrer" className="link-arrow">
              Ver todas las propiedades <ArrowUpRight size={16} />
            </a>
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
            {list.map((p) => (
              <motion.article key={p.id} className="prop" variants={card} whileHover={{ y: -8, transition: { duration: 0.25 } }}>
                <div className="prop__media">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <span className={`prop__badge prop__badge--${p.type.toLowerCase()}`}>{p.type}</span>
                  {p.tag && <span className="prop__tag">{p.tag}</span>}
                  <button
                    className={`prop__fav${favs.includes(p.id) ? ' is-on' : ''}`}
                    aria-label="Guardar en favoritos"
                    onClick={() => setFavs((f) => (f.includes(p.id) ? f.filter((x) => x !== p.id) : [...f, p.id]))}
                  >
                    <Heart size={18} />
                  </button>
                  <span className="prop__expand" aria-hidden><Expand size={14} /></span>
                </div>
                <div className="prop__body">
                  <p className="prop__loc"><MapPin size={13} /> {p.location}</p>
                  <h3 className="prop__title">{p.title}</h3>
                  <p className="prop__price">{p.price}</p>
                  <ul className="prop__specs">
                    <li><BedDouble size={15} /> {p.beds}</li>
                    <li><Bath size={15} /> {p.baths}</li>
                    <li><Maximize size={14} /> {p.area}</li>
                  </ul>
                  <a className="prop__cta" href={waLink(`Hola, me interesa: ${p.title} (${p.location}).`)} target="_blank" rel="noopener noreferrer">
                    Me interesa <ArrowUpRight size={15} />
                  </a>
                </div>
              </motion.article>
            ))}
        </motion.div>
        <button className="slider-btn slider-btn--next" onClick={() => slide(1)} aria-label="Siguiente"><ChevronRight size={18} /></button>
      </div>
    </section>
  );
}
