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
  background-image: url('../assets/th.jpg'); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  }
</style>
  