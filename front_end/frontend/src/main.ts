import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';





createApp(App)
.use(router)
.mount('#app');


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Criando a instância do Pinia
const pinia = createPinia()

// Criando a instância do Vue
const app = createApp(App)

// Usando o Pinia como store no aplicativo
app.use(pinia)

// Montando o app
app.mount('#app')