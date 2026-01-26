import React from "react";
import { Button } from "@mui/material";

const BackButton = ({ label = "Volver", onClick, className = "", sx }) => {
  return (
    <Button
      type="button"
      className={className}
      onClick={onClick}
      sx={{
        position: "absolute",
        backgroundColor: "rgba(16, 37, 68, 0.8)",
        border: "2px solid",
        borderColor: "var(--op-red)",
        color: "var(--op-red)",
        px: 2.5,
        py: 1.25,
        borderRadius: 2,
        fontFamily: '"Bangers", cursive',
        fontSize: "1.1rem",
        textTransform: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(214, 58, 47, 0.2)",
          borderColor: "var(--op-red)",
          boxShadow: "0 0 20px rgba(214, 58, 47, 0.4)",
          transform: "translateX(-5px)",
        },
        ...sx,
      }}
    >
      {"\u2190"} {label}
    </Button>
  );
};

export default BackButton;
