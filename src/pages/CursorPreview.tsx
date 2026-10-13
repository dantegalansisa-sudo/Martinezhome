import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { HouseFigure, type Pose } from '../components/HouseCursor';
import { useSeo } from '../useTitle';

const POSES: { pose: Pose; title: string; text: string }[] = [
  { pose: 'idle', title: 'En reposo', text: 'Sigue tu mouse con los brazos arriba. El clic ocurre justo entre sus manos.' },
  { pose: 'hover', title: 'Sobre un botón', text: 'Abre los brazos y crece un poco para avisar que ahí puedes hacer clic.' },
  { pose: 'press', title: 'Al hacer clic', text: 'Junta las dos manos (se ponen rojas) y deja un pequeño círculo en el punto del clic.' },
];

/** Internal page to evaluate the mascot cursor before turning it on for the whole site. */
export default function CursorPreview() {
  useSeo({ title: 'Vista previa: cursor casita', noindex: true });
  const [demo, setDemo] = useState<Pose>('idle');
  const [active, setActive] = useState(false);

  // Loop through the poses so the animation can be seen without touching the mouse.
  useEffect(() => {
    const seq: Pose[] = ['idle', 'hover', 'press', 'hover', 'idle'];
    let i = 0;
    const t = setInterval(() => setDemo(seq[(i = (i + 1) % seq.length)]), 900);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    try {
      setActive(sessionStorage.getItem('mh:casita') === '1');
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Vista previa interna"
        title="Cursor casita con brazos"
        lead="Así se vería el mouse de Martínez Home en computadora. En celulares no aparece, y en formularios vuelve el cursor normal."
        crumbs={[{ label: 'Cursor casita' }]}
      />
      <section className="section casita">
        <div className="container">
          <div className="casita__hero">
            <div className="casita__stage" data-native-cursor>
              <HouseFigure pose={demo} width={200} height={250} />
              <span className="casita__label">{POSES.find((p) => p.pose === demo)?.title}</span>
            </div>
            <div className="casita__try">
              <h2 className="h2">Pruébala</h2>
              <p className="lead">
                {active
                  ? 'El cursor casita está activo en esta pestaña. Mueve el mouse, pasa sobre los botones y haz clic.'
                  : 'Actívala para esta pestaña y recorre la web con ella.'}
              </p>
              <div className="casita__buttons">
                {active ? (
                  <a className="btn-ghost" href="/casita?casita=0">Volver al cursor normal</a>
                ) : (
                  <a className="btn-dark" href="/casita?casita=1">Activar cursor casita <span className="btn-dark__icon"><ArrowRight size={15} /></span></a>
                )}
                <Link className="btn-ghost" to="/propiedades">Probar en propiedades</Link>
              </div>
              <div className="casita__targets">
                <button className="pill">Botón de prueba</button>
                <button className="pill">Otro botón</button>
                <input className="input" placeholder="Aquí vuelve el cursor normal" />
              </div>
            </div>
          </div>

          <motion.div className="casita__poses" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
            {POSES.map((p) => (
              <motion.article key={p.pose} className="casita__pose" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}>
                <div className="casita__mini"><HouseFigure pose={p.pose} width={96} height={120} /></div>
                <strong>{p.title}</strong>
                <p>{p.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
