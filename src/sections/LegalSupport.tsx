import { motion } from 'framer-motion';
import { ArrowRight, FileCheck2, FileSignature, Landmark, ScanSearch, Scale } from 'lucide-react';
import RevealText from '../components/RevealText';
import { waLink } from '../data/site';
import { EASINGS } from '../easings';
import { t } from '../i18n';

const STEPS = [
  { icon: ScanSearch, title: 'Revisión de títulos', text: 'Verificamos el certificado de título y la situación jurídica del inmueble antes de que reserves.' },
  { icon: FileSignature, title: 'Contratos claros', text: 'Redactamos y revisamos promesas de compraventa y contratos de alquiler que protegen tus intereses.' },
  { icon: FileCheck2, title: 'Debida diligencia', text: 'Confirmamos que no existan cargas ni gravámenes y que los impuestos estén al día.' },
  { icon: Landmark, title: 'Cierre y traspaso', text: 'Te acompañamos en la firma y el traspaso hasta que la propiedad quede a tu nombre.' },
];

/** The CEO is a lawyer: legal advice comes with every transaction, not as an outsourced extra. */
export default function LegalSupport() {
  return (
    <section className="section legal-band" id="asesoria-legal">
      <div className="container legal-band__grid">
        <div className="legal-band__intro">
          <p className="eyebrow eyebrow--light"><Scale size={14} /> {t('Respaldo legal')}</p>
          <RevealText tag="h2" className="h2">{t('Una inmobiliaria\ncon abogada al frente')}</RevealText>
          <motion.p
            className="legal-band__lead"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASINGS.smooth }}
          >
            {t('La Lic. Vanessa Martínez es abogada. Por eso, en Martínez Home la asesoría legal no es un servicio aparte: va de la mano con cada compra, venta o inversión.')}
          </motion.p>
          <p className="legal-band__note">{t('Ideal si vives fuera del país o inviertes por primera vez en República Dominicana.')}</p>
          <a className="btn-light" href={waLink(t('Hola Martínez Home, me gustaría recibir asesoría legal sobre una propiedad.'))} target="_blank" rel="noopener noreferrer">
            {t('Consulta legal por WhatsApp')} <span className="btn-light__icon"><ArrowRight size={15} /></span>
          </a>
        </div>

        <motion.ol
          className="legal-band__steps"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASINGS.premium } },
              }}
            >
              <span className="legal-band__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="legal-band__icon"><Icon size={22} strokeWidth={1.6} /></span>
              <strong>{t(title)}</strong>
              <p>{t(text)}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
