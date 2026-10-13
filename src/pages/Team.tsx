import { motion } from 'framer-motion';
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import TeamCard from '../components/TeamCard';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import { TEAM } from '../data/team';
import { waLink } from '../data/site';
import { EASINGS } from '../easings';
import { useTitle } from '../useTitle';

const VALUES = [
  { icon: ShieldCheck, title: 'Confianza', text: 'Procesos claros y documentación revisada en cada operación.' },
  { icon: HeartHandshake, title: 'Acompañamiento', text: 'Un asesor contigo desde la primera visita hasta la entrega de llaves.' },
  { icon: Sparkles, title: 'Soluciones', text: 'Opciones de financiamiento, planes de pago e inversión a tu medida.' },
];

const grid = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function Team() {
  useTitle('Nuestro equipo');
  const [lead, ...rest] = TEAM;
  return (
    <>
      <PageHeader
        eyebrow="Nuestro equipo"
        title="Personas que hacen posible tu próximo hogar"
        lead="Un equipo de asesores comprometidos con acompañarte en la compra, venta o inversión de tu propiedad en República Dominicana."
        crumbs={[{ label: 'Equipo' }]}
      />

      <section className="section team-page">
        <div className="container">
          <div className="team-lead">
            <motion.div className="team-lead__card" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={grid}>
              <TeamCard m={lead} />
            </motion.div>
            <motion.div className="team-lead__text" initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9, ease: EASINGS.smooth }}>
              <p className="eyebrow">CEO &amp; Fundadora</p>
              <RevealText tag="h2" className="h2">{'Liderazgo con\nvocación de servicio'}</RevealText>
              <p className="lead">
                La Lic. Vanessa Martínez fundó Martínez Home con una idea clara: que cada familia dominicana tenga un respaldo seguro al momento de comprar,
                vender o invertir. Hoy lidera un equipo que comparte esa misma pasión desde Prado Oriental, Santo Domingo Este.
              </p>
              <ul className="values">
                {VALUES.map(({ icon: Icon, title, text }) => (
                  <li key={title}>
                    <span><Icon size={20} strokeWidth={1.6} /></span>
                    <div>
                      <strong>{title}</strong>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="section-head team-page__head">
            <div>
              <p className="eyebrow">Asesores</p>
              <RevealText tag="h2" className="h2">Conoce a tu asesor</RevealText>
            </div>
          </div>
          <motion.div className="team-grid" variants={grid} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            {rest.map((m) => <TeamCard key={m.id} m={m} />)}
          </motion.div>

          <motion.div className="join" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div>
              <h3>¿Quieres formar parte del equipo?</h3>
              <p>Buscamos asesores apasionados por los bienes raíces.</p>
            </div>
            <MagneticButton href={waLink('Hola Martínez Home, me interesa formar parte del equipo de asesores.')} external className="btn-dark">
              Escríbenos <span className="btn-dark__icon"><ArrowRight size={15} /></span>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}
