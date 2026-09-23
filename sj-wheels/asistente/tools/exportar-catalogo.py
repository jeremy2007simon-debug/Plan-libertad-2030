#!/usr/bin/env python3
"""Regenera datos/catalogo.json a partir de la tienda.

El asistente no consulta Shopify en cada mensaje: trabaja con una
instantanea. Asi responde rapido, no se cae si la API tiene un mal dia, y
—esto es lo que importa— no puede ver ningun dato que no hayamos revisado
antes. Cuando cambie el catalogo, hay que volver a ejecutar esto.

Lo que deliberadamente NO se exporta son los precios. Estan guardados en
Shopify y bajo consulta; si el dato no llega al asistente, el asistente no
puede decirlo por descuido.

Uso:
    python3 tools/exportar-catalogo.py --entrada respuesta.json
    python3 tools/exportar-catalogo.py --consulta      # imprime el GraphQL

La consulta hay que lanzarla con las credenciales de la tienda y guardar la
respuesta; este script no lleva ningun token.
"""
import argparse, json, datetime, sys

CONSULTA = """
query CatalogoAsistente {
  products(first: 50, query: "tag:agrupado-por-diseno") {
    nodes {
      handle title descriptionHtml
      variants(first: 50) {
        nodes {
          id sku title
          metafields(first: 20, namespace: "custom") { nodes { key value } }
        }
      }
    }
  }
}
""".strip()


def metafield(variante, clave):
    for m in variante['metafields']['nodes']:
        if m['key'] == clave:
            return m['value']
    return None


def convierte(respuesta):
    disenos = []
    for p in respuesta['data']['products']['nodes']:
        diseno = p['handle'].upper().replace('SJW-', 'SJW-')
        variantes = []
        for v in p['variants']['nodes']:
            falta = [k for k in ('wheel_diameter', 'wheel_width', 'bolt_pattern',
                                 'offset_et', 'center_bore') if metafield(v, k) is None]
            if falta:
                # Una variante sin medidas no se puede comprobar. Se avisa y se
                # deja fuera en lugar de colarla con huecos que el modelo
                # tendria que rellenar de alguna manera.
                print(f'AVISO {v["sku"]}: sin {", ".join(falta)}; queda fuera', file=sys.stderr)
                continue
            vid = v['id'].rsplit('/', 1)[-1]
            variantes.append({
                'sku': v['sku'],
                'variantId': v['id'],
                'titulo': v['title'],
                'diametro': float(metafield(v, 'wheel_diameter')),
                'anchura': float(metafield(v, 'wheel_width')),
                'anclaje': metafield(v, 'bolt_pattern'),
                'et': float(metafield(v, 'offset_et')),
                'buje': float(metafield(v, 'center_bore')),
                'acabado': metafield(v, 'supplier_finish_code') or '',
                'imagen': metafield(v, 'imagen_estado') or '',
                'url': f"/products/{p['handle']}?variant={vid}",
                'compraBloqueada': True,
                'requiereVerificacion': metafield(v, 'requires_manual_verification') != 'false',
                'vehiculosVerificados': json.loads(metafield(v, 'compatible_vehicles') or '[]'),
            })
        disenos.append({
            'diseno': diseno,
            'handle': p['handle'],
            'titulo': p['title'],
            'url': '/products/' + p['handle'],
            'rasgos': p['descriptionHtml'].split('</p>')[0].replace('<p>', ''),
            'variantes': variantes,
        })
    disenos.sort(key=lambda d: d['diseno'])

    sin_verificar = all(not v['vehiculosVerificados']
                        for d in disenos for v in d['variantes'])
    nota = ('Ninguna variante tiene la compatibilidad verificada: vehiculosVerificados esta '
            'vacio en todas y requiereVerificacion es true. El asistente no puede afirmar que '
            'una llanta encaje en un vehiculo.') if sin_verificar else (
            'Algunas variantes ya tienen vehiculos verificados. Solo esas pueden presentarse '
            'como compatibles, y solo con el vehiculo concreto que figure en su lista.')

    return {
        'generado': datetime.date.today().isoformat(),
        'fuente': 'Tienda SJ Wheels, productos con la etiqueta agrupado-por-diseno',
        'precios': 'No se publican. Todas las referencias estan bajo consulta.',
        'nota': nota,
        'disenos': disenos,
    }


def main():
    p = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    p.add_argument('--consulta', action='store_true', help='imprime el GraphQL y sale')
    p.add_argument('--entrada', help='JSON con la respuesta de la consulta')
    p.add_argument('--salida', default='datos/catalogo.json')
    a = p.parse_args()

    if a.consulta:
        print(CONSULTA)
        return
    if not a.entrada:
        p.error('hace falta --entrada (o --consulta)')

    catalogo = convierte(json.load(open(a.entrada, encoding='utf-8')))
    with open(a.salida, 'w', encoding='utf-8') as f:
        json.dump(catalogo, f, ensure_ascii=False, indent=1)

    n = sum(len(d['variantes']) for d in catalogo['disenos'])
    print(f"{len(catalogo['disenos'])} disenos, {n} variantes -> {a.salida}")


if __name__ == '__main__':
    main()
