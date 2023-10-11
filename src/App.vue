<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useUserStore } from './stores/user';

const userStore = useUserStore();
</script>

<template>
  <header v-if="!userStore.loadingSession">
    <nav class="d-flex justify-space-between">
      <div>
        <RouterLink v-if="userStore.userData" class="link" to="/"
          >Home</RouterLink
        >

        <RouterLink v-if="!userStore.userData" class="link" to="/login"
          >Login</RouterLink
        >

        <RouterLink v-if="!userStore.userData" class="link" to="/register"
          >Registro</RouterLink
        >
      </div>

      <button v-if="userStore.userData" @click="userStore.logOut">
        Logout
      </button>
    </nav>
  </header>
  <v-container v-if="!userStore.loadingSession">
    <RouterView />
  </v-container>
  <v-container v-else>
    <div class="d-flex justify-center align-center mt-8">
      <h1 class="text-center">Cargando ...</h1>
      <v-progress-circular
        class="ml-4"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
  </v-container>
</template>
<style>
header {
  padding: 15px 10px;
  color: #fff;
  background-color: #000;
}
body {
  background-color: #f0eaea;
}
.link {
  color: #fff;
  text-decoration: none;
  margin: 0 5px;
}
</style>
