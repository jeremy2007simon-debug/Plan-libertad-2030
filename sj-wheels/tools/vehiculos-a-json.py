#!/usr/bin/env python3
"""Convierte el CSV de vehiculos en la tabla que lee el asistente.

El mismo CSV alimenta dos sitios: los metaobjetos `vehicle` de Shopify, que usa
la ficha de producto, y `asistente/datos/vehiculos.json`, que usa el bot. Una
sola fuente para que la ficha y el asistente no puedan decir cosas distintas
del mismo coche.

    python3 tools/vehiculos-a-json.py data/vehiculos.csv

Valida con las mismas reglas que import-fitment.py —lo importa, no las copia—
asi que un CSV que pase aqui pasa alli. Solo se convierten las filas
`crear_vehiculo`; las de vincular/desvincular son cosa del otro script.

La columna `alias` es lo unico que este formato anade: como llama la gente al
coche ("f30", "320i", "serie 3"), separado por |. No es un dato tecnico y no
viaja a Shopify; sirve para que el cliente encuentre su coche escribiendolo
como le salga.
"""
import argparse, csv, json, pathlib, sys, datetime

AQUI = pathlib.Path(__file__).resolve().parent
RAIZ = AQUI.parent
sys.path.insert(0, str(AQUI))

import importlib.util
_spec = importlib.util.spec_from_file_location('import_fitment', AQUI / 'import-fitment.py')
_fit = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_fit)


def convierte(filas, informe):
    """Las fichas ya validadas, en la forma que espera src/vehiculos.ts."""
    salida = []
    for v in informe.vehiculos:
        cruda = filas[v['fila'] - 2] if 0 <= v['fila'] - 2 < len(filas) else {}
        alias = [a.strip() for a in (cruda.get('alias') or '').split('|') if a.strip()]
        salida.append({
            'id': v['id'],
            'marca': v['marca'],
            'modelo': v['modelo'],
            'generacion': v['generacion'],
            'anioDesde': v['anio_desde'],
            'anioHasta': v['anio_hasta'],
            'anclaje': v['pcd'],
            'buje': v['buje_mm'],
            'diametros': v['diametros'],
            'etMin': v['et_min'],
            'etMax': v['et_max'],
            'anchuraMin': v['anchura_min'],
            'anchuraMax': v['anchura_max'],
            'verificacion': v['verificacion'],
            'alias': alias,
        })
    return salida


def main():
    p = argparse.ArgumentParser(description='CSV de vehiculos -> tabla del asistente')
    p.add_argument('csv', help='CSV con filas crear_vehiculo')
    p.add_argument('--out', default=str(RAIZ / 'asistente' / 'datos' / 'vehiculos.json'))
    a = p.parse_args()

    with open(a.csv, newline='', encoding='utf-8') as f:
        filas = list(csv.DictReader(f))

    informe = _fit.Informe()
    _fit.valida(a.csv, informe)

    for fila, msg in informe.errores:
        print(f'ERROR  fila {fila}: {msg}')
    if informe.errores:
        print(f'\n{len(informe.errores)} error(es). No se escribe nada.', file=sys.stderr)
        return 1
    for fila, msg in informe.avisos:
        print(f'AVISO  fila {fila}: {msg}')

    vehiculos = convierte(filas, informe)
    destino = pathlib.Path(a.out)
    anterior = json.loads(destino.read_text(encoding='utf-8')) if destino.exists() else {}
    destino.write_text(json.dumps({
        'generado': datetime.date.today().isoformat(),
        'origen': f'{a.csv}, convertido con tools/vehiculos-a-json.py',
        'nota': anterior.get('nota', ''),
        'vehiculos': vehiculos,
    }, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

    verificadas = sum(1 for v in vehiculos if v['verificacion'] == 'verified')
    print(f'\nFichas escritas ........ {len(vehiculos)}')
    print(f'  verificadas .......... {verificadas}')
    print(f'  sin verificar ........ {len(vehiculos) - verificadas}')
    print(f'Destino ................ {destino}')
    if len(vehiculos) and verificadas == 0:
        print('\nNinguna ficha esta verificada: el asistente podra descartar, no confirmar.')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
