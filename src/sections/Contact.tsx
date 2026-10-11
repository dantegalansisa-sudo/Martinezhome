import { useState, type FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Mail, MessageSquare, Phone, User } from 'lucide-react';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import { waLink } from '../data';
import { EASINGS } from '../easings';

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = [
      'Hola Martínez Home, quiero información sobre una propiedad.',
      `Nombre: ${form.name}`,
      form.email && `Correo: ${form.email}`,
      form.phone && `Teléfono: ${form.phone}`,
      form.message && `Mensaje: ${form.message}`,
    ].filter(Boolean).join('\n');
    window.open(waLink(text), '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section className="contact" id="contacto" ref={ref}>
      <motion.div className="contact__bg" style={{ y }}>
        <img src="./images/cta-atardecer.webp" alt="" loading="lazy" />
      </motion.div>
      <div className="contact__veil" />
      <div className="container contact__grid">
        <div className="contact__text">
          <p className="eyebrow eyebrow--light">Hablemos de tu próxima propiedad</p>
          <RevealText tag="h2" className="h2 h2--light">{'¿Listo para dar\nel siguiente paso?'}</RevealText>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
            Completa el formulario y te contactaremos para asesorarte de manera personalizada.
          </motion.p>
        </div>

        <motion.form
          className="contact__form"
          onSubmit={submit}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASINGS.premium }}
        >
          <label className="field"><User size={16} /><input required placeholder="Nombre completo" value={form.name} onChange={set('name')} autoComplete="name" /></label>
          <label className="field"><Mail size={16} /><input type="email" placeholder="Correo electrónico" value={form.email} onChange={set('email')} autoComplete="email" /></label>
          <label className="field"><Phone size={16} /><input type="tel" required placeholder="Teléfono" value={form.phone} onChange={set('phone')} autoComplete="tel" /></label>
          <label className="field field--area"><MessageSquare size={16} /><textarea rows={3} placeholder="Mensaje (opcional)" value={form.message} onChange={set('message')} /></label>
          <MagneticButton type="submit" className="btn-submit" strength={0.15}>
            <span>{sent ? '¡Gracias! Te escribimos pronto' : 'Enviar mensaje'}</span> <ArrowRight size={16} />
          </MagneticButton>
        </motion.form>
      </div>
    </section>
  );
}
