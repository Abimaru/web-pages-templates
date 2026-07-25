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
    plans: [
      {
        id: "esencial",
        name: "Página Esencial",
        priceLabel: "Desde $800.000 COP",
        rangeLabel: "Rango $800.000 – $1.200.000",
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

  // Analítica: NO activada. Ver instrucciones en el comentario de index.html.
  analytics: { provider: "", id: "" },
};
