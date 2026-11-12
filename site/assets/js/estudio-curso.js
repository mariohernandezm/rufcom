'use strict';
const estudioCurso = {
 "reglamento": {
  "title": "Reglamentación, licencias y examen",
  "url": "estudio-reglamento.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 },
 "electricidad": {
  "title": "Electricidad: de la carga a los circuitos",
  "url": "estudio-electricidad.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 },
 "alterna": {
  "title": "Corriente alterna, RLC y filtros",
  "url": "estudio-alterna.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 },
 "transformadores": {
  "title": "Magnetismo y transformadores",
  "url": "estudio-transformadores.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 },
 "semiconductores": {
  "title": "Diodos, transistores y válvulas",
  "url": "estudio-semiconductores.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 },
 "fuentes": {
  "title": "Fuentes de alimentación y rectificación",
  "url": "estudio-fuentes.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 },
 "amplificadores": {
  "title": "Amplificadores, ganancia y realimentación",
  "url": "estudio-amplificadores.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 },
 "osciladores": {
  "title": "Osciladores y estabilidad de frecuencia",
  "url": "estudio-osciladores.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 },
 "integrados": {
  "title": "Circuitos integrados, lógica y operacionales",
  "url": "estudio-integrados.html",
  "route": [
   "general",
   "superior"
  ]
 },
 "modulacion": {
  "title": "Modulación: AM, FM, SSB y CW",
  "url": "estudio-modulacion.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 },
 "transmisores": {
  "title": "Transmisores y diagnóstico por etapas",
  "url": "estudio-transmisores.html",
  "route": [
   "novicio",
   "general",
   "superior"
  ]
 },
 "receptores": {
  "title": "Receptores y superheterodino",
  "url": "estudio-receptores.html",
  "route": [
   "novicio",
   "general",
   "superior"
  ]
 },
 "antenas": {
  "title": "Antenas, líneas y adaptación",
  "url": "estudio-antenas.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 },
 "propagacion": {
  "title": "Propagación, ionosfera y desvanecimiento",
  "url": "estudio-propagacion.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 },
 "mediciones": {
  "title": "Mediciones, instrumentos e interferencias",
  "url": "estudio-mediciones.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 },
 "operacion": {
  "title": "Operación, alfabeto fonético, repetidoras y CW",
  "url": "estudio-operacion.html",
  "route": [
   "aspirante",
   "novicio",
   "general",
   "superior"
  ]
 }
};
const estudioRutas = {"aspirante": ["reglamento", "electricidad", "alterna", "transformadores", "semiconductores", "fuentes", "amplificadores", "osciladores", "modulacion", "antenas", "propagacion", "mediciones", "operacion"], "novicio": ["reglamento", "electricidad", "alterna", "transformadores", "semiconductores", "fuentes", "amplificadores", "osciladores", "modulacion", "transmisores", "receptores", "antenas", "propagacion", "mediciones", "operacion"], "general": ["reglamento", "electricidad", "alterna", "transformadores", "semiconductores", "fuentes", "amplificadores", "osciladores", "integrados", "modulacion", "transmisores", "receptores", "antenas", "propagacion", "mediciones", "operacion"], "superior": ["reglamento", "electricidad", "alterna", "transformadores", "semiconductores", "fuentes", "amplificadores", "osciladores", "integrados", "modulacion", "transmisores", "receptores", "antenas", "propagacion", "mediciones", "operacion"]};
if(typeof module!=='undefined')module.exports=estudioCurso;
if(typeof window!=='undefined'){window.estudioCurso=estudioCurso;window.estudioRutas=estudioRutas;}
