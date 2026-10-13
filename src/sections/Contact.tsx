import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mail, MapPin, MessageSquare, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import RevealText from '../components/RevealText';
import { CONTACT } from '../data/site';
import LeadDone from '../components/LeadDone';
import { sendLead, warmLead, type LeadResult } from '../lib/lead';
import { EASINGS } from '../easings';
import { useIsDesktop } from '../useMedia';

const INTERESTS = ['Comprar', 'Alquilar', 'Vender', 'Invertir'] as const;
const KINDS = ['Casa', 'Apartamento', 'Villa', 'Solar', 'Local'];
const BUDGETS = ['Hasta US$100K', 'US$100K – 150K', 'US$150K – 250K', 'US$250K – 400K', 'Más de US$400K'];
const CHANNELS = ['WhatsApp', 'Llamada', 'Correo'] as const;

type Interest = (typeof INTERESTS)[number];
type Channel = (typeof CHANNELS)[number];

const slide = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const desktop = useIsDesktop();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [sending, setSending] = useState(false);
  const [trap, setTrap] = useState('');
  const [lastText, setLastText] = useState('');

  useEffect(warmLead, []);
  const [interest, setInterest] = useState<Interest>('Comprar');
  const [kind, setKind] = useState('Casa');
  const [budget, setBudget] = useState('');
  const [zone, setZone] = useState('');
  const [channel, setChannel] = useState<Channel>('WhatsApp');
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const selling = interest === 'Vender';
  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (step === 0) return go(1);
    if (sending) return;
    const text = [
      `Hola Martínez Home, quiero ${interest.toLowerCase()} una propiedad.`,
      `Tipo: ${kind}`,
      budget && `${selling ? 'Precio esperado' : 'Presupuesto'}: ${budget}`,
      zone && `Zona: ${zone}`,
      `Nombre: ${form.name}`,
      `Teléfono: ${form.phone}`,
      form.email && `Correo: ${form.email}`,
      `Prefiero que me contacten por: ${channel}`,
      form.message && `Mensaje: ${form.message}`,
    ].filter(Boolean).join('\n');
    setSending(true);
    const fields: [string, string][] = [
      ['Interés', interest],
      ['Tipo de propiedad', kind],
      [selling ? 'Precio esperado' : 'Presupuesto', budget],
      ['Zona de interés', zone],
      ['Contactar por', channel],
      ['Mensaje', form.message],
    ];
    const r = await sendLead({ type: 'contacto', name: form.name, phone: form.phone, email: form.email, fields, website: trap }, text);
    setLastText(text);
    setResult(r);
    setSending(false);
  };

  const restart = () => {
    setResult(null);
    setStep(0);
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <section className="contact" id="contacto" ref={ref}>
      <motion.div className="contact__bg" style={desktop ? { y } : undefined}>
        <img src="/images/cta-atardecer.webp" alt="" loading="lazy" />
      </motion.div>
      <div className="contact__veil" />
      <div className="container contact__grid">
        <div className="contact__text">
          <p className="eyebrow eyebrow--light">Hablemos de tu próxima propiedad</p>
          <RevealText tag="h2" className="h2 h2--light">{'¿Listo para dar\nel siguiente paso?'}</RevealText>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
            Cuéntanos qué buscas y un asesor te contactará con opciones a tu medida en menos de 24 horas.
          </motion.p>
          <motion.ul className="contact__lines" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.45 }}>
            {CONTACT.phones.map((ph, i) => (
              <li key={ph}>
                <Phone size={15} />
                <a href={`tel:+1${ph.replace(/\D/g, '')}`}>{ph}</a>
                {i === 0 && <span className="contact__main">Principal · WhatsApp</span>}
              </li>
            ))}
            <li><MapPin size={15} /> <span>{CONTACT.address}</span></li>
          </motion.ul>
        </div>

        <motion.div
          className="contact__form"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASINGS.premium }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {result ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <LeadDone result={result} name={form.name} email={form.email} whatsappText={lastText} onAgain={restart} />
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="cform__head">
                  <span>Paso {step + 1} de 2</span>
                  <strong>{step === 0 ? '¿Qué estás buscando?' : 'Tus datos de contacto'}</strong>
                  <span className="cform__bar"><motion.span animate={{ width: step === 0 ? '50%' : '100%' }} transition={{ duration: 0.5, ease: EASINGS.smooth }} /></span>
                </div>

                <AnimatePresence mode="wait" custom={dir} initial={false}>
                  <motion.div key={step} className="cform__step" custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.35, ease: EASINGS.smooth }}>
                    {step === 0 ? (
                      <>
                        <p className="cform__label">Quiero</p>
                        <div className="cform__chips">
                          {INTERESTS.map((i) => (
                            <button type="button" key={i} className={`pill${interest === i ? ' is-on' : ''}`} onClick={() => setInterest(i)}>{i}</button>
                          ))}
                        </div>
                        <p className="cform__label">Tipo de propiedad</p>
                        <div className="cform__chips">
                          {KINDS.map((k) => (
                            <button type="button" key={k} className={`pill${kind === k ? ' is-on' : ''}`} onClick={() => setKind(k)}>{k}</button>
                          ))}
                        </div>
                        <p className="cform__label">{selling ? 'Precio esperado' : 'Presupuesto'}</p>
                        <div className="cform__chips cform__chips--wrap">
                          {BUDGETS.map((b) => (
                            <button type="button" key={b} className={`pill pill--sm${budget === b ? ' is-on' : ''}`} onClick={() => setBudget(budget === b ? '' : b)}>{b}</button>
                          ))}
                        </div>
                        <label className="field"><MapPin size={16} /><input placeholder="Zona de interés (opcional)" value={zone} onChange={(e) => setZone(e.target.value)} /></label>
                      </>
                    ) : (
                      <>
                        <label className="field"><User size={16} /><input required placeholder="Nombre completo" value={form.name} onChange={set('name')} autoComplete="name" /></label>
                        <label className="field"><Phone size={16} /><input type="tel" required placeholder="Teléfono / WhatsApp" value={form.phone} onChange={set('phone')} autoComplete="tel" /></label>
                        <label className="field"><Mail size={16} /><input type="email" required placeholder="Correo electrónico" value={form.email} onChange={set('email')} autoComplete="email" /></label>
                        <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden value={trap} onChange={(e) => setTrap(e.target.value)} name="website" />
                        <p className="cform__label">Prefiero que me contacten por</p>
                        <div className="cform__chips">
                          {CHANNELS.map((c) => (
                            <button type="button" key={c} className={`pill${channel === c ? ' is-on' : ''}`} onClick={() => setChannel(c)}>{c}</button>
                          ))}
                        </div>
                        <label className="field field--area"><MessageSquare size={16} /><textarea rows={2} placeholder="Mensaje (opcional)" value={form.message} onChange={set('message')} /></label>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="cform__actions">
                  {step === 1 && (
                    <button type="button" className="cform__back" onClick={() => go(0)} aria-label="Volver al paso anterior"><ArrowLeft size={18} /></button>
                  )}
                  <button type="submit" className="btn-submit" disabled={sending}>
                    <span>{step === 0 ? 'Continuar' : sending ? 'Enviando…' : 'Enviar solicitud'}</span> <ArrowRight size={16} />
                  </button>
                </div>
                <p className="cform__note">Tus datos solo se usan para contactarte sobre tu solicitud. <Link to="/privacidad">Política de privacidad</Link></p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
