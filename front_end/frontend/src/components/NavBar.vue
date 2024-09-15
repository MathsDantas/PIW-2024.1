<template>
    <nav :class="['navbar', 'navbar-expand-lg', 'px-4', position]">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">byKeria</a>
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
            <a class="nav-link" href="#">Postos de Bikes</a>
            <RouterLink to="/login" class="nav-link">Login</RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { defineProps } from 'vue';
  
  // Definir prop position com valor padrão "relative"
  const props = defineProps({
    position: {
      type: String,
      default: 'relative', // Pode ser alterado para "absolute" nas páginas
    }
  });
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
  }
  </style>
  