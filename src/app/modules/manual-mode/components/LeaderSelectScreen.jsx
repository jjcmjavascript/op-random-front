import React from "react";
import { Box, Typography } from "@mui/material";
import { MuiImageWithLoader } from "@components/ImageContainer/ImageContainer";
import { useNavigate } from "react-router-dom";
import useDeckStore from "@modules/home/store/deck.store";
import LoadingState from "@components/LoadingState/LoadingState";
import BackButton from "@components/BackButton/BackButton";
import ScreenContainer from "@components/ScreenContainer/ScreenContainer";

const LeaderSelectScreen = () => {
  const navigate = useNavigate();
  const { currentLeaderOptions, setLeader, isLoading, resetDeck } =
    useDeckStore();

  const handleSelectLeader = (leader) => {
    setLeader(leader);
    navigate("/manual-mode/card-select");
  };

  const handleBackToHome = () => {
    resetDeck();
    navigate("/");
  };

  if (isLoading) {
    return <LoadingState message="Cargando líderes..." minHeight="100vh" />;
  }

  return (
    <ScreenContainer>
      <Box sx={{ mb: 3 }}>
        <BackButton label="Volver al Inicio" onClick={handleBackToHome} />
      </Box>

      <Box sx={{ maxWidth: 1400, mx: "auto" }}>
        <Typography
          component="h1"
          onClick={handleBackToHome}
          sx={{
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            textAlign: "center",
            color: "var(--op-red)",
            mb: 2,
            fontFamily: '"Bangers", cursive',
            letterSpacing: 2,
            textShadow: "0 0 20px rgba(214, 58, 47, 0.8)",
            cursor: "pointer",
          }}
        >
          {"\uD83D\uDC51"} Elige tu Líder
        </Typography>
        <Typography
          sx={{
            textAlign: "center",
            color: "var(--op-cream)",
            fontSize: { xs: "1rem", md: "1.2rem" },
            mb: { xs: 4, md: 7.5 },
            opacity: 0.9,
          }}
        >
          Selecciona tu líder
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: { xs: 2, md: 5 },
            px: { xs: 0, md: 2.5 },
            justifyItems: "center",
          }}
        >
          {currentLeaderOptions.map((leader) => (
            <Box
              key={leader.id}
              onClick={() => handleSelectLeader(leader)}
              sx={{
                width: "100%",
                maxWidth: 360,
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  background:
                    "linear-gradient(135deg, rgba(16, 37, 68, 0.95), rgba(15, 42, 77, 0.95))",
                  border: "3px solid var(--op-ink)",
                  borderRadius: 4,
                  overflow: "hidden",
                  transition: "all 0.4s ease",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  minHeight: { xs: "auto", md: 480 },
                  aspectRatio: "2.5 / 3.5",
                  "&:hover": {
                    borderColor: "var(--op-red)",
                    boxShadow: "0 15px 50px rgba(214, 58, 47, 0.6)",
                  },
                  "&:hover .leader-overlay": {
                    opacity: 1,
                  },
                }}
              >
                {leader.imgFullUrl && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                      background: "rgba(10, 20, 40, 0.6)",
                      zIndex: 0,
                    }}
                  >
                    <MuiImageWithLoader
                      src={leader.imgFullUrl}
                      alt={leader.name}
                      width="100%"
                      height="100%"
                      loading="lazy"
                      fetchPriority="low"
                      imgSx={{ objectFit: "contain", opacity: 0.9 }}
                    />
                  </Box>
                )}

                <Box
                  className="leader-overlay"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(214, 58, 47, 0.95)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "2rem",
                      color: "#fff",
                      fontWeight: 700,
                      fontFamily: '"Bangers", cursive',
                      letterSpacing: 2,
                      textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {"\u2728"} SELECCIONAR
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </ScreenContainer>
  );
};

export default LeaderSelectScreen;
