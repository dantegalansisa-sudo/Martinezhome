import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, X } from 'lucide-react';
import { useStore } from '../store';
import { waLink } from '../data/site';
import { EASINGS } from '../easings';

const SLOTS = ['9:00 a. m.', '10:30 a. m.', '12:00 p. m.', '2:00 p. m.', '3:30 p. m.', '5:00 p. m.'];

/** Next 12 days, skipping Sundays. */
const nextDays = () => {
  const out: Date[] = [];
  const d = new Date();
  while (out.length < 12) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) out.push(new Date(d));
  }
  return out;
};

const fmtDay = (d: Date) => d.toLocaleDateString('es-DO', { weekday: 'short' }).replace('.', '');
const fmtLong = (d: Date) => d.toLocaleDateString('es-DO', { weekday: 'long', day: 'numeric', month: 'long' });

export default function VisitModal() {
  const { visit, closeVisit } = useStore();
  const days = useMemo(nextDays, []);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState<'Presencial' | 'Videollamada'>('Presencial');

  useEffect(() => {
    if (!visit.open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeVisit();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [visit.open, closeVisit]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const p = visit.property;
    const text = [
      'Hola Martínez Home, quiero agendar una visita.',
      p ? `Propiedad: ${p.title} (${p.zone})` : 'Propiedad: aún no decido, quiero asesoría.',
      `Fecha: ${fmtLong(days[day])}`,
      `Hora: ${slot}`,
      `Modalidad: ${mode}`,
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
    ].join('\n');
    window.open(waLink(text), '_blank', 'noopener');
    closeVisit();
  };

  return (
    <AnimatePresence>
      {visit.open && (
        <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={closeVisit}>
          <motion.form
            className="modal__panel visit"
            onSubmit={submit}
            onMouseDown={(e) => e.stopPropagation()}
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASINGS.premium }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="visit-title"
          >
            <button type="button" className="modal__close" onClick={closeVisit} aria-label="Cerrar"><X size={18} /></button>
            <span className="visit__icon"><CalendarCheck size={22} /></span>
            <h2 id="visit-title" className="visit__title">Agenda tu visita</h2>
            <p className="visit__sub">{visit.property ? visit.property.title : 'Te acompañamos a conocer la propiedad ideal para ti.'}</p>

            <p className="visit__label">Elige el día</p>
            <div className="days">
              {days.map((d, i) => (
                <button type="button" key={i} className={`day${day === i ? ' is-on' : ''}`} onClick={() => setDay(i)}>
                  <small>{fmtDay(d)}</small>
                  <strong>{d.getDate()}</strong>
                </button>
              ))}
            </div>

            <p className="visit__label">Hora</p>
            <div className="slots">
              {SLOTS.map((s) => (
                <button type="button" key={s} className={`slot${slot === s ? ' is-on' : ''}`} onClick={() => setSlot(s)}>{s}</button>
              ))}
            </div>

            <div className="visit__mode">
              {(['Presencial', 'Videollamada'] as const).map((m) => (
                <label key={m} className={`radio${mode === m ? ' is-on' : ''}`}>
                  <input type="radio" name="mode" checked={mode === m} onChange={() => setMode(m)} /> {m}
                </label>
              ))}
            </div>

            <div className="visit__fields">
              <input required placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              <input required type="tel" placeholder="Teléfono / WhatsApp" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            </div>

            <button type="submit" className="btn-submit" disabled={!slot}>
              <span>{slot ? `Confirmar ${fmtDay(days[day])} ${days[day].getDate()} · ${slot}` : 'Selecciona una hora'}</span>
              <ArrowRight size={16} />
            </button>
            <p className="visit__note">Te confirmaremos la cita por WhatsApp.</p>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
