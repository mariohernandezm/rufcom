# RUFCOM

Sitio estático sobre radioafición y aventura. Dominio previsto: https://rufcom.cl/.
Repositorio: https://github.com/mariohernandezm/rufcom (público).

## Desarrollo local

Requisitos: Python 3.13 y Node.js 22 para los controles. El sitio no requiere
backend, paquetes npm ni compilación.

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory site
```

Abrir http://127.0.0.1:8000/. Usar HTTP local en lugar de abrir archivos con file://
para comprobar la CSP con el mismo modelo de origen que en producción.

```sh
python scripts/validate_site.py
node --check site/assets/js/main.js
python -m unittest discover -s tests -v
```

## Organización

- `site/`: único directorio incluido en el artefacto de Pages.
- `scripts/`: validaciones offline, sin dependencias externas.
- `tests/`: casos negativos para comprobar que las validaciones bloquean errores.
- `.github/`: CI, despliegue, actualizaciones y responsables del código.
- `docs/`: arquitectura, publicación y registro histórico.

CI valida los PR. Los pushes a `main` vuelven a validar y publican el mismo
commit. Los forks pueden usar el código y ejecutar CI; el despliegue está
restringido explícitamente a `mariohernandezm/rufcom`. Para publicar un fork,
adaptar dominio, repositorio y configuración de Pages.

## Contenido y descargables

La audiencia principal son personas que empiezan. Cada descargable debe abrir
con pasos breves, nombres de campos explicados, celdas de entrada visibles y un
ejemplo claramente separado de los datos reales. Mostrar las descargas en
Inicio y al comienzo de Guías; no esconderlas al final de una guía extensa.
Mantener las rutas existentes para que los botones sigan funcionando.


Las guías deben explicar el procedimiento completo dentro de RUFCOM. En los
nuevos contenidos técnicos, identificar las fuentes como texto con el documento,
su versión cuando exista y la fecha de consulta, evitando enlaces externos a los
que el visitante tenga que recurrir para completar la guía. Mantener la navegación
interna y alojar los descargables en el propio sitio.

Las plantillas Excel se distribuyen vacías, sin macros ni conexiones externas.
La ficha de antena contiene las condiciones del ensayo y una tabla de lecturas.
El libro de guardia contiene el registro de QSO y sus instrucciones. No publicar
mediciones ni contactos ficticios como si fueran resultados reales.

## Seguridad

El repositorio será público: todo lo que se suba, incluida su historia, será
visible. Nunca guardar credenciales, claves, archivos `.env` ni copias privadas.
`.gitignore` ayuda a prevenir errores, pero no elimina archivos ya versionados.
El validador incluye detección básica de algunos secretos; no es un escáner
completo. Activar también las protecciones de GitHub descritas en
[deployment.md](docs/deployment.md).

La CSP limita recursos al propio sitio. Se usan fuentes del sistema para evitar
dependencias remotas. El diseño conserva la estructura original; la tipografía
puede variar según el equipo del visitante.

## Licencia

Código y documentación bajo [MIT](LICENSE): se permiten uso, copia, forks,
modificación, redistribución y uso comercial conservando el aviso de autoría
y la licencia. Las contribuciones de código se reciben bajo la misma licencia.

La licencia del código no concede derechos de marca sobre el nombre RUFCOM,
logotipos ni el sello «Aprobado por Ruffis», ni implica respaldo de RUFCOM a un
fork. Los recursos gráficos en `site/assets/images/` no se incluyen en la
licencia MIT del código; verificar sus permisos antes de reutilizarlos fuera
del proyecto. Antes de publicar, el titular debe confirmar que puede distribuir
los recursos gráficos originales. No se han añadido imágenes de terceros.

## Publicación

La configuración externa de Pages, DNS, HTTPS y protecciones de ramas se
documenta en la [guía de publicación](docs/deployment.md). Los archivos del
repositorio no habilitan por sí solos esos controles.
