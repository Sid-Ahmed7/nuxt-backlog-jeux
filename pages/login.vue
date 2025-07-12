<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { Database } from "../supabase";
import { useAuthStore } from "@/stores/useAuthStore";

const supabase = useSupabaseClient<Database>();
const router = useRouter();
const authStore = useAuthStore();

const isSubmitting = ref(false);

const handleSubmit = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  isSubmitting.value = true;
  await authStore.login(email, password);

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (!authStore.error) {
    router.push("/");
  }
  isSubmitting.value = false;
};
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="flex flex-col justify-between gap-4 bg-card text-white rounded-4xl shadow-lg w-96 p-6"
    >
      <h2 class="text-center mb-6 text-2xl font-semibold text-text-primary">
        Se connecter
      </h2>

      <LoginForm @submit="handleSubmit" />
      <p v-if="authStore.error" class="text-red-500 text-sm text-center mt-2">
        {{ authStore.error }}
      </p>
      <p class="text-center mt-4 text-text-secondary">
        Pas encore inscrit ?
        <NuxtLink
          to="/signup"
          class="text-main hover:text-main-hover hover:underline"
          >S'inscrire</NuxtLink
        >
      </p>
    </div>
  </div>
</template>
