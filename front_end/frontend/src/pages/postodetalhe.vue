<template>
    <div>
      <NavBar position="relative" />
      <h2>Página do POSTO DE ALUGUEL 1</h2>
    </div>
    
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue';

  export default {   //Caso a NavBar não apareça na parte superior ok simm:( 
  name: 'Postos',
  components: {
    NavBar, // Registrando o componente NavBar
  },
};
  </script>
  
  <style scoped>
  </style>
  