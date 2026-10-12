# SEO e indexación de RUFCOM

Esta pauta aplica a cada página nueva y a cada actualización de contenido.
La prioridad es responder una pregunta concreta con información útil,
experiencia real y fuentes oficiales cuando corresponda. Evitar repetir
palabras clave o cambiar textos útiles por pequeñas fluctuaciones de tráfico.

## Flujo editorial

1. Elegir una pregunta o tema y redactar título, descripción y H1 claros.
2. Incorporar enlaces contextuales desde otras páginas; las guías también
   deben aparecer en `guias.html`. Ninguna página debe quedar huérfana.
3. Añadir canónica al sitemap y configuración a `scripts/seo_pages.json`.
   Seleccionar una imagen representativa ya presente, rastreable y propia.
4. Para Article, registrar la fecha real de edición. En la incorporación
   inicial se recuperó de la última edición versionada del contenido;
   las guías con enlaces o texto ampliado el 12/10/2026 llevan esa fecha.
   No inventar fechas de publicación ni reiniciar la edición al generar SEO.
5. Ejecutar `python scripts/seo.py`. Genera Open Graph, Twitter Cards y
   microdatos schema.org estáticos con autor y fecha visibles. No requiere
   JavaScript ni excepciones a la política de seguridad CSP.
6. Ejecutar `python scripts/seo.py --check`, el validador, las pruebas y
   comprobar la vista móvil. CI bloquea metadatos desactualizados, duplicados,
   imágenes ausentes, fechas futuras y páginas sin enlaces entrantes.
7. Publicar, verificar la URL real, inspeccionar en Search Console y, para
   URLs nuevas o cambios sustantivos, solicitar indexación una vez.

## Lectura de Search Console

Separar indexación, impresiones y clics. Redirecciones y versiones alternativas
con canónica correcta pueden quedar excluidas sin requerir corrección. Priorizar
las canónicas editoriales rastreadas sin indexar. Privacidad puede mantenerse
accesible aunque su indexación tenga poca importancia comercial.

No interpretar una posición media dominada por la búsqueda RUFCOM como ranking
para búsquedas genéricas. Comparar marca y temas, periodos equivalentes, páginas
y consultas. Con pocas impresiones, no atribuir una caída a una penalización.

## Referencias

- https://developers.google.com/search/docs/appearance/structured-data/article
- https://developers.google.com/search/docs/appearance/publication-dates
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl

Las mejoras y las solicitudes no garantizan indexación, posición ni resultados
enriquecidos. Registrar el resultado real de Google sin prometer plazos.
