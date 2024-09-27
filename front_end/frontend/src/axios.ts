

import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import router from '@/router';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', 
});


axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.jwt;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use(response => {
  return response;
}, error => {
  const authStore = useAuthStore();

  if (error.response && error.response.status === 401) {
    authStore.clearAuthData(); 
    router.push('/login');     
  }

  return Promise.reject(error);
});

export default axiosInstance;
