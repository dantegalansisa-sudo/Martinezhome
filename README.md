# Martínez Home RD — Sitio web

Sitio web de **Martínez Home Inmobiliaria** (Lic. Vanessa Martínez, CEO) — Santo Domingo Este, RD.

**Stack:** React 18 + TypeScript + Vite + Framer Motion + React Router + Leaflet (OpenStreetMap).

## Páginas
| Ruta | Contenido |
|---|---|
| `/` | Home: hero con buscador, destacadas, servicios, fundadora, equipo, reels y formulario de contacto en 2 pasos |
| `/propiedades` | Catálogo con filtros (operación, tipo, estado, ciudad, sector, presupuesto, habitaciones), orden, vista de cuadrícula o mapa |
| `/propiedades/:slug` | Ficha: galería con visor (carrusel en móvil), características, unidades, plan de pago, mapa, asesor, similares |
| `/equipo` | Equipo de trabajo con contacto directo |
| `/vende-con-nosotros` | Captación de propietarios |
| `/favoritos` | Favoritos guardados y comparador (hasta 3) |
| `/privacidad` | Política de privacidad (Ley 172-13) |
| `/terminos` | Términos y condiciones |

En móvil: hero a pantalla completa, carrusel centrado de propiedades, equipo con scroll horizontal fijado y videos apilados.

Extras: selector de moneda (original / US$ / RD$), agendador de visitas por WhatsApp, etiquetas automáticas.

## Datos
- Propiedades: `src/data/properties.ts` — fotos en `public/props/<slug>/` (`01.webp` grande, `01-sm.webp` miniatura).
- Equipo: `src/data/team.ts` — fotos en `public/team/`.
- Contacto y tasa de cambio referencial: `src/data/site.ts`.

## Desarrollo
```bash
npm install
npm run dev
npm run build   # salida en dist/
```

## Formularios y correos
- Contacto, agendar visita y vende con nosotros envían a `/api/lead` (función de Vercel en `api/lead.js`).
- Con Resend activo se mandan dos correos: aviso a la empresa (`LEADS_TO`, por defecto el correo de Vanessa) y confirmación al cliente (las visitas incluyen archivo .ics para el calendario).
- Mientras no exista `RESEND_API_KEY`, los formularios abren WhatsApp con la solicitud, para no perder ningún cliente.
- Variables en Vercel: `RESEND_API_KEY` (obligatoria), `LEADS_TO`, `RESEND_FROM` (p. ej. `Martínez Home <notificaciones@martinezhomerd.com>` cuando el dominio esté verificado en Resend).

## SEO
- `sitemap.xml` y `robots.txt` se generan en cada `npm run build` (plugin en `vite.config.ts`) a partir de `src/data/properties.ts`.
- Cada página define título, descripción, canónico y Open Graph con `useSeo` (`src/useTitle.ts`). Datos estructurados `RealEstateAgent` en `index.html`.
- Dominio canónico: `SITE_URL` en `src/data/site.ts` (https://www.martinezhomerd.com).

## Despliegue
Es una SPA con rutas reales: el servidor debe redirigir todas las rutas a `index.html`.
`vercel.json` (Vercel) y `public/_redirects` (Netlify) ya lo configuran.
