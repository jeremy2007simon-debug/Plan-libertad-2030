import type { ReactNode } from "react";

/**
 * Revelado suave al entrar en pantalla.
 *
 * Es un componente de SERVIDOR y no envía ni un byte de JavaScript. Solo marca
 * el bloque con `data-reveal`; de animarlo se encarga el script mínimo que
 * inyecta el layout (`RevealScript`), con un único IntersectionObserver para
 * toda la página.
 *
 * El motivo de no hacerlo con una librería de animación es de robustez: con
 * `whileInView` el HTML sale del servidor con `opacity: 0` y el contenido
 * depende de que el bundle cargue, hidrate y el observador dispare para ser
 * visible. Si algo de eso falla —red mala, un error de JS, un rastreador que
 * no ejecuta scripts— la sección queda en blanco. Aquí ocurre al revés: el
 * HTML es visible por defecto y la animación es un añadido que solo se activa
 * si hay JavaScript.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Retardo en segundos, para escalonar bloques hermanos. */
  delay?: number;
  className?: string;
}) {
  return (
    <div
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Script del revelado. Va en el `<head>`, antes de pintar, para que marque el
 * documento como "con JavaScript" sin que se vea el salto.
 *
 * Hace tres cosas y ninguna más:
 *  1. Marca `<html data-js>`, que es lo único que activa el estado oculto en
 *     CSS. Sin JavaScript, esa regla nunca se aplica y todo se ve.
 *  2. Si el usuario pide movimiento reducido, no hace nada más.
 *  3. Un solo IntersectionObserver revela los bloques al entrar en pantalla y
 *     deja de observarlos. Cubre también los que se añaden después (el mapa,
 *     el planificador) volviendo a barrer tras la hidratación.
 */
export function RevealScript() {
  const source = `(function(){
  var d=document.documentElement;
  if(!('IntersectionObserver' in window))return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  d.setAttribute('data-js','');
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.setAttribute('data-reveal','in');io.unobserve(e.target);}
    });
  },{rootMargin:'0px 0px -8% 0px'});
  function scan(){
    document.querySelectorAll('[data-reveal=""]').forEach(function(el){io.observe(el);});
  }
  if(document.readyState!=='loading')scan();else document.addEventListener('DOMContentLoaded',scan);
  window.addEventListener('load',scan);
})();`;

  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
