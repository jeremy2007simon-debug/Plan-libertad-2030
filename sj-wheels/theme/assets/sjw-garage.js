/**
 * SJ Wheels — Garaje
 *
 * Guarda el vehículo seleccionado por el cliente y avisa al resto de la tienda
 * cuando cambia. No guarda ningún dato personal: solo la ficha técnica pública
 * del vehículo elegido, que ya es visible en el catálogo.
 *
 * Almacenamiento: localStorage. Si el navegador lo bloquea (modo privado,
 * cookies restringidas) todo sigue funcionando en memoria durante la visita.
 */
(function () {
  'use strict';

  var KEY = 'sjw_vehicle_v1';
  var memory = null;          // respaldo si localStorage no está disponible
  var storageWorks = true;

  function read() {
    if (!storageWorks) return memory;
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      storageWorks = false;
      return memory;
    }
  }

  function write(vehicle) {
    memory = vehicle;
    if (!storageWorks) return;
    try {
      if (vehicle) window.localStorage.setItem(KEY, JSON.stringify(vehicle));
      else window.localStorage.removeItem(KEY);
    } catch (e) {
      storageWorks = false;
    }
  }

  function announce(vehicle, reason) {
    document.dispatchEvent(
      new CustomEvent('sjw:vehicle:change', { detail: { vehicle: vehicle, reason: reason } })
    );
  }

  var Garage = {
    /** Devuelve el vehículo guardado o null. */
    get: function () {
      var v = read();
      return v && v.id ? v : null;
    },

    /** Guarda el vehículo y avisa a la tienda. */
    set: function (vehicle, reason) {
      if (!vehicle || !vehicle.id) return null;
      write(vehicle);
      announce(vehicle, reason || 'set');
      return vehicle;
    },

    /** Borra el vehículo guardado. */
    clear: function () {
      write(null);
      announce(null, 'clear');
    },

    /** Texto corto para cabecera, carrito y chips. */
    label: function (vehicle) {
      var v = vehicle || Garage.get();
      if (!v) return '';
      var parts = [v.make, v.model];
      if (v.generation) parts.push(v.generation);
      if (v.year) parts.push(v.year);
      if (v.engine) parts.push(v.engine);
      return parts.filter(Boolean).join(' · ');
    },

    /** Escucha cambios. Devuelve una función para dejar de escuchar. */
    subscribe: function (handler) {
      function on(e) { handler(e.detail.vehicle, e.detail.reason); }
      document.addEventListener('sjw:vehicle:change', on);
      return function () { document.removeEventListener('sjw:vehicle:change', on); };
    },

    /** true si el almacenamiento persistente funciona en este navegador. */
    isPersistent: function () { return storageWorks; }
  };

  /* --- URL compartible -----------------------------------------------------
     ?vehiculo=<id de metaobject> permite compartir un resultado. La ficha
     completa se resuelve contra el catálogo de vehículos que publica la página;
     nunca se confía en datos técnicos que vengan en la URL.                   */
  Garage.idFromUrl = function () {
    try {
      return new URLSearchParams(window.location.search).get('vehiculo');
    } catch (e) { return null; }
  };

  Garage.shareUrl = function (vehicle) {
    var v = vehicle || Garage.get();
    if (!v) return window.location.href;
    try {
      var url = new URL(window.location.href);
      url.searchParams.set('vehiculo', v.id);
      return url.toString();
    } catch (e) { return window.location.href; }
  };

  window.SJWGarage = Garage;
})();
