from pathlib import Path
from html import escape as e
import json, re, unicodedata
from study_course_content import LESSONS, ROUTES

ROOT=Path(__file__).resolve().parents[1]
SITE=ROOT/'site'
VERSION='20261111-curso-rufis-v8'
PREFIXES={'aspirante':'CD','novicio':'CA','general':'CE','superior':'XQ'}
def read(p): return p.read_text(encoding='utf-8')
def write(p,s): p.write_text(s,encoding='utf-8',newline='')
def plain(s): return ''.join(c for c in unicodedata.normalize('NFD',s.lower()) if unicodedata.category(c)!='Mn')
def p(s): return '<p data-rf-role="body">'+s+'</p>'
def link(h,t,button=False): return f'<a href="{e(h,quote=True)}"'+(' class="rf-button" data-rf-role="control"' if button else '')+'>'+e(t)+'</a>'
def table(headers,rows):
 return '<div class="study-table-wrap"><table class="study-table"><thead><tr>'+''.join('<th scope="col" data-rf-role="body">'+e(x)+'</th>' for x in headers)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td data-rf-role="body">'+e(str(x))+'</td>' for x in row)+'</tr>' for row in rows)+'</tbody></table></div>'

# Orden y enlaces comunes conservados de la guía existente.
template=read(SITE/'materias-radioaficion.html')
template=re.sub(r'<!-- SEO:(HEAD|SCHEMA) -->.*?<!-- /SEO:\1 -->\s*','',template,flags=re.S)
header=template[:template.index('<main')]
footer=template[template.index('<footer'):template.index('<script src="assets/js/main.js"')]
def page(name,title,description,body,course=False):
 head=re.sub(r'<title>.*?</title>','<title>'+e(title)+' | RUFCOM</title>',header)
 head=re.sub(r'<meta name="description" content="[^"]*">','<meta name="description" content="'+e(description,quote=True)+'">',head)
 head=head.replace('https://rufcom.cl/materias-radioaficion.html','https://rufcom.cl/'+name)
 head=re.sub(r'estudio\.css\?v=[^"\s]+','estudio.css?v='+VERSION,head)
 scripts=''.join(f'<script src="assets/js/{x}'+(f'?v={VERSION}' if x.startswith('estudio') else '')+'" defer></script>' for x in ['main.js','analytics.js','estudio-curso.js','estudio-modelo.js','estudio-banco.js','estudio-curso-ui.js','estudio.js'])
 write(SITE/name,head+'<main id="contenido" class="container section study-wrap">'+body+'</main>'+footer+scripts+'</body></html>\n')

# Agrupación editorial por concepto. Los enunciados, opciones y claves originales no se cambian.
bank_path=SITE/'assets/js/estudio-banco.js'
original=read(bank_path)
bank,end=json.JSONDecoder().raw_decode(original.split('const estudioBanco = ',1)[1])
overrides={}
def assign(prefix,nums,module):
 for n in nums: overrides[f'{prefix}-{n}']=module
assign('B1',[13,17,18,19,34,35],'mediciones')
assign('C1',[14,20,21,22,47,48,72],'mediciones')
assign('B1',[25,33,36,37,38,39,40,41,42,44,45,46,47,49,50,51,57,58],'alterna')
assign('C1',[28,29,30,32,33,34,49,50,51,52,53,54,55,56,57,58,*range(62,79),79,80,81,82,83,85,94,95],'alterna')
assign('B1',[52],'transformadores');assign('C1',[59,60,86,87,88],'transformadores')
assign('B1',[55,59,61,62],'fuentes');assign('C1',[84,91],'fuentes')
assign('B2',[1,5],'semiconductores');assign('B2',[2,3,4,26],'modulacion');assign('B2',[6],'amplificadores');assign('B2',[7,21,22,23,24,25,30],'propagacion')
assign('B2',[8,9,10,11,12,13,14,15,27,28,29,31],'antenas');assign('B2',[16,17,18,19,20],'alterna');assign('B2',[32],'electricidad');assign('B2',[33],'fuentes')
assign('C2',[1,8,9,10,11,12,13,14,26],'semiconductores');assign('C2',[2,3,4,5,6,47,48],'modulacion')
assign('C2',[7,18,19,20,21,22,23,24,25],'antenas');assign('C2',[15],'amplificadores');assign('C2',[16,*range(27,41)],'alterna');assign('C2',[17,*range(41,47)],'propagacion');assign('C2',[49,50],'receptores')
assign('D1',[*range(5,10),15,16,19,22,23,*range(25,29),*range(39,50)],'alterna');assign('D1',[10],'mediciones');assign('D1',[12,20,21,37,38],'transformadores');assign('D1',[24,29],'fuentes')
assign('D2',[2,32,33,34,35,38,45,46,47,48,65,71,84],'electricidad')
assign('D2',[1,4,10,11,12,13,14,15,16,17,18,19,20,21,40,41,43,44,57,92,109],'semiconductores')
assign('D2',[3,55,62,63,70,73,90,91,93,105,108,110,111],'amplificadores')
assign('D2',[5,26,27,28,29,30,31,36,37,98],'mediciones')
assign('D2',[6,7,8,9,83,100,101],'operacion')
assign('D2',[22,23,25,54,59,72,82,103,113,118,119],'modulacion')
assign('D2',[24,67,74,106,116,117],'osciladores');assign('D2',[42,64],'integrados')
assign('D2',[49,51,76,102,114,115],'propagacion');assign('D2',[50,52,53,77,78,79,80,81,94,95,96,97,99,104,107],'antenas')
assign('D2',[56,89],'transformadores');assign('D2',[58,66,68,69,75],'alterna');assign('D2',[60,61],'fuentes');assign('D2',[39,85,86,88],'transmisores');assign('D2',[87],'receptores');assign('D2',[112],'operacion')
assign('E1',[1,12,18,19,20],'electricidad');assign('E1',[2,3,5,6,7,14,15,16,17,25,26,29],'alterna');assign('E1',[4],'fuentes');assign('E1',[8,9,10,11,13],'transformadores');assign('E1',[21,23,30],'antenas');assign('E1',[22],'amplificadores');assign('E1',[24,27,28],'mediciones')
assign('E2',[1,21,22,23,43,59,70,71,72,73,74],'semiconductores');assign('E2',[2,3,24,67,68,69],'propagacion')
assign('E2',[4,5,7,34,36,37,45,77,84,86,98,99,100,102],'modulacion');assign('E2',[8,9,11,12,14,18,44,48,92],'alterna')
assign('E2',[6,13,27,28,29,30,31,32,33,49,51,52,53,61,63,64,65,66,78,79,80,97],'antenas')
assign('E2',[10,25,62,91],'mediciones');assign('E2',[15,46,83],'fuentes');assign('E2',[16,17,20,35,42,47,75,76,81,85,87,101],'amplificadores')
assign('E2',[19,103],'operacion');assign('E2',[26,38,39,40,60,88,89,90,93,94,95,96],'receptores');assign('E2',[41],'osciladores')
assign('E2',[50],'electricidad');assign('E2',[54,55,56,57,58,104],'integrados');assign('E2',[82],'transformadores')
assign('C3',[9,10],'modulacion');assign('C3',[11],'propagacion');assign('C3',[13,14],'transmisores')
assign('D3',[6,14,15,16],'mediciones')
def classify(q):
 if q['id'] in overrides:return overrides[q['id']]
 if q['topic']=='reglamento':return 'reglamento'
 if q['id'][1]=='3':return 'operacion'
 return 'electricidad'
for q in bank:q['module']=classify(q)
q=next(q for q in bank if q['id']=='E1-20')
q['question']='Se conecta un divisor de tensión, con tomas, a una fuente de tensión de 220 V para que suministre corriente de: A.- 20 mA a 100 V. B.- 30 mA a 150 V. ¿Cuál es respectivamente la resistencia de cada sección del divisor, R3, R2 y R1, si la corriente que pasa por el divisor ha de ser 50 mA en carga?'
q['options']=['70, 50 y 100 Ohm.','700. 714 y 200 Ohm.','220, 150 y 100 Ohm.','700, 500 y 2000 Ohm.']

# Incidencias concretas detectadas al contrastar teoría, unidades y normativa.
# Se conserva la clave oficial a modo documental y se evita calificar con ella.
issues={
 'A0-27':'La clave publicada indica 200 W para móvil VHF Novicio; el art. 13 b/c del Decreto 523 limita VHF a 50 W.',
 'A0-69':'La clave publicada limita Aspirante VHF a 25 W; el art. 15 b del Decreto 523 indica 50 W.',
 'C1-70':'El enunciado no especifica onda rectificada ni semiciclo: el promedio algebraico de una sinusoide completa es cero, no 0,636 del pico.',
 'C1-93':'Aumentar la sección de un conductor reduce su resistencia. La clave “aumenta sólo la capacidad” no describe ese cambio.',
 'C2-14':'La clave describe electrones de placa a cátodo; en la válvula, el cátodo emite y la placa recoge electrones.',
 'D1-10':'Con movimiento de 1 mA, 100 Ω y corriente total de 5 mA, el shunt ideal es 25 Ω; la clave publicada indica 20 Ω.',
 'D1-30':'Con P = 13,75 W e I = 55 mA, R = P/I² ≈ 4.545 Ω. La opción publicada “4,545 Ohm” es ambigua por su separador decimal.',
 'D1-32':'El enunciado mezcla corriente y voltios y la clave de 10 mA no permite una resolución coherente con los datos transcritos del original.',
 'D1-41':'No se especifica rectificación ni semiciclo: el promedio algebraico de una sinusoide completa es cero; 0,636Vp es su promedio rectificado.',
 'D2-15':'La clave “su polarización es en fase” no explica la configuración emisor común; la tensión de señal suele invertir fase en esa etapa.',
 'D2-16':'La clave publicada indica potasio y tantalio. Los semiconductores habituales de esta pregunta son germanio y silicio.',
 'D2-17':'El enunciado dice “transmisor” y la clave “por huecos” no describe su estructura; el texto parece referirse a un transistor y requiere aclaración.',
 'D2-19':'Baja impedancia de entrada y alta de salida describen base común; la clave publicada indica emisor común.',
 'E1-3':'El enunciado no define rectificación ni semiciclo para el valor medio; no debe confundirse con el promedio de una sinusoide completa.',
 'E1-20':'La clave publicada termina en 200 Ω para R1; con los datos y la figura, R1 = 100 V / 50 mA = 2.000 Ω. Se conserva el texto original de las alternativas.',
 'E1-30':'La corriente de una línea coaxial adaptada requiere ida y retorno por los conductores; la clave indica sólo conductor central.',
 'E3-1':'Las pausas permiten escuchar a otras estaciones; la clave publicada indica ir a buscar lápiz y papel.',
 'E3-3':'Para valorar un enlace directo se comprueba la otra estación en la entrada de la repetidora; la clave propone escuchar un repetidor más lejano.'
}
for q in bank:
 if q['id'] in issues:q['excluded']=issues[q['id']]
 if q['id']=='D2-44':
  q.pop('excluded',None)
  q['explanation']='El solucionario utiliza “grilla” para el electrodo de control del FET, llamado puerta o gate en la terminología de esta lección. Distingue esta puerta de las rejillas de una válvula.'
write(bank_path,original.split('const estudioBanco = ',1)[0]+'const estudioBanco = '+json.dumps(bank,ensure_ascii=False,indent=1)+';\nif(typeof module!==\'undefined\')module.exports=estudioBanco;\nif(typeof window!==\'undefined\')window.estudioBanco=estudioBanco;\n')
write(ROOT/'docs/estudio-incidencias.json',json.dumps(issues,ensure_ascii=False,indent=2)+'\n')
module_data={x['id']:{'title':x['title'],'url':'estudio-'+x['id']+'.html','route':[k for k,v in ROUTES.items() if x['id'] in v]} for x in LESSONS}
write(SITE/'assets/js/estudio-curso.js',"'use strict';\nconst estudioCurso = "+json.dumps(module_data,ensure_ascii=False,indent=1)+";\nconst estudioRutas = "+json.dumps(ROUTES,ensure_ascii=False)+";\nif(typeof module!=='undefined')module.exports=estudioCurso;\nif(typeof window!=='undefined'){window.estudioCurso=estudioCurso;window.estudioRutas=estudioRutas;}\n")

# Diagramas originales: los bloques indican funciones y los esquemas conexiones.
diagrams={
 'examen':(['Preguntas legales','Nota de cada área','Aplicar los pesos','Comprobar mínimos'],'30 preguntas · 45 minutos · ambas áreas importan'),
 'transformador':(['Primario: Np, Vp','Flujo variable','Secundario: Ns, Vs'],'Vs / Vp = Ns / Np · Zp / Zs = (Np / Ns)²'),
 'dispositivos':(['Polarización','Dispositivo activo','Carga y señal'],'La fuente aporta energía; el dispositivo controla su transferencia'),
 'fuente':(['Transformar','Rectificar','Filtrar','Regular'],'Alterna → pulsos unidireccionales → continua con menor rizado'),
 'ganancia':(['Entrada: 1 mW','Ganancia: +10 dB','Salida: 10 mW'],'En cascada, las ganancias y pérdidas en dB se suman'),
 'oscilador':(['Red selectiva','Etapa activa','Salida / buffer'],'La realimentación repone las pérdidas con la fase apropiada'),
 'logica':(['A = 1, B = 0','AND → 0','OR → 1','XOR → 1'],'Una tabla de verdad relaciona entradas y salida'),
 'espectro':(['fc − fm','Portadora: fc','fc + fm'],'AM con un tono: banda lateral inferior, portadora y superior'),
 'transmisor':(['Generar / modular','Excitar','Amplificar RF','Filtrar / carga'],'Comprueba alimentación y señal por etapas'),
 'receptor':(['RF / preselector','Mezclador + OL','FI / filtro','Detector / audio'],'FI = |RF − OL| · el preselector ayuda a rechazar la imagen'),
 'antena':(['Transmisor','Línea: Z0','Antena: ZL'],'Resonancia, adaptación y eficiencia describen cosas distintas'),
 'propagacion':(['Emisión','Superficie / atmósfera','Recepción'],'Un cambio de trayecto puede cambiar intensidad, fase y polarización'),
 'medicion':(['Transmisor','Acoplador / carga','Atenuación','Instrumento'],'Define frecuencia, potencia máxima y plano de medida'),
 'repetidor':(['Estación A','Entrada de repetidora','Salida de repetidora','Estación B'],'El tono de acceso no hace privada la conversación')
}
images=SITE/'assets/images'
for d,(blocks,caption) in diagrams.items():
 n=len(blocks);width=(672-(n-1)*16)/n;shapes=[]
 for i,text in enumerate(blocks):
  x=24+i*(width+16);shapes.append(f'<rect x="{x}" y="70" width="{width}" height="80" rx="8" fill="#fff3cf" stroke="#b26f00"/>')
  words=text.split(' ');lines=[text] if len(text)<19 else [' '.join(words[:len(words)//2]),' '.join(words[len(words)//2:])]
  for j,line in enumerate(lines):shapes.append(f'<text x="{x+width/2}" y="{104+j*26}" text-anchor="middle">{e(line)}</text>')
  if i<n-1:shapes.append(f'<path d="M{x+width+2} 110h12m-5 -5l5 5-5 5" fill="none" stroke="#082330" stroke-width="2"/>')
 shapes.append(f'<text x="360" y="202" text-anchor="middle" font-size="17">{e(caption)}</text>')
 if d=='oscilador':shapes.append('<path d="M360 150v24H130v-24" fill="none" stroke="#082330" stroke-width="2"/>')
 write(images/f'curso-{d}.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 240" width="720" height="240" role="img"><title>'+e(caption)+'</title><g font-family="system-ui, sans-serif" font-size="18" fill="#26211b">'+''.join(shapes)+'</g></svg>\n')
# Red mixta real, nodos y valores del ejemplo resuelto.
write(images/'curso-circuito.svg','''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 300" width="720" height="300" role="img"><title>Fuente de 10 V, resistencia de 20 ohmios en serie con dos de 60 ohmios en paralelo</title><g fill="none" stroke="#082330" stroke-width="3"><path d="M80 160V65h120m100 0h110v45m0 70v65H80v-45M410 65h180v45m0 70v65H410"/><circle cx="80" cy="180" r="20"/><rect x="200" y="52" width="100" height="26"/><rect x="397" y="110" width="26" height="70"/><rect x="577" y="110" width="26" height="70"/></g><g font-family="system-ui, sans-serif" font-size="20" fill="#26211b"><text x="35" y="180">+</text><text x="25" y="217">10 V</text><text x="215" y="40">20 Ω</text><text x="435" y="153">60 Ω</text><text x="615" y="153">60 Ω</text><text x="180" y="285">0,2 A total · 0,1 A por rama · Rt = 50 Ω</text></g></svg>''')
write(images/'curso-resonancia.svg','''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 260" width="720" height="260" role="img"><title>Circuito RLC serie: resistencia, bobina y condensador comparten la misma corriente</title><g fill="none" stroke="#082330" stroke-width="3"><path d="M75 130V65h100m100 0h90m96 0h74m20 0h90v130H75v-35"/><circle cx="75" cy="145" r="15"/><rect x="175" y="52" width="100" height="26"/><path d="M365 65a12 15 0 0 1 24 0a12 15 0 0 1 24 0a12 15 0 0 1 24 0a12 15 0 0 1 24 0M535 40v50m20-50v50"/></g><g font-family="system-ui, sans-serif" font-size="20" fill="#26211b"><text x="215" y="35">R</text><text x="400" y="35">L</text><text x="535" y="30">C</text><text x="170" y="238">En resonancia: XL = XC · |Z| = R</text></g></svg>''')

focus={
 'reglamento':'En todas las categorías: recorre las preguntas del A, identifica responsabilidades y distingue la norma de examen vigente de las claves históricas.',
 'electricidad':'Aspirante: magnitudes y redes sencillas. Novicio: añade Kirchhoff. General y Superior: resuelve redes mixtas, divisores cargados y balance de potencia.',
 'alterna':'Aspirante: reconoce resonancia y filtros. Novicio: trabaja reactancia y fase. General y Superior: calcula impedancia, Q, transitorios y ancho de banda.',
 'transformadores':'Novicio: comprende inducción y espiras. General y Superior: incluye impedancias reflejadas, pérdidas, VA y condiciones de diseño.',
 'semiconductores':'Aspirante: identifica diodo y transistor. Novicio: añade válvulas y polarización. General y Superior: interpreta curvas, configuraciones y dispositivos especiales.',
 'fuentes':'Para comenzar: diferencia rectificación, filtro y regulación. General y Superior: calcula rizado, tensión inversa, disipación y variación con carga.',
 'amplificadores':'Aspirante y Novicio: distingue tipos de ganancia. General y Superior: combina dB, clases, acoplamientos, realimentación y linealidad.',
 'osciladores':'Aspirante y Novicio: reconoce Hartley, Colpitts, cristal y RC. General y Superior: añade cálculo equivalente, estabilidad y aislamiento de etapas.',
 'integrados':'General y Superior: resuelve tablas lógicas, ganancias de operacionales y límites reales. Si recién comienzas, vuelve primero a circuitos y transistores.',
 'modulacion':'Aspirante y Novicio: distingue portadora, AM, FM y SSB. General y Superior: calcula índice, potencia, ancho y métodos de generación y detección.',
 'transmisores':'Novicio: sigue el diagrama de bloques. General y Superior: añade polarización, adaptación, eficiencia, neutralización y diagnóstico.',
 'receptores':'Novicio: reconoce bloques y detector. General y Superior: calcula FI e imagen y compara sensibilidad, ruido, selectividad y sobrecarga.',
 'antenas':'Aspirante: reconoce antenas y longitudes. Novicio: relaciona adaptación y líneas. General y Superior: calcula reflexión, pérdidas, ganancia y plano de medida.',
 'propagacion':'En todas las categorías: relaciona frecuencia, trayecto e ionosfera. Para profundizar, interpreta salto, fading y cambios de condiciones sin prometer alcance.',
 'mediciones':'Primero: conexión correcta de instrumentos. General y Superior: añade cargas de RF, atenuación, calibración, medidas de receptor y diagnóstico de interferencia.',
 'operacion':'Aspirante: fonético y reportes. Novicio: repetidoras, modos y ajustes. General: añade CW y siglas. Superior: consolida el uso y control de repetidoras.'}

for i,lesson in enumerate(LESSONS):
 id=lesson['id'];name='estudio-'+id+'.html';title=lesson['title']
 body='<nav class="study-breadcrumb" aria-label="Ruta de la lección">'+link('materias-radioaficion.html','Material de estudio')+' / '+e(title)+'</nav>'
 body+='<p id="course-lesson-position" class="eyebrow" data-rf-role="eyebrow">Lección '+str(i+1)+' de '+str(len(LESSONS))+'</p><h1 data-rf-role="page-title">'+e(title)+'</h1>'+p(e(lesson['intro']))
 body+='<aside class="study-card"><h2 data-rf-role="card-title">Qué trabajar según tu categoría</h2>'+p(e(focus[id]))+'</aside>'
 body+='<p id="course-route-context" class="source-note" data-rf-role="note" hidden></p>'
 body+='<nav class="study-index" aria-label="Contenido de la lección"><h2 data-rf-role="section-title">En esta lección</h2><ul>'+''.join('<li data-rf-role="body">'+link('#concepto-'+str(j+1),s[0])+'</li>' for j,s in enumerate(lesson['sections']))+'<li data-rf-role="body">'+link('#ejemplos','Ejemplos y autoevaluación')+'</li><li data-rf-role="body">'+link('#preguntas-oficiales','Preguntas oficiales de este tema')+'</li></ul></nav>'
 for j,(subtitle,text) in enumerate(lesson['sections']):
  body+='<section class="study-lesson" id="concepto-'+str(j+1)+'"><h2 data-rf-role="section-title">'+e(subtitle)+'</h2>'+p(e(text))+'</section>'
  if j==1:
   body+='<figure class="course-figure"><div class="course-diagram-scroll"><img src="assets/images/curso-'+lesson['diagram']+'.svg" width="720" height="'+('300' if lesson['diagram']=='circuito' else '260' if lesson['diagram']=='resonancia' else '240')+'" alt="'+e(diagrams.get(lesson['diagram'],([],('Fuente de 10 V: 20 Ω en serie con dos ramas de 60 Ω' if id=='electricidad' else 'RLC serie: en resonancia XL y XC se cancelan')))[1],quote=True)+'" loading="lazy"></div><figcaption data-rf-role="note">Esquema didáctico de RUFCOM. En pantallas pequeñas puedes desplazarlo horizontalmente.</figcaption></figure>'
 if id=='reglamento':
  body+='<section class="study-lesson" id="facultades"><h2 data-rf-role="section-title">Bandas y potencias: relaciona la categoría con la estación</h2>'+p('Resumen de los artículos 9, 11, 13 y 15 del Decreto 523. Son límites a la entrada de la línea de alimentación de antena; no potencias de audio ni de consumo. Las bandas indicadas por su frecuencia de referencia deben usarse dentro de los segmentos atribuidos y autorizados, con todo el ancho de emisión dentro de ellos.')
  body+=table(['Categoría','HF','VHF','UHF'],[
   ['Aspirante','Fija: 100 W PEP en 3,5 / 7 / 28 MHz. No se contempla móvil HF.','Fija o móvil: 50 W en 144 MHz.','No contemplada para esta categoría.'],
   ['Novicio','Fija: 200 W PEP; móvil: 50 W PEP. Bandas de 3,5 / 7 / 10 / 28 MHz.','Fija o móvil: 50 W en 50 / 144 / 220 MHz.','Fija o móvil: 25 W hasta 1.270 MHz; 10 W en 2.400 y 5.650 MHz. Bandas de 430 / 1.270 / 2.400 / 5.650 MHz.'],
   ['General y Superior','Fija: 1.200 W PEP; móvil: 200 W PEP, bajo 30 MHz.','Fija: 100 W; móvil: 50 W.','Fija: 50 W y móvil: 25 W hasta 1.270 MHz; 10 W sobre 1.270 MHz.']])
  body+=p('General y Superior pueden operar las bandas atribuidas al servicio; la facultad experimental temporal del artículo 9 e corresponde a Superior. Los Aspirantes menores de 15 años requieren compañía y supervisión de Novicio, General o Superior para instalar y operar en HF. Revisa tu licencia y permiso antes de transmitir.')+'</section>'
  body+='<section class="study-lesson" id="instituciones"><h2 data-rf-role="section-title">Organizaciones, distintivos y responsabilidades</h2>'+p('Los prefijos ordinarios por categoría son CD (Aspirante), CA (Novicio), CE (General) y XQ (Superior); los especiales requieren asignación de SUBTEL. Un círculo debe reunir al menos diez socios con licencia vigente, uno como mínimo General o Superior. Un radio club reconocido necesita personalidad jurídica sin fines de lucro y el registro reglamentario de treinta socios: al menos quince Novicio o Aspirante y cinco General o Superior, con las excepciones fundadas que permite el reglamento. Pertenecer a una organización no es obligatorio.')+p('Las repetidoras atendidas y no atendidas tienen condiciones y responsables distintos; las no atendidas y radiofaros solo pueden instalarlos las organizaciones contempladas en el reglamento. Las redes de emergencia se organizan conforme a los requerimientos de las autoridades y restringen el tráfico a esa situación. SUBTEL regula y fiscaliza; el reglamento atribuye al Ministro la aplicación de sanciones por su procedimiento, con notificación y posibilidad de defensa. Para el examen, distingue autoridad fiscalizadora, titular responsable y autoridad sancionadora.')+p('Las solicitudes de renovación se presentan al menos noventa días antes del vencimiento, conforme al artículo 17; allí también se regula la vigencia mientras se tramita una solicitud oportuna y el caso de quien deja vencer ese plazo. Un permiso internacional depende de los convenios y facultades equivalentes: no transforma automáticamente una licencia en autorización mundial sin condiciones.')+'</section>'
 body+='<section id="ejemplos" class="study-lesson"><h2 data-rf-role="section-title">Resuelve paso a paso</h2>'
 for subtitle,text in lesson['examples']:body+='<div class="study-example"><h3 data-rf-role="card-title">'+e(subtitle)+'</h3>'+p(e(text))+'</div>'
 body+='<details class="course-check"><summary data-rf-role="control">Comprueba lo aprendido: '+e(lesson['check'][0])+'</summary>'+p(e(lesson['check'][1]))+'</details></section>'
 body+='<section id="preguntas-oficiales" class="study-lesson" data-course-module="'+id+'"><h2 id="course-bank-title" tabindex="-1" data-rf-role="section-title">Preguntas oficiales de este tema</h2>'+p('Estudia los enunciados y figuras sin salir de RUFCOM. Intenta responder antes de abrir la clave. Las incidencias documentales se indican y quedan fuera de la práctica calificada.')
 body+='<label class="quiz-field" for="course-category" data-rf-role="control">Tu categoría<select id="course-category" data-rf-role="control"><option value="aspirante">Aspirante</option><option value="novicio">Novicio</option><option value="general">General</option><option value="superior">Superior</option><option value="todas">Todas las categorías</option></select></label><p id="course-bank-count" role="status" class="source-note" data-rf-role="note"></p><div id="course-bank-list"></div><div class="study-actions"><button id="course-bank-previous" type="button" class="rf-button" data-rf-role="control">Preguntas anteriores</button><button id="course-bank-next" type="button" class="rf-button" data-rf-role="control">Más preguntas</button><a id="course-practice" class="rf-button" data-rf-role="control" href="practicar-examen.html?leccion='+id+'">Practicar este tema</a></div><noscript>'+p('Para consultar las preguntas interactivas, activa JavaScript. Las explicaciones, los ejemplos y la autoevaluación de esta lección funcionan sin él.')+'</noscript></section>'
 body+='<section class="study-lesson"><h2 data-rf-role="section-title">Continúa tu recorrido</h2><div class="study-actions">'
 if i:body+=link('estudio-'+LESSONS[i-1]['id']+'.html','Anterior: '+LESSONS[i-1]['title'],True)
 if i<len(LESSONS)-1:body+=link('estudio-'+LESSONS[i+1]['id']+'.html','Siguiente: '+LESSONS[i+1]['title'],True)
 body+=link('materias-radioaficion.html','Ver todas las lecciones',True)+'</div></section>'
 body+=p('') if False else ''
 body+='<p class="source-note" data-rf-role="note">Fuentes de estudio: programas técnicos y banco SUBTEL, apéndices A–E, versión 06/12/2020, y sus solucionarios oficiales. Reglamentación: Decreto 523, versión 21/06/2013; evaluación: Resolución Exenta 2620/2023. Revisión documental: 11/11/2026. Explicaciones, cálculos y esquemas didácticos de RUFCOM. '+link('estudiar-radioaficion.html#material-oficial','Consultar documentos oficiales')+'.</p>'
 page(name,title,lesson['intro'],body,True)

# Catálogo: se mantienen todos los fragmentos antiguos para los enlaces existentes.
body='<p class="eyebrow" data-rf-role="eyebrow">Estudia y practica tu examen</p><h1 data-rf-role="page-title">Material de estudio de radioafición</h1>'+p('Aprende dentro de RUFCOM con 16 lecciones, esquemas, ejemplos resueltos y autoevaluaciones. En cada lección puedes consultar las preguntas oficiales de SUBTEL con sus figuras y después practicar ese tema.')
body+='<div class="study-actions">'+link('#ruta-de-estudio','Elegir mi recorrido',True)+link('#lecciones','Ver las 16 lecciones',True)+link('practicar-examen.html','Practicar examen',True)+'</div>'
body+='<section id="ruta-de-estudio"><h2 data-rf-role="section-title">Elige tu categoría</h2>'+p('Sigue el orden propuesto. Si ya dominas una materia, resuelve su autoevaluación y practica antes de avanzar. Las lecciones de base también sirven para quienes cambian de categoría.')+'<div class="study-grid">'
for cat,ids in ROUTES.items():
 body+='<article id="ruta-'+cat+'" class="study-card"><h3 data-rf-role="card-title">'+cat.capitalize()+'</h3>'+p({'aspirante':'Empieza por los fundamentos. Identifica los conceptos y trabaja los ejercicios básicos de los apéndices A y B.','novicio':'Afianza la base y añade inducción, transformadores, transmisores y receptores. Trabaja los apéndices A y C.','general':'Recorre también integrados, mediciones y los cálculos de circuitos. Dedica tiempo a las figuras de los apéndices A y D.','superior':'Profundiza cálculos, diseño y diagnóstico. Resuelve las figuras de los apéndices A y E y revisa por qué descartas cada alternativa.'}[cat])+'<details><summary data-rf-role="control">Ver recorrido de '+cat.capitalize()+'</summary><ol>'+''.join('<li data-rf-role="body">'+link(module_data[id]['url']+'?categoria='+cat,module_data[id]['title'])+'</li>' for id in ids)+'</ol></details><div class="study-actions">'+link(module_data[ids[0]]['url']+'?categoria='+cat,'Comenzar a estudiar',True)+link('practicar-examen.html?categoria='+cat,'Simulacro '+cat.capitalize())+'</div></article>'
body+='</div></section><section id="lecciones" class="study-lesson"><h2 data-rf-role="section-title">Las 16 lecciones</h2><div class="study-grid">'
old_ids={'reglamento':'reglamento','electricidad':'electricidad','alterna':'alterna','componentes':'semiconductores','receptores':'receptores','antenas':'antenas','propagacion':'propagacion','mediciones':'mediciones'}
for i,l in enumerate(LESSONS):
 anchor=next((a for a,b in old_ids.items() if b==l['id']), 'modulo-'+l['id'])
 body+='<article class="study-card" id="'+anchor+'"><p class="eyebrow" data-rf-role="eyebrow">Lección '+str(i+1)+'</p><h3 data-rf-role="card-title">'+link(module_data[l['id']]['url'],l['title'])+'</h3>'+p(e(l['intro']))+link(module_data[l['id']]['url'],'Estudiar esta lección')+'</article>'
body+='</div></section><section class="study-lesson" id="fuentes"><h2 data-rf-role="section-title">Cómo aprovechar el material</h2><ol><li data-rf-role="body">Lee la explicación y sigue el esquema.</li><li data-rf-role="body">Resuelve el ejemplo por tu cuenta y comprueba las unidades.</li><li data-rf-role="body">Intenta la autoevaluación antes de abrir su respuesta.</li><li data-rf-role="body">Consulta las preguntas oficiales de tu categoría dentro de la lección.</li><li data-rf-role="body">Practica por tema y termina con un simulacro de tu categoría.</li></ol>'+p('El banco contiene 708 preguntas transcritas de los apéndices A–E. Algunas presentan claves contradictorias, datos ambiguos o alternativas duplicadas: se conservan para consulta, se explican sus incidencias y no se usan para calificar. Este curso es apoyo de estudio de RUFCOM; la licencia y el resultado oficial los determina SUBTEL.')+p('Los PDF siguen disponibles como referencia documental, pero las lecciones, ejemplos y preguntas se pueden estudiar aquí. '+link('estudiar-radioaficion.html#material-oficial','Ver las fuentes oficiales')+'.')+'</section>'
body=body.replace('Guía de estudio de radioafición','Material de estudio por categoría de licencia').replace('<h1 data-rf-role="page-title">Material de estudio de radioafición</h1>','<h1 data-rf-role="page-title">Material de estudio por categoría de licencia</h1>')
for cat,ids in ROUTES.items():
 body=re.sub(r'(<article id="ruta-'+cat+r'".*?<details>).*?</details>',lambda m:m[1].split('<details>')[0],body,flags=re.S)
 body=body.replace(link(module_data[ids[0]]['url']+'?categoria='+cat,'Comenzar a estudiar',True),link('estudiar-'+cat+'.html','Estudiar '+cat.capitalize(),True))
for cat,prefix in PREFIXES.items():
 body=body.replace('<h3 data-rf-role="card-title">'+cat.capitalize()+'</h3>','<h3 data-rf-role="card-title">'+cat.capitalize()+' · '+prefix+'</h3>')
page('materias-radioaficion.html','Material de estudio de radioafición: curso por categorías','Estudia radioafición en RUFCOM: 16 lecciones con esquemas, ejemplos resueltos, preguntas oficiales SUBTEL y práctica para Aspirante, Novicio, General y Superior.',body)

for cat,ids in ROUTES.items():
 name='estudiar-'+cat+'.html';cname=cat.capitalize();appendix={'aspirante':'B','novicio':'C','general':'D','superior':'E'}[cat]
 body='<nav class="study-breadcrumb" aria-label="Ruta de estudio">'+link('materias-radioaficion.html','Elegir otra categoría')+'</nav><p class="eyebrow" data-rf-role="eyebrow">Material de estudio · '+cname+'</p><h1 data-rf-role="page-title">Estudia para tu licencia '+cname+'</h1>'
 body+=p({'aspirante':'Comienza desde cero: aprende los conceptos, sigue los ejemplos sencillos y practica las preguntas de Aspirante. En cada lección, la indicación de categoría te ayuda a distinguir la base de la profundización.','novicio':'Consolida lo aprendido como Aspirante y avanza hacia los circuitos, equipos y operación de Novicio. Las preguntas y los ejercicios de práctica se abren en tu categoría.','general':'Prepara el cambio a General con cálculo de circuitos, electrónica, equipos, mediciones y operación práctica. Trabaja cada esquema antes de consultar la clave.','superior':'Refuerza tu preparación para Superior con cálculos, análisis de bloques y diagnóstico. Además del examen, revisa los requisitos de antigüedad y actuación destacada.'}[cat])
 body+='<div class="study-actions">'+link(module_data[ids[0]]['url']+'?categoria='+cat,'Comenzar mi recorrido',True)+link('practicar-examen.html?categoria='+cat,'Practicar examen '+cname,True)+link('estudiar-radioaficion.html#ruta-'+cat,'Requisitos de la licencia')+'</div>'
 body+='<section class="study-lesson"><h2 data-rf-role="section-title">Tu recorrido de estudio</h2>'+p('Avanza en este orden. Cada lección reúne explicación, esquema, ejemplos y autoevaluación, y al final muestra las preguntas oficiales de tu categoría. Puedes repetir un tema antes de continuar.')+'<ol class="course-route-list">'
 for id in ids:
  l=next(x for x in LESSONS if x['id']==id)
  body+='<li data-rf-role="body"><article class="study-card"><h3 data-rf-role="card-title">'+link(module_data[id]['url']+'?categoria='+cat,l['title'])+'</h3>'+p(e(l['intro']))+link(module_data[id]['url']+'?categoria='+cat,'Estudiar esta lección')+'</article></li>'
 body+='</ol></section><section class="study-lesson"><h2 data-rf-role="section-title">Del estudio a la práctica</h2>'+p('El material reglamentario del Apéndice A es común a todas las categorías. La parte técnica de '+cname+' corresponde al Apéndice '+appendix+'. El simulacro mezcla ambas áreas con el formato y los pesos de tu licencia. Si un tema te cuesta, vuelve a la lección y practica una tanda corta.')+'<div class="study-actions">'+link('practicar-examen.html?categoria='+cat,'Preparar mi práctica',True)+link('estudiar-radioaficion.html#material-oficial','Fuentes oficiales')+'</div></section>'
 page(name,'Material de estudio para licencia '+cname,'Prepara la licencia '+cname+' con un recorrido de lecciones, esquemas, ejemplos y preguntas oficiales SUBTEL. Estudia y practica en RUFCOM.',body)

# Mensaje de Rufis al terminar, con el activo original, sin usar un sello de equipos.
quiz=read(SITE/'practicar-examen.html')
rufis='<aside id="quiz-rufis" class="quiz-rufis study-card" aria-labelledby="quiz-rufis-title"><img src="assets/images/rufis-guia-radio.webp" alt="Rufis te acompaña en tu estudio" width="384" height="405"><div><p class="eyebrow" data-rf-role="eyebrow">Rufis te acompaña</p><h3 id="quiz-rufis-title" data-rf-role="card-title"></h3><p id="quiz-rufis-message" data-rf-role="body"></p><div id="quiz-rufis-study"><p data-rf-role="body">Para tu próximo intento, repasa:</p><ul id="quiz-rufis-topics"></ul></div></div></aside>'
if 'id="quiz-rufis"' not in quiz:quiz=quiz.replace('<div id="quiz-result-scores"></div>',rufis+'<div id="quiz-result-scores"></div>')
for f in [SITE/'estudiar-radioaficion.html',SITE/'practicar-examen.html']:
 text=quiz if f.name=='practicar-examen.html' else read(f)
 if f.name=='practicar-examen.html':
  enabled=sum(not q.get('excluded') for q in bank)
  text=re.sub(r'\d+ preguntas oficiales disponibles para practicar',str(enabled)+' preguntas oficiales disponibles para practicar',text)
  text=re.sub(r'<p class="source-note" data-rf-role="note">(?:Dos preguntas no se seleccionan|De los 708 enunciados originales,).*?</p>', '<p class="source-note" data-rf-role="note">De los 708 enunciados originales, '+str(708-enabled)+' quedan fuera de la práctica calificada por alternativas duplicadas, claves contradictorias o datos ambiguos. Las incidencias se explican junto a cada pregunta en las lecciones. Se conservan las claves publicadas como referencia documental.</p>',text)
  text=text.replace('source-note source-note','source-note')
  text=text.replace('guía de conceptos y ejemplos','material de estudio por categoría')
  text=text.replace('y completa el estudio con los apéndices oficiales.','con esquemas, ejemplos y preguntas oficiales dentro de RUFCOM.')
 if f.name=='estudiar-radioaficion.html':
  for cat in ROUTES:text=text.replace('materias-radioaficion.html#ruta-'+cat,'estudiar-'+cat+'.html')
  text=text.replace('Abrir guía de estudio','Material de estudio por categoría')
 text=re.sub(r'(estudio(?:-modelo|-banco|-curso(?:-ui)?)?\.(?:css|js))\?v=[^"\s]+',r'\1?v='+VERSION,text)
 if 'src="assets/js/estudio-curso.js' not in text:text=text.replace('<script src="assets/js/estudio-modelo.js',f'<script src="assets/js/estudio-curso.js?v={VERSION}" defer></script><script src="assets/js/estudio-modelo.js')
 write(f,text)

# SEO editorial y sitemap, sin publicar ni solicitar indexación.
seo_path=ROOT/'scripts/seo_pages.json';seo=json.loads(read(seo_path))
for l in LESSONS:seo['estudio-'+l['id']+'.html']={'type':'Article','image':'assets/images/rufis-guia-radio.webp','modified':'2026-11-11T23:30:00-03:00'}
for cat in ROUTES:seo['estudiar-'+cat+'.html']={'type':'WebPage','image':'assets/images/rufis-guia-radio.webp'}
seo['materias-radioaficion.html']={'type':'WebPage','image':'assets/images/rufcom-logo-transparent-lossless.webp'}
write(seo_path,json.dumps(seo,ensure_ascii=False,indent=2)+'\n')
sm=read(SITE/'sitemap.xml')
for filename in ['estudio-'+l['id']+'.html' for l in LESSONS]+['estudiar-'+cat+'.html' for cat in ROUTES]:
 url='https://rufcom.cl/'+filename
 if url not in sm:sm=sm.replace('</urlset>',f'  <url><loc>{url}</loc><lastmod>2026-11-11</lastmod></url>\n</urlset>')
write(SITE/'sitemap.xml',sm)
guides=read(SITE/'guias.html')
if 'id="curso-radioaficion"' not in guides:
 block='<section class="container section" id="curso-radioaficion"><h2 data-rf-role="section-title">Curso de radioafición</h2>'+p('Estudia por temas, consulta las preguntas oficiales y practica tu examen dentro de RUFCOM.')+'<details><summary data-rf-role="control">Ver las 16 lecciones del curso</summary><ul>'+''.join('<li data-rf-role="body">'+link(module_data[l['id']]['url'],l['title'])+'</li>' for l in LESSONS)+'</ul></details><div class="study-actions">'+link('materias-radioaficion.html','Elegir mi recorrido',True)+'</div></section>'
 guides=guides.replace('</main>',block+'</main>');write(SITE/'guias.html',guides)
coverage={l['id']:{'title':l['title'],'categories':module_data[l['id']]['route'],'questionIds':[q['id'] for q in bank if q['module']==l['id']]} for l in LESSONS}
write(ROOT/'docs/estudio-cobertura.json',json.dumps(coverage,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'lessons':len(LESSONS),'questions':len(bank),'enabled':sum(not q.get('excluded') for q in bank),'perModule':{id:len(v['questionIds']) for id,v in coverage.items()}},ensure_ascii=False))
