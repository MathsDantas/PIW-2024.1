<template>
    <div class="page">
      <div class="register-container">
        <h2 class="fonte mb-4">Criar Conta</h2>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="name">Seu Nome:</label>
            <input
              type="text"
              v-model="formData.name"
              id="name"
              required
              placeholder="Digite seu nome"
            />
          </div>
  
          <div class="form-group">
            <label for="username">User Name:</label>
            <input
              type="text"
              v-model="formData.username"
              id="username"
              required
              placeholder="Digite seu username"
            />
          </div>
  
          <div class="form-group">
            <label for="email">E-mail:</label>
            <input
              type="email"
              v-model="formData.email"
              id="email"
              required
              placeholder="Digite seu e-mail"
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
            <label for="role">Escolha seu tipo de conta:</label>
            <select v-model="formData.role" id="role" required>
              <option value="normal">Normal</option>
              <option value="admin">Admin</option>
            </select>
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
    </div>
</template>
  
    
<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axiosInstance from '@/axios';
  import type { RegisterForm } from '@/types/index';
  
 
  
  // Dados reativos do formulário
  const formData = reactive<RegisterForm>({
    email: '',
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'normal' 
  });
  
  // Mensagem de erro
  const errorMessage = ref<string>('');
  
  
  const router = useRouter();
  
  
  const onSubmit = async () => {
    
    if (formData.password !== formData.confirmPassword) {
      errorMessage.value = 'As senhas não coincidem.';
      return;
    }
  
    try {
      
      const response = await axiosInstance.post('http://localhost:3000/users', {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role 
      });
  
      if (response.status === 200) {
        alert('Conta criada com sucesso!');
        router.push('/login');
      }
      
    } catch (error) {
      
      console.error(error);
      errorMessage.value = 'Erro ao criar a conta. Tente novamente.';
    } 
  };
</script>
  
    
<style scoped>
  
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Madimi+One&display=swap');
    
  
    /* Estilos para a página de Registero */
    .register-container {
      font-family: "Inter", sans-serif;
      width: 55%;
      height: 80%;
      margin: 5px;
      margin-top: 3%;
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
      background-color: #c4c4c4;
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
    