# Martínez Home RD — Sitio web

Sitio web de **Martínez Home Inmobiliaria** (Lic. Vanessa Martínez, CEO) — Santo Domingo Este, RD.

**Stack:** React 18 + TypeScript + Vite + Framer Motion + React Router + Leaflet (OpenStreetMap).

## Páginas
| Ruta | Contenido |
|---|---|
| `/` | Home: hero con buscador, destacadas, servicios, calculadora rápida, fundadora, equipo, reels y contacto |
| `/propiedades` | Catálogo con filtros (operación, tipo, estado, ciudad, sector, presupuesto, habitaciones), orden, vista de cuadrícula o mapa |
| `/propiedades/:slug` | Ficha: galería con visor, características, unidades, plan de pago, mapa, asesor, cuota estimada, similares |
| `/equipo` | Equipo de trabajo con contacto directo |
| `/calculadora` | Préstamo hipotecario, plan de pago en planos y "¿Cuánto puedo comprar?" |
| `/vende-con-nosotros` | Captación de propietarios |
| `/favoritos` | Favoritos guardados y comparador (hasta 3) |

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

## Despliegue
Es una SPA con rutas reales: el servidor debe redirigir todas las rutas a `index.html`.
`vercel.json` (Vercel) y `public/_redirects` (Netlify) ya lo configuran.
