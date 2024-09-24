<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import TabelaUsuarios from '@/components/tabelaUsuarios.vue';
import BikesDisponiveis from "@/components/Bikes.vue";
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/store/auth';
import CadastroModal from '@/components/cadastroModal.vue';

// Tipagem para um usuário
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  bikes: any[];
  role: {
    name: string;
  };
}

const authStore = useAuthStore();
const users = ref<User[]>([]);
const showModal = ref(false); // Controlar a visibilidade do modal

// Configurar o interceptor para adicionar o JWT às requisições
axios.interceptors.request.use((config) => {
  const token = authStore.jwt;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Função para buscar os usuários
async function fetchUsers() {
  try {
    const response = await axios.get('http://localhost:3000/users');
    users.value = response.data.data;
  } catch (error) {
    console.error('Erro ao buscar os usuários:', error);
  }
}

// Função para excluir um usuário
async function deleteUser(userId: number) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authStore.jwt}`
        }
      });
      // Atualizar o estado local removendo o usuário da lista
      users.value = users.value.filter(user => user.id !== userId);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário.');
    }
  }
}

// Função para pedir confirmação de exclusão
function askToDelete(id: number) {
  deleteUser(id);
}

// Função para abrir o modal
function openModal() {
  showModal.value = true;
}

// Função para fechar o modal
function closeModal() {
  showModal.value = false;
}

// Função para tratar o evento de criação de usuário
function onUserCreated() {
  // Atualizar a lista de usuários após a criação de um novo usuário
  fetchUsers();
  closeModal();
}

// Carregar os usuários ao montar o componente
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
        <BikesDisponiveis />
      </div>

      

      <!-- Segundo container: tabela de usuários -->
      <div class="right-container">
        <button type="button" class="btn btn-primary btn-lg" @click="openModal">
          <i class="bi bi-plus-circle-fill"></i>
          Adicionar Usuário
        </button>
        <TabelaUsuarios :users="users" :askToDelete="askToDelete" />
      </div>
    </div>

    <!-- Modal para adicionar usuário -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <button @click="closeModal" class="close-btn">X</button>
        <!-- Formulário de cadastro de usuário -->
        <CadastroModal @userCreated="onUserCreated" @close="closeModal" />
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
