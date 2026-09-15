import { CompassMark } from "@/components/ui/Compass";
import { COMPANY } from "@/lib/site";
import type { Dictionary } from "@/i18n/messages/en";

/**
 * Animación de entrada de la portada: la marca, centrada y ya visible,
 * avanza hacia quien mira y atraviesa la pantalla, revelando el hero real
 * que lleva ahí pintado desde el primer fotograma.
 *
 * Se ejecuta en CADA carga real de la home (primera visita y cada recarga),
 * nunca al navegar entre páginas internas, cambiar de idioma o abrir/cerrar
 * el menú — eso no recarga el documento, así que el guardián de abajo ni
 * llega a ejecutarse de nuevo. No usa `sessionStorage` ni ningún otro rastro
 * entre visitas.
 *
 * Cómo está hecha
 * ----------------
 * TODO el movimiento es CSS (`perspective` + `translateZ` + `scale` sobre la
 * brújula y el nombre reales, no un PNG ampliado). No hay vídeo, ni canvas,
 * ni librería de animación. El HTML sale del servidor y no se ve nunca salvo
 * que el guardián ponga `data-intro` en el `<html>` ANTES del primer
 * fotograma — así no hay un destello de la portada antes de que la capa la
 * tape. Sin JavaScript no hay introducción y la portada se ve entera.
 *
 * Accesibilidad
 * -------------
 * Todo lo decorativo va bajo `aria-hidden`. El único elemento anunciado es
 * el botón de saltar, que también responde a Escape. No es un diálogo: no
 * atrapa el foco ni bloquea el scroll, así que nada queda que "restaurar".
 * Con `prefers-reduced-motion` la capa igual aparece, pero como un fundido
 * breve y plano — nunca un avance 3D — y desaparece antes.
 */
export function Intro({ t }: { t: Dictionary["a11y"] }) {
  return (
    <div id="mq-intro">
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
 *  · Nunca si quien navega llegó desde otra portada del propio sitio —el
 *    caso real es el selector de idioma, que es un enlace de verdad y hace
 *    una recarga completa: sin esto, cambiar de /es a /en repetiría la
 *    entrada—. Una recarga de la MISMA página (F5) se detecta aparte con la
 *    Navigation Timing API y siempre se deja pasar, sea cual sea el
 *    `referrer` que el navegador conserve de antes.
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
        if(refUrl.origin===location.origin){
          var refPath=refUrl.pathname.replace(/\\/+$/,'');
          if(/^(\\/(en|es|de|fr|ru|zh-CN))?$/.test(refPath))return;
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
    if(e.animationName==='mq-intro-mark'||e.animationName==='mq-intro-fade-reduced')end();
  });
})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
