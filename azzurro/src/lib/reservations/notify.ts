import type { ReservationRecord } from "@/types/reservation";

// -----------------------------------------------------------------------
// Notificación por correo al restaurante cuando entra una reserva.
//
// Hoy: sin proveedor de email configurado, no se envía nada — solo se
// registra en el log del servidor. Para activarla:
//
//   1. Elige un proveedor (Resend, Postmark, SMTP...) e instala su SDK.
//   2. Rellena RESERVATION_NOTIFICATION_EMAIL en .env.local con la
//      dirección del restaurante (ver .env.example), más las
//      credenciales que pida el proveedor elegido.
//   3. Sustituye el cuerpo de sendReservationNotification() por el envío
//      real, por ejemplo con Resend:
//
//      await resend.emails.send({
//        from: "reservas@<dominio-real>",
//        to,
//        subject: `Nueva reserva — ${record.name}`,
//        text: `${record.date} ${record.time} · ${record.guests} personas`,
//      });
// -----------------------------------------------------------------------

export async function sendReservationNotification(
  record: ReservationRecord
): Promise<void> {
  const to = process.env.RESERVATION_NOTIFICATION_EMAIL;

  if (!to) {
    console.log(
      "[reservas] Notificación por correo no configurada (falta RESERVATION_NOTIFICATION_EMAIL)."
    );
    return;
  }

  console.log(`[reservas] (simulado) Notificación por correo a ${to}:`, record);
}
