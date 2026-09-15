import { CompassMark } from "@/components/ui/Compass";
import { COMPANY } from "@/lib/site";
import type { Dictionary } from "@/i18n/messages/en";

/**
 * Animación de entrada de la portada: la marca, centrada y ya visible,
 * funciona como una MÁSCARA — el aro real de la brújula se agranda hasta
 * salir de la pantalla, y a través de ese círculo que crece se ve la
 * portada real que lleva ahí pintada desde el primer fotograma. No es un
 * icono que se acerca a la cámara: es un hueco circular, anclado en la
 * propia geometría del aro exterior de la brújula (el `r={21}` de
 * `CompassMark`, no una forma inventada), que revela la portada a medida
 * que crece.
 *
 * Se ejecuta en CADA carga real de la home (primera visita y cada recarga),
 * nunca al navegar entre páginas internas, cambiar de idioma o abrir/cerrar
 * el menú — eso no recarga el documento, así que el guardián de abajo ni
 * llega a ejecutarse de nuevo. No usa `sessionStorage` ni ningún otro rastro
 * entre visitas.
 *
 * Cómo está hecha
 * ----------------
 * Dos capas superpuestas, ambas CSS/SVG puro (sin canvas, vídeo ni librería
 * de animación):
 *
 *  1. CAPA TRASERA: la portada real, ya en el HTML servido, sin esperar a
 *     nada — nunca parpadea porque nunca se oculta a sí misma.
 *  2. CAPA DELANTERA: un `<svg>` a pantalla completa que pinta el color de
 *     marca con un `<mask>` — un círculo (`.mq-intro-hole`) recorta un hueco
 *     en esa capa. El hueco EMPIEZA del tamaño exacto del aro de la
 *     brújula (mismo centro, mismo radio relativo) y crece con
 *     `r: 0% → 150vmax` hasta superar la diagonal de cualquier pantalla.
 *     Encima de esa capa, la brújula y el nombre reales (vectoriales, no un
 *     PNG ampliado) se ven nítidos y completos en el fotograma 0 y se
 *     disuelven en el primer tercio del recorrido — justo antes de que el
 *     hueco crezca más allá de su propio tamaño, para no dejar el icono
 *     flotando sobre la portada ya visible.
 *
 * `r`, `cx` y `cy` de un `<circle>` son propiedades CSS animables de forma
 * nativa (Chrome, Firefox y Safari/iOS desde hace varias versiones): no
 * hace falta JavaScript para mover nada, así que un fallo de hidratación no
 * puede dejar el hueco a medias — como mucho, el navegador no anima el
 * `r` y el aviso de seguridad de `IntroScript` retira la capa igual.
 *
 * El HTML sale del servidor y la capa no se ve nunca salvo que el guardián
 * ponga `data-intro` en el `<html>` ANTES del primer fotograma — así no hay
 * un destello de la portada antes de que la capa la tape. Sin JavaScript no
 * hay introducción y la portada se ve entera.
 *
 * Accesibilidad
 * -------------
 * Todo lo decorativo va bajo `aria-hidden`. El único elemento anunciado es
 * el botón de saltar, que también responde a Escape. No es un diálogo: no
 * atrapa el foco ni bloquea el scroll, así que nada queda que "restaurar".
 * Con `prefers-reduced-motion` la capa igual aparece, pero como un fundido
 * breve y plano de todo el bloque — nunca un hueco que crece — y desaparece
 * antes.
 */
export function Intro({ t }: { t: Dictionary["a11y"] }) {
  return (
    <div id="mq-intro">
      <svg className="mq-intro-reveal" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id="mq-intro-grad" cx="50%" cy="42%" r="85%">
            <stop offset="0%" stopColor="var(--forest)" />
            <stop offset="72%" stopColor="var(--canopy)" />
          </radialGradient>
          <mask id="mq-intro-hole-mask" maskUnits="userSpaceOnUse" x="-10%" y="-10%" width="120%" height="120%">
            <rect x="-10%" y="-10%" width="120%" height="120%" fill="white" />
            <circle className="mq-intro-hole" cx="50%" cy="42%" fill="black" />
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#mq-intro-grad)" mask="url(#mq-intro-hole-mask)" />
      </svg>

      <div className="mq-intro-stage" aria-hidden="true">
        <div className="mq-intro-center">
          <CompassMark className="mq-intro-compass" strokeWidth={0.9} />
          <span className="mq-intro-word">{COMPANY.name}</span>
        </div>
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
 * Decide, sincrónicamente, si la secuencia se ejecuta:
 *  · Solo en la portada, en cualquiera de los seis idiomas.
 *  · Nunca si quien navega llegó desde OTRA portada del propio sitio —el
 *    caso real es el selector de idioma, un enlace de verdad que hace una
 *    recarga completa entre /es y /en: sin esto, cambiar de idioma repetiría
 *    la entrada—. Si el origen es la MISMA portada (el logo, enlazado a
 *    propósito a su propia ruta para forzar justo esta recarga, o una
 *    recarga real con F5, detectada aparte por la Navigation Timing API),
 *    la entrada SÍ se ejecuta.
 *  · Nunca en un navegador automatizado (`navigator.webdriver`), salvo que
 *    `?intro=1` la fuerce: es como se verifica la propia introducción sin
 *    que cada comprobación automática de la web tenga que esperarla.
 *
 * No se guarda nada en `sessionStorage` ni en ningún otro almacenamiento:
 * es intencionado, la propia entrega pide que se repita en cada carga.
 */
export function IntroGate() {
  const source = `(function(){try{
  var d=document.documentElement;
  var p=location.pathname.replace(/\\/+$/,'');
  if(!/^(\\/(en|es|de|fr|ru|zh-CN))?$/.test(p))return;
  var forced=/[?&]intro=1(&|$)/.test(location.search);
  if(!forced&&navigator.webdriver)return;
  var navType='navigate';
  try{
    var nav=performance.getEntriesByType('navigation');
    if(nav&&nav[0]&&nav[0].type)navType=nav[0].type;
  }catch(e){}
  if(!forced&&navType!=='reload'){
    var ref=document.referrer;
    if(ref){
      try{
        var refUrl=new URL(ref);
        // Solo se salta si la home de origen es OTRA (idioma distinto): el
        // propio logo, pulsado ya en la home, enlaza a esa MISMA ruta a
        // propósito para forzar justo esta recarga — no debe confundirse
        // con el selector de idioma pasando de una home a otra.
        if(refUrl.origin===location.origin){
          var refPath=refUrl.pathname.replace(/\\/+$/,'');
          if(refPath!==p&&/^(\\/(en|es|de|fr|ru|zh-CN))?$/.test(refPath))return;
        }
      }catch(e){}
    }
  }
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.setAttribute('data-intro',reduced?'reduced':'full');
}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}

/**
 * Cierre de la introducción.
 *
 * El movimiento no lo lleva este script: lo lleva el CSS. Esto solo la
 * retira —al terminar, al pulsar «saltar» o al pulsar Escape—, quita el
 * atributo del `<html>` y borra el nodo del DOM.
 *
 * El cierre nunca depende solo de `animationend`: un temporizador es la
 * garantía real (si el efecto no llegara a completarse, o el navegador no
 * disparase el evento, la portada queda accesible igual), y el propio
 * evento solo adelanta el desmontaje cuando sí ocurre.
 */
export function IntroScript() {
  const source = `(function(){
  var d=document.documentElement;
  if(!d.hasAttribute('data-intro'))return;
  var node=document.getElementById('mq-intro');
  var done=false;
  function end(){
    if(done)return;done=true;
    d.removeAttribute('data-intro');
    document.removeEventListener('keydown',onKey);
    if(node&&node.parentNode)node.parentNode.removeChild(node);
  }
  function onKey(e){if(e.key==='Escape')end();}
  document.addEventListener('keydown',onKey);
  if(node){
    var skip=node.querySelector('[data-intro-skip]');
    if(skip)skip.addEventListener('click',end);
  }
  var reduced=d.getAttribute('data-intro')==='reduced';
  setTimeout(end,reduced?650:2100);
  if(node)node.addEventListener('animationend',function(e){
    if(e.animationName==='mq-intro-hole-grow'||e.animationName==='mq-intro-fade-reduced')end();
  });
})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
