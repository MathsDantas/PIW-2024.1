<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import TabelaUsuarios from '@/components/tabelaUsuarios.vue';
import QntBikes from '@/components/qntBikes.vue';
import axiosInstance from '@/axios';
import { ref, onMounted, watch } from 'vue';
import type { User, Bike, Unidade } from '@/types/index';
import { useAuthStore } from '@/store/auth';
import CadastroModal from '@/components/cadastroModal.vue';
import { useRoute } from 'vue-router';





const unidade = ref<Unidade | null>(null);
const users = ref<User[]>([]);
const showModal = ref(false);
const authStore = useAuthStore();
const route = useRoute();

async function fetchUnidadeData() {
  try {
    const postoId = route.params.id;
    const response = await axiosInstance.get(`/postos/${postoId}`);
    
    
    unidade.value = response.data.data;

   
    if (unidade.value && response.data.data.bikes) {
      unidade.value.bikes = [...response.data.data.bikes]; 
    }
  } catch (error) {
    console.error('Erro ao buscar unidade:', error);
  }
}
function updateBikes(newBikes: Bike[]) {
  if (unidade.value) {
    unidade.value.bikes = [...newBikes]; 
  }
}





// Fetch users
async function fetchUsers() {
  try {
    const response = await axiosInstance.get('/users');
    users.value = response.data.data;
  } catch (error) {
    console.error('Erro ao buscar os usuários:', error);
  }
}

async function deleteUser(userId: number) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    try {
      await axiosInstance.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authStore.jwt}`
        }
      });
      users.value = users.value.filter(user => user.id !== userId);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário.');
    }
  }
}

function openModal() {
  showModal.value = true;
}

// Função para fechar o modal
function closeModal() {
  showModal.value = false;
}

// Função para tratar o evento de criação de usuário
function onUserCreated() {
  fetchUsers();
  closeModal();
}



watch(unidade, (newUnidade) => {
  
});

// On mounted
onMounted(() => {
  fetchUnidadeData();
  fetchUsers();
});
</script>

<template>
  <div class="pag">
    <NavBar position="absolute" />

    <div class="logo" v-if="unidade">
      <h3>{{ unidade.nameUnidade }}</h3>
      <h4>{{ unidade.endereco }}</h4>
    </div>

    <div class="content-container">
      <div class="left-container" v-if="unidade">
        
        <QntBikes :bikes="unidade.bikes" @update-bikes="fetchUnidadeData"  />
      </div>

      <div class="right-container">
        <button type="button" class="btn btn-primary btn-lg" @click="openModal">
          <i class="bi bi-plus-circle-fill"></i>
          Adicionar Usuário
        </button>
        <TabelaUsuarios :users="users" :askToDelete="deleteUser" :onUpdateUsers="fetchUsers" @bikesUpdated="updateBikes" />
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <button @click="closeModal" class="close-btn">X</button>
        <CadastroModal @userCreated="onUserCreated" @close="closeModal" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.pag {
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
  background-color: #F1EC41;
  border: none;
  color: black;
  font-size: 18px;
  padding: 10px 20px;
}

button.btn.btn-primary.btn-lg:hover {
  background-color: #e0da3b;
}

.left-container {
  flex: 1;
  padding: 20px;
  min-height: 400px;
  max-height: 600px;
  max-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right-container {
  flex: 2;
  padding: 20px;
  border: 1px solid #ddd;
  height: auto;
  max-height: 600px;
  max-width: 50%;
  overflow-y: auto;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 5px;
  margin: 100px;
  margin-top: 100px;
  border-radius: 8px;
  min-width: 400px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
}
</style>
