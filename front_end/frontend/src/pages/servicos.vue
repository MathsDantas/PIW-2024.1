<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import TabelaUsuarios from '@/components/tabelaUsuarios.vue';
import QntBikes from '@/components/qntBikes.vue';
import axios from 'axios';
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/store/auth';
import CadastroModal from '@/components/cadastroModal.vue';
import router from '@/router';

// Interceptor para adicionar o JWT no cabeçalho de todas as requisições
axios.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.jwt;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para lidar com respostas 401 (Unauthorized)
axios.interceptors.response.use(response => {
  return response;
}, error => {
  const authStore = useAuthStore();

  if (error.response && error.response.status === 401) {
    authStore.clearAuthData(); // Limpa os dados de autenticação no Pinia e localStorage
    // Redireciona para a página de login
    router.push('/login');
  }

  return Promise.reject(error);
});

// Tipagem para a unidade e usuário
interface Bike {
  id: number;
  type: string;
  status: string; // Propriedade opcional
}

interface Unidade {
  id: number;
  nameUnidade: string;
  endereco: string;
  bikes: Bike[];
}

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

const unidade = ref<Unidade | null>(null);
const users = ref<User[]>([]);
const showModal = ref(false);
const authStore = useAuthStore();
let fetchInterval: number | null = null; // Variável para armazenar o intervalo

// Função para buscar a unidade com base no ID da URL
async function fetchUnidadeData() {
  try {
    const response = await axios.get(`http://localhost:3000/postos/${window.location.pathname.split('/')[2]}`);
    unidade.value = response.data.data;
  } catch (error) {
    console.error('Erro ao buscar unidade:', error);
  }
}

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
      users.value = users.value.filter(user => user.id !== userId);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      alert('Erro ao excluir usuário.');
    }
  }
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
  fetchUsers();
  closeModal();
}

// Carregar os dados ao montar o componente e definir o intervalo
onMounted(() => {
  fetchUnidadeData();
  fetchUsers();

  // Definir intervalo para buscar os dados a cada 10 segundos (10.000 ms)
  fetchInterval = window.setInterval(() => {
    fetchUnidadeData();
    fetchUsers();
  }, 100);
});

// Limpar o intervalo quando o componente for desmontado
onUnmounted(() => {
  if (fetchInterval) {
    clearInterval(fetchInterval);
  }
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
      <!-- Primeiro container: bikes disponíveis -->
      <div class="left-container" v-if="unidade">
        <QntBikes :bikes="unidade.bikes" />
      </div>

      <!-- Segundo container: tabela de usuários -->
      <div class="right-container">
        <button type="button" class="btn btn-primary btn-lg" @click="openModal">
          <i class="bi bi-plus-circle-fill"></i>
          Adicionar Usuário
        </button>
        <TabelaUsuarios :users="users" :askToDelete="deleteUser" />
      </div>
    </div>

    <!-- Modal para adicionar usuário -->
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
  max-width: 50%;
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
