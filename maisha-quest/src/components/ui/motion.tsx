import { Children, isValidElement, type ReactNode } from "react";

/* ==========================================================================
   Sistema de movimiento
   --------------------------------------------------------------------------
   Regla que gobierna todo este archivo: EL HTML SALE VISIBLE DEL SERVIDOR.

   Ningún componente de aquí renderiza nada con `opacity: 0` desde el
   servidor. El estado oculto vive en CSS bajo `html[data-js]`, y ese atributo
   solo lo pone el script de abajo — que además no hace nada si el visitante
   pide movimiento reducido. Sin JavaScript, con JavaScript roto, o con
   `prefers-reduced-motion`, la página se ve entera y funciona entera; la
   animación es exclusivamente una mejora.

   Todo se anima con `transform`, `opacity` y `clip-path`. Ninguna utilidad
   toca `width`, `height`, `top`, `left` ni `margin`, que provocarían reflow.

   No hay librería de animación. Son unos 1,4 kB de script en línea, sin
   petición extra y sin coste de bundle, frente a los 30-50 kB de una librería
   —que además obligaría a marcar como cliente media web para usar
   `whileInView`.
   ========================================================================== */

type RevealDirection = "up" | "left" | "right" | "none";

/**
 * Revelado suave al entrar en pantalla: desplazamiento corto + opacidad.
 *
 * Componente de SERVIDOR: no envía ni un byte de JavaScript. Solo marca el
 * bloque con `data-reveal` y deja el resto al observador compartido.
 */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  /** Retardo en segundos, para escalonar bloques hermanos. */
  delay?: number;
  from?: RevealDirection;
  as?: "div" | "li" | "section" | "article" | "figure" | "span";
  className?: string;
}) {
  return (
    <Tag
      data-reveal=""
      data-reveal-from={from === "up" ? undefined : from}
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Escalonado de una lista.
 *
 * Envuelve cada hijo en un `Reveal` con un retardo creciente. El paso está
 * limitado a 120 ms y el retardo total a 0,6 s: por encima de eso el último
 * elemento de una rejilla larga aparece cuando el visitante ya ha pasado de
 * largo, que es exactamente la sensación de web lenta que hay que evitar.
 */
export function Stagger({
  children,
  step = 0.08,
  from = "up",
  as = "div",
  className = "",
}: {
  children: ReactNode;
  step?: number;
  from?: RevealDirection;
  as?: "div" | "li";
  className?: string;
}) {
  const items = Children.toArray(children);
  return (
    <>
      {items.map((child, index) => (
        <Reveal
          key={isValidElement(child) && child.key ? child.key : index}
          delay={Math.min(index * step, 0.6)}
          from={from}
          as={as}
          className={className}
        >
          {child}
        </Reveal>
      ))}
    </>
  );
}

/**
 * Revelado de fotografía por máscara.
 *
 * La imagen entra descubriéndose de abajo arriba con `clip-path` mientras se
 * relaja una escala mínima. Es más lento que el texto (1,1 s frente a 0,9 s)
 * a propósito: una fotografía que aparece a la misma velocidad que un párrafo
 * se lee como un elemento de interfaz, no como una imagen.
 *
 * `overflow: hidden` va en el contenedor y la escala en la imagen, de modo que
 * la máscara nunca recorta el layout ni provoca desplazamiento.
 */
export function ImageReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      data-image-reveal=""
      className={`relative overflow-hidden ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Título que entra línea a línea desde su propia máscara.
 *
 * Los cortes son EDITORIALES y viven en el diccionario: una barra de línea
 * dentro de la cadena del título (`"Tres formas\nde viajar por Tanzania"`).
 * No se parte por posición ni por número de caracteres, porque el corte que
 * funciona en inglés cae en mitad de una palabra compuesta en alemán.
 *
 * Sin marca de corte el título entra en una sola línea, con el mismo
 * movimiento. Nada se rompe si un idioma no la pone.
 *
 * El `overflow: hidden` va en el contenedor y el movimiento en el hijo, para
 * que la máscara no recorte los descendentes ni los acentos —la ‘j’ del
 * francés y la ‘Й’ del ruso bajan más de lo que parece—. De ahí el relleno
 * inferior compensado con margen negativo: no ocupa espacio.
 *
 * Componente de SERVIDOR: cero JavaScript. El estado inicial vive en CSS bajo
 * `:root[data-js]`, así que sin JavaScript el título ya está puesto.
 */
export function TitleLines({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span data-title-line="" className="block" style={{ "--i": index } as React.CSSProperties}>
            {line}
            {/* Espacio real entre líneas: sin él un lector de pantalla lee
                «Tres formasde viajar». */}
            {index < lines.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </>
  );
}

/**
 * El mismo texto, en una sola línea y sin marcas.
 *
 * Para donde el título no se pinta como título: el `aria-label` de un
 * carrusel, los datos estructurados, un atributo. Ahí la marca de corte
 * sobraría.
 */
export function plainTitle(text: string): string {
  return text.replace(/\n/g, " ");
}

/**
 * Fotografía con paralaje muy leve.
 *
 * El recorrido máximo es de 40 px y solo se aplica en escritorio con puntero
 * fino. En móvil no se activa: allí el paralaje o va a tirones o obliga a
 * `background-attachment: fixed`, que en iOS ni siquiera funciona.
 *
 * El hijo debe llevar la fotografía con algo de holgura vertical
 * (`-inset-y-*` o `scale-105`), porque el desplazamiento descubriría el borde.
 */
export function ParallaxMedia({
  children,
  strength = 28,
  className = "",
}: {
  children: ReactNode;
  /** Recorrido total en píxeles. El máximo razonable es 40. */
  strength?: number;
  className?: string;
}) {
  return (
    <div
      data-parallax={Math.min(Math.max(strength, 8), 40)}
      className={className}
    >
      {children}
    </div>
  );
}

/**
 * Filete que se dibuja al entrar en pantalla.
 *
 * Se anima `transform: scaleX()` sobre un elemento de altura fija, nunca el
 * `width`: así el trazo no recalcula el layout de la fila en cada fotograma.
 */
export function AnimatedLine({
  className = "",
  tone = "rule",
  delay = 0,
}: {
  className?: string;
  tone?: "rule" | "gold" | "on-dark";
  delay?: number;
}) {
  const background =
    tone === "gold"
      ? "bg-[var(--gold)]"
      : tone === "on-dark"
        ? "bg-[var(--rule-on-dark)]"
        : "bg-[var(--rule-strong)]";
  return (
    <span
      data-line=""
      aria-hidden="true"
      className={`block h-px w-full origin-left ${background} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    />
  );
}

/**
 * Trazo de SVG que se dibuja progresivamente (`stroke-dashoffset`).
 *
 * `pathLength={1}` normaliza la longitud del trazo, así que el CSS puede usar
 * `stroke-dasharray: 1` sin medir el path en JavaScript. Sin JavaScript el
 * trazo aparece dibujado del todo.
 */
export function RouteDraw({
  d,
  className = "",
  duration = 1.6,
  delay = 0,
  ...rest
}: {
  d: string;
  className?: string;
  duration?: number;
  delay?: number;
} & Omit<React.SVGProps<SVGPathElement>, "d" | "className">) {
  return (
    <path
      d={d}
      pathLength={1}
      data-draw=""
      className={className}
      style={{
        "--draw-duration": `${duration}s`,
        "--draw-delay": `${delay}s`,
      } as React.CSSProperties}
      {...rest}
    />
  );
}

/**
 * Flecha que avanza al pasar por encima o al recibir el foco.
 *
 * "Magnética" en el sentido discreto: se desplaza cuando el enlace que la
 * contiene está activo, sin seguir al ratón. Un elemento que persigue el
 * cursor es exactamente el tipo de efecto que el encargo descarta.
 */
export function MagneticArrow({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block transition-transform duration-[var(--dur-hover)] ease-[var(--ease-out)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5 ${className}`}
    >
      →
    </span>
  );
}

/**
 * Script de movimiento. Va en el `<head>`, antes de pintar.
 *
 * Hace cuatro cosas y ninguna más:
 *  1. Marca `<html data-js>`, único activador del estado oculto en CSS.
 *  2. Si el visitante pide movimiento reducido, se detiene ahí.
 *  3. Un IntersectionObserver revela bloques, imágenes, filetes y trazos, y
 *     deja de observarlos. Vuelve a barrer tras la hidratación para los que
 *     monta React después (mapa, planificador).
 *  4. Un único bucle de rAF mueve los elementos con paralaje, solo en
 *     escritorio con puntero fino y solo los que están en pantalla.
 */
export function MotionScript() {
  const source = `(function(){
  var d=document.documentElement;
  if(!('IntersectionObserver' in window))return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  d.setAttribute('data-js','');
  var SEL='[data-reveal=""],[data-image-reveal=""],[data-line=""],[data-draw=""]';
  function show(t){
    if(t.hasAttribute('data-reveal'))t.setAttribute('data-reveal','in');
    else if(t.hasAttribute('data-image-reveal'))t.setAttribute('data-image-reveal','in');
    else if(t.hasAttribute('data-line'))t.setAttribute('data-line','in');
    else if(t.hasAttribute('data-draw'))t.setAttribute('data-draw','in');
  }
  // Un carrusel horizontal se revela ENTERO cuando entra en pantalla: lo que
  // está fuera por la derecha no interseca nunca con el viewport y se quedaría
  // invisible hasta que alguien lo desplazara a mano.
  function showGroup(g){
    var ns=g.querySelectorAll(SEL);
    for(var i=0;i<ns.length;i++){show(ns[i]);io.unobserve(ns[i]);}
  }
  var io=new IntersectionObserver(function(es){
    for(var i=0;i<es.length;i++){var e=es[i];
      var t=e.target;
      if(!e.isIntersecting){
        // Ya ha pasado por encima: durante un desplazamiento rápido el
        // navegador puede entregar solo la salida, y sin esto el bloque se
        // quedaría invisible para siempre.
        if(e.boundingClientRect.bottom<0){show(t);io.unobserve(t);}
        continue;
      }
      // Un umbral del 15 % no se alcanza nunca en un bloque más alto que la
      // ventana: ahí basta con que haya entrado.
      var alto=e.boundingClientRect.height>window.innerHeight*0.7;
      if(e.intersectionRatio<0.15&&!alto)continue;
      if(t.hasAttribute('data-hscroll')){showGroup(t);io.unobserve(t);continue;}
      show(t);
      io.unobserve(t);}
  },{rootMargin:'0px 0px -10% 0px',threshold:[0,0.15]});

  /*
   * Barrido de seguridad.
   *
   * El observador es quien da la entrada bonita, pero no es infalible: un
   * bloque que React monta DESPUÉS de que alguien ya haya pasado por su altura
   * —el planificador, el mapa— se empieza a observar cuando ya está por encima
   * de la ventana, y ahí no queda ningún umbral que cruzar. Sin esto se
   * quedaría invisible para siempre, que es el peor fallo posible de un
   * sistema de animación: texto que no se lee.
   *
   * Corre cuando el scroll se para, no en cada fotograma, y solo mira lo que
   * todavía está sin revelar.
   */
  var sweepId;
  function sweep(){
    var vh=window.innerHeight;
    var nodes=document.querySelectorAll(SEL);
    for(var i=0;i<nodes.length;i++){
      var n=nodes[i],r=n.getBoundingClientRect();
      if(r.width===0&&r.height===0)continue;
      if(r.top<vh*0.9){show(n);io.unobserve(n);}
    }
  }
  function scheduleSweep(){
    clearTimeout(sweepId);
    sweepId=setTimeout(sweep,260);
  }
  window.addEventListener('scroll',scheduleSweep,{passive:true});
  window.addEventListener('resize',scheduleSweep,{passive:true});

  var px=[],ticking=false;
  var wantsParallax=window.matchMedia('(min-width:1024px) and (pointer:fine)').matches;
  function frame(){
    ticking=false;
    var vh=window.innerHeight;
    for(var i=0;i<px.length;i++){
      var el=px[i],r=el.getBoundingClientRect();
      if(r.bottom<-200||r.top>vh+200)continue;
      var p=(r.top+r.height/2-vh/2)/vh;
      if(p<-1)p=-1;else if(p>1)p=1;
      el.style.transform='translate3d(0,'+(p*el.__mq).toFixed(2)+'px,0)';
    }
  }
  function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(frame);}}

  // Cada barrido marca lo que ya ha visto. Sin esa marca, el observador de
  // mutaciones —que dispara con cada lote de cambios de React durante la
  // hidratación— volvía a recorrer y a observar el árbol entero cada vez, y
  // eso salía en el perfil como estilo y layout forzados.
  function scan(){
    var nodes=document.querySelectorAll(SEL);
    for(var i=0;i<nodes.length;i++){
      var n=nodes[i];
      if(n.__mqSeen)continue;
      n.__mqSeen=1;
      // Dentro de un carrusel se observa el carrusel, no cada tarjeta.
      var g=n.closest('[data-hscroll]');
      if(g){if(!g.__mqSeen){g.__mqSeen=1;io.observe(g);}continue;}
      io.observe(n);
    }
    if(!wantsParallax)return;
    var ps=document.querySelectorAll('[data-parallax]');
    if(ps.length===px.length)return;
    px.length=0;
    for(var j=0;j<ps.length;j++){ps[j].__mq=parseFloat(ps[j].getAttribute('data-parallax'))||0;px.push(ps[j]);}
    if(px.length){window.addEventListener('scroll',onScroll,{passive:true});onScroll();}
  }
  if(document.readyState!=='loading')scan();else document.addEventListener('DOMContentLoaded',scan);
  window.addEventListener('load',scan);
  // Lo que React monta después de hidratar (mapa, planificador) no existía en
  // los barridos anteriores. Sin esto se quedaría oculto para siempre, que es
  // justo el fallo que este sistema evita.
  //
  // Este script va en el <head>: cuando se ejecuta, document.body todavía no
  // existe y observarlo lanzaba una excepción en todas las páginas, que además
  // dejaba el rescán sin instalar. Se espera a que el cuerpo exista.
  function watch(){
    if(!('MutationObserver' in window)||!document.body)return;
    var pending=false;
    new MutationObserver(function(){
      if(pending)return;pending=true;
      requestAnimationFrame(function(){pending=false;scan();});
    }).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState!=='loading')watch();else document.addEventListener('DOMContentLoaded',watch);
})();`;

  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
