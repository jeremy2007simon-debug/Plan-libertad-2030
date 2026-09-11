# Guía para descargar los recursos multimedia desde Wix

Para el cliente. Objetivo: bajar de `maishaquest.com` (Wix) los archivos que
figuran en el inventario del `README.md` ("Inventario de recursos
multimedia pendientes de Wix"), a la máxima calidad disponible, con nombre y
autoría identificables — sin tocar nada de la web en producción.

**Nunca compartas la contraseña de tu cuenta de Wix por ningún canal, ni la
guardes en ningún archivo que me envíes.** Esta guía no la necesita: todo se
hace entrando tú mismo al panel.

## Cómo se descarga, en general

1. Entra en **wix.com → Panel de Wix → tu sitio → Editar sitio** (el editor
   visual), o directamente en **Gestor de medios** desde el panel del sitio.
2. **Gestor de medios** es la biblioteca completa de archivos subidos a tu
   cuenta de Wix — no está organizada en carpetas por página, es una lista
   plana con buscador. Ahí es donde vive el archivo **original**, tal y como
   lo subiste, antes de que Wix lo recorte o comprima para mostrarlo en el
   sitio.
3. Para descargar a máxima calidad: en el Gestor de medios, selecciona el
   archivo → botón **Descargar** (icono de flecha hacia abajo) → se descarga
   el archivo original. **No uses "Guardar imagen como" desde el sitio
   publicado** (botón derecho del ratón sobre la web en vivo): eso descarga
   la versión ya redimensionada y comprimida que Wix sirve a los
   visitantes, con menos resolución que el original.
4. Si no encuentras un archivo por nombre en el Gestor de medios, entra en
   la página donde aparece (edítala) → haz clic sobre esa imagen concreta →
   **Cambiar imagen** → el panel que se abre muestra el archivo ya
   seleccionado dentro del Gestor de medios, resaltado. Desde ahí también se
   descarga a máxima calidad con el mismo botón.
5. Para vídeo, el mismo Gestor de medios tiene una pestaña de vídeos; se
   descarga igual.

## Nombre y autoría — qué necesito de cada archivo

Wix suele conservar el nombre con el que lo subiste (o un nombre genérico si
lo subiste hace tiempo desde el editor). Lo que yo necesito no es que le
cambies el nombre tú mismo, sino que, al enviarme los archivos, indiques
para cada uno:

- **Qué es** (p. ej. "portada del paquete de 12 días Enrich" o "logo
  principal").
- **Quién lo hizo** (fotógrafo o diseñador), si lo sabes — es el dato que
  falta en las 22 fotografías que ya están publicadas (ver
  `README.md`, "Autoría de esas fotografías"), y sin él la web sigue sin
  poder acreditar a nadie.
- Si es una fotografía tuya o de un empleado tomada con el móvil, dilo
  también — cuenta igual como autoría.

Yo me encargo de renombrarlos al esquema del proyecto
(`safari-<slug>-cover.jpg`, etc., ya documentado en
`src/data/photography-wanted.ts`) y de darles el mismo tratamiento de
derechos que al resto (`src/data/client-photography.ts`): la
autorización de uso comercial no sustituye a la autoría, así que ambas
constan por separado.

## Orden de prioridad para enviarme los archivos

Envíamelos en este orden — no hace falta esperar a tener todos antes de
mandar los primeros:

1. **Logo original** — el logotipo y el icono de marca, en el formato más
   vectorial que tengas (SVG o AI/EPS si existe; si no, el PNG de mayor
   resolución). Está en el Gestor de medios, normalmente cerca de las
   imágenes usadas en la cabecera del sitio.
2. **Vídeo o imagen de portada** — lo que uses hoy como cabecera principal
   de la home en Wix.
3. **Imágenes de los 18 paquetes de safari** — portada y galería de cada
   uno. Encuéntralas editando la página de cada paquete (ver el mapa de
   redirecciones del README para la URL exacta de cada uno) y usando "Cambiar
   imagen" sobre cada foto.
4. **Imágenes de Experiences** — portada de cada una de las 5 categorías
   (`/thrill-seaker-adventures`, `/water-activities`, `/tours`,
   `/shopping-and-leisure`, `/nightlife`).
5. **Imágenes de Impact / Cares / Empowerment** — de `/cares` y
   `/empowerment`. **No hace falta que me envíes la fotografía del tigre**
   del pie de `/cares`: no se va a usar.
6. **Blog** — la imagen de cabecera de los 3 artículos ya migrados (ver la
   tabla de artículos en el README para la URL exacta de cada uno).
7. **Learn y regiones** — portada de `/learn` y de las 5 páginas de región
   (`/northern-region`, `/central-and-southern-region`,
   `/lake-zone-and-western-zone`, `/coastal-region`, `/zanzibar-island`).

## Qué NO voy a sustituir todavía

No voy a cambiar ninguna fotografía provisional al azar por mi cuenta: en
cuanto me envíes un archivo de esta lista, lo sustituyo en el sitio y te lo
confirmo. Hasta entonces, las fotografías provisionales siguen donde están,
documentadas como tales.
