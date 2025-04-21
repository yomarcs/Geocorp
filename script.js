// document.addEventListener("DOMContentLoaded", () => { ... });
// >> Este evento se ejecuta cuando el HTML ha sido completamente cargado. Así nos aseguramos de que los elementos existen antes de manipularlos con JavaScript.

//? Animaion de titulo
document.addEventListener("DOMContentLoaded", () => {
  const originalTitle = "Geocorp - Innovación al alcance de tus manos";

  const frases = [
    "Geocorp - 💧 Soluciones en Geomembranas 🛠️",
    "✅ Calidad • 💻 Tecnología • 🌱 Sostenibilidad",
    "🚀 ¡Innovación al alcance de tus manos! 🤲"
  //   "💧 Geocorp - Impermeabilización Eficiente para tu proyecto 🏗️",
  //   "🛡️ Resistencia y Calidad que supera expectativas ⭐",
  //   "🔬 Soluciones Innovadoras en Geosintéticos ⚙️",
  //  " 🌱 Sostenibilidad • 💰 Ahorro • 🤖 Tecnología avanzada"
  ];

  let fraseIndex = 0;
  let rotadorActivo = true;
  let scrollActivo = true;
  let intervaloDesplazamiento;

  // ➤ Función para animar desplazamiento tipo marquesina
  function animarFrase(frase) {
    clearInterval(intervaloDesplazamiento);
    const padding = " ".repeat(30); // Espacio inicial antes de mostrar frase
    const texto = padding + frase + " • ";
    let i = 0;

    intervaloDesplazamiento = setInterval(() => {
      if (!rotadorActivo) return;
      document.title = texto.substring(i, i + 50); // Mostrar 50 caracteres en movimiento
      i++;
      if (i > texto.length) {
        clearInterval(intervaloDesplazamiento);
        fraseIndex = (fraseIndex + 1) % frases.length;
        setTimeout(() => {
          if (rotadorActivo) animarFrase(frases[fraseIndex]);
        }, 1000); // Pequeña pausa antes de siguiente
      }
    }, 150); // Velocidad del desplazamiento
  }

  // ➤ Mostrar porcentaje de scroll
  function actualizarProgresoScroll() {
    if (!scrollActivo) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = Math.round((scrollTop / docHeight) * 100);
    document.title = `📈 ${scrolled}% leído - Geocorp`;
  }

  // ➤ Detectar cambio de pestaña
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      rotadorActivo = false;
      scrollActivo = false;
      clearInterval(intervaloDesplazamiento);
      document.title = "👀 ¡Vuelve a Geocorp!";
    } else {
      rotadorActivo = true;
      scrollActivo = true;
      document.title = originalTitle;
      setTimeout(() => {
        animarFrase(frases[fraseIndex]);
      }, 500);
    }
  });

  // ➤ Detectar scroll
  window.addEventListener("scroll", () => {
    if (scrollActivo) {
      actualizarProgresoScroll();
    }
  });

  // ➤ Iniciar con el título original y animación activa
  document.title = originalTitle;
  setTimeout(() => {
    animarFrase(frases[fraseIndex]);
  }, 1000);
});

//? Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('loader-wrapper');
  preloader.style.opacity = '0';
  preloader.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 600);
});

//? toogle de la hamburgueza
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", (event) => {
    navLinks.classList.toggle("active");
    event.stopPropagation(); // Evita que el evento se propague al documento
  });

  document.addEventListener("click", (event) => {
    // Verifica si el clic no fue en el menú o en el botón de menú
    if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
      navLinks.classList.remove("active");
    }
  });
});

//? navLink.active
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".animated-link");
  const currentPath = window.location.pathname.split("/").pop(); // Obtiene el nombre del archivo actual

  // Función para activar el enlace correcto
  const activateCurrentLink = () => {
    navLinks.forEach(link => {
      link.classList.remove("active"); // Elimina 'active' de todos los enlaces
      const linkPath = link.getAttribute("href").split("/").pop(); // Obtiene la ruta del enlace

      // Si el enlace coincide con la página actual, se le agrega 'active'
      if (linkPath === currentPath || (currentPath === "" && linkPath === "index.html")) {
        link.classList.add("active");
      }
    });
  };

  // Llamamos a la función al cargar la página
  activateCurrentLink();
});

//? Actualización dinamica del año del copyright
document.getElementById("copyright-year").textContent = new Date().getFullYear();

//? Dinamica del banner
document.addEventListener("DOMContentLoaded", () => { // evento se ejecuta cuando el HTML ha sido completamente cargado
  // Seleccionamos los elementos.
  const banner = document.querySelector(".banner"); // Contenedor del slider
  const title = document.querySelector(".overlay .title"); // Titulo de la imagen actual del banner
  const description = document.querySelector(".overlay .description"); // Descripcion de la imagen actual del banner
  const indicatorsContainer = document.createElement("div"); //  Creamos el Contenedor de indicadores

  indicatorsContainer.classList.add("indicators"); // Le agregamos la clase al contenedor de indicadores
  banner.appendChild(indicatorsContainer); // Insertamos el contenedor de indicadores al flujo html del banner 

  // Lista de imagenes Titulos y Descripciones
  const slides = [
    { image: "./assets/img/banner1.png", title: "Impermeabilización Eficiente", description: "Las geomembranas ofrecen máxima protección contra filtraciones, reducen costos y garantizan durabilidad en construcción, minería y agricultura." },
    { image: "./assets/img/banner2.jpg", title: "Resistencia y Calidad", description: "Nuestros materiales soportan condiciones extremas y ofrecen una larga vida útil en cualquier proyecto de construcción." },
    { image: "./assets/img/banner3.jpg", title: "Soluciones Innovadoras", description: "Usamos tecnología avanzada en geosintéticos para garantizar la máxima eficiencia y rentabilidad en tus proyectos." },
    { image: "./assets/img/banner4.jpg", title: "Sostenibilidad y Ahorro", description: "Implementamos sistemas ecológicos que optimizan recursos y reducen el impacto ambiental sin comprometer la calidad." }
  ];

  // Vribles de control
  let index = 0; // Controla el slider actual
  let autoSlide; // Almacenará el setInterval para cambiar imágenes automáticamente.
  let isDragging = false; // detecta si el usuario está deslizando la imagen.
  let startX = 0; // almacena la posición inicial del toque/deslizamiento.
  let touchStartDistance = 0; // guarda la distancia inicial entre dos dedos al hacer zoom.
  let isZooming = false; // evita movimientos no deseados mientras se hace zoom.

  // Crea los indicadores
  function createIndicators() {
    slides.forEach((_, i) => {
      const dot = document.createElement("div"); // Creamos un indicador
      dot.classList.add("dot"); // agregamos la clase al indicador creado
      if (i === 0) dot.classList.add("active"); // agregamos la clase .active al primer idicador creado
      dot.addEventListener("click", () => goToSlide(i)); // Se asigna un click para cambiar al slide correspondiente (goToSlide(i)).
      indicatorsContainer.appendChild(dot); // añadimos el indicador creado al contenedor de indicadores
    });
  }

  // Inicializa el Banner
  function initializeBanner() {
    updateBanner(); // establece la primera imagen y texto.
    createIndicators(); // crea los indicadores de navegación.
    startAutoSlide(); // inicia el cambio automático de imágenes.

    // Se añaden eventos para arrastrar, detener y reanudar el slider.
    // eventos de interaccion
    banner.addEventListener("mousedown", startDrag);
    banner.addEventListener("touchstart", startDrag, { passive: true });
    banner.addEventListener("mousemove", onDrag);
    banner.addEventListener("touchmove", onDrag, { passive: true });
    banner.addEventListener("mouseup", endDrag);
    banner.addEventListener("touchend", endDrag);
    banner.addEventListener("mouseleave", endDrag);
    // Detener y reanudar al presionar
    banner.addEventListener("mousedown", stopSlide);
    banner.addEventListener("mouseup", resumeSlide);
    banner.addEventListener("mouseleave", resumeSlide);
    banner.addEventListener("touchstart", stopSlide, { passive: true });
    banner.addEventListener("touchend", resumeSlide, { passive: true });

    // Habilitar(detectar) zoom con dos dedos
    banner.addEventListener("touchmove", pinchZoom, { passive: false });
  }

  // Cambia la imagen del Slider
  function updateBanner() {
    // 1. Quitar animación para ocultar
    title.classList.remove("fade-in");
    description.classList.remove("fade-in");

    // 2. Esperar un momento para que se anime la salida
    setTimeout(() => {
      // Actualiza contenido
      title.textContent = slides[index].title; // actualiza el titulo del banner
      description.textContent = slides[index].description; // actualiza la descripcion del banner

      // 3. Volver a agregar la animación para entrada
      title.classList.add("fade-in"); // se agrega la clase .fade-in al titulo para la animacion
      description.classList.add("fade-in"); // se agrega la clase .fade-in a la descripcion para la animacion

      // Actualizar imagen y indicadores al mismo tiempo
      banner.style.backgroundImage = `url(${slides[index].image})`; // actualiza la image del banner
      updateIndicators(); // Se actualizan los indicadores
    }, 1000); 
  }

  // Cambio automático de slides
  function startAutoSlide() {
    clearInterval(autoSlide); // Limpia cualquier temporizador previo para evitar intervalos acumulativos
    autoSlide = setInterval(() => { // cada 6 segundos se cambia al siguiente slider
      index = (index + 1) % slides.length;
      updateBanner();
    }, 6000);
  }

  // Navegar con las bolitas(indicadores)
  // Se actualiza el index al hacer clic en una bolita.
  // Se detiene el slider temporalmente y se reinicia tras 500ms.
  function goToSlide(i) {
    clearInterval(autoSlide);
    index = i;
    updateBanner();
    setTimeout(startAutoSlide, 1000);
  }

  function updateIndicators() {
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  // Deslizar imágenes con el mouse o touch
  // Detecta cuando el usuario arrastra la imagen a la izquierda o derecha.
  function startDrag(e) {
    if (isZooming) return; // Evita mover la imagen si está haciendo zoom
    isDragging = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
  }

  function onDrag(e) {
    if (!isDragging) return;
    let currentX = e.touches ? e.touches[0].clientX : e.clientX;
    let diff = startX - currentX;

    // Si el arrastre es mayor a 50px, cambia al siguiente/previo slide.
    if (Math.abs(diff) > 50) {
      clearInterval(autoSlide);
      index = diff > 0 ? (index + 1) % slides.length : (index - 1 + slides.length) % slides.length;
      updateBanner();
      isDragging = false;
      startAutoSlide();
    }
  }

  // Detiene el slider mientras se arrastra y lo reinicia después.
  function endDrag() {
    isDragging = false;
  }

  // Al tocar la imagen, se detiene el cambio automático.
  function stopSlide() {
    clearInterval(autoSlide);
  }

  // Al soltarla, el slider se reanuda.
  function resumeSlide() {
    startAutoSlide();
  }

  // Zoom con 2 dedos
  function pinchZoom(e) {
    if (e.touches.length === 2) {
      let touch1 = e.touches[0];
      let touch2 = e.touches[1];

      // Permite hacer zoom de 1x a 2x.
      let currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );

      // Evita cambiar de imagen mientras se hace zoom. 
      if (!touchStartDistance) {
        touchStartDistance = currentDistance;
      } else {
        let scale = Math.min(2, Math.max(1, currentDistance / touchStartDistance));
        banner.style.transform = `scale(${scale})`;
        isZooming = scale > 1; // Activa el zoom
      }

      e.preventDefault();
    }
  }

  initializeBanner();
});

//? Index - Servicios
document.addEventListener("DOMContentLoaded", () => {

  const servicesData = [
    {
      title: "Instalación de Geosintéticos",
      description: "Protección eficaz contra filtraciones de agua en proyectos de construcción.",
      image: "./assets/img/banner2.jpg",
      floatImage: "./assets/img/twinny.png",
      aos: "zoom-out-right"
    },
    {
      title: "Reparación y Mantenimiento",
      description: "Mantén tus instalaciones seguras y funcionales a largo plazo.",
      image: "./assets/img/mantenimiento.jpg",
      floatImage: "./assets/img/leister.png",
      aos: "zoom-out-up"
    },
    {
      title: "Consultoría Técnica",
      description: "Asesoramiento profesional para la mejor solución a tus necesidades.",
      image: "./assets/img/asesoria.jpg",
      floatImage: "./assets/img/consultoria.png",
      aos: "zoom-out-left"
    },
    {
      title: "Instalación de Geosintéticos",
      description: "Protección eficaz contra filtraciones de agua en proyectos de construcción.",
      image: "./assets/img/banner2.jpg",
      floatImage: "./assets/img/twinny.png",
      aos: "zoom-out-right"
    },
    {
      title: "Reparación y Mantenimiento",
      description: "Mantén tus instalaciones seguras y funcionales a largo plazo.",
      image: "./assets/img/mantenimiento.jpg",
      floatImage: "./assets/img/leister.png",
      aos: "zoom-out-up"
    }
  ];
  
  const servicesLayout = document.querySelector(".services");
const columns = [
  document.querySelector(".column-1"),
  document.querySelector(".column-2"),
  document.querySelector(".column-3"),
];

if (columns.every(col => col)) {
  servicesData.forEach((service, i) => {
    const itemHTML = `
      <div class="service-item" data-aos="${service.aos}">
        <div class="floating-image-wrapper">
          ${service.floatImage ? `<img src="${service.floatImage}" alt="Herramienta" class="floating-image">` : ""}
        </div>
        <div class="image-container"> 
          <img loading="lazy" src="${service.image}" alt="${service.title}">
        </div>
        <div class="description">
          <h3>${service.title}</h3>
          <p>${service.description}</p>
          <a href="servicios.html#${service.title.toLowerCase().replace(/\s+/g, '-')}" class="more-btn">Ver más</a>
        </div>
      </div>
    `;
    // Distribuye los servicios por columnas: 1 en la primera, 2 en la segunda, 2 en la tercera
    if (i === 0) columns[0].insertAdjacentHTML("beforeend", itemHTML);
    else if (i < 3) columns[1].insertAdjacentHTML("beforeend", itemHTML);
    else columns[2].insertAdjacentHTML("beforeend", itemHTML);
  });
}


  AOS.init({
    offset: 100,
    delay: 100, 
    duration: 1000, // duración en milisegundos
    once: true,     // true = la animación solo ocurre una vez
    easing: 'ease-in-out',
  });
});

//? Index - Proyectos
document.addEventListener("DOMContentLoaded", () => {
  // Array de objetos con los datos de cada proyecto
  const proyectos = [
    {
      imagen: './assets/img/banner1.png',
      titulo: 'Instalación PVC en Laderas',
      descripcion: 'Proyecto de impermeabilización en terreno inclinado con geomembrana de alta resistencia.'
    },
    {
      imagen: './assets/img/banner2.jpg',
      titulo: 'Revestimiento de Canales',
      descripcion: 'Optimización del riego mediante instalación precisa de láminas PVC.'
    },
    {
      imagen: './assets/img/banner3.jpg',
      titulo: 'Geosintéticos en Reservorios',
      descripcion: 'Aseguramiento hídrico para zonas agrícolas con capas protectoras.'
    },
    {
      imagen: './assets/img/banner4.jpg',
      titulo: 'Aislación Industrial',
      descripcion: 'Aplicación técnica de geomembranas para contención de residuos industriales.'
    },
    {
      imagen: './assets/img/instalacion.jpg',
      titulo: 'Montaje en Techo Técnico',
      descripcion: 'Cubierta protectora sobre instalaciones eléctricas en techos altos.'
    }
  ];

  // Seleccionamos el contenedor del carrusel
  const track = document.getElementById('carousel-track');

  // Generamos los items dinámicamente
  proyectos.forEach(proyecto => {
    const item = document.createElement('div');
    item.classList.add('carousel-item');

    item.innerHTML = `
      <img src="${proyecto.imagen}" alt="${proyecto.titulo}">
      <h3>${proyecto.titulo}</h3>
      <p>${proyecto.descripcion}</p>
    `;

    track.appendChild(item);
  });
});

//? Servicios - instlalacion
function openPopup(imgSrc, caption) {
  document.getElementById('popup-img').src = imgSrc;
  document.getElementById('popup-caption').textContent = caption;
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}











