import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/api/affiliates', async (req, res) => {
  try {
    const { start_at, end_at } = req.query;
    if (!start_at || !end_at) return res.status(400).json({ error: 'start_at and end_at are required' });

    const params = new URLSearchParams({
      start_at,
      end_at,
      key: process.env.API_KEY,
    });

    const response = await fetch(`https://services.rainbet.com/v1/external/affiliates?${params.toString()}`);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));

