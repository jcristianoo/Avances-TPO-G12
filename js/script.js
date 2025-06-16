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
      ]
    },
    cordoba: {
      id: 'mapaCordoba',
      areas: [
        {
          id: 'modalCordobaTecno',
          coords: '777,335,45',
          title: 'Tecnología Sustentable - Córdoba',
          content: 'Paneles solares, cargadores solares, lámparas LED ecológicas y gadgets de bajo consumo'
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
          console.log(`Click en imagen de ${city}: x=${x}, y=${y}`);
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

//Resumen de Compra
document.addEventListener("DOMContentLoaded", function () {
      const tipoEntrada = document.getElementById("tipoEntrada");
      const actividades = document.querySelectorAll("#formCompra input[type=checkbox]");
      const resumenEntrada = document.getElementById("resumenEntrada");
      const resumenActividades = document.getElementById("resumenActividades");
      const resumenTotal = document.getElementById("resumenTotal");
      const nombre = document.getElementById("nombre");
      const email = document.getElementById("email");

      const precios = {
        entradas: {
          general: 2000,
          pase: 5000,
          familiar: 6000,
          preferencial: 0
        },
        actividades: {
          tallerHuerta: 1000,
          cocinaViva: 1500,
          arteReciclado: 500
        }
      };

      function actualizarResumen() {
        let total = 0;
        const tipo = tipoEntrada.value;
        const precioEntrada = precios.entradas[tipo] || 0;
        resumenEntrada.textContent = tipo ? `$${precioEntrada}` : '–';
        total += precioEntrada;

        let actividadesSeleccionadas = [];
        actividades.forEach((act) => {
          if (act.checked) {
            const nombre = act.value;
            const precioAct = precios.actividades[nombre] || 0;
            actividadesSeleccionadas.push(`$${precioAct}`);
            total += precioAct;
          }
        });

        resumenActividades.textContent = actividadesSeleccionadas.length
          ? actividadesSeleccionadas.join(' + ')
          : '–';
        resumenTotal.textContent = `$${total}`;
      }

      tipoEntrada.addEventListener("change", actualizarResumen);
      actividades.forEach(act => act.addEventListener("change", actualizarResumen));

      document.getElementById("formCompra").addEventListener("submit", function (e) {
        e.preventDefault();
        const tipo = tipoEntrada.value;
        const nombreValor = nombre.value.trim();
        const emailValor = email.value.trim();

        if (!tipo) {
          alert("⚠️ Debés seleccionar un tipo de entrada.");
          tipoEntrada.focus();
          return;
        }

        if (!nombreValor) {
          alert("⚠️ Ingresá tu nombre y apellido.");
          nombre.focus();
          return;
        }

        if (!emailValor || !emailValor.includes("@") || !emailValor.includes(".")) {
          alert("⚠️ Ingresá un correo electrónico válido.");
          email.focus();
          return;
        }

        alert(`🎉 ¡Gracias por tu compra, ${nombreValor}!\n\nTe enviaremos un correo a ${emailValor} con los detalles de tu entrada y actividades.`);
      });
    });

// Mostrar campos de tarjeta según selección
document.querySelectorAll('input[name="metodoPago"]').forEach(radio => {
  radio.addEventListener('change', function() {
    document.getElementById('camposTarjeta').style.display = this.value === 'tarjeta' ? 'block' : 'none';
  });
});

// División de medios de pago
document.getElementById('btnDividirPago').addEventListener('click', function () {
  document.getElementById('dividirPagoSection').style.display = 'block';
  this.style.display = 'none';
  document.getElementById('btnCancelarDivision').classList.remove('d-none');
});


// Mostrar campos de tarjeta para segundo medio de pago
document.getElementById('segundoMedioPago').addEventListener('change', function() {
  document.getElementById('camposTarjeta2').style.display = this.value === 'tarjeta' ? 'block' : 'none';
});

// Botón para cancelar la división de medios de pago
document.getElementById('btnCancelarDivision').addEventListener('click', function () {

  document.getElementById('dividirPagoSection').style.display = 'none';

  document.getElementById('btnDividirPago').style.display = 'inline-block';

  this.classList.add('d-none');

  document.getElementById('segundoMedioPago').value = '';
  document.getElementById('montoSegundoMedio').value = '';
  document.getElementById('camposTarjeta2').style.display = 'none';
});

// Validación del formulario de contacto
document.getElementById("form-contacto")?.addEventListener("submit", function(event) {
  event.preventDefault(); // Previene envío real

  const nombre = this.nombre.value.trim();
  const email = this.email.value.trim();
  const mensaje = this.mensaje.value.trim();
  const mensajeDiv = document.getElementById("form-mensaje");

  if (!nombre || !email || !mensaje) {
    mensajeDiv.textContent = "Por favor, completá todos los campos.";
    mensajeDiv.style.color = "red";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mensajeDiv.textContent = "Ingresá un correo válido.";
    mensajeDiv.style.color = "red";
  } else {
    mensajeDiv.textContent = "Mensaje enviado correctamente ✔";
    mensajeDiv.style.color = "green";
    this.reset();
  }
});
