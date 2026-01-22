import express from 'express';
import axios from 'axios';
const app = express();
const PORT: number = 3001;
import cors from 'cors';
import { error } from 'node:console';
app.use(cors());
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
// Пример: endpoint для проверки роли через внешний API
app.get('/api/organization/me/role', async (req, res) => {
  const telegram_id = req.query.telegram_id;

  if (!telegram_id) {
    return res.status(400).json({ error: 'Missing telegram_id' });
  }

  try {
    const response = await axios.get(`http://localhost:8000/api/organization/me/role?x_key=super-secret-key&telegram_id=${telegram_id}`);

    res.json({ role: response.data.role });
  } catch (err) {
    throw new Error('oh no');
  }
});

app.get('/api/organization/me/name', async (req, res) => {
  const telegram_id = req.query.telegram_id;

  if (!telegram_id) {
    return res.status(400).json({ error: 'Missing telegram_id' });
  }

  try {
    const response = await axios.get(`http://localhost:8000/api/organization/me/name?x_key=super-secret-key&telegram_id=${telegram_id}`);

    res.json(response.data);
  } catch (err) {
    throw new Error('oh no');
  }
});

app.patch('/api/organization/me/name', async (req, res) => {
  const telegram_id = req.query.telegram_id;
  const name = req.query.name;
  if (!telegram_id) {
    return res.status(400).json({ error: 'Missing telegram_id' });
  }
  if (!name) {
    return res.status(400).json({ error: 'Missing new_name' });
  }
  try {
    const response = await axios.patch(`http://localhost:8000/api/organization/me/name?x_key=super-secret-key&telegram_id=${telegram_id}&name=${name}`);

    res.json(response.data);
  } catch (err) {
    throw new Error('oh no');
  }
});
