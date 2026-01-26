import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ErrorBanner = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <Box
      sx={{
        backgroundColor: "rgba(214, 58, 47, 0.9)",
        color: "#fff",
        px: 3,
        py: 2,
        borderRadius: 2,
        mb: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 15px rgba(214, 58, 47, 0.5)",
        animation: `${slideDown} 0.3s ease`,
      }}
    >
      <Typography sx={{ fontWeight: 600 }}>{message}</Typography>
      <IconButton
        onClick={onClose}
        sx={{
          color: "#fff",
          p: 0.5,
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.2)",
            backgroundColor: "transparent",
          },
        }}
      >
        {"\u2715"}
      </IconButton>
    </Box>
  );
};

export default ErrorBanner;
