import React from "react";
import { Box, Button, Typography } from "@mui/material";
import useDeckStore from "../home/store/deck.store";
import { useNavigate } from "react-router-dom";
import { fetchRandomDeck } from "@services/api.service";
import ConfigSection from "@components/ConfigSection/ConfigSection";
import ErrorBanner from "@components/ErrorBanner/ErrorBanner";
import BackButton from "@components/BackButton/BackButton";
import ScreenContainer from "@components/ScreenContainer/ScreenContainer";

const RandomDeckScreen = () => {
  const {
    filters,
    setLoading,
    setError,
    setLeader,
    setDeck,
    isLoading,
    error,
    clearError,
  } = useDeckStore();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        expansions: filters.expansions,
        colors: filters.colors,
        minCost: filters.minCost,
        maxCost: filters.maxCost,
        omitCharacterWithBlocker: filters.omitCharacterWithBlocker,
        omitCharacterWithNoEffect: filters.omitCharacterWithNoEffect,
        omitCharacterWithNoCounter: filters.omitCharacterWithNoCounter,
        omitAlternateArts: filters.omitAlternateArts,
      };

      const deck = await fetchRandomDeck(params);

      setLeader(deck.leader);
      setDeck(deck.cards);
      navigate("/deck-view");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <Box sx={{ mb: 3 }}>
        <BackButton label="Volver" onClick={() => navigate("/")} />
      </Box>

      <Box sx={{ width: "100%", mx: "auto", maxWidth: "90vw" }}>
        <Typography
          sx={{
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
            textAlign: "center",
            color: "var(--op-red)",
            mb: 2,
            fontFamily: '"Bangers", cursive',
            letterSpacing: 2,
            textShadow:
              "0 0 20px rgba(214, 58, 47, 0.8), 0 0 40px rgba(214, 58, 47, 0.5)",
          }}
        >
          {"\uD83C\uDFB2"} Deck Aleatorio
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: "var(--op-cream)",
            fontSize: { xs: "1rem", md: "1.1rem" },
            mb: 4,
            opacity: 0.9,
          }}
        >
          Genera un mazo completo al instante con configuración personalizada
        </Typography>

        <ErrorBanner message={error} onClose={clearError} />

        <Button
          onClick={handleGenerate}
          disabled={isLoading}
          sx={{
            width: "100%",
            maxWidth: 400,
            mx: "auto",
            display: "block",
            mt: 4,
            mb: 4,
            background:
              "linear-gradient(135deg, var(--op-red) 0%, var(--op-red-dark) 100%)",
            border: "3px solid var(--op-red)",
            color: "#fff",
            py: 2.5,
            px: 5,
            borderRadius: 4,
            fontFamily: '"Bangers", cursive',
            fontSize: { xs: "1.3rem", md: "1.8rem" },
            letterSpacing: 2,
            cursor: "pointer",
            transition: "all 0.4s ease",
            boxShadow: "0 8px 30px rgba(214, 58, 47, 0.4)",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 12px 40px rgba(214, 58, 47, 0.6)",
              background:
                "linear-gradient(135deg, var(--op-red-light) 0%, var(--op-red) 100%)",
            },
            "&:disabled": {
              opacity: 0.6,
            },
          }}
        >
          {isLoading ? "Generando..." : "Generar Deck \uD83C\uDFB2"}
        </Button>

        <ConfigSection />
      </Box>
    </ScreenContainer>
  );
};

export default RandomDeckScreen;
