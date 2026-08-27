# Maisha Quest

Web prémium de **Maisha Quest**, operador de safaris privados con sede en
Arusha, Tanzania.

> Private journeys through Tanzania.
> Guided by local experts. Designed around your story.

Proyecto independiente dentro de este repositorio, como `amigos-del-norte/`.
No comparte código ni despliegue con la landing de NovaCore de la raíz.

## Ejecutar

```bash
cd maisha-quest
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build && npm run start   # producción
npm run lint                     # ESLint
npm run typecheck                # TypeScript
```

Requiere Node 20 o superior. Sin variables de entorno la web funciona entera;
solo el envío del formulario queda desactivado a propósito (ver más abajo).

## Stack

Next.js 16 (App Router) · React 19 · TypeScript estricto · Tailwind CSS 4.

Sin librería de animación, sin proveedor de mapas, sin librería de iconos y sin
gestor de estado. Todo eso está resuelto con CSS, SVG y componentes de
servidor: solo tres componentes envían JavaScript al navegador (el mapa, el
carrusel y el planificador).

## Estructura

```
src/
  app/             Rutas (App Router) + sitemap, robots y el endpoint del formulario
  components/
    home/          Las trece secciones de la portada
    layout/        Cabecera, menú móvil, pie, barra de acción y cabecera interior
    safari/        Tarjeta, itinerario y mapa de ruta — reutilizados en varias páginas
    planner/       Planificador por pasos
    ui/            Primitivas: botón, contenedor, brújula, foto, carrusel, vídeo
    seo/           Datos estructurados schema.org
  data/            ÚNICA FUENTE DE CONTENIDO
  lib/             Acceso a datos, configuración del sitio, mapa y planificador
  types/           Modelos TypeScript
```

### La fuente única de datos

Ningún componente escribe a mano el nombre de un safari, una duración o una
ruta: todo sale de `src/data/*` a través de `src/lib/content.ts`. Esa capa es
`async` desde el principio para que conectar Supabase o un CMS solo suponga
cambiar el cuerpo de sus funciones, sin tocar un componente.

`content.ts` valida además la coherencia **en tiempo de compilación**: si un
safari declara siete días y trae un itinerario de seis, o apunta a un destino
que no existe, `npm run build` falla. Es la respuesta directa al problema de la
web actual, donde nombres, rutas y duraciones se contradicen entre páginas.

## Qué es real y qué está pendiente

La web no inventa nada sobre el negocio. Lo verificable se publica; lo demás
espera, y se nota que espera.

**Real:** teléfono, email, horario, zona horaria, sede, redes sociales, los
nombres y los idiomas del equipo, la geografía de Tanzania (parques,
coordenadas, temporadas y fauna) y la silueta del mapa (Natural Earth).

**Pendiente, y marcado como tal en el código:**

| Qué falta | Dónde se rellena |
| --- | --- |
| Precios reales | `price` en `src/data/safaris.ts`. Sin ellos la ficha dice "Price on request", nunca una cifra. |
| Itinerarios validados | Los siete safaris llevan `draft: true`; la interfaz muestra el sello "Sample itinerary" y desaparece solo al quitar la marca. |
| Testimonios | `src/data/testimonials.ts` está vacío **a propósito**. La sección detecta el vacío y muestra un estado alternativo honesto. |
| Cifras de impacto | `outcomes` vacío en cada proyecto de `src/data/impact.ts`. |
| Licencias y acreditaciones | `TRUST_CREDENTIALS` en `src/lib/site.ts`. La franja no se pinta si está vacío. |
| Fotografía propia | Ver `public/images/CREDITS.md`. Toda la actual es provisional. |
| Los dos vídeos | Ver `public/video/README.md`. **Uno tiene una condición de consentimiento previa.** |
| Textos legales | `src/components/legal/LegalPage.tsx` — esqueleto, pendiente de revisión jurídica. |
| Traducciones | Solo hay inglés. El selector lista los otros cinco idiomas desactivados en lugar de llevar a texto sin traducir. |

## El formulario no finge

`/api/journey-requests` responde **501** mientras no exista
`JOURNEY_REQUEST_WEBHOOK` (ver `.env.example`), y la interfaz lo dice: informa
de que la solicitud no se ha enviado y ofrece mandar el mismo resumen por email
o WhatsApp, ya redactado. Devolver un "gracias, te contactaremos" sin haber
entregado nada es el peor fallo posible en un formulario comercial.

El planificador guarda un borrador en `localStorage` en cada cambio, valida al
avanzar (no al teclear), mueve el foco al título de cada paso y filtra spam con
campo trampa y tiempo de cumplimentación, sin CAPTCHA.

## Rendimiento y accesibilidad

- Todas las secciones son componentes de servidor salvo las tres que necesitan
  estado.
- El revelado al hacer scroll es un `data-attribute` más un
  IntersectionObserver de quince líneas en el `<head>`. El HTML sale **visible**
  del servidor: la animación es un añadido, nunca un requisito para ver el
  contenido.
- Imágenes en WebP con `srcset`, `sizes` y un LQIP en base64 por imagen.
- Vídeo con carga diferida, póster, sin sonido, `playsInline` y reproducción
  solo mientras está en pantalla.
- `prefers-reduced-motion` desactiva todo el movimiento, incluido el revelado.
- HTML semántico, un solo `h1` por página, jerarquía de encabezados sin saltos,
  foco visible, áreas táctiles de 44 px, menú móvil con trampa de foco y
  `<details>` nativo para itinerarios y FAQ.

## Despliegue

Pensado para Vercel con **Root Directory = `maisha-quest`**, igual que
`amigos-del-norte` es un proyecto aparte. Añadir `JOURNEY_REQUEST_WEBHOOK` en
las variables de entorno para activar el formulario.
