import type { Dictionary } from "@/i18n/messages/en";

/**
 * Introducción cinematográfica de Maisha Quest.
 *
 * Qué es
 * ------
 * Se ve UNA VEZ POR SESIÓN al entrar en la portada: el vídeo de marca a
 * pantalla completa (15 s, sin audio, entregado por el cliente), que termina
 * con el rótulo «Maisha Quest» —manuscrito, YA incrustado en el propio
 * vídeo— sobre el atardecer. Al terminar, ese mismo fotograma se acerca
 * ligeramente hacia quien mira (solo el vídeo: no hay una segunda imagen del
 * rótulo superpuesta) y un barrido circular (`mq-intro-portal-out`, ya usado
 * en la versión anterior de esta introducción) descubre el hero real, que
 * lleva pintado debajo desde el primer fotograma.
 *
 * ⚠️ El rótulo manuscrito del vídeo es obra del cliente, distinto de la marca
 * serif con brújula que usa el `Header` en el resto del sitio. Esta
 * introducción no sustituye esa identidad —el logotipo del `Header` sigue
 * siendo la brújula dibujada en código—; la diferencia entre ambos rótulos
 * queda para que la resuelva el cliente, no para que la decida el código.
 *
 * `object-fit: contain`, no `cover`
 * ----------------------------------
 * El vídeo (910×512, un plano horizontal) se ajusta con `contain`: se ve
 * completo siempre, con el fondo Dark Canopy rellenando los márgenes que
 * sobran. `cover` recortaría los lados en cualquier pantalla más alta que
 * ancha —todo el catálogo de móviles—, y el rótulo manuscrito, al ocupar casi
 * todo el ancho del plano, es tan ancho que ese recorte se lo comería por los
 * dos lados. `contain` no lo hace nunca, en ningún tamaño de pantalla, y de
 * paso centra el sujeto y el rótulo por construcción —no hace falta
 * `object-position` para lograrlo—.
 *
 * Por qué es una mezcla de vídeo y CSS, y no solo CSS
 * ----------------------------------------------------
 * La versión anterior (brújula + patrón, todo CSS) medía su propio tiempo
 * porque no dependía de ningún archivo externo: el `animation-delay` se podía
 * calcular desde el primer fotograma sin más. Un vídeo no ofrece esa garantía
 * —arranca cuando el navegador decide que puede, no en el milisegundo exacto
 * en que se pintó la página—, así que las fases que dependen de él (el
 * rótulo, el barrido final) las dispara un script mínimo cuando el vídeo
 * dispara sus propios eventos (`ended`, `error`), no un temporizador fijo. El
 * MOVIMIENTO sigue siendo CSS —el script solo añade un atributo—; el
 * DISPARO es lo que ahora depende del vídeo real.
 *
 * Dos formatos —`maisha-quest-intro.mp4` (H.264) y `.webm` (VP9), mismo
 * plano, sin audio— porque no todos los navegadores descodifican H.264:
 * casi todos sí, pero donde no, el `<video>` cae solo al `<source>`
 * siguiente. Ninguno de los dos `<source>` lleva `src` en el HTML que sale
 * del servidor: si lo llevara, el navegador empezaría a descargar el archivo
 * en cada visita a la portada, incluso en las que la introducción no se ve
 * (sesión ya vista, movimiento reducido, `saveData`, navegador automatizado).
 * `IntroScript` es quien decide —comprobando el mismo `data-intro` que puso
 * el guardián del `<head>`— si de verdad hace falta pedirlos.
 *
 * El HTML sale del servidor y **no se ve nunca** salvo que el guardián de
 * abajo ponga `data-intro` en el `<html>`. Sin JavaScript no hay introducción
 * y la portada se ve entera: la apertura es una mejora, no un requisito.
 *
 * Nada de esto provoca CLS: la capa es `position: fixed` y no participa del
 * flujo. El hero se pinta debajo desde el primer fotograma —la imagen LCP
 * empieza a descargarse igual, sin esperar a que la introducción termine—.
 *
 * Si el vídeo falla —error de red, códec no soportado, o simplemente no
 * arranca— se entra en la página sin rótulo ni barrido: el mismo camino que
 * «saltar» o Escape. Con un códec no soportado el aviso llega enseguida (el
 * propio `<video>` dispara `error`); con una red que da un error distinto en
 * los dos `<source>`, medido, ese evento no siempre llega, así que hay un
 * segundo cinturón: si a los 4 s no ha empezado a reproducirse nada, se
 * entra en la página igual. Nunca una capa oscura esperando más que eso.
 *
 * Accesibilidad
 * -------------
 * Todo lo decorativo va bajo `aria-hidden`, así que un lector de pantalla no
 * lee la marca dos veces. El único elemento anunciado es el botón de saltar,
 * que está fuera de ese subárbol, aparece a los 400 ms, permanece visible
 * mientras dura el vídeo y responde también a Escape. No hay trampa de foco:
 * no es un diálogo, y quien tabule llega al contenido real. Con
 * `prefers-reduced-motion` la secuencia no se ejecuta —ni el vídeo se pide—.
 */
export function Intro({ t }: { t: Dictionary["a11y"] }) {
  return (
    <div id="mq-intro" data-intro-root="">
      <div className="mq-intro-stage" aria-hidden="true">
        {/* Sin `src`: lo asigna el script de abajo, y solo si de verdad va a
            reproducirse. `poster` no hace falta —el vídeo funde a negro en su
            primer fotograma y el fondo Dark Canopy de `:root[data-intro]::before`
            ya cubre ese instante con un tono igual de oscuro, sin destello. */}
        <video
          id="mq-intro-video"
          className="mq-intro-video"
          muted
          playsInline
          preload="none"
          aria-hidden="true"
        >
          {/* Dos formatos, sin `src` en ninguno todavía —lo asigna el script
              de abajo—. H.264 primero: es el que casi todo reproduce, a
              menudo con descodificación por hardware; WebM/VP9 como
              alternativa para el resto. El navegador se queda con el
              primero de la lista que sepa reproducir. */}
          <source id="mq-intro-video-mp4" type="video/mp4" />
          <source id="mq-intro-video-webm" type="video/webm" />
        </video>
      </div>

      {/* Fuera del subárbol decorativo: es lo único que se anuncia. */}
      <button type="button" data-intro-skip="" className="mq-intro-skip">
        {t.skipIntro}
      </button>
    </div>
  );
}

/**
 * Guardián de la introducción. Va en el `<head>`, antes de pintar nada.
 *
 * Decide si la secuencia se ejecuta, y lo decide ANTES del primer fotograma:
 * si lo hiciera después, se vería un destello de la portada antes de que la
 * capa la tapara. Por eso pone `data-intro` en el `<html>`, y por eso el CSS
 * pinta el fondo Dark Canopy con un pseudoelemento de `:root` —que existe
 * desde el primer píxel— y no espera a que el navegador llegue a la capa.
 *
 * No se ejecuta si:
 *  · el visitante pide movimiento reducido;
 *  · ya se ha visto en esta sesión (`maisha-cinematic-intro-v3`);
 *  · no es la portada;
 *  · el navegador dice que se ahorren datos (`saveData`) — el vídeo pesa
 *    2,3 MB, así que este caso importa más ahora que con la versión en CSS;
 *  · no hay `sessionStorage` accesible (navegación privada muy restrictiva);
 *  · el navegador está automatizado (`navigator.webdriver`), porque diecisiete
 *    segundos de capa a pantalla completa falsearían las mediciones de las
 *    herramientas de verificación.
 *
 * `?intro=1` la fuerza aunque la marca de sesión exista: es la forma de
 * revisarla sin abrir una ventana nueva. El movimiento reducido manda incluso
 * sobre eso.
 *
 * En `sessionStorage` solo se guarda la marca. Ni un dato personal.
 */
export function IntroGate() {
  const source = `(function(){try{
  var d=document.documentElement;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var p=location.pathname.replace(/\\/+$/,'');
  // Portada en cualquiera de los seis idiomas: "" o "/xx".
  if(!/^(\\/(en|es|de|fr|ru|zh-CN))?$/.test(p))return;
  var forced=/[?&]intro=1(&|$)/.test(location.search);
  var c=navigator.connection;
  if(!forced&&c&&c.saveData)return;
  // Navegador automatizado: una capa a pantalla completa durante diecisiete
  // segundos falsearía cualquier medida de las herramientas de verificación
  // —orden de tabulación, desbordamiento, texto visible—. El parámetro
  // intro=1 la fuerza igual, que es como se prueba la propia introducción.
  if(!forced&&navigator.webdriver)return;
  var K='maisha-cinematic-intro-v3';
  if(!forced&&sessionStorage.getItem(K))return;
  sessionStorage.setItem(K,'1');
  d.setAttribute('data-intro','');
}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}

/**
 * Ciclo de vida completo de la introducción: enciende el vídeo (si hace
 * falta) y la cierra —al terminar de verdad, si falla, al pulsar «saltar» o
 * al pulsar Escape—.
 *
 * Se renderiza justo después de `<Intro>` en `page.tsx`, como en la versión
 * anterior —NO anidado dentro del propio `#mq-intro`—. Anidarlo ahí se probó
 * y provocó un error de hidratación (#418) en pruebas automatizadas, pero el
 * anidamiento en sí no era la causa real: era que, en un navegador sin
 * descodificador para ninguno de los dos formatos, el `error` del vídeo podía
 * llegar en el MISMO turno en que React seguía hidratando ese subárbol, y
 * borrar el nodo en ese instante desincronizaba la hidratación en curso —ver
 * el comentario de `end()`, más abajo, que es donde de verdad se corrigió
 * (aplazando la mutación del DOM un turno). Se deja como hermano de nivel
 * superior de todas formas, por ser la posición ya probada y por simetría con
 * la versión anterior, no porque el anidamiento fuera en sí el problema.
 * Sigue ejecutándose pronto —al principio de la home, antes de las demás
 * secciones—, así que el vídeo empieza a pedirse lo antes posible y el camino
 * de fallo está disponible desde el primer instante.
 *
 * Cierre = quitar `data-intro` del `<html>` y BORRAR el nodo del DOM, para
 * que no quede una capa a pantalla completa esperando a nada. La navegación
 * no se bloquea en ningún momento: la capa deja pasar el scroll, y el cierre
 * por fallo o por «saltar»/Escape es SIEMPRE inmediato —sin rótulo ni
 * barrido—, mientras que el cierre natural pasa primero por el rótulo y el
 * barrido (`data-intro-video-ended`, en CSS) antes de desmontarse.
 *
 * Un temporizador de emergencia (20 s: los 15 del vídeo más el rótulo, el
 * barrido y un margen) es la garantía última si ningún evento llega a
 * dispararse; nunca dejaría a alguien mirando una capa oscura más de eso.
 */
export function IntroScript() {
  const source = `(function(){
  var d=document.documentElement;
  if(!d.hasAttribute('data-intro'))return;
  var node=document.getElementById('mq-intro');
  var video=document.getElementById('mq-intro-video');
  var done=false;
  function end(){
    // Se marca "hecho" ya mismo, para que dos disparos a la vez —el vídeo
    // falla justo cuando alguien pulsa «saltar»— no encolen el cierre dos
    // veces; pero la mutación del DOM se aplaza un instante. Un fallo del
    // vídeo puede llegar en el MISMO turno en que este script se ejecuta,
    // antes de que React haya terminado de hidratar el árbol del servidor;
    // borrar el nodo en ese instante desincroniza esa hidratación (React
    // detecta el árbol incompleto y lo regenera entero). Retrasarlo a la
    // siguiente vuelta del bucle de eventos es gratis para quien mira —nadie
    // percibe un cero milisegundos— y evita esa carrera por completo.
    if(done)return;done=true;
    setTimeout(function(){
      d.removeAttribute('data-intro');
      d.removeAttribute('data-intro-video-ended');
      document.removeEventListener('keydown',onKey);
      if(node&&node.parentNode)node.parentNode.removeChild(node);
    },0);
  }
  function onKey(e){if(e.key==='Escape')end();}
  document.addEventListener('keydown',onKey);
  if(node){
    var skip=node.querySelector('[data-intro-skip]');
    if(skip)skip.addEventListener('click',end);
  }
  // Última garantía: si nada más dispara el cierre, este lo hace.
  setTimeout(end,20000);
  if(node)node.addEventListener('animationend',function(e){
    if(e.animationName==='mq-intro-portal-out')end();
  });

  if(!video){end();return;}
  // Vídeo terminado de verdad: el rótulo y el barrido los dispara el CSS a
  // partir de este atributo, no un temporizador fijo (ver Intro.tsx).
  video.addEventListener('ended',function(){
    d.setAttribute('data-intro-video-ended','');
  });
  // Cualquier fallo entra en la página de inmediato, sin rótulo ni barrido.
  // Con dos <source> el evento 'error' del propio <video> solo llega cuando
  // NINGUNO de los dos ha podido reproducirse, que es justo lo que interesa.
  video.addEventListener('error',end);
  var started=false;
  video.addEventListener('playing',function(){started=true;});
  // Si a los cuatro segundos no ha llegado a reproducir nada, algo se ha
  // atascado (códec, red, autoplay bloqueado pese a ir silenciado): se
  // entra en la página en vez de dejar una capa esperando.
  setTimeout(function(){if(!started)end();},4000);

  // Solo aquí se piden los archivos: nunca antes de saber que hace falta.
  document.getElementById('mq-intro-video-mp4').src='/video/maisha-quest-intro.mp4';
  document.getElementById('mq-intro-video-webm').src='/video/maisha-quest-intro.webm';
  video.load();
  var played=video.play();
  if(played&&played.catch)played.catch(end);
})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
