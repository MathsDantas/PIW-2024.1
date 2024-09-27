<template>
    <div class="page" >
        <div class="titulo">
            <h1 class="perfil" >Seu Perfil</h1>
            <h3>Suas informações pessoais.</h3>
        </div>
        <div class="dados">
            <UpdateUser />
        </div>
    </div>
</template>

<script setup="ts">
import UpdateUser from '@/components/updateUser.vue';



</script>

<style scoped>

.page {
    margin-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 200vh;
}

.perfil {
    font-size: 80px;
}

.titulo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 2px;
}

</style>