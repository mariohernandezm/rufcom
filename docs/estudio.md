# Estudio y práctica de radioafición

La sección reúne tres páginas:

- `estudiar-radioaficion.html`: rutas para Aspirante, Novicio, General y Superior,
  requisitos, distribución del examen y acceso a las fuentes oficiales.
- `materias-radioaficion.html`: ocho temas con explicaciones y ejemplos propios.
  Puede imprimirse o guardarse como PDF mediante el diálogo del navegador.
- `practicar-examen.html`: repaso por materia, simulacro y revisión de errores.

Se enlaza desde Inicio, Guías y Licencias. Se conservan las seis tarjetas
principales de Inicio y los datos de licencias y repetidores.

## Fuentes revisadas el 11 de noviembre de 2026

- Decreto 523 de 2006, versión vigente publicada el 21/06/2013:
  https://www.bcn.cl/leychile/navegar?idNorma=257890
- Resolución Exenta SUBTEL 2620, publicada el 19/12/2023:
  https://www.bcn.cl/leychile/navegar?idNorma=1199351
- Apéndices A–E, actualización interna 06/12/2020, y Guía del procedimiento
  para rendir el examen en línea, versión 2025, actualmente enlazados desde:
  https://www.subtel.gob.cl/inicio-concesionario/servicios-de-telecomunicaciones/servicios-de-radio-aficionados/

Se contrastaron los artículos de las normas y las dos tablas del artículo 8
y del artículo 9 de la Resolución 2620. La página de SUBTEL y la guía de 2025
conservan referencias a la Resolución 765 de 2007: se distingue esa referencia
histórica de la norma de examen vigente, que la derogó expresamente.

Los PDF oficiales se consultan en su origen y conservan su fecha real. La guía
y las preguntas de RUFCOM son redacción propia, no una transcripción del banco
oficial. El programa completo y sus ejercicios con figuras deben estudiarse
también en los apéndices correspondientes.

## Banco y evaluación

`estudio-banco.js` contiene 144 preguntas: 32 comunes de reglamentación y
28 técnicas para cada categoría. Cada pregunta tiene identificador estable,
cuatro alternativas diferentes, una respuesta correcta, explicación, referencia
y enlace a un tema de la guía. Las alternativas y preguntas se mezclan sin
alterar su identidad ni la clave de respuesta.

| Categoría | Preguntas legales / técnicas | Peso legal / técnico |
|---|---|---|
| Aspirante | 18 / 12 | 0,7 / 0,3 |
| Novicio | 15 / 15 | 0,5 / 0,5 |
| General | 12 / 18 | 0,3 / 0,7 |
| Superior | 6 / 24 | 0,2 / 0,8 |

El resultado del simulacro aplica a la nota porcentual de cada área sus pesos,
con mínimo de 60% ponderado y de 50% en cada área. Las cantidades de preguntas
no siempre equivalen a las ponderaciones. No se compara un porcentaje ya
redondeado contra el umbral. Los repasos parciales no reciben estado de
aprobación oficial.

El repaso usa hasta diez preguntas de la selección, sin reloj y con explicación
después de contestar. El simulacro utiliza treinta, no revela soluciones antes
de finalizar y permite cambiar respuestas. Las preguntas en blanco cuentan como
incorrectas y se confirma en la propia página antes de finalizar parcialmente.
La revisión permite empezar otra tanda solo con errores y preguntas en blanco.

El temporizador usa una fecha límite absoluta de 45 minutos. Se vuelve a
comprobar al recuperar la visibilidad; ocultar la pestaña no gana tiempo. Al
agotarse, finaliza la práctica. Las respuestas se mantienen únicamente en la
memoria de la página: no se crean cuentas ni se envían respuestas a un servidor.

## Validación y mantenimiento

- `node --test tests/estudio.test.cjs` comprueba integridad, filtros,
  distribuciones, ponderaciones, mínimos de cada área, respuestas sin marcar,
  aleatorización sin mutación, límites del reloj y ejemplos numéricos.
- `scripts/browser_smoke.cjs` comprueba las nuevas páginas en escritorio y móvil.
  Usa un contexto de reloj aislado para las cuatro categorías; recorre respuestas,
  navegación, finalización parcial, expiración, corrección, revisión y errores.
- Se revisó la interfaz local en escritorio y a 390 px, incluidas alternativas
  largas, explicación, resultado parcial y simulacro de Superior.
- Se ejecutan también los validadores del sitio, marca, SEO y pruebas existentes.

Antes de ampliar el banco, contrastar la respuesta con una fuente primaria o un
cálculo independiente. Mantener las opciones inequívocas y el identificador de
la pregunta. No rotular preguntas propias como oficiales. Si SUBTEL actualiza
normas o apéndices, revisar las rutas, los pesos, los mínimos y las referencias,
además del contenido técnico. Las fechas editoriales cambian por modificaciones
reales del contenido y no por un nuevo despliegue.
