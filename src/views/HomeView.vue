<script setup>
import { storeToRefs } from 'pinia';
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/database';

const userStore = useUserStore();
const useDatabase = useDatabaseStore();
const { userData } = storeToRefs(userStore);
useDatabase.getUrls();
</script>

<template>
  <main>
    <div class="d-flex justify-space-between">
      <h1>Home</h1>
      <v-avatar :image="userData?.photo"></v-avatar>
    </div>
    <h5>Bienvenido {{ userData?.email }}</h5>
    <div
      class="d-flex justify-center align-center mt-8"
      v-if="useDatabase.loadingDoc"
    >
      <h1 class="text-center">Cargando ...</h1>
      <v-progress-circular
        class="ml-4"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <div class="mt-5" v-else>
      <h3>Mis URLs</h3>
      <v-table class="elevation-2">
        <thead>
          <tr>
            <th class="text-left text-blue" bgcolor="azure">ID</th>
            <th class="text-left text-blue" bgcolor="azure">URL</th>
            <th class="text-left text-blue" bgcolor="azure">Nombre</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in useDatabase.documents" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.short }}</td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </main>
</template>
