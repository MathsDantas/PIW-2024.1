import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuthStore } from './store/auth';

const app = createApp(App); // Crie a instância do aplicativo
const pinia = createPinia(); // Crie a instância do Pinia

app.use(pinia); // Use o Pinia
app.use(router); // Use o Vue Router
app.mount('#app'); // Monte o aplicativo

// Carregar dados de autenticação do localStorage quando o app for iniciado
const authStore = useAuthStore();
authStore.loadAuthData(); // Carrega os dados ao iniciar a aplicação
