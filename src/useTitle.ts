import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from './data/site';

const BASE = 'Martínez Home RD';
const DEFAULT_DESC =
  'Martínez Home Inmobiliaria: compra, venta e inversión de casas, apartamentos y proyectos en Santo Domingo Este, Punta Cana y toda República Dominicana. Asesoría de la Lic. Vanessa Martínez.';
const DEFAULT_IMAGE = '/images/hero.webp';

interface Seo {
  title?: string;
  description?: string;
  /** Absolute or root-relative image for social previews */
  image?: string;
  /** Keep per-visitor or utility pages out of search results */
  noindex?: boolean;
}

const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = value;
};

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
};

/** Title, description, canonical URL and Open Graph tags for the current route. */
export function useSeo({ title, description = DEFAULT_DESC, image = DEFAULT_IMAGE, noindex }: Seo = {}) {
  const { pathname } = useLocation();
  useEffect(() => {
    const full = title ? `${title} | ${BASE}` : `${BASE} | Inmobiliaria en Santo Domingo Este`;
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
    const img = image.startsWith('http') ? image : `${SITE_URL}${image}`;
    document.title = full;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', full);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', img);
    setMeta('name', 'twitter:title', full);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);
    setCanonical(url);
  }, [title, description, image, noindex, pathname]);
}

/** Shorthand kept for pages that only need a title. */
export const useTitle = (title?: string) => useSeo({ title });
