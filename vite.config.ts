import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { PROPERTIES } from './src/data/properties';
import { SITE_URL } from './src/data/site';

/** Pages Google should index. Favorites and the cursor preview are per-visitor tools, so they stay out. */
const STATIC_ROUTES: { path: string; priority: string; freq: string }[] = [
  { path: '/', priority: '1.0', freq: 'weekly' },
  { path: '/propiedades', priority: '0.9', freq: 'daily' },
  { path: '/equipo', priority: '0.6', freq: 'monthly' },
  { path: '/vende-con-nosotros', priority: '0.6', freq: 'monthly' },
  { path: '/privacidad', priority: '0.2', freq: 'yearly' },
  { path: '/terminos', priority: '0.2', freq: 'yearly' },
];

/** Emits sitemap.xml and robots.txt at build time from the listings data. */
function seoFiles(): Plugin {
  return {
    name: 'mh-seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const url = (path: string, priority: string, freq: string, image?: string) =>
        [
          '  <url>',
          `    <loc>${SITE_URL}${path}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <changefreq>${freq}</changefreq>`,
          `    <priority>${priority}</priority>`,
          image ? `    <image:image><image:loc>${SITE_URL}${image}</image:loc></image:image>` : '',
          '  </url>',
        ].filter(Boolean).join('\n');

      const entries = [
        ...STATIC_ROUTES.map((r) => url(r.path, r.priority, r.freq)),
        ...PROPERTIES.map((p) => url(`/propiedades/${p.slug}`, '0.8', 'weekly', `/props/${p.slug}/01.webp`)),
      ];

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *
Allow: /
Disallow: /favoritos
Disallow: /casita

Sitemap: ${SITE_URL}/sitemap.xml
`,
      });
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), seoFiles()],
});
