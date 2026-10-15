import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Hero from '../sections/Hero';
import Featured from '../sections/Featured';
import Approach from '../sections/Approach';
import TrustBar from '../sections/TrustBar';
import ExploreZones from '../sections/ExploreZones';
import HowItWorks from '../sections/HowItWorks';
import Founder from '../sections/Founder';
import TeamStrip from '../sections/TeamStrip';
import Social from '../sections/Social';
import Contact from '../sections/Contact';
import { useSeo } from '../useTitle';
import { t } from '../i18n';

export default function Home() {
  const [video, setVideo] = useState<string | null>(null);
  useSeo();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setVideo(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Hero onTour={() => setVideo('/videos/casa-sde.mp4')} />
      <TrustBar />
      <Featured />
      <ExploreZones />
      <HowItWorks />
      <Approach />
      <Founder />
      <TeamStrip />
      <Social onOpen={setVideo} />
      <Contact />

      <AnimatePresence>
        {video && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideo(null)}>
            <motion.video
              key={video}
              src={video}
              controls
              autoPlay
              playsInline
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            />
            <button className="lightbox__close" aria-label={t('Cerrar video')}><X size={22} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
