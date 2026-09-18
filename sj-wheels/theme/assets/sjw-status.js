/**
 * SJ Wheels — Pintado del estado de compatibilidad
 *
 * Recorre la página, evalúa cada producto contra el vehículo guardado y
 * actualiza badges, etiquetas de vehículo y el bloqueo de compra.
 * Se vuelve a ejecutar cada vez que cambia el vehículo o se carga contenido
 * nuevo (filtros, paginación).
 */
(function () {
  'use strict';

  function t(key, fallback) {
    var dict = window.SJWStrings || {};
    return dict[key] || fallback;
  }

  var PRESENTATION = {
    ok:      { cls: 'sjw-badge--ok',      key: 'fitment_ok',      text: 'Compatible con tu vehículo' },
    pending: { cls: 'sjw-badge--pending', key: 'fitment_pending', text: 'Necesita confirmación técnica' },
    no:      { cls: 'sjw-badge--error',   key: 'fitment_no',      text: 'No compatible con tu vehículo' },
    unknown: { cls: 'sjw-badge--neutral', key: 'fitment_unknown', text: 'Selecciona tu vehículo' }
  };

  var ICONS = {
    ok:      '<path d="M3.5 8.4l3 3 6-6.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
    pending: '<path d="M8 1.8l6.4 11.4H1.6L8 1.8z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6.3v3.1M8 11.3v.15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    no:      '<circle cx="8" cy="8" r="6.4" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.6 5.6l4.8 4.8M10.4 5.6l-4.8 4.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    unknown: '<circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 4.75v4M8 11.1v.15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'
  };

  /** Busca la ficha técnica del producto asociada a un badge. */
  function dataFor(productId, scope) {
    var sel = '.sjw-fitment-data[data-product-id="' + productId + '"]';
    var el = (scope || document).querySelector(sel) || document.querySelector(sel);
    return window.SJWFitment.readProduct(el);
  }

  function paintBadge(badge, status) {
    var p = PRESENTATION[status] || PRESENTATION.unknown;
    badge.classList.remove('sjw-badge--ok', 'sjw-badge--pending', 'sjw-badge--error', 'sjw-badge--neutral');
    badge.classList.add(p.cls);
    badge.dataset.status = status;
    var icon = badge.querySelector('.sjw-badge__icon');
    if (icon) icon.innerHTML = ICONS[status] || ICONS.unknown;
    var label = badge.querySelector('.sjw-fitment-badge__text');
    if (label) label.textContent = t(p.key, p.text);
  }

  function refresh(root) {
    var scope = root || document;
    var vehicle = window.SJWGarage.get();
    var seen = {};

    scope.querySelectorAll('[data-sjw-fitment-badge]').forEach(function (badge) {
      var id = badge.dataset.productId;
      var product = dataFor(id, scope);
      if (!product) { paintBadge(badge, 'unknown'); return; }

      var result = window.SJWFitment.evaluate(product, vehicle);
      paintBadge(badge, result.status);
      badge.closest('[data-sjw-product]')?.setAttribute('data-fitment', result.status);

      // Un solo evento por producto y carga de página.
      if (vehicle && !seen[id]) {
        seen[id] = true;
        var evt = { ok: 'producto_compatible_visto', pending: 'producto_pendiente_visto', no: 'producto_incompatible_visto' }[result.status];
        if (evt && badge.closest('[data-sjw-product-main]')) {
          window.SJWAnalytics.track(evt, { sku: product.sku, handle: product.handle });
        }
      }
    });

    // Etiquetas "tu vehículo" repartidas por la tienda.
    var label = window.SJWGarage.label(vehicle);
    scope.querySelectorAll('[data-sjw-vehicle-label]').forEach(function (el) {
      el.textContent = label || t('no_vehicle', 'Sin vehículo seleccionado');
    });
    scope.querySelectorAll('[data-sjw-has-vehicle]').forEach(function (el) { el.hidden = !vehicle; });
    scope.querySelectorAll('[data-sjw-no-vehicle]').forEach(function (el) { el.hidden = !!vehicle; });
  }

  document.addEventListener('DOMContentLoaded', function () { refresh(); });
  document.addEventListener('sjw:vehicle:change', function () { refresh(); });
  // Horizon vuelve a renderizar secciones al filtrar o paginar.
  document.addEventListener('shopify:section:load', function (e) { refresh(e.target); });

  window.SJWStatus = { refresh: refresh, paintBadge: paintBadge };
})();
