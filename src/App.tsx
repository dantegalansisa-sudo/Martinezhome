import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { X } from 'lucide-react';
import CustomCursor from './components/CustomCursor';
import { WhatsAppIcon } from './components/BrandIcons';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Featured from './sections/Featured';
import Approach from './sections/Approach';
import Founder from './sections/Founder';
import Social from './sections/Social';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { waLink } from './data';

export default function App() {
  const [video, setVideo] = useState<string | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setVideo(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <CustomCursor />
      <motion.div className="progress" style={{ scaleX: progress }} />
      <Navbar />
      <main>
        <Hero onTour={() => setVideo('./videos/casa-sde.mp4')} />
        <Featured />
        <Approach />
        <Founder />
        <Social onOpen={setVideo} />
        <Contact />
      </main>
      <Footer />

      <motion.a
        className="wa-float"
        href={waLink('Hola Martínez Home, quiero información.')}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.2, type: 'spring', stiffness: 260, damping: 18 }}
      >
        <WhatsAppIcon size={26} />
      </motion.a>

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
            <button className="lightbox__close" aria-label="Cerrar video"><X size={22} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
