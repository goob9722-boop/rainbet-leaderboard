import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ---- AFFILIATE LAST 30 DAYS OR FIXED RANGE ----
app.get("/api/affiliates", async (req, res) => {
  try {
    let { start_at, end_at } = req.query;

    // Default: Last 30 days
    const today = new Date();
    const endDefault = today.toISOString().slice(0, 10);

    const startDefault = new Date(today.setDate(today.getDate() - 30))
      .toISOString()
      .slice(0, 10);

    // If frontend didn’t send fixed dates, fallback to last 30 days
    if (!start_at) start_at = startDefault;
    if (!end_at) end_at = endDefault;

    // Build request to Rainbet API
    const params = new URLSearchParams({
      start_at,
      end_at,
      key: process.env.API_KEY,
    });

    const url = `https://services.rainbet.com/v1/external/affiliates?${params}`;

    console.log("Fetching:", url); // <-- shows up in Render logs

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
