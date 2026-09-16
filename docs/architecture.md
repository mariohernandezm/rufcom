# Arquitectura

RUFCOM utiliza HTML multipágina, CSS y JavaScript nativos. Se conservan las
nueve URL de contenido originales. No hay backend ni generación de contenido
durante el despliegue. La carpeta `site/` constituye el artefacto publicable;
el repositorio completo, por ser público, también es accesible en GitHub.

Los recursos viven en `site/assets/css`, `js` e `images`. Fuentes del sistema
evitan descargas a terceros. Los dos PNG originales se sustituyeron por WebP
optimizados, con dimensiones explícitas. La copia original permanece intacta.

Todos los HTML tienen CSP y metadatos. `404.html` usa rutas desde la raíz para
funcionar en rutas inexistentes anidadas del dominio `rufcom.cl`. Esas rutas
requieren el dominio personalizado o un servidor local en la raíz; no se promete
que la 404 funcione igual bajo el prefijo `/rufcom/` del dominio github.io.

El menú soporta teclado, cierre con Escape y actualización de `aria-expanded`.
Se añadieron enlace para saltar al contenido y foco visible. La validación no
equivale a una auditoría completa de accesibilidad ni a certificación WCAG.

## Flujo

PR a main → CI → merge → CI del commit integrado → artefacto site/ → Pages.
La comprobación posterior usa la URL devuelta por Pages, solicita las nueve páginas por HTTPS y comprueba
presencia de CSP. Si falla, marca el workflow fallido; no revierte automáticamente.
La salida del deploy identifica el despliegue y su commit. La recuperación es
un nuevo commit que revierte el cambio defectuoso y vuelve a pasar por CI.

CI comprueba referencias locales y fragmentos, mayúsculas/minúsculas, metadatos,
CSP esperada, recursos externos, contenido activo SVG y archivos publicables.
Incluye revisión básica de patrones de secretos y pruebas negativas. No consulta
enlaces externos para no convertir fallos de terceros en bloqueos de publicación.
Tampoco es un validador exhaustivo de sintaxis HTML; complementar con inspección
de navegador y revisión de cambios de contenido.

No se auditó la vigencia de afirmaciones regulatorias, precios o recomendaciones
de radioafición. El mantenedor debe revisarlas por separado antes del lanzamiento.
