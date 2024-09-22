<template>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Id</th>
        <th>Nome</th>
        <th>Username</th>
        <th>Email</th>
        <th>Bikes</th>
        <th>Role</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.bikes.length }}</td>
        <td>{{ user.role.name }}</td>
        <td>
          <!-- Link para visualizar usuário -->
          <RouterLink class="btn btn-sm btn-info" :to="`/users/${user.id}`">
            <i class="bi bi-eye"></i>
          </RouterLink>
          <!-- Botão para excluir usuário -->
          <button @click="askToDelete(user.id)" class="btn btn-sm btn-danger">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
// Tipagem dos usuários
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

// Receber props com tipagem correta
const props = defineProps<{
  users: User[];
  askToDelete: (userId: number) => void;
}>();
</script>

<style scoped>
.table {
  width: 100%;
  text-align: left;
}
</style>
