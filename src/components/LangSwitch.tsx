import { motion } from 'framer-motion';
import { useLang, type Lang } from '../i18n';

const LANGS: { id: Lang; label: string; name: string }[] = [
  { id: 'es', label: 'ES', name: 'Español' },
  { id: 'en', label: 'EN', name: 'English' },
];

export default function LangSwitch({ id = 'nav' }: { id?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className="lang" role="radiogroup" aria-label="Idioma / Language">
      {LANGS.map((l) => (
        <button key={l.id} role="radio" aria-checked={lang === l.id} aria-label={l.name} className={`lang__btn${lang === l.id ? ' is-on' : ''}`} onClick={() => setLang(l.id)}>
          {lang === l.id && <motion.span layoutId={`lang-${id}`} className="lang__pill" transition={{ type: 'spring', stiffness: 420, damping: 32 }} />}
          <span>{l.label}</span>
        </button>
      ))}
    </div>
  );
}
