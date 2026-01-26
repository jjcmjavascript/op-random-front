import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useDeckStore from "../store/deck.store";
import MainButton from "./MainButton";

const ModeSelector = () => {
  const navigate = useNavigate();
  const { setLoading, setError, resetDeck } = useDeckStore();

  const handleManualMode = () => {
    resetDeck();
    navigate("/manual-mode");
  };

  const handleRandomMode = () => {
    resetDeck();
    navigate("/random-deck");
  };

  const handleTournamentMode = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implementar lógica de torneo aleatorio
      navigate("/tournament");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", px: 2, py: 5 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: { xs: 2.5, md: 5 },
          width: "100%",
          maxWidth: 900,
        }}
      >
        <MainButton
          icon="🎯"
          title="Modo Selección"
          description="Construye tu mazo carta por carta"
          variant="manual"
          onClick={handleManualMode}
        />

        <MainButton
          icon="🎲"
          title="Deck Aleatorio"
          description="Genera un mazo completo al instante"
          variant="random"
          onClick={handleRandomMode}
        />

        <MainButton
          icon="🏆"
          title="Torneo Aleatorio"
          description="Genera múltiples mazos para torneo"
          variant="tournament"
          onClick={handleTournamentMode}
        />
      </Box>
    </Box>
  );
};

export default ModeSelector;
