import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home.vue';
import Login from '../pages/login.vue';
import Postos from '../pages/Postos.vue';
import postodetalhe from '@/pages/postodetalhe.vue';

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
    path: '/postos/1',
    name: 'PostoDetalhe',
    component: postodetalhe,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
