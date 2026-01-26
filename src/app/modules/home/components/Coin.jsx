import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const flip = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(1800deg);
  }
`;

const Coin = () => {
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState("cara");

  const flipCoin = () => {
    if (flipping) return;

    setFlipping(true);

    setTimeout(() => {
      const finalResult = Math.random() < 0.5 ? "cara" : "sello";
      setResult(finalResult);
      setFlipping(false);
    }, 3000);
  };

  const faceRotation =
    result === "cara"
      ? { cara: "rotateY(0deg)", sello: "rotateY(180deg)" }
      : { cara: "rotateY(180deg)", sello: "rotateY(0deg)" };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
      <Box
        onClick={flipCoin}
        sx={{
          width: { xs: 60, sm: 70, md: 80 },
          height: { xs: 60, sm: 70, md: 80 },
          position: "relative",
          cursor: "pointer",
          transformStyle: "preserve-3d",
          transition: "transform 0.2s ease",
          animation: flipping ? `${flip} 3s ease-in-out` : "none",
          pointerEvents: flipping ? "none" : "auto",
          "&:hover": {
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 8px 25px rgba(0, 0, 0, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.3)",
            background: "linear-gradient(145deg, #ffd700, #ffed4e)",
            transform: faceRotation.cara,
          }}
        >
          <Box
            sx={{
              width: "90%",
              height: "90%",
              borderRadius: "50%",
              border: "3px solid rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.85rem" },
                fontWeight: 900,
                color: "var(--op-navy)",
                textShadow: "0 1px 2px rgba(255, 255, 255, 0.5)",
                letterSpacing: 1,
              }}
            >
              CARA
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow:
              "0 8px 25px rgba(0, 0, 0, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.3)",
            background: "linear-gradient(145deg, #c0c0c0, #e8e8e8)",
            transform: faceRotation.sello,
          }}
        >
          <Box
            sx={{
              width: "90%",
              height: "90%",
              borderRadius: "50%",
              border: "3px solid rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.85rem" },
                fontWeight: 900,
                color: "var(--op-navy)",
                textShadow: "0 1px 2px rgba(255, 255, 255, 0.5)",
                letterSpacing: 1,
              }}
            >
              SELLO
            </Typography>
          </Box>
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
        Moneda
      </Typography>
    </Box>
  );
};

export default Coin;
