import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { MuiImageWithLoader } from "@components/ImageContainer/ImageContainer";
import { useNavigate } from "react-router-dom";
import useDeckStore from "../store/deck.store";
import { MAX_DECK_SIZE } from "@types/card.types";
import { fetchTreeCards } from "@services/api.service";
import ErrorBanner from "@components/ErrorBanner/ErrorBanner";
import LoadingState from "@components/LoadingState/LoadingState";
import BackButton from "@components/BackButton/BackButton";
import ScreenContainer from "@components/ScreenContainer/ScreenContainer";

const CardSelectScreen = () => {
  const navigate = useNavigate();
  const {
    selectedLeader,
    selectedCards,
    currentCardOptions,
    filters,
    addCard,
    setCardOptions,
    setLoading,
    setError,
    isLoading,
    error,
    clearError,
    resetDeck,
  } = useDeckStore();

  const loadCards = async () => {
    if (!selectedLeader) return;

    try {
      setLoading(true);
      clearError();

      const params = {
        leaderColors: selectedLeader.colors,
        expansions: filters.expansions,
        minCost: filters.minCost,
        maxCost: filters.maxCost,
      };

      const cards = await fetchTreeCards(params);
      setCardOptions(cards);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleAddCard = (card) => {
    addCard(card);

    // Si completamos el mazo, ir a vista final
    if (selectedCards.length + 1 >= MAX_DECK_SIZE) {
      navigate("/manual-mode/deck-view");
    } else {
      // Cargar nuevas opciones
      loadCards();
    }
  };

  const handleBackToHome = () => {
    resetDeck();
    navigate("/");
  };

  const progress = ((selectedCards.length / MAX_DECK_SIZE) * 100).toFixed(0);

  const groupArrayById = (arr) => {
    const group = arr.reduce((p, n) => {
      const name = n.name;
      const [id] = n.cardId.split("_");
      const newName = `${id.toString().toLowerCase()} ${name.toLowerCase()}`;
      if (!p[newName]) {
        Object.assign(p, {
          [newName]: {
            name: n.name,
            id: n.id,
            newName,
            count: 1,
          },
        });

        return p;
      }

      p[newName].count += 1;

      return p;
    }, {});

    const toArray = Object.values(group);

    return toArray;
  };

  return (
    <ScreenContainer>
      <BackButton
        label="Volver al Inicio"
        onClick={handleBackToHome}
        sx={{
          position: { xs: "static", md: "fixed" },
          top: { md: 20 },
          right: { md: 80 },
          zIndex: 999,
          mb: { xs: 2, md: 0 },
          display: { xs: "inline-flex", md: "inline-flex" },
        }}
      />

      <Box sx={{ maxWidth: 1600, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2.5,
              mb: 1.25,
              flexWrap: "wrap",
            }}
          >
            {selectedLeader?.imgFullUrl && (
              <Box
                sx={{
                  backgroundColor: "rgba(16, 37, 68, 0.8)",
                  border: "2px solid var(--op-ink)",
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <MuiImageWithLoader
                  src={selectedLeader.imgFullUrl}
                  alt={selectedLeader.name}
                  width="100%"
                  height="100%"
                  imgSx={{
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  sx={{ borderRadius: "50%" }}
                />
              </Box>
            )}
            <Typography
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                color: "var(--op-red)",
                fontFamily: '"Bangers", cursive',
                letterSpacing: 2,
                textShadow: "0 0 20px rgba(214, 58, 47, 0.8)",
              }}
            >
              Construye tu Mazo
            </Typography>
          </Box>

          <Box sx={{ maxWidth: 600, mx: "auto" }}>
            <Box
              sx={{
                width: "100%",
                height: 30,
                backgroundColor: "rgba(16, 37, 68, 0.8)",
                borderRadius: 999,
                overflow: "hidden",
                border: "2px solid var(--op-ink)",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, var(--op-gold), var(--op-red))",
                  transition: "width 0.5s ease",
                  boxShadow: "0 0 20px rgba(214, 58, 47, 0.6)",
                }}
              />
            </Box>
            <Typography
              sx={{
                color: "var(--op-cream)",
                fontSize: "1.2rem",
                fontWeight: 700,
                mt: 1.25,
              }}
            >
              {selectedCards.length} / {MAX_DECK_SIZE} cartas
            </Typography>
          </Box>
        </Box>

        <ErrorBanner message={error} onClose={clearError} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "300px 1fr" },
            gap: { xs: 2, md: 3 },
          }}
        >
          <Box component="aside" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                backgroundColor: "rgba(16, 37, 68, 0.8)",
                border: "2px solid var(--op-ink)",
                borderRadius: 3,
                p: 2.5,
                width: "100%",
              }}
            >
              <Typography sx={{ color: "var(--op-red)", fontSize: "1.1rem", mb: 1.5 }}>
                Cartas Seleccionadas ({selectedCards.length})
              </Typography>

              <Box
                sx={{
                  maxHeight: { xs: 180, lg: 400 },
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {groupArrayById(selectedCards).map((card, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      backgroundColor: "rgba(15, 42, 77, 0.4)",
                      px: 1.5,
                      py: 1,
                      borderRadius: 1.5,
                      display: "flex",
                      gap: 1.25,
                      alignItems: "center",
                      fontSize: "0.85rem",
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "var(--op-red)",
                        color: "#fff",
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontWeight: 700,
                        minWidth: 30,
                        textAlign: "center",
                      }}
                    >
                      {card.count}
                    </Box>
                    <Typography
                      sx={{
                        color: "var(--op-cream)",
                        flex: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "0.85rem",
                      }}
                    >
                      {card.newName.toUpperCase()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box component="main" sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {isLoading ? (
              <LoadingState message="Cargando cartas..." />
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
                  gap: { xs: 2, md: 3 },
                }}
              >
                {currentCardOptions.map((card) => (
                  <Box
                    key={card.id}
                    onClick={() => handleAddCard(card)}
                    sx={{
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "translateY(-8px)" },
                    }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        background:
                          "linear-gradient(135deg, rgba(16, 37, 68, 0.95), rgba(15, 42, 77, 0.95))",
                        border: "3px solid var(--op-ink)",
                        borderRadius: 3,
                        overflow: "hidden",
                        transition: "all 0.4s ease",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.5)",
                        minHeight: 360,
                        aspectRatio: "2.5 / 3.5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": {
                          borderColor: "var(--op-gold)",
                          boxShadow: "0 12px 40px rgba(244, 197, 66, 0.6)",
                        },
                        "&:hover .add-overlay": {
                          opacity: 1,
                        },
                      }}
                    >
                      {card.imgFullUrl && (
                        <MuiImageWithLoader
                          src={card.imgFullUrl}
                          alt={card.name}
                          width="100%"
                          height="100%"
                          loading="lazy"
                          fetchPriority="low"
                          imgSx={{ objectFit: "contain" }}
                        />
                      )}
                      <Box
                        className="add-overlay"
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(244, 197, 66, 0.95)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "1.4rem", md: "1.8rem" },
                            color: "#fff",
                            fontWeight: 700,
                            fontFamily: '"Bangers", cursive',
                            letterSpacing: 2,
                          }}
                        >
                          + AÑADIR
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default CardSelectScreen;
