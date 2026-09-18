#!/usr/bin/env python3
"""Control de calidad estático del tema SJ Wheels."""
import json, re, sys, pathlib, collections

T = pathlib.Path(__file__).parent.parent / 'theme'
errors, warnings, checks = [], [], 0

def ok(msg):
    global checks; checks += 1

def load_jsonc(p):
    s = p.read_text()
    s = re.sub(r'^\s*/\*.*?\*/\s*', '', s, flags=re.S)
    s = re.sub(r'(?m)^\s*//.*$', '', s)
    return json.loads(s)

sjw = list(T.glob('sections/sjw-*.liquid')) + list(T.glob('blocks/sjw-*.liquid')) + \
      list(T.glob('snippets/sjw-*.liquid')) + [T/'layout/theme.liquid']

# --- 1. Los filtros no se admiten en los argumentos de render ---------------
for p in sjw:
    for m in re.finditer(r"\{%-?\s*render\s+'[^']+'\s*,([^%]*?)-?%\}", p.read_text()):
        if '|' in m.group(1):
            errors.append(f'{p.name}: filtro dentro de los argumentos de render → {m.group(0)[:80]}')
ok('render sin filtros')

# --- 2. case/when/then no existe en Liquid ---------------------------------
for p in sjw:
    if re.search(r'\bwhen\b[^\n]*\bthen\b', p.read_text()):
        errors.append(f'{p.name}: "when ... then" no es sintaxis Liquid válida')
ok('sin case/when/then')

# --- 3. Todo render apunta a un snippet que existe --------------------------
snips = {p.stem for p in T.glob('snippets/*.liquid')}
# Solo se validan los snippets propios: los de Horizon viven en el tema, no en esta copia.
for p in sjw:
    for m in re.finditer(r"render\s+'(sjw-[^']+)'", p.read_text()):
        if m.group(1) not in snips:
            errors.append(f'{p.name}: render de un snippet sjw inexistente → {m.group(1)}')
ok('renders sjw resueltos')

# --- 4. Toda clave de traducción usada existe en ES y EN --------------------
def flat(d, pre=''):
    out = {}
    for k, v in d.items():
        out.update(flat(v, pre+k+'.')) if isinstance(v, dict) else out.update({pre+k: v})
    return out
es = flat(load_jsonc(T/'locales/es.json'))
en = flat(load_jsonc(T/'locales/en.default.json'))
used = set()
for p in sjw:
    used |= set(re.findall(r"'(sjw\.[a-z0-9_.]+)'\s*\|\s*t", p.read_text()))
for key in sorted(used):
    if key not in es: errors.append(f'falta la clave {key} en locales/es.json')
    if key not in en: errors.append(f'falta la clave {key} en locales/en.default.json')
ok(f'{len(used)} claves de traducción verificadas')

# --- 5. Paridad ES/EN del grupo sjw ----------------------------------------
a = {k for k in es if k.startswith('sjw.')}
b = {k for k in en if k.startswith('sjw.')}
if a != b:
    errors.append(f'ES y EN descuadrados: solo ES {sorted(a-b)[:5]} · solo EN {sorted(b-a)[:5]}')
ok('paridad ES/EN')

# --- 6. Los schemas son JSON válido ----------------------------------------
for p in list(T.glob('sections/sjw-*.liquid')) + list(T.glob('blocks/sjw-*.liquid')):
    m = re.search(r'\{%\s*schema\s*%\}(.*?)\{%\s*endschema\s*%\}', p.read_text(), re.S)
    if not m: errors.append(f'{p.name}: sin bloque schema'); continue
    try:
        sc = json.loads(m.group(1))
        if 'name' not in sc: errors.append(f'{p.name}: schema sin "name"')
        if len(sc.get('name','')) > 25: warnings.append(f'{p.name}: nombre de schema largo')
    except Exception as e:
        errors.append(f'{p.name}: schema con JSON inválido → {e}')
ok('schemas válidos')

# --- 7. Las plantillas solo referencian secciones/bloques existentes --------
types = {p.stem for p in T.glob('sections/*.liquid')} | {p.stem for p in T.glob('sections/*.json')}
btypes = {p.stem for p in T.glob('blocks/*.liquid')}
def walk_blocks(blocks, origin):
    for bid, b in (blocks or {}).items():
        t = b.get('type','')
        if t.startswith('sjw-') and t not in btypes:
            errors.append(f'{origin}: bloque inexistente → {t}')
        walk_blocks(b.get('blocks'), origin)
for p in T.glob('templates/*.json'):
    j = load_jsonc(p)
    for sid, sec in j.get('sections', {}).items():
        t = sec.get('type','')
        if t.startswith('sjw-') and t not in types:
            errors.append(f'{p.name}: sección inexistente → {t}')
        walk_blocks(sec.get('blocks'), p.name)
    for sid in j.get('order', []):
        if sid not in j.get('sections', {}):
            errors.append(f'{p.name}: "{sid}" está en order pero no en sections')
ok('plantillas coherentes')

# --- 8. Accesibilidad: el color nunca es la única señal ---------------------
badge = (T/'snippets/sjw-fitment-badge.liquid').read_text()
if '<svg' not in badge or 'fitment-badge__text' not in badge:
    errors.append('sjw-fitment-badge: el badge debe llevar icono y texto, no solo color')
status = (T/'assets/sjw-status.js').read_text()
for st in ('ok','pending','no','unknown'):
    if f"{st}:" not in status: errors.append(f'sjw-status.js: falta la presentación del estado {st}')
ok('badges con icono y texto')

# --- 9. prefers-reduced-motion respetado -----------------------------------
tok = (T/'assets/sjw-tokens.css').read_text()
if 'prefers-reduced-motion' not in tok:
    errors.append('sjw-tokens.css: falta el bloque prefers-reduced-motion')
ok('reduced-motion')

# --- 10. Áreas táctiles de 44 px como mínimo -------------------------------
comp = (T/'assets/sjw-components.css').read_text()
for sel, prop in (('.sjw-btn','min-height: 48px'), ('.sjw-btn-icon','width: 44px'),
                  ('.sjw-input, .sjw-select','min-height: 48px')):
    if prop not in comp: errors.append(f'sjw-components.css: {sel} sin área táctil suficiente ({prop})')
ok('áreas táctiles')

# --- 11. Sin secretos en el JavaScript -------------------------------------
SECRET = re.compile(r'(shpat_|shpca_|shppa_|Bearer\s+[A-Za-z0-9._-]{20,}|api[_-]?key\s*[:=]\s*["\'][^"\']{12,})', re.I)
for p in T.glob('assets/sjw-*.js'):
    if SECRET.search(p.read_text()):
        errors.append(f'{p.name}: posible credencial embebida')
ok('sin credenciales en JS')

# --- 12. La analítica no puede enviar datos personales ---------------------
an = (T/'assets/sjw-analytics.js').read_text()
for field in ('email','phone','nombre','matricula','vin'):
    if f"'{field}'" not in an: errors.append(f'sjw-analytics.js: "{field}" no está en la lista de campos bloqueados')
ok('analítica sin datos personales')

# --- 13. El estado por defecto nunca puede ser "compatible" ----------------
fit = (T/'assets/sjw-fitment.js').read_text()
if 'p.requiresManualVerification !== false' not in fit:
    errors.append('sjw-fitment.js: el valor por defecto de requiresManualVerification debe ser prudente')
if 'linked' not in fit or 'verification !== ' not in fit:
    errors.append('sjw-fitment.js: "ok" debe exigir relación verificada y vehículo verificado')
ok('compatibilidad segura por defecto')

# --- 14. Sin urgencia falsa ni afirmaciones sin respaldo -------------------
BANNED = ['¡últimas unidades', 'solo quedan', 'oferta termina', 'homologad', 'certificad', 'garantía de 1 año',
          'plazas limitadas', 'date prisa']
for p in sjw:
    low = p.read_text().lower()
    for term in BANNED:
        if term in low:
            warnings.append(f'{p.name}: revisar el término "{term}" (afirmación sin respaldo o urgencia)')
ok('sin urgencia falsa')

print(f'{checks} comprobaciones ejecutadas\n')
if warnings:
    print(f'AVISOS ({len(warnings)}):')
    for w in warnings: print('  •', w)
    print()
if errors:
    print(f'ERRORES ({len(errors)}):')
    for e in errors: print('  ✗', e)
    sys.exit(1)
print('Sin errores.')
