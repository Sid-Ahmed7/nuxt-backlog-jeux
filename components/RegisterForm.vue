<script setup lang="ts">
import type { RegisterData } from "@/types/RegisterData";

const router = useRouter();
const authStore = useAuthStore();
const registerForm = ref<RegisterData>({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const errorMessage = ref<string>("");
const successMessage = ref<string>("");
const isSubmitting = ref<boolean>(false);

const validateForm = (): boolean => {


  if(!registerForm.value.username &&
     !registerForm.value.email &&
     !registerForm.value.password &&
     !registerForm.value.confirmPassword
    ) {
      errorMessage.value = "Veuillez remplir tous les champ";
      return false
    }  
   else if (
    !registerForm.value.username ||
    registerForm.value.username.length < 3 ||
    registerForm.value.username.length > 15
  ) {
    errorMessage.value =
      "Le nom d'utilisateur doit comporter entre 3 et 15 caractères.";
    return false;
  }
  else if (!registerForm.value.email) {
    errorMessage.value = "L'email est invalide.";
    return false;
  }

  else if (!registerForm.value.password || registerForm.value.password.length < 6) {
    errorMessage.value =
      "Le mot de passe doit comporter au moins 6 caractères.";
    return false;
  }
  else if (registerForm.value.password !== registerForm.value.confirmPassword) {
    errorMessage.value = "Les mots de passe ne correspondent pas.";
    return false;
  } else {
  errorMessage.value = "";
  return true;
  }

};

const registerUser = async () => {
  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const response = await authStore.register({
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password,
    });

    if (authStore.error) {
      errorMessage.value = authStore.error;
    } else {
      successMessage.value = response;
      registerForm.value = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      };

      router.push("/login");
    }
  } catch (error) {
    errorMessage.value = (error as Error).message;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen">
    <div
      class="flex flex-col gap-4 bg-card rounded-4xl shadow-lg w-[400px] p-6"
    >
      <h2 class="text-center text-2xl font-semibold text-text-primary mb-6">
        Inscription
      </h2>

      <form @submit.prevent="registerUser" class="flex flex-col space-y-4">
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
