#!/usr/bin/env bash
# SJ Wheels — Toda la batería de pruebas, en orden.
#
#   PREVIEW=https://…shopifypreview.com bash sj-wheels/tests/todas.sh
#
# Las tres primeras no necesitan red. Las cuatro últimas van contra la tienda
# renderizada y necesitan PREVIEW.
set -u
raiz="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$raiz"

fallos=0
titulo() { printf '\n\033[1m── %s ──\033[0m\n' "$1"; }
correr() { titulo "$1"; shift; if "$@"; then :; else fallos=$((fallos+1)); printf '\033[31mFALLÓ\033[0m\n'; fi; }

correr "Revisión estática del tema"   python3 sj-wheels/tests/qa.py
correr "Motor de compatibilidad"      node sj-wheels/tests/fitment.test.js
correr "Guardia de compra"            node sj-wheels/tests/guard/guard.test.js

if [ -z "${PREVIEW:-}" ]; then
  printf '\n\033[33mPREVIEW no está definido: se omiten las pruebas contra la tienda.\033[0m\n'
else
  correr "Enlaces del storefront"     node sj-wheels/tests/enlaces/crawl.js
  correr "Accesibilidad (WCAG 2.2 AA)" node sj-wheels/tests/accesibilidad/axe.js
  correr "Rendimiento y consola"      node sj-wheels/tests/rendimiento/medir.js
  correr "Diseño adaptable y capturas" node sj-wheels/tests/responsive/capturar.js
fi

printf '\n'
if [ "$fallos" -eq 0 ]; then
  printf '\033[32mTodo en verde.\033[0m\n'
else
  printf '\033[31m%s suites con fallos.\033[0m\n' "$fallos"
fi
exit "$fallos"
