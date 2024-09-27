<template>
  <div  class="quad">
    <div  >
      <div class="header-rectangle">
        <h1 class="header-text">Lista de postos byKeria</h1>
      </div>
    </div>
    <div class="card-container">
      <div class="card" v-for="posto in postos" :key="posto.id">
        <div class="card-body">
          <img src="../assets/postos/posto1.png" class="card-img-top" alt="Card Image">
          <h5 class="card-title">{{ posto.nameUnidade }}</h5>
          <p class="card-text">{{ posto.endereco }}</p>
          <RouterLink :to="'/postos/' + posto.id" class="btn btn-custom">Mais Informações</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '@/axios';

export default {
  data() {
    return {
      postos: [], 
    };
  },
  mounted() {
    
    axiosInstance.get('/postos')  
      .then(response => {
        console.log(response.data.data);  
        this.postos = response.data.data;
      })
      .catch(error => {
        console.error('Erro ao buscar postos:', error);
      });
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Madimi+One&display=swap');
@import url('https://fonts.cdnfonts.com/css/coolvetica-2');


.quad {
  padding-top: 0%;
}

.header-rectangle {
  width: calc(100% - 600px); 
  background-color: #F1EC41;
  border-radius: 100px;
  border: 5px solid black;
  padding: 20px;
  margin-left: 23%;
  margin-bottom: 200px;
  text-align: center;
  margin-bottom: 0px;
}

.header-text {
  font-family: 'Coolvetica', sans-serif;
  font-size: 40px;
  color: black;
  margin: 0;
}

.card-container {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap; 
  gap: 10px;
  margin: 10px;
  padding: 10px;
}

.card-title {
  font-family: 'Coolvetica', sans-serif;
  font-size: 38px;
}

.card-text {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: medium;
}

.card {
  width: 18rem; 
  margin: 10px;
  border-radius: 30px;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  background-color: #F1EC41;
  border-radius: 30px;
}

.card-img-top {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
  border-radius: 10px;
}

.btn-custom {
  background-color: white;
  color: black;
  border: 1px solid black;
  padding: 10px 20px;
  border-radius: 15px;
  text-transform: uppercase;
  font-weight: bold;
}

.btn-custom:hover {
  background-color: black;
  color: white;
}
</style>
