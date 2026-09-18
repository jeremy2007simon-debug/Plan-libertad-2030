/* Pruebas del motor de compatibilidad. Ejecutar: node sj-wheels/tests/fitment.test.js */
const fs = require('fs');
const path = require('path');
global.window = {};
eval(fs.readFileSync(path.join(__dirname, '../theme/assets/sjw-fitment.js'), 'utf8'));
const F = global.window.SJWFitment;

let pass = 0, fail = 0;
function t(name, actual, expected) {
  if (actual === expected) { pass++; }
  else { fail++; console.error(`FALLO: ${name}\n  esperado: ${expected}\n  obtenido: ${actual}`); }
}

// Vehículo verificado de referencia: BMW Serie 3 F30
const f30 = { id: 'gid://v/1', boltPattern: '5x120', centerBore: 72.5,
              allowedDiameters: [17,18,19], etMin: 20, etMax: 45, verification: 'verified' };

// Llanta que encaja en medidas, verificada y enlazada
const base = { boltPattern: '5x120', diameter: 19, width: 8.5, et: 35, centerBore: 72.6,
               requiresManualVerification: false, vehicleIds: ['gid://v/1'] };

t('sin vehículo → unknown', F.evaluate(base, null).status, 'unknown');
t('todo correcto y verificado → ok', F.evaluate(base, f30).status, 'ok');
t('buje mayor → avisa de centradores', F.evaluate(base, f30).needsSpacers, true);

t('PCD distinto → no', F.evaluate({...base, boltPattern:'5x112'}, f30).status, 'no');
t('diámetro no admitido → no', F.evaluate({...base, diameter:22}, f30).status, 'no');
t('ET por encima del máximo → no', F.evaluate({...base, et:60}, f30).status, 'no');
t('ET por debajo del mínimo → no', F.evaluate({...base, et:10}, f30).status, 'no');
t('buje menor que el del coche → no', F.evaluate({...base, centerBore:66.5}, f30).status, 'no');

t('falta el PCD del producto → pending', F.evaluate({...base, boltPattern:null}, f30).status, 'pending');
t('falta el ET del producto → pending', F.evaluate({...base, et:null}, f30).status, 'pending');
t('falta la anchura NO impide decidir', F.evaluate({...base, width:null}, f30).status, 'ok');

t('marcada de revisión obligatoria → pending',
  F.evaluate({...base, requiresManualVerification:true}, f30).status, 'pending');
t('medidas encajan pero sin relación verificada → pending',
  F.evaluate({...base, vehicleIds:[]}, f30).status, 'pending');
t('vehículo sin verificar → pending',
  F.evaluate(base, {...f30, verification:'pending'}).status, 'pending');

// Por defecto (metafield ausente) requiresManualVerification es undefined → debe dar pending
t('metafield de verificación ausente → pending (por defecto prudente)',
  F.evaluate({boltPattern:'5x120', diameter:19, et:35, centerBore:72.5, vehicleIds:['gid://v/1']}, f30).status,
  'pending');

// El rechazo numérico manda sobre todo lo demás
t('PCD distinto pesa más que la relación verificada',
  F.evaluate({...base, boltPattern:'5x114.3'}, f30).status, 'no');

// Normalización de formatos de PCD del proveedor
t('normaliza 5X112', F.normalizeBoltPattern('5X112'), '5x112');
t('normaliza 5x114.30', F.normalizeBoltPattern('5x114.30'), '5x114.3');
t('normaliza con espacios', F.normalizeBoltPattern(' 5 x 120 '), '5x120');
t('rechaza basura', F.normalizeBoltPattern('cinco por ciento'), null);

/* ===================================================================== *
 *  Pruebas ampliadas (fase de estabilización)
 * ===================================================================== */

// Vehículo con años declarados
const f30y = { ...f30, yearFrom: 2012, yearTo: 2019 };
const g20  = { ...f30, id: 'gid://v/2', yearFrom: 2019, yearTo: null };

/* --- Límites exactos del ET ------------------------------------------ */
t('ET justo en el mínimo (20) → ok',      F.evaluate({...base, et:20}, f30).status, 'ok');
t('ET justo en el máximo (45) → ok',      F.evaluate({...base, et:45}, f30).status, 'ok');
t('ET 0.1 por encima del máximo → no',    F.evaluate({...base, et:45.1}, f30).status, 'no');
t('ET 0.1 por debajo del mínimo → no',    F.evaluate({...base, et:19.9}, f30).status, 'no');
t('ET negativo dentro de un rango negativo → ok',
  F.evaluate({...base, et:-5}, {...f30, etMin:-10, etMax:10}).status, 'ok');

/* --- Año dentro y fuera de rango -------------------------------------- */
t('año dentro de la generación → ok',
  F.evaluate(base, {...f30y, selectedYear: 2015}).status, 'ok');
t('año anterior a la generación → no',
  F.evaluate(base, {...f30y, selectedYear: 2010}).status, 'no');
t('año posterior a la generación → no',
  F.evaluate(base, {...f30y, selectedYear: 2022}).status, 'no');
t('generación en producción (sin year_to) admite el año actual → ok',
  F.evaluate({...base, vehicleIds:['gid://v/2']}, {...g20, selectedYear: 2026}).status, 'ok');
t('año consultado sin años en la ficha del vehículo → pending',
  F.evaluate(base, {...f30, selectedYear: 2015}).status, 'pending');
t('el año fuera de rango se explica como motivo "year"',
  F.evaluate(base, {...f30y, selectedYear: 2010}).reasons[0].field, 'year');

/* --- Configuración escalonada delantera/trasera ----------------------- */
t('escalonada con eje trasero válido → ok',
  F.evaluate({...base, width:8.5, rearWidth:9.5, rearEt:40, rearDiameter:19}, f30).status, 'ok');
t('escalonada con ET trasero fuera de rango → no',
  F.evaluate({...base, rearWidth:9.5, rearEt:60, rearDiameter:19}, f30).status, 'no');
t('escalonada con diámetro trasero no admitido → no',
  F.evaluate({...base, rearWidth:9.5, rearEt:40, rearDiameter:22}, f30).status, 'no');
t('escalonada con buje trasero menor → no',
  F.evaluate({...base, rearWidth:9.5, rearEt:40, rearCenterBore:66.5}, f30).status, 'no');
t('escalonada con anchura trasera imposible → pending',
  F.evaluate({...base, rearWidth:95, rearEt:40}, f30).status, 'pending');
t('escalonada sin ET trasero declarado no inventa nada → ok',
  F.evaluate({...base, rearWidth:9.5}, f30).status, 'ok');

/* --- Decimales con coma ----------------------------------------------- */
t('buje "72,6" se lee como 72.6',     F.toNumber('72,6'), 72.6);
t('ET "35,5" se lee como 35.5',       F.toNumber('35,5'), 35.5);
t('buje con coma → ok y avisa de centradores',
  F.evaluate({...base, centerBore:'72,6'}, f30).needsSpacers, true);
t('ET con coma dentro de rango → ok',
  F.evaluate({...base, et:'35,5'}, f30).status, 'ok');
t('"8.5 J" no se lee como 8.5',        F.toNumber('8.5 J'), null);
t('"20X90" no se lee como 20',         F.toNumber('20X90'), null);

/* --- Valores vacíos ---------------------------------------------------- */
t('ET cadena vacía → pending',         F.evaluate({...base, et:''}, f30).status, 'pending');
t('PCD cadena vacía → pending',        F.evaluate({...base, boltPattern:''}, f30).status, 'pending');
t('buje cadena vacía → pending',       F.evaluate({...base, centerBore:''}, f30).status, 'pending');
t('diámetro cadena vacía → pending',   F.evaluate({...base, diameter:''}, f30).status, 'pending');
t('vehículo sin rango de ET → pending', F.evaluate(base, {...f30, etMin:null}).status, 'pending');
t('vehículo sin diámetros admitidos → pending',
  F.evaluate(base, {...f30, allowedDiameters:[]}).status, 'pending');

/* --- La anomalía 20X90 del proveedor ---------------------------------- */
t('anchura 90 pulgadas → pending, nunca ok',
  F.evaluate({...base, width:90}, f30).status, 'pending');
t('anchura 90 se señala como dato anómalo',
  F.evaluate({...base, width:90}, f30).missing.indexOf('anchura_producto_anomala') !== -1, true);
t('anchura "20X90" sin interpretar → pending',
  F.evaluate({...base, width:'20X90'}, f30).status, 'pending');
t('anchura 8.5 correcta no estorba → ok',
  F.evaluate({...base, width:'8,5'}, f30).status, 'ok');

/* --- Buje: tolerancia -------------------------------------------------- */
t('buje idéntico → sin centradores',
  F.evaluate({...base, centerBore:72.5}, f30).needsSpacers, false);
t('buje 0.04 mayor entra en tolerancia → sin centradores',
  F.evaluate({...base, centerBore:72.54}, f30).needsSpacers, false);
t('buje 0.04 menor entra en tolerancia → no rechaza',
  F.evaluate({...base, centerBore:72.46}, f30).status, 'ok');

/* --- La relación producto↔vehículo no se puede deducir ---------------- */
t('enlazada a OTRO vehículo → pending',
  F.evaluate({...base, vehicleIds:['gid://v/99']}, f30).status, 'pending');
t('vehicleIds no es un array → pending',
  F.evaluate({...base, vehicleIds:'gid://v/1'}, f30).status, 'pending');
t('medidas perfectas + vehículo verificado, pero sin enlace → pending',
  F.evaluate({...base, vehicleIds:[]}, f30).missing[0], 'relacion_no_verificada');

/* --- Normalización de PCD --------------------------------------------- */
t('normaliza 5*120',        F.normalizeBoltPattern('5*120'), '5x120');
t('normaliza 5×120',        F.normalizeBoltPattern('5×120'), '5x120');
t('normaliza 5x120.0',      F.normalizeBoltPattern('5x120.0'), '5x120');
t('rechaza PCD incompleto', F.normalizeBoltPattern('5x'), null);
t('PCD nulo → pending',     F.evaluate({...base, boltPattern:null}, f30).status, 'pending');

/* --- Tipos de dato ----------------------------------------------------- */
t('diámetro en texto "19" → ok',   F.evaluate({...base, diameter:'19'}, f30).status, 'ok');
t('ET en texto "35" → ok',         F.evaluate({...base, et:'35'}, f30).status, 'ok');

console.log(`\n${pass} correctas, ${fail} fallidas`);
process.exit(fail ? 1 : 0);
