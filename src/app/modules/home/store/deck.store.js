import { create } from "zustand";
import { persist } from "zustand/middleware";
import { APP_MODES, DEFAULT_FILTERS } from "@types/deck.types";
import { MAX_DECK_SIZE } from "@types/card.types";

const useDeckStore = create(
  persist(
    (set, get) => ({
      // Estado
      mode: APP_MODES.CONFIG,
      filters: { ...DEFAULT_FILTERS },
      selectedLeader: null,
      selectedCards: [],
      currentCardOptions: [],
      currentLeaderOptions: [],
      isLoading: false,
      error: null,

      // Acciones - Navegación
      setMode: (mode) => set({ mode }),

      // Acciones - Filtros
      setFilters: (filters) => set({ filters }),
      updateFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
      resetFilters: () => set({ filters: { ...DEFAULT_FILTERS } }),

      // Acciones - Líder
      setLeader: (leader) => set({ selectedLeader: leader }),
      setLeaderOptions: (leaders) => set({ currentLeaderOptions: leaders }),

      // Acciones - Cartas
      addCard: (card) =>
        set((state) => {
          if (state.selectedCards.length >= MAX_DECK_SIZE) {
            return { error: "Mazo completo: máximo 50 cartas" };
          }

          // Verificar límite de copias (4 por carta)
          const cardCount = state.selectedCards.filter(
            (c) => c.id === card.id
          ).length;
          if (cardCount >= 4) {
            return { error: `Máximo 4 copias de "${card.name}"` };
          }

          return {
            selectedCards: [...state.selectedCards, card],
            error: null,
          };
        }),

      removeCard: (cardId, index) =>
        set((state) => ({
          selectedCards: state.selectedCards.filter((_, i) => i !== index),
        })),

      setCardOptions: (cards) => set({ currentCardOptions: cards }),

      setDeck: (cards) => set({ selectedCards: cards }),

      // Acciones - Estado general
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Acciones - Reset
      resetDeck: () =>
        set({
          mode: APP_MODES.CONFIG,
          selectedLeader: null,
          selectedCards: [],
          currentCardOptions: [],
          currentLeaderOptions: [],
          error: null,
        }),

      // Helpers - Estadísticas
      getDeckStats: () => {
        const state = get();
        const cards = state.selectedCards;

        // Distribución de colores
        const colorDistribution = {};
        cards.forEach((card) => {
          card.colors?.forEach((color) => {
            colorDistribution[color] = (colorDistribution[color] || 0) + 1;
          });
        });

        // Curva de costes
        const costCurve = {};
        cards.forEach((card) => {
          const cost = card.cost || 0;
          costCurve[cost] = (costCurve[cost] || 0) + 1;
        });

        return {
          colorDistribution,
          costCurve,
          totalCards: cards.length,
        };
      },

      // Helper - Verificar si el mazo está completo
      isDeckComplete: () => {
        const state = get();
        return (
          state.selectedLeader && state.selectedCards.length === MAX_DECK_SIZE
        );
      },
    }),
    {
      name: "deck-builder-storage",
      partialize: (state) => ({
        filters: state.filters,
        // No persistimos el deck completo para empezar siempre fresco
      }),
    }
  )
);

export default useDeckStore;
