<template>
  <div>
    <NavBar position="relative" />

    <div class="page-container">
      
      <header class="header">
        <h1>Posto: {{ posto }}</h1>
        <p>Endereço: {{ endereco }}</p>
        <p>Status: {{ status }}</p>
        <p>Bikes disponíveis: {{ bikesDisponiveis }}</p>
      </header>

      
      <section class="bikes-section">
        
        <div class="bike-card">
          <h2>Bikes de Adultos</h2>
          <div class="bike-icons">
            <img src="@/assets/bike-icon.png" alt="bike adulto" v-for="n in 6" :key="n" />
          </div>
        </div>

        
        <div class="bike-card">
          <h2>Bikes Infantis</h2>
          <div class="bike-icons">
            <img src="@/assets/bike-icon.png" alt="bike infantil" v-for="n in 6" :key="n" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'; 

export default {
  name: 'Postos',
  components: {
    NavBar, 
  },
  data() {
    return {
      posto: "Posto Central",
      endereco: "Rhaenyra rainha, 235", 
      status: "Aberto",
      bikesDisponiveis: 12,
    };
  },
};
</script>

<style scoped>
.page-container {
  text-align: center;
  background-color: white;
  padding: 20px;
}

.header {
  margin-bottom: 40px;
}

.bikes-section {
  display: flex;
  justify-content: center;
  gap: 25px; 
}

.bike-card {
  background-color: #F1EC41;
  border-radius: 20px;
  width: 276px;
  height: 347px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: black;
}

.bike-icons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-items: center;
  width: 100%;
  margin-top: 20px;
}

.bike-icons img {
  width: 80px; 
  height: auto; 
  display: block;
}
</style>

  