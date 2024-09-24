import { createRouter, createWebHistory, type NavigationGuardNext } from 'vue-router';
import Home from '../pages/home.vue';
import Login from '../pages/login.vue';
import Postos from '../pages/postos.vue';
import Registro from '@/pages/registro.vue';
import Admin from '@/pages/Admin.vue';
import { useAuthStore } from '@/store/auth'; // Importa o store de autenticação
import Postodetalhe from '@/pages/postodetalhe.vue';
import servicos from '@/pages/servicos.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/postos', name: 'Postos', component: Postos, meta: { requiresAuth: true } },
  { path: '/postos/:id', name: 'PostoDetalhe', component: Postodetalhe, meta: { requiresAuth: true } },
  { path: '/register', name: 'Registro', component: Registro },
  { path: '/posto/:id/servicos', name: 'servicos', component: servicos, meta: { requiresAuth: true, requiresAdmin: true } }, // Rota protegida
  { path: '/admin', name: 'Administrador', component: Admin },
  { path: '/logout', name: 'Logout', component: {
      template: '<div></div>', // Componente vazio
      beforeRouteEnter(to: any, from: any, next: (arg0: string) => void) {
        const authStore = useAuthStore();
        authStore.clearAuthData(); // Limpa os dados da autenticação
        next('/'); // Redireciona para a página de home
      }
    }
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
