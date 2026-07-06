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
  // Envía los datos a Formspree (https://formspree.io/f/mykqvjdz), que reenvía
  // cada solicitud por email. Para cambiar de destino, sustituye ese endpoint.
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        feedback.textContent = "Por favor, completa todos los campos obligatorios.";
        feedback.style.color = "#ff6b6b";
        return;
      }

      const submitButton = form.querySelector("button[type='submit']");
      submitButton.disabled = true;
      feedback.textContent = "Enviando...";
      feedback.style.color = "var(--text-muted)";

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          feedback.textContent = "¡Gracias! Hemos recibido tu solicitud, te contactaremos muy pronto.";
          feedback.style.color = "var(--accent)";
          form.reset();
        } else {
          feedback.textContent = "No hemos podido enviar tu solicitud. Escríbenos por WhatsApp o inténtalo de nuevo.";
          feedback.style.color = "#ff6b6b";
        }
      } catch (error) {
        feedback.textContent = "No hemos podido enviar tu solicitud. Escríbenos por WhatsApp o inténtalo de nuevo.";
        feedback.style.color = "#ff6b6b";
      } finally {
        submitButton.disabled = false;
      }
    });
  }
});
