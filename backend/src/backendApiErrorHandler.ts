import type { Request, Response, NextFunction } from 'express';
import type { AxiosError } from 'axios';
export function backendApiErrorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if ((err as AxiosError)?.isAxiosError) {
    const axiosError = err as AxiosError<{ detail: string }>;
    if (axiosError.response?.data?.detail) {
      return res.status(axiosError.response.status).json({
        detail: axiosError.response.data.detail,
      });
    }

    return res.status(axiosError.response?.status || 500).json({
      detail: axiosError.message,
    });
  }

  res.status(500).json({
    detail: 'Unknown error',
  });
}
