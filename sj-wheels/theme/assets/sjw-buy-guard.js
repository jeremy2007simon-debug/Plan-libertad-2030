/**
 * SJ Wheels — Guardia de compra
 *
 * Su única misión es que nadie compre unas llantas que no le encajan.
 *
 *   No compatible  → se bloquea la compra y se ofrecen alternativas.
 *   Sin vehículo   → se bloquea hasta que el cliente indique su coche.
 *   Pendiente      → se permite comprar SOLO tras confirmar los datos, y queda
 *                    marcado en el pedido como sujeto a revisión previa al envío.
 *                    El propietario puede cambiarlo a "solo consulta" desde el
 *                    personalizador.
 *
 * Todo lo que el cliente confirma viaja al pedido como propiedades de línea,
 * para que quien prepare el envío vea exactamente qué se comprobó.
 */
(function () {
  'use strict';

  function t(key, fallback) { return (window.SJWStrings || {})[key] || fallback; }

  class SJWBuyGuard extends HTMLElement {
    connectedCallback() {
      this.mode = this.dataset.pendingMode || 'allow';   // 'allow' | 'inquire'
      this.form = document.querySelector(this.dataset.formSelector || 'form[action*="/cart/add"]');
      this.dataEl = this.querySelector('.sjw-fitment-data') ||
                    document.querySelector('.sjw-fitment-data[data-product-id="' + this.dataset.productId + '"]');
      this.confirmWrap = this.querySelector('[data-sjw-confirm-wrap]');
      this.confirmBox = this.querySelector('[data-sjw-confirm]');
      this.messageEl = this.querySelector('[data-sjw-guard-message]');
      this.blockedEl = this.querySelector('[data-sjw-guard-blocked]');

      if (!this.form) return;
      this.submit = this.form.querySelector('[type="submit"], button[name="add"]');

      this.ensureProperties();
      if (this.confirmBox) this.confirmBox.addEventListener('change', this.apply.bind(this));
      this.form.addEventListener('submit', this.onSubmit.bind(this));

      window.SJWGarage.subscribe(this.apply.bind(this));
      this.apply();
    }

    /** Crea los campos ocultos que viajan al pedido como propiedades de línea. */
    ensureProperties() {
      this.props = {};
      ['Vehículo', 'Compatibilidad', 'Confirmación del cliente', 'Referencia'].forEach(function (name) {
        var input = this.form.querySelector('input[name="properties[' + name + ']"]');
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'properties[' + name + ']';
          this.form.appendChild(input);
        }
        this.props[name] = input;
      }, this);
    }

    state() {
      var product = window.SJWFitment.readProduct(this.dataEl);
      var vehicle = window.SJWGarage.get();
      if (!product) return { status: 'unknown', product: null, vehicle: vehicle };
      var result = window.SJWFitment.evaluate(product, vehicle);
      return { status: result.status, result: result, product: product, vehicle: vehicle };
    }

    apply() {
      var s = this.state();
      var blocked = false;
      var message = '';

      if (s.status === 'no') {
        blocked = true;
        message = t('guard_blocked', 'Estas llantas no encajan con las medidas de tu vehículo. No permitimos comprarlas para evitar un error.');
        window.SJWAnalytics.track('error_compatibilidad', { sku: s.product && s.product.sku });
      } else if (s.status === 'unknown') {
        blocked = true;
        message = t('guard_no_vehicle', 'Indica tu vehículo para poder comprobar que estas llantas le encajan.');
      } else if (s.status === 'pending' && this.mode === 'inquire') {
        blocked = true;
        message = t('guard_inquire', 'Estas llantas necesitan confirmación técnica. Escríbenos y las revisamos contigo.');
      } else if (s.status === 'pending') {
        message = t('guard_pending', 'Revisaremos la compatibilidad antes del envío. Confirma los datos de tu vehículo para continuar.');
      }

      // La casilla de confirmación solo aparece cuando hay algo que confirmar.
      var needsConfirm = !blocked && !!s.vehicle;
      if (this.confirmWrap) this.confirmWrap.hidden = !needsConfirm;
      if (this.messageEl) {
        this.messageEl.textContent = message;
        this.messageEl.hidden = !message;
      }
      if (this.blockedEl) this.blockedEl.hidden = !blocked;

      var confirmed = !needsConfirm || (this.confirmBox && this.confirmBox.checked);
      var disable = blocked || !confirmed;

      if (this.submit) {
        this.submit.disabled = disable;
        this.submit.setAttribute('aria-disabled', String(disable));
      }

      this.writeProperties(s);
      this.dataset.status = s.status;
    }

    writeProperties(s) {
      if (!this.props) return;
      var labels = {
        ok: t('fitment_ok', 'Compatible con tu vehículo'),
        pending: t('fitment_pending', 'Necesita confirmación técnica'),
        no: t('fitment_no', 'No compatible con tu vehículo'),
        unknown: ''
      };
      this.props['Vehículo'].value = s.vehicle ? window.SJWGarage.label(s.vehicle) : '';
      this.props['Compatibilidad'].value = labels[s.status] || '';
      this.props['Referencia'].value = (s.product && s.product.sku) || '';
      this.props['Confirmación del cliente'].value =
        (this.confirmBox && this.confirmBox.checked) ? t('guard_confirmed', 'Datos del vehículo confirmados por el cliente') : '';

      // Shopify ignora las propiedades vacías, así que no ensucian el pedido.
      Object.keys(this.props).forEach(function (k) {
        this.props[k].disabled = !this.props[k].value;
      }, this);
    }

    onSubmit(e) {
      var s = this.state();
      if (s.status === 'no' || s.status === 'unknown' || (s.status === 'pending' && this.mode === 'inquire')) {
        e.preventDefault();
        this.apply();
        if (this.messageEl) this.messageEl.focus?.();
        return;
      }
      if (this.confirmWrap && !this.confirmWrap.hidden && this.confirmBox && !this.confirmBox.checked) {
        e.preventDefault();
        this.confirmBox.focus();
        return;
      }
      window.SJWAnalytics.track('anadir_al_carrito', {
        sku: s.product && s.product.sku,
        compatibilidad: s.status
      });
    }
  }

  if (!customElements.get('sjw-buy-guard')) customElements.define('sjw-buy-guard', SJWBuyGuard);
})();
