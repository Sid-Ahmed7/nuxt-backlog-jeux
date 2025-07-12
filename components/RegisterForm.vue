<script setup lang="ts">
import type { RegisterData } from '@/types/RegisterData';

const router = useRouter();
const authStore = useAuthStore();
const registerForm = ref<RegisterData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const errorMessage = ref<string>('');
const successMessage = ref<string>('');
const isSubmitting = ref<boolean>(false);

const validateForm = (): boolean => {
    if (!registerForm.value.username || registerForm.value.username.length < 3 || registerForm.value.username.length > 15) {
        errorMessage.value = 'Le nom d\'utilisateur doit comporter entre 3 et 15 caractères.';
        return false;
    }
      if (!registerForm.value.email) {
        errorMessage.value = "L'email est invalide.";
        return false;
  }

    if (!registerForm.value.password || registerForm.value.password.length < 6) {
        errorMessage.value = 'Le mot de passe doit comporter au moins 6 caractères.';
        return false;
    }
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
        errorMessage.value = 'Les mots de passe ne correspondent pas.';
        return false;
    }
    errorMessage.value = '';
    return true;
}

const registerUser = async () => {

    if(!validateForm()) {
        return
    }

    isSubmitting.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    try {
        const response = await authStore.register({
            username: registerForm.value.username,
            email: registerForm.value.email,
            password: registerForm.value.password
        })

        if(authStore.error) {
            errorMessage.value = authStore.error;
        } else {
        successMessage.value = response;
        registerForm.value = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }

        router.push('/login');
    }
    } catch (error) {
        errorMessage.value = (error as Error).message;
    } finally {
        isSubmitting.value = false;
    }
} 

</script>


<template>
  <div class="container">
    <div class="card">
      <h2>S'inscrire</h2>
      <form @submit.prevent="registerUser">

        <div class="form-group">
          <input
            type="text"
            id="username"
            placeholder="Nom d'utilisateur"
            v-model="registerForm.username"
            required
            minlength="3"
            maxlength="15"
          />
        </div>

        <div class="form-group">
          <input
            type="email"
            id="email"
            placeholder="Email"
            v-model="registerForm.email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />

        </div>

        <div class="form-group">
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            v-model="registerForm.password"
            required
            minlength="6"
          />
        </div>

        <div class="form-group">
          <input
            type="password"
            id="confirm_password"
            placeholder="Confirmez le mot de passe"
            v-model="registerForm.confirmPassword"
            required
          />
        </div>

        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "Inscription..." : "S'inscrire" }}
        </button>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <p class="switch">
          Déjà inscrit ? <NuxtLink to="/login">Se connecter</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.success {
  color: green;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}

.error-message {
  color: red;
   font-size: 14px;
  text-align: center;
  margin-top: 10px;
}

.switch {
  text-align: center;
  margin-top: 10px;
}

.switch a {
  color: #007bff;
  text-decoration: none;
}
</style>
