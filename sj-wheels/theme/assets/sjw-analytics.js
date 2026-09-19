/**
 * SJ Wheels — Eventos de analítica
 *
 * Emite eventos en un formato neutro para que el propietario los conecte a la
 * herramienta que use. NUNCA se envían datos personales: solo marca, modelo,
 * año, motorización, referencia de producto y estado de compatibilidad.
 */
(function () {
  'use strict';

  var ALLOWED = [
    'selector_iniciado', 'vehiculo_seleccionado', 'vehiculo_cambiado', 'vehiculo_eliminado',
    'busqueda_completada', 'busqueda_sin_resultados',
    'producto_compatible_visto', 'producto_pendiente_visto', 'producto_incompatible_visto',
    'comparador_anadir', 'comparador_quitar',
    'whatsapp_click', 'anadir_al_carrito', 'error_compatibilidad', 'checkout_iniciado'
  ];

  // Campos que jamás se envían, aunque alguien los pase por error.
  var BLOCKED = ['email', 'phone', 'telefono', 'nombre', 'name', 'address', 'direccion', 'matricula', 'vin'];

  function scrub(payload) {
    var clean = {};
    Object.keys(payload || {}).forEach(function (k) {
      if (BLOCKED.indexOf(k.toLowerCase()) !== -1) return;
      var v = payload[k];
      if (v === null || v === undefined || v === '') return;
      clean[k] = v;
    });
    return clean;
  }

  function track(name, payload) {
    if (ALLOWED.indexOf(name) === -1) return;
    var data = scrub(payload);

    document.dispatchEvent(new CustomEvent('sjw:analytics', { detail: { event: name, data: data } }));

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: 'sjw_' + name }, data));
    }
  }

  /* Se vacía la cola que dejó el arranque temprano del <head>. */
  var pendientes = (window.SJWAnalytics && window.SJWAnalytics._cola) || [];
  window.SJWAnalytics = { track: track, events: ALLOWED };
  pendientes.forEach(function (e) { track(e[0], e[1]); });
})();
