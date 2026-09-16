# Seguridad

Se mantiene la versión actual de `main`.

No publicar credenciales ni detalles explotables en un issue público. Usar
«Report a vulnerability» en la pestaña Security cuando esté habilitado por
el propietario. Si no está disponible, solicitar un canal privado al mantenedor
sin revelar el fallo ni datos sensibles.

## Modelo de seguridad

Sitio estático, sin autenticación, formularios, backend, cookies de aplicación
ni conexiones JavaScript a servicios externos. No almacenar información privada
en el frontend. GitHub sigue siendo responsable de la infraestructura de Pages.

La CSP se sirve mediante `meta`, antes de cargar recursos. Esta modalidad no
permite `frame-ancestors` ni sustituye los controles mediante encabezados HTTP.
No se afirma que exista protección completa contra framing. GitHub Pages no
ofrece configuración de encabezados personalizados mediante `_headers` o
`.htaccess`. HTTPS se habilita desde Settings > Pages, no desde el código.

El pipeline separa validación, empaquetado y despliegue. Solo el job de despliegue
recibe `pages: write` e `id-token: write`. No requiere tokens personales. Los PR
no publican ni reciben esos permisos. Actions fijadas a SHA completo; revisar
manualmente cada actualización de Dependabot antes de integrarla.

## Incidentes

Si una credencial aparece en el repositorio, revocarla primero. Borrar el archivo
no invalida el secreto ni elimina la historia o los forks. Después investigar,
rotar y limpiar con un procedimiento acordado; no reescribir historia a ciegas.
Para un cambio defectuoso del sitio, revertir el commit mediante PR y desplegar
de nuevo. No eliminar el dominio de Pages dejando DNS apuntando a GitHub.
