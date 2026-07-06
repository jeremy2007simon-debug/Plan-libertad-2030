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
  // Nota: este bloque valida y muestra feedback en pantalla.
  // Para conectarlo a un envío real, sustituye el bloque marcado
  // más abajo por una llamada fetch() a tu backend, o usa un
  // servicio como Formspree / EmailJS añadiendo su "action" en el HTML.
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

      // ---- AQUÍ se conectaría el envío real (backend / Formspree / EmailJS) ----
      // Ejemplo:
      // fetch("https://tu-backend.com/api/contacto", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(Object.fromEntries(new FormData(form))),
      // });

      feedback.textContent = "¡Gracias! Hemos recibido tu solicitud, te contactaremos muy pronto.";
      feedback.style.color = "var(--accent)";
      form.reset();
    });
  }
});
