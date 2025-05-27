// Módulo para manejar la funcionalidad de mapas y modales
const MapManager = {
  // Configuración de los mapas por ciudad
  mapConfig: {
    bsas: {
      id: 'mapaBsAs',
      modalId: 'modalBsAs',
      coords: '143,181,43', // Coordenadas para el área clickeable de Buenos Aires
      title: 'Ropa Ecológica - Buenos Aires',
      content: 'Prendas de algodón orgánico, textiles reciclados, calzado vegano y accesorios reutilizables'
    },
    cordoba: {
      id: 'mapaCordoba',
      modalId: 'modalCordoba',
      coords: '777,335,45', // Coordenadas para el área clickeable de Córdoba
      title: 'Tecnología Sustentable - Córdoba',
      content: 'Paneles solares, cargadores solares, lámparas LED ecológicas y gadgets de bajo consumo'
    },
    rosario: {
      id: 'mapaRosario',
      modalId: 'modalRosario',
      coords: '232,68,45', // Coordenadas para el área clickeable de Rosario
      title: 'Huerta Urbana - Rosario',
      content: 'Plantas nativas, composteras, macetas biodegradables y kits para armar huertas en casa'
    }
  },

  // Inicializa los mapas
  init() {
    console.log('Inicializando MapManager...');
    try {
      this.setupMaps();
      this.setupModals();
      console.log('MapManager inicializado correctamente');
    } catch (error) {
      console.error('Error al inicializar MapManager:', error);
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

      const area = mapElement.querySelector('area');
      if (!area) {
        console.warn(`No se encontró el área del mapa para ${city}`);
        return;
      }

      try {
        // Asegurarse de que las coordenadas se establezcan correctamente
        if (config.coords) {
          area.setAttribute('coords', config.coords);
          console.log(`Coordenadas establecidas para ${city}: ${config.coords}`);
        } else {
          console.warn(`No hay coordenadas definidas para ${city}`);
        }

        // Asegurarse de que el target del modal esté correctamente establecido
        area.setAttribute('data-bs-target', `#${config.modalId}`);
        area.style.cursor = 'pointer';

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
      } catch (error) {
        console.error(`Error al configurar el mapa ${city}:`, error);
      }
    });
  },

  // Crea un modal dinámicamente usando el template
  createModal(config) {
    // Obtener el template
    const template = document.getElementById('modalTemplate');
    if (!template) {
      throw new Error('No se encontró el template para los modales');
    }

    // Clonar el template
    const modalElement = template.content.cloneNode(true).firstElementChild;

    // Configurar el modal
    modalElement.id = config.modalId;
    modalElement.setAttribute('aria-labelledby', `${config.modalId}Label`);

    // Configurar el título
    const titleElement = modalElement.querySelector('.modal-title');
    titleElement.id = `${config.modalId}Label`;
    titleElement.textContent = config.title;

    // Configurar el contenido
    const contentElement = modalElement.querySelector('.modal-body');
    contentElement.textContent = config.content;

    // Agregar el modal al body del documento
    document.body.appendChild(modalElement);

    // Inicializar el modal de Bootstrap
    return new bootstrap.Modal(modalElement);
  },

  // Configura los modales
  setupModals() {
    console.log('Configurando modales...');
    Object.entries(this.mapConfig).forEach(([city, config]) => {
      console.log(`Configurando modal para ${city}...`);
      try {
        // Crear el modal dinámicamente
        const modal = this.createModal(config);
        console.log(`Modal ${city} creado correctamente`);
      } catch (error) {
        console.error(`Error al crear el modal ${city}:`, error);
      }
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
