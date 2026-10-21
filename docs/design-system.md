# Sistema de interfaz RUFCOM

Aplicación web del [Manual de marca Rufcom v1.1](manual-de-marca.md), del 20 de octubre de 2026. El manual es la referencia normativa; esta guía explica su implementación.

## Base y funciones

`site/assets/css/design-system.css` es la fuente común de variables, tipografía,
controles, tarjetas y espaciado. Se carga después de las hojas específicas
en las 24 páginas, incluida la 404 con una ruta absoluta.

| Función | Token | Valor del manual |
| --- | --- | --- |
| Acción primaria y detalles | `--color-primary` | Ocre `#CC8A00` |
| Acento de apoyo | `--color-primary-hover` | Ocre fuerte `#B26F00` |
| Acción secundaria, títulos de tarjeta y foco | `--color-secondary` | Azul profundo `#082330` |
| Fondo | `--color-background` | Arena `#F7F3E8` |
| Superficies | `--color-surface` | Blanco `#FFFFFF` |
| Texto | `--color-text` | Tinta `#26211B` |

La asignación primaria/secundaria es una función de interfaz adoptada aquí
a partir de los usos de ocre y azul del manual. El logo conserva sus colores
originales. Los tonos auxiliares de borde y texto secundario vienen de la web.

## Diseño atómico

1. **Átomos:** variables de marca, fuente, tamaños, espacios, bordes,
   controles, enlaces, foco y estados hover/disabled.
2. **Moléculas:** tarjeta, aviso, campo con etiqueta y acción, paso numerado.
3. **Organismos:** rejilla de recursos relacionados, buscadores, navegación,
   grupos de tarjetas y pie de página.
4. **Plantillas:** portada, artículo con índice y ancho de lectura, biblioteca
   de guías y herramientas de consulta.
5. **Páginas:** contenido real sobre las plantillas existentes; se comprueba
   escritorio y móvil con textos cortos, largos, tablas y resultados.

Referencia metodológica: Brad Frost, *Atomic Design*, capítulo 2,
https://atomicdesign.bradfrost.com/chapter-2/, consultado el 12/10/2026.

## Tipografía y dimensiones

Pila de sistema del manual: `system-ui, -apple-system, BlinkMacSystemFont,
"Segoe UI", sans-serif`. No se añaden fuentes remotas.

- Cuerpo y entradilla: 16 px, interlineado 1,6, peso 400.
- Títulos de página y sección: 22–26 px, peso 700, como la nueva portada aprobada el 20/10/2026.
- Título de tarjeta o aviso: 18 px. Su tamaño depende del componente,
  aunque el elemento semántico sea H2; no se aplana la jerarquía HTML.
- Notas y autoría: 14 px. El cuerpo de las guías sigue siendo de 16 px.
- Espacios: 4, 8, 12, 16, 24, 32 y 48 px.
- Ancho de página: 1120 px; lectura y recursos editoriales: 880 px.
- Bordes de controles: 8 px; tarjetas: 12 px. Botones: mínimo 44 px alto;
  campos: mínimo 48 px. El texto largo puede ocupar más de una línea.

## Componentes y estados

`.btn` y `.rf-button` comparten dimensiones. La primaria usa ocre con texto
tinta; la secundaria usa blanco con texto y borde azul. Un enlace de texto
conserva subrayado y foco. Hover refuerza el borde azul, sin desplazar el botón
ni oscurecer el fondo ocre: el ocre fuerte con tinta no alcanza 4,5:1 para
texto normal. El par ocre/tinta sí lo alcanza y se conserva en ambos estados.
Los controles de búsqueda respetan sus ID, etiquetas y estados `hidden`.

`.ui-callout` identifica un aviso o bloque de apoyo con fondo blanco, borde
ocre y texto normal. Las clases anteriores `simple-path` y `article-callout`
se conservan para compatibilidad, pero sus tamaños comunes están aquí.
Un aviso no es una segunda portada ni necesita todo el párrafo en negrita.

`.resource-grid` agrupa recursos relacionados: dos columnas en escritorio y
una en móvil. Herramientas utiliza este organismo para CHIRP y el buscador
de licencias, en lugar de dos secciones promocionales de ancho diferente.

Las hojas específicas siguen controlando los esquemas, fotografías, tablas y
funcionamiento de cada herramienta. No se usa tamaño fijo para la altura de
tarjetas; deben admitir contenido largo sin recortarlo.

## Identidad topográfica

Las curvas del recurso original `assets/images/topographic.svg` son parte del
lenguaje de RUFCOM: radioafición, cerros, parques y exploración. La regla común
de `design-system.css` las incluye en portada, artículos, Guías, cabecera de
salidas y páginas de utilidad, incluida la 404. No dependen solo de `.section`.

Usar opacidad 0,16 en escritorio y 0,12 en móvil, con el centro desvanecido.
Las curvas son decorativas: no añaden contenido accesible ni capturan clics.
Las tarjetas, fotografías y diagramas conservan sus superficies limpias.
Una página de utilidad contenida no repite una segunda capa en sus secciones.
Las reglas comunes prevalecen también sobre las antiguas decoraciones de
secciones impares en páginas con clase `home-page`, incluida Privacidad.
Conservar este motivo al crear plantillas; no quitarlo al compactar componentes.

## Mantenimiento

Modificar primero el componente compartido, no añadir otra versión global
de H2 al final de `styles.css`. Usar los tokens al ampliar el sistema.
Las reglas históricas de tipografía en esa hoja pierden `!important` para
permitir que esta jerarquía común gobierne las páginas.

La URL de `styles.css` usa `?v=atomic-20261012`; la de
`design-system.css` usa `?v=rufcom-manual-v11-20261020`. Al modificar una hoja compartida, cambiar su versión
en todas las páginas: evita mezclar CSS antiguo en caché con HTML nuevo.
El validador comprueba la ruta y el orden sin depender del valor de la versión.

Comprobar contraste de texto, foco por teclado, botones con etiquetas largas,
menú móvil, buscadores y gráficos técnicos antes de integrar. Ejecutar los
controles del README. No renovar fechas de artículos por este cambio visual
ni enviar solicitudes de indexación por modificaciones de CSS.

## Contrato de componentes — portada de referencia 20/10/2026

La portada nueva es la referencia de toda la web. Mantiene el manual de marca,
logo original, colores, fuente de sistema, curvas topográficas y fotografías reales.
La escala de interfaz fue ajustada con el propietario: 22–26 / 18 / 16 / 14 px.

Cada texto de `main` recibe `data-rf-role`: `page-title`, `section-title`,
`card-title`, `body`, `control`, `eyebrow` o `note`. El nivel semántico HTML se
conserva; un H2 dentro de una tarjeta usa la molécula de título de tarjeta.
`design-system.css` es la única autoridad visual de esos roles. Las hojas de
página controlan posición, diagramas, datos técnicos e interacciones, no crean
escalas alternativas de títulos. La revisión de roles abarca las 24 páginas.

Los átomos son tokens, texto, enlaces, controles e iconos; las moléculas son
cabeceras con icono, campos con etiqueta, tarjetas y avisos; los organismos son
cabecera, pie, rejillas, listas de recursos y buscadores. Las plantillas son
portada, artículo, biblioteca y herramienta. Todos consumen el mismo contrato.

No modificar datos de licencias, repetidores, frecuencias, scripts de búsqueda,
canónicas o direcciones para adoptar el diseño. No actualizar fechas editoriales
por ajustes de apariencia. Una nueva página debe declarar sus roles y cargar la
hoja común al final. No añadir excepciones tipográficas al final de `styles.css`.


## Revisión por función

Los roles se aplican también a cabecera y pie. Los H2 que abren las secciones de Salida segura son títulos de sección; el nombre de clase `guide-step` no los convierte en tarjetas. Las fuentes, autorías y notas usan `note`. Los enlaces dentro de títulos o notas heredan su tamaño. Navegación, tablas, desplegables y estados de búsqueda se comprueban abiertos. El manual y esta guía se conservan con el código; la revisión visual se registra por separado.
