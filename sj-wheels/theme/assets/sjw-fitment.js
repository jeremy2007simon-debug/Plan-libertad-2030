/**
 * SJ Wheels — Motor de compatibilidad
 *
 * Decide si una llanta encaja en un vehículo comparando NÚMEROS, nunca texto.
 * La marca, el título, las etiquetas y la descripción no se usan jamás para
 * afirmar compatibilidad.
 *
 * Los tres estados posibles son:
 *   'ok'      → Compatible con tu vehículo
 *   'pending' → Necesita confirmación técnica
 *   'no'      → No compatible con tu vehículo
 *
 * Regla de oro: las comprobaciones numéricas solo pueden RECHAZAR o DEJAR EN
 * PENDIENTE. Para llegar a 'ok' hace falta, además, que el producto referencie
 * explícitamente ese vehículo y que la ficha del vehículo esté verificada.
 * Así es imposible que un texto parecido acabe mostrando "Compatible".
 */
(function () {
  'use strict';

  var S = { OK: 'ok', PENDING: 'pending', NO: 'no', UNKNOWN: 'unknown' };

  /**
   * Convierte a número. Acepta la coma decimal del proveedor ("72,5") y
   * rechaza cualquier cosa que no sea un número limpio: "8.5 J" o "20X90"
   * devuelven null en vez de un 8.5 o un 20 inventados por parseFloat.
   */
  function num(value) {
    if (value === null || value === undefined) return null;
    if (typeof value === 'number') return isFinite(value) ? value : null;
    var s = String(value).trim().replace(/\s+/g, '');
    if (!s) return null;
    if (s.indexOf(',') !== -1 && s.indexOf('.') === -1) s = s.replace(',', '.');
    if (!/^-?\d+(\.\d+)?$/.test(s)) return null;
    var n = parseFloat(s);
    return isFinite(n) ? n : null;
  }

  /** Anchura de llanta plausible en pulgadas. Fuera de esto, el dato es basura. */
  function widthOk(w) { return w !== null && w >= 4 && w <= 16; }

  /** Normaliza "5X112", "5x112 ", "5*112" → "5x112". */
  function pcd(value) {
    if (!value) return null;
    var m = String(value).toLowerCase().replace(/\s+/g, '').match(/^(\d+)[x*×](\d+(?:\.\d+)?)$/);
    return m ? m[1] + 'x' + parseFloat(m[2]) : null;
  }

  /**
   * @param {Object} p  Llanta: {boltPattern, diameter, width, et, etMin, etMax,
   *                             centerBore, requiresManualVerification, vehicleIds[]}
   * @param {Object} v  Vehículo: {id, boltPattern, centerBore, allowedDiameters[],
   *                               etMin, etMax, verification}
   */
  function evaluate(p, v) {
    if (!v || !v.id) return { status: S.UNKNOWN, reasons: [], missing: [], needsSpacers: false };

    var reasons = [];   // motivos de rechazo
    var missing = [];   // datos que faltan para poder decidir
    var needsSpacers = false;

    /* --- 1. PCD: eliminatorio y sin tolerancia ---------------------------- */
    var pP = pcd(p.boltPattern), pV = pcd(v.boltPattern);
    if (!pP) missing.push('bolt_pattern_producto');
    else if (!pV) missing.push('bolt_pattern_vehiculo');
    else if (pP !== pV) reasons.push({ field: 'bolt_pattern', expected: pV, got: pP });

    /* --- 2. Diámetro dentro de los admitidos por el vehículo -------------- */
    var dP = num(p.diameter);
    var dList = Array.isArray(v.allowedDiameters) ? v.allowedDiameters.map(num).filter(function (x) { return x !== null; }) : [];
    if (dP === null) missing.push('diametro_producto');
    else if (!dList.length) missing.push('diametros_vehiculo');
    else if (dList.indexOf(dP) === -1) reasons.push({ field: 'diameter', expected: dList.join('", "') + '"', got: dP + '"' });

    /* --- 3. ET dentro del rango admitido ---------------------------------- */
    var eP = num(p.et), vMin = num(v.etMin), vMax = num(v.etMax);
    if (eP === null) missing.push('et_producto');
    else if (vMin === null || vMax === null) missing.push('et_vehiculo');
    else if (eP < vMin || eP > vMax) reasons.push({ field: 'et', expected: vMin + ' a ' + vMax, got: eP });

    /* --- 4. Buje central --------------------------------------------------
       El buje de la llanta nunca puede ser MENOR que el del vehículo: no
       entraría. Si es mayor, encaja pero necesita centradores.               */
    var bP = num(p.centerBore), bV = num(v.centerBore);
    if (bP === null) missing.push('buje_producto');
    else if (bV === null) missing.push('buje_vehiculo');
    else if (bP < bV - 0.05) reasons.push({ field: 'center_bore', expected: '≥ ' + bV + ' mm', got: bP + ' mm' });
    else if (bP > bV + 0.05) needsSpacers = true;

    /* --- 5. Anchura: solo como control de cordura -------------------------
       La anchura no descarta por sí sola, pero un valor imposible (el famoso
       "20X90" del proveedor) no puede darse por bueno: pasa a dato ausente.  */
    if (p.width !== null && p.width !== undefined && p.width !== '') {
      if (!widthOk(num(p.width))) missing.push('anchura_producto_anomala');
    }

    /* --- 6. Año -----------------------------------------------------------
       Si se consulta un año concreto, debe caer dentro de la generación.
       Sin year_to, la generación se considera en producción.                 */
    var yQ = num(v.selectedYear), yF = num(v.yearFrom), yT = num(v.yearTo);
    if (yQ !== null) {
      if (yF === null) missing.push('anios_vehiculo');
      else if (yQ < yF || (yT !== null && yQ > yT)) {
        reasons.push({ field: 'year', expected: yF + (yT === null ? ' en adelante' : ' a ' + yT), got: yQ });
      }
    }

    /* --- 7. Eje trasero (configuración escalonada) ------------------------
       Si la llanta trasera es distinta, sus medidas se comprueban igual.     */
    var rE = num(p.rearEt), rD = num(p.rearDiameter), rB = num(p.rearCenterBore);
    var rearDeclared = (p.rearEt !== null && p.rearEt !== undefined && p.rearEt !== '') ||
                       (p.rearDiameter !== null && p.rearDiameter !== undefined && p.rearDiameter !== '') ||
                       (p.rearWidth !== null && p.rearWidth !== undefined && p.rearWidth !== '');
    if (rearDeclared) {
      if (p.rearEt !== null && p.rearEt !== undefined && p.rearEt !== '') {
        if (rE === null) missing.push('et_trasero_producto');
        else if (vMin !== null && vMax !== null && (rE < vMin || rE > vMax)) {
          reasons.push({ field: 'rear_et', expected: vMin + ' a ' + vMax, got: rE });
        }
      }
      if (p.rearDiameter !== null && p.rearDiameter !== undefined && p.rearDiameter !== '') {
        if (rD === null) missing.push('diametro_trasero_producto');
        else if (dList.length && dList.indexOf(rD) === -1) {
          reasons.push({ field: 'rear_diameter', expected: dList.join('", "') + '"', got: rD + '"' });
        }
      }
      if (p.rearWidth !== null && p.rearWidth !== undefined && p.rearWidth !== '') {
        if (!widthOk(num(p.rearWidth))) missing.push('anchura_trasera_anomala');
      }
      if (rB !== null && bV !== null) {
        if (rB < bV - 0.05) reasons.push({ field: 'rear_center_bore', expected: '≥ ' + bV + ' mm', got: rB + ' mm' });
        else if (rB > bV + 0.05) needsSpacers = true;
      }
    }

    /* --- Resolución ------------------------------------------------------- */
    // Un rechazo numérico con datos completos es definitivo.
    if (reasons.length) {
      return { status: S.NO, reasons: reasons, missing: missing, needsSpacers: needsSpacers };
    }
    // Falta algún dato: no podemos afirmar nada.
    if (missing.length) {
      return { status: S.PENDING, reasons: [], missing: missing, needsSpacers: needsSpacers };
    }
    // El propietario marcó esta llanta como de revisión obligatoria.
    if (p.requiresManualVerification !== false) {
      return { status: S.PENDING, reasons: [], missing: [], needsSpacers: needsSpacers, forced: true };
    }
    // Las medidas encajan, pero nadie ha verificado esta pareja llanta/vehículo.
    var linked = Array.isArray(p.vehicleIds) && p.vehicleIds.indexOf(v.id) !== -1;
    if (!linked) {
      return { status: S.PENDING, reasons: [], missing: ['relacion_no_verificada'], needsSpacers: needsSpacers };
    }
    if (v.verification !== 'verified') {
      return { status: S.PENDING, reasons: [], missing: ['vehiculo_no_verificado'], needsSpacers: needsSpacers };
    }
    return { status: S.OK, reasons: [], missing: [], needsSpacers: needsSpacers };
  }

  /** Lee la ficha técnica que Liquid deja en el DOM para un producto. */
  function readProduct(el) {
    if (!el) return null;
    try { return JSON.parse(el.textContent); } catch (e) { return null; }
  }

  window.SJWFitment = {
    STATUS: S,
    evaluate: evaluate,
    readProduct: readProduct,
    normalizeBoltPattern: pcd,
    toNumber: num
  };
})();
