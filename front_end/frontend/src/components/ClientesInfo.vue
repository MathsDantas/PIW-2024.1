<template>
    <div class="clientes-info-section">
        <div class="cliente-info">
            <div>
                <img :src="cliente.avatar" alt="Foto do cliente" />
                <p><strong>Nome:</strong> {{ cliente.nome }}</p>
                <p><strong>Username:</strong> {{ cliente.username }}</p>
                <p><strong>Email:</strong> {{ cliente.email }}</p>
            </div>
  
            <h4>Bikes alugadas no momento:</h4>
            <div>
                <p><strong>Adulto:</strong> {{ cliente.aluguelAdulto }}/2</p>
                <p><strong>Infantil:</strong> {{ cliente.aluguelInfantil }}/2</p>
            </div>
        </div>
    </div>
  </template>
  
  <script lang="ts">

  </script>
  <style scoped>
  .clientes-info-section {
    
    padding: 20px;
    border: 1px solid #ccc;
    background-color: yellow;
  }
  </style>