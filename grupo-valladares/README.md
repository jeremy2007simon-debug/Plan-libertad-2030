# Grupo Valladares

Propuesta conceptual de rediseño digital para una empresa de distribución de
recambios y suministros de automoción — realizada por **NovaCore**.

Este proyecto es un ejercicio de diseño: ninguno de los datos corporativos
(dirección, teléfono, horario, marcas distribuidas...) es real. Todo lo que
aparece entre `[corchetes]` es un marcador a sustituir por el dato
definitivo antes de publicar la web.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion
- lucide-react

## Estructura

```
src/app/                 Rutas (home, privacidad, sitemap, robots, API)
src/components/          Secciones de la página y componentes de UI
src/lib/constants.ts     Datos de la empresa, servicios y tiendas (con marcadores)
src/lib/roadmap.ts       Arquitectura tipada de las futuras fases de la plataforma
src/lib/quotes.ts        Punto único de entrada para procesar solicitudes de presupuesto
```

## Desarrollo local

```bash
npm install
npm run dev
```

## Personalización antes de publicar

- Sustituir los marcadores de `src/lib/constants.ts` (teléfono, email, horario, tiendas).
- Añadir los logotipos reales de marcas en la sección `Marcas`.
- Completar `src/app/privacidad/page.tsx` con la política de privacidad definitiva.
- Conectar `src/lib/quotes.ts` con el canal real de gestión de presupuestos.
