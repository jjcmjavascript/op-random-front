import React from "react";
import { Box, Typography } from "@mui/material";
import ModeSelector from "../components/ModeSelector";
import Dice from "../components/Dice";
import Coin from "../components/Coin";
import useDeckStore from "../store/deck.store";
import ErrorBanner from "@components/ErrorBanner/ErrorBanner";
import LoadingState from "@components/LoadingState/LoadingState";
import ScreenContainer from "@components/ScreenContainer/ScreenContainer";

const ConfigScreen = () => {
  const { isLoading, error, clearError } = useDeckStore();

  return (
    <ScreenContainer
      sx={{
        minHeight: "60vh",
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 50%, rgba(214, 58, 47, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(244, 197, 66, 0.12) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", position: "relative", zIndex: 1 }}>
        <ErrorBanner message={error} onClose={clearError} />

        {isLoading ? (
          <LoadingState message="Cargando..." />
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 3.75,
              alignItems: "stretch",
              minHeight: "60vh",
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            <Box
              component="aside"
              sx={{
                flexShrink: 0,
                width: { xs: "100%", lg: "20%" },
                minWidth: { lg: 180 },
                maxWidth: { lg: 250 },
                backgroundColor: "rgba(16, 37, 68, 0.6)",
                border: "2px solid var(--op-ink)",
                borderRadius: 4,
                p: { xs: 2, md: 3 },
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
                position: { lg: "sticky" },
                top: { lg: 20 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  color: "var(--op-gold)",
                  fontSize: { xs: "1.1rem", md: "1.4rem" },
                  textAlign: "center",
                  mb: { xs: 2, md: 3 },
                  fontFamily: '"Bangers", cursive',
                  letterSpacing: 2,
                  textShadow: "0 0 15px rgba(244, 197, 66, 0.6)",
                }}
              >
                {"\uD83C\uDFB2"} Tools
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", lg: "column" },
                  alignItems: "center",
                  justifyContent: "center",
                  gap: { xs: 3, md: 4 },
                  flex: 1,
                }}
              >
                <Dice />
                <Coin />
              </Box>
            </Box>

            <Box sx={{ flex: 1, minWidth: 0, minHeight: "60vh" }}>
              <ModeSelector />
            </Box>
          </Box>
        )}
      </Box>
    </ScreenContainer>
  );
};

export default ConfigScreen;
