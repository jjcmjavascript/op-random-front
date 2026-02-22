const SEO_BASE = {
  siteName: "One Piece TCG Builder",
  defaultTitle: "One Piece TCG Builder | Generador de mazos",
  defaultDescription:
    "Generador de mazos de One Piece TCG con modos manual y aleatorio, ranking de líderes y creador de tier list.",
  keywords:
    "One Piece TCG, deck builder, generador de mazos, ranking líderes, tier list",
  image: "/vite.svg",
  locale: "es_ES",
};

const ROUTE_SEO = [
  {
    match: (pathname) => pathname === "/",
    title: "One Piece TCG Builder | Inicio",
    description:
      "Crea tu mazo de One Piece TCG en modo manual o aleatorio con filtros por expansión, color y coste.",
    type: "website",
    structuredDataType: "WebApplication",
  },
  {
    match: (pathname) => pathname === "/ranking",
    title: "Ranking de Líderes | One Piece TCG Builder",
    description:
      "Consulta el ranking actualizado de líderes de One Piece TCG con win rate, victorias y partidas.",
    type: "article",
    structuredDataType: "CollectionPage",
  },
  {
    match: (pathname) => pathname === "/tier-list/leaders",
    title: "Tier List de Líderes | One Piece TCG Builder",
    description:
      "Crea y ordena tu tier list de líderes de One Piece TCG con drag & drop.",
    type: "website",
    structuredDataType: "CollectionPage",
  },
  {
    match: (pathname) => pathname === "/manual-mode",
    title: "Modo Selección | One Piece TCG Builder",
    description:
      "Construye tu mazo carta por carta seleccionando líder y cartas disponibles según filtros.",
    type: "website",
    structuredDataType: "WebPage",
  },
  {
    match: (pathname) => pathname.startsWith("/manual-mode/leader-select"),
    title: "Seleccionar Líder | One Piece TCG Builder",
    description:
      "Elige un líder de One Piece TCG para iniciar la construcción de tu mazo.",
    type: "website",
    structuredDataType: "WebPage",
  },
  {
    match: (pathname) => pathname.startsWith("/manual-mode/card-select"),
    title: "Seleccionar Cartas | One Piece TCG Builder",
    description:
      "Selecciona cartas para completar tu mazo de One Piece TCG con vista de progreso.",
    type: "website",
    structuredDataType: "WebPage",
  },
  {
    match: (pathname) =>
      pathname === "/random-deck" || pathname === "/deck-view",
    title: "Deck Aleatorio | One Piece TCG Builder",
    description:
      "Genera un mazo aleatorio de One Piece TCG y revisa su composición final.",
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
