import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Home, KeyRound, UserRound } from 'lucide-react';
import RevealText from '../components/RevealText';
import { PROPERTIES } from '../data/properties';
import { EASINGS } from '../easings';
import { useIsDesktop } from '../useMedia';

const SERVICES = [
  { icon: Home, title: 'Compra', text: 'Encuentra tu hogar ideal.' },
  { icon: KeyRound, title: 'Venta', text: 'Vendemos tu propiedad al mejor valor.' },
  { icon: BarChart3, title: 'Inversión', text: 'Oportunidades con alto potencial.' },
  { icon: UserRound, title: 'Asesoría', text: 'Acompañamiento legal y personalizado.' },
];

/** Best-looking shots from the real inventory; the collage cycles through them three at a time. */
const SHOTS = [
  { src: '/props/casa-de-lujo-avenida-ecologica/02.webp', label: 'Avenida Ecológica' },
  { src: '/props/villa-amueblada-punta-cana/01.webp', label: 'Punta Cana' },
  { src: '/props/casa-con-piscina-ciudad-jardin/01.webp', label: 'Ciudad Jardín' },
  { src: '/props/apartamentos-ensanche-isabelita/01.webp', label: 'Ensanche Isabelita' },
  { src: '/props/torre-apartamentos-prado-oriental/01.webp', label: 'Prado Oriental' },
  { src: '/props/villa-vista-cana-punta-cana/01.webp', label: 'Vista Cana' },
];
const INTERVAL = 4500;

const MotionLink = motion.create(Link);

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASINGS.premium } },
};

/** One frame of the collage: cross-fades to the next photo and drifts with the scroll (desktop only). */
function Frame({ shot, className, y, delay }: { shot: (typeof SHOTS)[number]; className: string; y?: MotionValue<number>; delay: number }) {
  return (
    // Outer layer carries the scroll parallax, inner layer the entrance — two transforms that must not fight.
    <motion.div className={`collage__frame ${className}`} style={y ? { y } : undefined}>
      <motion.div
        className="collage__inner"
        initial={{ opacity: 0, y: 60, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, delay, ease: EASINGS.premium }}
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={shot.src}
            src={shot.src}
            alt={`Propiedad en ${shot.label}`}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASINGS.smooth }}
          />
        </AnimatePresence>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={shot.label} className="collage__label" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
            {shot.label}
          </motion.span>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function Collage() {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yA = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yB = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const yC = useTransform(scrollYProgress, [0, 1], [-20, 50]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % SHOTS.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  const at = (k: number) => SHOTS[(i + k) % SHOTS.length];

  return (
    <div ref={ref} className="collage" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <Frame shot={at(0)} className="collage__a" y={desktop ? yA : undefined} delay={0} />
      <Frame shot={at(1)} className="collage__b" y={desktop ? yB : undefined} delay={0.15} />
      <Frame shot={at(2)} className="collage__c" y={desktop ? yC : undefined} delay={0.3} />

      <motion.div
        className="collage__stat"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 260, damping: 18 }}
      >
        <strong>{PROPERTIES.length}</strong>
        <span>propiedades<br />disponibles</span>
      </motion.div>

      <div className="collage__dots" aria-hidden>
        {SHOTS.map((s, k) => <motion.span key={s.src} animate={{ width: k === i ? 22 : 6, opacity: k === i ? 1 : 0.4 }} />)}
      </div>

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
    </div>
  );
}

export default function Approach() {
  return (
    <section className="approach" id="servicios">
      <div className="container approach__grid">
        <Collage />
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
      </div>
    </section>
  );
}
