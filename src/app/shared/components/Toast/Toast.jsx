import React from "react";
import { Alert, Snackbar } from "@mui/material";

const Toast = ({ show, message, onClose, duration = 3000 }) => {
  return (
    <Snackbar
      open={show}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        sx={{
          background:
            "linear-gradient(135deg, var(--op-gold) 0%, var(--op-gold-dark) 100%)",
          color: "#fff",
          fontWeight: 600,
          borderRadius: 2,
          px: 2,
          py: 1.5,
          boxShadow: "0 8px 24px rgba(244, 197, 66, 0.45)",
          border: "2px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
