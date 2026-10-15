import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react';
import { gallery, img, type Property } from '../data/properties';
import { EASINGS } from '../easings';
import { useIsMobile } from '../useMedia';
import { t } from '../i18n';

export default function Gallery({ p }: { p: Property }) {
  const shots = gallery(p);
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setOpen((i) => (i === null ? i : (i + d + shots.length) % shots.length));
    },
    [shots.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, go]);

  const mosaic = shots.slice(0, 5);
  const mobile = useIsMobile();
  const strip = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const onStrip = () => {
    const el = strip.current;
    if (el) setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <>
      {mobile ? (
        <motion.div className="carousel" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASINGS.smooth }}>
          <div ref={strip} className="carousel__strip" onScroll={onStrip}>
            {shots.map((n, i) => (
              <button key={n} className="carousel__slide" onClick={() => setOpen(i)} aria-label={t('Ver foto {n}', { n: i + 1 })}>
                <img src={img(p, n, i === 0 ? 'lg' : 'sm')} alt={`${p.title} — ${t('foto')} ${i + 1}`} loading={i > 1 ? 'lazy' : undefined} style={i === 0 && p.coverFocus ? { objectPosition: p.coverFocus } : undefined} />
              </button>
            ))}
          </div>
          <span className="carousel__count">{current + 1} / {shots.length}</span>
          <div className="carousel__dots" aria-hidden>
            {shots.map((n, i) => <motion.span key={n} animate={{ width: i === current ? 18 : 6, opacity: i === current ? 1 : 0.5 }} />)}
          </div>
          {p.render && <span className="mosaic__render">{t('Imágenes de referencia')}</span>}
        </motion.div>
      ) : (
      <motion.div
        className={`mosaic mosaic--${Math.min(mosaic.length, 5)}`}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {mosaic.map((n, i) => (
          <motion.button
            key={n}
            className="mosaic__item"
            onClick={() => setOpen(i)}
            aria-label={t('Ver foto {n}', { n: i + 1 })}
            variants={{
              hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
              visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.9, ease: EASINGS.premium } },
            }}
          >
            <img src={img(p, n, i === 0 ? 'lg' : 'sm')} alt={`${p.title} — ${t('foto')} ${i + 1}`} style={i === 0 && p.coverFocus ? { objectPosition: p.coverFocus } : undefined} />
            {i === mosaic.length - 1 && shots.length > mosaic.length && (
              <span className="mosaic__more"><Images size={16} /> {t('+{n} fotos', { n: shots.length - mosaic.length })}</span>
            )}
          </motion.button>
        ))}
        <button className="mosaic__all" onClick={() => setOpen(0)}><Images size={15} /> {t('Ver las {n} fotos', { n: shots.length })}</button>
        {p.render && <span className="mosaic__render">{t('Imágenes de referencia')}</span>}
      </motion.div>
      )}

      <AnimatePresence>
        {open !== null && (
          <motion.div className="viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button className="viewer__close" onClick={() => setOpen(null)} aria-label={t('Cerrar galería')}><X size={22} /></button>
            <span className="viewer__count">{open + 1} / {shots.length}</span>
            <div className="viewer__stage">
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.img
                  key={open}
                  src={img(p, shots[open])}
                  alt={`${p.title} — ${t('foto')} ${open + 1}`}
                  custom={dir}
                  initial={{ x: dir * 80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: dir * -80, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASINGS.smooth }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) go(1);
                    else if (info.offset.x > 60) go(-1);
                  }}
                />
              </AnimatePresence>
            </div>
            <button className="viewer__nav viewer__nav--prev" onClick={() => go(-1)} aria-label={t('Anterior')}><ChevronLeft size={24} /></button>
            <button className="viewer__nav viewer__nav--next" onClick={() => go(1)} aria-label={t('Siguiente')}><ChevronRight size={24} /></button>
            <div className="viewer__thumbs">
              {shots.map((n, i) => (
                <button key={n} className={i === open ? 'is-on' : ''} onClick={() => { setDir(i > open ? 1 : -1); setOpen(i); }} aria-label={t('Foto {n}', { n: i + 1 })}>
                  <img src={img(p, n, 'sm')} alt="" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
