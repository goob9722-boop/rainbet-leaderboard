import React from "react";
import ReactDOM from "react-dom/client";
import CasinoLeaderboard from "./CasinoLeaderboard";
import './index.css'


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CasinoLeaderboard apiUrl="http://localhost:4000/api/affiliates" />
  </React.StrictMode>
);
