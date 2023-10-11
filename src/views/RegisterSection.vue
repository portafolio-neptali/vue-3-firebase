<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

// Data
const userStore = useUserStore();
const email = ref('');
const password = ref('');
const form = ref(false);
// const loading = ref(false);

const rules = {
  required: (value) => !!value || 'Field is required',
  minLength: (value) =>
    value.length >= 6 || 'Contraseña debe contener un minimo de 6 caracteres',
};

// Methods
const handleSubmit = async () => {
  if (!form.value) return;
  // loading.value = true;
  await userStore.registerUser(email.value, password.value);
  // loading.value = false;
};
</script>

<template>
  <h1 class="text-center">Registrate</h1>
  <v-form
    class="mt-2"
    v-model="form"
    lazy-validation
    @submit.prevent="handleSubmit"
  >
    <v-card width="500" class="mx-auto pa-5">
      <v-text-field
        variant="outlined"
        placeholder="Ingrese email"
        type="email"
        v-model="email"
        :rules="[rules.required]"
      ></v-text-field>
      <v-text-field
        variant="outlined"
        placeholder="Ingrese contraseña"
        type="password"
        v-model="password"
        :rules="[rules.required, rules.minLength]"
      ></v-text-field>
      <v-btn
        :loading="userStore.loading"
        :disabled="userStore.loading"
        class="mt-2"
        color="primary"
        block
        type="submit"
        >Registrar</v-btn
      >
      <v-btn
        :loading="userStore.loading"
        :disabled="userStore.loading"
        class="mt-3"
        block
        @click="userStore.registroGoogle"
      >
        Sign up with google
        <img class="ml-2" src="@/assets/google-icon.png" width="23" />
      </v-btn>
    </v-card>
  </v-form>
</template>

<style></style>
