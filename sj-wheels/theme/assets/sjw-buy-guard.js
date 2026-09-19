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
 * LO QUE ESTA GUARDIA NO ES
 * -------------------------
 * Esto es JavaScript en el navegador del cliente: se puede desactivar, editar
 * o saltar publicando directamente en /cart/add. Por eso:
 *
 *   1. Ninguna propiedad de línea que escribe aquí es una aprobación técnica.
 *      Se llaman "indicado por el cliente" y "sin verificar" precisamente para
 *      que quien prepare el envío no las confunda con una comprobación hecha.
 *   2. Toda línea sale con "Revisión técnica: pendiente", siempre, sin excepción.
 *      El navegador no puede escribir "aprobada" de ninguna manera.
 *   3. La revisión técnica real la hace una persona antes de enviar.
 *
 * La guardia es una ayuda al cliente honesto, no un control de seguridad.
 */
(function () {
  'use strict';

  /* Selectores de todo lo que puede iniciar una compra, no solo el botón de
     añadir al carrito: los botones acelerados (Shop Pay, PayPal, Google Pay)
     van directos al checkout y se saltarían cualquier comprobación. */
  var VIAS_DE_COMPRA = [
    '[type="submit"]',
    'button[name="add"]',
    'shopify-accelerated-checkout',
    'shopify-accelerated-checkout-cart',
    '.shopify-payment-button',
    '[data-shopify="payment-button"]',
    '.shopify-payment-button__button',
    '[data-sjw-buy]'
  ].join(',');

  function t(key, fallback) { return (window.SJWStrings || {})[key] || fallback; }

  class SJWBuyGuard extends HTMLElement {
    connectedCallback() {
      /* Si algo falla al arrancar (otro script se cayó, el garaje no llegó,
         el JSON del producto está roto) la guardia cierra la compra en vez de
         quedarse callada. Fallar abriendo aquí significa vender una llanta que
         no encaja. */
      try {
        this.arrancar();
      } catch (e) {
        this.cerrarPorFallo(e);
      }
    }

    /** Última línea de defensa: sin guardia operativa, no se compra. */
    cerrarPorFallo(e) {
      if (window.console && console.warn) {
        console.warn('SJ Wheels: la guardia de compra no pudo arrancar, se bloquea la compra.', e);
      }
      this.dataset.status = 'error';
      this.dataset.detener = 'true';
      var form = this.form || document.querySelector('form[action*="/cart/add"]');
      if (form) {
        Array.prototype.forEach.call(form.querySelectorAll(VIAS_DE_COMPRA), function (el) {
          if ('disabled' in el) el.disabled = true;
          el.setAttribute('aria-disabled', 'true');
          el.setAttribute('inert', '');
          el.style.pointerEvents = 'none';
          el.style.opacity = '.5';
        });
        form.addEventListener('submit', function (ev) { ev.preventDefault(); }, true);
      }
      if (this.messageEl) {
        this.messageEl.textContent = t('guard_no_vehicle',
          'Indica tu vehículo para poder comprobar que estas llantas le encajan.');
        this.messageEl.hidden = false;
      }
    }

    arrancar() {
      this.mode = this.dataset.pendingMode || 'allow';   // 'allow' | 'inquire'

      /* El formulario de ESTA ficha, no el primero de la página: en una página
         con varias tarjetas de producto, querySelector global ataba el guard al
         formulario equivocado. */
      var raiz = this.closest('[data-sjw-product-main]') || this.closest('.shopify-section') || document;
      var sel = this.dataset.formSelector || 'form[action*="/cart/add"]';
      this.form = raiz.querySelector(sel) || document.querySelector(sel);

      this.dataEl = this.querySelector('.sjw-fitment-data') ||
                    document.querySelector('.sjw-fitment-data[data-product-id="' + this.dataset.productId + '"]');
      this.confirmWrap = this.querySelector('[data-sjw-confirm-wrap]');
      this.confirmBox = this.querySelector('[data-sjw-confirm]');
      this.messageEl = this.querySelector('[data-sjw-guard-message]');
      this.blockedEl = this.querySelector('[data-sjw-guard-blocked]');

      if (!this.form) return;

      this.ensureProperties();
      if (this.confirmBox) this.confirmBox.addEventListener('change', this.apply.bind(this));
      this.form.addEventListener('submit', this.onSubmit.bind(this));

      /* Fase de captura: se adelanta a los manejadores del tema y a los de los
         botones acelerados, que no siempre disparan el submit del formulario. */
      this.form.addEventListener('click', this.onClick.bind(this), true);

      window.SJWGarage.subscribe(this.apply.bind(this));
      this.apply();
    }

    /** Todos los controles del formulario que pueden acabar en una compra. */
    vias() {
      return this.form ? Array.prototype.slice.call(this.form.querySelectorAll(VIAS_DE_COMPRA)) : [];
    }

    /** Crea los campos ocultos que viajan al pedido como propiedades de línea. */
    ensureProperties() {
      this.props = {};
      [
        'Vehículo indicado por el cliente',
        'Resultado mostrado en la web',
        'Confirmación del cliente',
        'Revisión técnica',
        'Referencia'
      ].forEach(function (name) {
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

    /** ¿Debe impedirse la compra ahora mismo? */
    veredicto() {
      var s = this.state();
      var blocked = false;
      var message = '';

      if (s.status === 'no') {
        blocked = true;
        message = t('guard_blocked', 'Estas llantas no encajan con las medidas de tu vehículo. No permitimos comprarlas para evitar un error.');
      } else if (s.status === 'unknown') {
        blocked = true;
        message = t('guard_no_vehicle', 'Indica tu vehículo para poder comprobar que estas llantas le encajan.');
      } else if (s.status === 'pending' && this.mode === 'inquire') {
        blocked = true;
        message = t('guard_inquire', 'Estas llantas necesitan confirmación técnica. Escríbenos y las revisamos contigo.');
      } else if (s.status === 'pending') {
        message = t('guard_pending', 'Revisaremos la compatibilidad antes del envío. Confirma los datos de tu vehículo para continuar.');
      }

      var needsConfirm = !blocked && !!s.vehicle;
      var confirmed = !needsConfirm || (this.confirmBox && this.confirmBox.checked);
      return { s: s, blocked: blocked, message: message, needsConfirm: needsConfirm, detener: blocked || !confirmed };
    }

    apply() {
      var v = this.veredicto();

      if (v.s.status === 'no') {
        window.SJWAnalytics.track('error_compatibilidad', { sku: v.s.product && v.s.product.sku });
      }

      // La casilla de confirmación solo aparece cuando hay algo que confirmar.
      if (this.confirmWrap) this.confirmWrap.hidden = !v.needsConfirm;
      if (this.messageEl) {
        this.messageEl.textContent = v.message;
        this.messageEl.hidden = !v.message;
      }
      if (this.blockedEl) this.blockedEl.hidden = !v.blocked;

      /* Se cierran TODAS las vías de compra a la vez. Un botón acelerado
         visible mientras el resto está bloqueado es una puerta trasera. */
      this.vias().forEach(function (el) {
        if ('disabled' in el) el.disabled = v.detener;
        el.setAttribute('aria-disabled', String(v.detener));
        if (v.detener) {
          el.setAttribute('inert', '');
          el.style.pointerEvents = 'none';
          el.style.opacity = '.5';
        } else {
          el.removeAttribute('inert');
          el.style.pointerEvents = '';
          el.style.opacity = '';
        }
      });

      this.writeProperties(v.s);
      this.dataset.status = v.s.status;
      this.dataset.detener = String(v.detener);
    }

    writeProperties(s) {
      if (!this.props) return;

      /* El texto lleva "sin verificar" incorporado: si alguien manipula el
         valor desde el navegador, sigue sin poder escribir una aprobación.
         Quien prepara el pedido lee una declaración, no una comprobación. */
      var etiquetas = {
        ok: t('prop_ok', 'Las medidas encajan según la web (sin verificar)'),
        pending: t('prop_pending', 'Necesita confirmación técnica (sin verificar)'),
        no: t('prop_no', 'La web indicaba que NO encaja (sin verificar)'),
        unknown: t('prop_unknown', 'Sin vehículo indicado (sin verificar)')
      };

      this.props['Vehículo indicado por el cliente'].value =
        s.vehicle ? window.SJWGarage.label(s.vehicle) : '';
      this.props['Resultado mostrado en la web'].value = etiquetas[s.status] || etiquetas.unknown;
      this.props['Referencia'].value = (s.product && s.product.sku) || '';
      this.props['Confirmación del cliente'].value =
        (this.confirmBox && this.confirmBox.checked)
          ? t('guard_confirmed', 'Datos del vehículo confirmados por el cliente')
          : '';

      /* Constante. El navegador no puede aprobar nada, así que toda línea sale
         pendiente de que una persona la revise antes del envío. */
      this.props['Revisión técnica'].value = t('prop_review', 'Pendiente de revisión antes del envío');

      // Shopify ignora las propiedades vacías, así que no ensucian el pedido.
      Object.keys(this.props).forEach(function (k) {
        this.props[k].disabled = !this.props[k].value;
      }, this);
    }

    /** Clic sobre cualquier vía de compra estando bloqueada. */
    onClick(e) {
      var v = this.veredicto();
      if (!v.detener) return;
      var via = e.target.closest && e.target.closest(VIAS_DE_COMPRA);
      if (!via || !this.form.contains(via)) return;
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
      this.apply();
      this.avisar(v);
    }

    onSubmit(e) {
      var v = this.veredicto();
      if (v.detener) {
        e.preventDefault();
        this.apply();
        this.avisar(v);
        return;
      }
      window.SJWAnalytics.track('anadir_al_carrito', {
        sku: v.s.product && v.s.product.sku,
        compatibilidad: v.s.status
      });
    }

    /** Lleva la atención a lo que falta, en vez de no hacer nada visible. */
    avisar(v) {
      if (v.blocked && this.messageEl && !this.messageEl.hidden) {
        this.messageEl.focus?.();
      } else if (this.confirmBox && this.confirmWrap && !this.confirmWrap.hidden) {
        this.confirmBox.focus();
      }
    }
  }

  if (!customElements.get('sjw-buy-guard')) customElements.define('sjw-buy-guard', SJWBuyGuard);
})();
