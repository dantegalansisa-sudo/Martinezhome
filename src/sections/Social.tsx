import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import { InstagramIcon } from '../components/BrandIcons';
import { CONTACT, REELS } from '../data/site';
import { EASINGS } from '../easings';

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const card = {
  hidden: { opacity: 0, y: 60, rotate: 2 },
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: EASINGS.premium } },
};

function Reel({ reel, onOpen }: { reel: (typeof REELS)[number]; onOpen: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  return (
    <motion.button
      className="reel"
      variants={card}
      whileHover={{ y: -8 }}
      onMouseEnter={() => video.current?.play().catch(() => {})}
      onMouseLeave={() => { if (video.current) { video.current.pause(); video.current.currentTime = 0; } }}
      onClick={onOpen}
      aria-label={`Ver video: ${reel.title}`}
    >
      <video ref={video} src={reel.src} poster={reel.poster} muted loop playsInline preload="none" />
      <span className="reel__shade" />
      <span className="reel__ig"><InstagramIcon size={16} /></span>
      <span className="reel__play"><Play size={22} fill="currentColor" /></span>
      <span className="reel__meta">
        <span className="reel__title">{reel.title}</span>
        <span className="reel__views"><Play size={11} fill="currentColor" /> {reel.views}</span>
      </span>
    </motion.button>
  );
}

export default function Social({ onOpen }: { onOpen: (src: string) => void }) {
  return (
    <section className="section social" id="redes">
      <div className="container social__grid">
        <div className="social__text">
          <p className="eyebrow">Síguenos en redes</p>
          <RevealText tag="h2" className="h2">{'Tips, recorridos\ny mucho más'}</RevealText>
          <motion.p className="lead" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            Conoce propiedades, consejos y todo lo que pasa detrás de cámaras. Síguenos en Instagram <strong>@martinezhomerd</strong> y forma parte de nuestra comunidad.
          </motion.p>
          <MagneticButton href={CONTACT.instagram} external className="btn-dark">
            <InstagramIcon size={16} /> Síguenos en Instagram <span className="btn-dark__icon"><ArrowRight size={15} /></span>
          </MagneticButton>
        </div>
        <motion.div className="reels" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
          {REELS.map((r) => <Reel key={r.src} reel={r} onOpen={() => onOpen(r.src)} />)}
        </motion.div>
      </div>
    </section>
  );
}
