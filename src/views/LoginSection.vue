<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

const userStore = useUserStore();
const email = ref('');
const password = ref('');
const form = ref(false);

const rules = {
  required: (value) => !!value || 'Field is required',
};

// Methods
const handleSubmit = async () => {
  if (!form.value) return;
  await userStore.loginUser(email.value, password.value);
};
</script>

<template>
  <h1 class="text-center">Login</h1>
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
        :rules="[rules.required]"
      ></v-text-field>
      <v-btn
        :loading="userStore.loading"
        :disabled="userStore.loading"
        class="mt-2"
        color="secondary"
        block
        type="submit"
        >Login</v-btn
      >
      <v-btn
        :loading="userStore.loading"
        :disabled="userStore.loading"
        class="mt-3"
        block
        @click="userStore.registroGoogle"
      >
        Sign in with google
        <img class="ml-2" src="@/assets/google-icon.png" width="23" />
      </v-btn>
    </v-card>
  </v-form>
</template>

<style></style>
