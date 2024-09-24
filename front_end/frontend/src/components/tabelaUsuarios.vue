<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Id</th>
        <th>Nome</th>
        <th>Username</th>
        <th>Bikes Adultas</th>
        <th>Bikes Infantis</th>
        <th>Serviço</th>
        <th>Deletar</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <!-- Contagem de bikes adultas -->
        <td>{{ countBikes(user.bikes, 'adulto') }}</td>
        <!-- Contagem de bikes infantis -->
        <td>{{ countBikes(user.bikes, 'infantil') }}</td>
        <!-- Botão de serviço -->
        <td>
          <button class="btn btn-sm btn-warning" @click="performService(user.id)">
            <i class="bi bi-bicycle"></i>
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
  performService: (userId: number) => void;
}>();

// Função para contar bikes de um tipo específico
const countBikes = (bikes: Bike[], type: string) => {
  return bikes.filter(bike => bike.type === type).length;
};
</script>

<style scoped>
.table {
  width: 100%;
  text-align: left;
}
.bi-bicycle {
  color: yellow;
}
.btn-warning {
  background-color: #f9c74f;
}
.btn-danger {
  background-color: #f94144;
}
</style>
