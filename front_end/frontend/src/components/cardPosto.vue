<template>
  <div class="card" style="width: 30rem;" v-for="posto in postos" :key="posto.id">
    <img src="../assets/postos/posto1.png" class="card-img-top" alt="Card Image">
    <div class="card-body">
      <h5 class="card-title">{{ posto.nameUnidade }}</h5>
      <p class="card-text">{{ posto.endereco }}</p>
      <RouterLink :to="'/postos/' + posto.id" class="btn btn-primary">Mais Informações</RouterLink>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      postos: [], // Array para armazenar os dados dos postos
    };
  },
  mounted() {
    // Chamada para a API assim que o componente for montado
    axios.get('http://localhost:3000/postos')  // URL da API
      .then(response => {
        console.log(response.data.data);  // Verificando os dados recebidos
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

.card-title {
  font-family: 'Coolvetica', sans-serif;
  font-size: 40px;
}

.card-text {
  font-family: "Inter", sans-serif;
  font-size: 20px;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  width: 30rem;
  max-width: 100%;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
