<template>
  <table class="table table-striped custom-table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Nome</th>
        <th>Username</th>
        <th>Bikes Adultas</th>
        <th>Bikes Infantis</th>
        <th>Devolução</th>
        <th>Deletar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
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
        <td>
          <button 
            class="btn btn-sm btn-warning" 
            @click="returnAllBikes(user.id)"
            :disabled="user.bikes.length === 0"
          >
            Devolver Todas
          </button>
        </td>
        <td>
          <button 
            @click="askToDelete(user.id)" 
            class="btn btn-sm btn-danger"
            :disabled="user.bikes.length > 0"
          >
            <i class="bi bi-trash3-fill"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import axiosInstance from '@/axios';
import { useRoute } from 'vue-router';
import type { Bike, User } from '@/types/index';


const props = defineProps<{
  users: User[];
  askToDelete: (userId: number) => void;
  onUpdateUsers: () => void; 
}>();


const emit = defineEmits(['bikesUpdated']);

const route = useRoute();
const postoId = route.params.id;


const countBikes = (bikes: Bike[], type: string) => {
  return bikes.filter(bike => bike.type === type).length;
};


const isBikeAvailable = async (type: string) => {
  const availableBikes = await fetch(`/api/bikes/available?type=${type}`)
    .then(res => res.json());
  return availableBikes.length > 0;
};


const rentBike = async (userId: number, type: string) => {
  const data = {
    userId,
    bikesAdu: type === 'adulto' ? 1 : 0,
    bikesInf: type === 'infantil' ? 1 : 0
  };

  try {
    await axiosInstance.post(`http://localhost:3000/postos/${postoId}/alugar`, data);
    alert(`${type === 'adulto' ? 'Bike adulta' : 'Bike infantil'} alugada com sucesso!`);
    
    
    props.onUpdateUsers();

    
    const updatedBikes = await fetchUpdatedBikes(); 

    
    emit('bikesUpdated', updatedBikes);
  } catch (error) {
    console.error('Erro ao alugar bike:', error);
    alert('Erro ao alugar bike.');
  }
};


const returnAllBikes = async (userId: number) => {
  const url = `http://localhost:3000/users/${userId}/devolver/${postoId}`;

  try {
    await axiosInstance.post(url);
    alert('Bikes devolvidas com sucesso!');
    
    
    props.onUpdateUsers();
    
    
    const updatedBikes = await fetchUpdatedBikes(); 

    
    emit('bikesUpdated', updatedBikes);
  } catch (error) {
    console.error('Erro ao devolver bikes:', error);
    alert('Erro ao devolver bikes.');
  }
};


async function fetchUpdatedBikes() {
  try {
    const response = await axiosInstance.get(`/postos/${postoId}`);
    return response.data.data.bikes; 
  } catch (error) {
    console.error('Erro ao buscar bikes atualizadas:', error);
    return [];
  }
}
</script>


<style scoped>
.table {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}

.custom-table tbody tr:nth-of-type(odd) {
  background-color: #F1EC41 !important; /* Cor de fundo para linhas ímpares */
}

.custom-table tbody tr:nth-of-type(even) {
  background-color: #FFF7A5 !important; /* Cor de fundo para linhas pares */
}

.bi-trash {
  color: red;
}
.btn-primary {
  background-color: #4faddb;
  font-weight: bold;
}
.btn-warning {
  background-color: #f9c74f;
  font-weight: bold;
}
.btn-danger {
  background-color: #f94144;
}
button:disabled {
  opacity: 0.3;
}
</style>
