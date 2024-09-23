<template>
    <div>
      <h2>Informações do Cliente</h2>
      <p><strong>Nome:</strong> {{ cliente.nome }}</p>
      <p><strong>Email:</strong> {{ cliente.email }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Simulação de dados de cliente
  const cliente = ref({
    nome: 'João Silva',
    email: 'joao.silva@example.com'
  });
  </script>
  
  <style scoped>
  h2 {
    color: #3498db;
  }
  </style>
  