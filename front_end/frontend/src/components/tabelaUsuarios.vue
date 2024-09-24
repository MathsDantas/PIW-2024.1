<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Id</th>
        <th>Nome</th>
        <th>Username</th>
        <th>Bikes Adultas</th>
        <th>Bikes Infantis</th>
        <th>Ações</th>
        <th>Deletar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <!-- Coluna de bikes adultas com opção de alugar -->
        <td>
          {{ countBikes(user.bikes, 'adulto') }}
          <button 
            class="btn btn-sm btn-primary"
            @click="rentBike(user.id, 'adulto')"
            :disabled="!isBikeAvailable('adulto')"
          >
            Alugar Adulto
          </button>
        </td>
        <!-- Coluna de bikes infantis com opção de alugar -->
        <td>
          {{ countBikes(user.bikes, 'infantil') }}
          <button 
            class="btn btn-sm btn-primary"
            @click="rentBike(user.id, 'infantil')"
            :disabled="!isBikeAvailable('infantil')"
          >
            Alugar Infantil
          </button>
        </td>
        <!-- Botão para devolver todas as bikes -->
        <td>
          <button 
            class="btn btn-sm btn-warning" 
            @click="returnAllBikes(user.id)"
            :disabled="user.bikes.length === 0"
          >
            Devolver Todas
          </button>
        </td>
        <!-- Botão para excluir usuário -->
        <td>
          <button @click="askToDelete(user.id)" class="btn btn-sm btn-danger">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import axios from 'axios';

// Tipagem dos usuários e bikes
interface Bike {
  id: number;
  type: string;  // 'adulto' ou 'infantil'
}

interface User {
  id: number;
  name: string;
  username: string;
  bikes: Bike[];
}

// Receber props com tipagem correta
const props = defineProps<{
  users: User[];
  askToDelete: (userId: number) => void;
}>();

// Função para contar bikes de um tipo específico
const countBikes = (bikes: Bike[], type: string) => {
  return bikes.filter(bike => bike.type === type).length;
};

// Função para verificar a disponibilidade de bikes no backend
const isBikeAvailable = async (type: string) => {
  // Exemplo de resposta do backend para verificar bikes disponíveis
  const availableBikes = await fetch(`/api/bikes/available?type=${type}`)
    .then(res => res.json());
  return availableBikes.length > 0;
};

// Função para alugar bikes
const rentBike = async (userId: number, type: string) => {
  const postoId = 1; // ID do posto, modifique conforme necessário
  const data = {
    userId,
    bikesAdu: type === 'adulto' ? 1 : 0,
    bikesInf: type === 'infantil' ? 1 : 0
  };

  try {
    await axios.post(`http://localhost:3000/postos/${postoId}/alugar`, data);
    alert(`${type === 'adulto' ? 'Bike adulta' : 'Bike infantil'} alugada com sucesso!`);
    // Aqui você pode atualizar a lista de usuários ou recarregar os dados
  } catch (error) {
    console.error('Erro ao alugar bike:', error);
    alert('Erro ao alugar bike.');
  }
};

// Função para devolver todas as bikes de um usuário
const returnAllBikes = async (userId: number) => {
  const postoId = 1; // ID do posto, modifique conforme necessário
  const url = `http://localhost:3000/users/${userId}/devolver/${postoId}`;

  try {
    await axios.post(url);
    alert('Bikes devolvidas com sucesso!');
    // Aqui você pode atualizar a lista de usuários ou recarregar os dados
  } catch (error) {
    console.error('Erro ao devolver bikes:', error);
    alert('Erro ao devolver bikes.');
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  text-align: left;
}
.bi-trash {
  color: red;
}
.btn-primary {
  background-color: #4faddb;
}
.btn-warning {
  background-color: #f9c74f;
}
.btn-danger {
  background-color: #f94144;
}
</style>
