<template>
  <div class="conteiner">
    <div class="adu">
      <h2>Bikes para Adultos</h2>
      <h1 class="num">{{ adultBikes }}</h1>
      <div class="buttons">
        <button v-if="authStore.isAdmin" @click="addBike('adulto')" class="btn">+</button>
        <button v-if="authStore.isAdmin" @click="removeBike('adulto')" class="btn" :disabled="adultBikes <= 0">-</button>
      </div>
    </div>

    <div class="inf">
      <h2>Bikes Infantis</h2>
      <h1 class="num">{{ childBikes }}</h1>
      <div class="buttons">
        <button v-if="authStore.isAdmin" @click="addBike('infantil')" class="btn">+</button>
        <button v-if="authStore.isAdmin" @click="removeBike('infantil')" class="btn" :disabled="childBikes <= 0">-</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted } from 'vue';
import axiosInstance from '@/axios';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import type { Bike } from '@/types/index'; 




export default defineComponent({
  props: {
    bikes: {
      type: Array as () => Bike[],
      required: true
    }
  },
  setup(props, { emit }) {

    const route = useRoute();
    const postoId = route.params.id;
    const authStore = useAuthStore();

    const adultBikes = computed(() => {
      return props.bikes.filter(bike => bike.type === 'adulto' && bike.status === 'disponível').length;
    });

    const childBikes = computed(() => {
      return props.bikes.filter(bike => bike.type === 'infantil' && bike.status === 'disponível').length;
    });

    // Função para recarregar as bikes quando houver mudanças
    const reloadBikes = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:3000/postos/${postoId}`);
        emit('update-bikes', response.data.data.bikes); 
      } catch (error) {
        console.error('Erro ao recarregar as bikes:', error);
      }
    };

    // Adicionar uma bike
    const addBike = async (type: string) => {
      try {
        await axiosInstance.post(`http://localhost:3000/bikes`, {
          type,
          status: 'disponível',
          postoId
        });
        await reloadBikes(); 
      } catch (error) {
        console.error('Erro ao adicionar bike:', error);
      }
    };

    // Remover uma bike
    const removeBike = async (type: string) => {
      try {
        const bikeToRemove = props.bikes.find(bike => bike.type === type && bike.status === 'disponível');
        if (bikeToRemove) {
          await axiosInstance.delete(`http://localhost:3000/bikes/${bikeToRemove.id}`);
          await reloadBikes(); 
        } else {
          alert('Nenhuma bike disponível para remoção.');
        }
      } catch (error) {
        console.error('Erro ao remover bike:', error);
      }
    };

    
    watch(() => props.bikes, (newBikes) => {
      
      console.log('Bikes foram atualizadas', newBikes);
    }, { immediate: true }); 

    // Quando o componente for montado, já carregamos as bikes
    onMounted(() => {
      reloadBikes();
    });

    return {
      adultBikes,
      childBikes,
      addBike,
      removeBike,
      authStore
    };
  }
});

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Madimi+One&display=swap');

.conteiner {
  font-family: "Inter", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}

.adu,
.inf {
  background-color: #f1ec41;
  border-radius: 30px;
  width: 400px;
  height: 530px;
  margin: 20px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.num {
  font-family: "Inter", sans-serif;
  margin-top: 0;
  font-size: 300px;
}

.buttons {
  margin-top: 0px;
}

.btn {
  font-size: 2rem;
  background-color: #4faddb;
  border: none;
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
  color: white;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
