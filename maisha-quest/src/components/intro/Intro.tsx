import { CompassMark } from "@/components/ui/Compass";
import { COMPANY } from "@/lib/site";
import type { Dictionary } from "@/i18n/messages/en";
import { GiraffePattern } from "./GiraffePattern";

/**
 * Introducción cinematográfica de Maisha Quest.
 *
 * Qué es
 * ------
 * Una apertura de menos de tres segundos que se ve UNA VEZ POR SESIÓN al
 * entrar en la portada: fondo Dark Canopy, un patrón abstracto inspirado en la
 * piel de una jirafa, la brújula de la marca dibujándose sola, unas franjas
 * que cruzan la pantalla como rumbos sobre una carta, la marca, «Tanzania», y
 * el hero real descubriéndose por debajo.
 *
 * Cómo está hecha, y por qué así
 * ------------------------------
 * TODO el movimiento es CSS. No hay librería de animación, ni canvas, ni
 * WebGL, ni vídeo, ni Lottie: son unas décimas de kilobyte de script cuyo
 * único trabajo es decidir si la secuencia se ejecuta y limpiar al terminar.
 *
 * El HTML sale del servidor y **no se ve nunca** salvo que el guardián de
 * abajo ponga `data-intro` en el `<html>`. Sin JavaScript no hay introducción
 * y la portada se ve entera: la apertura es una mejora, no un requisito.
 *
 * Nada de esto provoca CLS: la capa es `position: fixed` y no participa del
 * flujo. El hero se pinta debajo desde el primer fotograma —la imagen LCP
 * empieza a descargarse igual, sin esperar a que la introducción termine—.
 *
 * Accesibilidad
 * -------------
 * Todo lo decorativo va bajo `aria-hidden`, así que un lector de pantalla no
 * lee la marca dos veces. El único elemento anunciado es el botón de saltar,
 * que está fuera de ese subárbol, aparece a los 400 ms y responde también a
 * Escape. No hay trampa de foco: no es un diálogo, y quien tabule llega al
 * contenido real. Con `prefers-reduced-motion` la secuencia no se ejecuta.
 */
export function Intro({ t }: { t: Dictionary["a11y"] }) {
  return (
    <div id="mq-intro" data-intro-root="">
      <div className="mq-intro-stage" aria-hidden="true">
        {/* Patrón: entra suave sobre el Dark Canopy y se retira con una
            máscara al final, descubriendo el hero. */}
        <div className="mq-intro-pattern">
          <GiraffePattern className="size-full" />
        </div>
        <div className="grain mq-intro-grain" />

        {/* Franjas: rumbos de brújula. Cruzan dos veces —al principio
            descubren fragmentos del patrón, al final barren la pantalla—. */}
        <span className="mq-intro-band mq-intro-band-1" />
        <span className="mq-intro-band mq-intro-band-2" />
        <span className="mq-intro-band mq-intro-band-3" />
        <span className="mq-intro-band mq-intro-band-4" />

        <div className="mq-intro-center">
          {/* La brújula OFICIAL, la misma del resto de la web. No hay logotipo
              nuevo: sus trazos se dibujan con stroke-dasharray. El envoltorio
              es quien avanza hacia quien mira y supera el viewport al final;
              el SVG conserva su propio dibujado y pequeño giro de llegada,
              sin que ambas animaciones compitan por la misma propiedad. */}
          <span className="mq-intro-compass-portal">
            <CompassMark className="mq-intro-compass" strokeWidth={0.9} />
          </span>

          <p className="mq-intro-word">
            <span className="mq-intro-mask">
              <span className="mq-intro-name">{COMPANY.name}</span>
            </span>
            <span className="mq-intro-mask mq-intro-mask-country">
              <span className="mq-intro-country">Tanzania</span>
            </span>
          </p>
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
 * Decide si la secuencia se ejecuta, y lo decide ANTES del primer fotograma:
 * si lo hiciera después, se vería un destello de la portada antes de que la
 * capa la tapara. Por eso pone `data-intro` en el `<html>`, y por eso el CSS
 * pinta el fondo Dark Canopy con un pseudoelemento de `:root` —que existe
 * desde el primer píxel— y no espera a que el navegador llegue a la capa.
 *
 * No se ejecuta si:
 *  · el visitante pide movimiento reducido;
 *  · ya se ha visto en esta sesión (`maisha-cinematic-intro-v2`);
 *  · no es la portada;
 *  · el navegador dice que se ahorren datos (`saveData`);
 *  · no hay `sessionStorage` accesible (navegación privada muy restrictiva);
 *  · el navegador está automatizado (`navigator.webdriver`), porque tres
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
  // Navegador automatizado: una capa a pantalla completa durante tres segundos
  // falsearía cualquier medida de las herramientas de verificación —orden de
  // tabulación, desbordamiento, texto visible—. El parámetro intro=1 la fuerza
  // igual, que es como se prueba la propia introducción.
  if(!forced&&navigator.webdriver)return;
  var K='maisha-cinematic-intro-v2';
  if(!forced&&sessionStorage.getItem(K))return;
  sessionStorage.setItem(K,'1');
  d.setAttribute('data-intro','');
}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}

/**
 * Cierre de la introducción.
 *
 * El movimiento no lo lleva este script: lo lleva el CSS. Esto solo la retira
 * —al terminar, al pulsar «saltar» o al pulsar Escape—, quita el atributo del
 * `<html>` y BORRA el nodo del DOM, para que no quede una capa a pantalla
 * completa esperando a nada.
 *
 * La navegación no se bloquea en ningún momento: la capa deja pasar el scroll
 * y el cierre está garantizado por un temporizador, así que ni un fallo de
 * `animationend` puede dejar a alguien encerrado.
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
  // El temporizador es la garantía; el evento solo adelanta el desmontaje.
  setTimeout(end,3000);
  if(node)node.addEventListener('animationend',function(e){
    if(e.animationName==='mq-intro-portal-out')end();
  });
})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
