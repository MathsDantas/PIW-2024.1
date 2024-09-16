<template>
<<<<<<< HEAD
  <div>
    <NavBar position="relative" />
  </div>

  <div class="login-container">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          v-model="formData.email"
          id="email"
          required
          placeholder="Digite seu email"
        />
=======
  <NavBar position="relative" />

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

      <p class="text-center mt-3">
        Não tem uma conta?
        <a href="#" @click.prevent="showRegister = true">Crie uma agora</a>
      </p>

      <div v-if="showRegister" class="register-container">
        <h2 class="text-center mb-4">Registro</h2>
        <form @submit.prevent="submitRegister">
          <div class="form-group mb-3">
            <label for="registerUsername">Username</label>
            <input
              v-model="registerUsername"
              type="text"
              id="registerUsername"
              class="form-control"
              placeholder="Enter your username"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label for="registerPassword">Password</label>
            <input
              v-model="registerPassword"
              type="password"
              id="registerPassword"
              class="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" class="btn btn-success">Register</button>
          <button type="button" class="btn btn-secondary ms-2" @click="showRegister = false">Cancel</button>
        </form>
>>>>>>> e4376c87c3da89e150e4b35964d17bf149c7ae0b
      </div>

      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          type="password"
          v-model="formData.password"
          id="password"
          required
          placeholder="Digite sua senha"
        />
      </div>

      <div class="form-group">
        <button type="submit">Login</button>
      </div>
    </form>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
<<<<<<< HEAD
=======
  </div>
</template>

>>>>>>> e4376c87c3da89e150e4b35964d17bf149c7ae0b

    <div class="create-account">
      <p>Ainda não tem uma conta?</p>
      <router-link to="/register">Criar conta</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

// Definindo a interface para os dados do formulário
interface LoginForm {
  email: string;
  password: string;
}

// Dados reativos do formulário
const formData = reactive<LoginForm>({
  email: '',
  password: ''
});

// Mensagem de erro
const errorMessage = ref<string>('');

const router = useRouter();

// Função para tratar o submit do formulário
const onSubmit = () => {
  // Validação simples
  if (formData.email === 'admin@example.com' && formData.password === 'password123') {
    alert('Login bem-sucedido!');
    // Redirecionamento ou outra ação após o login
  } else {
    errorMessage.value = 'Credenciais inválidas. Tente novamente.';
  }
};
</script>

<style scoped>
/* Estilos para a página Login */
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #F1EC41;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ffffff;
  border-radius: 4px;
}

.form-group button {
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-group button:hover {
  background-color: #d854da;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.create-account {
  margin-top: 20px;
  text-align: center;
}

.create-account p {
  margin-bottom: 8px;
}

.create-account a {
  color: #4CAF50;
  text-decoration: none;
}

.create-account a:hover {
  text-decoration: underline;
}
</style>

  