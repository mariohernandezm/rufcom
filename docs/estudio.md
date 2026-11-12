# Estudio y práctica de radioafición

La sección reúne orientación y requisitos (estudiar-radioaficion.html), un
catálogo por licencia (materias-radioaficion.html), cuatro recorridos separados
(estudiar-aspirante/novicio/general/superior.html), 16 lecciones y un simulador
con preguntas oficiales (practicar-examen.html). Se enlaza desde Inicio,
Guías, Licencias y el menú compartido «Estudio y exámenes».

Cada lección incluye seis explicaciones, un esquema original, dos ejemplos
resueltos, una autoevaluación desplegable y las preguntas del tema, con figuras
y claves consultables sin abrir un PDF. El banco de consulta se pagina de ocho
en ocho. La categoría elegida se conserva en anterior/siguiente, regreso a su
recorrido, preguntas y práctica. General y Superior tienen 16 temas; Novicio,
15; Aspirante, 13 con orientación de profundidad por categoría.

estudio-cobertura.json asigna los 708 identificadores a las 16 lecciones.
Los generadores locales scripts/build_study_course.py y study_course_content.py
conservan el contenido editorial. No publican: después de regenerar hay que
ejecutar seo.py y los controles, y revisar la vista previa.

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

Hay 688 preguntas seleccionables. Se conservan sin calificar dos preguntas
con alternativas duplicadas (D1-16 y E2-94) y 18 incidencias adicionales,
registradas con su motivo concreto en estudio-incidencias.json: contradicciones
entre clave y normativa o conceptos, unidades ambiguas o datos insuficientes.
Es una revisión editorial de RUFCOM, no una corrección confirmada por SUBTEL.
Las claves publicadas no se sustituyen por otras; junto a cada registro excluido
se muestran la clave histórica, la incidencia y los documentos originales.

E1-20 repite rótulos A/B dentro de los datos del enunciado. Se revisó visualmente
la página 9 para separar esos datos de las cuatro alternativas finales. Su clave
también queda excluida: la opción B termina en 200 Ω mientras el cálculo de R1
con 100 V y 50 mA da 2.000 Ω. Los PDF y sus hashes no se modifican.

Conservar una transcripción y una clave oficial no certifica que la clave sea
físicamente correcta. Las explicaciones y cálculos del curso son de RUFCOM;
las incidencias futuras deben contrastarse y documentarse antes de calificarlas.

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

Al terminar aparece Rufis, usando el activo original rufis-guia-radio.webp.
Felicita cuando se cumplen los mínimos del simulacro; anima a repasar cuando
no se cumplen, aun con un promedio alto. En tandas de práctica celebra desde
80% sin declarar aprobado un examen. Un intento vacío recibe un mensaje propio.
Los enlaces de repaso proponen hasta tres lecciones con más respuestas
incorrectas u omitidas, sin duplicar y conservando la categoría, para ofrecer
un siguiente paso abordable. La revisión completa permanece debajo.
No hay audio ni animación.

El reloj usa una fecha límite absoluta y comprueba el tiempo al recuperar la
visibilidad. Ocultar la pestaña no gana tiempo. Al agotarse finaliza la práctica.
Las respuestas se mantienen solo en memoria, sin cuentas ni envío a un servidor.

## Validación y mantenimiento

- Pruebas unitarias: procedencia y hashes, preguntas, claves, figuras y rutas,
  exclusiones, selección, orden de alternativas, ponderaciones, mínimos y reloj.
- Chromium (script para CI): cuatro categorías en escritorio y móvil, configuración,
  todas las preguntas habilitadas de Novicio, entrenamiento, teclado, navegación, respuestas
  conservadas, expiración, revisión, errores y práctica personalizada.
- Validadores existentes: sitio, seguridad, marca y SEO.

Publicación autorizada por el propietario el 11/11/2026, después de revisar
la vista previa. La entrega se integra mediante PR y solo se fusiona después
de aprobar CI. Después del despliegue se verifican las URL públicas y se
gestiona la indexación, distinguiendo solicitudes de indexación confirmada.

Para actualizar, descargar desde SUBTEL, conservar versión y hash y contrastar
claves por enunciado y alternativas. Revisar figuras, fórmulas y ambigüedades.
Si cambia la norma, revisar cantidades, pesos, mínimos, requisitos y referencias.
La página de SUBTEL y la guía de 2025 conservan una referencia a la Resolución 765:
la norma vigente de evaluación es la 2620, que la derogó expresamente.
