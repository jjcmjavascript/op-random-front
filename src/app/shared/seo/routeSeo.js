const SEO_BASE = {
  siteName: "One Piece TCG Builder",
  defaultTitle: "One Piece TCG Builder | Generador de Mazos y Ranking Oficial",
  defaultDescription:
    "Crea mazos competitivos de One Piece Trading Card Game. Generador aleatorio, modo manual, ranking oficial de líderes actualizado y tier list personalizable. Todo para One Piece TCG.",
  keywords:
    "One Piece TCG, One Piece Trading Card Game, deck builder One Piece, generador mazos One Piece, ranking líderes One Piece TCG, tier list One Piece, cartas One Piece, mazo One Piece, deck competitivo, OP01, OP02, OP03, OP04, OP05, OP06, OP07, OP08, OP09, OP10, OP11, OP12, OP13, OP14, Luffy, Zoro, Shanks, Kaido, Enel, expansiones One Piece, builder cartas",
  image: "/og-image.jpg",
  locale: "es_ES",
  twitterCreator: "@itsnotjs",
};

const ROUTE_SEO = [
  {
    match: (pathname) => pathname === "/",
    title: "One Piece TCG Builder | Generador de Mazos, Ranking y Tier List",
    description:
      "Herramienta completa para One Piece Trading Card Game: crea mazos en modo manual o aleatorio con filtros por expansión (OP01-OP14), color y coste. Consulta ranking oficial de líderes y arma tu tier list personalizada.",
    type: "website",
    structuredDataType: "WebApplication",
  },
  {
    match: (pathname) => pathname === "/ranking",
    title:
      "Ranking Oficial de Líderes | One Piece TCG - Win Rate y Estadísticas",
    description:
      "Ranking actualizado de líderes de One Piece Trading Card Game con estadísticas oficiales: win rate, victorias, derrotas y partidas jugadas. Descubre los mejores líderes del meta actual.",
    type: "article",
    structuredDataType: "CollectionPage",
  },
  {
    match: (pathname) => pathname === "/tier-list/leaders",
    title: "Tier List de Líderes One Piece TCG | Crea tu Ranking Personalizado",
    description:
      "Crea y ordena tu tier list personalizada de líderes de One Piece TCG con sistema drag & drop. Clasifica a Luffy, Zoro, Shanks, Kaido, Enel y todos los líderes disponibles según tu criterio.",
    type: "website",
    structuredDataType: "CollectionPage",
  },
  {
    match: (pathname) => pathname === "/manual-mode",
    title:
      "Modo Selección Manual | Construye tu Mazo Carta por Carta - One Piece TCG",
    description:
      "Construye tu mazo de One Piece TCG carta por carta en modo manual. Selecciona tu líder y añade las 50 cartas con filtros por nombre, expansión, color, tipo y coste. Control total sobre tu deck.",
    type: "website",
    structuredDataType: "WebPage",
  },
  {
    match: (pathname) => pathname.startsWith("/manual-mode/leader-select"),
    title: "Seleccionar Líder | Modo Manual - One Piece TCG Builder",
    description:
      "Elige tu líder de One Piece TCG para iniciar la construcción de tu mazo. Explora líderes de todas las expansiones: Luffy, Zoro, Shanks, Kaido, Enel y más. Filtra por color y expansión.",
    type: "website",
    structuredDataType: "WebPage",
  },
  {
    match: (pathname) => pathname.startsWith("/manual-mode/card-select"),
    title: "Seleccionar Cartas | Constructor de Mazo - One Piece TCG",
    description:
      "Selecciona las 50 cartas de tu mazo de One Piece TCG. Sistema de filtros avanzado por color, expansión, tipo, coste y nombre. Visualiza el progreso de construcción en tiempo real.",
    type: "website",
    structuredDataType: "WebPage",
  },
  {
    match: (pathname) =>
      pathname === "/random-deck" || pathname === "/deck-view",
    title: "Generador de Mazos Aleatorios | One Piece TCG Builder",
    description:
      "Genera mazos aleatorios completos de One Piece TCG al instante. Filtra por expansión, color de líder y coste de cartas. Perfecto para experimentar con nuevas combinaciones y estrategias.",
    type: "website",
    structuredDataType: "WebPage",
  },
];

export function resolveRouteSeo(pathname) {
  const routeSeo = ROUTE_SEO.find((entry) => entry.match(pathname));

  return {
    ...SEO_BASE,
    title: routeSeo?.title || SEO_BASE.defaultTitle,
    description: routeSeo?.description || SEO_BASE.defaultDescription,
    type: routeSeo?.type || "website",
    structuredDataType: routeSeo?.structuredDataType || "WebPage",
  };
}
