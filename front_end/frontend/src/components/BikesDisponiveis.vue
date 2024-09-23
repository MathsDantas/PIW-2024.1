<template>
    <div>
      <h2>Bikes Disponíveis</h2>
      <ul>
        <li v-for="bike in bikes" :key="bike.id">{{ bike.nome }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Simulação de dados de bikes disponíveis
  const bikes = ref([
    { id: 1, nome: 'Bike A' },
    { id: 2, nome: 'Bike B' },
    { id: 3, nome: 'Bike C' }
  ]);
  </script>
  
  <style scoped>
  h2 {
    color: #4CAF50;
  }
  </style>
  