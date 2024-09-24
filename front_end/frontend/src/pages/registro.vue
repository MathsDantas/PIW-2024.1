<template>
  <div class="page">
    <Cadastro />

    <div class="foto"></div>
  </div>
</template>

  
<script setup lang="ts">
import Cadastro from '@/components/cadastro.vue';

</script>

  
<style scoped>

  .page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  
  }

  .foto{
  width: 250vh;
  height: 100vh; 
  background-image: url('../assets/th.jpg'); /* Caminho relativo para a imagem */
  background-size: cover; /* A imagem cobrirá toda a área da div */
  background-position: center; /* Centraliza a imagem */
  background-repeat: no-repeat; /* Evita a repetição da imagem */
  }

</style>
  