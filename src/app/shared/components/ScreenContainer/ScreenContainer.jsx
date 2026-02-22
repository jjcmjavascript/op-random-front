import React from "react";
import { Box } from "@mui/material";

const ScreenContainer = ({ className = "", sx, children }) => {
  return (
    <Box
      component="main"
      className={className}
      sx={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, var(--op-navy) 0%, var(--op-deep) 50%, var(--op-ocean) 100%)",
        px: { xs: 1.25, sm: 2, md: 2.5 },
        py: { xs: 2, sm: 2.5, md: 5 },
        overflowX: "hidden",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default ScreenContainer;
