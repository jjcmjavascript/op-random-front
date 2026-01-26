/**
 * @typedef {Object} DeckState
 * @property {'config' | 'leader-select' | 'card-select' | 'deck-view'} mode - Modo actual de la aplicación
 * @property {import('./card.types').Filters} filters - Filtros aplicados
 * @property {import('./card.types').Leader | null} selectedLeader - Líder seleccionado
 * @property {import('./card.types').Card[]} selectedCards - Cartas seleccionadas
 * @property {import('./card.types').Card[]} currentCardOptions - Opciones de cartas actuales (3)
 * @property {import('./card.types').Leader[]} currentLeaderOptions - Opciones de líderes actuales (3)
 * @property {boolean} isLoading - Estado de carga
 * @property {string | null} error - Mensaje de error
 */

/**
 * @typedef {Object} DeckStats
 * @property {Record<string, number>} colorDistribution - Distribución de colores
 * @property {Record<number, number>} costCurve - Curva de costes
 * @property {string[]} archetypes - Arquetipos presentes
 * @property {number} totalCards - Total de cartas
 */

export const APP_MODES = {
  CONFIG: "config",
  LEADER_SELECT: "leader-select",
  CARD_SELECT: "card-select",
  DECK_VIEW: "deck-view",
  TOURNAMENT: "tournament",
};

export const DEFAULT_FILTERS = {
  expansions: ["EB04", "ST29"],
  colors: [],
  minCost: 0,
  maxCost: 10,
  omitCharacterWithBlocker: true,
  omitCharacterWithNoEffect: true,
  omitCharacterWithNoCounter: false,
  omitAlternateArts: true,
  searchText: "",
  leaderQuantity: 3,
};
