import React, { useState } from "react";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { MuiImageWithLoader } from "@components/ImageContainer/ImageContainer";
import { useNavigate } from "react-router-dom";
import useDeckStore from "../store/deck.store";
import Toast from "@/app/shared/components/Toast/Toast";
import ScreenContainer from "@components/ScreenContainer/ScreenContainer";

const DeckViewScreen = () => {
  const navigate = useNavigate();
  const { selectedLeader, selectedCards, getDeckStats, resetDeck } =
    useDeckStore();
  const [sortBy, setSortBy] = useState("cost");
  const [showToast, setShowToast] = useState(false);
  const stats = getDeckStats();
  const colorMap = {
    red: "var(--op-red)",
    blue: "var(--op-blue)",
    green: "#3a7d44",
    purple: "#6f4aa8",
    black: "#9aa0a6",
    yellow: "var(--op-gold)",
  };

  const sortedCards = [...selectedCards].sort((a, b) => {
    if (sortBy === "cost") return (a.cost || 0) - (b.cost || 0);
    if (sortBy === "name") return a.name.localeCompare(b.name);

    return 0;
  });

  const handleExport = () => {
    console.log(selectedCards, selectedLeader);
    const groupedById = [selectedLeader, ...selectedCards].reduce(
      (acc, card) => {
        const [cardId] = card.cardId.split("_");

        acc[cardId.trim()] = (acc[cardId.trim()] || 0) + 1;

        return acc;
      },
      {},
    );

    const forOPTCGSim = Object.entries(groupedById).map(([id, count]) =>
      `${count}x${id?.toUpperCase()}`.trim(),
    );
    const dataStr = forOPTCGSim.join("\n");

    console.log("Exported Deck:\n", dataStr, forOPTCGSim.length);
    navigator.clipboard.writeText(dataStr);

    setShowToast(true);
  };

  const handleNewDeck = () => {
    resetDeck();
    navigate("/");
  };

  return (
    <ScreenContainer>
      <Box sx={{ maxWidth: 1600, mx: "auto" }}>
        <Typography
          onClick={handleNewDeck}
          sx={{
            fontSize: { xs: "2.1rem", sm: "2.5rem", md: "3.5rem" },
            textAlign: "center",
            color: "var(--op-red)",
            mb: 4,
            fontFamily: '"Bangers", cursive',
            letterSpacing: 2,
            textShadow: "0 0 20px rgba(214, 58, 47, 0.8)",
            cursor: "pointer",
          }}
        >
          {"\uD83C\uDFC6"} Tu Mazo Completo
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", xl: "300px 1fr 350px" },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          <Box
            component="aside"
            sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(16, 37, 68, 0.8)",
                border: "2px solid var(--op-ink)",
                borderRadius: 3,
                p: 2.5,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Button
                  onClick={handleExport}
                  sx={{
                    px: 2.5,
                    py: 1.75,
                    border: "2px solid var(--op-gold)",
                    borderRadius: 2,
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--op-gold)",
                    backgroundColor: "rgba(244, 197, 66, 0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(244, 197, 66, 0.4)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {"\uD83D\uDCCB"} Exportar Mazo(OPTCGSim)
                </Button>
                <Button
                  onClick={handleNewDeck}
                  sx={{
                    px: 2.5,
                    py: 1.75,
                    border: "2px solid var(--op-red)",
                    borderRadius: 2,
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--op-red)",
                    backgroundColor: "rgba(214, 58, 47, 0.2)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(214, 58, 47, 0.4)",
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  {"\uD83C\uDFB2"} Nuevo Mazo
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                backgroundColor: "rgba(16, 37, 68, 0.8)",
                border: "2px solid var(--op-ink)",
                borderRadius: 3,
                p: 2.5,
              }}
            >
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  sx={{
                    color: "var(--op-gold)",
                    fontSize: "1rem",
                    mb: 1.25,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Colores
                </Typography>
                {Object.entries(stats.colorDistribution).map(
                  ([color, count]) => (
                    <Box
                      key={color}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 1.5,
                        py: 1,
                        backgroundColor: "rgba(15, 42, 77, 0.4)",
                        borderRadius: 1.5,
                        mb: 0.75,
                      }}
                    >
                      <Typography
                        sx={{
                          color:
                            colorMap[color.toLowerCase()] || "var(--op-cream)",
                          fontWeight: 600,
                        }}
                      >
                        {color}
                      </Typography>
                      <Typography
                        sx={{ color: "var(--op-red)", fontWeight: 700 }}
                      >
                        {count}
                      </Typography>
                    </Box>
                  ),
                )}
              </Box>

              <Box>
                <Typography
                  sx={{
                    color: "var(--op-gold)",
                    fontSize: "1rem",
                    mb: 1.25,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  Curva de Costes
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {Object.entries(stats.costCurve)
                    .sort(([a], [b]) => Number(a) - Number(b))
                    .map(([cost, count]) => (
                      <Box
                        key={cost}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "30px 1fr 30px",
                          gap: 1.25,
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "var(--op-cream)",
                            fontWeight: 700,
                            textAlign: "center",
                          }}
                        >
                          {cost}
                        </Typography>
                        <Box
                          sx={{
                            height: 24,
                            backgroundColor: "rgba(15, 42, 77, 0.4)",
                            borderRadius: 1,
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              height: "100%",
                              width: `${
                                (count /
                                  Math.max(...Object.values(stats.costCurve))) *
                                100
                              }%`,
                              background:
                                "linear-gradient(90deg, var(--op-gold), var(--op-red))",
                              transition: "width 0.5s ease",
                            }}
                          />
                        </Box>
                        <Typography
                          sx={{
                            color: "var(--op-red)",
                            fontWeight: 700,
                            textAlign: "center",
                          }}
                        >
                          {count}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            component="main"
            sx={{
              backgroundColor: "rgba(16, 37, 68, 0.8)",
              border: "2px solid var(--op-ink)",
              borderRadius: 3,
              p: { xs: 2, md: 3 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-start", md: "center" },
                justifyContent: "space-between",
                gap: 1.5,
                mb: 2.5,
              }}
            >
              <Typography sx={{ color: "var(--op-red)", fontSize: "1.5rem" }}>
                Cartas del Mazo ({selectedCards.length})
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ color: "var(--op-cream)", fontWeight: 600 }}>
                  Ordenar por:
                </Typography>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{
                    minWidth: 140,
                    color: "var(--op-cream)",
                    backgroundColor: "rgba(15, 42, 77, 0.8)",
                    borderRadius: 1.5,
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "2px solid var(--op-ink)",
                    },
                  }}
                >
                  <MenuItem value="cost">Coste</MenuItem>
                  <MenuItem value="name">Nombre</MenuItem>
                </Select>
              </Box>
            </Box>

            <Box sx={{ overflowX: "auto" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                  gap: 1,
                }}
              >
                {sortedCards.map((card, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      backgroundColor: "rgba(15, 42, 77, 0.5)",
                      border: "2px solid var(--op-ink)",
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      aspectRatio: "2.5 / 3.5",
                      "&:hover": {
                        borderColor: "var(--op-gold)",
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 20px rgba(244, 197, 66, 0.4)",
                      },
                    }}
                  >
                    <MuiImageWithLoader
                      src={card.imgUrl ?? card.imgFullUrl}
                      alt={card.name}
                      width="100%"
                      height="100%"
                      loading="lazy"
                      fetchPriority="low"
                      imgSx={{ objectFit: "contain" }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box
            component="aside"
            sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
          >
            <Box
              sx={{
                backgroundColor: "rgba(16, 37, 68, 0.8)",
                border: "2px solid var(--op-ink)",
                borderRadius: 3,
                p: 2.5,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                {selectedLeader?.imgFullUrl && (
                  <MuiImageWithLoader
                    src={selectedLeader.imgFullUrl}
                    alt={selectedLeader.name}
                    width="100%"
                    height="auto"
                    loading="lazy"
                    fetchPriority="low"
                    sx={{ borderRadius: 2 }}
                    imgSx={{
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Toast
          message="¡Copiado!"
          onClose={() => setShowToast(false)}
          show={showToast}
        />
      </Box>
    </ScreenContainer>
  );
};

export default DeckViewScreen;
