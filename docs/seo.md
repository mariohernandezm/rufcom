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

## Comprobación de publicación

El validador exige un único script de estadísticas con consentimiento en cada
página canónica y rechaza líneas de autoría duplicadas. No copiar una segunda
autoría al preparar una guía: el generador SEO conserva el bloque único.

El despliegue comprueba todas las URLs del sitemap contra el HTML del commit
validado, incluidas las guías nuevas. No basta con comprobar la portada.

Al optimizar imágenes, conservar la identidad, la transparencia y las rutas de
los originales. Las variantes WebP sin pérdida incorporadas el 12/10/2026 se
compararon píxel por píxel con los PNG. Los ajustes de formato o compresión no
renuevan las fechas editoriales ni requieren repetir solicitudes de indexación.

## URL directa de Base MK1 · 16/11/2026

La página canónica es https://rufcom.cl/base-mk1.html y debe responder HTTP 200
directamente. El propietario confirmó retirar la redirección HTML y mantener el
criterio que ya se aplicó al retirar maleta-rufcom.html en octubre.
base73-mk1.html queda retirada y devuelve HTTP 404: los enlaces externos antiguos
dejan de abrir la ficha. Los enlaces internos, la canónica y el sitemap apuntan
únicamente a base-mk1.html. No bloquear las rutas retiradas en robots.txt.
No añadir meta refresh ni páginas puente. CI rechaza las rutas retiradas y las
redirecciones HTML; comprueba en escritorio y móvil la respuesta directa de la
ficha nueva y los 404 anteriores. El despliegue verifica estos estados sin
seguir redirecciones HTTP. Se conservan el contenido y la fecha editorial.
La prueba publicada de Search Console confirmó que la URL nueva se puede
indexar y Google aceptó la solicitud de indexación; esto no confirma indexación.
No atribuir problemas de rendimiento o indexación a las redirecciones sin medir
la URL afectada y comparar evidencia. Una migración futura con 301/308 reales
requiere un alojamiento que permita configurarlos y autorización para ese cambio.
