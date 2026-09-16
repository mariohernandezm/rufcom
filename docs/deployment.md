# Publicación de RUFCOM

Destino acordado: repositorio público `mariohernandezm/rufcom`, GitHub Pages,
dominio principal `rufcom.cl`, con `www.rufcom.cl` como variante.

## Estado y requisitos pendientes

La preparación de código no crea el remoto, no configura protecciones y no
cambia DNS. Hace falta acceso autorizado a GitHub y al proveedor de DNS.
GitHub Free admite Pages desde un repositorio público.

NIC Chile es el registrador. Su documentación indica que no ofrece DNS primario:
se debe identificar o contratar un proveedor de zona DNS y registrar sus
servidores de nombres en NIC Chile. No confundir un servicio secundario con
un editor de zona primaria. La consulta NS realizada durante la preparación
devolvió NXDOMAIN desde este entorno; confirmar el estado con NIC Chile y un
resolver independiente antes de concluir que el dominio no está registrado.
Si existen correo u otros servicios, preservar sus registros MX, TXT y demás
entradas al realizar cualquier cambio de proveedor.

## Integrar la copia

Abrir el repositorio `C:/github_personal/rufcom` en una sesión con escritura.
Revisar diferencias contra esta entrega y copiar la estructura preparada.
Retirar del directorio raíz los HTML, CSS, JS y assets antiguos una vez
verificada la migración a `site/`; conservar el historial útil en Git.
No copiar archivos `.git` entre carpetas ni sobrescribir cambios nuevos.
Ejecutar los comandos de validación del README y revisar `git diff` y el conjunto
de archivos que se añadirá antes del primer commit. No subir ZIP ni archivos
de trabajo. Crear el remoto público vacío y conectar `origin` solo después de
la revisión de secretos y permisos de los recursos gráficos.

## Configurar GitHub antes del primer despliegue

1. Activar 2FA en la cuenta y mantener pocos colaboradores con escritura.
2. Crear el repositorio público `rufcom` en `mariohernandezm`.
3. Configurar Pages > Source > GitHub Actions.
4. En Actions, usar permisos predeterminados de solo lectura y restringir las
   acciones a las que requiere el proyecto. Desactivar aprobación de PR por bots
   si no se necesita. No dar secretos a ejecuciones de forks.
5. Activar secret scanning, push protection y private vulnerability reporting
   donde estén disponibles. Revisar alertas antes de publicar.
6. Crear o configurar el entorno `github-pages`, limitado a la rama `main`.
   No exigir un segundo revisor si solo hay un mantenedor.
7. Tras la primera ejecución de CI en un PR, seleccionar el check emitido por
   `Validate site` como obligatorio en el ruleset de `main`. Exigir PR, bloquear
   force-push y borrado de rama. No exigir aprobación propia imposible.
8. Comprobar permisos de distribución de las imágenes originales.

## Dominio y DNS

Primero verificar el dominio en Settings de la cuenta > Pages. GitHub mostrará
el valor TXT para `_github-pages-challenge-mariohernandezm.rufcom.cl`. Copiar
ese valor exacto al proveedor de zona DNS; no inventarlo. Completar la verificación
y conservar el registro TXT.

Después guardar `rufcom.cl` en Settings del repositorio > Pages > Custom domain,
antes de apuntar el dominio a GitHub. Este workflow no necesita archivo CNAME.

Registros del sitio:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | mariohernandezm.github.io |

No introducir `https://` ni `/rufcom` en el destino DNS. No usar registros wildcard.
Revisar registros A/AAAA antiguos que contradigan el nuevo destino. IPv6 es
opcional: si se usa, añadir los cuatro AAAA oficiales de Pages, sin mezclar
destinos anteriores. Revisar CAA si GitHub no puede emitir el certificado.

Esperar la propagación y activar Enforce HTTPS cuando GitHub haya emitido el
certificado. La primera comprobación automática contra `rufcom.cl` puede fallar
mientras DNS o HTTPS todavía se propagan; una vez listos, repetir el workflow.

## Validación final

- Revisar el commit, el artefacto y el resultado de todos los jobs.
- Visitar las nueve páginas por HTTPS en escritorio y móvil.
- Confirmar redirección de HTTP a HTTPS y de www al dominio principal.
- Probar una URL inexistente anidada y comprobar estado HTTP 404.
- Revisar menú con teclado, imágenes, consola y ausencia de solicitudes externas.
- Revisar sitemap, URL canónica y certificado del dominio.

## Recuperación

Revertir el commit defectuoso mediante PR y dejar que el flujo publique el nuevo
commit validado. No forzar pushes ni desactivar CI para restaurar una versión.
Si se retira el sitio, retirar primero los apuntamientos DNS que dejarían el
dominio huérfano, y después desasociarlo de Pages.

## Referencias

- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- https://docs.github.com/en/actions/reference/security/secure-use
- https://www.nic.cl/ayuda/faq/ins-05.html
