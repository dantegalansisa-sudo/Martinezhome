import { motion } from 'framer-motion';
import { CalendarClock, Headset, Scale, ShieldCheck } from 'lucide-react';
import { EASINGS } from '../easings';
import { t } from '../i18n';

const ITEMS = [
  { icon: ShieldCheck, title: 'Propiedades verificadas', text: 'Revisamos títulos y documentos' },
  { icon: Scale, title: 'Acompañamiento legal', text: 'De la reserva hasta la firma' },
  { icon: CalendarClock, title: 'Planes de pago', text: 'Proyectos con inicial en cuotas' },
  { icon: Headset, title: 'Asesoría personalizada', text: 'Un asesor dedicado para ti' },
];

/** White card that overlaps the bottom of the hero, like a shelf of guarantees. */
export default function TrustBar() {
  return (
    <section className="trust" aria-label={t('Por qué elegirnos')}>
      <div className="container">
        <motion.ul
          className="trust__card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {ITEMS.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASINGS.smooth } } }}
            >
              <span className={`trust__icon trust__icon--${i % 2 ? 'sand' : 'ink'}`}><Icon size={20} strokeWidth={1.7} /></span>
              <span>
                <strong>{t(title)}</strong>
                <small>{t(text)}</small>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
