import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import ConfigScreen from "@modules/home/containers/ConfigScreen";
import LeaderSelectScreen from "@/app/modules/manual-mode/components/LeaderSelectScreen";
import CardSelectScreen from "@modules/home/containers/CardSelectScreen";
import DeckViewScreen from "@modules/home/containers/DeckViewScreen";

import Footer from "@shared/components/Footer/Footer";
import Navbar from "@shared/components/Navbar/Navbar";
import ManualModeScreen from "@modules/manual-mode/ManualModeScreen";
import ManualModeLayout from "@modules/manual-mode/ManualModeLayout";
import RandomDeckScreen from "@modules/random-deck/RandomDeckScreen";
import RankingScreen from "@modules/ranking/RankingScreen";
import TierListLeadersScreen from "@modules/tier-list/TierListLeadersScreen";

function App() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<ConfigScreen />} />
        <Route path="/ranking" element={<RankingScreen />} />
        <Route path="/tier-list/leaders" element={<TierListLeadersScreen />} />
        <Route path="/manual-mode" element={<ManualModeLayout />}>
          <Route index element={<ManualModeScreen />} />
          <Route path="leader-select" element={<LeaderSelectScreen />} />
          <Route path="card-select" element={<CardSelectScreen />} />
          <Route path="deck-view" element={<DeckViewScreen />} />
        </Route>
        <Route path="/random-deck" element={<RandomDeckScreen />} />
        <Route path="/deck-view" element={<DeckViewScreen />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
