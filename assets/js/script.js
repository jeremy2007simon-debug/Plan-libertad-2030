// =============================================================
// NOVACORE — LANDING PAGE
// Interacciones: menú móvil, animaciones al hacer scroll y formulario
// =============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ---- Año actual en el footer ----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Menú móvil ----
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cierra el menú al pulsar un enlace (útil en móvil)
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Animación de aparición al hacer scroll ----
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));

  // ---- Formulario de contacto ----
  // Abre el cliente de email del propio visitante con un "mailto:" ya
  // redactado hacia CONTACT_EMAIL. No depende de ningún servicio externo:
  // el email lo envía la propia cuenta del visitante, así que siempre llega.
  const CONTACT_EMAIL = "jmproductions863@gmail.com";
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        feedback.textContent = "Por favor, completa todos los campos obligatorios.";
        feedback.style.color = "#ff6b6b";
        return;
      }

      const data = Object.fromEntries(new FormData(form));
      const subject = `Nueva solicitud de auditoría — ${data.empresa}`;
      const body =
        `Nombre: ${data.nombre}\n` +
        `Empresa: ${data.empresa}\n` +
        `Teléfono / WhatsApp: ${data.telefono}\n` +
        `Email: ${data.email}\n\n` +
        `Mensaje:\n${data.mensaje}`;

      const mailtoUrl =
        `mailto:${CONTACT_EMAIL}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;

      feedback.textContent = "Se ha abierto tu programa de correo con el mensaje listo. Solo tienes que darle a enviar.";
      feedback.style.color = "var(--accent)";
      form.reset();
    });
  }
});
