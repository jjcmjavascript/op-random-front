import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Slider,
  Typography,
} from "@mui/material";
import useDeckStore from "@/app/modules/home/store/deck.store";
import { CARD_COLORS, EXPANSIONS } from "@types/card.types";

const colorMap = {
  red: "var(--op-red)",
  blue: "var(--op-blue)",
  green: "#3a7d44",
  purple: "#6f4aa8",
  black: "#9aa0a6",
  yellow: "var(--op-gold)",
};

const FilterSection = () => {
  const { filters, updateFilter } = useDeckStore();

  const handleExpansionChange = (expansion) => {
    const current = filters.expansions || [];
    const updated = current.includes(expansion)
      ? current.filter((e) => e !== expansion)
      : [...current, expansion];
    updateFilter("expansions", updated);
  };

  const handleColorChange = (color) => {
    const current = filters.colors || [];
    const updated = current.includes(color)
      ? current.filter((c) => c !== color)
      : [...current, color];
    updateFilter("colors", updated);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "rgba(16, 37, 68, 0.6)",
        border: "2px solid var(--op-ink)",
        borderRadius: 4,
        p: { xs: 2, sm: 2.5, md: 3.5 },
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* <Typography
        sx={{
          color: "var(--op-gold)",
          fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
          textAlign: "center",
          mb: { xs: 2, md: 3 },
          fontFamily: '"Bangers", cursive',
          letterSpacing: 2,
          textShadow: "0 0 15px rgba(244, 197, 66, 0.6)",
        }}
      >
        {"\u2699\uFE0F"} Configuración
      </Typography> */}

      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            color: "var(--op-gold)",
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
            mb: 2,
            fontWeight: 600,
          }}
        >
          {"\uD83C\uDFA8"} Colores (deshabilitar)
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 1.5,
          }}
        >
          {Object.values(CARD_COLORS).map((color) => {
            const colorKey = color.toLowerCase();
            return (
              <Box
                key={color}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 1.5,
                  py: 1,
                  backgroundColor: "rgba(15, 42, 77, 0.5)",
                  borderRadius: 2,
                  border: "1px solid var(--op-blue)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(15, 42, 77, 0.8)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <Checkbox
                  checked={filters.colors?.includes(color) || false}
                  onChange={() => handleColorChange(color)}
                  sx={{
                    color: "var(--op-cream)",
                    "&.Mui-checked": {
                      color: colorMap[colorKey] || "var(--op-cream)",
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: colorMap[colorKey] || "#fff",
                  }}
                >
                  {color}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 1.5,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.omitCharacterWithBlocker}
                onChange={(e) =>
                  updateFilter("omitCharacterWithBlocker", e.target.checked)
                }
                sx={{ color: "var(--op-cream)" }}
              />
            }
            label="Omitir personajes con Blocker"
            sx={{
              color: "var(--op-cream)",
              px: 1,
              py: 1,
              borderRadius: 2,
              backgroundColor: "rgba(15, 42, 77, 0.3)",
              "&:hover": {
                backgroundColor: "rgba(15, 42, 77, 0.5)",
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.omitCharacterWithNoEffect}
                onChange={(e) =>
                  updateFilter("omitCharacterWithNoEffect", e.target.checked)
                }
                sx={{ color: "var(--op-cream)" }}
              />
            }
            label="Omitir personajes sin efecto"
            sx={{
              color: "var(--op-cream)",
              px: 1,
              py: 1,
              borderRadius: 2,
              backgroundColor: "rgba(15, 42, 77, 0.3)",
              "&:hover": {
                backgroundColor: "rgba(15, 42, 77, 0.5)",
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.omitCharacterWithNoCounter}
                onChange={(e) =>
                  updateFilter("omitCharacterWithNoCounter", e.target.checked)
                }
                sx={{ color: "var(--op-cream)" }}
              />
            }
            label="Omitir personajes sin Counter"
            sx={{
              color: "var(--op-cream)",
              px: 1,
              py: 1,
              borderRadius: 2,
              backgroundColor: "rgba(15, 42, 77, 0.3)",
              "&:hover": {
                backgroundColor: "rgba(15, 42, 77, 0.5)",
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filters.omitAlternateArts}
                onChange={(e) =>
                  updateFilter("omitAlternateArts", e.target.checked)
                }
                sx={{ color: "var(--op-cream)" }}
              />
            }
            label="Omitir artes alternas"
            sx={{
              color: "var(--op-cream)",
              px: 1,
              py: 1,
              borderRadius: 2,
              backgroundColor: "rgba(15, 42, 77, 0.3)",
              "&:hover": {
                backgroundColor: "rgba(15, 42, 77, 0.5)",
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            color: "var(--op-gold)",
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
            mb: 2,
            fontWeight: 600,
          }}
        >
          {"\uD83D\uDCE6"} Expansiones (deshabilitar)
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
            gap: 1.25,
          }}
        >
          {EXPANSIONS.map((exp) => (
            <Button
              key={exp}
              onClick={() => handleExpansionChange(exp)}
              sx={{
                py: 1,
                px: 1,
                borderRadius: 2,
                backgroundColor: filters.expansions?.includes(exp)
                  ? "rgba(244, 197, 66, 0.25)"
                  : "rgba(15, 42, 77, 0.5)",
                border: "1px solid var(--op-blue)",
                color: filters.expansions?.includes(exp)
                  ? "var(--op-gold)"
                  : "var(--op-cream)",
                fontFamily: '"Bangers", cursive',
                fontSize: "0.95rem",
                textTransform: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(15, 42, 77, 0.8)",
                  borderColor: "var(--op-gold)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {exp.toUpperCase()}
            </Button>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography
          sx={{
            color: "var(--op-gold)",
            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
            mb: 2,
            fontWeight: 600,
          }}
        >
          {"\uD83D\uDCB0"} Coste
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <Box>
            <Typography sx={{ color: "var(--op-cream)", mb: 1 }}>
              Mínimo: {filters.minCost}
            </Typography>
            <Slider
              min={0}
              max={10}
              value={filters.minCost}
              onChange={(e, value) =>
                updateFilter("minCost", Array.isArray(value) ? value[0] : value)
              }
              sx={{
                color: "var(--op-gold)",
                "& .MuiSlider-thumb": {
                  boxShadow: "0 0 10px rgba(244, 197, 66, 0.8)",
                },
              }}
            />
          </Box>
          <Box>
            <Typography sx={{ color: "var(--op-cream)", mb: 1 }}>
              Máximo: {filters.maxCost}
            </Typography>
            <Slider
              min={0}
              max={10}
              value={filters.maxCost}
              onChange={(e, value) =>
                updateFilter("maxCost", Array.isArray(value) ? value[0] : value)
              }
              sx={{
                color: "var(--op-gold)",
                "& .MuiSlider-thumb": {
                  boxShadow: "0 0 10px rgba(244, 197, 66, 0.8)",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSection;
