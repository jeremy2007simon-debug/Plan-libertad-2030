// =============================================================
// NOVACORE — LANDING PAGE
// Interacciones: menú móvil, header al hacer scroll, animaciones
// escalonadas, glow que sigue al cursor en tarjetas, partículas
// del hero y formulario de contacto.
// =============================================================

document.addEventListener("DOMContentLoaded", () => {
  // ---- Año actual en el footer ----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Header: fondo sólido al hacer scroll ----
  const header = document.getElementById("header");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---- Menú móvil ----
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Animación de aparición al hacer scroll, con escalonado ----
  const revealGroups = new Map();
  document.querySelectorAll(".reveal").forEach((el) => {
    const parent = el.parentElement;
    const siblings = revealGroups.get(parent) || 0;
    el.style.setProperty("--delay", String(siblings * 80));
    revealGroups.set(parent, siblings + 1);
  });

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

  // ---- Glow que sigue al cursor en tarjetas premium ----
  const glowTargets = document.querySelectorAll(".problem-card, .service-card, .step");
  glowTargets.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    });
  });

  // ---- Partículas flotantes del Hero ----
  const particlesHost = document.getElementById("heroParticles");
  if (particlesHost) {
    const count = window.innerWidth < 720 ? 10 : 22;
    for (let i = 0; i < count; i += 1) {
      const dot = document.createElement("span");
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.top = `${40 + Math.random() * 55}%`;
      dot.style.animationDelay = `${Math.random() * 9}s`;
      dot.style.animationDuration = `${7 + Math.random() * 6}s`;
      particlesHost.appendChild(dot);
    }
  }

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
      feedback.style.color = "var(--accent-2)";
      form.reset();
    });
  }
});
