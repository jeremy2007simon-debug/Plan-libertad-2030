/**
 * SJ Wheels — Asistente de compatibilidad (cliente).
 *
 * Habla con /api/chat por SSE y pinta la conversación. Todo el criterio vive
 * en el servidor: aquí no se decide nada sobre llantas ni se guarda nada del
 * cliente más allá de la pestaña abierta.
 *
 * Tres cosas que no son adorno:
 *  · El historial se manda entero en cada petición y vive solo en memoria.
 *    Al cerrar la pestaña desaparece. No hay cookie ni almacenamiento.
 *  · Mientras el modelo consulta una herramienta se avisa en pantalla. Sin
 *    eso, una comprobación de 83 referencias parece que se ha colgado.
 *  · El texto entra como texto, nunca como HTML. Lo que devuelve el modelo no
 *    se inyecta en el DOM sin escapar.
 */
(function () {
  'use strict';

  var raiz = document.querySelector('[data-sjw-asistente]');
  if (!raiz) return;

  var extremo = raiz.getAttribute('data-endpoint');
  if (!extremo) return;

  var panel = raiz.querySelector('[data-sjw-panel]');
  var abrir = raiz.querySelector('[data-sjw-abrir]');
  var cerrar = raiz.querySelector('[data-sjw-cerrar]');
  var hilo = raiz.querySelector('[data-sjw-hilo]');
  var form = raiz.querySelector('[data-sjw-form]');
  var campo = raiz.querySelector('[data-sjw-campo]');
  var enviar = raiz.querySelector('[data-sjw-enviar]');
  var estado = raiz.querySelector('[data-sjw-estado]');

  var mensajes = [];
  var ocupado = false;
  var ultimoFoco = null;

  function burbuja(quien, texto) {
    var li = document.createElement('li');
    li.className = 'sjw-chat__msg sjw-chat__msg--' + quien;
    var p = document.createElement('p');
    p.textContent = texto;
    li.appendChild(p);
    hilo.appendChild(li);
    hilo.scrollTop = hilo.scrollHeight;
    return p;
  }

  /* Los enlaces que propone el asistente son rutas de la propia tienda.
     Se convierten en enlaces reales solo si empiezan por "/", nunca si
     traen un dominio: así no se puede sacar a nadie fuera desde el chat. */
  function enlazar(p) {
    var partes = p.textContent.split(/(\/(?:products|collections|pages)\/[^\s,)]+)/g);
    if (partes.length < 2) return;
    p.textContent = '';
    partes.forEach(function (trozo, i) {
      if (i % 2 === 1) {
        var a = document.createElement('a');
        a.href = trozo;
        a.textContent = trozo;
        p.appendChild(a);
      } else if (trozo) {
        p.appendChild(document.createTextNode(trozo));
      }
    });
  }

  function aviso(texto) {
    estado.textContent = texto || '';
  }

  function bloquear(si) {
    ocupado = si;
    campo.disabled = si;
    enviar.disabled = si;
  }

  async function preguntar(texto) {
    mensajes.push({ rol: 'user', texto: texto });
    burbuja('cliente', texto);
    bloquear(true);
    aviso(raiz.getAttribute('data-txt-pensando'));

    var destino = burbuja('asistente', '');
    var acumulado = '';

    try {
      var respuesta = await fetch(extremo, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensajes: mensajes })
      });
      if (!respuesta.ok || !respuesta.body) throw new Error('HTTP ' + respuesta.status);

      var lector = respuesta.body.getReader();
      var decodificador = new TextDecoder();
      var resto = '';

      while (true) {
        var trozo = await lector.read();
        if (trozo.done) break;
        resto += decodificador.decode(trozo.value, { stream: true });

        var bloques = resto.split('\n\n');
        resto = bloques.pop() || '';

        for (var i = 0; i < bloques.length; i++) {
          var lineas = bloques[i].split('\n');
          var tipo = '';
          var datos = '';
          for (var j = 0; j < lineas.length; j++) {
            if (lineas[j].indexOf('event: ') === 0) tipo = lineas[j].slice(7);
            else if (lineas[j].indexOf('data: ') === 0) datos = lineas[j].slice(6);
          }
          if (!tipo) continue;
          var valor;
          try { valor = JSON.parse(datos); } catch (e) { continue; }

          if (tipo === 'texto') {
            acumulado += valor;
            destino.textContent = acumulado;
            hilo.scrollTop = hilo.scrollHeight;
            aviso('');
          } else if (tipo === 'herramienta') {
            aviso(raiz.getAttribute('data-txt-consultando'));
          } else if (tipo === 'aviso') {
            acumulado = acumulado ? acumulado + '\n\n' + valor : valor;
            destino.textContent = acumulado;
          }
        }
      }
    } catch (e) {
      if (!acumulado) {
        acumulado = raiz.getAttribute('data-txt-error');
        destino.textContent = acumulado;
      }
    } finally {
      aviso('');
      bloquear(false);
      if (acumulado) {
        enlazar(destino);
        mensajes.push({ rol: 'assistant', texto: acumulado });
      }
      campo.focus();
    }
  }

  function abrirPanel() {
    ultimoFoco = document.activeElement;
    panel.hidden = false;
    abrir.setAttribute('aria-expanded', 'true');
    if (!hilo.children.length) burbuja('asistente', raiz.getAttribute('data-txt-saludo'));
    campo.focus();
  }

  function cerrarPanel() {
    panel.hidden = true;
    abrir.setAttribute('aria-expanded', 'false');
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }

  abrir.addEventListener('click', function () {
    if (panel.hidden) abrirPanel(); else cerrarPanel();
  });
  cerrar.addEventListener('click', cerrarPanel);

  raiz.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) { e.stopPropagation(); cerrarPanel(); }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var texto = campo.value.trim();
    if (!texto || ocupado) return;
    campo.value = '';
    preguntar(texto);
  });

  /* El banner de cookies de Shopify se pone por delante de todo (z-index dos
     millones). En escritorio va centrado y no llega al botón; en móvil ocupa
     la franja de abajo entera y lo tapa: el cliente no puede abrir el
     asistente hasta que responde a las cookies. Subir el z-index sería la
     salida fácil y la equivocada —el aviso legal tiene que quedar delante—,
     así que el asistente se aparta, y vuelve a su sitio cuando el banner se va.

     Ojo con medir «está visible»: offsetParent vale null en cualquier elemento
     position: fixed, y el banner lo es. Se mide por caja y por estilo. */
  var ANCLAS = ['#shopify-pc__banner', '.shopify-pc__banner__dialog'];
  var MARGEN = 16;

  function visible(el) {
    if (!el) return false;
    var cs = window.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
    var c = el.getBoundingClientRect();
    return c.height > 0 && c.width > 0;
  }

  /* Cuánto hay que subir el botón para librar lo que lo tapa. Se calcula con
     el borde superior del estorbo, no con su altura, y solo cuenta si además
     se cruzan en horizontal: así el banner centrado de escritorio no mueve
     nada. Nada de esto depende del hueco actual, así que no se realimenta. */
  function huecoNecesario() {
    var lr = abrir.getBoundingClientRect();
    var falta = 0;
    for (var i = 0; i < ANCLAS.length; i++) {
      var el = document.querySelector(ANCLAS[i]);
      if (!visible(el)) continue;
      var c = el.getBoundingClientRect();
      if (c.bottom < window.innerHeight - 4) continue;       // no está pegado abajo
      if (c.left >= lr.right || c.right <= lr.left) continue; // no se cruzan en horizontal
      falta = Math.max(falta, Math.ceil(window.innerHeight - c.top + MARGEN));
    }
    return falta;
  }

  var huecoActual = -1;
  function ajustaHueco() {
    var falta = huecoNecesario();
    /* Si para librarlo hubiera que subir el botón más de media pantalla, no
       hay sitio: mientras el aviso esté delante, el asistente se quita de en
       medio. Es un estado temporal, y el aviso manda. */
    var sinSitio = falta > window.innerHeight * 0.5;
    if (falta === huecoActual) return;
    huecoActual = falta;
    raiz.style.setProperty('--sjw-chat-hueco', sinSitio ? '0px' : falta + 'px');
    /* Con el panel abierto no se esconde nada: el cliente está escribiendo. */
    raiz.classList.toggle('sjw-chat--aparcado', sinSitio && panel.hidden);
  }

  ajustaHueco();
  window.addEventListener('resize', ajustaHueco);
  window.addEventListener('scroll', ajustaHueco, { passive: true });
  /* El banner aparece y desaparece solo, después de cargar la página. */
  if (window.MutationObserver) {
    new MutationObserver(ajustaHueco).observe(document.body, { childList: true, subtree: true });
  }

  /* Si la ficha de producto tiene una variante elegida, la primera pregunta
     ya llega con su referencia: el cliente no tiene que copiarla a mano. */
  var ficha = document.querySelector('[data-sjw-sku]');
  if (ficha && ficha.getAttribute('data-sjw-sku')) {
    raiz.setAttribute(
      'data-txt-saludo',
      raiz.getAttribute('data-txt-saludo-producto').replace('[SKU]', ficha.getAttribute('data-sjw-sku'))
    );
  }
})();
