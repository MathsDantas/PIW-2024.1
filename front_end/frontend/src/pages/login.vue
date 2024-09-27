<template>
  <div class="page" >

    <div class="foto"></div>
    <div class="login-container">
      <h2 class="fonte mb-4">Login</h2>
      <form @submit.prevent="submitLogin">
        <div class="form-group mb-3">
          <label for="username">Username:</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="form-control"
            placeholder="Digite seu Username"
            required
          />
        </div>

        <div class="form-group mb-3">
          <label for="password">Senha:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="form-control"
            placeholder="Digite sua Senha"
            required
          />
        </div>

        <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn btn-light" type="submit">Login</button>
        </div>
      </form>

      <p v-if="errorMessage" class="error mt-3">{{ errorMessage }}</p>

      <!-- Link para criar uma conta -->
      <p class="text-center mt-3">
        Não tem uma conta? <br /> 
        <router-link to="/register">Crie uma agora</router-link>
      </p>
    </div>
    
    
  </div>

</template>

<script>
import axiosInstance from '@/axios';
import { useAuthStore } from '@/store/auth'; 

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: null,
    };
  },
  methods: {
    async submitLogin() {
      try {
        console.log("Tentando fazer login com:", this.username, this.password);
        const response = await axiosInstance.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        });

        console.log("Resposta do login:", response.data);
        const { jwt, role, id } = response.data.data;
        const authStore = useAuthStore();
        authStore.setAuthData(jwt, role, id); // Armazena os dados na store

        this.$router.push('/postos'); // Redireciona para onde quiser
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Username ou senha inválidos';
        } else {
          this.errorMessage = 'Ocorreu um erro ao tentar fazer login. Tente novamente.';
        }
      }
    }
  }
};
</script>


<style scoped>

.page {
  display: flex;
  width: 100vw; 
  height: 100vh; 
  align-items: center;
  justify-content: center; 
  
}

.foto{
  width: 120vh;
  height: 100vh; 
  background-image: url('../assets/bikes_amarelas.jpg'); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  }


.login-container {
  display: flex;
  flex-direction: column;
  justify-content: stretch ;
  height: 450px;
  width: 400px;
  font-size: 25px;
  font-family: "Inter", sans-serif;
  margin: 0 auto; 
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #F1EC41;
}

.error {
  color: red;
  text-align: center;
}

.fonte {
  font-family: "Inter", sans-serif;
  font-size: 40px;
}

</style>
