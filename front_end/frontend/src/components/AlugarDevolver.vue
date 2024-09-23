<template>
  <div>
    <h2>Alugar ou Devolver Bikes</h2>
    <button @click="alugarBike">Alugar Bike</button>
    <button @click="devolverBike">Devolver Bike</button>
  </div>
</template>

<script setup>
const alugarBike = () => {
  alert('Bike alugada com sucesso!');
};

const devolverBike = () => {
  alert('Bike devolvida com sucesso!');
};
</script>

<style scoped>
button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #f39c12;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
</style>
