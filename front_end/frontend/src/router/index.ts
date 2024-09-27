import { createRouter, createWebHistory, type NavigationGuardNext } from 'vue-router';
import Home from '../pages/home.vue';
import Login from '../pages/login.vue';
import Postos from '../pages/postos.vue';
import Registro from '@/pages/registro.vue';
import { useAuthStore } from '@/store/auth'; // Importa o store de autenticação
import Postodetalhe from '@/pages/postodetalhe.vue';
import servicos from '@/pages/servicos.vue';
import userdetalhe from '@/pages/userdetalhe.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Registro', component: Registro },
  { path: '/user/:id', name: 'UserDetalhe', component: userdetalhe, meta: { requiresAuth: true } },
  { path: '/postos', name: 'Postos', component: Postos, meta: { requiresAuth: true } },
  { path: '/postos/:id', name: 'PostoDetalhe', component: Postodetalhe, meta: { requiresAuth: true } },
  { path: '/postos/:id/servicos', name: 'servicos', component: servicos, meta: { requiresAuth: true, requiresAdmin: true } },
  { 
    path: '/logout', 
    name: 'Logout', 
    component: {
      template: '<div></div>', // Componente vazio
      beforeRouteEnter(to: any, from: any, next: (arg0: string) => void) {
        const authStore = useAuthStore();
        authStore.clearAuthData(); // Limpa os dados da autenticação
        next('/'); // Redireciona para a página de home
      }
    }
  },
  { 
    path: '/:catchAll(.*)', // Captura todas as rotas não definidas
    redirect: '/' // Redireciona para a home
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardas de rota
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.loadAuthData(); // Carrega os dados de autenticação

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' }); // Redireciona para login se não estiver autenticado
  } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next({ name: 'Home' }); // Redireciona para home se não for admin
  } else {
    next(); // Permite a navegação
  }
});

export default router;
