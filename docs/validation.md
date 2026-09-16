# Verificación de la copia preparada

Fecha: 2026-09-16. Esta evidencia corresponde a la carpeta entregada, no a un
despliegue en GitHub.

- Validador offline: aprobado. Referencias locales, fragmentos, CSP, metadatos,
  política de archivos, SVG y patrones básicos de secretos.
- Pruebas del validador: 6 aprobadas, incluidos controles negativos para enlaces
  rotos, mayúsculas, scripts inline/externos, archivos privados y un token sintético.
- JavaScript: sintaxis validada con Node.
- YAML: archivos CI, despliegue y Dependabot parseados correctamente. No se ha
  ejecutado GitHub Actions ni un validador completo del esquema de Actions.
- Navegador: Edge/Chromium headless mediante Playwright, 10 páginas en dos
  viewports (390 y 1440 px), sin errores de consola, desbordamiento horizontal,
  imágenes rotas, respuestas de recurso >=400 ni solicitudes externas.
- Menú: apertura por teclado y cierre con Escape en las 9 páginas de contenido.
- Gráficos principales: de 3.144.857 bytes en PNG a 135.320 bytes en WebP.
- Referencias SHA de Actions consultadas directamente en los repositorios
  oficiales mediante `git ls-remote`.

No se probaron GitHub Pages, DNS, certificado, redirección www/HTTPS ni el estado
HTTP 404 en producción. La página 404 se revisó como documento local. Tampoco
se realizó auditoría integral de accesibilidad, validación de enlaces externos
o revisión del contenido regulatorio. La revisión de secretos es limitada y no
equivale a garantía de ausencia de secretos.
