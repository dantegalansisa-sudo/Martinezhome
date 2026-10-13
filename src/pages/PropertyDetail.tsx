import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Bath, BedDouble, CalendarCheck, Car, Check, ChevronRight, LandPlot, MapPin, Maximize, Phone } from 'lucide-react';
import Gallery from '../components/Gallery';
import PropertyMap from '../components/PropertyMap';
import PropertyCard, { FavoriteButton } from '../components/PropertyCard';
import CurrencySwitch from '../components/CurrencySwitch';
import RevealText from '../components/RevealText';
import { WhatsAppIcon } from '../components/BrandIcons';
import { PROPERTIES, statusLabel, type Property } from '../data/properties';
import { member, telHref, waHref } from '../data/team';
import { waLink } from '../data/site';
import { formatPrice, useStore } from '../store';
import { EASINGS } from '../easings';
import { useTitle } from '../useTitle';
import NotFound from './NotFound';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: EASINGS.smooth },
});

/** Same zone first, then same kind, excluding the current listing. */
const similar = (p: Property) =>
  PROPERTIES.filter((x) => x.id !== p.id)
    .map((x) => ({ x, score: (x.zone === p.zone ? 2 : 0) + (x.kind === p.kind ? 1 : 0) + (x.city === p.city ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.x);

export default function PropertyDetail() {
  const { slug } = useParams();
  const p = PROPERTIES.find((x) => x.slug === slug);
  const { currency, openVisit } = useStore();
  useTitle(p?.title ?? 'Propiedad no encontrada');
  if (!p) return <NotFound />;

  const agent = member(p.agent);
  const status = statusLabel(p);
  const specs = [
    { icon: BedDouble, label: 'Habitaciones', value: p.beds },
    { icon: Bath, label: 'Baños', value: p.baths },
    { icon: Maximize, label: 'Construcción', value: p.area },
    { icon: LandPlot, label: 'Solar', value: p.lot },
    { icon: Car, label: 'Parqueos', value: p.parking },
  ].filter((s) => s.value);

  return (
    <article className="detail">
      <div className="container">
        <motion.nav className="crumbs crumbs--detail" aria-label="Ruta" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link to="/">Inicio</Link>
          <ChevronRight size={13} />
          <Link to="/propiedades">Propiedades</Link>
          <ChevronRight size={13} />
          <span aria-current="page">{p.zone}</span>
        </motion.nav>

        <div className="detail__head">
          <div>
            <motion.div className="detail__chips" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <span className="chip-tag chip-tag--dark">{p.operation === 'venta' ? 'En venta' : 'En alquiler'}</span>
              <span className="chip-tag">{p.kind}</span>
              {status && <span className="chip-tag chip-tag--accent">{status}</span>}
              {p.tags.map((t) => <span key={t} className="chip-tag">{t}</span>)}
            </motion.div>
            <RevealText tag="h1" className="detail__title" delay={0.15} immediate>{p.title}</RevealText>
            <motion.p className="detail__loc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <MapPin size={16} /> {p.zone}, {p.city}
            </motion.p>
          </div>
          <motion.div className="detail__price" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <small>{p.price?.from ? 'Precios' : 'Precio'}</small>
            <strong className={p.price ? '' : 'is-ask'}>{formatPrice(p.price, currency)}</strong>
            {p.price?.to && <span>hasta {formatPrice({ ...p.price, amount: p.price.to, from: false }, currency)}</span>}
            <div className="detail__price-tools">
              <CurrencySwitch id="detail" />
              <FavoriteButton id={p.id} className="detail__fav" />
            </div>
          </motion.div>
        </div>

        <Gallery p={p} />

        <div className="detail__grid">
          <div className="detail__main">
            {specs.length > 0 && (
              <motion.ul className="specs" {...fade()}>
                {specs.map(({ icon: Icon, label, value }) => (
                  <li key={label}>
                    <Icon size={20} strokeWidth={1.5} />
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            <motion.section className="detail__block" {...fade()}>
              <h2 className="detail__h2">Sobre la propiedad</h2>
              <p className="detail__desc">{p.description}</p>
              <ul className="highlights">
                {p.highlights.map((h) => <li key={h}><Check size={15} /> {h}</li>)}
              </ul>
            </motion.section>

            {p.units && (
              <motion.section className="detail__block" {...fade()}>
                <h2 className="detail__h2">Unidades disponibles</h2>
                <div className="units">
                  {p.units.map((u) => (
                    <div key={u.name} className="unit">
                      <div>
                        <strong>{u.name}</strong>
                        {u.area && <span>{u.area}</span>}
                        {u.detail && <small>{u.detail}</small>}
                      </div>
                      {u.price && <b>{formatPrice(u.price, currency)}</b>}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            <motion.section className="detail__block" {...fade()}>
              <h2 className="detail__h2">Características</h2>
              <div className="features">
                {p.sections.map((s) => (
                  <div key={s.title} className="features__group">
                    <h3>{s.title}</h3>
                    <ul>
                      {s.items.map((i) => <li key={i}>{i}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>

            {p.payment && (
              <motion.section className="detail__block" {...fade()}>
                <h2 className="detail__h2">Plan de pago</h2>
                {p.delivery && <p className="detail__delivery"><CalendarCheck size={16} /> Entrega estimada: <strong>{p.delivery}</strong></p>}
                <ol className="timeline">
                  {p.payment.map((s, i) => (
                    <motion.li key={s.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <span className="timeline__dot">{i + 1}</span>
                      <div>
                        <strong>{s.label}</strong>
                        <span>{s.value}</span>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </motion.section>
            )}

            <motion.section className="detail__block" {...fade()}>
              <h2 className="detail__h2">Ubicación</h2>
              <p className="detail__desc">{p.zone}, {p.city}. La ubicación exacta se comparte al agendar la visita.</p>
              <PropertyMap properties={[p]} single height={340} />
            </motion.section>
          </div>

          <aside className="detail__aside">
            <motion.div className="side-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, ease: EASINGS.smooth }}>
              {agent && (
                <div className="agent">
                  <span className={`agent__avatar${agent.fullBody ? ' is-full' : ''}`}><img src={agent.photo} alt={agent.name} /></span>
                  <div>
                    <small>Tu asesor</small>
                    <strong>{agent.name}</strong>
                    <span>{agent.role}</span>
                  </div>
                </div>
              )}
              <button className="btn-submit" onClick={() => openVisit(p)}>
                <span>Agendar visita</span> <CalendarCheck size={16} />
              </button>
              <a className="btn-wa" href={waLink(`Hola, me interesa: ${p.title} (${p.zone}). ¿Me pueden dar más información?`)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={17} /> Escribir por WhatsApp
              </a>
              {agent?.phone && (
                <div className="agent__lines">
                  <a href={telHref(agent.phone)}><Phone size={14} /> {agent.phone}</a>
                  <a href={waHref(agent.phone, `Hola ${agent.name}, me interesa: ${p.title}.`)} target="_blank" rel="noopener noreferrer">WhatsApp del asesor</a>
                </div>
              )}

            </motion.div>
          </aside>
        </div>
      </div>

      <section className="section similar">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">También te puede interesar</p>
              <RevealText tag="h2" className="h2">Propiedades similares</RevealText>
            </div>
            <Link to="/propiedades" className="link-arrow">Ver todas <ArrowRight size={16} /></Link>
          </div>
          <motion.div className="catalog__cards catalog__cards--3" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            {similar(p).map((x) => <PropertyCard key={x.id} p={x} />)}
          </motion.div>
        </div>
      </section>

      <div className="mobile-bar">
        <div>
          <small>{p.zone}</small>
          <strong>{formatPrice(p.price, currency, true)}</strong>
        </div>
        <button className="btn-submit" onClick={() => openVisit(p)}><span>Agendar visita</span></button>
      </div>
    </article>
  );
}
