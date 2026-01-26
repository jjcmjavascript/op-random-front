import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, Paper, Typography } from "@mui/material";
import LeaderCard from "./LeaderCard";

const TierRow = ({ tier, cards }) => {
  const { setNodeRef } = useDroppable({
    id: `tier-${tier.id}`,
  });

  return (
    <Paper
      sx={{
        background:
          "linear-gradient(135deg, rgba(16, 37, 68, 0.95) 0%, rgba(11, 26, 51, 0.95) 100%)",
        display: "flex",
        borderRadius: 2,
        overflow: "hidden",
        border: "2px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Box
        sx={{
          width: 80,
          background: tier.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            color: "#000",
            fontSize: "2.5rem",
            fontWeight: "bold",
            fontFamily: '"Bangers", cursive',
          }}
        >
          {tier.label}
        </Typography>
      </Box>
      <Box
        ref={setNodeRef}
        sx={{
          flex: 1,
          p: 2,
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          minHeight: 120,
          alignItems: "center",
        }}
      >
        <SortableContext
          items={cards.map((card) => card.cardId)}
          strategy={horizontalListSortingStrategy}
        >
          {cards.map((card) => (
            <LeaderCard key={card.cardId} card={card} />
          ))}
        </SortableContext>
      </Box>
    </Paper>
  );
};

export default TierRow;
