<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const supabase = useSupabaseClient()


const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isSubmitting = ref(false);

const router = useRouter();

const handleSubmit = async () => {
  errorMessage.value = '';
  isSubmitting.value = true;

  try {
    const {  error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      errorMessage.value = error.message;
    } else {
      router.push('/');
    }
  } catch (err) {
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="container">
    <div class="card">
      <h2>Se connecter</h2>
      <form @submit.prevent="handleSubmit">

        <div class="form-group">
          <input
            type="email"
            id="email"
            placeholder="Email"
            v-model="email"
            required
          />
        </div>

        <div class="form-group">
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            v-model="password"
            required
          />
        </div>

        <button type="submit" :disabled="isSubmitting">Se connecter</button>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <p class="switch">
          Pas encore inscrit ? <NuxtLink to="/signup">S'inscrire</NuxtLink>
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
  background-color: #f7f7f7;
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

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
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
