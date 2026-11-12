# Estudio y práctica de radioafición

La sección reúne rutas por categoría (estudiar-radioaficion.html), una guía
con ocho materias y ejemplos propios (materias-radioaficion.html) y el
simulador con preguntas oficiales (practicar-examen.html). Se enlaza desde
Inicio, Guías y Licencias. La guía permite imprimir o guardar como PDF.

## Fuentes y banco oficial

Referencias revisadas el 11 de noviembre de 2026:

- Decreto 523 de 2006, versión vigente del 21/06/2013:
  https://www.bcn.cl/leychile/navegar?idNorma=257890
- Resolución Exenta SUBTEL 2620, publicada el 19/12/2023:
  https://www.bcn.cl/leychile/navegar?idNorma=1199351
- Apéndices A–E de 06/12/2020 y guía del procedimiento de 2025, enlazados por:
  https://www.subtel.gob.cl/inicio-concesionario/servicios-de-telecomunicaciones/servicios-de-radio-aficionados/

El archivo estudio-fuentes.json registra los URL, versiones, cantidades y
SHA-256 de los cinco PDF. Las copias en assets/docs son documentos originales
completos. No se cambia su fecha de publicación.

estudio-banco.js transcribe 708 enunciados oficiales: 108 reglamentarios,
114 técnicos de Aspirante, 162 de Novicio, 186 de General y 138 de Superior.
La identidad conserva apéndice, sección y número; por ejemplo C1-58.
Las claves se contrastaron con los solucionarios oficiales de SUBTEL: A de
08/05/2019 y B–E de 08/09/2017. Se emparejaron enunciados y alternativas,
no solamente números. A-7 difiere por una errata tipográfica en «deber»;
se comprobó que sus cuatro alternativas son las mismas.

Se preserva el orden A–D porque algunas respuestas citan otras letras.
Solo se normalizan espacios, separadores de las letras y la presentación
lineal de la fracción de C-1, pregunta 43. Las 85 figuras son recortes
renderizados de los PDF. Se comprobó visualmente su asociación: el símbolo
de C-1, pregunta 58, aparece antes de su enunciado y se asocia expresamente a ella.

Dos registros se conservan con excluded y no se seleccionan para calificar:
D-1, pregunta 16, y E-2, pregunta 94. El PDF repite en ambos el texto de la
alternativa correcta en otra alternativa. Hay 706 preguntas seleccionables.
La fuente completa sigue disponible y esta diferencia se explica en la página.
La herramienta muestra la clave del solucionario de SUBTEL, con enlaces al
original y al solucionario; las explicaciones de conceptos son de RUFCOM.

## Configuración y evaluación

Se elige una tarjeta de categoría y se abre un diálogo accesible con cantidades
independientes por área, opción de todas las preguntas y modo entrenamiento.
Escape y Cancelar cierran el diálogo. Los enlaces por categoría o materia abren
su configuración. Los parámetros desconocidos se ignoran.

El entrenamiento no tiene reloj, corrige después de elegir y bloquea la respuesta
ya corregida. El examen permite modificar respuestas, no revela claves hasta
finalizar y dura 45 minutos. La práctica personalizada también dura 45 minutos,
pero no recibe una valoración de aprobación con el criterio del examen.

| Categoría | Preguntas legales / técnicas | Peso legal / técnico |
|---|---|---|
| Aspirante | 18 / 12 | 0,7 / 0,3 |
| Novicio | 15 / 15 | 0,5 / 0,5 |
| General | 12 / 18 | 0,3 / 0,7 |
| Superior | 6 / 24 | 0,2 / 0,8 |

Solo el simulacro con la distribución exacta aplica mínimo de 60% ponderado y
50% en cada área. Se calcula antes de redondear. Las preguntas sin responder
cuentan como incorrectas. Se confirma en la página antes de finalizar parcialmente.
La revisión permite practicar errores y preguntas en blanco.

El reloj usa una fecha límite absoluta y comprueba el tiempo al recuperar la
visibilidad. Ocultar la pestaña no gana tiempo. Al agotarse finaliza la práctica.
Las respuestas se mantienen solo en memoria, sin cuentas ni envío a un servidor.

## Validación y mantenimiento

- Pruebas unitarias: procedencia y hashes, preguntas, claves, figuras y rutas,
  exclusiones, selección, orden de alternativas, ponderaciones, mínimos y reloj.
- Chromium: cuatro categorías en escritorio y móvil, configuración, 270 preguntas
  de Novicio al elegir todas, entrenamiento, teclado, navegación, respuestas
  conservadas, expiración, revisión, errores y práctica personalizada.
- Validadores existentes: sitio, seguridad, marca y SEO.

Para actualizar, descargar desde SUBTEL, conservar versión y hash y contrastar
claves por enunciado y alternativas. Revisar figuras, fórmulas y ambigüedades.
Si cambia la norma, revisar cantidades, pesos, mínimos, requisitos y referencias.
La página de SUBTEL y la guía de 2025 conservan una referencia a la Resolución 765:
la norma vigente de evaluación es la 2620, que la derogó expresamente.
