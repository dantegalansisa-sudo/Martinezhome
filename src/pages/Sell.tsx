import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, FileCheck2, Megaphone, Scale, TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import RevealText from '../components/RevealText';
import { waLink } from '../data/site';
import { EASINGS } from '../easings';
import { useSeo } from '../useTitle';

const BENEFITS = [
  { icon: TrendingUp, title: 'Valoración de mercado', text: 'Te ayudamos a definir un precio competitivo basado en la zona y el mercado actual.' },
  { icon: Camera, title: 'Fotos y video', text: 'Presentamos tu propiedad con fotografía y recorridos que generan interés real.' },
  { icon: Megaphone, title: 'Difusión en redes', text: 'Publicación en nuestro Instagram, web y red de clientes y asesores.' },
  { icon: Scale, title: 'Acompañamiento legal', text: 'Revisión de documentos y acompañamiento hasta el cierre de la venta.' },
];

const STEPS = ['Nos cuentas sobre tu propiedad', 'Visita y valoración', 'Publicación y promoción', 'Visitas con clientes calificados', 'Negociación y cierre'];

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASINGS.premium } },
};

export default function Sell() {
  useSeo({ title: 'Vende o alquila tu propiedad', description: 'Vende o alquila tu casa o apartamento con Martínez Home: valoración de mercado, fotos profesionales, difusión en redes y acompañamiento legal hasta el cierre.' });
  const [f, setF] = useState({ tipo: 'Casa', operacion: 'Vender', zona: '', precio: '', nombre: '', telefono: '', detalle: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      `Hola Martínez Home, quiero ${f.operacion.toLowerCase()} mi propiedad.`,
      `Tipo: ${f.tipo}`,
      `Zona: ${f.zona}`,
      f.precio && `Precio esperado: ${f.precio}`,
      f.detalle && `Detalles: ${f.detalle}`,
      `Nombre: ${f.nombre}`,
      `Teléfono: ${f.telefono}`,
    ].filter(Boolean).join('\n');
    window.open(waLink(text), '_blank', 'noopener');
  };

  return (
    <>
      <PageHeader
        eyebrow="Propietarios"
        title="Vende o alquila tu propiedad con nosotros"
        lead="Ponemos tu propiedad frente a los compradores correctos, con una presentación profesional y un acompañamiento seguro de principio a fin."
        crumbs={[{ label: 'Vende con nosotros' }]}
      />

      <section className="section sell">
        <div className="container sell__grid">
          <div>
            <motion.ul className="benefits" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              {BENEFITS.map(({ icon: Icon, title, text }) => (
                <motion.li key={title} variants={item} whileHover={{ y: -6 }}>
                  <span className="benefits__icon"><Icon size={22} strokeWidth={1.6} /></span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </motion.li>
              ))}
            </motion.ul>

            <div className="steps">
              <p className="eyebrow">Cómo funciona</p>
              <RevealText tag="h2" className="h2">Cinco pasos, cero complicaciones</RevealText>
              <ol>
                {STEPS.map((s, i) => (
                  <motion.li key={s} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}>
                    <span>{String(i + 1).padStart(2, '0')}</span> {s}
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>

          <motion.form className="sell__form" onSubmit={submit} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: EASINGS.premium }}>
            <span className="sell__form-icon"><FileCheck2 size={22} /></span>
            <h2>Cuéntanos sobre tu propiedad</h2>
            <p>Te contactamos en menos de 24 horas.</p>
            <div className="form-row">
              <label>Quiero
                <select className="select" value={f.operacion} onChange={set('operacion')}>
                  <option>Vender</option>
                  <option>Alquilar</option>
                </select>
              </label>
              <label>Tipo
                <select className="select" value={f.tipo} onChange={set('tipo')}>
                  {['Casa', 'Apartamento', 'Penthouse', 'Villa', 'Solar', 'Local comercial'].map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
            </div>
            <label>Sector / ciudad<input className="input" required placeholder="Ej. Prado Oriental, Santo Domingo Este" value={f.zona} onChange={set('zona')} /></label>
            <label>Precio esperado (opcional)<input className="input" placeholder="Ej. US$ 180,000" value={f.precio} onChange={set('precio')} /></label>
            <label>Detalles (opcional)<textarea className="input" rows={3} placeholder="Habitaciones, metros, parqueos…" value={f.detalle} onChange={set('detalle')} /></label>
            <div className="form-row">
              <label>Nombre<input className="input" required value={f.nombre} onChange={set('nombre')} autoComplete="name" /></label>
              <label>Teléfono<input className="input" required type="tel" value={f.telefono} onChange={set('telefono')} autoComplete="tel" /></label>
            </div>
            <button type="submit" className="btn-submit"><span>Enviar información</span> <ArrowRight size={16} /></button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
