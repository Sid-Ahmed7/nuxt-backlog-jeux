<script setup lang="ts">
import { ref } from "vue";
const emit = defineEmits(["submit"]);

const email = ref("");
const password = ref("");

const handleSubmit = () => {
  emit("submit", { email: email.value, password: password.value });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4">
    <div class="w-full">
      <input
        type="email"
        id="email"
        placeholder="Email"
        v-model="email"
        required
        class="w-full px-4 py-2.5 bg-input text-text-primary border border-border rounded-md text-base placeholder:text-text-secondary focus:outline-none focus:border-main"
      />
    </div>
    <div class="w-full">
      <input
        type="password"
        id="password"
        placeholder="Mot de passe"
        v-model="password"
        required
        class="w-full px-4 py-2.5 bg-input text-text-primary border border-border rounded-md text-base placeholder:text-text-secondary focus:outline-none focus:border-main"
      />
    </div>
    <button
      type="submit"
      class="w-full px-4 py-2.5 bg-main hover:bg-main-hover text-text-primary font-medium rounded-md cursor-pointer transition-colors"
    >
      Se connecter
    </button>
  </form>
</template>
