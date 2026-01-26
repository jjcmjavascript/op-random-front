import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  pointerWithin,
  getFirstCollision,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, Typography, Paper, Button } from "@mui/material";

// Tus componentes compartidos
import ScreenContainer from "@shared/components/ScreenContainer/ScreenContainer";
import LoadingState from "@shared/components/LoadingState/LoadingState";
import ErrorBanner from "@shared/components/ErrorBanner/ErrorBanner";
import TierRow from "./components/TierRow";
import LeaderCard from "./components/LeaderCard";
import useTierListStore from "./store/tier-list.store";

const TIERS = [
  { id: "S", label: "S", color: "#FF4444" },
  { id: "A", label: "A", color: "#FF8C42" },
  { id: "B", label: "B", color: "#FFD93D" },
  { id: "C", label: "C", color: "#6BCF7F" },
  { id: "F", label: "F", color: "#A8A8FF" },
];

const TierListLeadersScreen = () => {
  const [activeId, setActiveId] = useState(null);

  // Zustand store
  const {
    unranked,
    tierLists,
    isLoading,
    error,
    setLeaders,
    moveCard,
    updateUnranked,
    updateTier,
    setLoading,
    setError,
    clearError,
    resetTierList,
    findContainer,
  } = useTierListStore();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/cards/leaders`,
        );
        if (!response.ok) throw new Error("Error al cargar los líderes");
        const data = await response.json();

        if (
          unranked.length === 0 &&
          Object.values(tierLists).every((tier) => tier.length === 0)
        ) {
          setLeaders(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // --- SOLUCIÓN AL BUG: Detección de colisión personalizada ---
  const customCollisionStrategy = (args) => {
    // 1. Intentar encontrar colisión con puntero (dentro de un contenedor)
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) return pointerCollisions;

    // 2. Si no hay puntero dentro, buscar la colisión más cercana
    return getFirstCollision(pointerCollisions, "id");
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeContainer = findContainer(activeId);
    let overContainer = findContainer(overId);

    // Si pasamos sobre el área vacía del Tier
    if (!overContainer && overId.toString().startsWith("tier-")) {
      overContainer = overId.replace("tier-", "");
    }

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    // Mover la carta entre contenedores
    moveCard(activeId, activeContainer, overContainer);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over.id);

      if (activeContainer === overContainer) {
        // Reordenar dentro del mismo contenedor
        const items =
          activeContainer === "unranked"
            ? unranked
            : tierLists[activeContainer];
        const oldIndex = items.findIndex((i) => i.cardId === active.id);
        const newIndex = items.findIndex((i) => i.cardId === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const reorderedItems = arrayMove(items, oldIndex, newIndex);

          if (activeContainer === "unranked") {
            updateUnranked(reorderedItems);
          } else {
            updateTier(activeContainer, reorderedItems);
          }
        }
      }
    }
    setActiveId(null);
  };

  const activeCard = activeId
    ? [...unranked, ...Object.values(tierLists).flat()].find(
        (c) => c.cardId === activeId,
      )
    : null;

  if (isLoading) return <LoadingState message="Cargando líderes..." />;

  return (
    <ScreenContainer sx={{ py: 4 }}>
      <Box sx={{ maxWidth: 1400, mx: "auto", px: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: "#fff", fontFamily: '"Bangers", cursive' }}
          >
            TIER LIST - LÍDERES
          </Typography>
          <Button
            variant="outlined"
            onClick={resetTierList}
            sx={{
              color: "#f4c542",
              borderColor: "#f4c542",
              "&:hover": {
                borderColor: "#fff",
                color: "#fff",
                background: "rgba(244, 197, 66, 0.1)",
              },
            }}
          >
            Resetear Tiers
          </Button>
        </Box>

        {error && <ErrorBanner message={error} onClose={clearError} />}

        <DndContext
          sensors={sensors}
          collisionDetection={customCollisionStrategy} // USA LA NUEVA ESTRATEGIA
          onDragStart={({ active }) => setActiveId(active.id)}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {TIERS.map((tier) => (
              <TierRow key={tier.id} tier={tier} cards={tierLists[tier.id]} />
            ))}

            <Paper
              sx={{ p: 2, bgcolor: "rgba(16, 37, 68, 0.95)", borderRadius: 2 }}
            >
              <Typography sx={{ color: "#f7f1e1", mb: 2, fontWeight: "bold" }}>
                Sin clasificar
              </Typography>
              <SortableContext
                items={unranked.map((c) => c.cardId)}
                strategy={rectSortingStrategy}
              >
                <Box
                  ref={() => {
                    /* El ref lo maneja el SortableContext internamente o el useDroppable del componente */
                  }}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    minHeight: 100,
                  }}
                >
                  {unranked.map((card) => (
                    <LeaderCard key={card.cardId} card={card} />
                  ))}
                </Box>
              </SortableContext>
            </Paper>
          </Box>

          <DragOverlay>
            {activeCard ? <LeaderCard card={activeCard} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </Box>
    </ScreenContainer>
  );
};

export default TierListLeadersScreen;
