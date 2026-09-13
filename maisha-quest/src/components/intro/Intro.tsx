import type { Dictionary } from "@/i18n/messages/en";

/**
 * Introducción cinematográfica de Maisha Quest — experiencia de vídeo opcional.
 *
 * Qué es
 * ------
 * El montaje real entregado por el cliente (35,4 s, con audio ambiente,
 * 1920×1080) se ofrece UNA VEZ POR SESIÓN al entrar en la portada, pero NUNCA
 * bloquea el acceso al sitio: se reproduce dentro del propio hueco del hero
 * —no en una capa a pantalla completa— con un botón «Enter the website»
 * visible desde el primer instante. Quien lo pulsa entra de inmediato; quien
 * no hace nada ve el vídeo completo y pasa solo al hero al terminar; quien
 * quiere volver a verlo —o no lo vio la primera vez porque pidió movimiento
 * reducido— tiene un botón discreto para reproducirlo cuando quiera.
 *
 * Por qué dentro del hero y no a pantalla completa
 * -------------------------------------------------
 * La versión anterior (ver el historial de este archivo) era una capa
 * `position: fixed` que tapaba todo el documento y bloqueaba el scroll hasta
 * terminar o pulsar «saltar». El cliente pidió expresamente lo contrario: el
 * vídeo es una invitación opcional, no un peaje. Por eso el panel es
 * `position: absolute` dentro del MISMO hueco que ocupa `<Hero>` (ver el
 * `<div className="relative">` que los envuelve en `page.tsx`): el resto de
 * la página —cabecera, scroll, cualquier enlace— funciona exactamente igual
 * que si el vídeo no existiera. `inert` es quien impide que el tabulador
 * caiga en el titular del hero mientras está tapado por el vídeo; no hay
 * ningún `overflow: hidden` en `<html>` ni en ningún ancestro.
 *
 * `object-fit: cover` dentro de un marco 16:9 — no un recorte
 * -------------------------------------------------------------
 * El archivo es 1920×1080 exactos (comprobado con `ffprobe`): el marco fuerza
 * esa misma proporción, así que «llenarlo» y «contenerlo» son la misma
 * operación y nunca se recorta nada, ni siquiera el rótulo final. Lo que NO
 * se ha resuelto —y se documenta en vez de forzar una solución que lo
 * estropearía— es un hero vertical a pantalla completa en móvil: este plano
 * es horizontal de origen (grabación de dron y cámara en mano en el
 * Serengeti/Kilimanjaro), y un recorte a 9:16 se comería la mitad de cada
 * plano panorámico —los globos, la sabana con la migración, el propio
 * rótulo—. Si algún día hace falta ese formato, hace falta un montaje
 * vertical dedicado, no un `object-fit: cover` sobre este archivo. Mientras
 * tanto, el marco 16:9 se muestra completo tanto en escritorio como en móvil,
 * centrado, con el espacio sobrante del Dark Canopy alrededor —el mismo
 * tratamiento (filete dorado, grano) que ya llevaba la introducción
 * anterior—, y los controles ocupan ese margen en vez de superponerse al
 * propio vídeo.
 *
 * Sonido
 * ------
 * El archivo SÍ trae audio real (comprobado con `ffprobe -af volumedetect`:
 * -12,4 dB de media, no está en silencio). Empieza silenciado —así lo exige
 * el autoplay de cualquier navegador— y el botón de silencio es el único
 * control además de «Enter the website». Al salir de la introducción —por
 * cualquier vía: el botón, Escape, que el vídeo termine solo, o que falle—
 * se pausa el vídeo y se vuelve a silenciar, así que una reproducción
 * posterior (el botón discreto) siempre empieza en el mismo estado.
 *
 * El rótulo final
 * ----------------
 * Comprobado fotograma a fotograma: el propio archivo entregado ya trae el
 * rótulo «Maisha Quest» incrustado sobre una textura (piel de jirafa) en sus
 * últimos ~3 s. No se superpone ningún logotipo encima —ni el PNG dorado
 * reconstruido de una versión anterior, que ya no se usa en ningún sitio del
 * código, ni ningún otro—. El cierre se deja exactamente como se entregó.
 *
 * Accesibilidad
 * -------------
 * El vídeo en sí es `aria-hidden`: es un fondo decorativo sin voz ni
 * diálogo, solo sonido ambiente, así que no hace falta transcripción. Los
 * botones («Enter the website», silencio, ver de nuevo) SÍ son accesibles,
 * con nombre y estado (`aria-pressed` en el de silencio) y foco visible; no
 * viven bajo `aria-hidden`. El panel entero lleva `inert` mientras no está
 * activo —evita que alguien tabulando llegue a un botón invisible—, y dentro
 * del propio panel no hay ninguna trampa de foco: tabular al final de sus dos
 * botones lleva al resto de la página, no de vuelta al primero.
 *
 * Con `prefers-reduced-motion` el vídeo no arranca solo, pero el botón
 * discreto para verlo bajo demanda SIGUE disponible —es la forma en que esa
 * preferencia y «ofrécelo bajo demanda» conviven sin contradicción—.
 */
export function Intro({ t }: { t: Dictionary["a11y"] }) {
  return (
    <div id="mq-intro" data-intro-root="">
      {/* Acción secundaria discreta: ver (o volver a ver) el vídeo cuando se
          quiera. Oculta por defecto —sin JavaScript no hay introducción— y
          también mientras el panel de vídeo ya está activo, para no duplicar
          controles. `IntroScript` la revela. */}
      <button type="button" data-intro-watch="" className="mq-tap mq-intro-watch" hidden>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="mq-intro-watch-icon">
          <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
        </svg>
        {t.introWatch}
      </button>

      {/* El panel: cubre el hueco del hero (ver el envoltorio `relative` en
          page.tsx), nunca el documento entero. `inert` de fábrica: sin
          JavaScript, o antes de que decida activarse, ninguno de sus botones
          es alcanzable. */}
      <div className="mq-intro-video-panel" data-intro-panel="" inert>
        <div className="mq-intro-video-stage">
          <div className="mq-intro-video-frame">
            {/* Decorativo: sonido ambiente, sin voz que transcribir. Sin
                `src` en el HTML del servidor —lo asigna `IntroScript`, y solo
                si de verdad va a reproducirse—. */}
            <video
              id="mq-intro-video"
              className="mq-intro-video-el"
              muted
              playsInline
              preload="none"
              poster="/video/optimized/maisha-quest-intro-v2-poster.webp"
              aria-hidden="true"
            >
              {/* H.264 primero —lo descodifica casi todo, a menudo por
                  hardware—; VP9 como alternativa donde no. No todos los
                  navegadores traen H.264 (algunas variantes de Chromium/
                  Firefox en Linux, comprobado en este mismo entorno de
                  pruebas): con dos `<source>`, el `<video>` cae solo al
                  siguiente en vez de fallar. El navegador descarga solo UNO
                  de los dos, nunca ambos. */}
              <source id="mq-intro-video-mp4" type="video/mp4" />
              <source id="mq-intro-video-webm" type="video/webm" />
            </video>
            <div className="grain absolute inset-0" aria-hidden="true" />
          </div>

          <div className="mq-intro-video-controls">
            <button type="button" data-intro-enter="" className="mq-tap mq-intro-video-enter">
              {t.introEnter}
            </button>
            <button
              type="button"
              data-intro-mute=""
              className="mq-tap mq-icon-btn on-dark mq-intro-video-mute"
              aria-pressed="true"
            >
              {/* Icono de silencio; `IntroScript` alterna icono y texto según
                  `aria-pressed`. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mq-intro-video-mute-icon"
                data-intro-mute-icon-off
              >
                <path
                  d="M4 9.5v5h3.6l4.9 4V5.5l-4.9 4H4Z"
                  fill="currentColor"
                />
                <path
                  d="m16.2 8.3 5.4 5.4M21.6 8.3l-5.4 5.4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="mq-intro-video-mute-icon"
                data-intro-mute-icon-on
                style={{ display: "none" }}
              >
                <path d="M4 9.5v5h3.6l4.9 4V5.5l-4.9 4H4Z" fill="currentColor" />
                <path
                  d="M16.4 8.6a5 5 0 0 1 0 6.8M19 6a8.5 8.5 0 0 1 0 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <span data-intro-mute-label>{t.introUnmute}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Guardián de la introducción. Va en el `<head>`, antes de pintar nada —igual
 * que en la versión anterior—, para que el panel aparezca ya activo en el
 * primer fotograma que ve quien visita la portada y no haya un destello del
 * hero sin vídeo encima.
 *
 * No se activa solo si:
 *  · el visitante pide movimiento reducido (sigue disponible bajo demanda,
 *    vía el botón discreto — ver `Intro`);
 *  · ya se ha visto en esta sesión (`maisha-cinematic-intro-v4`);
 *  · no es la portada;
 *  · el navegador dice que se ahorren datos (`saveData`) — el vídeo pesa
 *    12,7 MB;
 *  · no hay `sessionStorage` accesible;
 *  · el navegador está automatizado (`navigator.webdriver`) — las
 *    herramientas de verificación no deben medir con un vídeo de fondo
 *    reproduciéndose solo.
 *
 * `?intro=1` la fuerza igual que antes. El movimiento reducido manda incluso
 * sobre eso —pero el botón discreto sigue ahí, con o sin `?intro=1`—.
 */
export function IntroGate() {
  const source = `(function(){try{
  var d=document.documentElement;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var p=location.pathname.replace(/\\/+$/,'');
  if(!/^(\\/(en|es|de|fr|ru|zh-CN))?$/.test(p))return;
  var forced=/[?&]intro=1(&|$)/.test(location.search);
  var c=navigator.connection;
  if(!forced&&c&&c.saveData)return;
  if(!forced&&navigator.webdriver)return;
  var K='maisha-cinematic-intro-v4';
  if(!forced&&sessionStorage.getItem(K))return;
  sessionStorage.setItem(K,'1');
  d.setAttribute('data-intro-eligible','');
}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}

/**
 * Ciclo de vida completo de la experiencia de vídeo: activa el panel (si el
 * guardián lo marcó elegible), enciende el vídeo, y responde a cada forma de
 * salir —«Enter the website», Escape, que el vídeo termine solo, o que
 * falle—. También enciende el botón discreto de «ver (de nuevo) el vídeo»,
 * que funciona SIEMPRE que haya JavaScript, sea o no elegible la reproducción
 * automática.
 *
 * A diferencia de la versión anterior, nunca borra ningún nodo del DOM: solo
 * alterna atributos (`data-intro-eligible` en `<html>`, `inert` en el panel y
 * en el envoltorio del hero). Evita por completo la clase de error de
 * hidratación que exigía aplazar el borrado del nodo en la versión anterior,
 * porque aquí no hay ningún borrado que aplazar.
 */
export function IntroScript({ t }: { t: Dictionary["a11y"] }) {
  const muteLabel = JSON.stringify(t.introMute);
  const unmuteLabel = JSON.stringify(t.introUnmute);
  const source = `(function(){
  var d=document.documentElement;
  var panel=document.querySelector('[data-intro-panel]');
  var heroContent=document.querySelector('[data-intro-hero-content]');
  var video=document.getElementById('mq-intro-video');
  var watchBtn=document.querySelector('[data-intro-watch]');
  if(!panel||!video||!watchBtn){return;}

  var muteBtn=panel.querySelector('[data-intro-mute]');
  var muteLabelEl=muteBtn.querySelector('[data-intro-mute-label]');
  var iconOff=muteBtn.querySelector('[data-intro-mute-icon-off]');
  var iconOn=muteBtn.querySelector('[data-intro-mute-icon-on]');
  var enterBtn=panel.querySelector('[data-intro-enter]');
  var srcMp4=document.getElementById('mq-intro-video-mp4');
  var srcWebm=document.getElementById('mq-intro-video-webm');
  var active=false;
  var started=false;
  var endedTimer=null;
  var closingTimer=null;

  function setMuteUi(){
    var muted=video.muted;
    muteBtn.setAttribute('aria-pressed',String(muted));
    if(muteLabelEl)muteLabelEl.textContent=muted?${unmuteLabel}:${muteLabel};
    if(iconOff)iconOff.style.display=muted?'':'none';
    if(iconOn)iconOn.style.display=muted?'none':'';
  }

  function activate(){
    if(active)return;active=true;
    if(endedTimer){clearTimeout(endedTimer);endedTimer=null;}
    if(closingTimer){clearTimeout(closingTimer);closingTimer=null;}
    d.removeAttribute('data-intro-closing');
    panel.inert=false;
    d.setAttribute('data-intro-eligible','');
    if(heroContent)heroContent.inert=true;
    watchBtn.hidden=true;
    video.muted=true;setMuteUi();
    if(!srcMp4.getAttribute('src')){
      srcMp4.setAttribute('src','/video/optimized/maisha-quest-intro-v2.mp4');
      srcWebm.setAttribute('src','/video/optimized/maisha-quest-intro-v2.webm');
    }
    video.currentTime=0;
    video.load();
    started=false;
    var played=video.play();
    if(played&&played.catch)played.catch(deactivate);
    setTimeout(function(){if(!started)deactivate();},4000);
  }

  function deactivate(){
    if(!active){
      // También puede llamarse antes de activar (fallo de red, por ejemplo):
      // asegura que la marca de elegibilidad no deja el panel a medio
      // activar en una recarga dentro de la misma sesión.
      d.removeAttribute('data-intro-eligible');
      panel.inert=true;
      watchBtn.hidden=false;
      return;
    }
    active=false;
    panel.inert=true;
    try{video.pause();}catch(e){}
    video.muted=true;setMuteUi();
    if(heroContent)heroContent.inert=false;
    watchBtn.hidden=false;
    // Transición breve: se desvanece con el panel todavía visible
    // (data-intro-closing), y solo al terminar se quita data-intro-eligible
    // -lo que de verdad lo saca del documento-. Cortarlo de golpe aquí mismo
    // sería un salto seco en vez de la transición breve que pide el encargo
    // al pulsar «Enter the website».
    d.setAttribute('data-intro-closing','');
    closingTimer=setTimeout(function(){
      closingTimer=null;
      d.removeAttribute('data-intro-eligible');
      d.removeAttribute('data-intro-closing');
    },360);
  }

  enterBtn.addEventListener('click',deactivate);
  muteBtn.addEventListener('click',function(){
    video.muted=!video.muted;setMuteUi();
  });
  watchBtn.addEventListener('click',activate);
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&active)deactivate();
  });
  video.addEventListener('playing',function(){started=true;});
  video.addEventListener('error',deactivate);
  video.addEventListener('ended',function(){
    // Transición natural: se deja un instante el fotograma final —el rótulo
    // incrustado en el propio archivo— antes de pasar al hero, en vez de un
    // corte seco en el mismo fotograma en que 'ended' dispara.
    endedTimer=setTimeout(deactivate,650);
  });

  // Elegible desde el guardián del <head>: arranca ya.
  if(d.hasAttribute('data-intro-eligible')){
    activate();
  }else{
    panel.inert=true;
    watchBtn.hidden=false;
  }
})();`;
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
