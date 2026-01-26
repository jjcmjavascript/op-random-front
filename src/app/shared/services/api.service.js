import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    serialize: (params) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => searchParams.append(key, item));
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, value);
        }
      });
      return searchParams.toString();
    },
  },
});

// Interceptor para manejo de errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

/**
 * Obtener líderes aleatorios
 * @param {Object} params - Parámetros de filtrado
 * @param {string[]} [params.expansions] - Expansiones
 * @param {string[]} [params.colors] - Colores
 * @param {number} [params.leaderQuantity=3] - Cantidad de líderes
 * @returns {Promise<import('../types/card.types').Leader[]>}
 */
export const fetchTreeLeaders = async (params = {}) => {
  try {
    const response = await apiClient.get("/cards/tree-leaders", { params });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al obtener líderes"
    );
  }
};

/**
 * Obtener cartas aleatorias
 * @param {Object} params - Parámetros de filtrado
 * @param {string[]} params.leaderColors - Colores del líder
 * @param {string[]} [params.expansions] - Expansiones
 * @param {number} [params.minCost] - Coste mínimo
 * @param {number} [params.maxCost] - Coste máximo
 * @returns {Promise<import('../types/card.types').Card[]>}
 */
export const fetchTreeCards = async (params) => {
  try {
    const response = await apiClient.get("/cards/tree-cards", { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al obtener cartas");
  }
};

/**
 * Generar un mazo completo aleatorio
 * @param {Object} params - Parámetros de filtrado
 * @param {string[]} [params.expansions] - Expansiones excluidas
 * @param {string[]} [params.colors] - Colores excluidos
 * @param {number} [params.minCost] - Coste mínimo
 * @param {number} [params.maxCost] - Coste máximo
 * @param {boolean} [params.omitCharacterWithBlocker] - Omitir personajes con blocker
 * @param {boolean} [params.omitCharacterWithNoEffect] - Omitir personajes sin efecto
 * @param {boolean} [params.omitCharacterWithNoCounter] - Omitir personajes sin counter
 * @returns {Promise<{leader: import('../types/card.types').Leader, cards: import('../types/card.types').Card[], totalCards: number}>}
 */
export const fetchRandomDeck = async (params = {}) => {
  try {
    const response = await apiClient.get("/cards/generate-random-deck", {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error al generar mazo aleatorio"
    );
  }
};

export default apiClient;
