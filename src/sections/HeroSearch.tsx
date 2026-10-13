import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Building2, CalendarDays, Check, ChevronDown, DollarSign, Home, MapPin, RotateCcw, Search, Sparkles, Tag, X } from 'lucide-react';
import { img } from '../data/properties';
import {
  ANY_BUDGET,
  ANY_LOCATION,
  ANY_TYPE,
  BUDGET_MAX,
  BUDGET_MIN,
  BUDGET_STEP,
  BUDGETS,
  LOCATIONS,
  OPERATIONS,
  TYPES,
  budgetActive,
  budgetLabel,
  histogram,
  search,
  toQuery,
  type OperationFilter,
  type SearchState,
} from '../data/search';
import { waLink } from '../data/site';
import { formatPrice, useStore } from '../store';
import { EASINGS } from '../easings';
import { useIsDesktop, useIsMobile } from '../useMedia';

const OP_ICONS = { Todos: Home, Venta: Tag, Alquiler: CalendarDays, Proyectos: Building2 } as const;
type Pop = 'loc' | 'type' | 'budget' | null;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASINGS.smooth },
});

const money = (n: number) => `US$${Math.round(n / 1000)}K`;

/** The whole field is the trigger (icon, text and chevron), so it opens wherever it's tapped. */
function FieldButton({
  icon: Icon,
  label,
  value,
  open,
  onClick,
  accent,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  open: boolean;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      className={`hs__field${accent ? ' hs__field--accent' : ''}${open ? ' is-open' : ''}`}
      onClick={onClick}
      aria-haspopup="dialog"
      aria-expanded={open}
    >
      <span className="hs__icon">
        <Icon size={18} />
      </span>
      <span className="hs__text">
        <small>{label}</small>
        <strong>{value}</strong>
      </span>
      <motion.span className="hs__chev" animate={{ rotate: open ? 180 : 0 }}>
        <ChevronDown size={16} />
      </motion.span>
    </button>
  );
}

/** Desktop: floating card under the bar. Phones: bottom sheet over a dimmed backdrop. */
function Popover({
  open,
  mobile,
  onClose,
  title,
  wide,
  children,
}: {
  open: boolean;
  mobile: boolean;
  onClose: () => void;
  title: string;
  wide?: boolean;
  children: ReactNode;
}) {
  // Keep the page still behind the bottom sheet.
  useEffect(() => {
    if (!(mobile && open)) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobile, open]);

  if (mobile) {
    // The portal must wrap AnimatePresence (not the other way round), or the sheet never mounts.
    return createPortal(
      <AnimatePresence>
        {open && (
          <motion.div className="hs__sheet-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
            <motion.div
              className="hs__sheet"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.45, ease: EASINGS.premium }}
              role="dialog"
              aria-label={title}
            >
              <div className="hs__sheet-head">
                <strong>{title}</strong>
                <button onClick={onClose} aria-label="Cerrar">
                  <X size={18} />
                </button>
              </div>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );
  }
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`hs__pop${wide ? ' hs__pop--wide' : ''}`}
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.25, ease: EASINGS.smooth }}
          role="dialog"
          aria-label={title}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function OptionList({ options, value, onPick, counts }: { options: string[]; value: string; onPick: (v: string) => void; counts: Record<string, number> }) {
  return (
    <ul className="hs__options" role="listbox">
      {options.map((o) => {
        const on = o === value;
        return (
          <li key={o}>
            <button type="button" role="option" aria-selected={on} className={on ? 'is-on' : ''} onClick={() => onPick(o)}>
              <span>{o}</span>
              <em>{counts[o]}</em>
              {on && <Check size={15} />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Budget picker: price histogram + dual-thumb slider + quick shortcuts, with a live match count. */
function BudgetPicker({
  value,
  onChange,
  count,
  onApply,
}: {
  value: [number, number];
  onChange: (v: [number, number]) => void;
  count: number;
  onApply: () => void;
}) {
  const { counts } = useMemo(() => histogram(18), []);
  const peak = Math.max(...counts, 1);
  const [lo, hi] = value;
  const pct = (n: number) => ((n - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;
  const bucket = (BUDGET_MAX - BUDGET_MIN) / counts.length;

  return (
    <div className="bp">
      <div className="bp__values">
        <div>
          <small>Mínimo</small>
          <strong>{money(lo)}</strong>
        </div>
        <span className="bp__dash" />
        <div>
          <small>Máximo</small>
          <strong>{hi >= BUDGET_MAX ? `${money(BUDGET_MAX)}+` : money(hi)}</strong>
        </div>
      </div>

      <div className="bp__chart" aria-hidden>
        {counts.map((c, i) => {
          const from = BUDGET_MIN + i * bucket;
          const inRange = from + bucket > lo && (hi >= BUDGET_MAX || from < hi);
          return (
            <motion.span
              key={i}
              className={inRange ? 'is-in' : ''}
              initial={{ height: 0 }}
              animate={{ height: `${c ? 18 + (c / peak) * 82 : 6}%` }}
              transition={{ delay: i * 0.02, duration: 0.5, ease: EASINGS.smooth }}
            />
          );
        })}
      </div>

      <div className="bp__track">
        {/* Thumbs travel 13px in from each edge, so the fill is laid out on that inner track. */}
        <span
          className="bp__fill"
          style={{ left: `calc(13px + (100% - 26px) * ${pct(lo) / 100})`, right: `calc(13px + (100% - 26px) * ${1 - pct(hi) / 100})` }}
        />
        <input
          type="range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          value={lo}
          aria-label="Presupuesto mínimo"
          onChange={(e) => onChange([Math.min(Number(e.target.value), hi - BUDGET_STEP * 2), hi])}
        />
        <input
          type="range"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          value={hi}
          aria-label="Presupuesto máximo"
          onChange={(e) => onChange([lo, Math.max(Number(e.target.value), lo + BUDGET_STEP * 2)])}
        />
      </div>
      <div className="bp__scale">
        <span>{money(BUDGET_MIN)}</span>
        <span>{money(275000)}</span>
        <span>{money(BUDGET_MAX)}+</span>
      </div>

      <div className="bp__chips">
        {BUDGETS.map((b) => {
          const on = b.range[0] === lo && b.range[1] === hi;
          return (
            <button type="button" key={b.label} className={`pill pill--sm${on ? ' is-on' : ''}`} onClick={() => onChange(b.range)}>
              {b.label}
            </button>
          );
        })}
      </div>

      <div className="bp__foot">
        <button type="button" className="bp__reset" onClick={() => onChange(ANY_BUDGET)} disabled={!budgetActive(value)}>
          <RotateCcw size={14} /> Limpiar
        </button>
        <button type="button" className="bp__apply" onClick={onApply}>
          Ver{' '}
          <motion.b key={count} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            {count}
          </motion.b>{' '}
          {count === 1 ? 'propiedad' : 'propiedades'}
        </button>
      </div>
    </div>
  );
}

export default function HeroSearch() {
  const navigate = useNavigate();
  const desktop = useIsDesktop();
  const mobile = useIsMobile();
  const { currency } = useStore();
  const [s, setS] = useState<SearchState>({ op: 'Todos', loc: ANY_LOCATION, type: ANY_TYPE, budget: ANY_BUDGET });
  const [pop, setPop] = useState<Pop>(null);
  const [panel, setPanel] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  const results = useMemo(() => search(s), [s]);
  const opCounts = useMemo(() => Object.fromEntries(OPERATIONS.map((op) => [op, search({ ...s, op }).length])), [s]);
  const locCounts = useMemo(() => Object.fromEntries(LOCATIONS.map((loc) => [loc, search({ ...s, loc }).length])), [s]);
  const typeCounts = useMemo(() => Object.fromEntries(TYPES.map((type) => [type, search({ ...s, type }).length])), [s]);

  const update = (patch: Partial<SearchState>, close = true) => {
    setS((prev) => ({ ...prev, ...patch }));
    if (close) {
      setPop(null);
      if (desktop) setPanel(true);
    }
  };
  const toggle = (p: Pop) => {
    setPanel(false);
    setPop((cur) => (cur === p ? null : p));
  };

  // Desktop: close popovers and suggestions on outside click / Escape (the mobile sheet has its own backdrop).
  useEffect(() => {
    if (!pop && !panel) return;
    const onDown = (e: MouseEvent) => {
      if (mobile || wrap.current?.contains(e.target as Node)) return;
      setPop(null);
      setPanel(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setPop(null);
      setPanel(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [pop, panel, mobile]);

  const go = () => navigate(toQuery(s));

  return (
    <div className="hs" ref={wrap}>
      <motion.div className="chips" {...fadeUp(1.05)} role="tablist" aria-label="Tipo de operación">
        {OPERATIONS.map((op) => {
          const Icon = OP_ICONS[op];
          const on = s.op === op;
          return (
            <button key={op} role="tab" aria-selected={on} className={`chip${on ? ' chip--active' : ''}`} onClick={() => update({ op: op as OperationFilter })}>
              <Icon size={15} /> {op}
              <motion.span key={opCounts[op]} className="chip__count" initial={{ scale: 0.6 }} animate={{ scale: 1 }}>
                {opCounts[op]}
              </motion.span>
            </button>
          );
        })}
      </motion.div>

      <motion.div className="hs__bar" {...fadeUp(1.2)}>
        <div className="hs__slot">
          <FieldButton icon={MapPin} label="Ubicación" value={s.loc} open={pop === 'loc'} onClick={() => toggle('loc')} />
          <Popover open={pop === 'loc'} mobile={mobile} onClose={() => setPop(null)} title="Ubicación">
            <OptionList options={LOCATIONS} value={s.loc} counts={locCounts} onPick={(loc) => update({ loc })} />
          </Popover>
        </div>
        <span className="hs__divider" />
        <div className="hs__slot">
          <FieldButton icon={Home} label="Tipo de propiedad" value={s.type} open={pop === 'type'} onClick={() => toggle('type')} />
          <Popover open={pop === 'type'} mobile={mobile} onClose={() => setPop(null)} title="Tipo de propiedad">
            <OptionList options={TYPES} value={s.type} counts={typeCounts} onPick={(type) => update({ type })} />
          </Popover>
        </div>
        <span className="hs__divider" />
        <div className="hs__slot hs__slot--budget">
          <FieldButton icon={DollarSign} label="Presupuesto" value={budgetLabel(s.budget)} open={pop === 'budget'} onClick={() => toggle('budget')} accent />
          <Popover open={pop === 'budget'} mobile={mobile} onClose={() => setPop(null)} title="¿Cuánto quieres invertir?" wide>
            <BudgetPicker
              value={s.budget}
              onChange={(budget) => update({ budget }, false)}
              count={results.length}
              onApply={() => {
                setPop(null);
                if (desktop) setPanel(true);
                else go();
              }}
            />
          </Popover>
        </div>
        <motion.button className="hs__go" onClick={go} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} aria-label={`Ver ${results.length} propiedades`}>
          <Search size={18} />
          <span>
            Ver{' '}
            <motion.b key={results.length} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              {results.length}
            </motion.b>
          </span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {panel && !pop && (
          <motion.div
            className="hs__panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: EASINGS.smooth }}
          >
            <div className="hs__panel-head">
              <span>
                <Sparkles size={15} />{' '}
                {results.length === 0
                  ? 'Sin coincidencias exactas'
                  : `${results.length} ${results.length === 1 ? 'propiedad encaja' : 'propiedades encajan'} con tu búsqueda`}
              </span>
              {budgetActive(s.budget) && <em>{budgetLabel(s.budget)}</em>}
              <button onClick={() => setPanel(false)} aria-label="Cerrar sugerencias">
                <X size={15} />
              </button>
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
                <a href={waLink('Hola Martínez Home, no encontré en la web la propiedad que busco. ¿Me ayudan?')} target="_blank" rel="noopener noreferrer">
                  Te ayudamos a buscarla
                </a>
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
