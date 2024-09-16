<template>
  <NavBar position="absolute" />
  <div class="postos">
    <h2>Página dos Postos</h2>
    <div class="bnt1">
      <!-- Alterado de RouterLink para button -->
      <button @click="toggleShow" type="button" class="btn btn-custom btn-lg position-btn">
        <i class="bi bi-geo-fill" style="color: #000000;"></i>
      </button>
    </div>
  </div>
        
  <div v-if="show" class="card" style="width: 18rem;">
    <img src="..." class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { ref } from 'vue';

export default {
  name: 'Postos',
  components: {
    NavBar, // Registrando o componente NavBar
  },
  setup() {
    // Declara a variável reativa
    const show = ref(false);

    // Define a função para alternar o valor de show
    function toggleShow() {
      show.value = !show.value;
      console.log(show.value); // Corrigido para mostrar o valor atual
    }

    return {
      show,
      toggleShow,
    };
  },
};
</script>

<style scoped>
.postos {
  height: 100vh;
  background-image: url('@/assets/mapa.png'); /* Importa a imagem */
  background-size: cover; /* Ajusta o tamanho da imagem para cobrir todo o fundo */
  background-position: center; /* Centraliza a imagem */
  background-repeat: no-repeat; /* Evita a repetição da imagem */
}

.btn-custom {
  background-color: #F1EC41; /* Cor de fundo personalizada */
  color: #ffffff; /* Cor do texto */
  border: none; /* Remover a borda se desejado */
}

.btn-custom:hover {
  background-color: #dbdbdb; /* Cor de fundo ao passar o mouse */
}

.bnt1 {
  position: relative;
  height: 500px; /* Ajuste conforme necessário */
  border: 1px solid #ddd; /* Para visualização do contêiner */
}

.position-btn {
  position: absolute;
  top: 156px; /* Ajuste a posição do topo */
  right: 260px; /* Ajuste a posição da direita */
}

.card {
  position: absolute;
}
</style>
