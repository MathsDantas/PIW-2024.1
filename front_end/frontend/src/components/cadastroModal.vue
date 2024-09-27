<template>
    <div class="modal-container">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">X</button>
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
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue';
  import axiosInstance from '@/axios';
  import { defineEmits } from 'vue';
  import type { RegisterForm } from '@/types/index';
  
 
  const emit = defineEmits(['close', 'userCreated']);
  
 
  
 
  const formData = reactive<RegisterForm>({
    email: '',
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'normal' 
  });
  
 
  const errorMessage = ref<string>('');
  
  
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
        emit('userCreated');
        emit('close');
      }
    } catch (error) {
      console.error(error);
      errorMessage.value = 'Erro ao criar a conta. Tente novamente.';
    }
  };
  

  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  
    .form-group input {
      width: 100%;
      padding: 8px;
      margin-top: 8px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .modal-container {
       position: fixed;
       top: 0;
       left: 0;
       right: 0;
       bottom: 0;
       display: flex;
       justify-content: center;
       align-items: center;
       background-color: rgba(0, 0, 0, 0.5); 
    }
  
    .modal-content {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      width: 400px;
      position: relative;
    }
  
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 18px;
      cursor: pointer;
    }
  
  .register-container {
    font-family: "Inter", sans-serif;
    margin-top: 3%;
    padding: 20px;
    border-radius: 8px;
    background-color: #F1EC41;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }

  .form-group button{
    color: rgb(51, 45, 45);
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .form-group button:hover {
  background-color: #8d8d8d; 
}
  </style>

  