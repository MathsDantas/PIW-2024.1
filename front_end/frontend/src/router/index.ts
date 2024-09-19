import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home.vue';
import Login from '../pages/login.vue';
import Postos from '../pages/postos.vue';
import postodetalhe from '@/pages/postodetalhe.vue';
import Registro from '@/pages/registro.vue';
import users from '@/pages/users.vue';

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
  {
    path: '/register',
    name: 'Registro',
    component: Registro,
  },
  {
    path: '/users',
    name: 'Usuários',
    component: users,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
