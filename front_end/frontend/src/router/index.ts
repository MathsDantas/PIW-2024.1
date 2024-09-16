import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home.vue';
import Login from '../pages/login.vue';
import Postos from '../pages/Postos.vue';
import registro from '@/pages/registro.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/postos',
    name: 'Postos',
    component: Postos,
  },
  {
    path: '/register', component: registro
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
