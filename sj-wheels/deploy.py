#!/usr/bin/env python3
"""
Sube los archivos del tema SJ Wheels al tema de desarrollo.

El contenido viaja por HTTPS a los destinos firmados de Shopify y después
themeFilesUpsert los referencia por URL. Así el despliegue no depende de
pegar el contenido de los archivos en ninguna parte.

Uso:  python3 deploy.py <archivo> [<archivo> ...]
Deja en deploy-vars.json las variables listas para themeFilesUpsert.

Aviso de pisadas. Cada despliegue anota en .desplegado.json el MD5 de lo que
subió. Si al volver a subir un archivo el MD5 del repositorio no coincide con
el anotado y tampoco con lo que hay ahora en el tema, alguien ha editado ese
archivo en el tema desde el último despliegue y subirlo lo borraría. Paso lo
que sé y aviso; comprobar el tema de verdad requiere consultar la API, que
este script no hace.

    El 23-09-2026 pasó exactamente eso: otra sesión reescribió el selector de
    variantes, el panel técnico, el botón de solicitud y los dos archivos de
    textos directamente en el tema, sin pasar por el repositorio. Un
    despliegue a ciegas desde aquí habría borrado ese trabajo.
"""
import hashlib, json, subprocess, sys, os, pathlib

ROOT = pathlib.Path(__file__).parent
THEME = ROOT / 'theme'
targets = json.load(open(ROOT / '.targets.json'))['data']['stagedUploadsCreate']['stagedTargets']
used = json.load(open(ROOT / '.used.json')) if (ROOT / '.used.json').exists() else []
desplegado = json.load(open(ROOT / '.desplegado.json')) if (ROOT / '.desplegado.json').exists() else {}

files = sys.argv[1:]
if not files:
    files = [str(p.relative_to(THEME)) for p in THEME.rglob('*') if p.is_file()]

free = [t for t in targets if t['parameters'][3]['value'] not in used]
if len(files) > len(free):
    sys.exit(f'Solo quedan {len(free)} destinos libres para {len(files)} archivos. Pide más con stagedUploadsCreate.')

out = []
for rel, target in zip(files, free):
    src = THEME / rel
    if not src.exists():
        sys.exit(f'No existe: {src}')
    form = []
    for p in target['parameters']:
        form += ['-F', f"{p['name']}={p['value']}"]
    form += ['-F', f'file=@{src}']
    code = subprocess.run(
        ['curl', '-s', '-o', '/dev/null', '-w', '%{http_code}', '-X', 'POST', target['url']] + form,
        capture_output=True, text=True).stdout.strip()
    if code != '201':
        sys.exit(f'Fallo subiendo {rel}: HTTP {code}')
    md5 = hashlib.md5(src.read_bytes()).hexdigest()
    anterior = desplegado.get(rel)
    if anterior and anterior != md5:
        print(f'  AVISO   {rel}: cambió en el repositorio desde el último despliegue. '
              'Comprueba que nadie lo haya editado también en el tema antes de subirlo.')
    desplegado[rel] = md5
    key = next(p['value'] for p in target['parameters'] if p['name'] == 'key')
    used.append(key)
    out.append({'filename': rel, 'body': {'type': 'URL', 'value': target['url'] + key}})
    print(f'  subido  {rel}  ({src.stat().st_size} bytes)')

json.dump(used, open(ROOT / '.used.json', 'w'))
json.dump(desplegado, open(ROOT / '.desplegado.json', 'w'), indent=1, sort_keys=True)
json.dump({'themeId': 'gid://shopify/OnlineStoreTheme/196061626701', 'files': out},
          open(ROOT / 'deploy-vars.json', 'w'), ensure_ascii=False)
print(f'\n{len(out)} archivos subidos. Variables en deploy-vars.json')
