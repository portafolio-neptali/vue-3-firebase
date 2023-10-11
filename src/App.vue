<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useUserStore } from './stores/user';

const userStore = useUserStore();
</script>

<template>
  <header>
    <div class="wrapper">
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

        <button @click="userStore.logOut">Logout</button>
      </nav>
    </div>
  </header>
  <v-container>
    <RouterView />
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
