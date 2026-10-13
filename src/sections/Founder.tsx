import { motion } from 'framer-motion';
import { ArrowRight, BadgeCheck, Quote } from 'lucide-react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import { useParallax } from '../components/useParallax';
import { CONTACT } from '../data/site';
import { EASINGS } from '../easings';

export default function Founder() {
  const { ref, y } = useParallax(40);
  return (
    <section className="section founder" id="fundadora">
      <div className="container founder__grid">
        <div className="founder__text">
          <p className="eyebrow">Nuestra fundadora</p>
          <RevealText tag="h2" className="h2">{'Una visión que\nconstruye hogares'}</RevealText>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="lead">
              Martínez Home nace de la pasión de <strong>{CONTACT.ceo}</strong> por conectar a las familias dominicanas con espacios que transforman vidas.
              Desde Santo Domingo Este, lidera un equipo comprometido con la confianza, la transparencia y un servicio verdaderamente personalizado.
            </p>
            <ul className="founder__values">
              <li>Confianza</li>
              <li>Inversiones</li>
              <li>Soluciones</li>
            </ul>
          </motion.div>
          <MagneticButton to="/equipo" className="btn-dark">
            Conoce a nuestro equipo <span className="btn-dark__icon"><ArrowRight size={15} /></span>
          </MagneticButton>
        </div>

        <div className="founder__visual">
          <motion.div ref={ref} className="founder__photo" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <motion.div
              className="reveal-clip"
              variants={{
                hidden: { clipPath: 'inset(100% 0 0 0)' },
                visible: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.2, ease: EASINGS.premium } },
              }}
            >
              <motion.img src="/images/ceo-vanessa.webp" alt="Lic. Vanessa Martínez, CEO y fundadora de Martínez Home RD" style={{ y, scale: 1.12 }} />
            </motion.div>
            <span className="founder__badge"><BadgeCheck size={16} /> CEO · Martínez Home RD</span>
          </motion.div>

          <motion.figure
            className="founder__quote"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASINGS.smooth }}
          >
            <Quote size={26} className="founder__quote-icon" />
            <blockquote>Mi compromiso es acompañarte a encontrar el lugar donde realmente quieras estar.</blockquote>
            <figcaption>
              <span className="signature">Vanessa Martínez</span>
              <strong>CEO &amp; Fundadora</strong>
              <span>Martínez Home RD</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
