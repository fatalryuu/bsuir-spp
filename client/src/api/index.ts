import axios from 'axios';
import { APP_ROUTES } from '../types/router';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = APP_ROUTES.LOGIN;
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
