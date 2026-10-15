import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store';
import LeadDone from './LeadDone';
import { sendLead, warmLead, type LeadResult } from '../lib/lead';
import { EASINGS } from '../easings';
import { getLang, locale, t } from '../i18n';
import { localize } from '../data/localize';

const SLOTS = [
  { label: '9:00 a. m.', hour: 9, minute: 0 },
  { label: '10:30 a. m.', hour: 10, minute: 30 },
  { label: '12:00 p. m.', hour: 12, minute: 0 },
  { label: '2:00 p. m.', hour: 14, minute: 0 },
  { label: '3:30 p. m.', hour: 15, minute: 30 },
  { label: '5:00 p. m.', hour: 17, minute: 0 },
];

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

const fmtDay = (d: Date) => d.toLocaleDateString(locale(), { weekday: 'short' }).replace('.', '');
const fmtLong = (d: Date) => d.toLocaleDateString(locale(), { weekday: 'long', day: 'numeric', month: 'long' });
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export default function VisitModal() {
  const { visit, closeVisit } = useStore();
  const days = useMemo(nextDays, []);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(-1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [trap, setTrap] = useState('');
  const [mode, setMode] = useState<'Presencial' | 'Videollamada'>('Presencial');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [lastText, setLastText] = useState('');

  useEffect(() => {
    if (!visit.open) return;
    warmLead();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeVisit();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [visit.open, closeVisit]);

  // Start fresh every time the scheduler opens.
  useEffect(() => {
    if (visit.open) setResult(null);
  }, [visit.open]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending || slot < 0) return;
    const p = visit.property;
    const s = SLOTS[slot];
    const lp = p && localize(p);
    const property = lp ? `${lp.title} (${lp.zone})` : t('Aún no decide — quiere asesoría');
    const text = [
      t('Hola Martínez Home, quiero agendar una visita.'),
      `${t('Propiedad')}: ${property}`,
      `${t('Fecha')}: ${fmtLong(days[day])}`,
      `${t('Hora')}: ${t(s.label)}`,
      `${t('Modalidad')}: ${t(mode)}`,
      `${t('Nombre')}: ${name}`,
      `${t('Teléfono')}: ${phone}`,
      `${t('Correo')}: ${email}`,
    ].join('\n');
    setSending(true);
    const r = await sendLead(
      {
        type: 'visita',
        name,
        phone,
        email,
        website: trap,
        lang: getLang(),
        fields: [
          ['Propiedad', property],
          ['Fecha', fmtLong(days[day])],
          ['Hora', s.label],
          ['Modalidad', mode],
          ...(p ? ([['Enlace', `https://www.martinezhomerd.com/propiedades/${p.slug}`]] as [string, string][]) : []),
        ],
        visit: { date: iso(days[day]), hour: s.hour, minute: s.minute },
      },
      text
    );
    setLastText(text);
    setResult(r);
    setSending(false);
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
            <button type="button" className="modal__close" onClick={closeVisit} aria-label={t('Cerrar')}><X size={18} /></button>

            {result ? (
              <LeadDone result={result} name={name} email={email} whatsappText={lastText} onAgain={closeVisit} againLabel={t('Cerrar')} />
            ) : (
              <>
                <span className="visit__icon"><CalendarCheck size={22} /></span>
                <h2 id="visit-title" className="visit__title">{t('Agenda tu visita')}</h2>
                <p className="visit__sub">{visit.property ? localize(visit.property).title : t('Te acompañamos a conocer la propiedad ideal para ti.')}</p>

                <p className="visit__label">{t('Elige el día')}</p>
                <div className="days">
                  {days.map((d, i) => (
                    <button type="button" key={i} className={`day${day === i ? ' is-on' : ''}`} onClick={() => setDay(i)}>
                      <small>{fmtDay(d)}</small>
                      <strong>{d.getDate()}</strong>
                    </button>
                  ))}
                </div>

                <p className="visit__label">{t('Hora')}</p>
                <div className="slots">
                  {SLOTS.map((s, i) => (
                    <button type="button" key={s.label} className={`slot${slot === i ? ' is-on' : ''}`} onClick={() => setSlot(i)}>{t(s.label)}</button>
                  ))}
                </div>

                <div className="visit__mode">
                  {(['Presencial', 'Videollamada'] as const).map((m) => (
                    <label key={m} className={`radio${mode === m ? ' is-on' : ''}`}>
                      <input type="radio" name="mode" checked={mode === m} onChange={() => setMode(m)} /> {t(m)}
                    </label>
                  ))}
                </div>

                <div className="visit__fields">
                  <input required placeholder={t('Tu nombre')} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                  <input required type="tel" placeholder={t('Teléfono / WhatsApp')} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
                  <input required type="email" className="visit__email" placeholder={t('Correo electrónico (te enviamos la confirmación)')} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                  <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden value={trap} onChange={(e) => setTrap(e.target.value)} name="website" />
                </div>

                <button type="submit" className="btn-submit" disabled={slot < 0 || sending}>
                  <span>
                    {sending ? t('Agendando…') : slot >= 0 ? `${t('Confirmar')} ${fmtDay(days[day])} ${days[day].getDate()} · ${t(SLOTS[slot].label)}` : t('Selecciona una hora')}
                  </span>
                  <ArrowRight size={16} />
                </button>
                <p className="visit__note">
                  {t('Recibirás la confirmación por correo, con la cita para tu calendario. Al enviar aceptas nuestra')}{' '}
                  <Link to="/privacidad" onClick={closeVisit}>{t('Política de privacidad')}</Link>.
                </p>
              </>
            )}
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
