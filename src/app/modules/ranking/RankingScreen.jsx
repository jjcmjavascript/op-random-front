import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ScreenContainer from "@shared/components/ScreenContainer/ScreenContainer";
import LoadingState from "@shared/components/LoadingState/LoadingState";
import ErrorBanner from "@shared/components/ErrorBanner/ErrorBanner";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const RankingScreen = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/ranking`);

        if (!response.ok) {
          throw new Error("Error al cargar el ranking");
        }

        const data = await response.json();
        setRankings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  return (
    <ScreenContainer
      sx={{
        minHeight: "80vh",
        py: 4,
        background:
          "radial-gradient(circle at 20% 50%, rgba(214, 58, 47, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(244, 197, 66, 0.08) 0%, transparent 50%)",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 } }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: "#fff",
              fontFamily: '"Bangers", cursive',
              letterSpacing: 3,
              textShadow:
                "0 0 20px rgba(214, 58, 47, 0.8), 0 0 40px rgba(214, 58, 47, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <EmojiEventsIcon sx={{ fontSize: "inherit", color: "#f4c542" }} />
            RANKING DE LÍDERES
          </Typography>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              mt: 1,
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            Top 10 líderes más utilizados y efectivos
          </Typography>
        </Box>

        {error && (
          <ErrorBanner message={error} onClose={() => setError(null)} />
        )}

        {loading ? (
          <LoadingState message="Cargando ranking..." />
        ) : rankings?.length > 0 ? (
          <TableContainer
            component={Paper}
            sx={{
              background:
                "linear-gradient(135deg, rgba(16, 37, 68, 0.95) 0%, rgba(11, 26, 51, 0.95) 100%)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
              borderRadius: 2,
              border: "2px solid rgba(244, 197, 66, 0.3)",
              overflow: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    background:
                      "linear-gradient(135deg, rgba(214, 58, 47, 0.2) 0%, rgba(244, 197, 66, 0.2) 100%)",
                    borderBottom: "2px solid var(--op-gold)",
                  }}
                >
                  <TableCell
                    sx={{
                      color: "#f4c542",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      width: "60px",
                    }}
                  >
                    Rank
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#f4c542",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      width: "100px",
                    }}
                  ></TableCell>
                  <TableCell
                    sx={{
                      color: "#f4c542",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      minWidth: "200px",
                    }}
                  >
                    Leader
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#f4c542",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      textAlign: "center",
                    }}
                  >
                    Win Rate (%)
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#f4c542",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      display: { xs: "none", lg: "table-cell" },
                    }}
                  >
                    Wins
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#f4c542",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      textAlign: "center",
                      display: { xs: "none", lg: "table-cell" },
                    }}
                  >
                    Games
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rankings.map((leader, index) => (
                  <TableRow
                    key={leader.leader}
                    sx={{
                      "&:hover": {
                        background: "rgba(244, 197, 66, 0.05)",
                      },
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        textAlign: "center",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {leader.imgUrl ? (
                        <Box
                          component="img"
                          src={leader.imgUrl}
                          alt={leader.leaderName}
                          loading="lazy"
                          decoding="async"
                          sx={{
                            width: 70,
                            height: 100,
                            objectFit: "cover",
                            borderRadius: 1,
                            border: "2px solid rgba(244, 197, 66, 0.3)",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 70,
                            height: 100,
                            background: "rgba(255, 255, 255, 0.1)",
                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "rgba(255, 255, 255, 0.3)",
                            fontSize: "0.7rem",
                          }}
                        >
                          N/A
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography
                          sx={{
                            color: "#2196f3",
                            fontWeight: "bold",
                            fontSize: "0.85rem",
                          }}
                        >
                          [{leader.leader}]
                        </Typography>
                        <Typography
                          sx={{
                            color: "#fff",
                            fontSize: "1rem",
                            fontWeight: 600,
                          }}
                        >
                          {leader.leaderName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#4caf50",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        textAlign: "center",
                      }}
                    >
                      {leader.winRate}%
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#f4c542",
                        fontSize: "0.95rem",
                        textAlign: "center",
                        display: { xs: "none", lg: "table-cell" },
                      }}
                    >
                      {leader.wins.toLocaleString()}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontSize: "0.95rem",
                        textAlign: "center",
                        display: { xs: "none", lg: "table-cell" },
                      }}
                    >
                      {leader.matches.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            <Typography variant="h6">
              No hay datos de ranking disponibles
            </Typography>
          </Box>
        )}
      </Box>
    </ScreenContainer>
  );
};

export default RankingScreen;
