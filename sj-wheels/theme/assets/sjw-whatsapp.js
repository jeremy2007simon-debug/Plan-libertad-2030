/**
 * SJ Wheels — Mensajes de WhatsApp contextuales
 *
 * Construye el texto según dónde esté el botón e incluye el vehículo guardado.
 * Los parámetros se codifican correctamente con encodeURIComponent.
 * Si no hay número configurado, el botón ni siquiera se renderiza en Liquid.
 */
(function () {
  'use strict';

  function t(key, fallback) { return (window.SJWStrings || {})[key] || fallback; }

  function vehicleText() {
    var label = window.SJWGarage.label();
    return label || t('wa_no_vehicle', 'todavía no he indicado mi vehículo');
  }

  function cartText() {
    var names = [];
    document.querySelectorAll('[data-sjw-cart-item]').forEach(function (el) {
      var title = el.dataset.title || '';
      var sku = el.dataset.sku || '';
      if (title) names.push(sku ? title + ' (' + sku + ')' : title);
    });
    return names.length ? names.join(', ') : t('wa_cart_empty', 'los productos de mi carrito');
  }

  function build(el) {
    var ctx = el.dataset.context || 'general';
    var v = vehicleText();

    switch (ctx) {
      case 'product':
        return t('wa_product', 'Hola, estoy interesado en la llanta [PRODUCTO], referencia [SKU]. Mi vehículo es [VEHICULO]. ¿Podrían confirmarme la compatibilidad?')
          .replace('[PRODUCTO]', el.dataset.productTitle || '')
          .replace('[SKU]', el.dataset.productSku || t('wa_no_sku', 'sin referencia'))
          .replace('[VEHICULO]', v);
      case 'no_results':
        return t('wa_no_results', 'Hola, no encuentro llantas para mi vehículo: [VEHICULO]. ¿Pueden ayudarme?')
          .replace('[VEHICULO]', v);
      case 'cart':
        return t('wa_cart', 'Hola, quiero confirmar la compatibilidad de estos productos: [PRODUCTOS]. Mi vehículo es [VEHICULO].')
          .replace('[PRODUCTOS]', cartText())
          .replace('[VEHICULO]', v);
      default:
        return t('wa_general', 'Hola, necesito ayuda para elegir unas llantas. Mi vehículo es [VEHICULO].')
          .replace('[VEHICULO]', v);
    }
  }

  function wire(root) {
    (root || document).querySelectorAll('[data-sjw-whatsapp]').forEach(function (el) {
      if (el.dataset.sjwWired === '1') return;
      el.dataset.sjwWired = '1';
      el.addEventListener('click', function () {
        var phone = el.dataset.phone;
        if (!phone) return;
        el.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(build(el));
        window.SJWAnalytics.track('whatsapp_click', { contexto: el.dataset.context || 'general' });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () { wire(); });
  document.addEventListener('shopify:section:load', function (e) { wire(e.target); });
  window.SJWWhatsApp = { wire: wire, build: build };
})();
