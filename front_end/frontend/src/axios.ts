import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import router from '@/router';

// Criação da instância do Axios
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Interceptor para adicionar o JWT no cabeçalho de todas as requisições
api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.jwt;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para lidar com respostas 401 (Unauthorized)
api.interceptors.response.use(response => {
  return response;
}, error => {
  const authStore = useAuthStore();

  if (error.response && error.response.status === 401) {
    authStore.clearAuthData(); // Limpa os dados de autenticação
    router.push('/login');     // Redireciona para o login
  }

  return Promise.reject(error);
});

export default api;
