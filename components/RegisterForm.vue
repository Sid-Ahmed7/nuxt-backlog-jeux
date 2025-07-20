<script setup lang="ts">
import type { RegisterData } from '@/types/RegisterData'

const props = defineProps<{
  registerForm: RegisterData
  isSubmitting: boolean
  errorMessage: string
  successMessage: string
}>()

const emit = defineEmits<{
  (e: 'submit', registerData: RegisterData): void
}>()



const onSubmit = () => {
  emit('submit', props.registerForm)
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div
      class="flex flex-col gap-4 bg-card rounded-4xl shadow-lg w-[400px] p-6"
    >
      <h2 class="text-center text-2xl font-semibold text-text-primary mb-6">
        Inscription
      </h2>

      <form @submit.prevent="onSubmit" class="flex flex-col space-y-4">
        <div class="w-full">
          <input
            type="text"
            id="username"
            placeholder="Nom d'utilisateur"
            v-model="registerForm.username"
            required
            minlength="3"
            maxlength="15"
            class="w-full px-4 py-3 bg-input text-text-primary border border-border rounded-md text-base placeholder:text-text-secondary focus:outline-none focus:border-main"
          />
        </div>

        <div class="w-full">
          <input
            type="email"
            id="email"
            placeholder="Email"
            v-model="registerForm.email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            class="w-full px-4 py-3 bg-input text-text-primary border border-border rounded-md text-base placeholder:text-text-secondary focus:outline-none focus:border-main"
          />
        </div>

        <div class="w-full">
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            v-model="registerForm.password"
            required
            minlength="8"
            class="w-full px-4 py-3 bg-input text-text-primary border border-border rounded-md text-base placeholder:text-text-secondary focus:outline-none focus:border-main"
          />
        </div>

        <div class="w-full">
          <input
            type="password"
            id="confirm_password"
            placeholder="Confirmez le mot de passe"
            v-model="registerForm.confirmPassword"
            required
            class="w-full px-4 py-3 bg-input text-text-primary border border-border rounded-md text-base placeholder:text-text-secondary focus:outline-none focus:border-main"
          />
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full px-4 py-3 bg-main hover:bg-main-hover disabled:bg-gray-400 disabled:cursor-not-allowed text-text-primary font-medium rounded-md cursor-pointer transition-colors"
        >
          {{ isSubmitting ? "Inscription..." : "S'inscrire" }}
        </button>
      </form>

      <p v-if="successMessage" class="text-green-500 text-sm text-center">
        {{ successMessage }}
      </p>
      <p v-if="errorMessage" class="text-red-500 text-sm text-center">
        {{ errorMessage }}
      </p>

      <p class="text-center text-text-secondary mt-4">
        Déjà inscrit ?
        <NuxtLink
          to="/login"
          class="text-main hover:text-main-hover hover:underline"
        >
          Se connecter
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
