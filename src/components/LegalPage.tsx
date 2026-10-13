import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Printer } from 'lucide-react';
import PageHeader from './PageHeader';
import { CONTACT, waLink } from '../data/site';
import { EASINGS } from '../easings';

export interface LegalSection {
  id: string;
  title: string;
  body: ReactNode;
}

interface Props {
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
  other: { prefix: string; label: string; to: string };
}

export default function LegalPage({ eyebrow, title, lead, updated, sections, other }: Props) {
  const [active, setActive] = useState(sections[0]?.id);

  // Highlight the section currently being read in the index.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -65% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} crumbs={[{ label: title }]}>
        <p className="legal__updated">Última actualización: {updated}</p>
      </PageHeader>

      <section className="legal">
        <div className="container legal__grid">
          <aside className="legal__toc" aria-label="Contenido">
            <p className="filters__label">Contenido</p>
            <ol>
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className={active === s.id ? 'is-on' : ''}>
                    <span>{String(i + 1).padStart(2, '0')}</span> {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <button className="legal__print" onClick={() => window.print()}><Printer size={14} /> Imprimir</button>
          </aside>

          <article className="legal__body">
            {sections.map((s, i) => (
              <motion.section
                key={s.id}
                id={s.id}
                className="legal__section"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: EASINGS.smooth }}
              >
                <h2><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</h2>
                {s.body}
              </motion.section>
            ))}

            <div className="legal__contact">
              <div>
                <strong>¿Tienes preguntas sobre este documento?</strong>
                <p>Escríbenos al {CONTACT.phone} o visítanos en {CONTACT.address}.</p>
              </div>
              <a className="btn-dark" href={waLink(`Hola Martínez Home, tengo una consulta sobre: ${title}.`)} target="_blank" rel="noopener noreferrer">
                Escríbenos <span className="btn-dark__icon"><ArrowRight size={15} /></span>
              </a>
            </div>
            <p className="legal__other">
              Consulta también {other.prefix} <Link to={other.to}>{other.label}</Link>.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
