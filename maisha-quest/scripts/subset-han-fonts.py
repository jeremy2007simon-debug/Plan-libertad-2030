#!/usr/bin/env python3
"""Genera los subconjuntos de tipografía china que sirve la web.

Por qué existe
--------------
`next/font/google` descarga las familias CJK tal y como las trocea Google: más
de doscientas reglas `@font-face` por familia, una por rango unicode. Ese CSS
—134 kB comprimidos— acababa en la hoja compartida por las seis lenguas,
bloqueaba el pintado 1,4 s en móvil y Lighthouse lo marcaba como CSS 100 % sin
utilizar en las cinco lenguas que no son el chino.

El contenido chino de esta web es finito y está en el repositorio, así que la
solución es un subconjunto: se recogen todos los caracteres que aparecen en el
código, se recortan las fuentes a esos caracteres y se sirven cuatro archivos
propios desde `/fonts`. Cuatro `@font-face` en lugar de ochocientas, y solo en
`/zh-CN`.

Cómo se usa
-----------
1. Descargar las fuentes variables originales (SIL OFL 1.1):
     https://raw.githubusercontent.com/google/fonts/main/ofl/notoserifsc/NotoSerifSC[wght].ttf
     https://raw.githubusercontent.com/google/fonts/main/ofl/notosanssc/NotoSansSC[wght].ttf
2. `pip install fonttools brotli`
3. `python3 scripts/subset-han-fonts.py <carpeta-con-los-ttf>`

Hay que volver a ejecutarlo AL CAMBIAR EL TEXTO EN CHINO. Si un carácter nuevo
no está en el subconjunto, el navegador lo compone con la fuente del sistema y
se nota. `npm run build` lo comprueba y falla si falta alguno.
"""
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "fonts"

# (archivo de origen, eje de peso, nombre de salida)
#
# Los titulares se componen en 400 y en ningún otro peso, así que la serif es
# una cara estática: 195 kB frente a los 339 que costaría conservar el eje.
# La sans sí se usa en tres pesos —400 de cuerpo, 500 en la navegación, 600 en
# los antetítulos— y ahí sale a cuenta la variable: 265 kB en un archivo
# frente a tres estáticas de tamaño parecido cada una.
FACES = [
    ("NotoSerifSC[wght].ttf", "wght=400", "noto-serif-sc"),
    ("NotoSansSC[wght].ttf", "wght=400:600", "noto-sans-sc-var"),
]

# Latín imprimible y la puntuación que se mezcla con el chino en la maqueta.
EXTRA = [chr(c) for c in range(0x20, 0x7F)] + list("—–‘’“”·…°″′")


def used_characters() -> str:
    """Todo carácter no latino que aparece en el código fuente.

    Se barre `src/` entero y no solo los archivos `zh-CN`: los nombres de
    idioma, las etiquetas del selector y cualquier cadena suelta cuentan
    igual, y equivocarse por exceso aquí cuesta unos kilobytes, mientras que
    equivocarse por defecto deja un carácter compuesto con otra fuente.
    """
    chars = set()
    for path in (ROOT / "src").rglob("*"):
        if path.suffix not in (".ts", ".tsx"):
            continue
        for ch in path.read_text(encoding="utf-8"):
            if ord(ch) > 0x2000:
                chars.add(ch)
    return "".join(dict.fromkeys(EXTRA + sorted(chars)))


def main() -> int:
    src_dir = Path(sys.argv[1] if len(sys.argv) > 1 else ".")
    text = used_characters()
    OUT.mkdir(parents=True, exist_ok=True)
    print(f"{len(text)} caracteres en el subconjunto")

    for source, axis, name in FACES:
        src = src_dir / source
        if not src.exists():
            print(f"falta {src}", file=sys.stderr)
            return 1
        dest = OUT / f"{name}.woff2"
        # Las dos son fuentes variables: primero se fija el eje de peso, luego
        # se recorta. Al revés, el subconjunto arrastraría todo el eje.
        static = OUT / f".{name}.instance.ttf"
        subprocess.run(
            [sys.executable, "-m", "fontTools.varLib.instancer", str(src),
             axis, "-o", str(static)],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        subprocess.run(
            [
                sys.executable, "-m", "fontTools.subset", str(static),
                f"--text={text}",
                "--flavor=woff2",
                "--no-hinting",
                "--desubroutinize",
                f"--output-file={dest}",
            ],
            check=True,
        )
        static.unlink()
        print(f"  {dest.name}: {dest.stat().st_size // 1024} kB")

    (OUT / "CARACTERES.txt").write_text(text, encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
