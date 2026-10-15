import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bath, BedDouble, Heart, MapPin, Maximize } from 'lucide-react';
import { autoTags, img, type Property } from '../data/properties';
import { formatPrice, useStore } from '../store';
import { EASINGS } from '../easings';
import { localize } from '../data/localize';
import { t } from '../i18n';

export const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: EASINGS.premium } },
};

export function FavoriteButton({ id, className = '' }: { id: number; className?: string }) {
  const { isFavorite, toggleFavorite } = useStore();
  const on = isFavorite(id);
  return (
    <motion.button
      className={`fav-btn${on ? ' is-on' : ''} ${className}`}
      aria-label={on ? t('Quitar de favoritos') : t('Guardar en favoritos')}
      aria-pressed={on}
      whileTap={{ scale: 0.8 }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
    >
      <motion.span key={String(on)} initial={{ scale: on ? 0.4 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
        <Heart size={18} />
      </motion.span>
    </motion.button>
  );
}

/** `inView` makes the card reveal itself when scrolled to (used in long grids, where a parent stagger would fire too early). */
export default function PropertyCard({ p: src, variants = true, inView = false }: { p: Property; variants?: boolean; inView?: boolean }) {
  const { currency } = useStore();
  const p = localize(src);
  const tags = autoTags(p);
  return (
    <motion.article
      className={`prop${p.sold ? ' prop--sold' : ''}`}
      variants={variants || inView ? cardVariants : undefined}
      {...(inView ? { initial: 'hidden', whileInView: 'visible', viewport: { once: true, amount: 0.2 } } : {})}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      <Link to={`/propiedades/${p.slug}`} className="prop__link" aria-label={p.title}>
        <div className="prop__media">
          <img src={img(p, 1, 'sm')} alt={p.title} loading="lazy" style={p.coverFocus ? { objectPosition: p.coverFocus } : undefined} />
          <span className={`prop__badge prop__badge--${p.operation}`}>{p.operation === 'venta' ? t('Venta') : t('Alquiler')}</span>
          {p.sold && <span className="prop__sold">{t('Vendida')}</span>}
          {!p.sold && tags.length > 0 && (
            <span className="prop__tags">
              {tags.map((tg) => <span key={tg} className="prop__tag">{tg}</span>)}
            </span>
          )}
          <span className="prop__count">{t('{n} fotos', { n: p.images })}</span>
        </div>
        <div className="prop__body">
          <p className="prop__loc"><MapPin size={13} /> {p.zone}, {p.city}</p>
          <h3 className="prop__title">{p.title}</h3>
          <p className={`prop__price${p.price ? '' : ' prop__price--ask'}`}>{formatPrice(p.price, currency)}</p>
          <ul className="prop__specs">
            {p.beds && <li><BedDouble size={15} /> {p.beds}</li>}
            {p.baths && <li><Bath size={15} /> {p.baths}</li>}
            {p.area && <li><Maximize size={14} /> {p.area}</li>}
            {!p.beds && !p.baths && !p.area && <li>{t(p.kind)}</li>}
          </ul>
          <span className="prop__cta">{t('Ver propiedad')} <ArrowUpRight size={15} /></span>
        </div>
      </Link>
      <FavoriteButton id={p.id} className="prop__fav" />
    </motion.article>
  );
}
