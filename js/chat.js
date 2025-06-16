// === CHAT FLOTANTE ECOLIFE ===
const ChatBot = {
  // Respuestas automáticas del bot
  botResponses: [
    "¡Gracias por tu mensaje! 🌿 Un representante de EcoLife te responderá pronto.",
    "¡Hola! Me alegra que estés interesado en EcoLife. ¿Te gustaría saber más sobre nuestras actividades sustentables?",
    "¡Excelente pregunta! Puedes encontrar más información en nuestra sección de actividades y talleres.",
    "🌱 En EcoLife promovemos el consumo responsable. ¿Hay algún tema específico que te interese?",
    "¡Perfecto! Nuestros expositores tienen productos ecológicos increíbles. ¿Te interesa alguna categoría en particular?",
    "¡Qué bueno que quieras participar! Podés comprar tu entrada en nuestra sección de entradas y pagos.",
    "🍃 ¡Me encanta tu entusiasmo por el medio ambiente! ¿Querés que te cuente sobre nuestros próximos eventos?",
    "¡Genial! También podés seguirnos en redes sociales para estar al día con todas las novedades de EcoLife."
  ],

  // Respuestas específicas por palabras clave
  keywordResponses: {
    'hola': '¡Hola! 🌿 Bienvenido a EcoLife. ¿En qué puedo ayudarte hoy?',
    'buenas': '¡Buenas! 🌿 Bienvenido a EcoLife. ¿En qué puedo ayudarte hoy?',
    'entrada': 'Para comprar entradas, podés ir a nuestra sección "Entradas" donde encontrarás diferentes opciones y precios. 🎫',
    'entradas': 'Para comprar entradas, podés ir a nuestra sección "Entradas" donde encontrarás diferentes opciones y precios. 🎫',
    'horario': 'Los horarios varían según la ciudad. Podés consultar el itinerario completo en nuestra sección "Itinerario". 🕐',
    'horarios': 'Los horarios varían según la ciudad. Podés consultar el itinerario completo en nuestra sección "Itinerario". 🕐',
    'ubicacion': 'EcoLife es una feria itinerante que recorre Buenos Aires, Córdoba y Rosario. ¡Revisá el itinerario para más detalles! 📍',
    'ubicación': 'EcoLife es una feria itinerante que recorre Buenos Aires, Córdoba y Rosario. ¡Revisá el itinerario para más detalles! 📍',
    'donde': 'EcoLife es una feria itinerante que recorre Buenos Aires, Córdoba y Rosario. ¡Revisá el itinerario para más detalles! 📍',
    'precio': 'Tenemos diferentes tipos de entrada: general ($2000), pase completo ($5000) y familiar ($6000). ¡También hay actividades adicionales! 💰',
    'precios': 'Tenemos diferentes tipos de entrada: general ($2000), pase completo ($5000) y familiar ($6000). ¡También hay actividades adicionales! 💰',
    'costo': 'Tenemos diferentes tipos de entrada: general ($2000), pase completo ($5000) y familiar ($6000). ¡También hay actividades adicionales! 💰',
    'actividad': 'Ofrecemos talleres de huerta urbana, cocina viva y arte reciclado. ¡Consultá la sección "Actividades" para más info! 🎨',
    'actividades': 'Ofrecemos talleres de huerta urbana, cocina viva y arte reciclado. ¡Consultá la sección "Actividades" para más info! 🎨',
    'taller': 'Ofrecemos talleres de huerta urbana, cocina viva y arte reciclado. ¡Consultá la sección "Actividades" para más info! 🎨',
    'talleres': 'Ofrecemos talleres de huerta urbana, cocina viva y arte reciclado. ¡Consultá la sección "Actividades" para más info! 🎨',
    'contacto': 'Podés contactarnos a través del formulario en "Contacto" o escribinos a contacto@ecolife.com.ar 📧',
    'email': 'Podés escribirnos a contacto@ecolife.com.ar o usar nuestro formulario en la sección "Contacto" 📧',
    'mail': 'Podés escribirnos a contacto@ecolife.com.ar o usar nuestro formulario en la sección "Contacto" 📧',
    'gracias': '¡De nada! 😊 ¿Hay algo más en lo que pueda ayudarte sobre EcoLife?',
    'info': '¡Claro! EcoLife es una feria sustentable itinerante. Tenemos stands, talleres, charlas y actividades para toda la familia. ¿Qué te interesa más? 🌿',
    'información': '¡Claro! EcoLife es una feria sustentable itinerante. Tenemos stands, talleres, charlas y actividades para toda la familia. ¿Qué te interesa más? 🌿',
    'help': '¡Estoy aquí para ayudarte! Podés preguntarme sobre entradas, horarios, actividades, ubicaciones o cualquier cosa sobre EcoLife 🌿',
    'ayuda': '¡Estoy aquí para ayudarte! Podés preguntarme sobre entradas, horarios, actividades, ubicaciones o cualquier cosa sobre EcoLife 🌿'
  },

  init() {
    this.chatBubble = document.getElementById('chatBubble');
    this.chatWindow = document.getElementById('chatWindow');
    this.chatClose = document.getElementById('chatClose');
    this.chatInput = document.getElementById('chatInput');
    this.chatSend = document.getElementById('chatSend');
    this.chatMessages = document.getElementById('chatMessages');
    this.notification = document.querySelector('.chat-notification');

    if (!this.chatBubble) {
      console.log('Chat widget no encontrado en esta página');
      return; // Si no existe el chat, no inicializar
    }

    this.bindEvents();
    this.hideNotificationAfterDelay();
    console.log('Chat bot inicializado correctamente');
  },

  bindEvents() {
    // Abrir chat
    this.chatBubble.addEventListener('click', () => {
      this.openChat();
    });

    // Cerrar chat
    this.chatClose.addEventListener('click', () => {
      this.closeChat();
    });

    // Enviar mensaje con botón
    this.chatSend.addEventListener('click', () => {
      this.sendMessage();
    });

    // Enviar mensaje con Enter
    this.chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.sendMessage();
      }
    });

    // Cerrar chat al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!this.chatWindow.contains(e.target) && !this.chatBubble.contains(e.target)) {
        this.closeChat();
      }
    });

    // Prevenir que el chat se cierre cuando se hace click dentro de la ventana
    this.chatWindow.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  },

  openChat() {
    this.chatWindow.style.display = 'flex';
    setTimeout(() => {
      this.chatWindow.classList.add('show');
    }, 10);
    this.chatInput.focus();
    this.hideNotification();
  },

  closeChat() {
    this.chatWindow.classList.remove('show');
    setTimeout(() => {
      this.chatWindow.style.display = 'none';
    }, 250);
  },

  hideNotification() {
    if (this.notification) {
      this.notification.style.display = 'none';
    }
  },

  hideNotificationAfterDelay() {
    setTimeout(() => {
      this.hideNotification();
    }, 10000); // Ocultar después de 10 segundos
  },

  sendMessage() {
    const message = this.chatInput.value.trim();
    if (!message) return;

    // Deshabilitar input mientras se procesa
    this.chatInput.disabled = true;
    this.chatSend.disabled = true;

    // Añadir mensaje del usuario
    this.addMessage(message, 'user');
    this.chatInput.value = '';

    // Simular delay de respuesta del bot
    setTimeout(() => {
      const botResponse = this.getBotResponse(message);
      this.addMessage(botResponse, 'bot');
      
      // Rehabilitar input
      this.chatInput.disabled = false;
      this.chatSend.disabled = false;
      this.chatInput.focus();
    }, 1000 + Math.random() * 2000); // Entre 1-3 segundos
  },

  addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const now = new Date();
    const timeString = now.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    if (sender === 'bot') {
      messageDiv.innerHTML = `
        <div class="message-avatar">
          <i class="bi bi-leaf"></i>
        </div>
        <div class="message-content">
          <p>${this.escapeHtml(text)}</p>
          <span class="message-time">${timeString}</span>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="message-content">
          <p>${this.escapeHtml(text)}</p>
          <span class="message-time">${timeString}</span>
        </div>
        <div class="message-avatar">
          <i class="bi bi-person-fill"></i>
        </div>
      `;
    }

    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  },

  getBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();

    // Buscar respuestas por palabra clave
    for (const [keyword, response] of Object.entries(this.keywordResponses)) {
      if (message.includes(keyword)) {
        return response;
      }
    }

    // Respuesta aleatoria si no hay palabra clave
    const randomIndex = Math.floor(Math.random() * this.botResponses.length);
    return this.botResponses[randomIndex];
  },

  // Función para escapar HTML y prevenir XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// Inicializar el chat cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  ChatBot.init();
});

// Exportar ChatBot para uso en otros scripts si es necesario
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ChatBot;
} 