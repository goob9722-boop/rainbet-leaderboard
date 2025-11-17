import React from "react";
import ReactDOM from "react-dom/client";
import CasinoLeaderboard from "./CasinoLeaderboard";
import './index.css'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CasinoLeaderboard apiUrl="https://leaderboard-backend-3k6u.onrender.com/api/wagers" />
  </React.StrictMode>
);
