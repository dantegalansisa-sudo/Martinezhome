import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import { InstagramIcon } from '../components/BrandIcons';
import { CONTACT, REELS } from '../data/site';
import { EASINGS } from '../easings';
import { useIsMobile } from '../useMedia';

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

/** Mobile: cards pin one over another; the ones underneath shrink back like a deck. */
function StackItem({ i, total, progress, children }: { i: number; total: number; progress: MotionValue<number>; children: ReactNode }) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - 1 - i) * 0.06]);
  const filter = useTransform(progress, [i / total, 1], ['brightness(1)', `brightness(${1 - (total - 1 - i) * 0.12})`]);
  return (
    <div className="stack-item" style={{ top: `calc(84px + ${i * 14}px)` }}>
      <motion.div style={{ scale, filter, transformOrigin: '50% 0%' }}>{children}</motion.div>
    </div>
  );
}

export default function Social({ onOpen }: { onOpen: (src: string) => void }) {
  const mobile = useIsMobile();
  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stack, offset: ['start start', 'end end'] });
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
        {mobile ? (
          <div ref={stack} className="reels-stack">
            {REELS.map((r, i) => (
              <StackItem key={r.src} i={i} total={REELS.length} progress={scrollYProgress}>
                <Reel reel={r} onOpen={() => onOpen(r.src)} />
              </StackItem>
            ))}
          </div>
        ) : (
          <motion.div className="reels" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            {REELS.map((r) => <Reel key={r.src} reel={r} onOpen={() => onOpen(r.src)} />)}
          </motion.div>
        )}
      </div>
    </section>
  );
}
