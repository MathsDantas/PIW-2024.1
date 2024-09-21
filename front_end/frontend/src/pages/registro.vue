<template>
    <div>
      <NavBar position="relative" />
    </div>

    <div>
      <br>  <!--gambiarra provisória para o conteudo da página não ficar grudado na Navbar-->
    </div>
  
    <div class="register-container">
      <h2 class="fonte mb-4">Criar Conta</h2>
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
          <label for="confirm-password">Confirmar Senha:</label>
          <input
            type="password"
            v-model="formData.confirmPassword"
            id="confirm-password"
            required
            placeholder="Confirme sua senha"
          />
        </div>
  
        <div class="form-group">
          <button type="submit">Criar Conta</button>
        </div>
      </form>
  
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
  
      <div class="login-link">
        <p>Já tem uma conta?</p>
        <router-link to="/login">Fazer login</router-link>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import NavBar from '@/components/NavBar.vue';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  // Definindo a interface para os dados do formulário
  interface RegisterForm {
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  // Dados reativos do formulário
  const formData = reactive<RegisterForm>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Mensagem de erro
  const errorMessage = ref<string>('');
  
  const router = useRouter();
  
  // Função para tratar o submit do formulário
  const onSubmit = () => {
    // Validação simples
    if (formData.password !== formData.confirmPassword) {
      errorMessage.value = 'As senhas não coincidem.';
      return;
    }
    
    alert('Conta criada com sucesso!');
    // Redirecionamento ou outra ação após a criação da conta
    router.push('/login');
  };
  </script>
  
  <style scoped>
  /* Estilos para a página Register */
  .register-container {
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
  
  .login-link {
    margin-top: 20px;
    text-align: center;
  }
  
  .login-link p {
    margin-bottom: 8px;
  }
  
  .login-link a {
    color: #4CAF50;
    text-decoration: none;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  </style>
  