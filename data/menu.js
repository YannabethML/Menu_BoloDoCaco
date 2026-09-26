/* =============================================================
   BOLO DO CACO FÁTIMA, C.A. — Fuente única de contenido
   -------------------------------------------------------------
   Este es el ÚNICO archivo que hay que editar para cambiar
   precios, textos, productos o fotos. No hace falta tocar
   HTML, CSS ni JS.

   Se carga con <script> normal (no fetch) para que el menú
   funcione incluso abriendo index.html con doble clic.
   ============================================================= */

window.MENU = {

  /* ---------------------------------------------------------
     1. DATOS DEL NEGOCIO
     --------------------------------------------------------- */
  site: {
    name: "Bolo do Caco Fátima",
    legal: "C.A.",
    // Eslogan del hero (máx. ~60 caracteres para que no rompa línea en móvil)
    tagline: {
      es: "El sabor de Madeira, en cada evento",
      pt: "O sabor da Madeira, em cada evento"
    },
    kicker: {
      es: "Madeira · Venezuela",
      pt: "Madeira · Venezuela"
    },
    currency: "$",
    instagram: "bolodocacofatima_",
    // ▼ RELLENAR: número con código de país, solo dígitos. Ej: "584121234567"
    //   Si se deja vacío, el botón flotante enlaza a Instagram.
    whatsapp: "",
    // Imagen del hero. null = se usa el fondo de azulejo (queda acabado).
    // Formato: { file: "hero-bolo.jpg", formats: ["avif","webp"] }  ó  "hero-bolo.jpg"
    heroImage: { file: "hero-bolo.jpg", formats: ["avif", "webp"] }
  },

  /* ---------------------------------------------------------
     2. CATEGORÍAS (el orden aquí es el orden en pantalla)
     --------------------------------------------------------- */
  categories: [
    {
      id: "bolo-do-caco",
      hero: true,               // true = sección monográfica con carrusel
      name:    { es: "Bolo do Caco",  pt: "Bolo do Caco" },
      kicker:  { es: "Nuestra especialidad", pt: "A nossa especialidade" },
      tagline: {
        es: "Masa de boniato cocida sobre piedra, como en Madeira.",
        pt: "Massa de batata-doce cozida na pedra, como na Madeira."
      }
    },
    {
      id: "docaria",
      name:    { es: "Doçaria",  pt: "Doçaria" },
      kicker:  { es: "Dulces de la casa", pt: "Doces da casa" },
      tagline: {
        es: "Los dulces que acompañan a cualquier hora del día.",
        pt: "Os doces que acompanham a qualquer hora do dia."
      }
    }
  ],

  /* ---------------------------------------------------------
     3. PRODUCTOS
         price    → número, sin símbolo
         badges   → "estrella" | "mas-vendido" | "novedad" | "tradicional" | "vegetariano"
         image    → null, "archivo.jpg", ó { file:"archivo.jpg", formats:["avif","webp"] }
     --------------------------------------------------------- */
  products: [

    /* ---- Bolo do Caco ---- */
    {
      id: "bolo-natural",
      category: "bolo-do-caco",
      price: 3,
      badges: ["tradicional"],
      image: { file: "bolo-natural.jpg", formats: ["avif", "webp"] },
      name: { es: "Bolo do Caco Grande", pt: "Bolo do Caco Grande" },
      short: {
        es: "El clásico, tal cual sale de la piedra.",
        pt: "O clássico, tal como sai da pedra."
      },
      long: {
        es: "Masa de boniato cocida sobre piedra caliente: dorado y crujiente por fuera, tierno y esponjoso por dentro. Sin nada encima, para acompañar lo que quieras.",
        pt: "Massa de batata-doce cozida na pedra quente: dourado e crocante por fora, fofo e macio por dentro. Sem nada por cima, para acompanhar o que quiser."
      }
    },
    {
      id: "bolo-ajo",
      category: "bolo-do-caco",
      price: 5,
      badges: ["estrella"],
      image: { file: "bolo-ajo.jpg", formats: ["avif", "webp"] },
      name: {
        es: "Bolo do Caco con Margarina de Ajo y Perejil",
        pt: "Bolo do Caco com Margarina de Alho e Salsa"
      },
      short: {
        es: "El de siempre: ajo, perejil y mucha mantequilla.",
        pt: "O de sempre: alho, salsa e muita margarina."
      },
      long: {
        es: "Abierto en caliente y untado generosamente con margarina de ajo y perejil, que se derrite dentro del pan. El bocado que define la casa.",
        pt: "Aberto ainda quente e generosamente untado com margarina de alho e salsa, que derrete dentro do pão. A dentada que define a casa."
      }
    },
    {
      id: "bolo-monserratina",
      category: "bolo-do-caco",
      price: 10,
      badges: [],
      image: { file: "bolo-monserratina.jpg", formats: ["avif", "webp"] },
      name: {
        es: "Bolo do Caco con Chorizo Ahumado Monserratina",
        pt: "Bolo do Caco com Chouriço Fumado Monserratina"
      },
      short: {
        es: "Chorizo ahumado Monserratina, a la plancha.",
        pt: "Chouriço fumado Monserratina, na chapa."
      },
      long: {
        es: "Nuestro bolo do caco relleno de chorizo ahumado Monserratina hecho a la plancha, con su margarina de ajo y perejil. Ahumado, jugoso y contundente.",
        pt: "O nosso bolo do caco recheado com chouriço fumado Monserratina feito na chapa, com a sua margarina de alho e salsa. Fumado, suculento e substancial."
      }
    },
    {
      id: "bolo-portugues",
      category: "bolo-do-caco",
      price: 14,
      badges: [],
      image: { file: "bolo-portugues.jpg", formats: ["avif", "webp"] },
      name: {
        es: "Bolo do Caco con Chorizo Portugués",
        pt: "Bolo do Caco com Chouriço Português"
      },
      short: {
        es: "Chorizo portugués, el relleno más pedido de la mesa.",
        pt: "Chouriço português, o recheio mais pedido da mesa."
      },
      long: {
        es: "Chorizo portugués a la plancha dentro del bolo do caco recién hecho, con margarina de ajo y perejil. Sabor a fiesta de romaria.",
        pt: "Chouriço português na chapa dentro do bolo do caco acabado de fazer, com margarina de alho e salsa. Sabor a festa de romaria."
      }
    },

    /* ---- Doçaria ---- */
    {
      id: "bolo-nutella",
      category: "docaria",
      price: 10,
      badges: ["novedad"],
      image: { file: "bolo-nutella.jpg", formats: ["avif", "webp"] },
      name: { es: "Bolo do Caco con Nutella", pt: "Bolo do Caco com Nutella" },
      short: {
        es: "Nuestra piedra, en versión dulce.",
        pt: "A nossa pedra, em versão doce."
      },
      long: {
        es: "El mismo bolo do caco caliente, abierto y relleno de Nutella hasta que se derrite. La versión dulce que se lleva media fila del puesto.",
        pt: "O mesmo bolo do caco quente, aberto e recheado com Nutella até derreter. A versão doce que leva meia fila da banca."
      }
    },
    {
      id: "bolo-de-mel",
      category: "docaria",
      price: 12,
      badges: ["tradicional"],
      image: { file: "bolo-de-mel.jpg", formats: ["avif", "webp"] },
      name: { es: "Bolo de Mel", pt: "Bolo de Mel" },
      short: {
        es: "El bizcocho de miel de caña de Madeira.",
        pt: "O bolo de mel de cana da Madeira."
      },
      long: {
        es: "Bizcocho denso y especiado de miel de caña, el dulce más emblemático de Madeira. Se corta a trozos y se parte con la mano, nunca con cuchillo.",
        pt: "Bolo denso e especiado de mel de cana, o doce mais emblemático da Madeira. Corta-se aos pedaços e parte-se à mão, nunca com faca."
      }
    },
    {
      id: "broas",
      category: "docaria",
      price: 8,
      badges: [],
      image: { file: "broas.jpg", formats: ["avif", "webp"] },
      name: { es: "Galletas Broas", pt: "Broas" },
      short: {
        es: "Galletas portuguesas, para llevar en el bolso.",
        pt: "Bolachas portuguesas, para levar na mala."
      },
      long: {
        es: "Broas caseras, con su miga densa y su punto justo de dulzor. Las de toda la vida, las que se comen de camino a casa.",
        pt: "Broas caseiras, de miolo denso e doçura no ponto. As de sempre, as que se comem no caminho para casa."
      }
    }
  ],

  /* ---------------------------------------------------------
     4. TIRA NARRATIVA (los 3 pasos bajo el carrusel)
     --------------------------------------------------------- */
  story: [
    {
      icon: "dough",
      title: { es: "Masa de boniato", pt: "Massa de batata-doce" },
      text:  { es: "Amasada a mano, sin prisa, como se hace en la isla.",
               pt: "Amassada à mão, sem pressa, como se faz na ilha." }
    },
    {
      icon: "stone",
      title: { es: "Sobre la piedra", pt: "Sobre a pedra" },
      text:  { es: "Cocido en el caco, la piedra basáltica que le da el nombre.",
               pt: "Cozido no caco, a pedra basáltica que lhe dá o nome." }
    },
    {
      icon: "butter",
      title: { es: "Abierto en caliente", pt: "Aberto ainda quente" },
      text:  { es: "Ajo y perejil que se derriten dentro del pan recién hecho.",
               pt: "Alho e salsa que derretem dentro do pão acabado de fazer." }
    }
  ],

  /* ---------------------------------------------------------
     5. TEXTOS DE INTERFAZ
     --------------------------------------------------------- */
  ui: {
    es: {
      langName: "Español",
      menuLabel: "Categorías del menú",
      scroll: "Desliza",
      viewMore: "Ver detalle",
      close: "Cerrar",
      order: "Encargar por WhatsApp",
      orderShort: "Encargar",
      orderIg: "Escríbenos por Instagram",
      eventsKicker: "Dónde encontrarnos",
      eventsChip: "Eventos",
      eventsTitle: "Nos movemos con los eventos",
      eventsText: "No tenemos local fijo: llevamos la piedra a los eventos de la comunidad portuguesa. Escríbenos para encargos o para saber en qué evento estaremos.",
      igLabel: "Síguenos en Instagram",
      badges: {
        estrella: "La estrella",
        "mas-vendido": "Más vendido",
        novedad: "Novedad",
        tradicional: "Tradicional",
        vegetariano: "Vegetariano"
      },
      waProduct: "Hola, quisiera encargar",
      waGeneral: "Hola, quisiera hacer un encargo",
      photoSoon: "Foto en camino",
      priceNote: "Precios en dólares"
    },
    pt: {
      langName: "Português",
      menuLabel: "Categorias do menu",
      scroll: "Deslize",
      viewMore: "Ver detalhe",
      close: "Fechar",
      order: "Encomendar por WhatsApp",
      orderShort: "Encomendar",
      orderIg: "Fale connosco no Instagram",
      eventsKicker: "Onde nos encontrar",
      eventsChip: "Eventos",
      eventsTitle: "Andamos com os eventos",
      eventsText: "Não temos loja fixa: levamos a pedra aos eventos da comunidade portuguesa. Fale connosco para encomendas ou para saber em que evento estaremos.",
      igLabel: "Siga-nos no Instagram",
      badges: {
        estrella: "A estrela",
        "mas-vendido": "Mais vendido",
        novedad: "Novidade",
        tradicional: "Tradicional",
        vegetariano: "Vegetariano"
      },
      waProduct: "Olá, queria encomendar",
      waGeneral: "Olá, queria fazer uma encomenda",
      photoSoon: "Foto a caminho",
      priceNote: "Preços em dólares"
    }
  }
};
