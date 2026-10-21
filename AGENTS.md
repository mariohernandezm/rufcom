# RUFCOM: nuevas páginas y guías

La petición del propietario del 12 de octubre de 2026 es incorporar SEO e
indexación en cada nueva guía o página, desde su creación.

- Leer `docs/editorial.md`: recomendar solo equipos probados por RUFCOM,
  diferenciar experiencia y medición, y mantener sencillas las guías iniciales.
- Leer `docs/seo.md` y conservar el estilo, las fuentes y los límites técnicos
  del contenido existente.
- Leer primero `docs/manual-de-marca.md` (v1.3) y después `docs/design-system.md` al crear o cambiar interfaces. Reutilizar tokens,
  botones y componentes de `assets/css/design-system.css`, cargado después de
  las hojas específicas. No añadir otra escala global de títulos ni recuperar
  los bloques promocionales de tamaño de portada.
- Crear título y descripción únicos, un H1 descriptivo, canónica HTTPS sin
  `www`, idioma español, imágenes con alt y diseño móvil.
- Enlazar desde Guías cuando sea una guía y desde páginas relacionadas con
  textos descriptivos. Añadir enlaces útiles para continuar aprendiendo.
- Añadir la canónica al sitemap y la página a `scripts/seo_pages.json`.
- Usar Article para contenido editorial y WebPage para herramientas, índices
  y páginas institucionales. La autoría RUFCOM debe ser visible y veraz.
- Registrar fechas reales de edición del contenido; no renovar fechas por
  cambios cosméticos, metadatos, despliegues o generación automática.
- Ejecutar `python scripts/seo.py`, `python scripts/seo.py --check` y los
  controles de README antes de publicar. No declarar indexación por publicar
  o enviar una solicitud: comprobar Search Console y distinguir pendientes.
- Después de publicar una URL nueva o una mejora sustantiva, inspeccionarla
  y solicitar indexación una vez si hay acceso autorizado a Search Console.
  Si no hay acceso, informar exactamente qué quedó pendiente.

- Verificar la función de cada texto además del tamaño: navegación, pie, tablas, resultados y paneles abiertos, en escritorio y móvil. Registrar evidencia y pendientes; una lista de tamaños permitidos no certifica cumplimiento.
