import express from 'express';
import axios, { AxiosError } from 'axios';
import type { ApiError } from './types/server.js';
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

app.get('/api/organization/description', async (req, res) => {
  const telegram_id = req.query.telegram_id;

  if (!telegram_id) {
    return res.status(400).json({ error: 'Missing telegram_id' });
  }

  try {
    const response = await axios.get(`http://localhost:8000/api/organization/description?x_key=super-secret-key&telegram_id=${telegram_id}`);

    res.json(response.data);
  } catch (err) {
    throw new Error('oh no');
  }
});

app.patch('/api/organization/description', async (req, res) => {
  const telegram_id = req.query.telegram_id;
  const organization_name = req.query.organization_name;
  const organization_description = req.query.organization_description;
  if (!telegram_id) {
    return res.status(400).json({ error: 'Missing telegram_id' });
  }

  try {
    const response = await axios.patch(
      `http://localhost:8000/api/organization/description?x_key=super-secret-key&telegram_id=${telegram_id}&organization_description=${organization_description}&organization_name=${organization_name}`
    );

    res.json(response.data);
  } catch (err) {
    throw new Error('oh no');
  }
});

app.get('/api/organization/participants', async (req, res) => {
  const telegram_id = req.query.telegram_id;
  const filter = req.query.filter;
  if (!telegram_id) {
    return res.status(400).json({ error: 'Missing telegram_id' });
  }

  try {
    const response = await axios.get(`http://localhost:8000/api/organization/participants?x_key=super-secret-key&telegram_id=${telegram_id}&filter=${filter}`);

    res.json(response.data);
  } catch (err) {
    throw new Error('oh no');
  }
});

app.post('/api/organization/participants', async (req, res) => {
  const telegram_id = req.query.telegram_id;
  const participant_username = req.query.participant_username;
  const role = req.query.role;
  if (!telegram_id) {
    return res.status(400).json({ error: 'Missing telegram_id' });
  }

  try {
    const response = await axios.post(
      `http://localhost:8000/api/organization/participants?x_key=super-secret-key&telegram_id=${telegram_id}&role=${role}&participant_username=${participant_username}`
    );

    res.json(response.data);
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    if (error.response?.data?.detail) {
      return res.status(error.response.status).json({
        detail: error.response.data.detail,
      });
    }

    return res.status(500).json({ detail: 'Internal server error' });
  }
});

app.patch('/api/organization/participant_change_role', async (req, res) => {
  const telegram_id = req.query.telegram_id;
  const participant_id = req.query.participant_id;
  const role = req.query.role;
  if (!telegram_id) {
    return res.status(400).json({ error: 'Missing telegram_id' });
  }

  try {
    const response = await axios.patch(
      `http://localhost:8000/api/organization/participant_change_role?x_key=super-secret-key&telegram_id=${telegram_id}&role=${role}&participant_id=${participant_id}`
    );

    res.json(response.data);
  } catch (err) {
    throw new Error('oh no');
  }
});
