import React from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import { keyframes } from "@mui/material/styles";

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(-20px) scale(1.1);
  }
  50% {
    transform: translateY(0) scale(1);
  }
  75% {
    transform: translateY(-10px) scale(1.05);
  }
`;

const variantStyles = {
  manual: {
    base: "linear-gradient(135deg, rgba(45, 111, 183, 0.25), rgba(16, 37, 68, 0.9))",
    hoverBorder: "var(--op-blue)",
    hoverShadow:
      "0 15px 40px rgba(45, 111, 183, 0.6), 0 0 60px rgba(45, 111, 183, 0.4)",
  },
  random: {
    base: "linear-gradient(135deg, rgba(214, 58, 47, 0.2), rgba(16, 37, 68, 0.9))",
    hoverBorder: "var(--op-red)",
    hoverShadow:
      "0 15px 40px rgba(214, 58, 47, 0.6), 0 0 60px rgba(214, 58, 47, 0.4)",
  },
  tournament: {
    base: "linear-gradient(135deg, rgba(244, 197, 66, 0.2), rgba(16, 37, 68, 0.9))",
    hoverBorder: "var(--op-gold)",
    hoverShadow:
      "0 15px 40px rgba(244, 197, 66, 0.6), 0 0 60px rgba(244, 197, 66, 0.4)",
  },
};

const MainButton = ({ icon, title, description, variant, onClick }) => {
  const styles = variantStyles[variant] || variantStyles.random;

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        position: "relative",
        borderRadius: 4,
        overflow: "hidden",
        minHeight: { xs: 220, md: 200 },
        border: "3px solid var(--op-ink)",
        background: styles.base,
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        width: "100%",
        "&:before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(214, 58, 47, 0.12), rgba(15, 42, 77, 0.12))",
          opacity: 0,
          transition: "opacity 0.4s ease",
        },
        "&:hover": {
          transform: "translateY(-10px) scale(1.05)",
          borderColor: styles.hoverBorder,
          boxShadow: styles.hoverShadow,
        },
        "&:hover:before": {
          opacity: 1,
        },
        "&:active": {
          transform: "translateY(-5px) scale(1.02)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 2.5,
          px: 1.5,
          gap: 2.5,
        }}
      >
        <Typography
          component="span"
          sx={{
            fontSize: { xs: "3.5rem", md: "5rem" },
            animation: `${float} 3s ease-in-out infinite`,
            ".MuiButtonBase-root:hover &": {
              animation: `${bounce} 0.6s ease`,
            },
          }}
        >
          {icon}
        </Typography>
        <Typography
          component="span"
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: 700,
            color: "#fff",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            fontFamily: '"Bangers", cursive',
            letterSpacing: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          component="span"
          sx={{
            fontSize: { xs: "0.9rem", md: "1rem" },
            color: "var(--op-cream)",
            textAlign: "center",
            opacity: 0.9,
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>
      </Box>
    </ButtonBase>
  );
};

export default MainButton;
