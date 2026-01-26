import express from 'express';
import axios from 'axios';
import cors from 'cors';
import type { Request, Response, NextFunction } from 'express';
import { backendApiErrorHandler } from './backendApiErrorHandler.js';
import { validateQueryParams } from './clientErrorHandler.js';
const API_URL = 'http://localhost:8000';
const app = express();
const PORT = 3001;
export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});
app.use(cors());

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

app.get(
  '/api/organization/me/role',
  validateQueryParams(['telegram_id']),
  asyncHandler(async (req, res) => {
    const response = await api.get(`/api/organization/me/role?x_key=super-secret-key&telegram_id=${req.query.telegram_id}`);
    res.json({ role: response.data.role });
  })
);

app.get(
  '/api/organization/me/name',
  validateQueryParams(['telegram_id']),
  asyncHandler(async (req, res) => {
    const response = await api.get(`/api/organization/me/name?x_key=super-secret-key&telegram_id=${req.query.telegram_id}`);
    res.json(response.data);
  })
);

app.patch(
  '/api/organization/me/name',
  validateQueryParams(['telegram_id', 'name']),
  asyncHandler(async (req, res) => {
    const response = await api.patch(`/api/organization/me/name?x_key=super-secret-key&telegram_id=${req.query.telegram_id}&name=${req.query.name}`);
    res.json(response.data);
  })
);

app.get(
  '/api/organization/description',
  validateQueryParams(['telegram_id']),
  asyncHandler(async (req, res) => {
    const response = await api.get(`/api/organization/description?x_key=super-secret-key&telegram_id=${req.query.telegram_id}`);
    res.json(response.data);
  })
);

app.patch(
  '/api/organization/description',
  validateQueryParams(['telegram_id', 'organization_description', 'organization_name']),
  asyncHandler(async (req, res) => {
    const response = await api.patch(
      `/api/organization/description?x_key=super-secret-key&telegram_id=${req.query.telegram_id}&organization_description=${req.query.organization_description}&organization_name=${req.query.organization_name}`
    );
    res.json(response.data);
  })
);

app.get(
  '/api/organization/participants',
  validateQueryParams(['telegram_id', 'filter']),
  asyncHandler(async (req, res) => {
    const response = await api.get(`/api/organization/participants?x_key=super-secret-key&telegram_id=${req.query.telegram_id}&filter=${req.query.filter}`);
    res.json(response.data);
  })
);

app.post(
  '/api/organization/participants',
  validateQueryParams(['telegram_id', 'role', 'participant_username']),
  asyncHandler(async (req, res) => {
    const response = await api.post(
      `/api/organization/participants?x_key=super-secret-key&telegram_id=${req.query.telegram_id}&role=${req.query.role}&participant_username=${req.query.participant_username}`
    );
    res.json(response.data);
  })
);

app.patch(
  '/api/organization/participant_change_role',
  validateQueryParams(['telegram_id', 'role', 'participant_id']),
  asyncHandler(async (req, res) => {
    const response = await api.patch(
      `/api/organization/participant_change_role?x_key=super-secret-key&telegram_id=${req.query.telegram_id}&role=${req.query.role}&participant_id=${req.query.participant_id}`
    );
    res.json(response.data);
  })
);

app.use(backendApiErrorHandler);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
