<template>
  <div>
    <NavBar position="relative" />
    <h1>Lista de Usuários</h1>
    <ul>
      <li v-for="user in users" :key="user.id">Nome: {{ user.name }}</li>
      <li v-for="user in users" :key="user.id">Usuário: {{ user.username }}</li>
      <li v-for="user in users" :key="user.id">E-mail: {{ user.email }}</li>
      <li v-for="user in users" :key="user.id">Bikes de Adultos: {{ user.BikesAdu }}</li>
      <li v-for="user in users" :key="user.id">Bikes de Crianças: {{ user.BikesInf }}</li>
    </ul>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from 'axios'

export default {
  name: 'UserList', // Adicionando o nome do componente
  components: {
    NavBar // Registrando o componente NavBar
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/users'); // URL do backend
        this.users = response.data.data;
      } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
      }
    }
  },
  mounted() {
    this.fetchUsers();  // Chama o método quando o componente for montado
  }
}
</script>
