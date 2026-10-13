import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bath, BedDouble, Heart, MapPin, Maximize } from 'lucide-react';
import { autoTags, img, type Property } from '../data/properties';
import { formatPrice, useStore } from '../store';
import { EASINGS } from '../easings';

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
      aria-label={on ? 'Quitar de favoritos' : 'Guardar en favoritos'}
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

export default function PropertyCard({ p, variants = true }: { p: Property; variants?: boolean }) {
  const { currency } = useStore();
  const tags = autoTags(p);
  return (
    <motion.article className="prop" variants={variants ? cardVariants : undefined} whileHover={{ y: -8, transition: { duration: 0.25 } }}>
      <Link to={`/propiedades/${p.slug}`} className="prop__link" aria-label={p.title}>
        <div className="prop__media">
          <img src={img(p, 1, 'sm')} alt={p.title} loading="lazy" />
          <span className="prop__badge prop__badge--venta">{p.operation === 'venta' ? 'Venta' : 'Alquiler'}</span>
          {tags.length > 0 && (
            <span className="prop__tags">
              {tags.map((t) => <span key={t} className="prop__tag">{t}</span>)}
            </span>
          )}
          <span className="prop__count">{p.images} fotos</span>
        </div>
        <div className="prop__body">
          <p className="prop__loc"><MapPin size={13} /> {p.zone}, {p.city}</p>
          <h3 className="prop__title">{p.title}</h3>
          <p className={`prop__price${p.price ? '' : ' prop__price--ask'}`}>{formatPrice(p.price, currency)}</p>
          <ul className="prop__specs">
            {p.beds && <li><BedDouble size={15} /> {p.beds}</li>}
            {p.baths && <li><Bath size={15} /> {p.baths}</li>}
            {p.area && <li><Maximize size={14} /> {p.area}</li>}
            {!p.beds && !p.baths && !p.area && <li>{p.kind}</li>}
          </ul>
          <span className="prop__cta">Ver propiedad <ArrowUpRight size={15} /></span>
        </div>
      </Link>
      <FavoriteButton id={p.id} className="prop__fav" />
    </motion.article>
  );
}
