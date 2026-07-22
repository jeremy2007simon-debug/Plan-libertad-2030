-- Datos de ejemplo para desarrollo local.
-- Ejecutar con: supabase db reset (aplica migraciones + este seed)

insert into public.sectors (name, slug, icon, description, sort_order) values
  ('Restaurantes', 'restaurantes', 'utensils', 'Webs y automatizaciones para hostelería.', 1),
  ('Automoción', 'automocion', 'car', 'Concesionarios y talleres.', 2),
  ('Clínicas', 'clinicas', 'stethoscope', 'Clínicas dentales, estéticas y médicas.', 3),
  ('Hoteles', 'hoteles', 'bed-double', 'Alojamiento y turismo.', 4),
  ('Inmobiliarias', 'inmobiliarias', 'building-2', 'Agencias y promotoras inmobiliarias.', 5);

insert into public.library_models (sector_id, name, slug, description, features, avg_build_time_days, image_url)
select id, m.name, m.slug, m.description, m.features, m.avg_build_time_days, m.image_url
from public.sectors, (values
  ('restaurantes', 'Mexicano Premium', 'mexicano-premium', 'Diseño vibrante para restaurantes mexicanos de alta gama.', array['Menú digital', 'Reservas online', 'Galería fotográfica', 'Reseñas integradas'], 7, null),
  ('restaurantes', 'Restaurante Tradicional', 'restaurante-tradicional', 'Estilo clásico y cálido para cocina tradicional.', array['Carta editable', 'Horario y ubicación', 'Formulario de contacto'], 5, null),
  ('restaurantes', 'Pizzería Premium', 'pizzeria-premium', 'Diseño moderno enfocado en pedidos rápidos.', array['Pedido online', 'Menú visual', 'Delivery tracking'], 6, null),
  ('restaurantes', 'Italiano Premium', 'italiano-premium', 'Elegancia mediterránea para restaurantes italianos.', array['Reservas', 'Carta de vinos', 'Eventos privados'], 7, null),
  ('hoteles', 'Beach Club', 'beach-club', 'Landing de alto impacto para beach clubs y resorts.', array['Motor de reservas', 'Galería inmersiva', 'Eventos y VIP'], 10, null)
) as m(sector_slug, name, slug, description, features, avg_build_time_days, image_url)
where sectors.slug = m.sector_slug;

insert into public.prompt_categories (name, slug, icon, sort_order) values
  ('Copywriting', 'copywriting', 'pen-line', 1),
  ('Automatizaciones', 'automatizaciones', 'workflow', 2),
  ('Atención al cliente', 'atencion-cliente', 'headset', 3),
  ('SEO', 'seo', 'search', 4);

insert into public.prompts (category_id, title, content, tags)
select id, p.title, p.content, p.tags
from public.prompt_categories, (values
  ('copywriting', 'Descripción de servicio premium', 'Escribe una descripción persuasiva de 3 párrafos para el servicio [SERVICIO], dirigida a [PÚBLICO OBJETIVO], con tono profesional y cercano.', array['ventas', 'landing']),
  ('automatizaciones', 'Resumen de reunión a tareas', 'A partir de esta transcripción de reunión, extrae una lista de tareas accionables con responsable y fecha límite: [TRANSCRIPCIÓN]', array['productividad']),
  ('atencion-cliente', 'Respuesta a reclamación', 'Redacta una respuesta empática y profesional a esta reclamación de cliente, ofreciendo una solución concreta: [RECLAMACIÓN]', array['soporte']),
  ('seo', 'Meta descripción optimizada', 'Genera 3 meta descripciones de máximo 155 caracteres para una página sobre [TEMA], optimizadas para SEO.', array['seo', 'contenido'])
) as p(category_slug, title, content, tags)
where prompt_categories.slug = p.category_slug;

insert into public.template_categories (name, slug) values
  ('Propuestas', 'propuestas'),
  ('Contratos', 'contratos'),
  ('Onboarding', 'onboarding');

insert into public.templates (category_id, name, description, content)
select id, t.name, t.description, t.content
from public.template_categories, (values
  ('propuestas', 'Propuesta de proyecto web', 'Estructura estándar para presentar una propuesta a cliente.', 'Plantilla en blanco — completar con alcance, plazos y precio.'),
  ('contratos', 'Contrato de mantenimiento mensual', 'Contrato tipo para servicios recurrentes.', 'Plantilla en blanco — completar con condiciones del servicio.'),
  ('onboarding', 'Checklist de bienvenida a cliente', 'Pasos a seguir al iniciar un nuevo proyecto.', 'Plantilla en blanco — completar con pasos internos.')
) as t(category_slug, name, description, content)
where template_categories.slug = t.category_slug;
