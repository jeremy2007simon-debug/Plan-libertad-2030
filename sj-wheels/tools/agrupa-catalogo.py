#!/usr/bin/env python3
"""Agrupa el catalogo de SJ Wheels en un producto por diseno.

Este es el script que construyo la reorganizacion del 21-09-2026 y el que hay
que usar en las actualizaciones siguientes. Existe por una razon concreta: la
carga inicial del catalogo creo un producto por medida, de modo que un mismo
diseno aparecia repetido tantas veces como combinaciones tenia. Si una futura
importacion vuelve a recorrer el fichero del proveedor fila a fila, volvera a
crear un producto por medida y deshara la agrupacion.

La regla es:

    una fila del proveedor = una VARIANTE
    un codigo de diseno    = un PRODUCTO

Cada diseno se publica con tres opciones compuestas, que es lo que cabe en el
limite de tres opciones por producto de Shopify sin inventar combinaciones:

    Medida   19 x 8,5"
    Montaje  5x112 - ET35 - Buje 66,6 mm
    Acabado  Cod. proveedor MB

Solo se generan las combinaciones que existen en los datos del proveedor: el
payload de productSet lleva las variantes una a una, nunca el producto
cartesiano de los valores de opcion. Cada variante conserva su SKU, su precio,
sus datos tecnicos en metafields propios y la trazabilidad del producto del
que salio (custom.origen_producto).

El bloqueo de compra viaja en los datos, no en el tema: inventario seguido,
cero unidades y politica DENY, que es lo que hace que Shopify devuelva
available = false.

Salida: un JSON con un payload de productSet por diseno, listo para enviar a
la Admin API. El script no escribe en Shopify.

    python3 tools/agrupa-catalogo.py --filas filas.json --export export.jsonl \
        --out productos.json
"""
import argparse, json, collections

ARGS = argparse.ArgumentParser(description=__doc__.splitlines()[0])
ARGS.add_argument('--filas', required=True,
                  help='JSON con una fila por referencia del proveedor')
ARGS.add_argument('--export', required=True,
                  help='JSONL de la exportacion previa, de donde salen las notas del proveedor')
ARGS.add_argument('--out', required=True, help='JSON de salida con los payloads de productSet')
ARGS = ARGS.parse_args()
rows=json.load(open(ARGS.filas))
mf_by_pid=collections.defaultdict(dict)
for l in open(ARGS.export):
    o=json.loads(l)
    if 'namespace' in o and not o.get('id','').startswith('gid'):
        mf_by_pid[o['__parentId']][o['key']]=o['value']

RETRATADO={'SJW-038':'MB+L','SJW-040':'MB','SJW-041':'MBI','SJW-043':'MB','SJW-044':'MB',
           'SJW-048':'MB','SJW-049':'MB','SJW-059':'B','SJW-074':'MB','SJW-124':'MG'}
RENDERS={'SJW-059','SJW-074','SJW-124'}

PRESENTACION={
 'SJW-038':'Cinco radios anchos y planos, muy separados entre sí, con forma de pala que se ensancha hacia el borde. La cara de cada radio va mecanizada en tono claro y los huecos que quedan entre ellos son profundos y oscuros, de modo que el contraste define la rueda desde lejos. Es el diseño de trazo más limpio y menos radios de la selección.',
 'SJW-040':'Diez radios finos que nacen del centro en parejas y se abren en abanico hasta el aro, con una ligera curvatura. La cara mecanizada brilla sobre el fondo oscuro de los huecos y el borde exterior lleva una pestaña pulida que remata el conjunto. Un dibujo denso pero ordenado, de aire clásico.',
 'SJW-041':'Un frente de radios muy numerosos y estrechos, casi de turbina, separados por ventanas alargadas que siguen el giro de la rueda. La cara pulida contrasta con unos huecos negros muy profundos, y el resultado es el diseño más trabajado y de mayor efecto óptico de la selección.',
 'SJW-043':'Diez radios dobles delgados, ligeramente inclinados en el sentido de giro, que dejan a la vista un buje amplio. Alterna superficie mecanizada en la cara y negro en los laterales del radio, con el aro exterior pulido. Un dibujo dinámico sin llegar a recargado.',
 'SJW-044':'Cinco radios dobles en Y, anchos y con una arista central bien marcada, que dividen la rueda en cinco grandes ventanas oscuras. La cara va pulida de extremo a extremo y el borde continúa esa línea clara. Es el diseño de aspecto más deportivo y rotundo del grupo.',
 'SJW-048':'Cinco radios dobles recorridos por un nervio central en relieve que llega hasta el aro. Dentro de un mismo radio conviven una franja pulida y una zona oscura, lo que da profundidad al conjunto sin multiplicar el número de radios. Dibujo estructurado y de lectura clara.',
 'SJW-049':'Cinco radios dobles anchos con una hendidura longitudinal que los recorre por el centro, rematados en un aro con canal. La cara está muy pulida y las ventanas entre radios son grandes y limpias. Un diseño de trazo ancho, sobrio y con presencia.',
 'SJW-059':'Radios finos que se entrelazan al acercarse al centro y forman una estrella de perfil profundo, sobre un aro claramente cóncavo. La cara mecanizada destaca sobre el fondo oscuro y el conjunto gana relieve según cambia el punto de vista. Diseño de corte contemporáneo.',
 'SJW-074':'Una malla de radios finos que se cruzan entre sí y forman celdas irregulares, con aspecto de entramado más que de radios sueltos. El perfil es profundo y la cara mecanizada dibuja la retícula sobre un fondo oscuro. Es el diseño más reconocible por su trama.',
 'SJW-124':'Diez radios rectos y muy delgados que salen del buje en línea recta hacia el aro, sin curvatura. La cara está pulida casi en su totalidad y el aro, ancho, remata el dibujo. Un dibujo despejado, limpio y de lectura inmediata.',
}

def esp(x): return str(x).replace('.',',')
def lista(xs):
    xs=list(xs)
    return xs[0] if len(xs)==1 else ', '.join(xs[:-1])+' y '+xs[-1]

fams=collections.defaultdict(list)
for r in rows: fams[r['fam']].append(r)

LOC='gid://shopify/Location/113224188237'
salida={}
for fam in sorted(fams):
    v=sorted(fams[fam], key=lambda x:(int(x['d']), float(x['w']), x['pcd'], x['acabado']))
    pic=RETRATADO[fam]; rend = fam in RENDERS
    diam=sorted({int(x['d']) for x in v}); anch=sorted({float(x['w']) for x in v})
    pcds=sorted({x['pcd'] for x in v}); ets=sorted({int(x['et']) for x in v})
    bujes=sorted({float(x['buje']) for x in v}); acab=sorted({x['acabado'] for x in v})
    rango = f'{diam[0]}"' if len(diam)==1 else f'{diam[0]}"–{diam[-1]}"'
    titulo=f'Llanta SJW-{fam[4:]} · {rango}'
    handle=f'sjw-{fam[4:]}'

    if rend and len(acab)==1:
        img_txt=(f'<p><strong>Imagen.</strong> El proveedor no facilita fotografía de este diseño: la imagen es un '
                 f'render generado por ordenador y corresponde al código de acabado {pic}. Sirve para ver la forma, '
                 f'no el producto real.</p>')
    elif rend:
        img_txt=(f'<p><strong>Imagen.</strong> El proveedor facilita una sola imagen de este diseño, generada por '
                 f'ordenador y correspondiente al código de acabado {pic}. Para el resto de acabados ({lista([a for a in acab if a!=pic])}) '
                 f'es una imagen de referencia: muestra la forma, no el color ni el producto real.</p>')
    elif len(acab)==1:
        img_txt=(f'<p><strong>Imagen.</strong> Fotografía de estudio del proveedor, correspondiente al código de '
                 f'acabado {pic}, que es el único de este diseño.</p>')
    else:
        img_txt=(f'<p><strong>Imagen.</strong> El proveedor facilita una sola fotografía de este diseño y corresponde '
                 f'al código de acabado {pic}. Para el resto de acabados ({lista([a for a in acab if a!=pic])}) es una '
                 f'imagen de referencia: muestra la forma, no el color.</p>')

    desc=(f'<p>{PRESENTACION[fam]}</p>'
          f'<p><strong>Medidas y acabados disponibles.</strong> '
          f'Diámetros {lista([str(d)+chr(34) for d in diam])} · '
          f'anchuras {lista([esp(a)+chr(34) for a in anch])} · '
          f'anclaje {lista(pcds)} · ET de {ets[0]} a {ets[-1]} mm · '
          f'buje {lista([esp(b)+" mm" for b in bujes])} · '
          f'código de acabado del proveedor {lista(acab)}. '
          f'Cada combinación que puedes elegir arriba corresponde a una referencia real del catálogo, con su SKU; '
          f'las combinaciones que no existen no aparecen. SJ Wheels no dispone todavía de la carta de colores, '
          f'así que el acabado se identifica por el código del proveedor y no se traduce a un nombre comercial.</p>'
          + img_txt +
          f'<p><strong>Antes de pedir: comprobación de compatibilidad.</strong> Ninguna combinación de este diseño '
          f'tiene la compatibilidad verificada todavía. SJ Wheels revisa la medida y la configuración de tu vehículo '
          f'antes de aceptar cualquier pedido, y una confirmación del cliente no sustituye a esa comprobación. '
          f'El precio está bajo consulta y el contenido del pedido sigue pendiente de documentar por el proveedor.</p>'
          f'<p>SJW-{fam[4:]} es una denominación interna de SJ Wheels para agrupar las referencias del mismo diseño: '
          f'no es una marca, un modelo comercial ni una certificación del fabricante.</p>')

    tags=['llantas', f'diseno-sjw-{fam[4:]}', 'agrupado-por-diseno']
    tags += [f'llantas-{d}' for d in diam]
    tags += sorted(pcds)
    tags += [f'acabado-{a.lower().replace("+","-")}' for a in acab]

    variantes=[]
    for i,x in enumerate(v):
        pm=mf_by_pid[x['pid']]
        coincide = x['acabado']==pic
        if rend and coincide: iest=f'Render 3D del proveedor, correspondiente a este código de acabado ({pic}). No es una fotografía del producto real.'
        elif rend:            iest=f'Imagen de referencia: render 3D correspondiente al acabado {pic}, no al acabado {x["acabado"]} de esta referencia.'
        elif coincide:        iest=f'Fotografía de estudio del proveedor, correspondiente a este código de acabado ({pic}).'
        else:                 iest=f'Imagen de referencia: la fotografía corresponde al acabado {pic}, no al acabado {x["acabado"]} de esta referencia.'
        vm=[{'namespace':'custom','key':'wheel_diameter','type':'number_integer','value':str(x['d'])},
            {'namespace':'custom','key':'wheel_width','type':'number_decimal','value':str(x['w'])},
            {'namespace':'custom','key':'bolt_pattern','type':'single_line_text_field','value':x['pcd']},
            {'namespace':'custom','key':'offset_et','type':'number_integer','value':str(x['et'])},
            {'namespace':'custom','key':'center_bore','type':'number_decimal','value':str(x['buje'])},
            {'namespace':'custom','key':'supplier_finish_code','type':'single_line_text_field','value':x['acabado']},
            {'namespace':'custom','key':'requires_manual_verification','type':'boolean','value':pm.get('requires_manual_verification','true')},
            {'namespace':'custom','key':'set_weight_estimate_kg','type':'number_decimal','value':pm.get('set_weight_estimate_kg','')},
            {'namespace':'custom','key':'origen_producto','type':'single_line_text_field',
             'value':f"{x['handle']} · {x['pid'].split('/')[-1]} · variante {x['vid'].split('/')[-1]}"},
            {'namespace':'custom','key':'imagen_estado','type':'single_line_text_field','value':iest}]
        if pm.get('supplier_note'):
            vm.append({'namespace':'custom','key':'supplier_note','type':'multi_line_text_field','value':pm['supplier_note']})
        vm=[m for m in vm if m['value']!='']
        variantes.append({
            'optionValues':[{'optionName':'Medida','name':x['medida']},
                            {'optionName':'Montaje','name':x['montaje']},
                            {'optionName':'Acabado','name':'Cód. proveedor '+x['acabado']}],
            'sku':x['sku'], 'price':x['price'], 'position':i+1,
            'inventoryPolicy':'DENY',
            'inventoryItem':{'tracked':True},
            'inventoryQuantities':[{'locationId':LOC,'name':'available','quantity':0}],
            'metafields':vm})

    opt_medida=sorted({x['medida'] for x in v}, key=lambda s:(int(s.split(' × ')[0]), float(s.split(' × ')[1].replace('"','').replace(',','.'))))
    opt_montaje=sorted({x['montaje'] for x in v})
    opt_acab=sorted({'Cód. proveedor '+x['acabado'] for x in v})

    alt=f'Diseño SJW-{fam[4:]}, imagen del proveedor' + (' (render 3D)' if rend else '') + f', acabado {pic}'
    salida[fam]={
      'title':titulo,'handle':handle,'status':'DRAFT','vendor':'SJ Wheels','productType':'Llantas',
      'descriptionHtml':desc,'tags':tags,
      'seo':{'title':f'{titulo} | SJ Wheels',
             'description':(f'Diseño SJW-{fam[4:]} en {lista([str(d)+chr(34) for d in diam])}, anclaje {lista(pcds)}. '
                            f'{len(v)} referencias. Precio bajo consulta y compatibilidad pendiente de confirmación técnica.')[:320]},
      'productOptions':[{'name':'Medida','position':1,'values':[{'name':m} for m in opt_medida]},
                        {'name':'Montaje','position':2,'values':[{'name':m} for m in opt_montaje]},
                        {'name':'Acabado','position':3,'values':[{'name':m} for m in opt_acab]}],
      'files':[{'originalSource':v[0]['img'],'contentType':'IMAGE','alt':alt,
                'filename':f'sjw-{fam[4:]}-diseno.png','duplicateResolutionMode':'APPEND_UUID'}],
      'metafields':[
        {'namespace':'custom','key':'design_code','type':'single_line_text_field','value':f'wheel-design-{fam[4:]}'},
        {'namespace':'custom','key':'price_status','type':'single_line_text_field','value':'PVP pendiente de validación comercial'},
        {'namespace':'custom','key':'availability_status','type':'single_line_text_field','value':'Venta bajo pedido: sin stock confirmado. La compra está bloqueada hasta que SJ Wheels confirme la disponibilidad por escrito'},
        {'namespace':'custom','key':'set_contents_status','type':'single_line_text_field','value':'Pendiente de documentar: unidades incluidas en el precio, neumáticos, tornillería y centradores'},
        {'namespace':'custom','key':'requires_manual_verification','type':'boolean','value':'true'},
        {'namespace':'custom','key':'weight_source','type':'single_line_text_field','value':'Estimación de SJ Wheels calculada a partir del diámetro; no es una medición del fabricante ni el peso embalado para el envío'},
      ],
      'variants':variantes,
      '_skus':[x['sku'] for x in v], '_n':len(v),
    }
json.dump(salida, open(ARGS.out, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
for f in sorted(salida):
    s=salida[f]
    print(f"{f}: {s['_n']:2d} variantes · {s['title']} · opciones {[len(o['values']) for o in s['productOptions']]}")
