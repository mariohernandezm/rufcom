# Carrusel y explicación de CQ · 21 de octubre de 2026

Base: árbol de producción 44c887733e6a13a60c96a8112bf3ad9c8a7b2ffc.
Referencia de interfaz: Manual de marca Rufcom v1.3, leído antes de editar.

## Cambios

- Inicio: dos imágenes originales en el panel existente. Primera: el trío
  personalizado actual; segunda: el sello original de Rufis recuperado de la
  portada anterior. Se conservan los archivos completos y sus proporciones.
- Componente reutilizable `carousel.css` + `carousel.js`, cargado solo en Inicio.
  Controles compartidos, rotación cada 6 segundos, pausa/reanudación, teclado y gesto horizontal.
- Licencias, sección «Tu primer comunicado»: origen telegráfico de CQ, paso a
  Morse y voz, pronunciación habitual, repetición y distinción respecto del
  alfabeto fonético y el código Q. Nuevo ancla estable `#llamada-cq`.
- Código Q: aclaración breve y enlace a la explicación de CQ. La guía ya decía
  que no hace falta hablar en códigos; se conserva esa orientación.
- Fechas reales de las dos guías actualizadas mediante `seo.py` y fechas de
  modificación de esas dos URLs actualizadas en el sitemap.
  No se renuevan fechas de artículos por el carrusel.
- La paleta y la escala del manual 1.3 se mantienen. La regla del carrusel
  figura en la ampliación 1.3.1 del 21/10/2026 y el componente v1.1 en
  `docs/design-system.md`.

## Fuentes de la revisión editorial

Consultadas el 21/10/2026. Redacción original de Rufcom; sin copiar pasajes.

- UIT, *ITU News*, Pioneers’ Page, julio–agosto de 2006, «Sending out an SOS»:
  documenta CQ como llamada general ya usada en la telegrafía terrestre.
  https://www.itu.int/itunews/manager/display.asp?ext=html&ipage=pioneers&issue=06&lang=en&year=2006
- John Devoldere ON4UN y Mark Demeuleneere ON4WW, *Ethics and Operating
  Procedures for the Radio Amateur*, edición 3 (2010), copia corregida de ARRL
  enero de 2011: II.1 (lenguaje), II.8.1 (CQ por voz), II.9.2 (CQ en Morse).
  https://www.arrl.org/files/file/DXCC/Eth-operating-EN-ARRL-CORR-JAN-2011.pdf
- ARRL, *Making Your First Contact*: llamadas CQ y alfabeto fonético.
  https://www.arrl.org/making-your-first-contact

Se distingue el uso habitual en radioafición de una prohibición universal:
«Charlie Quebec» sí deletrea las letras CQ; no se afirma que esté prohibido.
No se atribuye un origen literal demostrado a la expresión inglesa «seek you».

## Validación y revisión

Los validadores de sitio, marca y SEO pasan; 23 pruebas Python y 12 pruebas Node
(3 existentes y 9 del carrusel) pasan. Los eventos y el reloj simulado cubren
cambio circular, teclado, instancias independientes, gestos, fallback, intervalo
de 6 segundos, pausa con cursor/foco, reanudación, pestaña oculta y movimiento reducido.

CI ejecuta además `scripts/browser_smoke.cjs` contra el mismo checkout por HTTP:
Inicio, Licencias y Código Q, en escritorio de 1366 px y móvil de 390 px. Comprueba
rotación real y pausa, menús y paneles abiertos, roles calculados, imágenes y
desbordamiento. Guarda capturas y `report.json` en el artefacto `browser-review`.
El resultado de cada ejecución debe revisarse antes de integrar. Esta cobertura
se limita a las tres páginas afectadas y sus estados; no certifica toda la web.

## Corrección posterior · 21/10/2026

El propietario pidió quitar el botón de reproducción/pausa porque el carrusel
quedaba detenido. Se eliminan la pausa por cursor y la pausa persistente por
foco o navegación; las flechas reinician seis segundos. Se conserva movimiento
reducido y suspensión en pestañas ocultas. La prueba real comprueba que vuelve
a cambiar después de pulsar una flecha manteniendo cursor y foco en ella.
