<template>
    <div class="conteiner">
      <div class="adu">
        <h2>Bikes para Adultos</h2>
        <h1 class="num" >{{ adultBikes }}</h1>
      </div>
  
      <div class="inf">
        <h2>Bikes Infantis</h2>
        <h1 class="num" >{{ childBikes }}</h1>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  
  export interface Bike {
    id: number;
    type: string;
    status: string;
  }
  
  export default defineComponent({
    props: {
      bikes: {
        type: Array as () => Bike[], // Usando o tipo exportado Bike
        required: true
      }
    },
    setup(props) {
      const adultBikes = computed(() => {
        return props.bikes.filter(bike => bike.type === 'adulto' && bike.status === 'disponível').length;
      });
  
      const childBikes = computed(() => {
        return props.bikes.filter(bike => bike.type === 'infantil' && bike.status === 'disponível').length;
      });
  
      return {
        adultBikes,
        childBikes
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
    height: 450px;
    margin: 50px;
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
  </style>
  