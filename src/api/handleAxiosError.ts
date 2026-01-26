import { AxiosError } from 'axios';
import type { ApiError } from '../types/api/apiError';
type BackendError = {
  detail: string;
};
export function handleAxiosError(error: unknown): ApiError {
  const err = error as AxiosError<BackendError>;
  return {
    status: err.response?.status ?? 500,
    detail: err.response?.data?.detail ?? 'Unknown error',
  };
}
