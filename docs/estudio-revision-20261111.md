# Revisión local: curso por licencia y mensajes de Rufis

Registro de la revisión local en 127.0.0.1:8765, previa a la publicación.
El propietario autorizó el paso a producción el 11/11/2026 después de revisar
las categorías, los prefijos, las lecciones y los mensajes de Rufis.

## Alcance revisado

- Cuatro páginas de recorrido: Aspirante (13 lecciones), Novicio (15),
  General y Superior (16). Catálogo y entradas del menú conservados.
- Dieciséis lecciones con explicación, diagramas originales, dos ejemplos,
  autoevaluación y banco paginado de preguntas oficiales.
- Conservación de categoría en navegación, retorno al recorrido y práctica.
- Banco de 708 registros: 688 habilitados y 20 con incidencia documental,
  conservados para consulta sin emplearlos para calificar.
- Rufis: felicitación en práctica de 6/6; ánimo al no cumplir los mínimos de
  un simulacro General; hasta tres temas de repaso con enlaces de categoría.
- El modo examen mantiene ocultas las soluciones y los colores hasta terminar.
  La opción de repasar errores se oculta cuando no hay errores.

## Evidencia y comprobaciones

28 pruebas Node y 25 pruebas Python satisfactorias. Validadores de sitio,
marca y SEO satisfactorios; sintaxis de JavaScript y de los generadores Python
comprobada. Los PDF conservan sus hashes; no se alteraron los documentos.

Revisión en navegador real: las cuatro rutas y las dieciséis lecciones a
390 × 844 y 1280 × 720. Sin desbordamiento horizontal del documento ni errores
de roles/tamaños detectados en los textos visibles. Los esquemas anchos se
desplazan dentro de su propio contenedor. Se comprobaron menú móvil abierto,
autoevaluación, paginación, filtro por categoría y práctica desde una lección.

Se comprobó visualmente E1-20 contra la página 9 del PDF: sus datos A/B forman
parte del enunciado, separados de las cuatro alternativas finales. La incidencia
de su clave se ve en la lección con el texto original y la explicación del cálculo.

Capturas de revisión guardadas fuera del sitio, en outputs del espacio de trabajo:
material por categorías, Rufis felicitando y Rufis animando en móvil. El registro
de las cuarenta comprobaciones de pantalla está en estudio-revision-pantallas.json.

## Límites y siguiente paso

Las exclusiones son una revisión editorial de RUFCOM, sin confirmación de una
rectificación por SUBTEL. La transcripción y clave publicada siguen consultables.
La revisión no equivale a una certificación externa del curso ni garantiza que
el banco original esté libre de otras erratas.

La entrega autorizada requiere aprobar el script de regresión de Chromium
en CI antes de fusionar el PR. Los resultados y el commit exacto se registran
en GitHub Actions. La verificación pública se realiza después del despliegue.
