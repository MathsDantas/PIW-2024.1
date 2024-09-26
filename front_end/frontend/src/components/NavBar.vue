<template>
  <nav :class="['navbar', 'navbar-expand-lg', 'px-4', position]">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">byKeria</RouterLink>
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNavAltMarkup" 
        aria-controls="navbarNavAltMarkup" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/postos" class="nav-link" >Postos de Bikes</RouterLink>
          <!-- Mostrar Login apenas se o usuário não estiver autenticado -->
          <RouterLink v-if="!authStore.isAuthenticated" to="/login" class="nav-link">Login</RouterLink>
          <!-- Mostrar Logout apenas se o usuário estiver autenticado -->
          <router-link v-if="authStore.isAuthenticated" to="/logout" class="nav-link">Logout</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { defineProps } from 'vue';
import { useAuthStore } from '@/store/auth'; // Importa a store de autenticação

// Definir prop position com valor padrão "relative"
const props = defineProps({
  position: {
    type: String,
    default: 'relative', // Pode ser alterado para "absolute" nas páginas
  }
});

// Carrega o estado de autenticação ao inicializar o componente
const authStore = useAuthStore();
authStore.loadAuthData(); // Carrega os dados de autenticação do localStorage
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Madimi+One&display=swap');
@import url('https://fonts.cdnfonts.com/css/coolvetica-2');

body {
  padding-top: 56px; /* Ajuste a altura conforme a altura da navbar */
}

.navbar {
  background-color: #F1EC41; /* Cor amarela */
  font-family: "Inter", sans-serif;
  font-weight: bold;
  color: black;
  font-size: 20px;
}

.navbar.absolute {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
}

.navbar.relative {
  position: relative;
}

.navbar-brand {
  font-family: 'Coolvetica', sans-serif;
  font-size: 25px;
  color: black;
}
</style>
