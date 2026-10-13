import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeDollarSign, CalendarCheck, Camera, Handshake, KeyRound, Search } from 'lucide-react';
import RevealText from '../components/RevealText';
import { useStore } from '../store';
import { EASINGS } from '../easings';

const FLOWS = {
  comprar: {
    label: 'Quiero comprar',
    steps: [
      { icon: Search, title: 'Busca y explora', text: 'Filtra por zona, tipo y presupuesto, o cuéntanos qué buscas y te enviamos opciones.' },
      { icon: CalendarCheck, title: 'Visita y elige', text: 'Agenda tu visita presencial o por videollamada y compara con tu asesor.' },
      { icon: KeyRound, title: 'Firma y recibe tus llaves', text: 'Te acompañamos con la reserva, el financiamiento y la firma hasta la entrega.' },
    ],
  },
  vender: {
    label: 'Quiero vender',
    steps: [
      { icon: BadgeDollarSign, title: 'Valoramos tu propiedad', text: 'Visitamos tu inmueble y te recomendamos un precio competitivo de mercado.' },
      { icon: Camera, title: 'La promocionamos', text: 'Fotos, video y difusión en nuestra web, redes y cartera de clientes.' },
      { icon: Handshake, title: 'Cerramos la venta', text: 'Filtramos compradores, negociamos por ti y acompañamos el cierre legal.' },
    ],
  },
} as const;

type Flow = keyof typeof FLOWS;

export default function HowItWorks() {
  const [flow, setFlow] = useState<Flow>('comprar');
  const { openVisit } = useStore();
  const steps = FLOWS[flow].steps;

  return (
    <section className="section how" id="como-funciona">
      <div className="container">
        <div className="how__head">
          <p className="eyebrow">Cómo funciona</p>
          <RevealText tag="h2" className="h2">Tu próxima propiedad en 3 pasos</RevealText>
          <div className="how__switch" role="tablist" aria-label="Proceso">
            {(Object.keys(FLOWS) as Flow[]).map((f) => (
              <button key={f} role="tab" aria-selected={flow === f} className={`how__tab${flow === f ? ' is-on' : ''}`} onClick={() => setFlow(f)}>
                {flow === f && <motion.span layoutId="how-pill" className="how__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span>{FLOWS[f].label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="how__steps">
          <motion.span
            className="how__line"
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.4, ease: EASINGS.premium, delay: 0.3 }}
          />
          <AnimatePresence mode="wait">
            <motion.ol
              key={flow}
              className="how__list"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{ visible: { transition: { staggerChildren: 0.12 } }, exit: { opacity: 0, transition: { duration: 0.2 } } }}
            >
              {steps.map(({ icon: Icon, title, text }, i) => (
                <motion.li
                  key={title}
                  className="how__step"
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASINGS.smooth } } }}
                  whileHover={{ y: -6 }}
                >
                  <span className={`how__icon how__icon--${i}`}><Icon size={26} strokeWidth={1.6} /></span>
                  <span className="how__num">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.li>
              ))}
            </motion.ol>
          </AnimatePresence>
        </div>

        <div className="how__cta">
          {flow === 'comprar' ? (
            <button className="btn-dark" onClick={() => openVisit()}>Agenda una visita <span className="btn-dark__icon"><ArrowRight size={15} /></span></button>
          ) : (
            <Link className="btn-dark" to="/vende-con-nosotros">Vende con nosotros <span className="btn-dark__icon"><ArrowRight size={15} /></span></Link>
          )}
        </div>
      </div>
    </section>
  );
}
