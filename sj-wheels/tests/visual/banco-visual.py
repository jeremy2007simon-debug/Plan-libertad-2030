#!/usr/bin/env python3
"""Genera el banco de pruebas visual de SJ Wheels.

Monta una página única con el CSS real del tema y el marcado de todas las
secciones, para poder medir la maquetación sin depender de la tienda, que
está protegida por contraseña y no se puede renderizar desde aquí.

El Liquid se reduce a HTML de forma aproximada: bucles y condicionales se
resuelven a una sola pasada y las traducciones se sustituyen por la última
parte de la clave. Sirve para medir anchos, áreas táctiles, tamaños de letra
y contraste; NO sustituye a una revisión en la tienda real.

    python3 sj-wheels/tests/visual/banco-visual.py   # desde la raíz del repo
    node    sj-wheels/tests/visual/qa-visual.js
"""
import re, pathlib, html, json
T = pathlib.Path('sj-wheels/theme')
OUT = pathlib.Path(__file__).parent

TEXTOS = {
 'title':'Encuentra tu llanta','heading':'Llantas premium para tu coche',
 'default':'Texto de ejemplo','label':'Etiqueta','price':'899,00 €',
}
def liquid_a_html(src):
    # quitar comentarios y schema
    src = re.sub(r'\{%-?\s*comment.*?endcomment\s*-?%\}','',src,flags=re.S)
    src = re.sub(r'\{%-?\s*schema\s*-?%\}.*?\{%-?\s*endschema\s*-?%\}','',src,flags=re.S)
    src = re.sub(r'\{%-?\s*(stylesheet|javascript)\s*-?%\}.*?\{%-?\s*end\1\s*-?%\}',
                 lambda m: m.group(0), src, flags=re.S)
    # salida {{ ... }} -> texto de muestra
    def out(m):
        e = m.group(1).strip()
        if '| t' in e or 'sjw.' in e:
            k = e.split('|')[0].strip().strip("'\"").split('.')[-1]
            return html.escape(k.replace('_',' ').capitalize())
        if 'price' in e: return '899,00 €'
        if 'image' in e or 'img_url' in e or 'url' in e: return '#'
        if 'title' in e or 'heading' in e: return 'Título de sección de ejemplo'
        return 'Dato'
    src = re.sub(r'\{\{(.*?)\}\}', out, src, flags=re.S)
    # etiquetas de control: se eliminan, el cuerpo se queda una vez
    src = re.sub(r'\{%-?.*?-?%\}', '', src, flags=re.S)
    return src

def separa(src):
    """devuelve (css, html) extrayendo los bloques stylesheet/style."""
    css = []
    def grab(m):
        css.append(m.group(1)); return ''
    src = re.sub(r'\{%-?\s*stylesheet\s*-?%\}(.*?)\{%-?\s*endstylesheet\s*-?%\}', grab, src, flags=re.S)
    src = re.sub(r'<style[^>]*>(.*?)</style>', grab, src, flags=re.S)
    return '\n'.join(css), src

secciones = ['sjw-topbar','sjw-vehicle-bar','sjw-vehicle-selector','sjw-benefits','sjw-steps',
             'sjw-categories','sjw-tech-guide','sjw-faq','sjw-cta','sjw-compare']
bloques   = ['sjw-fitment','sjw-tech-panel','sjw-card-specs']

css_total, cuerpo = [], []
for nombre in secciones:
    p = T/'sections'/f'{nombre}.liquid'
    c, h = separa(p.read_text())
    css_total.append(f'/* {nombre} */\n'+c)
    cuerpo.append(f'<!-- {nombre} --><div data-sjw-qa="{nombre}">'+liquid_a_html(h)+'</div>')
for nombre in bloques:
    p = T/'blocks'/f'{nombre}.liquid'
    c, h = separa(p.read_text())
    css_total.append(f'/* {nombre} */\n'+c)
    cuerpo.append(f'<!-- {nombre} --><div data-sjw-qa="{nombre}" class="sjw-container sjw-section">'+liquid_a_html(h)+'</div>')

# rejilla de tarjetas de producto (listado de colección)
tarjeta = '''<article class="sjw-card sjw-card--interactive"><div style="aspect-ratio:1;background:var(--sjw-metal)"></div>
<div class="sjw-card__body"><h3 class="sjw-h3">Juego de 4 llantas 19 pulgadas Mercedes-Benz</h3>
<div class="sjw-chips"><span class="sjw-badge sjw-badge--pending"><span class="sjw-badge__icon">!</span>Necesita confirmación técnica</span></div>
<div class="sjw-specs"><div class="sjw-spec"><span class="sjw-spec__k">Diámetro</span><span class="sjw-spec__v">19"</span></div>
<div class="sjw-spec"><span class="sjw-spec__k">PCD</span><span class="sjw-spec__v">5x112</span></div>
<div class="sjw-spec"><span class="sjw-spec__k">ET</span><span class="sjw-spec__v">43</span></div>
<div class="sjw-spec"><span class="sjw-spec__k">Buje</span><span class="sjw-spec__v sjw-spec__v--empty">Sin dato</span></div></div>
<p class="sjw-mono">1.299,00 €</p><button class="sjw-btn sjw-btn--primary sjw-btn--block">Ver ficha técnica</button></div></article>'''
cuerpo.append('<div data-sjw-qa="rejilla-productos" class="sjw-container sjw-section">'
  '<h2 class="sjw-h2">Catálogo</h2><div class="sjw-qa-grid">'+tarjeta*8+'</div></div>')
css_total.append('''/* rejilla de listado (equivalente al de la plantilla de colección) */
.sjw-qa-grid{display:grid;gap:var(--sjw-s4);grid-template-columns:1fr}
@media(min-width:600px){.sjw-qa-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:900px){.sjw-qa-grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1300px){.sjw-qa-grid{grid-template-columns:repeat(4,1fr)}}''')

# los 4 estados de compatibilidad, uno al lado de otro
estados = ''.join(
 f'<div class="sjw-note sjw-note--{k}"><span class="sjw-note__icon">{i}</span><div><strong>{tt}</strong>'
 f'<p class="sjw-small">{d}</p></div></div>'
 for k,i,tt,d in [('ok','✓','Compatible con tu vehículo','Medidas verificadas y relación confirmada.'),
   ('pending','!','Necesita confirmación técnica','Faltan datos o la relación no está verificada.'),
   ('error','✕','No compatible con tu vehículo','El PCD no coincide: 5x120 frente a 5x112.'),
   ('info','i','Selecciona tu vehículo','Aún no nos has dicho qué coche tienes.')])
cuerpo.append('<div data-sjw-qa="estados-compatibilidad" class="sjw-container sjw-section">'
  '<h2 class="sjw-h2">Estados de compatibilidad</h2><div class="sjw-stack">'+estados+'</div></div>')

doc = f'''<!doctype html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>SJ Wheels · banco de pruebas visual</title>
<style>{(T/'assets'/'sjw-tokens.css').read_text()}</style>
<style>{(T/'assets'/'sjw-components.css').read_text()}</style>
<style>{chr(10).join(css_total)}</style>
<style>
/* El banco de pruebas pinta el fondo del esquema de color oscuro que el tema
   aplica en la tienda real; aquí no hay Liquid que resuelva los ajustes. */
:root{{--header-height:0px}}
body{{margin:0;background:var(--sjw-carbon)}}
[data-sjw-qa]{{background:var(--sjw-carbon)}}
[style*="background:Dato"],[style*="background-color:Dato"]{{background:var(--sjw-carbon)!important}}
</style>
</head><body class="sjw-root sjw-body">{chr(10).join(cuerpo)}</body></html>'''
(OUT/'harness.html').write_text(doc)
print('harness.html', len(doc), 'bytes ·', len(secciones)+len(bloques)+2, 'zonas')
