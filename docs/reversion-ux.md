# Reversión de la publicación de UX

Punto de restauración anterior a esta publicación:

- Commit: `edc0ce7d9fa26f6e1a80eb105ea6ef8f0dcd7de4`.
- Rama de respaldo: `respaldo/antes-ux-20261016`.
- Cambio que debe revertirse: PR #80 de `mariohernandezm/rufcom`.

Si la nueva presentación presenta un problema, abrir el PR #80 ya integrado y
usar **Revert** para crear un PR que deshaga su integración. Revisar el cambio,
esperar los controles y fusionar ese PR. GitHub Pages publicará la versión
restaurada. No basta con cerrar el PR original ni con seleccionar otra rama.

Alternativa desde un checkout limpio y actualizado, con permisos de escritura:

1. Crear una rama de recuperación desde `origin/main`.
2. Identificar el commit de integración de #80 en el historial.
3. Ejecutar `git revert -m 1 <commit-de-integracion>` si se integró mediante
   merge commit. Para una integración squash, revertir su commit sin `-m`.
4. Subir la rama y abrir un PR hacia `main`.
5. Esperar CI, integrar y comprobar el workflow Deploy Pages y la web pública.

No usar `reset --hard`, force-push, cambios DNS ni desactivar los controles.
Si existen cambios posteriores que convenga conservar, revisar los conflictos
y limitar la reversión al cambio defectuoso.

Después de restaurar, comprobar Inicio, Guías, el menú móvil, ambos buscadores,
las descargas, las canónicas y la ausencia de bloqueos accidentales de indexación.
La reversión no garantiza que Google mantenga posiciones sin fluctuaciones.
