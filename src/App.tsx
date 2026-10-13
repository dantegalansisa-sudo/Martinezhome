import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import VisitModal from './components/VisitModal';
import HouseCursor, { useHouseCursorEnabled } from './components/HouseCursor';
import { WhatsAppIcon } from './components/BrandIcons';
import Navbar from './sections/Navbar';
import Footer from './sections/Footer';
import Home from './pages/Home';
import { StoreProvider } from './store';
import { waLink } from './data/site';

const Properties = lazy(() => import('./pages/Properties'));
const PropertyDetail = lazy(() => import('./pages/PropertyDetail'));
const Team = lazy(() => import('./pages/Team'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const Sell = lazy(() => import('./pages/Sell'));
const Favorites = lazy(() => import('./pages/Favorites'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CursorPreview = lazy(() => import('./pages/CursorPreview'));

/** Scroll to top on navigation, or to the #anchor when one is present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      let tries = 0;
      const seek = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else if (tries++ < 20) setTimeout(seek, 60);
      };
      seek();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    // Query-string changes (catalog filters) intentionally keep the scroll position.
  }, [pathname, hash]);
  return null;
}

function Layout() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const house = useHouseCursorEnabled();
  return (
    <>
      {house && <HouseCursor />}
      <ScrollManager />
      <motion.div className="progress" style={{ scaleX: progress }} />
      <Navbar />
      <main>
        <Suspense fallback={<div className="page-loading" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <VisitModal />
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
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="propiedades" element={<Properties />} />
            <Route path="propiedades/:slug" element={<PropertyDetail />} />
            <Route path="equipo" element={<Team />} />
            <Route path="calculadora" element={<CalculatorPage />} />
            <Route path="vende-con-nosotros" element={<Sell />} />
            <Route path="favoritos" element={<Favorites />} />
            <Route path="casita" element={<CursorPreview />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
