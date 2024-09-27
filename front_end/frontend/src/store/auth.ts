import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwt: '',
    role: '',
    userId: null as number | null,
  }),
  actions: {
    setAuthData(jwt: string, role: string, userId: number) {
      this.jwt = jwt;
      this.role = role;
      this.userId = userId; // Armazena o userId
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', userId.toString()); // Salva o userId no localStorage
    },
    loadAuthData() {
      const jwt = localStorage.getItem('jwt');
      const role = localStorage.getItem('role');
      const userId = localStorage.getItem('userId'); // Carrega o userId do localStorage
      if (jwt && role) {
        this.jwt = jwt;
        this.role = role;
        this.userId = userId ? Number(userId) : null; // Define o userId como um número
      }
    },
    clearAuthData() {
      this.jwt = '';
      this.role = '';
      this.userId = null; // Limpa o userId
      localStorage.removeItem('jwt');
      localStorage.removeItem('role');
      localStorage.removeItem('userId'); // Remove o userId do localStorage
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.jwt,
    isAdmin: (state) => state.role === 'admin',
  }
});
