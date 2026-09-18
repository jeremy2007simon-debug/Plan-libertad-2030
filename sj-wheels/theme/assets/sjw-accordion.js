/**
 * SJ Wheels — Acordeón accesible.
 * Teclado completo, aria-expanded correcto y panel oculto de verdad (hidden),
 * para que los lectores de pantalla no lean contenido plegado.
 */
(function () {
  'use strict';
  class SJWAccordion extends HTMLElement {
    connectedCallback() {
      this.single = this.hasAttribute('single');
      this.heads = Array.from(this.querySelectorAll('.sjw-acc__head'));
      this.heads.forEach(function (head, i) {
        head.addEventListener('click', this.toggle.bind(this, head));
        head.addEventListener('keydown', this.onKey.bind(this, i));
      }, this);
    }
    panelOf(head) { return document.getElementById(head.getAttribute('aria-controls')); }
    toggle(head) {
      var open = head.getAttribute('aria-expanded') === 'true';
      if (this.single && !open) this.heads.forEach(function (h) { if (h !== head) this.close(h); }, this);
      open ? this.close(head) : this.open(head);
    }
    open(head)  { head.setAttribute('aria-expanded', 'true');  var p = this.panelOf(head); if (p) p.hidden = false; }
    close(head) { head.setAttribute('aria-expanded', 'false'); var p = this.panelOf(head); if (p) p.hidden = true; }
    onKey(i, e) {
      var map = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: this.heads.length - 1 };
      if (!(e.key in map)) return;
      e.preventDefault();
      var next = (map[e.key] + this.heads.length) % this.heads.length;
      this.heads[next].focus();
    }
  }
  if (!customElements.get('sjw-accordion')) customElements.define('sjw-accordion', SJWAccordion);
})();
