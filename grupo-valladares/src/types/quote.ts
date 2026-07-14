// Contrato de la solicitud de presupuesto. Se mantiene como tipo
// independiente (no acoplado al formulario) para que un futuro triaje
// automatizado (NovaCore Assistant) pueda consumir el mismo payload sin
// cambios en el frontend.
export type QuoteRequest = {
  name: string;
  company?: string;
  phone: string;
  email: string;
  vehicle?: string;
  plate?: string;
  part: string;
  notes?: string;
};

export type QuoteResult =
  | { ok: true; id: string }
  | { ok: false; error: string };
