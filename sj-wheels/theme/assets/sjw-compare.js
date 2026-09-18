/**
 * SJ Wheels — Comparador de llantas
 *
 * Guarda hasta N llantas y las muestra en un panel lateral.
 * Compara solo datos objetivos: medidas, precio, plazo y compatibilidad con el
 * vehículo guardado. No recomienda una opción sobre otra ni puntúa nada.
 *
 * Las fichas se guardan enteras al añadirlas, leyéndolas del JSON que ya publica
 * Liquid en la tarjeta. Así el panel no necesita ninguna petición de red.
 */
(function () {
  'use strict';

  var KEY = 'sjw_compare_v1';
  function t(k, f) { return (window.SJWStrings || {})[k] || f; }

  function read() {
    try {
      var v = JSON.parse(window.localStorage.getItem(KEY));
      return Array.isArray(v) ? v.filter(function (x) { return x && x.handle; }) : [];
    } catch (e) { return []; }
  }
  function write(list) {
    try { window.localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
    document.dispatchEvent(new CustomEvent('sjw:compare:change', { detail: { list: list } }));
  }

  var Compare = {
    max: 3,
    list: read,
    clear: function () { write([]); },
    remove: function (handle) {
      write(read().filter(function (x) { return x.handle !== handle; }));
      window.SJWAnalytics.track('comparador_quitar', { handle: handle });
    },
    add: function (item) {
      var list = read();
      if (list.some(function (x) { return x.handle === item.handle; })) return true;
      if (list.length >= Compare.max) { return false; }
      list.push(item);
      write(list);
      window.SJWAnalytics.track('comparador_anadir', { handle: item.handle });
      return true;
    }
  };

  /** Lee la ficha técnica y los datos visibles de la tarjeta que contiene el botón. */
  function itemFrom(btn) {
    var card = btn.closest('[data-sjw-product]') || document;
    var data = window.SJWFitment.readProduct(card.querySelector('.sjw-fitment-data')) || {};
    var img = card.closest('.shopify-section, li, article, div')?.querySelector('img');
    return {
      handle: btn.dataset.handle,
      title: data.title || btn.dataset.handle,
      sku: data.sku || '',
      image: img ? img.currentSrc || img.src : '',
      price: btn.dataset.price || '',
      diameter: data.diameter, width: data.width, boltPattern: data.boltPattern,
      et: data.et, centerBore: data.centerBore, finish: data.finish,
      unitsPerSet: data.unitsPerSet,
      requiresManualVerification: data.requiresManualVerification,
      vehicleIds: data.vehicleIds || []
    };
  }

  /* --- Panel -------------------------------------------------------------- */

  var ROWS = [
    ['diameter',   'spec_diameter', 'Diámetro',      function (v) { return v ? v + '"' : null; }],
    ['width',      'spec_width',    'Anchura',       function (v) { return v ? v + '"' : null; }],
    ['boltPattern','spec_pcd',      'PCD',           function (v) { return v || null; }],
    ['et',         'spec_et',       'ET',            function (v) { return v == null ? null : 'ET ' + v; }],
    ['centerBore', 'spec_bore',     'Buje central',  function (v) { return v ? v + ' mm' : null; }],
    ['finish',     'spec_finish',   'Acabado',       function (v) { return v || null; }],
    ['unitsPerSet','spec_units',    'Unidades',      function (v) { return v || null; }]
  ];

  function render(panel) {
    var list = read();
    var body = panel.querySelector('[data-sjw-compare-body]');
    if (!list.length) {
      body.innerHTML = '<div class="sjw-empty"><p class="sjw-body">' +
        t('compare_empty', 'Añade hasta 3 llantas para compararlas.') + '</p></div>';
      return;
    }
    var vehicle = window.SJWGarage.get();
    var html = '<table class="sjw-cmp"><caption class="sjw-visually-hidden">' +
      t('compare_title', 'Comparador de llantas') + '</caption><thead><tr><td></td>';

    list.forEach(function (it) {
      html += '<th scope="col"><div class="sjw-cmp__head">' +
        (it.image ? '<img src="' + it.image + '" alt="" width="96" height="96" loading="lazy">' : '') +
        '<span class="sjw-cmp__title">' + esc(it.title) + '</span>' +
        (it.sku ? '<span class="sjw-small sjw-mono">' + esc(it.sku) + '</span>' : '') +
        '<button type="button" class="sjw-btn sjw-btn--ghost sjw-btn--sm" data-sjw-compare-remove="' +
        esc(it.handle) + '">' + t('compare_remove', 'Quitar') + '</button>' +
        '</div></th>';
    });
    html += '</tr></thead><tbody>';

    // Fila de compatibilidad
    html += '<tr><th scope="row">' + t('compare_fit', 'Compatibilidad') + '</th>';
    list.forEach(function (it) {
      var r = window.SJWFitment.evaluate(it, vehicle);
      var map = { ok: ['sjw-badge--ok', t('fitment_ok', 'Compatible')],
                  pending: ['sjw-badge--pending', t('fitment_pending', 'Necesita confirmación técnica')],
                  no: ['sjw-badge--error', t('fitment_no', 'No compatible')],
                  unknown: ['sjw-badge--neutral', t('fitment_unknown', 'Selecciona tu vehículo')] };
      var p = map[r.status] || map.unknown;
      html += '<td><span class="sjw-badge ' + p[0] + '">' + p[1] + '</span></td>';
    });
    html += '</tr>';

    // Filas técnicas. Se marcan las que difieren entre las llantas comparadas.
    ROWS.forEach(function (row) {
      var vals = list.map(function (it) { return row[3](it[row[0]]); });
      var differs = new Set(vals.map(String)).size > 1;
      html += '<tr' + (differs ? ' class="is-diff"' : '') + '><th scope="row">' +
              t(row[1], row[2]) + '</th>';
      vals.forEach(function (v) {
        html += '<td>' + (v == null ? '<span class="sjw-spec__v--empty">' +
                t('pending_data', 'Pendiente de confirmar') + '</span>' : esc(String(v))) + '</td>';
      });
      html += '</tr>';
    });

    html += '</tbody></table>';
    body.innerHTML = html;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function syncButtons(root) {
    var handles = read().map(function (x) { return x.handle; });
    (root || document).querySelectorAll('[data-sjw-compare-toggle]').forEach(function (btn) {
      var on = handles.indexOf(btn.dataset.handle) !== -1;
      btn.setAttribute('aria-pressed', String(on));
      btn.textContent = on ? t('compare_remove', 'Quitar del comparador') : t('compare_add', 'Comparar');
    });
    document.querySelectorAll('[data-sjw-compare-count]').forEach(function (el) { el.textContent = handles.length; });
    document.querySelectorAll('[data-sjw-compare-open]').forEach(function (el) { el.hidden = handles.length === 0; });
    var panel = document.querySelector('[data-sjw-compare-panel]');
    if (panel && panel.classList.contains('is-open')) render(panel);
  }

  /* --- Interacción --------------------------------------------------------- */

  var lastFocus = null;

  function openPanel() {
    var panel = document.querySelector('[data-sjw-compare-panel]');
    var overlay = document.querySelector('[data-sjw-compare-overlay]');
    if (!panel) return;
    lastFocus = document.activeElement;
    render(panel);
    panel.classList.add('is-open');
    panel.removeAttribute('hidden');
    if (overlay) overlay.classList.add('is-open');
    panel.querySelector('[data-sjw-compare-close]')?.focus();
    document.addEventListener('keydown', onEsc);
  }

  function closePanel() {
    var panel = document.querySelector('[data-sjw-compare-panel]');
    var overlay = document.querySelector('[data-sjw-compare-overlay]');
    if (!panel) return;
    panel.classList.remove('is-open');
    panel.setAttribute('hidden', '');
    if (overlay) overlay.classList.remove('is-open');
    document.removeEventListener('keydown', onEsc);
    lastFocus?.focus();
  }

  function onEsc(e) { if (e.key === 'Escape') closePanel(); }

  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('[data-sjw-compare-toggle]');
    if (toggle) {
      e.preventDefault();
      var handles = read().map(function (x) { return x.handle; });
      if (handles.indexOf(toggle.dataset.handle) !== -1) Compare.remove(toggle.dataset.handle);
      else if (!Compare.add(itemFrom(toggle))) window.alert(t('compare_full', 'Ya has añadido el máximo de llantas a comparar.'));
      return;
    }
    var rm = e.target.closest('[data-sjw-compare-remove]');
    if (rm) { Compare.remove(rm.dataset.sjwCompareRemove); return; }
    if (e.target.closest('[data-sjw-compare-open]')) { openPanel(); return; }
    if (e.target.closest('[data-sjw-compare-close]') || e.target.closest('[data-sjw-compare-overlay]')) { closePanel(); return; }
    if (e.target.closest('[data-sjw-compare-clear]')) { Compare.clear(); closePanel(); }
  });

  document.addEventListener('sjw:compare:change', function () { syncButtons(); });
  document.addEventListener('sjw:vehicle:change', function () { syncButtons(); });
  document.addEventListener('DOMContentLoaded', function () {
    var cfg = document.querySelector('[data-sjw-compare-max]');
    if (cfg) Compare.max = parseInt(cfg.dataset.sjwCompareMax, 10) || 3;
    syncButtons();
  });
  document.addEventListener('shopify:section:load', function (e) { syncButtons(e.target); });

  window.SJWCompare = Compare;
})();
