<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const { userData } = storeToRefs(userStore);
</script>

<template>
  <main>
    <div class="d-flex justify-space-between">
      <h1>Home</h1>
      <v-avatar :image="userData.photo"></v-avatar>
    </div>
    <h5>Bienvenido {{ userData.email }}</h5>
  </main>
</template>
