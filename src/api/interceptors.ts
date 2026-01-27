import { api } from '../api/organization';
import { queryClient } from '../main';
export function setupInterceptors() {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 404) {
        queryClient.invalidateQueries({
          queryKey: ['role'],
        });
      }

      return Promise.reject(error);
    }
  );
}
