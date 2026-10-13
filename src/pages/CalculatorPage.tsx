import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Building, Home, Wallet } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { CLOSING_PCT, loanForPayment, mortgage, preconstruction } from '../calc';
import { USD_TO_DOP, waLink } from '../data/site';
import { EASINGS } from '../easings';
import { useTitle } from '../useTitle';

type Cur = 'USD' | 'DOP';
const TABS = [
  { id: 'hipoteca', label: 'Préstamo hipotecario', icon: Home },
  { id: 'planos', label: 'Plan en planos', icon: Building },
  { id: 'presupuesto', label: '¿Cuánto puedo comprar?', icon: Wallet },
] as const;

const fmt = (n: number, c: Cur) => `${c === 'USD' ? 'US$' : 'RD$'} ${Math.round(n).toLocaleString('en-US')}`;

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  display: string;
}
function Slider({ label, value, min, max, step, onChange, display }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="cslider">
      <span className="cslider__top">
        <span>{label}</span>
        <strong>{display}</strong>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ '--p': `${pct}%` } as React.CSSProperties} />
    </label>
  );
}

function Donut({ parts }: { parts: { value: number; color: string; label: string }[] }) {
  const total = parts.reduce((s, p) => s + p.value, 0) || 1;
  const R = 52;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <svg viewBox="0 0 140 140" className="donut" aria-hidden>
      <circle cx="70" cy="70" r={R} fill="none" stroke="var(--line)" strokeWidth="16" />
      {parts.map((p) => {
        const len = (p.value / total) * C;
        const el = (
          <motion.circle
            key={p.label}
            cx="70" cy="70" r={R} fill="none" stroke={p.color} strokeWidth="16"
            strokeDasharray={`${len} ${C - len}`}
            initial={false}
            animate={{ strokeDashoffset: -offset, strokeDasharray: `${len} ${C - len}` }}
            transition={{ duration: 0.6, ease: EASINGS.smooth }}
            transform="rotate(-90 70 70)"
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

function Result({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className={`res${big ? ' res--big' : ''}`}>
      <small>{label}</small>
      <motion.strong key={value} initial={{ opacity: 0.4, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>{value}</motion.strong>
    </div>
  );
}

export default function CalculatorPage() {
  useTitle('Calculadora hipotecaria');
  const [params] = useSearchParams();
  const initial = Number(params.get('precio')) || 180000;
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('hipoteca');
  const [cur, setCur] = useState<Cur>('USD');
  const k = cur === 'USD' ? 1 : USD_TO_DOP;

  // Values are kept in USD and scaled for display, so switching currency never loses input.
  const [price, setPrice] = useState(initial);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(11);
  const [years, setYears] = useState(20);

  const [reserve, setReserve] = useState(2000);
  const [months, setMonths] = useState(18);

  const [income, setIncome] = useState(2500);
  const [debts, setDebts] = useState(200);
  const [savings, setSavings] = useState(30000);

  const m = mortgage({ price, downPct: down, rate, years });
  const plan = preconstruction({ price, reserve, signPct: 10, buildPct: 20, months });
  const maxPayment = Math.max(income * 0.35 - debts, 0);
  const maxLoan = loanForPayment(maxPayment, rate, years);
  // Buyer needs ~20% down plus closing costs from savings.
  const bySavings = savings / (0.2 + CLOSING_PCT / 100);
  const byLoan = maxLoan / 0.8;
  const maxPrice = Math.min(bySavings, byLoan);

  const priceSlider = (
    <Slider label="Precio de la propiedad" value={price} min={50000} max={800000} step={5000} onChange={setPrice} display={fmt(price * k, cur)} />
  );

  return (
    <>
      <PageHeader
        eyebrow="Herramientas"
        title="Calculadora inmobiliaria"
        lead="Estima tu cuota mensual, organiza el plan de pago de un proyecto en planos o descubre cuánto puedes comprar según tus ingresos."
        crumbs={[{ label: 'Calculadora' }]}
      />

      <section className="section calc">
        <div className="container">
          <div className="calc__tabs">
            <div className="calc__tablist" role="tablist">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button key={id} role="tab" aria-selected={tab === id} className={`calc__tab${tab === id ? ' is-on' : ''}`} onClick={() => setTab(id)}>
                  {tab === id && <motion.span layoutId="calc-tab" className="calc__tab-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <Icon size={16} /> <span>{label}</span>
                </button>
              ))}
            </div>
            <div className="seg" role="radiogroup" aria-label="Moneda">
              {(['USD', 'DOP'] as Cur[]).map((c) => (
                <button key={c} role="radio" aria-checked={cur === c} className={`seg__btn${cur === c ? ' is-on' : ''}`} onClick={() => setCur(c)}>
                  {cur === c && <motion.span layoutId="calc-cur" className="seg__pill" />}
                  <span>{c === 'USD' ? 'US$' : 'RD$'}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} className="calc__panel" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
              {tab === 'hipoteca' && (
                <>
                  <div className="calc__inputs">
                    {priceSlider}
                    <Slider label="Inicial" value={down} min={10} max={60} step={1} onChange={setDown} display={`${down}% · ${fmt(m.down * k, cur)}`} />
                    <Slider label="Tasa de interés anual" value={rate} min={6} max={18} step={0.25} onChange={setRate} display={`${rate.toFixed(2)}%`} />
                    <Slider label="Plazo" value={years} min={5} max={30} step={1} onChange={setYears} display={`${years} años`} />
                  </div>
                  <div className="calc__out">
                    <div className="calc__donut">
                      <Donut parts={[
                        { label: 'Capital', value: m.loan, color: 'var(--ink)' },
                        { label: 'Intereses', value: m.interest, color: 'var(--red)' },
                        { label: 'Inicial', value: m.down, color: 'var(--sand)' },
                      ]} />
                      <div className="calc__donut-center">
                        <small>Cuota mensual</small>
                        <strong>{fmt(m.monthly * k, cur)}</strong>
                      </div>
                    </div>
                    <ul className="legend">
                      <li><i style={{ background: 'var(--ink)' }} /> Monto a financiar <b>{fmt(m.loan * k, cur)}</b></li>
                      <li><i style={{ background: 'var(--red)' }} /> Intereses totales <b>{fmt(m.interest * k, cur)}</b></li>
                      <li><i style={{ background: 'var(--sand)' }} /> Inicial <b>{fmt(m.down * k, cur)}</b></li>
                    </ul>
                    <Result label="Ingreso mensual recomendado" value={fmt((m.monthly / 0.3) * k, cur)} />
                    <Result label={`Gastos de cierre estimados (~${CLOSING_PCT}%)`} value={fmt(price * (CLOSING_PCT / 100) * k, cur)} />
                  </div>
                </>
              )}

              {tab === 'planos' && (
                <>
                  <div className="calc__inputs">
                    {priceSlider}
                    <Slider label="Reserva" value={reserve} min={1000} max={10000} step={500} onChange={setReserve} display={fmt(reserve * k, cur)} />
                    <Slider label="Meses hasta la entrega" value={months} min={6} max={36} step={1} onChange={setMonths} display={`${months} meses`} />
                    <p className="calc__note">Estructura habitual de nuestros proyectos: reserva, 10% a la firma, 20% en cuotas durante la construcción y 70% contra entrega.</p>
                  </div>
                  <div className="calc__out">
                    <ol className="plan">
                      {[
                        { t: 'Reserva', d: 'Separa tu unidad', v: plan.reserve },
                        { t: 'Firma del contrato', d: '10% del precio menos la reserva', v: plan.sign },
                        { t: 'Cuotas durante la construcción', d: `20% en ${months} cuotas de ${fmt(plan.installment * k, cur)}`, v: plan.build },
                        { t: 'Contra entrega', d: 'Financiamiento bancario o pago directo', v: plan.delivery },
                      ].map((s, i) => (
                        <motion.li key={s.t} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                          <span className="plan__n">{i + 1}</span>
                          <div><strong>{s.t}</strong><small>{s.d}</small></div>
                          <b>{fmt(s.v * k, cur)}</b>
                        </motion.li>
                      ))}
                    </ol>
                    <Result big label="Cuota mensual durante la construcción" value={fmt(plan.installment * k, cur)} />
                    <Link to="/propiedades?estado=planos" className="link-arrow">Ver proyectos en planos <ArrowRight size={15} /></Link>
                  </div>
                </>
              )}

              {tab === 'presupuesto' && (
                <>
                  <div className="calc__inputs">
                    <Slider label="Ingreso mensual del hogar" value={income} min={800} max={20000} step={100} onChange={setIncome} display={fmt(income * k, cur)} />
                    <Slider label="Otras deudas mensuales" value={debts} min={0} max={5000} step={50} onChange={setDebts} display={fmt(debts * k, cur)} />
                    <Slider label="Ahorros disponibles" value={savings} min={5000} max={300000} step={1000} onChange={setSavings} display={fmt(savings * k, cur)} />
                    <Slider label="Tasa de interés anual" value={rate} min={6} max={18} step={0.25} onChange={setRate} display={`${rate.toFixed(2)}%`} />
                    <Slider label="Plazo" value={years} min={5} max={30} step={1} onChange={setYears} display={`${years} años`} />
                  </div>
                  <div className="calc__out">
                    <Result big label="Podrías comprar una propiedad de hasta" value={fmt(maxPrice * k, cur)} />
                    <Result label="Cuota máxima recomendada (35% del ingreso)" value={fmt(maxPayment * k, cur)} />
                    <Result label="Préstamo aproximado" value={fmt(Math.min(maxLoan, maxPrice * 0.8) * k, cur)} />
                    <p className="calc__note">{bySavings < byLoan ? 'Tu límite lo marcan los ahorros para el inicial y gastos de cierre.' : 'Tu límite lo marca la cuota que puedes pagar cada mes.'}</p>
                    <Link to={`/propiedades?max=${Math.max(Math.round(maxPrice / 5000) * 5000, 55000)}`} className="btn-dark">
                      Ver propiedades en mi presupuesto <span className="btn-dark__icon"><ArrowRight size={15} /></span>
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="calc__footer">
            <p>
              Valores estimados con fines orientativos. La tasa, el plazo y el porcentaje financiado dependen de cada banco y de tu perfil.
              {cur === 'DOP' && ` Conversión referencial: US$1 = RD$${USD_TO_DOP}.`}
            </p>
            <a className="link-arrow" href={waLink('Hola Martínez Home, quiero asesoría para el financiamiento de una propiedad.')} target="_blank" rel="noopener noreferrer">
              Hablar con un asesor <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
