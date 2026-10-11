'use strict';
function normalizar(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().trim();
}
function buscar(registros, consulta) {
  const q = normalizar(consulta);
  const indicativo = q.replace(/\s+/g, '');
  const palabras = q.split(/\s+/).filter(Boolean);
  if (!q) return [];
  return registros.filter(r => normalizar(r.indicativo).replace(/\s+/g, '').includes(indicativo) || palabras.every(p => normalizar(r.nombre).includes(p)));
}
if (typeof module !== 'undefined') module.exports = {normalizar, buscar};
if (typeof document !== 'undefined') {
  const form = document.querySelector('#buscar-licencia');
  const input = document.querySelector('#consulta');
  const estado = document.querySelector('#estado');
  const body = document.querySelector('#resultados');
  const tabla = document.querySelector('#tabla-resultados');
  const mas = document.querySelector('#mostrar-mas');
  let registros = null, resultados = [], limite = 25;
  function pintar() {
    body.replaceChildren();
    for (const r of resultados.slice(0, limite)) {
      const tr = document.createElement('tr');
      for (const value of [r.indicativo, r.nombre, r.vencimiento]) {
        const td = document.createElement('td'); td.textContent = value; tr.append(td);
      }
      body.append(tr);
    }
    tabla.hidden = !resultados.length;
    mas.hidden = resultados.length <= limite;
    estado.textContent = resultados.length ? `${resultados.length} coincidencias. Mostrando ${Math.min(limite,resultados.length)}.` : 'No encontrado en estos listados. Esto no significa que el indicativo esté disponible ni que la persona carezca de licencia.';
  }
  document.querySelector('#ejecutar-busqueda').addEventListener('click', async event => {
    event.preventDefault();
    if (!input.value.trim()) { estado.textContent = 'Escribe un nombre o indicativo para buscar.'; tabla.hidden = true; mas.hidden = true; return; }
    estado.textContent = 'Buscando…'; tabla.hidden = true; mas.hidden = true;
    try {
      if (!registros) {
        registros = window.licenciasDatos.registros;
      }
      resultados = buscar(registros,input.value); limite = 25; pintar();
    } catch { estado.textContent = 'No pudimos cargar el listado. Vuelve a intentarlo.'; }
  });
  input.addEventListener('keydown', event => { if (event.key === 'Enter') document.querySelector('#ejecutar-busqueda').click(); });
  mas.addEventListener('click', () => { limite += 25; pintar(); });
}
