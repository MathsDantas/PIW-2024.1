<template>
    <div class="admin-page">
      <!-- Bikes disponíveis para alugar -->
      <BikesDisponiveis />
  
      <!-- Informações do cliente -->
      <ClienteInfo />
  
      <!-- Botões de Ação (Alugar ou Devolver) -->
      <AlugarDevolver />
    </div>
  </template>
  
  <script>
  import BikesDisponiveis from "@/components/Bikes.vue";
  import ClienteInfo from "@/components/ClientesInfo.vue";
  import AlugarDevolver from "@/components/AlugarDevolver.vue";
  
  export default {
    components: {
      BikesDisponiveis,
      ClienteInfo,
      AlugarDevolver
    }
  }
  </script>
  
  <style scoped>
  .admin-page {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }
  
  .bikes-section, .cliente-info-section {
    flex: 1;
    margin: 0 10px;
  }
  
  .buttons-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  </style>
  