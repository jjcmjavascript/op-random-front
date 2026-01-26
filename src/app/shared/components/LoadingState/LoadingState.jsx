import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingState = ({ message, minHeight = "400px" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2.5,
        minHeight,
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          color: "var(--op-red)",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />
      {message && (
        <Typography sx={{ color: "var(--op-cream)", fontSize: "1.2rem", fontWeight: 600 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingState;
