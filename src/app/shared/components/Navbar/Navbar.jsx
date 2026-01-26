import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const pages = [
  { name: "Inicio", path: "/" },
  { name: "Ranking", path: "/ranking" },
  {
    name: "Crear Tier",
    path: "/tier-list/leaders",
  },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElTierList, setAnchorElTierList] = useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenTierListMenu = (event) => {
    setAnchorElTierList(event.currentTarget);
  };

  const handleCloseTierListMenu = () => {
    setAnchorElTierList(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavMenu();
    handleCloseTierListMenu();
  };

  return (
    <AppBar
      position="static"
      sx={{
        background:
          "linear-gradient(135deg, var(--op-deep) 0%, var(--op-ocean) 100%)",
        borderBottom: "3px solid var(--op-gold)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo - Desktop */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: '"Bangers", cursive',
              letterSpacing: 2,
              color: "var(--op-gold)",
              textShadow: "0 0 10px rgba(244, 197, 66, 0.5)",
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/")}
          >
            ⚔️ ONE PIECE TCG BUILDER
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  background: "var(--op-ocean)",
                  borderRadius: 2,
                  mt: 1,
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => (page.path ? handleNavigate(page.path) : null)}
                  sx={{
                    "&:hover": {
                      background: "rgba(244, 197, 66, 0.1)",
                    },
                  }}
                >
                  <Typography textAlign="center" sx={{ color: "#f7f1e1" }}>
                    {page.name}
                  </Typography>
                  {page.subMenu &&
                    page.subMenu.map((subItem) => (
                      <MenuItem
                        key={subItem.name}
                        onClick={() => handleNavigate(subItem.path)}
                        sx={{
                          pl: 4,
                          "&:hover": {
                            background: "rgba(244, 197, 66, 0.1)",
                          },
                        }}
                      >
                        <Typography
                          sx={{ color: "#f7f1e1", fontSize: "0.9rem" }}
                        >
                          {subItem.name}
                        </Typography>
                      </MenuItem>
                    ))}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo - Mobile */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: '"Bangers", cursive',
              letterSpacing: 1,
              color: "var(--op-gold)",
              textShadow: "0 0 10px rgba(244, 197, 66, 0.5)",
              fontSize: { xs: "1rem", sm: "1.2rem" },
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("/")}
          >
            ⚔️ ONE PIECE TCG BUILDER
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) =>
              page.subMenu ? (
                <Box key={page.name}>
                  <Button
                    onClick={handleOpenTierListMenu}
                    endIcon={<ExpandMoreIcon />}
                    sx={{
                      my: 2,
                      color: "#f7f1e1",
                      display: "block",
                      fontWeight: 600,
                      "&:hover": {
                        color: "var(--op-gold)",
                        background: "rgba(244, 197, 66, 0.1)",
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                  <Menu
                    anchorEl={anchorElTierList}
                    open={Boolean(anchorElTierList)}
                    onClose={handleCloseTierListMenu}
                    sx={{
                      "& .MuiPaper-root": {
                        background: "var(--op-ocean)",
                        borderRadius: 2,
                        mt: 1,
                      },
                    }}
                  >
                    {page.subMenu.map((subItem) => (
                      <MenuItem
                        key={subItem.name}
                        onClick={() => handleNavigate(subItem.path)}
                        sx={{
                          "&:hover": {
                            background: "rgba(244, 197, 66, 0.1)",
                          },
                        }}
                      >
                        <Typography sx={{ color: "#f7f1e1" }}>
                          {subItem.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Button
                  key={page.name}
                  onClick={() => handleNavigate(page.path)}
                  sx={{
                    my: 2,
                    color: "#f7f1e1",
                    display: "block",
                    fontWeight: 600,
                    "&:hover": {
                      color: "var(--op-gold)",
                      background: "rgba(244, 197, 66, 0.1)",
                    },
                  }}
                >
                  {page.name}
                </Button>
              ),
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
