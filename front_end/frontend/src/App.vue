<script setup lang="ts">
import login from './pages/login.vue';
import NavBar from './components/NavBar.vue';

</script>

<template>

<div class="admin-page">
    <!-- Bikes disponíveis para alugar -->
    <BikesDisponiveis />
    
    <!-- Botões de Ação (Alugar ou Devolver) -->
    <AlugarDevolver />

    <!-- Informações do cliente -->
    <ClienteInfo />

    
</div>
  
  <NavBar position="absolute"/>
  

  <div id="app">
    <Login />
  </div>

  <main class="page" >

    <router-view /> <!-- Aqui é onde o conteúdo da rota será renderizado -->
  </main>


</template>

<style scoped>

.page {
  min-height: 100vh;
  background-image: url('./assets/bgprincipal.png'); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
}

header {
  line-height: 1.5;
}



@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

} 

</style>
