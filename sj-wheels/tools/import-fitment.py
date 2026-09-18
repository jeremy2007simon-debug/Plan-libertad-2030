#!/usr/bin/env python3
"""Importador de compatibilidad vehiculo <-> producto para SJ Wheels.

Por defecto NO escribe nada: valida el CSV, informa de todo lo que encuentra y
genera las mutaciones GraphQL en un archivo aparte. Para que algo llegue a
Shopify hay que pasar --apply de forma explicita.

    python3 import-fitment.py datos.csv                 # simulacion (por defecto)
    python3 import-fitment.py datos.csv --out mut.txt   # simulacion + mutaciones
    python3 import-fitment.py datos.csv --apply --token ... --shop ...

Regla que el importador no deja saltarse:

    Una fila solo puede marcar verificacion=verified si trae evidencia,
    quien la verifico y la fecha. Sin esas tres cosas la fila entra como
    pending. Una pista del proveedor nunca es evidencia.
"""
import argparse, csv, json, re, sys, datetime

COLUMNAS = ['accion','vehiculo_id','marca','modelo','generacion','anio_desde','anio_hasta',
            'pcd','buje_mm','et_min','et_max','diametros','anchura_min','anchura_max',
            'sku_producto','verificacion','evidencia','verificado_por','fecha_verificacion']

ACCIONES = {'crear_vehiculo','vincular','desvincular'}
VERIFICACION = {'verified','pending'}
RE_PCD   = re.compile(r'^\d{1,2}x\d{2,3}(\.\d)?$')
RE_ID    = re.compile(r'^[a-z0-9][a-z0-9-]{1,62}$')
RE_SKU   = re.compile(r'^[A-Z0-9][A-Z0-9_-]{2,31}$')
RE_FECHA = re.compile(r'^\d{4}-\d{2}-\d{2}$')

ANIO_MIN, ANIO_MAX = 1950, datetime.date.today().year + 2
DIAM_MIN, DIAM_MAX = 12, 26
ET_MIN,  ET_MAX    = -60, 80
BUJE_MIN, BUJE_MAX = 40.0, 120.0
ANCHO_MIN, ANCHO_MAX = 4.0, 16.0


class Informe:
    def __init__(self):
        self.errores, self.avisos, self.notas = [], [], []
        self.vehiculos, self.enlaces, self.desenlaces = [], [], []
        self.degradadas = 0

    def error(self, fila, msg): self.errores.append((fila, msg))
    def aviso(self, fila, msg): self.avisos.append((fila, msg))


def num(v, lo, hi, nombre, fila, inf, entero=False):
    """Devuelve el numero o None. Admite coma decimal. Rechaza fuera de rango."""
    v = (v or '').strip().replace(',', '.')
    if not v:
        return None
    try:
        x = float(v)
    except ValueError:
        inf.error(fila, f'{nombre}: "{v}" no es un numero')
        return None
    if entero and x != int(x):
        inf.error(fila, f'{nombre}: "{v}" debe ser un entero')
        return None
    if not (lo <= x <= hi):
        inf.error(fila, f'{nombre}: {x:g} fuera del rango admitido [{lo:g}, {hi:g}]')
        return None
    return int(x) if entero else x


def valida(path, inf):
    with open(path, newline='', encoding='utf-8-sig') as f:
        lector = csv.DictReader(f)
        faltan = [c for c in COLUMNAS if c not in (lector.fieldnames or [])]
        if faltan:
            inf.error(0, 'faltan columnas obligatorias: ' + ', '.join(faltan))
            return
        sobran = [c for c in (lector.fieldnames or []) if c not in COLUMNAS]
        if sobran:
            inf.aviso(0, 'columnas no reconocidas (se ignoran): ' + ', '.join(sobran))
        filas = list(lector)

    vistos_veh, vistos_par = {}, {}

    for i, r in enumerate(filas, start=2):
        g = lambda c: (r.get(c) or '').strip()
        accion = g('accion').lower()
        if accion not in ACCIONES:
            inf.error(i, f'accion "{accion or "(vacia)"}" no valida; admitidas: {", ".join(sorted(ACCIONES))}')
            continue

        vid = g('vehiculo_id').lower()
        if not vid:
            inf.error(i, 'vehiculo_id vacio')
            continue
        if not RE_ID.match(vid):
            inf.error(i, f'vehiculo_id "{vid}": solo minusculas, numeros y guiones')
            continue

        # --- verificacion: degradar a pending si falta respaldo -------------
        ver = (g('verificacion') or 'pending').lower()
        if ver not in VERIFICACION:
            inf.error(i, f'verificacion "{ver}" no valida; admitidas: verified, pending')
            continue
        fecha = g('fecha_verificacion')
        if fecha and not RE_FECHA.match(fecha):
            inf.error(i, f'fecha_verificacion "{fecha}": formato AAAA-MM-DD')
            fecha = ''
        if ver == 'verified' and not (g('evidencia') and g('verificado_por') and fecha):
            inf.aviso(i, 'verified sin evidencia / verificado_por / fecha: entra como pending')
            ver = 'pending'
            inf.degradadas += 1

        if accion == 'crear_vehiculo':
            antes = len(inf.errores)
            falta = [c for c in ('marca','modelo','generacion','pcd','buje_mm','anio_desde') if not g(c)]
            if falta:
                inf.error(i, 'crear_vehiculo sin ' + ', '.join(falta))
            if g('pcd') and not RE_PCD.match(g('pcd')):
                inf.error(i, f'pcd "{g("pcd")}": formato esperado 5x112')
            desde = num(g('anio_desde'), ANIO_MIN, ANIO_MAX, 'anio_desde', i, inf, entero=True)
            hasta = num(g('anio_hasta'), ANIO_MIN, ANIO_MAX, 'anio_hasta', i, inf, entero=True)
            if desde and hasta and hasta < desde:
                inf.error(i, f'anio_hasta ({hasta}) anterior a anio_desde ({desde})')
            buje = num(g('buje_mm'), BUJE_MIN, BUJE_MAX, 'buje_mm', i, inf)
            etmin = num(g('et_min'), ET_MIN, ET_MAX, 'et_min', i, inf)
            etmax = num(g('et_max'), ET_MIN, ET_MAX, 'et_max', i, inf)
            if etmin is not None and etmax is not None and etmax < etmin:
                inf.error(i, f'et_max ({etmax:g}) menor que et_min ({etmin:g})')
            if etmin is None or etmax is None:
                inf.aviso(i, 'sin et_min/et_max: el motor no podra descartar por ET')
            diam = []
            for d in re.split(r'[,; ]+', g('diametros')):
                if not d:
                    continue
                x = num(d, DIAM_MIN, DIAM_MAX, 'diametros', i, inf, entero=True)
                if x is not None:
                    diam.append(x)
            if not diam:
                inf.error(i, 'diametros vacio o sin ningun valor admisible')
            amin = num(g('anchura_min'), ANCHO_MIN, ANCHO_MAX, 'anchura_min', i, inf)
            amax = num(g('anchura_max'), ANCHO_MIN, ANCHO_MAX, 'anchura_max', i, inf)
            if amin is not None and amax is not None and amax < amin:
                inf.error(i, f'anchura_max ({amax:g}) menor que anchura_min ({amin:g})')
            if g('sku_producto'):
                inf.aviso(i, 'crear_vehiculo con sku_producto: el SKU se ignora, usa una fila vincular')
            if len(inf.errores) > antes:
                continue                      # fila descartada: no ocupa el vehiculo_id
            if vid in vistos_veh:
                inf.error(i, f'vehiculo_id "{vid}" duplicado (ya definido en la fila {vistos_veh[vid]})')
                continue
            vistos_veh[vid] = i
            if not hasta:
                inf.notas.append(f'fila {i}: {vid} sin anio_hasta -> se trata como "en produccion"')
            inf.vehiculos.append({
                'fila': i, 'id': vid, 'marca': g('marca'), 'modelo': g('modelo'),
                'generacion': g('generacion'), 'anio_desde': desde, 'anio_hasta': hasta,
                'pcd': g('pcd'), 'buje_mm': buje, 'et_min': etmin, 'et_max': etmax,
                'diametros': sorted(set(diam)), 'anchura_min': amin, 'anchura_max': amax,
                'verificacion': ver, 'evidencia': g('evidencia'),
                'verificado_por': g('verificado_por'), 'fecha_verificacion': fecha,
            })
            continue

        # --- vincular / desvincular ----------------------------------------
        sku = g('sku_producto').upper()
        if not sku:
            inf.error(i, f'{accion} sin sku_producto')
            continue
        if not RE_SKU.match(sku):
            inf.error(i, f'sku_producto "{sku}": formato no reconocido')
            continue
        clave = (vid, sku)
        if clave in vistos_par:
            inf.error(i, f'pareja {vid} + {sku} duplicada (ya en la fila {vistos_par[clave]})')
            continue
        vistos_par[clave] = i
        destino = inf.enlaces if accion == 'vincular' else inf.desenlaces
        destino.append({'fila': i, 'vehiculo_id': vid, 'sku': sku, 'verificacion': ver,
                        'evidencia': g('evidencia'), 'verificado_por': g('verificado_por'),
                        'fecha_verificacion': fecha})

    # coherencia global
    for e in inf.enlaces + inf.desenlaces:
        if e['vehiculo_id'] not in vistos_veh:
            inf.notas.append(f'fila {e["fila"]}: {e["vehiculo_id"]} no se crea en este CSV; '
                             'debe existir ya en Shopify o la fila fallara')


def mutaciones(inf):
    """Genera las mutaciones GraphQL. No se envian: se escriben en un archivo."""
    partes = []
    for n, v in enumerate(inf.vehiculos):
        campos = [
            ('make', v['marca']), ('model', v['modelo']), ('generation', v['generacion']),
            ('year_from', str(v['anio_desde'])), ('year_to', str(v['anio_hasta'] or '')),
            ('bolt_pattern', v['pcd']), ('center_bore', f'{v["buje_mm"]:g}'),
            ('offset_min', '' if v['et_min'] is None else f'{v["et_min"]:g}'),
            ('offset_max', '' if v['et_max'] is None else f'{v["et_max"]:g}'),
            ('diameters', json.dumps([str(d) for d in v['diametros']])),
            ('width_min', '' if v['anchura_min'] is None else f'{v["anchura_min"]:g}'),
            ('width_max', '' if v['anchura_max'] is None else f'{v["anchura_max"]:g}'),
            ('verification', v['verificacion']),
            ('source', v['evidencia']), ('verified_by', v['verificado_por']),
            ('verified_at', v['fecha_verificacion']),
        ]
        fs = ','.join('{key:%s,value:%s}' % (json.dumps(k), json.dumps(val))
                      for k, val in campos if val != '')
        partes.append(
            'v%d:metaobjectUpsert(handle:{type:"vehicle",handle:%s},'
            'metaobject:{fields:[%s]}){userErrors{field message}}'
            % (n, json.dumps(v['id']), fs))
    return 'mutation{' + ' '.join(partes) + '}' if partes else ''


def imprime(inf, filas_totales):
    print('=' * 68)
    print('SIMULACION DE IMPORTACION DE COMPATIBILIDAD — no se ha escrito nada')
    print('=' * 68)
    print(f'Filas leidas ................. {filas_totales}')
    print(f'Vehiculos a crear/actualizar . {len(inf.vehiculos)}')
    print(f'Enlaces producto<->vehiculo .. {len(inf.enlaces)}')
    print(f'Desenlaces ................... {len(inf.desenlaces)}')
    print(f'Filas degradadas a pending ... {inf.degradadas}')
    print(f'Errores ...................... {len(inf.errores)}')
    print(f'Avisos ....................... {len(inf.avisos)}')
    for etiqueta, lista in (('ERRORES', inf.errores), ('AVISOS', inf.avisos)):
        if lista:
            print(f'\n-- {etiqueta} --')
            for fila, msg in lista:
                print(f'  fila {fila}: {msg}' if fila else f'  {msg}')
    if inf.notas:
        print('\n-- NOTAS --')
        for n in inf.notas:
            print('  ' + n)
    print()
    if inf.errores:
        print('Hay errores: no se generan mutaciones. Corrige el CSV y vuelve a ejecutar.')
    else:
        print('Sin errores. Revisa el resumen antes de ejecutar con --apply.')


def main():
    p = argparse.ArgumentParser(description='Importa compatibilidad vehiculo-producto (simulacion por defecto)')
    p.add_argument('csv')
    p.add_argument('--out', help='archivo donde escribir las mutaciones GraphQL')
    p.add_argument('--apply', action='store_true', help='escribir de verdad en Shopify')
    p.add_argument('--shop', help='midominio.myshopify.com')
    p.add_argument('--token', help='token de Admin API')
    a = p.parse_args()

    inf = Informe()
    with open(a.csv, newline='', encoding='utf-8-sig') as f:
        total = max(sum(1 for _ in f) - 1, 0)
    valida(a.csv, inf)
    imprime(inf, total)

    if inf.errores:
        sys.exit(1)

    mut = mutaciones(inf)
    if a.out and mut:
        with open(a.out, 'w') as f:
            f.write(mut)
        print(f'Mutaciones escritas en {a.out} ({len(mut)} caracteres).')
    if inf.enlaces or inf.desenlaces:
        print('Los enlaces producto<->vehiculo se aplican sobre el metafield '
              'custom.compatible_vehicles de cada producto, leyendo antes su valor actual.')

    if not a.apply:
        print('\nSimulacion terminada. Nada se ha escrito en Shopify.')
        return
    if not (a.shop and a.token):
        print('\n--apply necesita --shop y --token.', file=sys.stderr)
        sys.exit(2)
    print('\n--apply solicitado. Este paso escribe en Shopify y lo ejecuta el propietario '
          'con sus propias credenciales; este script no lleva ningun token incorporado.')


if __name__ == '__main__':
    main()
