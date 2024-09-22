<template>
  <div>
   
    <!-- Conteúdo principal -->
    <div class="login-container">
      <h2 class="fonte mb-4">Login</h2>
      <form @submit.prevent="submitLogin">
        <div class="form-group mb-3">
          <label for="username">Username</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="form-control"
            placeholder="Enter your username"
            required
          />
        </div>

        <div class="form-group mb-3">
          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="d-grid gap-2 col-6 mx-auto">
              
          <button class="btn btn-light" type="button">Button</button>
          
      
        </div>

        
      </form>

      <p v-if="errorMessage" class="error mt-3">{{ errorMessage }}</p>

      <!-- Link para criar uma conta -->
      <p class="text-center mt-3">
        Não tem uma conta? 
        
         <router-link to="/register">Crie uma agora</router-link>
      </p>

      
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: null
    };
  },
  methods: {
    async submitLogin() {
      try {
        // Envia uma requisição POST para o backend
        const response = await axios.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
        });

        // Armazena o token JWT em localStorage ou Vuex (como preferir)
        localStorage.setItem('token', response.data.data.jwt);

        // Redireciona o usuário após o login bem-sucedido
        this.$router.push('/admin'); // Exemplo de redirecionamento
      } catch (error) {
        // Trata o erro e exibe uma mensagem ao usuário
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
 @import url('https://fonts.cdnfonts.com/css/coolvetica-2');

/* Estilos da área de login e registro */
.login-container {
  max-width: 400px;
  margin: 100px auto 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color:  #F1EC41;
}

h2 {
  margin-bottom: 20px;
}

.error {
  color: red;
  text-align: center;
}

.register-container {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
} 

.fonte {

  font-family: 'Coolvetica', sans-serif;
  
}


/* Estilos do cabeçalho */
header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  
}
.custom-header {
background-color:  #F1EC41; /* Cor personalizada */
}
nav ul {
list-style: none;
padding: 0;
margin: 0;
display: flex;
}

nav .nav-item {
margin-left: 15px;
}

nav .nav-link {
color: #ffffff;
text-decoration: none;
}

nav .nav-link:hover {
text-decoration: underline;
}

.background {
background-image: url('https://plus.unsplash.com/premium_photo-1661393019836-067a90df6f68?q=80&w=1941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
background-size: cover; 
background-position: center; 
background-repeat: no-repeatheight 100vh;
}
</style>
