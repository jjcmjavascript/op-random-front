import { create } from "zustand";
import { persist } from "zustand/middleware";

const TIERS = ["S", "A", "B", "C", "F"];

const useTierListStore = create(
  persist(
    (set, get) => ({
      // Estado
      unranked: [],
      tierLists: {
        S: [],
        A: [],
        B: [],
        C: [],
        F: [],
      },
      isLoading: false,
      error: null,

      // Acciones - Cargar líderes
      setLeaders: (leaders) => set({ unranked: leaders }),

      // Acciones - Mover carta entre tiers
      moveCard: (cardId, fromContainer, toContainer) =>
        set((state) => {
          // Encontrar la carta
          let card = null;
          let updatedUnranked = [...state.unranked];
          let updatedTierLists = { ...state.tierLists };

          // Buscar y remover de origen
          if (fromContainer === "unranked") {
            card = updatedUnranked.find((c) => c.cardId === cardId);
            updatedUnranked = updatedUnranked.filter(
              (c) => c.cardId !== cardId,
            );
          } else {
            card = updatedTierLists[fromContainer]?.find(
              (c) => c.cardId === cardId,
            );
            updatedTierLists = {
              ...updatedTierLists,
              [fromContainer]: updatedTierLists[fromContainer].filter(
                (c) => c.cardId !== cardId,
              ),
            };
          }

          if (!card) return state;

          // Agregar a destino
          if (toContainer === "unranked") {
            updatedUnranked = [...updatedUnranked, card];
          } else {
            updatedTierLists = {
              ...updatedTierLists,
              [toContainer]: [...updatedTierLists[toContainer], card],
            };
          }

          return {
            unranked: updatedUnranked,
            tierLists: updatedTierLists,
          };
        }),

      // Acciones - Reordenar dentro del mismo tier
      reorderInTier: (container, oldIndex, newIndex) =>
        set((state) => {
          if (container === "unranked") {
            const items = [...state.unranked];
            const [movedItem] = items.splice(oldIndex, 1);
            items.splice(newIndex, 0, movedItem);
            return { unranked: items };
          } else {
            const items = [...state.tierLists[container]];
            const [movedItem] = items.splice(oldIndex, 1);
            items.splice(newIndex, 0, movedItem);
            return {
              tierLists: {
                ...state.tierLists,
                [container]: items,
              },
            };
          }
        }),

      // Acciones - Actualizar tier completo
      updateTier: (tierId, cards) =>
        set((state) => ({
          tierLists: {
            ...state.tierLists,
            [tierId]: cards,
          },
        })),

      // Acciones - Actualizar unranked
      updateUnranked: (cards) => set({ unranked: cards }),

      // Acciones - Estado general
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Acciones - Reset
      resetTierList: () =>
        set({
          tierLists: {
            S: [],
            A: [],
            B: [],
            C: [],
            F: [],
          },
        }),

      resetAll: () =>
        set({
          unranked: [],
          tierLists: {
            S: [],
            A: [],
            B: [],
            C: [],
            F: [],
          },
          error: null,
        }),

      // Helper - Encontrar contenedor de una carta
      findContainer: (cardId) => {
        const state = get();

        if (state.unranked.some((c) => c.cardId === cardId)) {
          return "unranked";
        }

        for (const tier of TIERS) {
          if (state.tierLists[tier]?.some((c) => c.cardId === cardId)) {
            return tier;
          }
        }

        return null;
      },

      // Helper - Obtener todas las cartas
      getAllCards: () => {
        const state = get();
        return [...state.unranked, ...Object.values(state.tierLists).flat()];
      },
    }),
    {
      name: "tier-list-storage", // nombre del item en localStorage
      partialize: (state) => ({
        unranked: state.unranked,
        tierLists: state.tierLists,
      }), // solo persistir estos campos
    },
  ),
);

export default useTierListStore;
