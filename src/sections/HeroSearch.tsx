import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Building2, CalendarDays, ChevronDown, DollarSign, Home, MapPin, Search, Sparkles, Tag, X } from 'lucide-react';
import { img } from '../data/properties';
import { ANY_LOCATION, ANY_TYPE, BUDGETS, LOCATIONS, OPERATIONS, TYPES, search, toQuery, type OperationFilter, type SearchState } from '../data/search';
import { waLink } from '../data/site';
import { formatPrice, useStore } from '../store';
import { EASINGS } from '../easings';
import { useIsDesktop } from '../useMedia';

const OP_ICONS = { Todos: Home, Venta: Tag, Alquiler: CalendarDays, Proyectos: Building2 } as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASINGS.smooth },
});

interface FieldProps {
  icon: typeof MapPin;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  accent?: boolean;
}

function Field({ icon: Icon, label, value, options, onChange, accent }: FieldProps) {
  return (
    <label className={`hs__field${accent ? ' hs__field--accent' : ''}`}>
      <span className="hs__icon"><Icon size={18} /></span>
      <span className="hs__text">
        <small>{label}</small>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </span>
      <ChevronDown size={16} className="hs__chev" />
    </label>
  );
}

export default function HeroSearch() {
  const navigate = useNavigate();
  const desktop = useIsDesktop();
  const { currency } = useStore();
  const [s, setS] = useState<SearchState>({ op: 'Todos', loc: ANY_LOCATION, type: ANY_TYPE, budget: 'any' });
  const [panel, setPanel] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  const results = useMemo(() => search(s), [s]);
  const opCounts = useMemo(() => Object.fromEntries(OPERATIONS.map((op) => [op, search({ ...s, op }).length])), [s]);

  const update = (patch: Partial<SearchState>) => {
    setS((prev) => ({ ...prev, ...patch }));
    if (desktop) setPanel(true);
  };

  // Close the suggestions when clicking elsewhere or pressing Escape.
  useEffect(() => {
    if (!panel) return;
    const onDown = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setPanel(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPanel(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [panel]);

  const go = () => navigate(toQuery(s));
  const budgetLabel = BUDGETS.find((b) => b.id === s.budget)?.label;

  return (
    <div className="hs" ref={wrap}>
      <motion.div className="chips" {...fadeUp(1.05)} role="tablist" aria-label="Tipo de operación">
        {OPERATIONS.map((op) => {
          const Icon = OP_ICONS[op];
          const on = s.op === op;
          return (
            <button key={op} role="tab" aria-selected={on} className={`chip${on ? ' chip--active' : ''}`} onClick={() => update({ op: op as OperationFilter })}>
              <Icon size={15} /> {op}
              <motion.span key={opCounts[op]} className="chip__count" initial={{ scale: 0.6 }} animate={{ scale: 1 }}>{opCounts[op]}</motion.span>
            </button>
          );
        })}
      </motion.div>

      <motion.div className="hs__bar" {...fadeUp(1.2)}>
        <Field icon={MapPin} label="Ubicación" value={s.loc} onChange={(loc) => update({ loc })} options={LOCATIONS.map((l) => ({ value: l, label: l }))} />
        <span className="hs__divider" />
        <Field icon={Home} label="Tipo de propiedad" value={s.type} onChange={(type) => update({ type })} options={TYPES.map((t) => ({ value: t, label: t }))} />
        <span className="hs__divider" />
        <Field icon={DollarSign} label="Presupuesto" value={s.budget} onChange={(budget) => update({ budget })} options={BUDGETS.map((b) => ({ value: b.id, label: b.label }))} accent />
        <motion.button className="hs__go" onClick={go} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} aria-label={`Ver ${results.length} propiedades`}>
          <Search size={18} />
          <span>
            Ver <motion.b key={results.length} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{results.length}</motion.b>
          </span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {panel && (
          <motion.div
            className="hs__panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASINGS.smooth }}
          >
            <div className="hs__panel-head">
              <span><Sparkles size={15} /> {results.length === 0 ? 'Sin coincidencias exactas' : `${results.length} ${results.length === 1 ? 'propiedad encaja' : 'propiedades encajan'} con tu búsqueda`}</span>
              {budgetLabel && s.budget !== 'any' && <em>{budgetLabel}</em>}
              <button onClick={() => setPanel(false)} aria-label="Cerrar sugerencias"><X size={15} /></button>
            </div>
            {results.length > 0 ? (
              <div className="hs__list">
                {results.slice(0, 3).map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <Link to={`/propiedades/${p.slug}`} className="hs__item">
                      <img src={img(p, 1, 'sm')} alt="" />
                      <span>
                        <strong>{p.title}</strong>
                        <small>{p.zone}</small>
                        <b>{formatPrice(p.price, currency)}</b>
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="hs__empty">
                {s.op === 'Alquiler'
                  ? 'Estamos actualizando nuestros alquileres. Cuéntanos qué buscas y te enviamos opciones.'
                  : 'Prueba otro rango o zona, o deja que un asesor la busque por ti.'}{' '}
                <a href={waLink('Hola Martínez Home, no encontré en la web la propiedad que busco. ¿Me ayudan?')} target="_blank" rel="noopener noreferrer">Te ayudamos a buscarla</a>
              </p>
            )}
            {results.length > 0 && (
              <button className="hs__all" onClick={go}>
                Ver {results.length === 1 ? 'la propiedad' : `las ${results.length} propiedades`} <ArrowUpRight size={15} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
