import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App); // Crie a instância do aplicativo
const pinia = createPinia(); // Crie a instância do Pinia

app.use(pinia); // Use o Pinia
app.use(router); // Use o Vue Router
app.mount('#app'); // Monte o aplicativo
