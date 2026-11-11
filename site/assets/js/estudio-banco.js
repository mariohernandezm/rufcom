// Preguntas originales de RUFCOM. Referencias oficiales revisadas el 11/11/2026.
const estudioBanco=[
 {
  "id": "R01",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "Una estación se ofrece para despachar pedidos de un negocio por radioafición. ¿Es compatible con la finalidad del servicio?",
  "options": [
   "No: el servicio es personal, experimental y sin fines de lucro",
   "Sí, si el negocio es pequeño",
   "Sí, si usa poca potencia",
   "Sí, si identifica la estación"
  ],
  "correct": 0,
  "explanation": "El servicio no sustituye una red comercial. Su finalidad es la intercomunicación y la experimentación personal sin fines de lucro.",
  "source": "DS 523, arts. 1 y 35"
 },
 {
  "id": "R02",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Qué organismo otorga la licencia de radioaficionado en Chile?",
  "options": [
   "La Subsecretaría de Telecomunicaciones",
   "El fabricante de la radio",
   "La municipalidad del domicilio",
   "El radio club más cercano"
  ],
  "correct": 0,
  "explanation": "La autorización corresponde a SUBTEL. Comprar equipos o asociarse a un club no equivale a obtener una licencia.",
  "source": "DS 523, art. 4"
 },
 {
  "id": "R03",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "Una discusión sube de tono en un contacto. ¿Qué conducta exige el reglamento?",
  "options": [
   "Mantener un trato digno y respetuoso",
   "Responder con insultos si la otra estación empezó",
   "Ocultar el indicativo para continuar",
   "Cambiar de frecuencia y seguir insultando"
  ],
  "correct": 0,
  "explanation": "La obligación de respeto se aplica a los comunicados nacionales e internacionales.",
  "source": "DS 523, art. 5"
 },
 {
  "id": "R04",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "Una licencia recién otorgada indica su vencimiento ordinario. ¿Cuál es su período reglamentario de vigencia?",
  "options": [
   "Cinco años, con posibilidad de renovación",
   "Un año sin renovación",
   "Dos años",
   "Permanente sin renovación"
  ],
  "correct": 0,
  "explanation": "La vigencia se cuenta desde el otorgamiento. La renovación tiene su propio procedimiento y plazos.",
  "source": "DS 523, arts. 6 y 17"
 },
 {
  "id": "R05",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "Un postulante menor de 18 años cumple la edad mínima de su categoría. ¿Qué debe considerar además?",
  "options": [
   "Actuar debidamente representado o autorizado",
   "Que la autorización del vendedor reemplaza la del representante",
   "Que solo los adultos pueden rendir cualquier categoría",
   "Que no necesita antecedentes adicionales por ser menor"
  ],
  "correct": 0,
  "explanation": "Las categorías que admiten menores contemplan representación o autorización conforme a las normas generales.",
  "source": "DS 523, arts. 10, 12 y 14"
 },
 {
  "id": "R06",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "Además de edad, antigüedad y examen, ¿qué exige el reglamento para Superior?",
  "options": [
   "Acreditar una actuación destacada como radioaficionado",
   "Comprar un amplificador de alta potencia",
   "Tener un equipo de una marca determinada",
   "Instalar una torre de altura mínima universal"
  ],
  "correct": 0,
  "explanation": "La categoría Superior contempla acreditar actuación destacada. La antigüedad por sí sola no basta.",
  "source": "DS 523, art. 8"
 },
 {
  "id": "R07",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿En qué caso puede reducirse de un año a seis meses la permanencia como Aspirante para postular a Novicio?",
  "options": [
   "Al acreditar un curso aprobado de un radio club reconocido por SUBTEL",
   "Al comprar dos radios",
   "Al escuchar un repetidor durante seis meses",
   "Al tener un identificador DMR"
  ],
  "correct": 0,
  "explanation": "La reducción depende de la formación acreditada prevista en el reglamento; no de una compra ni de un registro digital.",
  "source": "DS 523, art. 12"
 },
 {
  "id": "R08",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Qué permanencia mínima como Novicio se exige para postular a General?",
  "options": [
   "Tres años",
   "Seis meses",
   "Un año",
   "Cinco años"
  ],
  "correct": 0,
  "explanation": "General requiere al menos tres años como titular de licencia Novicio, además de los otros requisitos.",
  "source": "DS 523, art. 10"
 },
 {
  "id": "R09",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Qué permanencia mínima como General se exige para postular a Superior?",
  "options": [
   "Cinco años",
   "Un año",
   "Dos años",
   "Tres meses"
  ],
  "correct": 0,
  "explanation": "La permanencia mínima es de cinco años como General. También se exigen los demás antecedentes de la categoría.",
  "source": "DS 523, art. 8"
 },
 {
  "id": "R10",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "Una estación funciona en un domicilio determinado y registrado. ¿Qué tipo de estación describe ese uso?",
  "options": [
   "Fija",
   "Espacial",
   "Radiobaliza necesariamente",
   "Repetidora necesariamente"
  ],
  "correct": 0,
  "explanation": "La estación fija está destinada a operar en un lugar determinado. El reglamento regula también otros domicilios temporales registrados.",
  "source": "DS 523, art. 27"
 },
 {
  "id": "R11",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "Una estación va transportada por una persona y puede usarse en puntos no determinados. ¿Qué definición corresponde?",
  "options": [
   "Estación móvil",
   "Estación espacial",
   "Estación fija exclusivamente",
   "Centro de radiodifusión"
  ],
  "correct": 0,
  "explanation": "La definición de móvil incluye el equipo transportado por una persona y su uso en movimiento o detenido en puntos no determinados.",
  "source": "DS 523, art. 28"
 },
 {
  "id": "R12",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Qué caracteriza a una estación repetidora?",
  "options": [
   "Retransmite señales analógicas o digitales en tiempo real o casi real",
   "Solo almacena mensajes para entregarlos al día siguiente",
   "Nunca puede usar dos frecuencias",
   "Solo sirve para medir baterías"
  ],
  "correct": 0,
  "explanation": "La retransmisión puede realizarse en las mismas o diferentes frecuencias, según la configuración autorizada.",
  "source": "DS 523, art. 29"
 },
 {
  "id": "R13",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Qué documento debe estar disponible en la estación conforme al reglamento?",
  "options": [
   "El permiso que la ampara o su fotocopia autorizada",
   "Solo la boleta de compra",
   "Solo una credencial del radio club",
   "Una foto de la antena"
  ],
  "correct": 0,
  "explanation": "El permiso de la estación no se sustituye por una factura ni por una afiliación.",
  "source": "DS 523, art. 34"
 },
 {
  "id": "R14",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Se permite recibir una recompensa material por cursar un mensaje de emergencia mediante el servicio de radioaficionados?",
  "options": [
   "No, tampoco para mensajes de emergencia",
   "Sí, si se cobra después",
   "Sí, si paga un tercero",
   "Sí, si el mensaje es internacional"
  ],
  "correct": 0,
  "explanation": "El reglamento prohíbe la recompensa material directa o indirecta, pagada o prometida, incluso en emergencias.",
  "source": "DS 523, art. 36"
 },
 {
  "id": "R15",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Puede usarse la estación de radioaficionado para emitir un programa de música?",
  "options": [
   "No",
   "Sí, si es música propia",
   "Sí, durante menos de quince minutos",
   "Sí, si el receptor no responde"
  ],
  "correct": 0,
  "explanation": "El reglamento prohíbe transmitir música mediante el servicio de radioaficionados.",
  "source": "DS 523, art. 36"
 },
 {
  "id": "R16",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Qué propósito de codificación prohíbe el reglamento en los comunicados, salvo sus excepciones de comando?",
  "options": [
   "Encubrir el significado del mensaje",
   "Corregir errores de transmisión sin ocultar el mensaje",
   "Identificar la estación en Morse",
   "Representar letras con el alfabeto fonético"
  ],
  "correct": 0,
  "explanation": "La prohibición se refiere a alterar o encubrir el significado. No equivale a prohibir todos los modos digitales.",
  "source": "DS 523, art. 36"
 },
 {
  "id": "R17",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "El titular presta su transmisor a otra persona. ¿Qué debe comprobar respecto de quien lo opera?",
  "options": [
   "Que sea titular de una licencia idónea",
   "Que conozca la marca del equipo",
   "Que tenga un teléfono móvil",
   "Que sea mayor de edad, aunque no tenga licencia"
  ],
  "correct": 0,
  "explanation": "El titular debe velar por que el transmisor sea operado por personas con una licencia apropiada.",
  "source": "DS 523, art. 37"
 },
 {
  "id": "R18",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Quién debe velar por la instalación y operación correctas de una estación?",
  "options": [
   "El titular del permiso, sin excluir responsabilidades de quien use mal el equipo",
   "Únicamente el vendedor",
   "Únicamente el fabricante",
   "Cualquier estación que la escuche"
  ],
  "correct": 0,
  "explanation": "La responsabilidad del titular no elimina la que pueda corresponder al usuario que hace un uso indebido.",
  "source": "DS 523, art. 39"
 },
 {
  "id": "R19",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Qué obligación existe frente a otros sistemas de telecomunicaciones autorizados?",
  "options": [
   "No generarles interferencias perjudiciales",
   "Interferir si la radio tiene licencia",
   "Usar siempre la máxima potencia",
   "Ignorar la interferencia si ocurre lejos"
  ],
  "correct": 0,
  "explanation": "Una licencia no autoriza a causar interferencias perjudiciales a otros servicios.",
  "source": "DS 523, art. 40"
 },
 {
  "id": "R20",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "La portadora está dentro de una banda autorizada, pero parte de la emisión sale del borde. ¿Es suficiente haber situado allí la portadora?",
  "options": [
   "No: toda la anchura de la emisión debe quedar dentro de los límites",
   "Sí, siempre",
   "Sí, si se transmite en voz",
   "Sí, si la potencia es baja"
  ],
  "correct": 0,
  "explanation": "Al elegir frecuencia y modo debe considerarse el ancho ocupado por la señal, no solo el número de la pantalla.",
  "source": "DS 523, art. 41"
 },
 {
  "id": "R21",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "En un comunicado largo, ¿cuándo debe identificarse la estación?",
  "options": [
   "Al comenzar, al terminar y con intervalos no mayores de quince minutos",
   "Solo al comprar el equipo",
   "Solo si lo pide el corresponsal",
   "Una vez por día"
  ],
  "correct": 0,
  "explanation": "El indicativo se anuncia completo. El intervalo de quince minutos no reemplaza la identificación de inicio y término.",
  "source": "DS 523, art. 44"
 },
 {
  "id": "R22",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "Una persona con licencia opera una estación ajena. ¿Cómo debe identificarse?",
  "options": [
   "Con el indicativo de la estación operada seguido de su propio indicativo",
   "Solo con el nombre del dueño",
   "Con un indicativo inventado para la visita",
   "Sin identificarse por ser una visita"
  ],
  "correct": 0,
  "explanation": "El reglamento distingue el indicativo de la estación y el del operador visitante.",
  "source": "DS 523, art. 45"
 },
 {
  "id": "R23",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Quién asigna el distintivo de llamada a una estación?",
  "options": [
   "SUBTEL, conforme a las normas aplicables",
   "La tienda de radios",
   "El operador por elección libre sin trámite",
   "El primer corresponsal que la escuche"
  ],
  "correct": 0,
  "explanation": "El indicativo es una identificación asignada oficialmente, no un apodo que pueda inventarse para transmitir.",
  "source": "DS 523, art. 43"
 },
 {
  "id": "R24",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Qué prefijo identifica normalmente la categoría Aspirante en el reglamento?",
  "options": [
   "CD",
   "CA",
   "CE",
   "XQ"
  ],
  "correct": 0,
  "explanation": "El reglamento relaciona CD con Aspirante, CA con Novicio, CE con General y XQ con Superior, con reglas adicionales para otros casos.",
  "source": "DS 523, art. 46"
 },
 {
  "id": "R25",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "Una radio admite frecuencias que exceden las facultades de la licencia. ¿Qué determina dónde puede transmitir su operador?",
  "options": [
   "Las autorizaciones aplicables a la licencia y la estación",
   "Todo el rango que deja seleccionar la radio",
   "La potencia máxima de la batería",
   "El tamaño de la antena"
  ],
  "correct": 0,
  "explanation": "La capacidad técnica del equipo no amplía las facultades reglamentarias del operador.",
  "source": "DS 523, arts. 4 y 41"
 },
 {
  "id": "R26",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Qué credenciales se usan para acceder al examen en el Sistema PER?",
  "options": [
   "El usuario y la contraseña del portal SUBTEL",
   "La contraseña del correo del radio club",
   "Solo ClaveÚnica, sin usuario del portal",
   "El número de serie de la radio"
  ],
  "correct": 0,
  "explanation": "La norma y la guía vigente remiten al usuario y contraseña registrados en el Portal de Trámites.",
  "source": "Resolución 2620/2023, arts. 3 y 5"
 },
 {
  "id": "R27",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿En qué mes debe presentarse la solicitud para un examen programado para diciembre?",
  "options": [
   "En noviembre, el mes calendario inmediatamente anterior",
   "En enero del año siguiente",
   "Solo el mismo día del examen",
   "En cualquier mes posterior al examen"
  ],
  "correct": 0,
  "explanation": "La solicitud debe presentarse en el mes anterior y acompañar los antecedentes exigidos.",
  "source": "Resolución 2620/2023, art. 4"
 },
 {
  "id": "R28",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Qué apéndice reúne las materias reglamentarias comunes a las cuatro categorías?",
  "options": [
   "A",
   "B",
   "D",
   "E"
  ],
  "correct": 0,
  "explanation": "El Apéndice A es común; B, C, D y E corresponden a las materias técnicas por categoría.",
  "source": "Resolución 2620/2023, art. 8"
 },
 {
  "id": "R29",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "Una persona prepara la técnica de General. ¿Qué apéndice específico debe usar?",
  "options": [
   "D",
   "B",
   "C",
   "A como único material técnico"
  ],
  "correct": 0,
  "explanation": "La correspondencia es B para Aspirante, C para Novicio, D para General y E para Superior.",
  "source": "Resolución 2620/2023, art. 8"
 },
 {
  "id": "R30",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "¿Cuánto dura el examen en línea según la norma vigente?",
  "options": [
   "45 minutos",
   "15 minutos",
   "Todo el día sin límite una vez iniciado",
   "Dos horas"
  ],
  "correct": 0,
  "explanation": "La ventana del día en que puede iniciarse no debe confundirse con los 45 minutos de duración.",
  "source": "Resolución 2620/2023, art. 5"
 },
 {
  "id": "R31",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "Un resultado supera 60% ponderado, pero la parte técnica queda en 40%. ¿Cumple el criterio normativo de aprobación?",
  "options": [
   "No: cada área debe alcanzar al menos 50%",
   "Sí: solo importa el promedio",
   "Sí: si la reglamentación fue perfecta",
   "Sí: si sobraba tiempo"
  ],
  "correct": 0,
  "explanation": "El mínimo ponderado de 60% se combina con un mínimo de 50% en cada área.",
  "source": "Resolución 2620/2023, art. 9"
 },
 {
  "id": "R32",
  "category": "todas",
  "topic": "reglamento",
  "lesson": "reglamento",
  "question": "Aprobar el cuestionario de RUFCOM, ¿habilita para transmitir?",
  "options": [
   "No: se necesita la autorización correspondiente de SUBTEL",
   "Sí, automáticamente",
   "Sí, durante un mes",
   "Sí, con el indicativo de otro usuario"
  ],
  "correct": 0,
  "explanation": "Este cuestionario es una herramienta de aprendizaje. No otorga una licencia ni reemplaza el examen oficial.",
  "source": "DS 523, art. 4"
 },
 {
  "id": "A01",
  "category": "aspirante",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "Una resistencia de 150 Ω se conecta a 12 V continuos. ¿Qué corriente circula idealmente?",
  "options": [
   "0,08 A",
   "0,8 A",
   "8 A",
   "1.800 A"
  ],
  "correct": 0,
  "explanation": "I = V/R = 12/150 = 0,08 A, equivalentes a 80 mA.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A02",
  "category": "aspirante",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "Una carga recibe 13,8 V y consume 2 A. ¿Qué potencia eléctrica recibe?",
  "options": [
   "27,6 W",
   "6,9 W",
   "15,8 W",
   "276 W"
  ],
  "correct": 0,
  "explanation": "Para corriente continua, P = V × I = 13,8 × 2 = 27,6 W.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A03",
  "category": "aspirante",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "Se conectan resistencias de 100 Ω y 220 Ω en serie. ¿Cuál es su resistencia equivalente?",
  "options": [
   "320 Ω",
   "120 Ω",
   "68,75 Ω",
   "22.000 Ω"
  ],
  "correct": 0,
  "explanation": "En serie se suman las resistencias: 100 + 220 = 320 Ω.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A04",
  "category": "aspirante",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "Dos resistencias iguales de 100 Ω se conectan en paralelo. ¿Cuál es la equivalente?",
  "options": [
   "50 Ω",
   "200 Ω",
   "100 Ω",
   "10.000 Ω"
  ],
  "correct": 0,
  "explanation": "Dos resistencias iguales en paralelo dan la mitad de una: 100/2 = 50 Ω.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A05",
  "category": "aspirante",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "¿Cómo se conecta un voltímetro para medir la tensión en una resistencia?",
  "options": [
   "En paralelo con ella",
   "En serie, abriendo el circuito",
   "En lugar del fusible",
   "Entre dos puntos del mismo cable ideal"
  ],
  "correct": 0,
  "explanation": "La tensión se mide entre los dos extremos del componente; por eso el voltímetro se conecta en paralelo.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A06",
  "category": "aspirante",
  "topic": "radio",
  "lesson": "mediciones",
  "question": "Antes de medir resistencia con un multímetro, ¿qué debes hacer?",
  "options": [
   "Desenergizar el circuito y comprobar que no queden cargas peligrosas",
   "Aumentar al máximo la tensión de la fuente",
   "Transmitir con la radio",
   "Poner el multímetro en medición de corriente alterna"
  ],
  "correct": 0,
  "explanation": "La resistencia se mide sin alimentación externa. Los condensadores pueden conservar carga incluso después de desconectar.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A07",
  "category": "aspirante",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "¿Cuántos ohmios son 4,7 kΩ?",
  "options": [
   "4.700 Ω",
   "47 Ω",
   "470 Ω",
   "0,0047 Ω"
  ],
  "correct": 0,
  "explanation": "El prefijo kilo multiplica por mil: 4,7 × 1.000 = 4.700.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A08",
  "category": "aspirante",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "Una corriente de 250 mA equivale a:",
  "options": [
   "0,25 A",
   "2,5 A",
   "25 A",
   "250 A"
  ],
  "correct": 0,
  "explanation": "Mili significa una milésima: 250 mA = 250/1.000 A.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A09",
  "category": "aspirante",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "¿Qué sucede con el sentido de una corriente alterna periódica?",
  "options": [
   "Cambia de sentido periódicamente",
   "Siempre se mantiene en un único sentido",
   "Desaparece por definición",
   "Solo existe dentro de una batería"
  ],
  "correct": 0,
  "explanation": "La corriente alterna invierte su sentido de manera periódica; una batería entrega tensión continua.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A10",
  "category": "aspirante",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "¿Qué elemento limita una sobrecorriente abriendo el circuito cuando se supera su condición de operación?",
  "options": [
   "Un fusible adecuado",
   "Una antena más larga",
   "Un micrófono",
   "Un altavoz"
  ],
  "correct": 0,
  "explanation": "El fusible protege frente a sobrecorrientes. Debe tener tipo y valor adecuados al circuito.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A11",
  "category": "aspirante",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Qué hace normalmente un diodo rectificador en una fuente?",
  "options": [
   "Favorece la conducción en un sentido y bloquea el contrario dentro de sus límites",
   "Amplifica cualquier señal sin alimentación",
   "Almacena energía como una batería",
   "Mantiene constante cualquier frecuencia"
  ],
  "correct": 0,
  "explanation": "La rectificación aprovecha la conducción asimétrica del diodo. Sus límites eléctricos siguen siendo importantes.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A12",
  "category": "aspirante",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Qué magnitud caracteriza principalmente a un condensador?",
  "options": [
   "La capacitancia, en faradios",
   "La resistencia, siempre en vatios",
   "La longitud, en hercios",
   "La potencia, siempre en amperios"
  ],
  "correct": 0,
  "explanation": "La capacitancia expresa la relación entre carga almacenada y tensión. Su unidad es el faradio.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A13",
  "category": "aspirante",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Dónde almacena energía idealmente una bobina recorrida por corriente?",
  "options": [
   "En su campo magnético",
   "En una reacción química obligatoria",
   "Solo en forma de sonido",
   "En el color del núcleo"
  ],
  "correct": 0,
  "explanation": "Un inductor almacena energía en el campo magnético asociado a su corriente.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A14",
  "category": "aspirante",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Cuál es una función habitual del transistor en una etapa de radio?",
  "options": [
   "Amplificar o conmutar una señal",
   "Transformar directamente cualquier antena en batería",
   "Medir la longitud de un cable",
   "Garantizar por sí solo una frecuencia libre"
  ],
  "correct": 0,
  "explanation": "Un transistor puede controlar una corriente mediante otra señal y funcionar como amplificador o interruptor.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A15",
  "category": "aspirante",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Qué hace un oscilador en un transmisor?",
  "options": [
   "Genera una señal periódica",
   "Mide la capacidad de la batería",
   "Elimina toda interferencia externa",
   "Sustituye la antena"
  ],
  "correct": 0,
  "explanation": "El oscilador produce una señal periódica que puede usarse como portadora o referencia de frecuencia.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A16",
  "category": "aspirante",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "En un circuito LC ideal en resonancia, las reactancias inductiva y capacitiva tienen:",
  "options": [
   "Igual magnitud y efectos opuestos",
   "Siempre valor cero por separado",
   "Siempre signo idéntico",
   "Unidades de vatios"
  ],
  "correct": 0,
  "explanation": "En resonancia, los efectos reactivos de L y C se compensan; cada reactancia puede ser distinta de cero.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A17",
  "category": "aspirante",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "En AM, ¿qué propiedad de la portadora cambia principalmente con la información?",
  "options": [
   "La amplitud",
   "La velocidad de la luz",
   "El tipo de conector",
   "La longitud física del micrófono"
  ],
  "correct": 0,
  "explanation": "AM significa modulación de amplitud. La envolvente sigue la información aplicada.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A18",
  "category": "aspirante",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "En FM, ¿qué propiedad de la portadora varía principalmente con la información?",
  "options": [
   "La frecuencia instantánea",
   "La masa del transmisor",
   "La impedancia del fusible",
   "La polaridad de la batería"
  ],
  "correct": 0,
  "explanation": "La modulación de frecuencia representa la información mediante variaciones de la frecuencia instantánea.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A19",
  "category": "aspirante",
  "topic": "radio",
  "lesson": "antenas",
  "question": "Con c ≈ 300 millones de m/s, ¿qué longitud de onda corresponde a 150 MHz en el espacio libre?",
  "options": [
   "2 m",
   "20 m",
   "0,2 m",
   "150 m"
  ],
  "correct": 0,
  "explanation": "λ = 300/f con f en MHz. Para 150 MHz resulta 300/150 = 2 m.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A20",
  "category": "aspirante",
  "topic": "radio",
  "lesson": "antenas",
  "question": "Un dipolo ideal de media onda para λ = 4 m tiene una longitud eléctrica total de:",
  "options": [
   "2 m",
   "4 m",
   "8 m",
   "0,5 m"
  ],
  "correct": 0,
  "explanation": "La media onda es λ/2. La longitud física práctica puede requerir correcciones de construcción y entorno.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A21",
  "category": "aspirante",
  "topic": "radio",
  "lesson": "antenas",
  "question": "En un cable coaxial, ¿qué disposición tienen los conductores?",
  "options": [
   "Un conductor central rodeado por un conductor exterior",
   "Dos hilos necesariamente separados al aire",
   "Cuatro conductores idénticos sin pantalla",
   "Un único conductor sin retorno"
  ],
  "correct": 0,
  "explanation": "El coaxial mantiene un conductor interior, un dieléctrico y un conductor exterior concéntrico.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A22",
  "category": "aspirante",
  "topic": "radio",
  "lesson": "antenas",
  "question": "¿Qué describe la polarización de una onda de radio?",
  "options": [
   "La orientación de su campo eléctrico",
   "El color de la antena",
   "La polaridad de la fuente del receptor",
   "La capacidad de la batería"
  ],
  "correct": 0,
  "explanation": "Para antenas lineales, la orientación del campo eléctrico define la polarización horizontal o vertical.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A23",
  "category": "aspirante",
  "topic": "radio",
  "lesson": "propagacion",
  "question": "¿Qué parte de la atmósfera interviene de forma importante en muchos enlaces de HF a larga distancia?",
  "options": [
   "La ionosfera",
   "Solo la capa de nubes bajas",
   "El suelo de la estación",
   "El interior del coaxial"
  ],
  "correct": 0,
  "explanation": "Las regiones ionizadas pueden refractar ondas de HF y permitir trayectos más allá del horizonte.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A24",
  "category": "aspirante",
  "topic": "radio",
  "lesson": "propagacion",
  "question": "La intensidad de una señal recibida sube y baja sin tocar el volumen. ¿Cómo se llama este fenómeno?",
  "options": [
   "Desvanecimiento o fading",
   "Rectificación",
   "Carga de batería",
   "Polarización inversa de un diodo"
  ],
  "correct": 0,
  "explanation": "El fading es una variación de la señal recibida asociada a las condiciones de propagación o interferencia entre trayectos.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A25",
  "category": "aspirante",
  "topic": "radio",
  "lesson": "propagacion",
  "question": "¿Para qué sirve usar el alfabeto fonético al comunicar un indicativo?",
  "options": [
   "Para distinguir letras con menos ambigüedad",
   "Para ocultar el mensaje",
   "Para aumentar la potencia del transmisor",
   "Para cambiar de categoría"
  ],
  "correct": 0,
  "explanation": "Las palabras fonéticas ayudan a reconocer las letras cuando hay ruido o pronunciaciones diferentes.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A26",
  "category": "aspirante",
  "topic": "radio",
  "lesson": "propagacion",
  "question": "Antes de comenzar una llamada en una frecuencia, ¿qué conducta facilita una operación ordenada?",
  "options": [
   "Escuchar y comprobar que no se interrumpe un comunicado",
   "Transmitir inmediatamente con máxima potencia",
   "Mantener el PTT pulsado sin hablar",
   "Cambiar el indicativo"
  ],
  "correct": 0,
  "explanation": "Escuchar primero permite advertir actividad y evitar interrupciones. También se comprueba que la operación esté autorizada.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A27",
  "category": "aspirante",
  "topic": "radio",
  "lesson": "mediciones",
  "question": "¿Con qué unidad se expresa la frecuencia?",
  "options": [
   "Hercio, Hz",
   "Voltio, V",
   "Amperio, A",
   "Vatio, W"
  ],
  "correct": 0,
  "explanation": "Un hercio equivale a un ciclo por segundo.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "A28",
  "category": "aspirante",
  "topic": "radio",
  "lesson": "antenas",
  "question": "¿Qué función distingue normalmente a una Yagi frente a un dipolo aislado?",
  "options": [
   "Concentrar la radiación en una dirección preferente",
   "Almacenar energía química",
   "Convertir corriente alterna en continua",
   "Eliminar la necesidad de una línea de transmisión"
  ],
  "correct": 0,
  "explanation": "Sus elementos excitado y parásitos crean un patrón directivo. La orientación influye en el enlace.",
  "source": "Apéndice B, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N01",
  "category": "novicio",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "Dos resistencias de 30 Ω y 60 Ω se conectan en paralelo. ¿Cuál es su equivalente?",
  "options": [
   "20 Ω",
   "90 Ω",
   "30 Ω",
   "45 Ω"
  ],
  "correct": 0,
  "explanation": "R = R1 × R2/(R1 + R2) = 30 × 60/90 = 20 Ω.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N02",
  "category": "novicio",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "Entran 2 A y 0,5 A a un nodo sin acumulación de carga. ¿Qué corriente total debe salir?",
  "options": [
   "2,5 A",
   "1,5 A",
   "1 A",
   "0,25 A"
  ],
  "correct": 0,
  "explanation": "La ley de corrientes de Kirchhoff iguala la suma de corrientes entrantes y salientes.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N03",
  "category": "novicio",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "Una fuente de 12 V alimenta dos resistencias en serie. En una caen 5 V. ¿Cuánto cae en la otra idealmente?",
  "options": [
   "7 V",
   "17 V",
   "5 V",
   "60 V"
  ],
  "correct": 0,
  "explanation": "La suma de caídas en la malla es igual a la tensión de la fuente: 12 − 5 = 7 V.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N04",
  "category": "novicio",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "Al duplicar la frecuencia sin cambiar la inductancia, ¿qué ocurre con la reactancia inductiva?",
  "options": [
   "Se duplica",
   "Se reduce a la mitad",
   "No cambia",
   "Se vuelve necesariamente cero"
  ],
  "correct": 0,
  "explanation": "XL = 2πfL. Para L constante, XL crece en proporción a f.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N05",
  "category": "novicio",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "Al duplicar la frecuencia sin cambiar la capacitancia, ¿qué ocurre con la reactancia capacitiva?",
  "options": [
   "Se reduce a la mitad",
   "Se duplica",
   "No cambia",
   "Se vuelve negativa en magnitud"
  ],
  "correct": 0,
  "explanation": "XC = 1/(2πfC). Para C constante, su magnitud es inversamente proporcional a f.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N06",
  "category": "novicio",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "¿Cuál es aproximadamente la reactancia de una bobina de 10 µH a 1 MHz?",
  "options": [
   "62,8 Ω",
   "6,28 Ω",
   "628 Ω",
   "0,628 Ω"
  ],
  "correct": 0,
  "explanation": "XL = 2π × 1.000.000 × 10 × 10⁻⁶ ≈ 62,8 Ω.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N07",
  "category": "novicio",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "Un transformador ideal tiene 1.000 espiras primarias y 100 secundarias. Con 120 V alternos en el primario entrega:",
  "options": [
   "12 V alternos",
   "1.200 V alternos",
   "120 V continuos",
   "0,12 V alternos"
  ],
  "correct": 0,
  "explanation": "Vs/Vp = Ns/Np = 100/1.000. Por tanto Vs = 12 V, en el modelo ideal.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N08",
  "category": "novicio",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "En un transformador ideal que reduce la tensión a la mitad, con igual potencia transferida, la corriente secundaria es:",
  "options": [
   "El doble de la corriente primaria",
   "La mitad de la primaria",
   "Igual a cero",
   "Cuatro veces menor"
  ],
  "correct": 0,
  "explanation": "En el modelo sin pérdidas, VpIp = VsIs. Al reducir la tensión a la mitad, la corriente disponible se duplica.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N09",
  "category": "novicio",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "¿Por qué un transformador convencional no trabaja normalmente con continua estable aplicada al primario?",
  "options": [
   "Porque necesita flujo magnético variable para inducir tensión y la continua puede sobrecalentarlo",
   "Porque toda bobina bloquea cualquier corriente",
   "Porque la continua siempre tiene frecuencia infinita",
   "Porque el secundario necesita una antena"
  ],
  "correct": 0,
  "explanation": "La inducción requiere variación de flujo. La continua estable no produce el funcionamiento previsto de un transformador de alterna.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N10",
  "category": "novicio",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Cómo se usa normalmente un diodo Zener como referencia de tensión?",
  "options": [
   "Polarizado en inversa en su región de ruptura y con limitación de corriente",
   "En cortocircuito sin resistencia ni limitación",
   "Como antena de media onda",
   "Solo con polarización directa y sin carga"
  ],
  "correct": 0,
  "explanation": "La regulación aprovecha la tensión de ruptura especificada. Es indispensable limitar corriente y respetar potencia.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N11",
  "category": "novicio",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "Un transistor tiene IC = 20 mA e IB = 0,2 mA. ¿Cuál es su ganancia de corriente β en ese punto?",
  "options": [
   "100",
   "10",
   "0,01",
   "20,2"
  ],
  "correct": 0,
  "explanation": "β = IC/IB = 20/0,2 = 100. Es una relación de corrientes en el punto de operación.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N12",
  "category": "novicio",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "En una etapa de emisor común básica, la señal de tensión de salida suele estar:",
  "options": [
   "Invertida unos 180° respecto de la entrada",
   "Siempre en fase",
   "Desplazada necesariamente 90°",
   "Ausente por definición"
  ],
  "correct": 0,
  "explanation": "La configuración de emisor común invierte la señal de tensión dentro de su funcionamiento lineal habitual.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N13",
  "category": "novicio",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Qué característica del divisor de realimentación identifica a un oscilador Colpitts?",
  "options": [
   "Dos condensadores",
   "Dos baterías",
   "Dos fusibles",
   "Dos antenas"
  ],
  "correct": 0,
  "explanation": "El Colpitts utiliza un divisor capacitivo; el Hartley utiliza un divisor inductivo.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N14",
  "category": "novicio",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Qué ventaja habitual aporta un cristal de cuarzo a un oscilador?",
  "options": [
   "Una referencia de frecuencia más estable",
   "Potencia ilimitada",
   "Eliminación de toda emisión armónica",
   "Ganancia de antena sin límite"
  ],
  "correct": 0,
  "explanation": "El resonador de cuarzo ayuda a estabilizar la frecuencia. No sustituye el diseño y control de las otras etapas.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N15",
  "category": "novicio",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "¿Qué condición corresponde a la resonancia de un RLC serie ideal?",
  "options": [
   "XL y XC tienen igual magnitud",
   "La resistencia es infinita siempre",
   "La corriente es siempre cero",
   "No hay energía en L ni C"
  ],
  "correct": 0,
  "explanation": "La parte reactiva neta se anula y la impedancia queda resistiva en el modelo serie.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N16",
  "category": "novicio",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "Un filtro deja pasar bajas frecuencias y atenúa las altas. ¿Qué tipo es?",
  "options": [
   "Pasa bajos",
   "Pasa altos",
   "Elimina banda exclusivamente",
   "Oscilador de cristal"
  ],
  "correct": 0,
  "explanation": "La clasificación describe qué región del espectro atraviesa el filtro.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N17",
  "category": "novicio",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "En un receptor superheterodino, ¿para qué se mezclan la señal de RF y un oscilador local?",
  "options": [
   "Para obtener una frecuencia intermedia",
   "Para cargar la batería",
   "Para cambiar la categoría de licencia",
   "Para convertir el altavoz en antena"
  ],
  "correct": 0,
  "explanation": "La mezcla genera componentes de suma y diferencia; se selecciona la frecuencia intermedia para procesar la señal.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N18",
  "category": "novicio",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "Con RF de 7,1 MHz y oscilador local de 7,555 MHz, ¿qué frecuencia diferencia se obtiene?",
  "options": [
   "455 kHz",
   "14,655 MHz",
   "45,5 kHz",
   "7,555 kHz"
  ],
  "correct": 0,
  "explanation": "La diferencia es 7,555 − 7,1 = 0,455 MHz, es decir, 455 kHz.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N19",
  "category": "novicio",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "¿Qué mide la selectividad de un receptor?",
  "options": [
   "Su capacidad para separar señales próximas en frecuencia",
   "La capacidad de la batería",
   "La resistencia del micrófono",
   "La potencia que transmite"
  ],
  "correct": 0,
  "explanation": "Un receptor selectivo rechaza mejor las señales fuera de su banda de recepción útil.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N20",
  "category": "novicio",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "¿Qué mide principalmente la sensibilidad de un receptor?",
  "options": [
   "Su capacidad para recibir señales débiles bajo un criterio definido",
   "La máxima potencia de transmisión",
   "El número de canales guardados",
   "El volumen máximo del altavoz solamente"
  ],
  "correct": 0,
  "explanation": "La sensibilidad se especifica para condiciones concretas de señal, ruido, ancho de banda y calidad.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N21",
  "category": "novicio",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "En SSB ideal, ¿qué se transmite respecto de AM convencional?",
  "options": [
   "Una banda lateral, con portadora suprimida",
   "Dos portadoras sin bandas laterales",
   "Solo la portadora sin información",
   "Siempre ambas bandas laterales y portadora completa"
  ],
  "correct": 0,
  "explanation": "La banda lateral única reduce la ocupación espectral y evita transmitir la portadora completa del esquema AM convencional.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N22",
  "category": "novicio",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "¿Qué etapa recupera la información de una señal modulada?",
  "options": [
   "El demodulador o detector",
   "El fusible",
   "El cargador de batería",
   "El acoplador mecánico del micrófono"
  ],
  "correct": 0,
  "explanation": "Demodular consiste en recuperar la información que modificó la portadora.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N23",
  "category": "novicio",
  "topic": "radio",
  "lesson": "antenas",
  "question": "Una línea tiene potencia directa de 25 W y reflejada de 1 W. ¿La reflexión es nula?",
  "options": [
   "No; existe potencia reflejada",
   "Sí, porque 1 W es pequeño",
   "Sí, porque la línea es coaxial",
   "No puede saberse si hay reflexión aun con esas mediciones"
  ],
  "correct": 0,
  "explanation": "Una potencia reflejada distinta de cero evidencia reflexión; su causa requiere estudiar la carga y la línea.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N24",
  "category": "novicio",
  "topic": "radio",
  "lesson": "antenas",
  "question": "¿Por qué se tienen en cuenta las pérdidas del coaxial?",
  "options": [
   "Porque parte de la potencia se disipa antes de llegar a la carga",
   "Porque todo coaxial genera energía",
   "Porque determinan por sí solas el indicativo",
   "Porque hacen que toda antena sea omnidireccional"
  ],
  "correct": 0,
  "explanation": "Las pérdidas dependen, entre otras cosas, de frecuencia, longitud y características de la línea.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N25",
  "category": "novicio",
  "topic": "radio",
  "lesson": "propagacion",
  "question": "¿Qué conjunto de ajustes suele ser necesario para operar mediante un repetidor analógico?",
  "options": [
   "Frecuencias de recepción y transmisión, desplazamiento y tono si corresponde",
   "Solo el volumen del altavoz",
   "Solo la fecha del reloj",
   "Solo el nombre de la memoria"
  ],
  "correct": 0,
  "explanation": "El tono no reemplaza los ajustes de frecuencia y desplazamiento. Deben usarse los datos autorizados del repetidor.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N26",
  "category": "novicio",
  "topic": "radio",
  "lesson": "propagacion",
  "question": "Un tono CTCSS correcto, ¿convierte la conversación en privada o cifrada?",
  "options": [
   "No",
   "Sí, siempre",
   "Sí, si el tono es bajo",
   "Sí, si el equipo tiene pantalla"
  ],
  "correct": 0,
  "explanation": "El tono puede controlar la apertura de un receptor o repetidor; no cifra la voz transmitida.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N27",
  "category": "novicio",
  "topic": "radio",
  "lesson": "propagacion",
  "question": "¿Qué hace el temporizador de transmisión de una radio o repetidor?",
  "options": [
   "Limita la duración de una transmisión continua",
   "Aumenta la potencia después de un minuto",
   "Asigna un indicativo nuevo",
   "Cifra automáticamente el audio"
  ],
  "correct": 0,
  "explanation": "Un límite de tiempo reduce la posibilidad de mantener ocupado el canal por un PTT retenido.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "N28",
  "category": "novicio",
  "topic": "radio",
  "lesson": "mediciones",
  "question": "¿Qué representa un S-meter en el receptor?",
  "options": [
   "Una indicación de nivel de señal recibida",
   "Una medida directa de potencia de salida del transmisor",
   "La ROE de la antena en toda situación",
   "El consumo de batería en amperios"
  ],
  "correct": 0,
  "explanation": "La lectura depende de la calibración del receptor. Para medir potencia transmitida se necesita instrumental adecuado.",
  "source": "Apéndice C, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G01",
  "category": "general",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "Una resistencia de 20 Ω está en serie con dos resistencias de 60 Ω en paralelo. ¿Cuál es la equivalente total?",
  "options": [
   "50 Ω",
   "140 Ω",
   "40 Ω",
   "30 Ω"
  ],
  "correct": 0,
  "explanation": "El paralelo de dos resistencias de 60 Ω vale 30 Ω. Al sumar la serie de 20 Ω se obtienen 50 Ω.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G02",
  "category": "general",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "Si en un resonador LC se duplica C y se conserva L, su frecuencia ideal se multiplica por:",
  "options": [
   "1/√2",
   "2",
   "√2",
   "1/2"
  ],
  "correct": 0,
  "explanation": "f0 = 1/(2π√LC). Duplicar C divide la frecuencia por √2, no por dos.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G03",
  "category": "general",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "Un RLC serie tiene R = 30 Ω y reactancia neta de 40 Ω. ¿Cuál es la magnitud de su impedancia?",
  "options": [
   "50 Ω",
   "70 Ω",
   "10 Ω",
   "1.200 Ω"
  ],
  "correct": 0,
  "explanation": "La magnitud es √(R² + X²) = √(900 + 1.600) = 50 Ω.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G04",
  "category": "general",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "Un resonador tiene f0 = 10 MHz y ancho de banda de 100 kHz. ¿Cuál es Q usando Q = f0/BW?",
  "options": [
   "100",
   "10",
   "1.000",
   "0,01"
  ],
  "correct": 0,
  "explanation": "Primero se usan las mismas unidades: 10.000 kHz/100 kHz = 100.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G05",
  "category": "general",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "¿Cuál es el valor eficaz de una sinusoide de 20 V de pico?",
  "options": [
   "Aproximadamente 14,14 V",
   "20 V",
   "40 V",
   "10 V"
  ],
  "correct": 0,
  "explanation": "Para una sinusoide, Vrms = Vp/√2. Esta relación no se aplica a cualquier forma de onda.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G06",
  "category": "general",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "En un transformador real, ¿qué describe una pérdida en el cobre?",
  "options": [
   "El calentamiento resistivo de los devanados",
   "La potencia que crea el núcleo sin entrada",
   "El cambio del indicativo de la estación",
   "La reflexión ionosférica"
  ],
  "correct": 0,
  "explanation": "La resistencia de los conductores disipa potencia I²R. También existen pérdidas en el núcleo.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G07",
  "category": "general",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "Un triodo de vacío posee cátodo, ánodo y:",
  "options": [
   "Rejilla de control",
   "Dos bases semiconductoras",
   "Rotor mecánico",
   "Antena incorporada"
  ],
  "correct": 0,
  "explanation": "La rejilla controla el flujo electrónico entre cátodo y ánodo. No se trata de un transistor bipolar.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G08",
  "category": "general",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Qué elemento adicional distingue al tetrodo frente al triodo?",
  "options": [
   "Una rejilla pantalla",
   "Un segundo cátodo obligatorio",
   "Una batería interna",
   "Un condensador variable interno obligatorio"
  ],
  "correct": 0,
  "explanation": "El tetrodo incorpora una rejilla pantalla; el pentodo añade una rejilla supresora.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G09",
  "category": "general",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Cuándo entrega un 1 lógico una compuerta AND ideal de dos entradas?",
  "options": [
   "Cuando ambas entradas son 1",
   "Cuando cualquiera es 1",
   "Solo cuando ambas son 0",
   "Siempre que las entradas sean distintas"
  ],
  "correct": 0,
  "explanation": "La función AND exige simultáneamente el estado lógico alto de ambas entradas.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G10",
  "category": "general",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "En un amplificador operacional ideal con realimentación negativa y operación lineal, las tensiones de sus entradas son:",
  "options": [
   "Aproximadamente iguales",
   "Siempre cero respecto de tierra",
   "De polaridad contraria y magnitud infinita",
   "Independientes de la realimentación"
  ],
  "correct": 0,
  "explanation": "La gran ganancia de lazo abierto reduce la diferencia entre entradas cuando el circuito trabaja linealmente con realimentación negativa.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G11",
  "category": "general",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Qué significa polarizar una etapa amplificadora?",
  "options": [
   "Establecer su punto de operación en continua",
   "Cambiar la orientación de la antena únicamente",
   "Elegir una palabra fonética",
   "Medir solo su frecuencia de salida"
  ],
  "correct": 0,
  "explanation": "La polarización fija corrientes y tensiones de reposo para que la señal opere en la región prevista.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G12",
  "category": "general",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Qué función suele cumplir un buffer entre oscilador y amplificador de potencia?",
  "options": [
   "Reducir la influencia de la carga sobre el oscilador",
   "Multiplicar obligatoriamente por diez la frecuencia",
   "Eliminar toda pérdida de la fuente",
   "Convertir continua directamente en audio"
  ],
  "correct": 0,
  "explanation": "El buffer aísla etapas y ayuda a que las variaciones de carga perturben menos al oscilador.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G13",
  "category": "general",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "La fundamental de un transmisor es 7 MHz. ¿Dónde aparece su tercer armónico?",
  "options": [
   "21 MHz",
   "3,5 MHz",
   "10 MHz",
   "28 MHz"
  ],
  "correct": 0,
  "explanation": "El armónico de orden n está en n × f0. El tercero es 3 × 7 = 21 MHz.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G14",
  "category": "general",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "¿Qué puede producir sobreexcitar una etapa lineal de RF?",
  "options": [
   "Distorsión y emisiones no deseadas",
   "Solo aumentar la fidelidad",
   "Eliminar todos los armónicos",
   "Reducir siempre el ancho ocupado"
  ],
  "correct": 0,
  "explanation": "La saturación o recorte altera la forma de onda y puede ensanchar el espectro.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G15",
  "category": "general",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "En AM convencional con audio hasta 3 kHz, ¿qué ancho ideal ocupan sus dos bandas laterales?",
  "options": [
   "6 kHz",
   "3 kHz",
   "1,5 kHz",
   "300 kHz"
  ],
  "correct": 0,
  "explanation": "Cada lado de la portadora se extiende hasta la máxima frecuencia de audio: BW = 2 × 3 kHz.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G16",
  "category": "general",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "¿Qué significa mejorar la relación señal/ruido de un receptor?",
  "options": [
   "Aumentar la proporción de señal útil respecto del ruido",
   "Aumentar siempre señal y ruido por igual",
   "Cambiar únicamente el brillo de pantalla",
   "Reducir el volumen a cero"
  ],
  "correct": 0,
  "explanation": "La relación compara señal útil con ruido. Amplificar ambos por igual no la mejora por sí solo.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G17",
  "category": "general",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "Con RF deseada en 14 MHz y oscilador local en 14,455 MHz, ¿qué otra RF produce la misma FI de 455 kHz por diferencia?",
  "options": [
   "14,910 MHz",
   "13,545 MHz",
   "28 MHz",
   "455 MHz"
  ],
  "correct": 0,
  "explanation": "La imagen en este caso queda al otro lado del oscilador: 14,455 + 0,455 = 14,910 MHz.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G18",
  "category": "general",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "¿Qué bloque ayuda a atenuar la frecuencia imagen antes de mezclarla?",
  "options": [
   "El preselector de RF",
   "El altavoz después del audio",
   "El control de brillo",
   "La batería del micrófono"
  ],
  "correct": 0,
  "explanation": "Una vez que imagen y señal deseada se convierten en la misma FI, separarlas resulta difícil. Por eso se filtra antes de la mezcla.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G19",
  "category": "general",
  "topic": "radio",
  "lesson": "antenas",
  "question": "En una línea ideal sin pérdidas, una carga de 100 Ω sobre Z0 = 50 Ω presenta una ROE de:",
  "options": [
   "2:1",
   "1:1",
   "4:1",
   "0:1"
  ],
  "correct": 0,
  "explanation": "Para una carga puramente resistiva mayor que Z0, ROE = R/Z0 = 100/50 = 2.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G20",
  "category": "general",
  "topic": "radio",
  "lesson": "antenas",
  "question": "En una línea sin pérdidas, si la ROE es 3:1, ¿qué magnitud de coeficiente de reflexión corresponde?",
  "options": [
   "0,5",
   "0,25",
   "3",
   "1,5"
  ],
  "correct": 0,
  "explanation": "La magnitud de Γ = (ROE − 1)/(ROE + 1) = 2/4 = 0,5.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G21",
  "category": "general",
  "topic": "radio",
  "lesson": "antenas",
  "question": "Si la magnitud de Γ es 0,5, ¿qué fracción de potencia incidente se refleja en esa discontinuidad?",
  "options": [
   "25%",
   "50%",
   "75%",
   "5%"
  ],
  "correct": 0,
  "explanation": "La fracción reflejada es la magnitud de Γ al cuadrado: 0,5² = 0,25.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G22",
  "category": "general",
  "topic": "radio",
  "lesson": "antenas",
  "question": "Un tramo adaptado pierde 3 dB. Con 20 W de entrada entrega aproximadamente:",
  "options": [
   "10 W",
   "40 W",
   "17 W",
   "2 W"
  ],
  "correct": 0,
  "explanation": "Una pérdida de 3 dB equivale aproximadamente a dividir la potencia por dos.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G23",
  "category": "general",
  "topic": "radio",
  "lesson": "antenas",
  "question": "¿Qué logra un acoplador de antena visto desde el transmisor?",
  "options": [
   "Transformar la impedancia presentada hacia un valor adecuado",
   "Eliminar físicamente todas las pérdidas del coaxial",
   "Hacer resonante cualquier elemento en todos sus puntos",
   "Aumentar los límites de la licencia"
  ],
  "correct": 0,
  "explanation": "La adaptación de impedancias no convierte automáticamente toda la energía aplicada en potencia radiada.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G24",
  "category": "general",
  "topic": "radio",
  "lesson": "mediciones",
  "question": "¿Qué carga es apropiada para probar potencia de RF sin usar la antena?",
  "options": [
   "Una carga artificial de impedancia y disipación adecuadas",
   "Un resistor cualquiera sin revisar su potencia",
   "El altavoz de la radio",
   "Un circuito abierto"
  ],
  "correct": 0,
  "explanation": "La carga debe soportar frecuencia, impedancia y potencia del ensayo; no basta con que sea resistiva en continua.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G25",
  "category": "general",
  "topic": "radio",
  "lesson": "mediciones",
  "question": "¿Qué instrumento muestra la amplitud de componentes de una señal frente a la frecuencia?",
  "options": [
   "Un analizador de espectro",
   "Un ohmímetro básico",
   "Un amperímetro de continua únicamente",
   "Un reloj"
  ],
  "correct": 0,
  "explanation": "El analizador de espectro permite observar fundamental, armónicos y otras componentes, dentro de sus límites y protección de entrada.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G26",
  "category": "general",
  "topic": "radio",
  "lesson": "propagacion",
  "question": "¿Qué describe la zona de salto en una situación de propagación HF?",
  "options": [
   "Una región que puede quedar entre la cobertura de onda terrestre y el primer retorno ionosférico",
   "La longitud de la antena",
   "El interior de la batería",
   "Una frecuencia reservada a todas las estaciones"
  ],
  "correct": 0,
  "explanation": "La geometría y las condiciones ionosféricas pueden dejar una zona sin cobertura entre esos trayectos.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G27",
  "category": "general",
  "topic": "radio",
  "lesson": "propagacion",
  "question": "La sigla CW usada para telegrafía se refiere a:",
  "options": [
   "Una portadora continua que puede manipularse para formar Morse",
   "Una conversación de voz FM obligatoria",
   "Un tono CTCSS",
   "Una categoría de licencia"
  ],
  "correct": 0,
  "explanation": "En telegrafía se manipula la portadora para producir los elementos del código Morse.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "G28",
  "category": "general",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "¿Qué consecuencia suele tener un filtro de recepción innecesariamente ancho?",
  "options": [
   "Dejar pasar más ruido y señales no deseadas",
   "Eliminar toda distorsión",
   "Aumentar siempre la sensibilidad útil",
   "Cambiar la polarización de la antena"
  ],
  "correct": 0,
  "explanation": "Conviene ajustar el ancho al modo y a la información que se necesita recibir, sin recortar la señal útil.",
  "source": "Apéndice D, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S01",
  "category": "superior",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "En un RLC serie ideal en resonancia, la impedancia total es:",
  "options": [
   "La resistencia del circuito",
   "La suma aritmética de R, XL y XC",
   "Infinita en todo caso",
   "Cero aunque exista resistencia"
  ],
  "correct": 0,
  "explanation": "XL y XC se cancelan como términos reactivos. La resistencia permanece y limita la corriente.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S02",
  "category": "superior",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "Un tanque LC tiene f0 = 1 MHz. Si L se multiplica por cuatro y C no cambia, la nueva resonancia es:",
  "options": [
   "0,5 MHz",
   "4 MHz",
   "2 MHz",
   "0,25 MHz"
  ],
  "correct": 0,
  "explanation": "La frecuencia es inversamente proporcional a √L. Multiplicar L por cuatro divide f0 por dos.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S03",
  "category": "superior",
  "topic": "electricidad",
  "lesson": "electricidad",
  "question": "Una resistencia de 50 Ω disipa 200 W con corriente sinusoidal. ¿Cuál es la corriente eficaz?",
  "options": [
   "2 A",
   "4 A",
   "8 A",
   "0,5 A"
  ],
  "correct": 0,
  "explanation": "P = Irms²R. Por tanto Irms = √(200/50) = 2 A.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S04",
  "category": "superior",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "Para la corriente sinusoidal anterior de 2 A eficaces, ¿cuál es aproximadamente su valor de pico?",
  "options": [
   "2,83 A",
   "1,41 A",
   "2 A",
   "4 A"
  ],
  "correct": 0,
  "explanation": "Para una sinusoide, Ip = Irms × √2 ≈ 2,83 A.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S05",
  "category": "superior",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "Una fuente entrega 100 W reales con 125 VA aparentes. ¿Cuál es su factor de potencia?",
  "options": [
   "0,8",
   "1,25",
   "25",
   "0,2"
  ],
  "correct": 0,
  "explanation": "El factor de potencia es P/S = 100/125 = 0,8. No se expresa en vatios.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S06",
  "category": "superior",
  "topic": "electricidad",
  "lesson": "alterna",
  "question": "Un transformador ideal eleva 24 V a 120 V. ¿Qué relación Ns/Np necesita?",
  "options": [
   "5",
   "0,2",
   "96",
   "144"
  ],
  "correct": 0,
  "explanation": "Ns/Np = Vs/Vp = 120/24 = 5. Es un cálculo ideal, sin caídas ni pérdidas.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S07",
  "category": "superior",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "Una etapa consume 100 W de continua y entrega 60 W de RF útil. ¿Qué eficiencia tiene?",
  "options": [
   "60%",
   "40%",
   "160%",
   "6%"
  ],
  "correct": 0,
  "explanation": "η = P útil/P de entrada = 60/100. La diferencia se disipa o se pierde en otros mecanismos.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S08",
  "category": "superior",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Qué aporta normalmente la realimentación negativa bien diseñada a una etapa lineal?",
  "options": [
   "Menor distorsión y ganancia más controlada",
   "Ganancia y ancho de banda infinitos",
   "Oscilación obligatoria",
   "Eliminación de toda disipación"
  ],
  "correct": 0,
  "explanation": "La mejora exige margen de estabilidad y un diseño correcto. La realimentación no elimina las limitaciones físicas.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S09",
  "category": "superior",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "Un amplificador de tensión no inversor ideal usa Rf = 9 kΩ y Rg = 1 kΩ. ¿Qué ganancia tiene?",
  "options": [
   "10",
   "9",
   "0,1",
   "90"
  ],
  "correct": 0,
  "explanation": "La ganancia de esta configuración es 1 + Rf/Rg = 1 + 9 = 10, en su región lineal.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S10",
  "category": "superior",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Qué función booleana realiza una compuerta NAND de dos entradas?",
  "options": [
   "La negación de AND",
   "La suma analógica de dos tensiones",
   "Una multiplicación de frecuencias",
   "La negación exclusiva de una sola entrada"
  ],
  "correct": 0,
  "explanation": "La salida NAND vale 0 solo cuando ambas entradas son 1; en los otros casos vale 1.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S11",
  "category": "superior",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Qué función desempeña la rejilla supresora de un pentodo?",
  "options": [
   "Reducir efectos de la emisión secundaria desde el ánodo",
   "Convertir el cátodo en antena",
   "Generar la tensión de filamento",
   "Sustituir la rejilla de control en todos los casos"
  ],
  "correct": 0,
  "explanation": "La rejilla supresora ayuda a impedir que electrones secundarios alcancen la rejilla pantalla.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S12",
  "category": "superior",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "¿Qué se busca al neutralizar una etapa amplificadora de RF que lo requiere?",
  "options": [
   "Compensar realimentaciones parásitas que pueden hacerla oscilar",
   "Aumentar deliberadamente la realimentación inestable",
   "Anular toda corriente de alimentación",
   "Eliminar su frecuencia de trabajo"
  ],
  "correct": 0,
  "explanation": "Los acoplamientos no deseados entre entrada y salida pueden producir autooscilaciones. La neutralización forma parte del diseño de estabilidad.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S13",
  "category": "superior",
  "topic": "electronica",
  "lesson": "componentes",
  "question": "Un transistor disipa 12 W y el camino térmico total al ambiente es de 4 °C/W. ¿Qué elevación de temperatura idealizada resulta?",
  "options": [
   "48 °C",
   "3 °C",
   "16 °C",
   "0,33 °C"
  ],
  "correct": 0,
  "explanation": "La elevación se aproxima con ΔT = P × Rθ = 12 × 4 = 48 °C. Deben respetarse los límites térmicos reales del dispositivo.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S14",
  "category": "superior",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "Un amplificador entrega 4 W por 1 W de entrada. ¿Cuál es su ganancia de potencia aproximada?",
  "options": [
   "6 dB",
   "4 dB",
   "12 dB",
   "0,25 dB"
  ],
  "correct": 0,
  "explanation": "G = 10 log10(Psal/Pent) = 10 log10(4) ≈ 6,02 dB.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S15",
  "category": "superior",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "Dos etapas tienen ganancias de 10 dB y 6 dB; entre ellas hay 3 dB de pérdida. ¿Cuál es la ganancia total?",
  "options": [
   "13 dB",
   "19 dB",
   "7 dB",
   "180 dB"
  ],
  "correct": 0,
  "explanation": "Las ganancias y pérdidas expresadas en dB se suman algebraicamente: 10 − 3 + 6 = 13 dB.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S16",
  "category": "superior",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "Para FM con desviación pico de 5 kHz y audio máximo de 3 kHz, ¿qué ancho aproxima la regla de Carson?",
  "options": [
   "16 kHz",
   "8 kHz",
   "10 kHz",
   "3 kHz"
  ],
  "correct": 0,
  "explanation": "La aproximación es BW ≈ 2(Δf + fm) = 2(5 + 3) = 16 kHz. No sustituye una medición ni las condiciones de autorización.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S17",
  "category": "superior",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "En AM con índice de modulación mayor que uno, ¿qué problema aparece en la demodulación convencional por envolvente?",
  "options": [
   "Sobremodulación y distorsión",
   "Una portadora perfectamente invariable con audio intacto",
   "Supresión automática de ambas bandas laterales",
   "Mejora ilimitada de la fidelidad"
  ],
  "correct": 0,
  "explanation": "La envolvente cruza la condición de modulación completa y el detector de envolvente ya no recupera correctamente la señal original.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S18",
  "category": "superior",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "¿Qué distingue a un mezclador de una etapa amplificadora lineal ideal de una sola frecuencia?",
  "options": [
   "Genera nuevas componentes de suma y diferencia de frecuencias",
   "Solo cambia la amplitud sin producir otras componentes",
   "Solo mide corriente",
   "Debe tener una antena incorporada"
  ],
  "correct": 0,
  "explanation": "La conversión aprovecha una operación no lineal o equivalente de multiplicación entre señales.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S19",
  "category": "superior",
  "topic": "electronica",
  "lesson": "receptores",
  "question": "¿Por qué interesan el rango dinámico y la intermodulación de un receptor?",
  "options": [
   "Porque señales fuertes pueden crear productos que oculten señales débiles",
   "Porque indican cuántas memorias guarda",
   "Porque fijan la antigüedad de la licencia",
   "Porque sustituyen a la selectividad de antena"
  ],
  "correct": 0,
  "explanation": "La recepción real exige tratar simultáneamente señales de niveles diferentes sin generar respuestas espurias excesivas.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S20",
  "category": "superior",
  "topic": "radio",
  "lesson": "antenas",
  "question": "En una línea ideal, una ROE de 2:1 corresponde a una magnitud de Γ de aproximadamente:",
  "options": [
   "0,333",
   "0,5",
   "0,667",
   "2"
  ],
  "correct": 0,
  "explanation": "Γ = (2 − 1)/(2 + 1) = 1/3. La fracción de potencia reflejada es su cuadrado.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S21",
  "category": "superior",
  "topic": "radio",
  "lesson": "antenas",
  "question": "Si la magnitud de Γ es 1/3 en una discontinuidad ideal, la fracción reflejada es aproximadamente:",
  "options": [
   "11,1%",
   "33,3%",
   "66,7%",
   "3%"
  ],
  "correct": 0,
  "explanation": "La relación de potencias es (1/3)² = 1/9 ≈ 0,111. No se confunde con la relación de amplitudes.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S22",
  "category": "superior",
  "topic": "radio",
  "lesson": "antenas",
  "question": "En una línea sin pérdidas, una carga de 25 Ω conectada a Z0 = 50 Ω tiene una ROE de:",
  "options": [
   "2:1",
   "1:2 como valor de ROE menor que uno",
   "1:1",
   "4:1"
  ],
  "correct": 0,
  "explanation": "Para una carga resistiva menor que Z0, ROE = Z0/R = 50/25 = 2. La ROE se expresa como valor no menor que uno.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S23",
  "category": "superior",
  "topic": "radio",
  "lesson": "antenas",
  "question": "Una línea tiene factor de velocidad 0,66. A 30 MHz, ¿cuánto mide aproximadamente una media onda dentro de esa línea?",
  "options": [
   "3,3 m",
   "5 m",
   "6,6 m",
   "10 m"
  ],
  "correct": 0,
  "explanation": "En el espacio libre λ = 300/30 = 10 m. En la línea λ = 10 × 0,66 = 6,6 m; la mitad son 3,3 m.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S24",
  "category": "superior",
  "topic": "radio",
  "lesson": "antenas",
  "question": "Si dos antenas lineales ideales tienen polarizaciones ortogonales, ¿qué efecto se espera sobre el acoplamiento entre ellas?",
  "options": [
   "Una atenuación importante por desadaptación de polarización",
   "El doble exacto de potencia recibida",
   "Una ROE de cero en ambos transmisores",
   "La desaparición de todas las pérdidas del entorno"
  ],
  "correct": 0,
  "explanation": "La ortogonalidad puede reducir mucho el acoplamiento. Reflexiones y condiciones reales impiden asumir una atenuación infinita.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S25",
  "category": "superior",
  "topic": "radio",
  "lesson": "mediciones",
  "question": "Un transmisor entrega 100 W y el analizador admite 1 mW. ¿Qué atenuación ideal mínima iguala esos niveles, antes de añadir margen de seguridad?",
  "options": [
   "50 dB",
   "20 dB",
   "30 dB",
   "10 dB"
  ],
  "correct": 0,
  "explanation": "100 W/0,001 W = 100.000; 10 log10(100.000) = 50 dB. El ensayo real requiere atenuador y carga adecuados, margen y límites de pico.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S26",
  "category": "superior",
  "topic": "radio",
  "lesson": "mediciones",
  "question": "¿Qué permite medir un analizador vectorial de redes correctamente calibrado en una antena?",
  "options": [
   "La reflexión e impedancia en el plano de calibración",
   "La potencia máxima legal del operador",
   "La identidad de todos los corresponsales",
   "La eficiencia radiada absoluta de cualquier antena por sí sola"
  ],
  "correct": 0,
  "explanation": "La calibración define el plano de referencia. Una medida de adaptación no demuestra por sí sola eficiencia de radiación.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S27",
  "category": "superior",
  "topic": "radio",
  "lesson": "propagacion",
  "question": "¿Por qué una frecuencia HF adecuada al mediodía puede no funcionar igual de noche?",
  "options": [
   "Porque cambian las condiciones ionosféricas y los trayectos de propagación",
   "Porque el indicativo cambia cada noche",
   "Porque las antenas dejan de conducir después del atardecer",
   "Porque todas las bandas HF se cierran legalmente de noche"
  ],
  "correct": 0,
  "explanation": "La ionización y absorción varían con hora, actividad solar y otros factores. No existe una frecuencia óptima única permanente.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 },
 {
  "id": "S28",
  "category": "superior",
  "topic": "radio",
  "lesson": "propagacion",
  "question": "Dos trayectos de una misma señal llegan con fases distintas al receptor. ¿Qué pueden producir?",
  "options": [
   "Refuerzos y cancelaciones variables de la señal",
   "Solo un aumento constante de potencia",
   "Una nueva licencia de estación",
   "La eliminación completa del ruido térmico"
  ],
  "correct": 0,
  "explanation": "La suma de señales por varios trayectos puede generar desvanecimiento selectivo o cambios de intensidad.",
  "source": "Apéndice E, programa de materias técnicas. Desarrollo propio de RUFCOM."
 }
];
if(typeof module!=="undefined")module.exports=estudioBanco;
if(typeof window!=="undefined")window.estudioBanco=estudioBanco;
