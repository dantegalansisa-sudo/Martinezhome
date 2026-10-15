import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { img, type Property } from '../data/properties';
import { formatPrice, useStore } from '../store';
import { t } from '../i18n';
import { localize } from '../data/localize';

interface Props {
  properties: Property[];
  /** Single-property mode: shows an approximate-area circle instead of price pins */
  single?: boolean;
  height?: number | string;
}

const TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export default function PropertyMap({ properties, single, height = 560 }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const layer = useRef<L.LayerGroup | null>(null);
  const [active, setActive] = useState<Property | null>(null);
  const { currency } = useStore();

  useEffect(() => {
    if (!el.current || map.current) return;
    map.current = L.map(el.current, { scrollWheelZoom: false, zoomControl: true, attributionControl: true }).setView([18.49, -69.85], 11);
    L.tileLayer(TILES, { attribution: ATTRIBUTION, maxZoom: 19, className: 'map__tiles' }).addTo(map.current);
    layer.current = L.layerGroup().addTo(map.current);
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  useEffect(() => {
    const m = map.current;
    const g = layer.current;
    if (!m || !g) return;
    g.clearLayers();
    if (!properties.length) return;

    if (single) {
      const p = properties[0];
      L.circle(p.coords, { radius: 450, color: '#e1141b', weight: 1.5, fillColor: '#e1141b', fillOpacity: 0.12 }).addTo(g);
      L.marker(p.coords, { icon: L.divIcon({ className: '', html: '<span class="map-dot"></span>', iconSize: [22, 22], iconAnchor: [11, 11] }) }).addTo(g);
      m.setView(p.coords, 14);
      return;
    }

    properties.forEach((p) => {
      const label = p.price ? formatPrice({ ...p.price, from: false }, currency, true) : t('Consultar');
      const marker = L.marker(p.coords, {
        icon: L.divIcon({ className: '', html: `<span class="map-pin">${label}</span>`, iconSize: [0, 0], iconAnchor: [0, 0] }),
        riseOnHover: true,
      });
      marker.on('click', () => setActive(p));
      marker.addTo(g);
    });
    const bounds = L.latLngBounds(properties.map((p) => p.coords));
    m.fitBounds(bounds, { padding: [60, 60], maxZoom: 14 });
  }, [properties, single, currency]);

  return (
    <div className="map" style={{ height }}>
      <div ref={el} className="map__canvas" />
      {!single && (
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.id}
              className="map__card"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <button className="map__close" onClick={() => setActive(null)} aria-label={t('Cerrar')}><X size={16} /></button>
              <img src={img(active, 1, 'sm')} alt="" />
              <div>
                <small>{localize(active).zone}</small>
                <strong>{localize(active).title}</strong>
                <span>{formatPrice(active.price, currency)}</span>
                <Link to={`/propiedades/${active.slug}`}>{t('Ver propiedad')} <ArrowUpRight size={14} /></Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {single && <span className="map__note">{t('Ubicación aproximada')}</span>}
    </div>
  );
}
