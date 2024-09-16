import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home.vue';
import Login from '../pages/login.vue';
import Postos from '../pages/Postos.vue';
<<<<<<< HEAD
import registro from '@/pages/registro.vue';
=======
import postodetalhe from '@/pages/postodetalhe.vue';
>>>>>>> e4376c87c3da89e150e4b35964d17bf149c7ae0b

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
<<<<<<< HEAD
    path: '/register', component: registro
  }
=======
    path: '/postos/1',
    name: 'PostoDetalhe',
    component: postodetalhe,
  },
>>>>>>> e4376c87c3da89e150e4b35964d17bf149c7ae0b
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
