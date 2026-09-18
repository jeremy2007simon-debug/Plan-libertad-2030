const { chromium } = require(process.env.PLAYWRIGHT_PATH || '/opt/node22/lib/node_modules/playwright');
const path = require('path');
const ANCHOS = [360, 390, 768, 1024, 1440, 1920];

(async () => {
  const browser = await chromium.launch();
  const informe = [];
  for (const w of ANCHOS) {
    const tactil = w <= 768;
    const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1,
      hasTouch: tactil, isMobile: tactil });
    await page.goto('file://' + path.resolve('harness.html'));
    await page.waitForTimeout(150);
    const r = await page.evaluate((w) => {
      const out = { desbordes: [], objetivos: [], texto: [], solapes: [] };
      const de = document.documentElement;
      out.scrollAncho = de.scrollWidth;
      out.viewport = w;
      // 1. desbordes horizontales
      document.querySelectorAll('body *').forEach(el => {
        const b = el.getBoundingClientRect();
        if (b.width === 0 || b.height === 0) return;
        // los cajones y overlays cerrados viven fuera de pantalla a propósito
        if (el.closest('.sjw-drawer, .sjw-overlay, [hidden], [aria-hidden="true"]')) return;
        if (b.right > w + 1 || b.left < -1) {
          const z = el.closest('[data-sjw-qa]');
          out.desbordes.push({ zona: z ? z.dataset.sjwQa : '(raiz)',
            sel: el.tagName.toLowerCase() + (el.className && typeof el.className==='string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''),
            izq: Math.round(b.left), der: Math.round(b.right) });
        }
      });
      // 2. objetivos tactiles < 44 px
      document.querySelectorAll('a,button,select,input,summary,[role=button]').forEach(el => {
        const b = el.getBoundingClientRect();
        if (b.width === 0 || b.height === 0) return;
        if (b.height < 44 || b.width < 24) {
          const z = el.closest('[data-sjw-qa]');
          out.objetivos.push({ zona: z ? z.dataset.sjwQa : '(raiz)',
            sel: el.tagName.toLowerCase() + '.' + (typeof el.className==='string'?el.className.trim().split(/\s+/).join('.'):''),
            alto: Math.round(b.height), ancho: Math.round(b.width) });
        }
      });
      // 3. texto demasiado pequeño (tamaño REAL en pantalla, con la escala del SVG)
      document.querySelectorAll('body *').forEach(el => {
        if (!el.childNodes.length) return;
        const txt = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
        if (!txt) return;
        let fs = parseFloat(getComputedStyle(el).fontSize);
        const svg = el.closest('svg');
        if (svg) {
          const vb = svg.viewBox && svg.viewBox.baseVal;
          const r = svg.getBoundingClientRect();
          if (vb && vb.width) fs = fs * (r.width / vb.width);
        }
        if (fs < 12) {
          const z = el.closest('[data-sjw-qa]');
          out.texto.push({ zona: z ? z.dataset.sjwQa : '(raiz)', px: Math.round(fs*10)/10,
            sel: el.tagName.toLowerCase() + (typeof el.className==='string' && el.className ? '.'+el.className.trim().split(/\s+/).join('.') : ''),
            txt: el.textContent.trim().slice(0,30) });
        }
      });
      // 4. contraste de texto (WCAG AA)
      const lum = (c) => {
        const [r,g,b] = c.map(v => { v/=255; return v <= .03928 ? v/12.92 : Math.pow((v+.055)/1.055, 2.4); });
        return .2126*r + .7152*g + .0722*b;
      };
      const parse = (s) => (s.match(/[\d.]+/g) || []).slice(0,3).map(Number);
      // Compone las capas semitransparentes sobre lo que haya debajo.
      const fondoDe = (el) => {
        const capas = [];
        let n = el;
        while (n && n !== document.documentElement) {
          const p2 = (getComputedStyle(n).backgroundColor.match(/[\d.]+/g) || []).map(Number);
          if (p2.length) {
            const a = p2.length > 3 ? p2[3] : 1;
            if (a > 0) { capas.push([p2[0], p2[1], p2[2], a]); if (a >= 1) break; }
          }
          n = n.parentElement;
        }
        let base = [9, 10, 12];
        for (let i = capas.length - 1; i >= 0; i--) {
          const [r, g, b, a] = capas[i];
          base = [r*a + base[0]*(1-a), g*a + base[1]*(1-a), b*a + base[2]*(1-a)];
        }
        return base;
      };
      out.contraste = [];
      document.querySelectorAll('body *').forEach(el => {
        const txt = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
        if (!txt) return;
        const cs = getComputedStyle(el);
        if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < .5) return;
        const fg = parse(cs.color), bg = fondoDe(el);
        const l1 = lum(fg), l2 = lum(bg);
        const ratio = (Math.max(l1,l2) + .05) / (Math.min(l1,l2) + .05);
        const px = parseFloat(cs.fontSize), grande = px >= 24 || (px >= 18.66 && parseInt(cs.fontWeight) >= 700);
        const minimo = grande ? 3 : 4.5;
        if (ratio < minimo) {
          const z = el.closest('[data-sjw-qa]');
          out.contraste.push({ zona: z ? z.dataset.sjwQa : '(raiz)',
            sel: el.tagName.toLowerCase() + (typeof el.className==='string' && el.className ? '.'+el.className.trim().split(/\s+/).join('.') : ''),
            ratio: Math.round(ratio*100)/100, minimo, px, txt: el.textContent.trim().slice(0,32) });
        }
      });
      return out;
    }, w);
    r.ancho = w; r.tactil = tactil;
    await page.screenshot({ path: `captura-${w}.png`, fullPage: true });
    informe.push(r);
    await page.close();
  }
  await browser.close();
  require('fs').writeFileSync('informe.json', JSON.stringify(informe, null, 1));
  for (const r of informe) {
    console.log(`\n=== ${r.ancho} px${r.tactil?' (táctil)':''} === scrollWidth=${r.scrollAncho} ${r.scrollAncho > r.ancho ? '  <-- DESBORDA' : ''}`);
    console.log(' desbordes:', r.desbordes.length, '| objetivos <44px:', r.objetivos.length,
                '| texto <12px:', r.texto.length, '| contraste AA:', (r.contraste||[]).length);
    const c = {}; (r.contraste||[]).forEach(o => c[o.zona + o.sel] = o);
    Object.values(c).slice(0, 10).forEach(o => console.log('   con', o.zona, o.sel.slice(0,52), o.ratio + ':1 <', o.minimo, JSON.stringify(o.txt)));
    r.desbordes.slice(0, 6).forEach(d => console.log('   ovf', d.zona, d.sel.slice(0, 70), d.izq, '->', d.der));
    const u = {}; r.objetivos.forEach(o => u[o.zona + ' ' + o.sel] = o);
    Object.values(u).slice(0, 8).forEach(o => console.log('   tap', o.zona, o.sel.slice(0, 60), `${o.ancho}x${o.alto}`));
    const t = {}; r.texto.forEach(o => t[o.zona + o.px] = o);
    Object.values(t).slice(0, 6).forEach(o => console.log('   txt', o.zona, o.sel.slice(0,50), o.px + 'px', JSON.stringify(o.txt)));
  }
})();
