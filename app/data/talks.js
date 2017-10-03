// @flow

import moment from "moment";
import type { Schedule, ScheduleTalk, ScheduleTimeRange } from "../types";

const WORKSHOP_DAY: moment = moment("2017-09-06 15:00:00");

// function that calculates the time taken by every talk/workshop.
function getTime(day: moment, duration: number): ScheduleTimeRange {
  return {
    start: day.toDate(),
    end: day.add(duration, "minutes").toDate()
  };
}

let breakCount = 0;
function br() {
  return `break-${breakCount++}`;
}

const zaffaroniAndMihuraSummary = `Ing. Zaffaroni. Es egresado de la carrera de Ingeniería en Sistemas de Información de la UTN. Tiene más de 25 años de experiencia en el área de Gestión de Datos y de Sistemas OLTP. También es profesor adjunto de Gestión de Datos, de Diseño de Sistemas y Jefe de Cátedra de la materia Implementación de Bases de Datos NoSQL en la UTN FRBA. Es docente principal y director de la Diplomatura en Arquitecturas de Big Data Aplicadas dictada en la UTN FRBA. Se desempeña también como Auditor Técnico para la Ley de Promoción del Software contratado por la UBA para la Secretaría de Industria y Servicios perteneciente al Ministerio de la Producción.


       Ing. Mihura. Graduado de la UTN FRBA en la carrera de Ingeniería en Sistemas de Información, se dedica al desarrollo de sistemas especializándose en temas de Big Data en los últimos años. Es Socio y CTO en la empresa DBlandIT, una consultora con foco en desarrollos de soluciones NOSQL & BigData desde hace un año. Es docente de la materia "Implementación de bases de Datos no NOSQL" en la Universidad Tecnológica Nacional desde hace 2 años.Es docente en la Diplomatura en Arquitecturas de Big Data Aplicadas dictada en Extensión Universitaria de la UTN FRBA. Ha presentado papers y trabajos en diferentes congresos de Ingeniería en Sistemas e Informática sobre Big Data.
    `;
const data = {
  [br()]: {
    break: true,
    important: true,
    time: getTime(WORKSHOP_DAY, 0),
    title: "Talleres"
  },
  "unity-para-videojuegos": {
    summary: "El taller presentara como contenido teórico la siguiente temática: Una resumida descripción de la documentación de desarrollo de videojuegos, un resumen teórico de los componentes presentes en el desarrollo, y una presentación general de la herramienta a ser utilizada. Se propondrá que los alumnos desarrollen los tutoriales Numero 1 y Numero 2, expuestos en la documentación oficial de Unity.",
    title: "Unity para videojuegos",
    speaker: {
      name: "Diego Colussi, Lucas Galetti, Federico Sanches, Martin Galeano, David Tua.",
      summary: "Diego Colussi, Lucas Galetti, Federico Sanches y Martín Galeano, estudiantes avanzados de ingeniería en sistemas de información, junto al Ing. David Tua."
    },
    time: getTime(WORKSHOP_DAY, 0)
  },
  "internet-de-las-cosas": {
    summary: "El objetivo del taller es que los participantes puedan conocer de que se trata IoT, para qué se utiliza y dónde podemos implementarlo. A su vez, podrán construir un proyecto IoT y ver sus resultados utilizando la red WiFi de la universidad.",
    title: "Internet de las cosas",
    speaker: {
      name: "Neri Güidi",
      summary: "Estudiante avanzado de ingeniería en sistemas de información."
    },
    time: getTime(WORKSHOP_DAY, 0)
  },
  "neo4j": {
    summary: "Introducción a Bases de Datos NoSQL de Grafos - Neo4J.",
    title: "Neo4J (Base de datos orientada a grafos)",
    speaker: {
      name: "Juan Zaffaroni y Margin B. Mihura",
      summary: zaffaroniAndMihuraSummary
    },
    time: getTime(WORKSHOP_DAY, 0)
  },
  "deep-learning": {
    summary: "En este taller veremos una gentil introducción al mundo de Deep Learning desde Python con la ayuda de Lasagne, Numpy, Pandas y OpenCV de la mano de nuestras naves favoritas de Star Wars. Caminaremos por el pipeline, comenzando desde la adquisición de datos, su preparación, construcción de ConvNets, entrenamiento y evaluación, con el fin de clasificar distintos tipos de naves!",
    title: "Deep Learning",
    speaker: {
      name: "Celia Cintas",
      summary: "Doctoranda en Ciencias de la Computación (UNS), Becaria CONICET en IPCSH-CENPAT en el Grupo de Investigación Evolutiva Humana. Pythonista desde 2008. Co-organizadora de SciPyCon Argentina (Latam) [2013, 2014] y Patagonia Python Meetup. Feliz miembro de Linuxchix Argentina. Entusiasta del software libre. Profesora de Fundamentos Teóricos de la Informática (UNPSJB)."
    },
    time: getTime(WORKSHOP_DAY, 90)
  },
  "robotica-industrial": {
    summary: "El objetivo del taller es que el participante pueda interactuar con robots industriales y realizar una pequeña aplicación que permita integrar el robot industrial a traves de un kit de desarrollo de software con una aplicacion realizada en visual studio.",
    title: "Robótica Industrial - Interfaces de comunicación con sistema de visión artificial",
    speaker: {
      name: "José Brizuela",
      summary: "Ingeniero electrónico"
    },
    time: getTime(WORKSHOP_DAY, 60)
  },
  [br()]: {
    break: true,
    time: getTime(WORKSHOP_DAY, 30),
    title: "Acreditación"
  },
  [br()]: {
    break: true,
    important: true,
    time: getTime(WORKSHOP_DAY, 15),
    title: "Apertura del Workshop"
  },
  "gestion-bibliotecaria": {
    summary: "Desarrollo del sistema utilizado en la biblioteca de la facultad. Experiencias y mejoras realizadas en el laboratorio de sistemas (LSI). Partiendo de un sistema open source se realizaron multiples mejoras al sistema original y se agregaron nuevas caracteristicas como por ejemplo el lector de RFID.",
    title: "Sistema informático de gestión bibliotecaria UTN FRD",
    speaker: {
      name: "Bruno Sagaste y Bruno Fernandez",
      summary: "Estudiantes de ingeniería en sistemas de información."
    },
    time: getTime(WORKSHOP_DAY, 15)
  },
  "automatismos-electronica": {
    summary: "Desarrollos colectivos e integración de especialidades con pautas de trabajo en equipo. Simulación de salas de control y automatismo a distancia computarizados, para celdas de media tensión (M.T.). Sistemas orientados a la seguridad operativa.",
    title: "Automatismo y electrónica digital",
    speaker: {
      name: "Agustin Gambirassi y J. Mauro Scavuzzo",
      summary: "Agustin Gambirassi, estudiante de ingeniería en sistemas de información y J. Scavuzzo, ingeniero eléctrico."
    },
    time: getTime(WORKSHOP_DAY, 15)
  },
  "rust": {
    summary: "La omnipresencia de C/C++ en la industria nos hace pensar que el espacio de diseño en lenguajes de bajo nivel o de Systems Programming ha sido agotado. Lenguajes como Rust prueban que esto está muy lejos de la verdad. Rust es un lenguaje creado por Mozilla (creadores de Firefox) que intenta ser tan rápido como C/C++, mejorar la seguridad de memoria y asegurar estáticamente concurrencia segura. A todo esto se le suma una comunidad vibrante que mueve el proyecto con mucha virtud técnica e interpersonal.",
    title: "Rust: Una visión moderna en lenguajes de programación de bajo nivel",
    speaker: {
      name: "Francisco Guijarro",
      summary: `Ingeniero en Sistemas de Información (FRD).
      github.com/franleplant
      Desde hace 5 años, he trabajado en diversos proyectos web profesionalmente y mis proyectos de hobby van desde renderizar fractales hasta intentar escribir mi propia implementación de LISP (en progreso), pasando por generadores de parsers, instancias de algoritmos clásicos, entre otras cosas en diversos lenguajes de programación como C, Java, Javascript, Python, Rust, Go, entre otros.`
    },
    time: getTime(WORKSHOP_DAY, 15)
  },
  "unidades-testeo-semantico": {
    summary: "Se presentan las Unidades de Testeo Semántico, como un modelo de desarrollo basado en distintos tipos de pruebas sobre sistemas Web. Las mismas fueron desarrolladas como el trabajo de Maestría “Derivando ATDD Semántico de los Casos de Uso”, el cual fue aprobado en el año 2016. El trabajo fue desarrollado por el profesor Daniel Rubén Fernandez Iriart, quien ha emprendido el largo viaje. Expone el Ing. Tua David, ayudante de cátedra de Fernandez Iriart quien ha colaborado en el presente trabajo en el desarrollo del software y las pruebas Fit.",
    title: "Unidades de testeo semántico y casos de uso",
    speaker: {
      name: "David Tua",
      summary: "Ingeniero en Informática. Ayudante de Rubén Fernandez Iriart de las cátedras Proyecto Final UTN FRD (2014-2016), y Diseño de Sistemas UTN FRBA (2014-2015). Colaborador en la tesis del profesor Fernandez Iriart “Derivando ATDD Semántico de los Casos de Uso”. Actual Jefe de Trabajos Prácticos de Proyecto Final UTN FRD y ayudante de cátedra de Diseño de Sistemas UTN FRBA. Docente Investigador UTN FRD. Consultor en Sistemas."
    },
    time: getTime(WORKSHOP_DAY, 15)
  },
  "firmas-digitales": {
    summary: "En los últimos años empezaron a surgir aplicaciones de firma electrónica y digital de documentos digitales, fuertemente impulsado por la dinámica de trabajo que ofrece la interconexión de las personas por medio de Internet. Pero, detrás de todo eso, existe una infraestructura de firma (PKI - Public Key Infrastructure) que permite ofrecer ciertas garantías con respecto a la autenticidad, integridad, exclusividad, innegabilidad y validez de las firmas. Así, existen varios conceptos, métodos y tecnologías, incluso algunas definidas como estándares, que están involucradas; Con mayor interés en la criptografía y en la infraestructura de almacenamiento de certificados y firmas. Es por eso que durante la presentación se introducen algunos conceptos básicos, acompañado de un breve vistazo al marco legal en la Argentina, para después terminar con aspectos tecnológicos en donde aparecen “actores” como openssl, el cifrado asimétrico, algunos algoritmos criptográficos, la estructura de firma y Blockchain, como una posible solución a algunos problemas que irán apareciendo.",
    title: "Firmas digitales y electrónicas",
    speaker: {
      name: "Franco Soto",
      summary: "Estudiante Avanzado en Ing. en sistemas de información (FRD). Tengo 8 años de experiencia en el ámbito del desarrollo de software Web en diferentes proyectos, desempeñando diversas tareas. Actualmente, me encuentro trabajando en aplicaciones que implementen gestión documental con firmas electrónicas y digitales en Zetech S.A. Por otro lado, a nivel personal, me encuentro trabajando en mi proyecto final (un software para Presupuestos Participativos)."
    },
    time: getTime(WORKSHOP_DAY, 15)
  },
  "business-intelligence": {
    summary: "Desde mediados del año pasado se está dictando en la UTN Facultad Regional Delta el taller de “Inteligencia de Negocios aplicado a la gestión académica con Qlik Sense”. El docente, en su tesis de Maestría en Administración de Negocios, pudo comprobar que: “la información es el recurso clave para la toma de decisión”. En este contexto, el Business Intelligence en general y Qlik Sense en particular están brindando aportes muy valiosos para el análisis y visualización de datos para la toma de decisiones. El docente nos comentara y mostrara algunos resultados de la experiencia vivida junto a sus alumnos en el presente año.",
    title: "Aplicaciones de Business Intelligence para la gestión académica con Qlik Sense",
    speaker: {
      name: "Cecilio Tafarel y alumnos",
      summary: "Ingeniero en Sistemas de Información de la Universidad Tecnológica Nacional F.R. Concepción del Uruguay. En 1997 comenzó a trabajar en una empresa de la ciudad de Campana y así comenzó a relacionarse con nuestra zona. Entre 2004 y 2005 realizo la Especialización en Ingeniería Gerencial. Desde 2013 es docente de la materia Administración Gerencial de la Ingeniería en Sistemas de Información. En 2016 defendió y aprobó su tesis de Maestría en Administración de Negocios en nuestra facultad."
    },
    time: getTime(WORKSHOP_DAY, 15)
  },
  [br()]: {
    break: true,
    important: true,
    time: getTime(WORKSHOP_DAY, 15),
    title: "Break"
  },
  "informatica-lenguaje": {
    summary: "La informática, como cualquier actividad profesional, tiene su propio lenguaje. Pero esta actividad en particular ha logrado que gran parte de su terminología se haya expandido a otras áreas de la vida humana, incluso ha cambiado el significado que durante décadas, incluso siglos, han tenido algunos términos. Esto influye en la sociedad, ya que el lenguaje es la forma mediante el cual nos comunicamos los seres humanos. Los nuevos términos y la resignificación de otros, ¿es inocente?, ¿tiene vinculación con el orden social y económico vigente?, ¿Hay, acaso, una intencionalidad teleológica?",
    title: "Informática y lenguaje",
    speaker: {
      name: "Luis Perna",
      summary: "Ingeniero Electromecánico Orientación Electrónica, UBA, 1977. Profesor Titular Ordinario de “Arquitectura de Computadoras”, “Simulación” y “Teoría de Control” en la carrera de Ingeniería en Sistemas de Información de la Universidad Tecnológica Nacional, Facultad Regional Delta. Secretario Académico y Vicedecano de la UTN, FRD. Ex Director del Departamento de Ingeniería en Sistemas de Información, UTN, FRD. Ex Coordinador de la Red de Ingeniería en Informática/Sistemas de Información (RIISIC) de CONFEDI. Consultor en temas de Control Automático."
    },
    time: getTime(WORKSHOP_DAY, 20)
  },
  "bigdata-iot": {
    summary: "En la presentación se realizará una introducción a Big Data y su vinculación con Internet o Things. Se incluye una demo de un producto realizado.",
    title: "Introducción a Big Data e IoT ",
    speaker: {
      name: "Juan Zaffaroni y Margin B. Mihura",
      summary: zaffaroniAndMihuraSummary
    },
    time: getTime(WORKSHOP_DAY, 25),
  },
  "robotica-industrial-tendencias": {
    summary: "Se presentará una panorama del panorama actual de la utilización de robótica en la industria y las tendencias que se vislumbran.",
    title: "Robotica industrial y tendencias emergentes",
    speaker: {
      name: "José Brizuela",
      summary: 'Ingeniero electrónico, docente en UTN FRD en "Electrónica Aplicada" y "Laboratorio de Microcontroladores y DSP"'
    },
    time: getTime(WORKSHOP_DAY, 25)
  },
  "wollok-lenguaje": {
    summary: "Los cursos introductorios de programación suelen resultar extremadamente difíciles para los estudiantes y se encuentran entre los que tienen las menores tasas de aprobación. Algunos autores, asocian esta problemática con deficiencias en la preparación previa de los estudiantes. Sin embargo también existe amplia literatura que reconoce tanto una dificultad intrínseca a este tipo de cursos por la gran cantidad de conceptos abstractos que se deben incorporar en poco tiempo, como por las deficiencias propias de los lenguajes y otras herramientas utilizadas. Nuestro trabajo propone una metodología para la enseñanza de la programación, focalizada en la introducción al paradigma de objetos, pero basada en una visión integral del proceso formativo y de los sujetos del aprendizaje, así como en una perspectiva moderna del desarrollo de software. En la charla presentaremos brevemente nuestra propuesta pedagógica, así como las herramientas que le dan soporte. Entre esas herramientas se destaca Wollok, un lenguaje de programación y un entorno de desarrollo ajustados a las necesidades de un estudiante que está dando sus primeros pasos en la programación.",
    title: "Wollok: La experiencia de desarrollar un lenguaje de Programación",
    speaker: {
      name: "Nicolas Passerini",
      summary: "Nicolás Passerini es docente e investigador de la Universidad de Quilmes, y profesional del desarrollo de software desde hace 20 años. Como docente e investigador trabajó también en la UTN Facultad Regional Buenos Aires, en la Universidad de San Martín y en el Institut National de Recherche en Informatique, en Lille, Francia. Sus temas de investigación involucran la enseñanza de la programación, los sistemas de tipos y el diseño de herramientas que permitan optimizar la tarea del desarrollador de software."
    },
    time: getTime(WORKSHOP_DAY, 25)
  },
  "arena-ui": {
    summary: "En la charla veremos las características de Arena, un desarrollo hecho por docentes para la enseñanza de interfaces de usuario: el diseño de controles gráficos, vistas y sus modelos y el poderoso concepto de binding para modificar la forma en que el alumno se introduce a la interacción entre el usuario y el modelo de dominio. La charla mostrará dos ejemplos prácticos: un conversor de millas a kilómetros y una aplicación para una encuestadora de intención de voto.",
    title: "Arena, un framework de UI educativo y escalable",
    speaker: {
      name: "Fernando Dodino",
      summary: `Fernando Dodino - Uqbar Project.
      https://github.com/fdodino
      Desde hace 20 años soy docente en diferentes universidades (actualmente en UTN FRBA, UNSAM y UNQ), actividad compartida con el desarrollo de aplicaciones en el ámbito privado (desde el año 2000 en Telecom Argentina). Inquieto investigador, estoy participando de los proyectos Wollok (www.wollok.org), Arena (http://arena.uqbar-project.org/) y XTrest (https://github.com/uqbar-project/xtrest).`
    },
    time: getTime(WORKSHOP_DAY, 25)
  },
  [br()]: {
    break: true,
    important: true,
    time: getTime(WORKSHOP_DAY, 0),
    title: "Cierre - Sorteos"
  },
};

// Internal
function sortByStartTime(a, b) {
  const talkStartTime1 = moment(data[a].time.start);
  const talkStartTime2 = moment(data[b].time.start);

  return talkStartTime1.diff(talkStartTime2);
}

const list: Array<ScheduleTalk> = Object.keys(data)
  .sort(sortByStartTime)
  .map(k => Object.assign({}, data[k], { id: k }));

export function getIndexFromId(ID: string): number | null {
  const idx = list.map(t => t.id).indexOf(ID);

  if (idx === -1) {
    console.error("No talk found for ID", ID);
    return null;
  }

  return idx;
}

// Exposed functions

export function getNextTalkFromId(ID: string): ScheduleTalk | null {
  const idx = getIndexFromId(ID);
  if (idx === null) return null;

  // skip over breaks
  let search = idx + 1;
  let talk: ScheduleTalk = list[search];
  while (talk && talk.break)
    talk = list[++search];

  if (!talk) {
    return null;
  }

  return talk;
}

export function getPrevTalkFromId(ID: string): ScheduleTalk | null {
  const idx = getIndexFromId(ID);
  if (idx === null) return null;

  // skip over breaks
  let search = idx - 1;
  let talk = list[search];
  while (talk && talk.break)
    talk = list[--search];

  if (!talk) {
    return null;
  }

  return talk;
}

export default list;
