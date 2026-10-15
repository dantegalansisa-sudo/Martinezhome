import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import RevealText from './RevealText';
import { EASINGS } from '../easings';
import { t } from '../i18n';

interface Props {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs?: { label: string; to?: string }[];
  children?: ReactNode;
}

export default function PageHeader({ eyebrow, title, lead, crumbs = [], children }: Props) {
  return (
    <header className="page-head">
      <div className="page-head__glow" aria-hidden />
      <div className="container">
        <motion.nav className="crumbs" aria-label={t('Ruta')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <Link to="/">{t('Inicio')}</Link>
          {crumbs.map((c) => (
            <span key={c.label}>
              <ChevronRight size={13} />
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </span>
          ))}
        </motion.nav>
        <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: EASINGS.smooth }}>
          {eyebrow}
        </motion.p>
        <RevealText tag="h1" className="page-head__title" delay={0.2} immediate>{title}</RevealText>
        {lead && (
          <motion.p className="page-head__lead" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease: EASINGS.smooth }}>
            {lead}
          </motion.p>
        )}
        {children}
      </div>
    </header>
  );
}
