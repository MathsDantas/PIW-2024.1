<template>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role.name }}</td>
          <td>
            <RouterLink class="btn btn-sm btn-info" :to="`/users/${user.id}`">
              <i class="bi bi-eye"></i>
            </RouterLink>
            <button @click="askToDelete(user.id)" class="btn btn-sm btn-danger">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  // Definir props para receber os usuários e o método askToDelete
  const props = defineProps({
    users: {
      type: Array,
      required: true
    },
    askToDelete: {
      type: Function,
      required: true
    }
  });
  </script>
  
  <style scoped>
  /* Estilos já existentes */
  .table {
    width: 100%;
    text-align: left;
  }
  </style>
  

