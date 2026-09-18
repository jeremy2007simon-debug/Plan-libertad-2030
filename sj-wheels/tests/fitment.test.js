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

console.log(`\n${pass} correctas, ${fail} fallidas`);
process.exit(fail ? 1 : 0);
