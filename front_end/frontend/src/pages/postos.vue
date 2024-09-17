<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import cardPosto from '@/components/cardPosto.vue'
</script>

<template>
  <NavBar position="absolute" />
  <div class="container">
    <cardPosto /> 
    <cardPosto /> 
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
