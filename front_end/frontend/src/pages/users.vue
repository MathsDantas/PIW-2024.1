<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import TabelaUsuarios from '@/components/tabelaUsuarios.vue'; // Importando o novo componente da tabela
import axios from 'axios'
import { ref } from 'vue';
import { onMounted } from 'vue';

const users = ref([]);

async function fetchUsers() {
  try {
    const response = await axios.get('http://localhost:3000/users');
    users.value = response.data.data;
  } catch (error) {
    console.error('Erro ao buscar os usuários:', error);
  }
}

function askToDelete(id: any) {
  console.log(`Deletar o usuário com id: ${id}`);
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="pag">
    <NavBar position="absolute" />


    <div class="logo">
      <h1>LOGO</h1>
      <h3>Posto Central</h3>
      <h4>Rua Rhaenyra Rainha, 235</h4>
    
    </div>


    <div class="content-container">
      <!-- Primeiro container -->
      <div class="left-container">
        <!-- Conteúdo que você deseja colocar na esquerda -->
        <p>AQUI FICA O ESTOQUE DE BIKES DO POSTO</p>
      </div>

      <div class="meio" >

        <div class="bnt-alugar" >
            <h2>Alugar</h2>
            <button type="button" class="btn btn-warning">
              <i class="bi bi-arrow-right-square-fill"></i>
            </button>
        </div>

        <div class="bnt-devolver">
          <h2>Devolver</h2>
            <button type="button" class="btn btn-warning">
              <i class="bi bi-arrow-left-square-fill"></i>
            </button>
        </div>

      </div>

      <!-- Segundo container: tabela de usuários -->
      <div class="right-container">
        <button type="button" class="btn btn-primary btn-lg">
          <i class="bi bi-plus-circle-fill"></i>
          Adicionar Usuário
        </button>
        <TabelaUsuarios :users="users" :askToDelete="askToDelete" />
      </div>
    </div>
  </div> 
</template>

<style scoped>

.pag {
  background-color: #f1f0c3;
  min-height: 100vh;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5%;
}



.content-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 3%;
  padding: 20px;
}

button.btn.btn-primary.btn-lg {
  background-color: #F1EC41; /* Cor de fundo personalizada */
  border: none; /* Remover borda padrão */
  color: black; /* Cor do texto e ícone */
  font-size: 18px; /* Tamanho do texto */
  padding: 10px 20px; /* Ajustar espaçamento */
}

/* Efeito hover */
button.btn.btn-primary.btn-lg:hover {
  background-color: #e0da3b; /* Cor levemente mais escura ao passar o mouse */
}


.left-container {
  flex: 1;
  background-color: #f7f7f7;
  padding: 20px;
  min-height: 400px;
  max-height: 600px;
  max-width: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-container {
  flex: 2;
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  max-height: 600px;
  max-width: 45%;
  overflow-y: auto;
}

.meio {
  height: 400px;
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

/* Estilos para as divs de alugar e devolver */
.bnt-alugar,
.bnt-devolver {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* Aumentando o tamanho dos botões */
.bnt-alugar button,
.bnt-devolver button {
  width: 100px; /* Largura maior do botão */
  height: 100px; /* Altura maior do botão */
  font-size: 24px; /* Aumenta o tamanho do ícone */
  background-color: #F1EC41;
  display: flex;
  border: none;
  justify-content: center;
  align-items: center;
  margin-top: 10px; /* Espaço entre o texto e o botão */
}

/* Ajustando o ícone dentro do botão */
.bnt-alugar i,
.bnt-devolver i {
  font-size: 45px; /* Tamanho do ícone */
}

</style>
