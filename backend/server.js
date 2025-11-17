import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

// ---- AFFILIATE LAST 30 DAYS ROUTE ----
app.get('/api/affiliates', async (req, res) => {
  try {
    let { start_at, end_at } = req.query;

    // Default: last 30 days
    const now = new Date();
    const endDefault = new Date().toISOString().slice(0, 10);

    const startDefault = new Date(now.setDate(now.getDate() - 30))
      .toISOString()
      .slice(0, 10);

    // If frontend didn't provide dates, use fallback
    if (!start_at) start_at = startDefault;
    if (!end_at) end_at = endDefault;

    const params = new URLSearchParams({
      start_at,
      end_at,
      key: process.env.API_KEY,
    });

    const response = await fetch(
      `https://services.rainbet.com/v1/external/affiliates?${params.toString()}`
    );

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
