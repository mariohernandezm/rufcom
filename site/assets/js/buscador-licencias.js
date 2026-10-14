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
  const input = document.querySelector('#consulta');
  const estado = document.querySelector('#estado');
  const body = document.querySelector('#resultados');
  const tabla = document.querySelector('#tabla-resultados');
  const mas = document.querySelector('#mostrar-mas');
  const limpiar = document.querySelector('#limpiar-busqueda');
  const region = document.querySelector('.table-wrap');
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
    region.hidden = tabla.hidden;
    mas.hidden = resultados.length <= limite;
    estado.textContent = resultados.length ? `${resultados.length} coincidencias. Mostrando ${Math.min(limite,resultados.length)}.` : 'No encontrado en estos listados. Esto no significa que el indicativo esté disponible ni que la persona carezca de licencia.';
  }
  const ejecutar = event => {
    event.preventDefault();
    if (!input.value.trim()) {
      estado.textContent = 'Escribe un nombre o indicativo para buscar.';
      tabla.hidden = true; region.hidden = true; mas.hidden = true; limpiar.hidden = true;
      input.focus(); return;
    }
    estado.textContent = 'Buscando…'; tabla.hidden = true; region.hidden = true; mas.hidden = true;
    limpiar.hidden = false;
    try {
      if (!registros) {
        registros = window.licenciasDatos.registros;
      }
      resultados = buscar(registros,input.value); limite = 25; pintar();
    } catch { estado.textContent = 'No pudimos cargar el listado. Recarga esta página y vuelve a buscar.'; }
  };
  document.querySelector('#ejecutar-busqueda').addEventListener('click', ejecutar);
  input.addEventListener('keydown', event => { if (event.key === 'Enter') ejecutar(event); });
  const reset = () => {
    input.value = ''; resultados = []; limite = 25; body.replaceChildren();
    tabla.hidden = true; region.hidden = true; mas.hidden = true; limpiar.hidden = true;
    estado.textContent = 'Escribe tu búsqueda para consultar los registros.';
    input.focus();
  };
  limpiar.addEventListener('click', reset);
  input.addEventListener('input', () => {
    if (!input.value.trim()) reset();
    else {
      tabla.hidden = true; region.hidden = true; mas.hidden = true; limpiar.hidden = false;
      estado.textContent = 'Pulsa Buscar o Enter para consultar este nombre o indicativo.';
    }
  });
  region.hidden = true;
  mas.addEventListener('click', () => { limite += 25; pintar(); });
}
