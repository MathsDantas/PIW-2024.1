<template>
  <div class="page" v-if="unidade">
    <div class="header">
      <h1>{{ unidade.nameUnidade }}</h1>
      <h2>Endereço: {{ unidade.endereco }}</h2>
    </div>
    <div v-if="isAdmin">
      <RouterLink class="bntAdmin" :to="`/postos/${unidade.id}/servicos`">
        SERVIÇO DE ALUGUEL DE BIKES
      </RouterLink>
    </div>

    <div class="subTitulo">
      <h3>Bikes disponíveis neste posto</h3>
    </div>
    
    <qntBikes :bikes="unidade.bikes"  @update-bikes="fetchUnidadeData" />
  </div>

  <div v-else>
    <p>Carregando dados...</p>
  </div>
</template>

<script lang="ts">
import axiosInstance from '@/axios';
import { defineComponent } from 'vue';
import { useAuthStore } from '@/store/auth';
import qntBikes, { type Bike } from '@/components/qntBikes.vue'; // Importando o componente e tipo
import type { Unidade } from '@/types/index';


export default defineComponent({
  components: {
    qntBikes
  },
  data() {
    return {
      unidade: null as Unidade | null
    };
  },
  computed: {
    isAdmin() {
      const authStore = useAuthStore(); // Acessando o Pinia store
      return authStore.isAdmin; // Getter para verificar se o usuário é admin
    }
  },
  methods: {
    async fetchUnidadeData() {
      try {
        const response = await axiosInstance.get(`http://localhost:3000/postos/${this.$route.params.id}`);
        this.unidade = response.data.data;
      } catch (error) {
        console.error('Erro ao buscar unidade:', error);
      }
    }
  },
  mounted() {
    this.fetchUnidadeData();
  }
});

import router from '@/router';


</script>

<style scoped>

.header {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: xx-large;
  font-weight: 800;
  max-height: 100vh;
  padding-top: 80px;
}

.bntAdmin {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  height: 70px;
  margin-left: 33%;
  background-color: #f1ec41;
  border-radius: 30px;
  font-family: "Inter", sans-serif;
  font-size: 40px;
  color: black;
  font-weight: bold;
  text-decoration: none;
}

.subTitulo {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  font-size: xx-large;
  font-weight: bold;
}
</style>
