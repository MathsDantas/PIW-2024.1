<template>

<NavBar position="absolute" />

    <div class="home">

      <h1 class="titulo">Bem vindos ao byKeria!</h1>
    </div>

  
  </template>
  
  <script setup lang="ts">

    import NavBar from '@/components/NavBar.vue';

  </script>
  
  <style scoped>

@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Madimi+One&display=swap');

  .home {
  height: 100vh;
  background-image: url('@/assets/background.png'); /* Importa a imagem */
  background-size: cover; /* Ajusta o tamanho da imagem para cobrir todo o fundo */
  background-position: center; /* Centraliza a imagem */
  background-repeat: no-repeat; /* Evita a repetição da imagem */
  }

  .titulo {
  font-size: 100px;
  font-family: "Madimi One", sans-serif;
  color: rgb(222, 222, 222);
}

.home {
  display: flex;
  justify-content: center; /* Alinha horizontalmente no centro */
  align-items: center; /* Alinha verticalmente no centro */
  height: 100vh; /* Garante que o container ocupe toda a altura da viewport */
  text-align: center; /* Centraliza o texto dentro do container */
}

  </style>
  