<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import cardPosto from '@/components/cardPosto.vue'

import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();

axios.interceptors.request.use((config) => {
  const token = authStore.jwt;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
