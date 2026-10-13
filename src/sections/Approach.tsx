import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Home, KeyRound, UserRound } from 'lucide-react';
import RevealText from '../components/RevealText';
import { useParallax } from '../components/useParallax';
import { EASINGS } from '../easings';

const SERVICES = [
  { icon: Home, title: 'Compra', text: 'Encuentra tu hogar ideal.' },
  { icon: KeyRound, title: 'Venta', text: 'Vendemos tu propiedad al mejor valor.' },
  { icon: BarChart3, title: 'Inversión', text: 'Oportunidades con alto potencial.' },
  { icon: UserRound, title: 'Asesoría', text: 'Acompañamiento legal y personalizado.' },
];

const MotionLink = motion.create(Link);

const clipX = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.2, ease: EASINGS.premium } },
};

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASINGS.premium } },
};

export default function Approach() {
  const { ref, y } = useParallax(50);
  return (
    <section className="approach" id="servicios">
      <motion.div ref={ref} className="approach__media" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <motion.div className="reveal-clip" variants={clipX}>
          <motion.img src="/props/casa-de-lujo-avenida-ecologica/02.webp" alt="Interior iluminado de una casa de lujo en venta" style={{ y, scale: 1.18 }} />
        </motion.div>
        <MotionLink
          to="/vende-con-nosotros"
          className="approach__pill"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.7, ease: EASINGS.smooth }}
        >
          <span>¿Quieres vender tu propiedad?<br /><strong>Te ayudamos a venderla.</strong></span>
          <span className="round-btn"><ArrowRight size={16} /></span>
        </MotionLink>
      </motion.div>

      <div className="approach__content">
        <p className="eyebrow">Nuestro enfoque</p>
        <RevealText tag="h2" className="h2">{'Soluciones inmobiliarias\npara cada etapa de tu vida'}</RevealText>
        <motion.p className="lead" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
          Te acompañamos en todo el proceso, desde la búsqueda hasta la firma, con un servicio cercano, transparente y enfocado en tus objetivos. Tu respaldo seguro en bienes raíces.
        </motion.p>
        <motion.ul className="services" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          {SERVICES.map(({ icon: Icon, title, text }) => (
            <motion.li key={title} className="service" variants={item} whileHover={{ y: -6 }}>
              <span className="service__icon"><Icon size={26} strokeWidth={1.4} /></span>
              <strong>{title}</strong>
              <span>{text}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
