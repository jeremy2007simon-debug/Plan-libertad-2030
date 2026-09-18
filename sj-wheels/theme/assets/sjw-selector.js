/**
 * SJ Wheels — Selector de vehículo
 *
 * Cinco pasos encadenados: marca → modelo → generación → año → motorización.
 * Los pasos que no aportan información (una sola opción posible, o el dato no
 * existe para ese modelo) se ocultan solos, para no pedir al cliente cosas que
 * no cambian el resultado.
 *
 * Los datos salen siempre del catálogo de metaobjects publicado por Liquid.
 * Nunca se construye un vehículo a partir de la URL ni de texto libre.
 */
(function () {
  'use strict';

  function t(key, fallback) { return (window.SJWStrings || {})[key] || fallback; }
  function uniq(list) { return list.filter(function (v, i, a) { return v !== '' && v != null && a.indexOf(v) === i; }); }

  var STEPS = ['make', 'model', 'generation', 'year', 'engine'];

  class SJWVehicleSelector extends HTMLElement {
    connectedCallback() {
      this.catalog = this.loadCatalog();
      this.choice = {};
      this.fields = {};

      STEPS.forEach(function (step) {
        this.fields[step] = this.querySelector('[data-step="' + step + '"]');
      }, this);

      this.statusEl = this.querySelector('[data-sjw-selector-status]');
      this.emptyEl = this.querySelector('[data-sjw-selector-empty]');
      this.formEl = this.querySelector('[data-sjw-selector-form]');
      this.resetBtn = this.querySelector('[data-sjw-selector-reset]');
      this.submitBtn = this.querySelector('[data-sjw-selector-submit]');

      if (!this.catalog.length) { this.showEmptyCatalog(); return; }

      STEPS.forEach(function (step) {
        var field = this.fields[step];
        if (!field) return;
        field.addEventListener('change', this.onChange.bind(this, step));
      }, this);

      if (this.formEl) this.formEl.addEventListener('submit', this.onSubmit.bind(this));
      if (this.resetBtn) this.resetBtn.addEventListener('click', this.onReset.bind(this));

      this.addEventListener('focusin', this.announceStart.bind(this), { once: true });

      this.restore();
      this.render();
    }

    loadCatalog() {
      var el = document.getElementById('sjw-vehicle-catalog');
      if (!el) return [];
      try {
        var list = JSON.parse(el.textContent);
        return Array.isArray(list) ? list.filter(function (v) { return v && v.id && v.make && v.model; }) : [];
      } catch (e) { return []; }
    }

    announceStart() { window.SJWAnalytics.track('selector_iniciado', {}); }

    /* --- Filtrado encadenado ---------------------------------------------- */

    /** Vehículos que siguen encajando con lo elegido hasta el paso anterior. */
    candidates(upTo) {
      var self = this;
      return this.catalog.filter(function (v) {
        for (var i = 0; i < STEPS.length; i++) {
          var step = STEPS[i];
          if (step === upTo) break;
          var picked = self.choice[step];
          if (!picked) continue;
          if (step === 'year') {
            if (!self.yearMatches(v, picked)) return false;
          } else if (String(v[step] || '') !== String(picked)) {
            return false;
          }
        }
        return true;
      });
    }

    yearMatches(v, year) {
      var y = parseInt(year, 10);
      var start = parseInt(v.yearStart, 10) || 0;
      var end = parseInt(v.yearEnd, 10) || new Date().getFullYear();
      return y >= start && y <= end;
    }

    optionsFor(step) {
      var list = this.candidates(step);
      if (step === 'year') {
        var years = [];
        var cap = new Date().getFullYear() + 1;
        list.forEach(function (v) {
          var s = parseInt(v.yearStart, 10), e = parseInt(v.yearEnd, 10) || cap;
          if (!s) return;
          for (var y = s; y <= Math.min(e, cap); y++) if (years.indexOf(y) === -1) years.push(y);
        });
        return years.sort(function (a, b) { return b - a; }).map(String);
      }
      return uniq(list.map(function (v) { return v[step] || ''; })).sort(function (a, b) {
        return a.localeCompare(b, 'es', { numeric: true });
      });
    }

    /* --- Render ------------------------------------------------------------ */

    render() {
      var unlocked = true;

      STEPS.forEach(function (step) {
        var field = this.fields[step];
        if (!field) return;
        var wrapper = field.closest('[data-sjw-step-wrapper]');
        var options = unlocked ? this.optionsFor(step) : [];

        // Un paso sin opciones reales no se le pide al cliente.
        var relevant = options.length > 0;
        if (wrapper) wrapper.hidden = !relevant;
        if (!relevant) { this.choice[step] = ''; field.value = ''; return; }

        var current = this.choice[step] || '';
        field.innerHTML = '';
        var placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = t('step_' + step, field.dataset.placeholder || 'Selecciona');
        field.appendChild(placeholder);

        options.forEach(function (opt) {
          var o = document.createElement('option');
          o.value = opt;
          o.textContent = opt;
          if (opt === current) o.selected = true;
          field.appendChild(o);
        });

        // Si solo hay una opción posible, se elige sola.
        if (options.length === 1) {
          field.value = options[0];
          this.choice[step] = options[0];
        }

        field.disabled = false;
        if (!this.choice[step]) unlocked = false;
      }, this);

      var match = this.resolve();
      if (this.submitBtn) {
        this.submitBtn.disabled = !match;
        this.submitBtn.setAttribute('aria-disabled', String(!match));
      }
      if (this.resetBtn) this.resetBtn.hidden = !Object.keys(this.choice).some(function (k) { return this.choice[k]; }, this);
    }

    /** Devuelve el vehículo del catálogo que corresponde a lo elegido, o null. */
    resolve() {
      if (!this.choice.make || !this.choice.model) return null;
      var list = this.candidates(null);
      if (list.length !== 1) return null;
      var v = list[0];
      var picked = Object.assign({}, v);
      if (this.choice.year) picked.year = this.choice.year;
      return picked;
    }

    onChange(step, e) {
      this.choice[step] = e.target.value;
      // Reiniciar los pasos posteriores.
      var from = STEPS.indexOf(step);
      STEPS.slice(from + 1).forEach(function (s) { this.choice[s] = ''; }, this);
      this.render();
    }

    onReset(e) {
      e.preventDefault();
      this.choice = {};
      window.SJWGarage.clear();
      window.SJWAnalytics.track('vehiculo_eliminado', {});
      this.setStatus('');
      this.render();
    }

    onSubmit(e) {
      e.preventDefault();
      var vehicle = this.resolve();
      if (!vehicle) return;

      var previous = window.SJWGarage.get();
      this.showSkeleton();

      // Pequeña espera para que el cambio de estado sea perceptible y el
      // lector de pantalla llegue a anunciarlo.
      window.setTimeout(function () {
        window.SJWGarage.set(vehicle, previous ? 'change' : 'set');
        window.SJWAnalytics.track(previous ? 'vehiculo_cambiado' : 'vehiculo_seleccionado', {
          make: vehicle.make, model: vehicle.model, generation: vehicle.generation,
          year: vehicle.year, engine: vehicle.engine, verificacion: vehicle.verification
        });
        this.hideSkeleton();
        this.setStatus(t('vehicle_saved', 'Vehículo guardado') + ': ' + window.SJWGarage.label(vehicle));
        var redirect = this.dataset.redirect;
        if (redirect) window.location.href = redirect;
      }.bind(this), 220);
    }

    /* --- Estados ----------------------------------------------------------- */

    showSkeleton() {
      if (this.formEl) this.formEl.setAttribute('aria-busy', 'true');
      this.querySelectorAll('[data-sjw-step-wrapper]:not([hidden]) .sjw-select').forEach(function (el) {
        el.classList.add('sjw-skel');
      });
    }

    hideSkeleton() {
      if (this.formEl) this.formEl.removeAttribute('aria-busy');
      this.querySelectorAll('.sjw-select').forEach(function (el) { el.classList.remove('sjw-skel'); });
    }

    setStatus(message) {
      if (this.statusEl) this.statusEl.textContent = message;
    }

    showEmptyCatalog() {
      if (this.formEl) this.formEl.hidden = true;
      if (this.emptyEl) this.emptyEl.hidden = false;
      window.SJWAnalytics.track('busqueda_sin_resultados', { motivo: 'catalogo_de_vehiculos_vacio' });
    }

    /** Restaura el vehículo guardado o el que venga en la URL. */
    restore() {
      var id = window.SJWGarage.idFromUrl();
      var saved = window.SJWGarage.get();
      var target = null;

      if (id) target = this.catalog.find(function (v) { return v.id === id; }) || null;
      if (!target && saved) target = this.catalog.find(function (v) { return v.id === saved.id; }) || null;
      if (!target) return;

      this.choice = {
        make: target.make, model: target.model,
        generation: target.generation || '', engine: target.engine || '',
        year: (saved && saved.id === target.id && saved.year) ? String(saved.year) : ''
      };

      // Un vehículo llegado por URL se guarda con su ficha real del catálogo.
      if (id && (!saved || saved.id !== target.id)) {
        window.SJWGarage.set(Object.assign({}, target, { year: this.choice.year }), 'url');
      }
    }
  }

  if (!customElements.get('sjw-vehicle-selector')) {
    customElements.define('sjw-vehicle-selector', SJWVehicleSelector);
  }
})();
