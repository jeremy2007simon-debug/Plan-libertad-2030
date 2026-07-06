# Plan-libertad-2030

Landing page de **NovaCore** — empresa de inteligencia artificial, automatización y desarrollo web para pequeñas empresas.

## Estructura

```
index.html            # Página principal (hero, servicios, proceso, oferta, contacto)
assets/css/styles.css # Estilos (tema oscuro, tipografía Sora/Inter, responsive)
assets/js/script.js   # Menú móvil, animaciones al hacer scroll y formulario
```

## Cómo verla en local

No requiere build ni dependencias. Basta con abrir `index.html` en el navegador,
o servirla con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8000
```

## Personalización rápida

- **WhatsApp**: número configurado en el enlace `wa.me` dentro de `index.html` (sección Contacto).
- **Email de contacto**: `jmproductions863@gmail.com`, editable en la sección Contacto.
- **Formulario**: el envío está preparado en `assets/js/script.js` (bloque `contactForm`);
  añade ahí tu backend, Formspree o EmailJS para recibir los mensajes de verdad.
