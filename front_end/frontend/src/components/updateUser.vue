<template>
    <div class="page">
      <div class="register-container">
        <h2 class="fonte mb-4">Atualizar seus dados cadastrais:</h2>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="name">Atualizar Nome:</label>
            <input
              type="text"
              v-model="formData.name"
              id="name"
              required
              placeholder="Digite seu nome"
              :disabled="!editionMode"
            />
          </div>
  
          <div class="form-group">
            <label for="username">Atualziar User Name:</label>
            <input
              type="text"
              v-model="formData.username"
              id="username"
              required
              placeholder="Digite seu username"
              :disabled="!editionMode"
            />
          </div>
  
          <div class="form-group">
            <label for="email">Atualizar E-mail:</label>
            <input
              type="email"
              v-model="formData.email"
              id="email"
              required
              placeholder="Digite seu e-mail"
              :disabled="!editionMode"
            />
          </div>
  
          <div class="form-group">
            <label for="password">Atualizar Senha (opicional):</label>
            <input
              type="password"
              v-model="formData.password"
              id="password"
              
              placeholder="Digite sua senha"
              :disabled="!editionMode"
            />
          </div>
  
          <div class="form-group">
            <label for="confirm-password">Confirmar atualização de Senha (opicional):</label>
            <input
              type="password"
              v-model="formData.confirmPassword"
              id="confirm-password"
              
              placeholder="Confirme sua senha"
              :disabled="!editionMode"
            />
          </div>
  
          <div class="form-group">
            <button v-if="editionMode" type="submit">Atualizar Dados</button>
          </div>

          <div class="form-group">
            <button v-if="!editionMode" @click="toogleEdit" >Habilitar Edição</button>
          </div>
        </form>
  
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { reactive, ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import axiosInstance from '@/axios';
  import type { RegisterForm } from '@/types/index';
  import { useAuthStore } from '@/store/auth';
  
  const authStore = useAuthStore();
  authStore.loadAuthData(); 
  const UserId = authStore.userId;

  const editionMode = ref(false)
  
  
  const formData = reactive<RegisterForm>({
    email: '',
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  
  
  const errorMessage = ref<string>('');
  
  // Router para navegação após o registro
  const router = useRouter();
  
  const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get(`http://localhost:3000/users/${UserId}`);
    const userData = response.data.data;

   
    formData.name = userData.name;
    formData.username = userData.username;
    formData.email = userData.email;
    

    console.log(formData); 
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    errorMessage.value = 'Erro ao carregar seus dados. Tente novamente.';
  }
};


function toogleEdit() {
  editionMode.value = !editionMode.value
}

  
const onSubmit = async () => {
  if (formData.password !== formData.confirmPassword) {
    errorMessage.value = 'As senhas não coincidem.';
    return;
  }

  try {
    const response = await axiosInstance.put(`http://localhost:3000/users/${UserId}`, {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    if (response.status === 200) {
      alert('Dados Atualizados com sucesso!');
      
      await fetchUserData(); 
      editionMode.value = false; // Desabilita o modo de edição
    }
    
  } catch (error) {
    console.error(error);
    errorMessage.value = 'Erro ao atualizar suas informações. Tente novamente.';
  }
};

  
  onMounted(fetchUserData);
</script>
  
    
<style scoped>
  
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Madimi+One&display=swap');
    
  
    /* Estilos para a página Register */
    .register-container {
      font-family: "Inter", sans-serif;
      width: 55%;
      height: 80%;
      margin: 5px;
      margin-top: 1%;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #F1EC41;
    }
    
    .form-group {
      margin-bottom: 16px;
      font-weight: bold;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 8px;
    }
    
    .form-group input {
      width: 100%;
      padding: 8px;
      font-size: 14px;
      font-weight: 400;
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
    