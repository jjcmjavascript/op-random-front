import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Box } from "@mui/material";

const LeaderCard = ({ card, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: card.cardId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        width: 70,
        height: 100,
        cursor: "grab",
        "&:active": {
          cursor: "grabbing",
        },
      }}
    >
      <Box
        component="img"
        src={card.imgUrl}
        alt={card.name}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: 1,
          border: "2px solid rgba(244, 197, 66, 0.5)",
          boxShadow: isDragging
            ? "0 8px 16px rgba(0, 0, 0, 0.5)"
            : "0 2px 8px rgba(0, 0, 0, 0.3)",
          transition: "all 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            border: "2px solid var(--op-gold)",
          },
        }}
      />
    </Box>
  );
};

export default LeaderCard;
