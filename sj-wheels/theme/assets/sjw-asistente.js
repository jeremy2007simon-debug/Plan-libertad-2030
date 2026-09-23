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
