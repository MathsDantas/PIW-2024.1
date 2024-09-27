<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import cardPosto from '@/components/cardPosto.vue'


import router from '@/router';

import axiosInstance from '@/axios';
import { useAuthStore } from '@/store/auth';




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
