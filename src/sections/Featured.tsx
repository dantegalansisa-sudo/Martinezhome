import { useEffect, useRef, useState, type RefObject } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import RevealText from '../components/RevealText';
import PropertyCard from '../components/PropertyCard';
import { AVAILABLE, type Property } from '../data/properties';
import { useIsMobile } from '../useMedia';
import { t } from '../i18n';

const TABS: { label: string; match: (p: Property) => boolean }[] = [
  { label: 'Destacadas', match: (p) => !!p.featured },
  { label: 'Casas', match: (p) => p.kind === 'Casa' },
  { label: 'Apartamentos', match: (p) => p.kind === 'Apartamento' },
  { label: 'Villas', match: (p) => p.kind === 'Villa' },
  { label: 'En planos', match: (p) => p.status === 'planos' },
];

/**
 * Mobile carousel focus: side cards shrink a little, the centred one is exactly scale(1).
 * Computed by hand from the track's scroll position (reliable on iOS Safari), with no opacity
 * or rotation so cards never look washed out or blurry.
 */
function useFocusCarousel(track: RefObject<HTMLDivElement>, enabled: boolean, key: unknown) {
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>('.focus-item'));
    if (!enabled) {
      items.forEach((it) => (it.style.transform = ''));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const box = el.getBoundingClientRect();
      const center = box.left + box.width / 2;
      items.forEach((it) => {
        const r = it.getBoundingClientRect();
        const d = Math.min(Math.abs(r.left + r.width / 2 - center) / box.width, 1);
        const scale = d < 0.04 ? 1 : 1 - Math.min(d, 0.8) * 0.12;
        it.style.transform = scale === 1 ? '' : `scale(${scale.toFixed(3)})`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [track, enabled, key]);
}

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };

export default function Featured() {
  const [tab, setTab] = useState(0);
  const mobile = useIsMobile();
  const track = useRef<HTMLDivElement>(null);
  const list = AVAILABLE.filter(TABS[tab].match).slice(0, 8);
  useFocusCarousel(track, mobile, tab);

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
            <p className="eyebrow">{t('Propiedades destacadas')}</p>
            <RevealText tag="h2" className="h2">{t('Encuentra tu próximo hogar')}</RevealText>
          </div>
          <div className="featured__tools">
            <div className="tabs" role="tablist">
              {TABS.map((tb, i) => (
                <button key={tb.label} role="tab" aria-selected={tab === i} className={`tab${tab === i ? ' tab--active' : ''}`} onClick={() => setTab(i)}>
                  {t(tb.label)}
                  {tab === i && <motion.span layoutId="tab-pill" className="tab__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                </button>
              ))}
            </div>
            <Link to="/propiedades" className="link-arrow">
              {t('Ver las {n} propiedades', { n: AVAILABLE.length })} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="featured__wrap container">
        <button className="slider-btn slider-btn--prev" onClick={() => slide(-1)} aria-label={t('Anterior')}><ChevronLeft size={18} /></button>
        <motion.div
          ref={track}
          key={tab}
          className="featured__track"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {list.map((p) =>
            mobile ? (
              <div key={p.id} className="focus-item">
                <PropertyCard p={p} variants={false} />
              </div>
            ) : (
              <PropertyCard key={p.id} p={p} />
            )
          )}
        </motion.div>
        <button className="slider-btn slider-btn--next" onClick={() => slide(1)} aria-label={t('Siguiente')}><ChevronRight size={18} /></button>
      </div>
    </section>
  );
}
