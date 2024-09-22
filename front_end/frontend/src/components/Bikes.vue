<template>
<div class="bikes-section">
    <div class="bikes-disponiveis">
      <h3>Bikes de adultos</h3>
      <div>
        <span v-for="bike in adultBikes" :key="bike.id" :class="{'available': bike.available}">
          🚲
        </span>
      </div>
      <button @click="alugarAdultBike">Alugar</button>
  
      <h3>Bikes infantis</h3>
      <div>
        <span v-for="bike in kidBikes" :key="bike.id" :class="{'available': bike.available}">
          🚲
        </span>
      </div>
      <button @click="alugarKidBike">Alugar</button>
    </div>
</div> 
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        adultBikes: [
          { id: 1, available: true },
          { id: 2, available: true },
          { id: 3, available: false }
        ],
        kidBikes: [
          { id: 1, available: true },
          { id: 2, available: true },
          { id: 3, available: false }
        ]
      };
    },
    methods: {
      alugarAdultBike() {
        // lógica para alugar bicicleta adulta
      },
      alugarKidBike() {
        // lógica para alugar bicicleta infantil
      }
    }
  }
  </script>
  
  <style scoped>
.bikes-section {
  /* Estilo específico para essa seção */
  padding: 20px;
  border: 1px solid #ccc;
  background-color: yellow;
  border-radius: 3%;
}
</style>