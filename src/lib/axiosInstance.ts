import axios from 'axios';
import { getAuthToken, removeAuthToken } from 'src/utils/secureStore';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.EXPO_PUBLIC_API_URL as string,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = getAuthToken();

    const token = authToken;

    if (config.headers && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        removeAuthToken();
      } catch (e) {
        console.error('Error during logout:', e);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
