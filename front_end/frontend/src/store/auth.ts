import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwt: '',
    role: ''
  }),
  actions: {
    setAuthData(jwt: string, role: string) {
      this.jwt = jwt;
      this.role = role;
      localStorage.setItem('jwt', jwt);
      localStorage.setItem('role', role);
    },
    loadAuthData() {
      const jwt = localStorage.getItem('jwt');
      const role = localStorage.getItem('role');
      if (jwt && role) {
        this.jwt = jwt;
        this.role = role;
      }
    },
    clearAuthData() {
      this.jwt = '';
      this.role = '';
      localStorage.removeItem('jwt');
      localStorage.removeItem('role');
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.jwt, // Verifica se o JWT está presente
    isAdmin: (state) => state.role === 'admin', // Verifica se a role é "admin"
  }
});
