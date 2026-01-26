import React from "react";
import { Box, Button, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background:
          "linear-gradient(135deg, var(--op-deep) 0%, var(--op-ocean) 100%)",
        borderTop: "3px solid var(--op-gold)",
        px: { xs: 2, md: 3 },
        py: { xs: 3, md: 2.5 },
        boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 2, md: 3 },
        }}
      >
        <Typography
          sx={{
            color: "var(--op-red)",
            fontSize: { xs: "1rem", md: "1.2rem" },
            fontFamily: '"Bangers", cursive',
            letterSpacing: 1,
            textAlign: "center",
            textShadow: "0 0 10px rgba(214, 58, 47, 0.5)",
          }}
        >
          ¿Te gusta esta app? ¡Apóyame con una donación! ☕
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            width: "100%",
            maxWidth: { xs: 280, md: "none" },
          }}
        >
          <Button
            component="a"
            href="https://paypal.me/itisnotjs"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              px: 3,
              py: 1.25,
              borderRadius: 999,
              textDecoration: "none",
              fontFamily: '"Bangers", cursive',
              fontSize: "1.1rem",
              letterSpacing: 1,
              color: "#fff",
              background: "linear-gradient(135deg, #0070ba 0%, #1546a0 100%)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              border: "2px solid transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #005a95 0%, #103780 100%)",
                borderColor: "var(--op-gold)",
                transform: "translateY(-3px)",
                boxShadow: "0 6px 25px rgba(0, 112, 186, 0.5)",
              },
            }}
          >
            <Box
              component="svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              sx={{ width: 24, height: 24 }}
            >
              <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H7.72a.483.483 0 0 1-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502zm-2.96-5.09c.762.868.983 2.084.66 3.627-.6 3.08-2.676 4.65-5.688 4.65H9.446l-.96 6.068a1.002 1.002 0 0 1-.988.849H3.707a.5.5 0 0 1-.492-.582l1.06-6.725.03-.19h3.743l1.511-9.58a1 1 0 0 1 .988-.848h5.692c1.387 0 2.673.3 3.62.96z" />
            </Box>
            PayPal
          </Button>

          <Button
            component="a"
            href="https://buymeacoffee.com/itisnotjs"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              px: 3,
              py: 1.25,
              borderRadius: 999,
              textDecoration: "none",
              fontFamily: '"Bangers", cursive',
              fontSize: "1.1rem",
              letterSpacing: 1,
              color: "#000",
              background: "linear-gradient(135deg, #ffdd00 0%, #ffa800 100%)",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              border: "2px solid transparent",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #ffcc00 0%, #ff9500 100%)",
                borderColor: "var(--op-gold)",
                transform: "translateY(-3px)",
                boxShadow: "0 6px 25px rgba(255, 221, 0, 0.5)",
              },
            }}
          >
            <Box
              component="svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              sx={{ width: 24, height: 24 }}
            >
              <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z" />
            </Box>
            Buy Me a Coffee
          </Button>
        </Box>

        <Typography
          sx={{
            color: "var(--op-gold)",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
        >
          Made with ❤️ by{" "}
          <Link
            href="https://github.com/itsnotjs-creator"
            target="_blank"
            rel="noopener noreferrer"
            underline="none"
            sx={{
              color: "var(--op-red)",
              fontWeight: "bold",
              transition: "color 0.3s ease",
              "&:hover": {
                color: "var(--op-gold)",
                textShadow: "0 0 10px rgba(244, 197, 66, 0.6)",
              },
            }}
          >
            @itsnotjs
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
