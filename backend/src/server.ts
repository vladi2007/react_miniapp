import express from 'express';
import axios from 'axios';
const app = express();
const PORT: number = 3001;
import cors from 'cors';
app.use(cors());
// Пример: endpoint для проверки роли через внешний API
app.get('/api/role', async (req, res) => {
  const telegram_id = req.query.telegram_id;

  if (!telegram_id) {
    return res.status(400).json({ error: 'Missing telegram_id' });
  }

  try {
    const response = await axios.get(`https://voshod08.ru/api/organization/me/role?x_key=super-secret-key&telegram_id=${telegram_id}`);

    res.json({ role: response.data.role });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
