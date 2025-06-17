// Módulo para manejar la funcionalidad de mapas y modales
const MapManager = {
  // Almacenar las instancias de los modales
  modalInstances: {},

  // Configuración de los mapas por ciudad
  mapConfig: {
    bsas: {
      id: 'mapaBsAs',
      areas: [
        {
          id: 'modalBsAsRopa',
          coords: '143,181,43',
          title: 'Ropa Ecológica - Buenos Aires',
          content: 'Prendas de algodón orgánico, textiles reciclados, calzado vegano y accesorios reutilizables'
        },
        {
          id: 'modalBsAsArtesanías',
          coords: '250,171,43',
          title: 'Artesanías sustentables - Buenos Aires',
          content: 'Objetos hechos a mano con materiales reciclados, madera recuperada, cerámica ecológica y papel artesanal'
        },
        {
          id: 'modalBsAsHuerta',
          coords: '353,158,42',
          title: 'Huerta urbana y jardinería ecológica - Buenos Aires',
          content: 'Plantas nativas, composteras, macetas biodegradables, kits para armar huertas en casa'
        },
        {
          id: 'modalBsAsEducacion',
          coords: '463,135,43',
          title: 'Educación ambiental - Buenos Aires',
          content: 'Material educativo, libros sobre ecología, juegos didácticos para niños y talleres informativos'
        },
        {
          id: 'modalBsAsReciclaje',
          coords: '673,329,40',
          title: 'Stand de reciclaje - Buenos Aires',
          content: 'Alimentos sin agrotóxicos, frutas y verduras de estación, cosmética natural y productos de higiene ecológica.'
        },
        {
          id: 'modalBsAsOrganicos',
          coords: '537,65,40',
          title: 'Productos orgánicos y naturales - Buenos Aires',
          content: 'Objetos hechos a mano con materiales reciclados, madera recuperada, cerámica ecológica y papel artesanal'
        },
        {
          id: 'modalBsTecnologia',
          coords: '493,471,42',
          title: 'Tecnología sustentable - Buenos Aires',
          content: 'Paneles solares, cargadores solares, lámparas LED ecológicas, gadgets de bajo consumo'
        },
        {
          id: 'modalBsAsMovilidad',
          coords: '376,509,42',
          title: 'Movilidad sostenible - Buenos Aires',
          content: 'Bicicletas recicladas, monopatines eléctricos, stands de educación vial ecológica'
        },
        {
          id: 'modalBsAsTaller',
          coords: '589,419,36',
          title: 'Taller de reciclaje creativo - Evento exclusivo de Buenos Aires',
          content: 'Todos los días a las 15:00hs. Una actividad práctica donde vas a poder aprender a transformar residuos en objetos útiles o decorativos. Ideal para todas las edades. Se utilizan materiales reciclados y herramientas seguras'
        },
        {
          id: 'modalBsAsShow',
          coords: '596,155,38',
          title: 'Show musical sustentable - Evento exclusivo de Buenos Aires',
          content: 'Todos los días a las 18:30hs. Un espectáculo al aire libre con bandas que promueven mensajes ecológicos. El sonido se alimenta con energía renovable. Se recomienda traer tu propio vaso o botella reutilizable'
        },
        {
          id: 'modalBsAsYoga',
          coords: '651,232,37',
          title: 'Clase de yoga ecológica - Evento exclusivo de Buenos Aires',
          content: 'Todos los días a las 17:00hs. Una sesión de yoga para reconectar con el cuerpo y la naturaleza, en un entorno verde, guiada por profesionales. Se utilizan elementos reciclables y biodegradables'
        },
      ]
    },
    cordoba: {
      id: 'mapaCordoba',
      areas: [
        {
          id: 'modalCordobaRopa',
          coords: '554,487,41',
          title: 'Ropa Ecológica - Cordoba',
          content: 'Prendas de algodón orgánico, textiles reciclados, calzado vegano y accesorios reutilizables'
        },
        {
          id: 'modalCordobaArtesanías',
          coords: '136,332,41',
          title: 'Artesanías sustentables - Cordoba',
          content: 'Objetos hechos a mano con materiales reciclados, madera recuperada, cerámica ecológica y papel artesanal'
        },
        {
          id: 'modalCordobaHuerta',
          coords: '171,229,41',
          title: 'Huerta urbana y jardinería ecológica - Cordoba',
          content: 'Plantas nativas, composteras, macetas biodegradables, kits para armar huertas en casa'
        },
        {
          id: 'modalCordobaEducacion',
          coords: '204,125,41',
          title: 'Educación ambiental - Cordoba',
          content: 'Material educativo, libros sobre ecología, juegos didácticos para niños y talleres informativos'
        },
        {
          id: 'modalCordobaReciclaje',
          coords: '579,140,41',
          title: 'Stand de reciclaje - Cordoba',
          content: 'Alimentos sin agrotóxicos, frutas y verduras de estación, cosmética natural y productos de higiene ecológica.'
        },
        {
          id: 'modalCordobaOrganicos',
          coords: '669,199,41',
          title: 'Productos orgánicos y naturales - Cordoba',
          content: 'Objetos hechos a mano con materiales reciclados, madera recuperada, cerámica ecológica y papel artesanal'
        },
        {
          id: 'modalCordobaTecnologia',
          coords: '706,302,41',
          title: 'Tecnología sustentable - Cordoba',
          content: 'Paneles solares, cargadores solares, lámparas LED ecológicas, gadgets de bajo consumo'
        },
        {
          id: 'modalCordobaMovilidad',
          coords: '683,437,41',
          title: 'Movilidad sostenible - Cordoba',
          content: 'Bicicletas recicladas, monopatines eléctricos, stands de educación vial ecológica'
        },
        {
          id: 'modalCordobaGym',
          coords: '290,66,41',
          title: 'Eco-gym al aire libre - Evento exclusivo de Cordoba',
          content: 'Todos los días a las 15:00hs.Clase abierta de ejercicios funcionales y estiramiento guiado por instructores, utilizando elementos reciclados como pesas y colchonetas ecológica'
        },
        {
          id: 'modalCordobaCocina',
          coords: '397,80,41',
          title: 'Cocina saludable en vivo - Evento exclusivo de Cordoba',
          content: 'Todos los días a las 17:00hs. Demostración de recetas con productos orgánicos y de estación. Tips para una alimentación consciente y sin desperdicio. Degustación al final de la actividad'
        },
        {
          id: 'modalCordobaTrivia',
          coords: '484,111,41',
          title: 'Trivia sustentable con premios ecológicos - Evento exclusivo de Cordoba',
          content: 'Todos los días a las 18:30 hs. Una competencia en equipo donde los visitantes responden preguntas sobre medio ambiente, reciclaje y sustentabilidad. Los ganadores se llevan productos ecológicos como bolsas reutilizables, botellas de acero y cuadernos reciclados. Ideal para aprender jugando'
        },
      ]
    },
    rosario: {
      id: 'mapaRosario',
      areas: [
        {
          id: 'modalRosarioHuerta',
          coords: '232,68,45',
          title: 'Huerta Urbana - Rosario',
          content: 'Plantas nativas, composteras, macetas biodegradables y kits para armar huertas en casa'
        },
        {
          id: 'modalRosarioRopa',
          coords: '167,475,43',
          title: 'Ropa Ecológica - Rosario',
          content: 'Prendas de algodón orgánico, textiles reciclados, calzado vegano y accesorios reutilizables'
        },
        {
          id: 'modalRosarioArtesanías',
          coords: '67,366,43',
          title: 'Artesanías sustentables - Rosario',
          content: 'Objetos hechos a mano con materiales reciclados, madera recuperada, cerámica ecológica y papel artesanal'
        },
        {
          id: 'modalRosarioHuerta',
          coords: '67,244,43',
          title: 'Huerta urbana y jardinería ecológica - Rosario',
          content: 'Plantas nativas, composteras, macetas biodegradables, kits para armar huertas en casa'
        },
        {
          id: 'modalRosarioEducacion',
          coords: '96,105,43',
          title: 'Educación ambiental - Rosario',
          content: 'Material educativo, libros sobre ecología, juegos didácticos para niños y talleres informativos'
        },
        {
          id: 'modalRosarioReciclaje',
          coords: '590,72,43',
          title: 'Stand de reciclaje - Rosario',
          content: 'Alimentos sin agrotóxicos, frutas y verduras de estación, cosmética natural y productos de higiene ecológica.'
        },
        {
          id: 'modalRosarioOrganicos',
          coords: '720,111,43',
          title: 'Productos orgánicos y naturales - Rosario',
          content: 'Objetos hechos a mano con materiales reciclados, madera recuperada, cerámica ecológica y papel artesanal'
        },
        {
          id: 'modalRosarioTecnologia',
          coords: '742,237,43',
          title: 'Tecnología sustentable - Rosario',
          content: 'Paneles solares, cargadores solares, lámparas LED ecológicas, gadgets de bajo consumo'
        },
        {
          id: 'modalRosarioMovilidad',
          coords: '688,390,43',
          title: 'Movilidad sostenible - Rosario',
          content: 'Bicicletas recicladas, monopatines eléctricos, stands de educación vial ecológica'
        },
        {
          id: 'modalRosarioTaller',
          coords: '321,74,41',
          title: 'Taller de huerta urbana - Evento exclusivo de Rosario',
          content: 'Todos los días a las 15:00hs. Espacio interactivo para aprender a armar una huerta casera, incluso en espacios reducidos. Incluye semillas agroecológicas y materiales reutilizables.'
        },
        {
          id: 'modalRosarioCocina',
          coords: '438,88,41',
          title: 'Cine ambiental al aire libre - Evento exclusivo de Rosario',
          content: 'Todos los días a las 20:00hs. Proyección de cortos y documentales sobre problemáticas ambientales. Se realiza al aire libre con mantas y luces solares. Traé tu vianda o bebida reutilizable'
        },
        {
          id: 'modalRosarioArte',
          coords: '535,122,41',
          title: 'Concurso de arte reciclado - Evento exclusivo de Rosario',
          content: 'Todos los días a las 16:00hs. Actividad abierta donde se exhiben obras hechas con materiales reciclados. Espacio creativo para chicos y grandes. Premios sustentables para las mejores propuestas'
        },
      ]
    }
  },

  // Inicializa los mapas
  init() {
    console.log('Inicializando MapManager...');
    try {
      // Limpiar modales existentes antes de inicializar
      this.cleanupModals();
      this.setupMaps();
      this.setupModals();
      console.log('MapManager inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar MapManager:', error);
    }
  },

  // Limpia los modales existentes
  cleanupModals() {
    // Eliminar modales existentes del DOM
    Object.values(this.mapConfig).forEach(config => {
      const existingModals = document.querySelectorAll(`#${config.id} area`);
      existingModals.forEach(area => {
        // Si existe una instancia de Bootstrap Modal, destruirla
        if (this.modalInstances[area.id]) {
          this.modalInstances[area.id].dispose();
          delete this.modalInstances[area.id];
        }
        area.remove();
      });
    });
  },

  // Crea un modal dinámicamente usando el template
  createModal(config) {
    try {
      // Obtener el template
      const template = document.getElementById('modalTemplate');
      if (!template) {
        throw new Error('No se encontró el template para los modales');
      }

      // Clonar el template
      const modalElement = template.content.cloneNode(true).firstElementChild;

      // Configurar el modal
      modalElement.id = config.id;
      modalElement.setAttribute('aria-labelledby', `${config.id}Label`);

      // Configurar el título
      const titleElement = modalElement.querySelector('.modal-title');
      titleElement.id = `${config.id}Label`;
      titleElement.textContent = config.title;

      // Configurar el contenido
      const contentElement = modalElement.querySelector('.modal-body');
      contentElement.textContent = config.content;

      // Agregar el modal al body del documento
      document.body.appendChild(modalElement);

      // Crear una nueva instancia de Bootstrap Modal
      const modalInstance = new bootstrap.Modal(modalElement, {
        backdrop: 'static', // Evita que el modal se cierre al hacer click fuera
        keyboard: false // Evita que el modal se cierre con la tecla ESC
      });

      // Almacenar la instancia del modal
      this.modalInstances[config.id] = modalInstance;

      // Agregar event listener para limpiar cuando se cierre el modal
      modalElement.addEventListener('hidden.bs.modal', () => {
        console.log(`Modal ${config.id} cerrado`);
      });

      return modalInstance;
    } catch (error) {
      console.error(`Error al crear el modal ${config.id}:`, error);
      throw error;
    }
  },

  // Configura los mapas de imagen
  setupMaps() {
    console.log('Configurando mapas...');
    Object.entries(this.mapConfig).forEach(([city, config]) => {
      console.log(`Configurando mapa para ${city}...`);
      const mapElement = document.querySelector(`#${config.id}`);
      if (!mapElement) {
        console.warn(`No se encontró el elemento del mapa para ${city}`);
        return;
      }

      // Limpiar áreas existentes
      mapElement.innerHTML = '';

      // Crear áreas para cada punto clickeable
      config.areas.forEach(areaConfig => {
        const area = document.createElement('area');
        area.shape = 'circle';
        area.coords = areaConfig.coords;
        area.alt = areaConfig.title;
        area.title = areaConfig.title;
        area.style.cursor = 'pointer';
        area.setAttribute('data-bs-target', `#${areaConfig.id}`);

        // Agregar event listener para el click en el área
        area.addEventListener('click', (e) => {
          e.preventDefault();
          const modalInstance = this.modalInstances[areaConfig.id];
          if (modalInstance) {
            modalInstance.show();
          }
        });

        mapElement.appendChild(area);
        console.log(`Área ${areaConfig.id} configurada para ${city}`);
      });

      // Agregar event listener a la imagen para loguear coordenadas de click
      const img = mapElement.previousElementSibling;
      if (img && img.tagName === 'IMG') {
        img.addEventListener('click', function (e) {
          const rect = img.getBoundingClientRect();
          const x = Math.round(e.clientX - rect.left);
          const y = Math.round(e.clientY - rect.top);
          console.log(`Click en imagen de ${city} (x,y): (${x},${y})`);
        });
      }

      console.log(`Mapa ${city} configurado correctamente`);
    });
  },

  // Configura los modales
  setupModals() {
    console.log('Configurando modales...');
    Object.values(this.mapConfig).forEach(config => {
      config.areas.forEach(areaConfig => {
        console.log(`Configurando modal para ${areaConfig.id}...`);
        try {
          this.createModal(areaConfig);
          console.log(`Modal ${areaConfig.id} creado correctamente`);
        } catch (error) {
          console.error(`Error al crear el modal ${areaConfig.id}:`, error);
        }
      });
    });
  }
};

// Verificar que Bootstrap esté cargado
if (typeof bootstrap === 'undefined') {
  console.error('Bootstrap no está cargado. El módulo MapManager requiere Bootstrap.');
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando MapManager...');
    MapManager.init();
  });
} else {
  console.log('DOM ya cargado, inicializando MapManager inmediatamente...');
  MapManager.init();
}

//Contador de visitas y Co2
 document.addEventListener("DOMContentLoaded", function () {
    const key = 'contadorVisitasEcoLife';
    let visitas = localStorage.getItem(key);

    if (!visitas) {
      visitas = 1;
    } else {
      visitas = parseInt(visitas) + 1;
    }

    localStorage.setItem(key, visitas);

    const co2PorVisita = 0.05; // kg de CO2 ficticio ahorrado
    const co2Total = (visitas * co2PorVisita).toFixed(2);

    document.getElementById("contador-visitas").innerText = `Visitas al sitio: ${visitas}`;
    document.getElementById("co2-ahorrado").innerText = `CO₂ estimado ahorrado: ${co2Total} kg`;
  });

  // Animación de secciones al hacer scroll
 document.addEventListener("DOMContentLoaded", function () {
  const elementosAnimables = document.querySelectorAll(".animada");

  const observer = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
      } else {
        entrada.target.classList.remove("visible");
      }
    });
  }, {
    threshold: 0.3,
  });

  elementosAnimables.forEach((el) => {
    el.classList.add("oculta");
    observer.observe(el);
  });
});


//Deslizar suavemente a secciones al hacer click (scroll suave)
document.querySelectorAll('a[href^="#"]').forEach(ancla => {
  ancla.addEventListener('click', function (e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// FORMULARIO DE CONTACTO
document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector("#formulario-contacto");

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const asunto = document.getElementById("asunto").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const campos = [nombre, email, asunto, mensaje];

    // Validar que todos los campos estén completos
    for (let campo of campos) {
      if (!campo) {
        alert("Por favor, completá todos los campos.");
        return;
      }
    }

    // Validar formato del email
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) {
      alert("El email ingresado no es válido.");
      return;
    }

    // Mostrar mensaje de agradecimiento
    document.getElementById("mensaje-gracias").style.display = "block";
    alert("¡Gracias por contactarte, " + nombre + "! Te responderemos a la brevedad.");

    // Reiniciar el formulario
    formulario.reset();

    // Consola para ver datos (opcional)
    console.log("Nombre:", nombre);
    console.log("Email:", email);
    console.log("Asunto:", asunto);
    console.log("Mensaje:", mensaje);
  });
});

// COMPRAS

const parquesPorCiudad = {
  bsas: 'Buenos Aires - PARQUE CENTENARIO',
  cordoba: 'Córdoba - PARQUE SARMIENTO',
  rosario: 'Rosario - Predio ferial de la ciudad'
};

// Función auxiliar para abreviar accesos al DOM
const el = id => document.getElementById(id);

// Datos de talleres por ciudad
const talleresPorCiudad = {
  bsas: [
    { id: "reciclaje", label: "Taller de reciclaje creativo – $1.000" },
    { id: "huerta", label: "Taller de huerta urbana – $800" },
    { id: "compost", label: "Taller de compostaje – $700" }
  ],
  cordoba: [
    { id: "energia", label: "Trivia sustentable con premios ecológicos – $1.200" },
    { id: "plastica", label: "Cocina saludable en vivo – $900" }
  ],
  rosario: [
    { id: "movilidad", label: "Taller de movilidad sustentable – $1.100" },
    { id: "reciclaje", label: "Taller de reciclaje creativo – $1.000" }
  ]
};

// Mostrar talleres según ciudad
function mostrarTalleres() {
  const ciudad = el("ciudad").value;
  const contenedor = el("contenedorTalleres");
  contenedor.innerHTML = "";

  if (!ciudad || !talleresPorCiudad[ciudad]) return;

  talleresPorCiudad[ciudad].forEach(taller => {
    const div = document.createElement("div");
    div.classList.add("form-check");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input");
    checkbox.id = taller.id;
    checkbox.value = taller.label;
    
    const precioStr = taller.label.match(/\$([\d\.]+)/)?.[1]?.replace(/\./g, "") || "0";
    checkbox.setAttribute("data-precio", precioStr);

    const label = document.createElement("label");
    label.classList.add("form-check-label");
    label.htmlFor = taller.id;
    label.textContent = taller.label;

    div.appendChild(checkbox);
    div.appendChild(label);
    contenedor.appendChild(div);
  });

  contenedor.querySelectorAll("input[type=checkbox]").forEach(chk => {
    chk.addEventListener("change", actualizarResumen);
  });
}

// Mostrar bloques al elegir tipo de entrada
el("tipoEntrada").addEventListener("change", function () {
  const val = this.value;
  el("bloqueDatosPago").style.display = val ? "block" : "none";
  el("bloqueResumen").style.display = val ? "block" : "none";
  el("bloqueBotonConfirmar").style.display = val ? "block" : "none";
  actualizarResumen();
});

// Actualizar resumen
function actualizarResumen() {
  const tipoEntrada = el("tipoEntrada");
  const ciudad = el("ciudad");
  const contenedorTalleres = el("contenedorTalleres");
  const resumenEntrada = el("resumenEntrada");
  const resumenActividades = el("resumenActividades");
  const resumenTotal = el("resumenTotal");

  const opcionesEntrada = {
    general: 2000,
    pase: 5000,
    familiarDia: 6000,
    familiarFull: 15000,
    preferencial: 0
  };

  const textoEntrada = tipoEntrada.options[tipoEntrada.selectedIndex]?.text || "–";
  const precioEntrada = opcionesEntrada[tipoEntrada.value] || 0;
  resumenEntrada.textContent = textoEntrada;

  let actividadesSeleccionadas = [];
  let totalActividades = 0;

  contenedorTalleres.querySelectorAll("input[type=checkbox]:checked").forEach(chk => {
    actividadesSeleccionadas.push(chk.value);
    totalActividades += parseInt(chk.dataset.precio || "0", 10);
  });

  resumenActividades.textContent = actividadesSeleccionadas.length ? actividadesSeleccionadas.join(", ") : "–";
  const total = precioEntrada + totalActividades;
  resumenTotal.textContent = `$${total.toLocaleString('es-AR')}`;
}

// Mostrar campos de tarjeta si se elige tarjeta
document.querySelectorAll('input[name="metodoPago"]').forEach(radio => {
  radio.addEventListener("change", () => {
    const camposTarjeta = el("camposTarjeta");
    if (radio.value === "tarjeta" && radio.checked) {
      camposTarjeta.style.display = "block";
      setCamposTarjetaRequeridos(true, "camposTarjeta");
    } else if (radio.checked) {
      camposTarjeta.style.display = "none";
      setCamposTarjetaRequeridos(false, "camposTarjeta");
    }
  });
});

function setCamposTarjetaRequeridos(requerido, contenedorId) {
  const contenedor = el(contenedorId);
  contenedor?.querySelectorAll("input").forEach(input => {
    input.required = requerido;
  });
}

// División de pago
el("btnDividirPago").addEventListener("click", () => {
  el("dividirPagoSection").style.display = "block";
  el("btnDividirPago").classList.add("d-none");
  el("btnCancelarDivision").classList.remove("d-none");
  el("segundoMedioPago").required = true;
});

el("btnCancelarDivision").addEventListener("click", () => {
  el("dividirPagoSection").style.display = "none";
  el("btnDividirPago").classList.remove("d-none");
  el("btnCancelarDivision").classList.add("d-none");
  el("segundoMedioPago").required = false;
  el("segundoMedioPago").value = "";
  mostrarCamposTarjetaSegundoPago(false);
  limpiarCamposTarjeta("camposTarjeta2");
});

el("segundoMedioPago").addEventListener("change", () => {
  mostrarCamposTarjetaSegundoPago(el("segundoMedioPago").value === "tarjeta");
});

function mostrarCamposTarjetaSegundoPago(mostrar) {
  const camposTarjeta2 = el("camposTarjeta2");
  camposTarjeta2.style.display = mostrar ? "block" : "none";
  setCamposTarjetaRequeridos(mostrar, "camposTarjeta2");
}

function limpiarCamposTarjeta(contenedorId) {
  const contenedor = el(contenedorId);
  contenedor?.querySelectorAll("input").forEach(input => input.value = "");
}

// Al cambiar ciudad
el("ciudad").addEventListener("change", () => {
  mostrarTalleres();
  actualizarResumen();
});

// Validación y envío

el("formCompra").addEventListener("submit", function (e) {
  e.preventDefault();

  const tipoEntrada = el("tipoEntrada").value;
  const nombre = el("nombre").value;
  const email = el("email").value;
  const ciudad = el("ciudad").value;
  const metodoPago = document.querySelector('input[name="metodoPago"]:checked');
  const camposTarjeta = el("camposTarjeta").querySelectorAll("input");
  const resumenTotal = el("resumenTotal").textContent;

  const errores = [];

  if (!tipoEntrada) errores.push("Seleccioná un tipo de entrada.");
  if (!nombre) errores.push("Ingresá tu nombre.");
  if (!email) {
    errores.push("Ingresá tu email.");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errores.push("Ingresá un email válido.");
  }
  if (!ciudad) errores.push("Seleccioná una ciudad.");
  if (!metodoPago) errores.push("Seleccioná un método de pago.");

  if (metodoPago?.value === "tarjeta") {
    camposTarjeta.forEach(campo => {
      if (!campo.value) errores.push(`Completá el campo: ${campo.placeholder || campo.name}`);
    });
  }

  if (errores.length > 0) {
    mostrarAlerta(errores[0]);
  } else {
    mostrarMensajeFinal(nombre, tipoEntrada, ciudad, resumenTotal);
  }
});

// Alerta de error
function mostrarAlerta(mensaje) {
  el("mensajeAlerta").textContent = mensaje;
  el("alertaCustom").style.display = "block";
}

function cerrarAlerta() {
  el("alertaCustom").style.display = "none";
}


// Mensaje final
function mostrarMensajeFinal(nombre, tipoEntrada, ciudad, total) {
  el("formCompra").style.display = "none";
  el("mensajeFinal").style.display = "block";

  const tipoEntradaTexto = document.querySelector(`#tipoEntrada option[value="${tipoEntrada}"]`).textContent;

  const parqueTexto = parquesPorCiudad[ciudad] || ciudad;

  el("tituloFinal").textContent = `¡Gracias por tu compra, ${nombre}!`;
  el("detalleFinal").innerHTML = `
    Compraste <strong>${tipoEntradaTexto}</strong> para <strong>${parqueTexto}</strong>.<br>
    Total abonado: <strong>${total}</strong>.<br><br>
    Te enviamos un correo a <strong>${el("email").value}</strong> con los detalles de tu entrada.
  `;
}

