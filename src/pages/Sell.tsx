import { useEffect, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, FileCheck2, Megaphone, Scale, TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import RevealText from '../components/RevealText';
import LeadDone from '../components/LeadDone';
import { sendLead, warmLead, type LeadResult } from '../lib/lead';
import { EASINGS } from '../easings';
import { useSeo } from '../useTitle';
import { getLang, t } from '../i18n';

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
  useSeo({ title: t('Vende o alquila tu propiedad'), description: t('Vende o alquila tu casa o apartamento con Martínez Home: valoración de mercado, fotos profesionales, difusión en redes y acompañamiento legal hasta el cierre.') });
  const [f, setF] = useState({ tipo: 'Casa', operacion: 'Vender', zona: '', precio: '', nombre: '', telefono: '', email: '', detalle: '' });
  const [trap, setTrap] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [lastText, setLastText] = useState('');

  useEffect(warmLead, []);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const text = [
      t('Hola Martínez Home, quiero {what} mi propiedad.', { what: t(f.operacion).toLowerCase() }),
      `${t('Tipo')}: ${t(f.tipo)}`,
      `${t('Zona')}: ${f.zona}`,
      f.precio && `${t('Precio esperado')}: ${f.precio}`,
      f.detalle && `${t('Detalles')}: ${f.detalle}`,
      `${t('Nombre')}: ${f.nombre}`,
      `${t('Teléfono')}: ${f.telefono}`,
      `${t('Correo')}: ${f.email}`,
    ].filter(Boolean).join('\n');
    setSending(true);
    const r = await sendLead(
      {
        type: 'venta',
        name: f.nombre,
        phone: f.telefono,
        email: f.email,
        website: trap,
        lang: getLang(),
        fields: [
          ['Quiere', f.operacion],
          ['Tipo de propiedad', f.tipo],
          ['Sector / ciudad', f.zona],
          ['Precio esperado', f.precio],
          ['Detalles', f.detalle],
        ],
      },
      text
    );
    setLastText(text);
    setResult(r);
    setSending(false);
  };

  return (
    <>
      <PageHeader
        eyebrow={t('Propietarios')}
        title={t('Vende o alquila tu propiedad con nosotros')}
        lead={t('Ponemos tu propiedad frente a los compradores correctos, con una presentación profesional y un acompañamiento seguro de principio a fin.')}
        crumbs={[{ label: t('Vende con nosotros') }]}
      />

      <section className="section sell">
        <div className="container sell__grid">
          <div>
            <motion.ul className="benefits" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              {BENEFITS.map(({ icon: Icon, title, text }) => (
                <motion.li key={title} variants={item} whileHover={{ y: -6 }}>
                  <span className="benefits__icon"><Icon size={22} strokeWidth={1.6} /></span>
                  <strong>{t(title)}</strong>
                  <p>{t(text)}</p>
                </motion.li>
              ))}
            </motion.ul>

            <div className="steps">
              <p className="eyebrow">{t('Cómo funciona')}</p>
              <RevealText tag="h2" className="h2">{t('Cinco pasos, cero complicaciones')}</RevealText>
              <ol>
                {STEPS.map((s, i) => (
                  <motion.li key={s} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6 }}>
                    <span>{String(i + 1).padStart(2, '0')}</span> {t(s)}
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>

          {result ? (
            <motion.div className="sell__form" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
              <LeadDone result={result} name={f.nombre} email={f.email} whatsappText={lastText} onAgain={() => setResult(null)} againLabel={t('Enviar otra propiedad')} />
            </motion.div>
          ) : (
            <motion.form className="sell__form" onSubmit={submit} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: EASINGS.premium }}>
              <span className="sell__form-icon"><FileCheck2 size={22} /></span>
              <h2>{t('Cuéntanos sobre tu propiedad')}</h2>
              <p>{t('Te contactamos en menos de 24 horas.')}</p>
              <div className="form-row">
                <label>{t('Quiero')}
                  <select className="select" value={f.operacion} onChange={set('operacion')}>
                    <option value="Vender">{t('Vender')}</option>
                    <option value="Alquilar">{t('Alquilar')}</option>
                  </select>
                </label>
                <label>{t('Tipo')}
                  <select className="select" value={f.tipo} onChange={set('tipo')}>
                    {['Casa', 'Apartamento', 'Penthouse', 'Villa', 'Solar', 'Local comercial'].map((k) => <option key={k} value={k}>{t(k)}</option>)}
                  </select>
                </label>
              </div>
              <label>{t('Sector / ciudad')}<input className="input" required placeholder={t('Ej. Prado Oriental, Santo Domingo Este')} value={f.zona} onChange={set('zona')} /></label>
              <label>{t('Precio esperado (opcional)')}<input className="input" placeholder={t('Ej. US$ 180,000')} value={f.precio} onChange={set('precio')} /></label>
              <label>{t('Detalles (opcional)')}<textarea className="input" rows={3} placeholder={t('Habitaciones, metros, parqueos…')} value={f.detalle} onChange={set('detalle')} /></label>
              <div className="form-row">
                <label>{t('Nombre')}<input className="input" required value={f.nombre} onChange={set('nombre')} autoComplete="name" /></label>
                <label>{t('Teléfono')}<input className="input" required type="tel" value={f.telefono} onChange={set('telefono')} autoComplete="tel" /></label>
              </div>
              <label>{t('Correo electrónico')}<input className="input" required type="email" value={f.email} onChange={set('email')} autoComplete="email" /></label>
              <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden value={trap} onChange={(e) => setTrap(e.target.value)} name="website" />
              <button type="submit" className="btn-submit" disabled={sending}><span>{sending ? t('Enviando…') : t('Enviar información')}</span> <ArrowRight size={16} /></button>
            </motion.form>
          )}
        </div>
      </section>
    </>
  );
}
