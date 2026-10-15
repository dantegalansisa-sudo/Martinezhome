import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, KeyRound, LayoutGrid, Map as MapIcon, RotateCcw, SlidersHorizontal, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PropertyCard from '../components/PropertyCard';
import PropertyMap from '../components/PropertyMap';
import CurrencySwitch from '../components/CurrencySwitch';
import RangeSlider from '../components/RangeSlider';
import { CITIES, PROPERTIES, ZONES } from '../data/properties';
import { zoneGroup } from '../data/zones';
import { waLink } from '../data/site';
import { fromUSD, money, priceUSD, useStore } from '../store';
import { useSeo } from '../useTitle';
import { t } from '../i18n';

const BUDGET: [number, number] = [50000, 500000];
const STEP = 5000;
const KINDS = ['Casa', 'Apartamento', 'Penthouse', 'Villa'];
const SORTS = [
  { value: 'recientes', label: 'Más recientes' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
];

export default function Properties() {
  const [params, setParams] = useSearchParams();
  const [drawer, setDrawer] = useState(false);
  const { currency } = useStore();

  const op = params.get('op') ?? '';
  const tipo = params.get('tipo') ?? '';
  const zona = params.get('zona') ?? '';
  const area = zoneGroup(params.get('area') ?? '');
  const ciudad = params.get('ciudad') ?? '';
  const estado = params.get('estado') ?? '';
  const hab = Number(params.get('hab') ?? 0);
  const orden = params.get('orden') ?? 'recientes';
  const vista = params.get('vista') ?? 'grid';
  const min = Number(params.get('min') ?? BUDGET[0]);
  const max = Number(params.get('max') ?? BUDGET[1]);
  const budgetActive = min > BUDGET[0] || max < BUDGET[1];

  useSeo({
    title: t(op === 'alquiler' ? 'Propiedades en alquiler' : estado === 'planos' ? 'Proyectos en planos' : 'Casas y apartamentos en venta'),
    description: t('{n} propiedades en venta y alquiler: casas, apartamentos, villas y proyectos en Santo Domingo Este, Distrito Nacional, Punta Cana y Baní. Filtra por zona, presupuesto y habitaciones.', { n: PROPERTIES.filter((p) => !p.sold).length }),
  });

  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
  }, [drawer]);

  const set = (key: string, value: string | number | null) => {
    const next = new URLSearchParams(params);
    if (value === null || value === '' || value === 0) next.delete(key);
    else next.set(key, String(value));
    setParams(next, { replace: true });
  };
  const setBudget = ([lo, hi]: [number, number]) => {
    const next = new URLSearchParams(params);
    lo > BUDGET[0] ? next.set('min', String(lo)) : next.delete('min');
    hi < BUDGET[1] ? next.set('max', String(hi)) : next.delete('max');
    setParams(next, { replace: true });
  };
  const reset = () => setParams(vista === 'mapa' ? { vista } : {}, { replace: true });

  const list = useMemo(() => {
    const out = PROPERTIES.filter((p) => {
      if (op && p.operation !== op) return false;
      if (tipo && p.kind !== tipo) return false;
      if (zona && p.zone !== zona) return false;
      if (area && !area.match(p)) return false;
      if (ciudad && p.city !== ciudad) return false;
      // "En construcción" also covers homes in the finishing stage.
      if (estado && p.status !== estado && !(estado === 'construccion' && p.status === 'terminacion')) return false;
      if (hab && (p.bedsMin ?? 0) < hab) return false;
      if (budgetActive) {
        const usd = priceUSD(p);
        if (usd === undefined || p.price?.monthly || usd < min || (max < BUDGET[1] && usd > max)) return false;
      }
      return true;
    });
    if (orden !== 'recientes') {
      const dir = orden === 'precio-asc' ? 1 : -1;
      // Listings without a price always go last.
      const key = (p: (typeof out)[number]) => {
        const v = priceUSD(p);
        return v === undefined ? Infinity : v * dir;
      };
      out.sort((a, b) => key(a) - key(b) || 0);
    }
    // Sold listings stay visible as social proof, but always after the available ones.
    return [...out.filter((p) => !p.sold), ...out.filter((p) => p.sold)];
  }, [op, tipo, zona, area, ciudad, estado, hab, min, max, budgetActive, orden]);

  const active = [op, tipo, zona, area?.id, ciudad, estado, hab ? 1 : '', budgetActive ? 1 : ''].filter(Boolean).length;
  const showCur = currency === 'DOP' ? 'DOP' : 'USD';
  const fmtBudget = (n: number) => money(fromUSD(n, showCur), showCur, true);

  const filters = (
    <div className="filters">
      <div className="filters__group">
        <p className="filters__label">{t('Operación')}</p>
        <div className="pills">
          {[['', 'Todas'], ['venta', 'Venta'], ['alquiler', 'Alquiler']].map(([v, l]) => (
            <button key={l} className={`pill${op === v ? ' is-on' : ''}`} onClick={() => set('op', v)}>{t(l)}</button>
          ))}
        </div>
      </div>
      <div className="filters__group">
        <p className="filters__label">{t('Tipo de propiedad')}</p>
        <div className="pills">
          {['', ...KINDS].map((k) => (
            <button key={k || 'all'} className={`pill${tipo === k ? ' is-on' : ''}`} onClick={() => set('tipo', k)}>{t(k || 'Todos')}</button>
          ))}
        </div>
      </div>
      <div className="filters__group">
        <p className="filters__label">{t('Estado')}</p>
        <div className="pills">
          {[['', 'Todos'], ['planos', 'En planos'], ['construccion', 'En construcción'], ['entrega', 'Lista para entrega']].map(([v, l]) => (
            <button key={l} className={`pill${estado === v ? ' is-on' : ''}`} onClick={() => set('estado', v)}>{t(l)}</button>
          ))}
        </div>
      </div>
      <div className="filters__group">
        <label className="filters__label" htmlFor="f-ciudad">{t('Ciudad')}</label>
        <select id="f-ciudad" className="select" value={ciudad} onChange={(e) => { const n = new URLSearchParams(params); e.target.value ? n.set('ciudad', e.target.value) : n.delete('ciudad'); n.delete('zona'); setParams(n, { replace: true }); }}>
          <option value="">{t('Todas las ciudades')}</option>
          {CITIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="filters__group">
        <label className="filters__label" htmlFor="f-zona">{t('Sector')}</label>
        <select id="f-zona" className="select" value={zona} onChange={(e) => set('zona', e.target.value)}>
          <option value="">{t('Todos los sectores')}</option>
          {ZONES.filter((z) => !ciudad || PROPERTIES.some((p) => p.zone === z && p.city === ciudad)).map((z) => <option key={z}>{z}</option>)}
        </select>
      </div>
      <div className="filters__group">
        <p className="filters__label">{t('Presupuesto')}</p>
        <RangeSlider min={BUDGET[0]} max={BUDGET[1]} step={STEP} value={[min, max]} onChange={setBudget} format={fmtBudget} label={t('Presupuesto')} />
        {budgetActive && <small className="filters__hint">{t('Las propiedades con precio a consultar y los alquileres se ocultan al filtrar por presupuesto de compra.')}</small>}
      </div>
      <div className="filters__group">
        <p className="filters__label">{t('Habitaciones')}</p>
        <div className="pills">
          {[0, 2, 3, 4].map((n) => (
            <button key={n} className={`pill pill--sq${hab === n ? ' is-on' : ''}`} onClick={() => set('hab', n)}>{n ? `${n}+` : t('Todas')}</button>
          ))}
        </div>
      </div>
      <button className="filters__reset" onClick={reset} disabled={!active}><RotateCcw size={14} /> {t('Limpiar filtros')}</button>
    </div>
  );

  return (
    <>
      <PageHeader
        eyebrow={t('Catálogo')}
        title={t(op === 'alquiler' ? 'Propiedades en alquiler' : estado === 'planos' ? 'Proyectos en planos' : 'Propiedades en venta y alquiler')}
        lead={t('Casas, apartamentos, villas y proyectos en Santo Domingo, Punta Cana y Baní. Filtra por zona, presupuesto y tipo.')}
        crumbs={[{ label: t('Propiedades') }]}
      />

      <section className="catalog">
        <div className="container catalog__grid">
          <aside className="catalog__aside" aria-label={t('Filtros')}>{filters}</aside>

          <div className="catalog__main">
            <div className="toolbar">
              <p className="toolbar__count">
                <motion.strong key={list.length} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{list.length}</motion.strong>{' '}
                {list.length === 1 ? t('propiedad') : t('propiedades')}
              </p>
              {area && (
                <button className="toolbar__area" onClick={() => set('area', '')} aria-label={t('Quitar zona {z}', { z: area.name })}>
                  {area.name} <X size={13} />
                </button>
              )}
              <button className="toolbar__filters" onClick={() => setDrawer(true)}>
                <SlidersHorizontal size={16} /> {t('Filtros')} {active > 0 && <span className="toolbar__badge">{active}</span>}
              </button>
              <CurrencySwitch id="catalog" />
              <select className="select select--sm" value={orden} onChange={(e) => set('orden', e.target.value === 'recientes' ? '' : e.target.value)} aria-label={t('Ordenar')}>
                {SORTS.map((s) => <option key={s.value} value={s.value}>{t(s.label)}</option>)}
              </select>
              <div className="seg" role="radiogroup" aria-label={t('Vista')}>
                {[['grid', LayoutGrid, 'Cuadrícula'], ['mapa', MapIcon, 'Mapa']].map(([v, Icon, l]) => {
                  const I = Icon as typeof LayoutGrid;
                  return (
                    <button key={v as string} role="radio" aria-checked={vista === v} className={`seg__btn${vista === v ? ' is-on' : ''}`} onClick={() => set('vista', v === 'grid' ? '' : (v as string))} aria-label={t(l as string)}>
                      {vista === v && <motion.span layoutId="seg-view" className="seg__pill" />}
                      <span><I size={15} /></span>
                    </button>
                  );
                })}
              </div>
            </div>

            {list.length === 0 ? (
              op === 'alquiler' ? (
                <motion.div className="empty empty--rent" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="empty__icon"><KeyRound size={26} /></span>
                  <h2>{t('¿Buscas alquilar?')}</h2>
                  <p>{t('Estamos actualizando nuestro inventario de alquileres. Cuéntanos qué necesitas —zona, presupuesto y número de habitaciones— y te enviamos opciones disponibles.')}</p>
                  <a className="btn-dark" href={waLink(t('Hola Martínez Home, estoy buscando una propiedad en alquiler.'))} target="_blank" rel="noopener noreferrer">
                    {t('Quiero alquilar')} <span className="btn-dark__icon"><ArrowRight size={15} /></span>
                  </a>
                </motion.div>
              ) : (
                <motion.div className="empty" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                  <h2>{t('No encontramos propiedades con esos filtros')}</h2>
                  <p>{t('Prueba ampliar el presupuesto o cambiar de sector. También podemos buscarla por ti.')}</p>
                  <div className="empty__actions">
                    <button className="btn-ghost" onClick={reset}><RotateCcw size={15} /> {t('Limpiar filtros')}</button>
                    <a className="btn-dark" href={waLink(t('Hola Martínez Home, no encontré la propiedad que busco en la web. ¿Me pueden ayudar?'))} target="_blank" rel="noopener noreferrer">
                      {t('Búscala por mí')} <span className="btn-dark__icon"><ArrowRight size={15} /></span>
                    </a>
                  </div>
                </motion.div>
              )
            ) : vista === 'mapa' ? (
              <PropertyMap properties={list} height="min(70vh, 640px)" />
            ) : (
              <div key={params.toString()} className="catalog__cards">
                {list.map((p) => <PropertyCard key={p.id} p={p} inView />)}
              </div>
            )}

            <div className="catalog__cta">
              <p>{t('¿Tienes una propiedad para vender?')}</p>
              <Link to="/vende-con-nosotros" className="link-arrow">{t('Vende con nosotros')} <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {drawer && (
          <motion.div className="drawer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)}>
            <motion.div
              className="drawer__panel"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="drawer__head">
                <strong>{t('Filtros')}</strong>
                <button onClick={() => setDrawer(false)} aria-label={t('Cerrar filtros')}><X size={20} /></button>
              </div>
              {filters}
              <button className="btn-submit drawer__apply" onClick={() => setDrawer(false)}>
                <span>{list.length === 1 ? t('Ver 1 propiedad') : t('Ver {n} propiedades', { n: list.length })}</span> <ArrowRight size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
