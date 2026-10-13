import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import RevealText from '../components/RevealText';
import TeamCard from '../components/TeamCard';
import { TEAM, type Member } from '../data/team';
import { useIsMobile } from '../useMedia';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

/** Each card rises, straightens and lights up as it reaches the middle of the pinned strip. */
function PinnedCard({ m, i, total, progress }: { m: Member; i: number; total: number; progress: MotionValue<number> }) {
  const center = total > 1 ? i / (total - 1) : 0;
  const span = 1 / Math.max(total - 1, 1);
  const range = [center - span * 1.2, center, center + span * 1.2];
  const scale = useTransform(progress, range, [0.84, 1, 0.84]);
  const y = useTransform(progress, range, [36, 0, 36]);
  const rotate = useTransform(progress, range, [-4, 0, 4]);
  const opacity = useTransform(progress, range, [0.55, 1, 0.55]);
  return (
    <motion.div className="pin-card" style={{ scale, y, rotate, opacity }}>
      <TeamCard m={m} compact />
    </motion.div>
  );
}

/** Mobile: vertical scrolling drives the team row sideways while the section stays pinned. */
function PinnedTeam() {
  const section = useRef<HTMLElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -shift]);
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useLayoutEffect(() => {
    const measure = () => {
      const el = row.current;
      if (el) setShift(Math.max(el.scrollWidth - el.clientWidth, 0));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (row.current) ro.observe(row.current);
    return () => ro.disconnect();
  }, []);

  return (
    <section ref={section} className="team-pin" id="equipo" style={{ height: `calc(100svh + ${shift}px)` }}>
      <div className="team-pin__sticky">
        <div className="container">
          <p className="eyebrow">Nuestro equipo</p>
          <RevealText tag="h2" className="h2">{'Personas que te\nacompañan en cada paso'}</RevealText>
        </div>
        <div ref={row} className="team-pin__viewport">
          <motion.div className="team-pin__row" style={{ x }}>
            {TEAM.map((m, i) => <PinnedCard key={m.id} m={m} i={i} total={TEAM.length} progress={scrollYProgress} />)}
          </motion.div>
        </div>
        <div className="container team-pin__foot">
          <span className="team-pin__track"><motion.span style={{ width: bar }} /></span>
          <Link to="/equipo" className="link-arrow">Conoce al equipo <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}

export default function TeamStrip() {
  const mobile = useIsMobile();
  if (mobile) return <PinnedTeam />;
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
