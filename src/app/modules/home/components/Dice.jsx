import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const roll = keyframes`
  0% {
    transform: rotate(0deg) scale(1);
  }
  25% {
    transform: rotate(180deg) scale(1.1);
  }
  50% {
    transform: rotate(360deg) scale(1);
  }
  75% {
    transform: rotate(540deg) scale(1.1);
  }
  100% {
    transform: rotate(720deg) scale(1);
  }
`;

const dotPositions = {
  "top-left": { top: "15%", left: "15%" },
  "top-right": { top: "15%", right: "15%" },
  "middle-left": { top: "50%", left: "15%", transform: "translateY(-50%)" },
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  "middle-right": { top: "50%", right: "15%", transform: "translateY(-50%)" },
  "bottom-left": { bottom: "15%", left: "15%" },
  "bottom-right": { bottom: "15%", right: "15%" },
};

const Dice = () => {
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(6);

  const rollDice = () => {
    if (rolling) return;

    setRolling(true);

    let count = 0;
    const interval = setInterval(() => {
      setResult(Math.floor(Math.random() * 6) + 1);
      count++;
      if (count > 10) {
        clearInterval(interval);
      }
    }, 100);

    setTimeout(() => {
      const finalResult = Math.floor(Math.random() * 6) + 1;
      setResult(finalResult);
      setRolling(false);
    }, 1200);
  };

  const getDots = (num) => {
    const positions = {
      1: ["center"],
      2: ["top-left", "bottom-right"],
      3: ["top-left", "center", "bottom-right"],
      4: ["top-left", "top-right", "bottom-left", "bottom-right"],
      5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
      6: [
        "top-left",
        "top-right",
        "middle-left",
        "middle-right",
        "bottom-left",
        "bottom-right",
      ],
    };
    return positions[num] || [];
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
      <Box
        onClick={rollDice}
        sx={{
          width: { xs: 60, sm: 70, md: 80 },
          height: { xs: 60, sm: 70, md: 80 },
          background: "linear-gradient(145deg, #ffffff, #e0e0e0)",
          borderRadius: 3,
          cursor: "pointer",
          boxShadow:
            "0 6px 20px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.8)",
          transition: "transform 0.2s ease",
          position: "relative",
          animation: rolling ? `${roll} 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)` : "none",
          pointerEvents: rolling ? "none" : "auto",
          "&:hover": {
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        <Box sx={{ width: "100%", height: "100%", position: "relative", p: 1.25 }}>
          {getDots(result).map((position, idx) => (
            <Box
              key={idx}
              sx={{
                width: { xs: 10, sm: 12, md: 14 },
                height: { xs: 10, sm: 12, md: 14 },
                backgroundColor: "var(--op-navy)",
                borderRadius: "50%",
                position: "absolute",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.3)",
                ...dotPositions[position],
              }}
            />
          ))}
        </Box>
      </Box>
      <Typography
        sx={{
          color: "var(--op-cream)",
          fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.9rem" },
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Dado
      </Typography>
    </Box>
  );
};

export default Dice;
