import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import RevealText from '../components/RevealText';
import { ZONE_GROUPS, countIn } from '../data/zones';
import { EASINGS } from '../easings';

const MotionLink = motion.create(Link);

const tile = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASINGS.premium } },
};

export default function ExploreZones() {
  const zones = ZONE_GROUPS.filter((z) => countIn(z) > 0);
  return (
    <section className="section zones" id="zonas">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Explora por zona</p>
            <RevealText tag="h2" className="h2">{'Encuentra tu lugar\nen República Dominicana'}</RevealText>
          </div>
          <Link to="/propiedades?vista=mapa" className="link-arrow">Ver en el mapa <ArrowUpRight size={16} /></Link>
        </div>

        <motion.div
          className="zones__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {zones.map((z, i) => {
            const n = countIn(z);
            return (
              <MotionLink key={z.id} to={`/propiedades?area=${z.id}`} className={`zone${i === 0 ? ' zone--big' : ''}`} variants={tile}>
                <img src={z.image} alt={`Propiedades en ${z.name}`} loading="lazy" />
                <span className="zone__shade" />
                <span className="zone__count">{n} {n === 1 ? 'propiedad' : 'propiedades'}</span>
                <span className="zone__text">
                  <small><MapPin size={12} /> {z.hint}</small>
                  <strong>{z.name}</strong>
                </span>
                <span className="zone__go"><ArrowUpRight size={18} /></span>
              </MotionLink>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
