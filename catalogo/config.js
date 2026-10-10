/*
 * CONFIGURACIÓN COMERCIAL — Estudio Abimaru
 * ------------------------------------------
 * Todo lo editable (contacto, precios, planes, redes) vive aquí.
 * Cambia un valor y se refleja en toda la página.
 */
window.SITE_CONFIG = {
  brand: {
    name: "Estudio Abimaru",
    slogan: "Páginas web que venden",
  },

  contact: {
    // Número en formato internacional SIN "+" ni espacios (Colombia = 57 + número).
    whatsapp: "573157076691",
    whatsappDisplay: "315 707 6691",

    // Correo de contacto ACTUAL (funciona). PENDIENTE del propietario: se
    // recomienda migrar a un correo de marca, por ejemplo:
    //   estudioabimaru@gmail.com · contacto.abimaru@gmail.com
    //   hola@estudioabimaru.com  · contacto@estudioabimaru.com
    // No cambiar sin confirmar; actualízalo aquí cuando esté definido.
    email: "Abimaru@gmail.com",
  },

  // El enlace al repositorio se oculta del sitio (foco comercial).
  // El repo sigue público solo porque GitHub Pages gratuito lo requiere.
  showRepoLink: false,
  repositoryUrl: "https://github.com/Abimaru/web-pages-templates",

  social: {
    // Deja en "" lo que no exista todavía; solo se muestra lo que tenga valor.
    instagram: "",
    linkedin: "",
    facebook: "",
  },

  pricing: {
    currency: "COP",
    // Precios REFERENCIALES y fácilmente editables. Sujetos al alcance real.
    note: "Precios de referencia en COP. El valor final depende del alcance, contenido e integraciones.",
    maintenanceFrom: "$150.000 / mes",
    // Plazo de entrega que se muestra en el hero (ej: "entrega en 2 a 3 semanas").
    // Déjalo "" hasta confirmarlo: solo se muestra si tiene valor.
    leadTime: "",
    plans: [
      {
        id: "esencial",
        name: "Página Esencial",
        priceLabel: "Desde $800.000 COP",
        rangeLabel: "Rango $800.000 – $1.200.000",
        priceMin: 800000, priceMax: 1200000,
        tagline: "Ideal para presentar tu negocio y recibir clientes por WhatsApp.",
        featured: false,
        features: [
          "Adaptación de una plantilla a tu marca",
          "Logo, colores, textos e imágenes",
          "Secciones informativas",
          "Botón de WhatsApp",
          "Formulario de contacto",
          "Diseño responsivo",
          "Publicación inicial",
          "Una ronda de ajustes",
        ],
      },
      {
        id: "catalogo",
        name: "Catálogo Comercial",
        priceLabel: "Desde $1.500.000 COP",
        rangeLabel: "Rango $1.500.000 – $2.500.000",
        priceMin: 1500000, priceMax: 2500000,
        tagline: "Muestra tus productos o servicios y recibe pedidos organizados.",
        featured: true,
        badge: "Más recomendado",
        features: [
          "Todo lo de Página Esencial",
          "Catálogo de productos o servicios",
          "Categorías y filtros (cuando apliquen)",
          "Fichas de producto",
          "Carrito de cotización o pedido",
          "Solicitud por WhatsApp",
          "SEO básico + analítica",
          "Capacitación de entrega",
        ],
      },
      {
        id: "tienda",
        name: "Tienda Virtual",
        priceLabel: "Inversión desde $3.500.000 COP",
        rangeLabel: "",
        priceMin: 3500000, priceMax: null, // sin tope: el valor final depende de funciones e integraciones
        tagline: "Vende en línea con carrito, pagos y gestión de pedidos.",
        featured: false,
        note: "El valor final depende de las funcionalidades, integraciones, cantidad de productos y servicios externos requeridos.",
        features: [
          "Catálogo administrable",
          "Carrito de compras",
          "Pasarela de pagos",
          "Gestión de pedidos",
          "Correos transaccionales",
          "Páginas legales",
          "Integraciones necesarias",
          "Soporte inicial",
        ],
      },
    ],
    // Costos que pueden cobrarse por separado (no incluidos por defecto).
    externalCosts: [
      "Dominio",
      "Hosting",
      "Licencias",
      "Pasarela de pagos",
      "Correos corporativos",
      "Servicios externos",
      "Carga masiva de contenido",
      "Mantenimiento mensual",
    ],
  },

  // Calculadora "Calcula tu inversión" (landing). Usa los rangos priceMin/priceMax de los planes.
  // Los PESOS (0 a 1) deciden en qué punto del rango cae el estimado: SON VALORES DE EJEMPLO,
  // ajústalos a tu criterio comercial. Es orientativo; la cotización real la confirma el estudio.
  calculator: {
    note: "Estimado orientativo según los rangos de los planes. El valor final se confirma en la cotización.",
    spread: 0.25, // amplitud del rango mostrado alrededor del punto estimado (0 a 0.5)
    roundTo: 50000, // se redondea a múltiplos de este valor (COP)
    goals: [
      { id: "presencia", label: "Presentar mi negocio y recibir contactos", plan: "esencial" },
      { id: "catalogo", label: "Mostrar productos o servicios y recibir pedidos por WhatsApp", plan: "catalogo" },
      { id: "tienda", label: "Vender y cobrar en línea", plan: "tienda" },
    ],
    sizes: [
      { id: "pequeno", label: "Pequeño", hint: "Hasta 20 productos o servicios", weight: 0 },
      { id: "mediano", label: "Mediano", hint: "De 21 a 100", weight: 0.35 },
      { id: "grande", label: "Grande", hint: "Más de 100", weight: 0.6 },
    ],
    extras: [
      { id: "marca", label: "Diseño de marca a medida (logo, colores, tipografía)", weight: 0.2 },
      { id: "contenido", label: "Ayuda con textos, fotos y carga de contenido", weight: 0.15 },
      { id: "funciones", label: "Funciones especiales (reservas, cuentas de cliente, áreas privadas)", weight: 0.25 },
      { id: "integraciones", label: "Integración con otros sistemas (inventario, facturación…)", weight: 0.2 },
    ],
  },

  // Testimonios REALES. Déjalo vacío hasta tener autorización del cliente:
  // la sección solo aparece cuando hay al menos uno. Formato:
  //   { name: "Daniela V.", business: "Tienda de ropa", text: "Frase real del cliente." }
  // Cómo conseguirlos sin encuestas: al entregar, envía UN mensaje por WhatsApp
  // ("¿Me regalas una frase sobre cómo fue trabajar juntos? Puedo publicarla con tu nombre").
  testimonials: [],

  // Analítica SIN cookies, apagada por defecto. Para activarla elige UNO:
  //   Plausible: { provider: "plausible", id: "tudominio.com" }       (plausible.io o autoalojado con src)
  //   Umami:     { provider: "umami", id: "<website-id>", src: "https://cloud.umami.is/script.js" }
  // Con GitHub Pages el "dominio" es abimaru.github.io (o tu dominio propio cuando lo tengas).
  // No se activa en localhost ni si el visitante envía "No rastrear". Ver catalogo/analytics.js.
  analytics: { provider: "", id: "" },
};
