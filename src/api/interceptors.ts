import { api } from '../api/organization';
import { handleAxiosError } from './handleAxiosError';

export function setupInterceptors() {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const apiError = handleAxiosError(error);

      if (apiError.status === 404 && apiError.detail === 'User_from not found on organization') {
        window.location.href = '/not_access';
        return;
      }

      return Promise.reject(apiError);
    }
  );
}
