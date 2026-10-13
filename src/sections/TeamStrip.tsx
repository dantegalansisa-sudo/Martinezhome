import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import RevealText from '../components/RevealText';
import TeamCard from '../components/TeamCard';
import { TEAM } from '../data/team';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

export default function TeamStrip() {
  return (
    <section className="section team-strip" id="equipo">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Nuestro equipo</p>
            <RevealText tag="h2" className="h2">{'Personas que te\nacompañan en cada paso'}</RevealText>
          </div>
          <Link to="/equipo" className="link-arrow">Conoce al equipo <ArrowUpRight size={16} /></Link>
        </div>
        <motion.div className="team-row" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
          {TEAM.map((m) => <TeamCard key={m.id} m={m} compact />)}
        </motion.div>
      </div>
    </section>
  );
}
