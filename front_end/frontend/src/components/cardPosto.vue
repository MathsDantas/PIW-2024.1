<template>
    <div class="card" style="width: 30rem;">
      <img src="../assets/postos/posto1.png" class="card-img-top" alt="Card Image">
      <div class="card-body">
        <h5 class="card-title">byKeria: Central</h5>
        <p class="card-text">postos.enderço</p>
        <RouterLink to="/postos/1" class="btn btn-primary">Mais Informações</RouterLink>
      </div>
    </div>
</template>

<script>
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
  height: 100vh; /* Ocupa toda a altura da visualização */
}

.card {
  width: 30rem; /* Tamanho grande do card */
  max-width: 100%; /* Garante que o card não seja maior que a tela */
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza o conteúdo dentro do card-body */
  text-align: center; /* Centraliza o texto */
}
</style>