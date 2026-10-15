import { motion } from 'framer-motion';
import { useStore, type CurrencyMode } from '../store';
import { t } from '../i18n';

const OPTIONS: { value: CurrencyMode; label: string }[] = [
  { value: 'original', label: 'Original' },
  { value: 'USD', label: 'US$' },
  { value: 'DOP', label: 'RD$' },
];

export default function CurrencySwitch({ id = 'cur' }: { id?: string }) {
  const { currency, setCurrency } = useStore();
  return (
    <div className="seg" role="radiogroup" aria-label={t('Moneda')}>
      {OPTIONS.map((o) => (
        <button key={o.value} role="radio" aria-checked={currency === o.value} className={`seg__btn${currency === o.value ? ' is-on' : ''}`} onClick={() => setCurrency(o.value)}>
          {currency === o.value && <motion.span layoutId={`seg-${id}`} className="seg__pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
          <span>{t(o.label)}</span>
        </button>
      ))}
    </div>
  );
}
