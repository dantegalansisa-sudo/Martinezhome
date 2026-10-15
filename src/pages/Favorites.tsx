import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, GitCompareArrows, Heart, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PropertyCard from '../components/PropertyCard';
import CurrencySwitch from '../components/CurrencySwitch';
import { img, PROPERTIES, statusLabel, type Property } from '../data/properties';
import { formatPrice, useStore } from '../store';
import { useSeo } from '../useTitle';
import { t } from '../i18n';
import { localize } from '../data/localize';

const MAX_COMPARE = 3;

const ROWS: { label: string; get: (p: Property, cur: ReturnType<typeof useStore>['currency']) => string | undefined }[] = [
  { label: 'Precio', get: (p, c) => formatPrice(p.price, c) },
  { label: 'Tipo', get: (p) => t(p.kind) },
  { label: 'Ubicación', get: (p) => `${p.zone}, ${p.city}` },
  { label: 'Estado', get: (p) => statusLabel(p) },
  { label: 'Habitaciones', get: (p) => p.beds },
  { label: 'Baños', get: (p) => p.baths },
  { label: 'Construcción', get: (p) => p.area },
  { label: 'Solar', get: (p) => p.lot },
  { label: 'Parqueos', get: (p) => p.parking },
  { label: 'Plan de pago', get: (p) => (p.payment ? t('Disponible') : undefined) },
  { label: 'Destacado', get: (p) => p.highlights[0] },
];

export default function Favorites() {
  useSeo({ title: t('Favoritos'), noindex: true });
  const { favorites, toggleFavorite, currency } = useStore();
  const saved = favorites.map((id) => PROPERTIES.find((p) => p.id === id)).filter(Boolean).map((p) => localize(p as Property));
  const [picked, setPicked] = useState<number[]>(() => favorites.slice(0, MAX_COMPARE));

  // Drop properties that were un-favorited from the comparison.
  useEffect(() => setPicked((ids) => ids.filter((id) => favorites.includes(id))), [favorites]);

  const togglePick = (id: number) =>
    setPicked((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : ids.length < MAX_COMPARE ? [...ids, id] : ids));
  const compare = picked.map((id) => saved.find((p) => p.id === id)).filter(Boolean) as Property[];

  return (
    <>
      <PageHeader
        eyebrow={t('Tu selección')}
        title={t('Favoritos y comparador')}
        lead={t('Guarda las propiedades que te gustan y compáralas lado a lado para decidir con claridad.')}
        crumbs={[{ label: t('Favoritos') }]}
      />

      <section className="section favs">
        <div className="container">
          {saved.length === 0 ? (
            <motion.div className="empty" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="empty__icon"><Heart size={26} /></span>
              <h2>{t('Aún no tienes favoritos')}</h2>
              <p>{t('Toca el corazón en cualquier propiedad para guardarla aquí y luego compararla.')}</p>
              <Link to="/propiedades" className="btn-dark">{t('Explorar propiedades')} <span className="btn-dark__icon"><ArrowRight size={15} /></span></Link>
            </motion.div>
          ) : (
            <>
              <div className="favs__bar">
                <p><GitCompareArrows size={18} /> {t('Selecciona hasta {n} propiedades para comparar', { n: MAX_COMPARE })}</p>
                <CurrencySwitch id="favs" />
              </div>
              <div className="favs__pick">
                {saved.map((p) => {
                  const on = picked.includes(p.id);
                  return (
                    <button key={p.id} className={`pick${on ? ' is-on' : ''}`} onClick={() => togglePick(p.id)} disabled={!on && picked.length >= MAX_COMPARE}>
                      <img src={img(p, 1, 'sm')} alt="" />
                      <span>{p.title}</span>
                      <i>{on ? <Check size={14} /> : null}</i>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {compare.length >= 2 ? (
                  <motion.div key="table" className="compare" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <table>
                      <thead>
                        <tr>
                          <th />
                          {compare.map((p) => (
                            <th key={p.id}>
                              <Link to={`/propiedades/${p.slug}`} className="compare__head">
                                <img src={img(p, 1, 'sm')} alt="" />
                                <span>{p.title}</span>
                              </Link>
                              <button className="compare__remove" onClick={() => toggleFavorite(p.id)} aria-label={t('Quitar de favoritos')}><X size={14} /></button>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {ROWS.map((r) => (
                          <tr key={r.label}>
                            <th scope="row">{t(r.label)}</th>
                            {compare.map((p) => <td key={p.id}>{r.get(p, currency) ?? '—'}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                ) : (
                  <motion.p key="hint" className="favs__hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {t('Selecciona al menos 2 propiedades para ver la comparación.')}
                  </motion.p>
                )}
              </AnimatePresence>

              <h2 className="favs__title">{t('Guardadas ({n})', { n: saved.length })}</h2>
              <motion.div className="catalog__cards catalog__cards--3" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.07 } } }}>
                {saved.map((p) => <PropertyCard key={p.id} p={p} />)}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
