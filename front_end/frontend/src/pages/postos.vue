<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import cardPosto from '@/components/cardPosto.vue'


import router from '@/router';

import axios from 'axios';
import { useAuthStore } from '@/store/auth';

// Interceptor para adicionar o JWT no cabeçalho de todas as requisições
axios.interceptors.request.use((config) => {
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
axios.interceptors.response.use(response => {
  return response;
}, error => {
  const authStore = useAuthStore();

  if (error.response && error.response.status === 401) {
    authStore.clearAuthData(); // Limpa os dados de autenticação no Pinia e localStorage
    // Redireciona para a página de login (ajuste conforme sua rota de login)
    router.push('/login');
  }

  return Promise.reject(error);
});



</script>

<template>
  <div class="container">
    <cardPosto /> 
    
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa toda a altura da visualização */
  width: 100%; /* Garante que a largura seja total */
}
</style>
