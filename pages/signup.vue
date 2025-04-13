<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const username = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const router = useRouter()

async function signUp() {

  if (!username.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Tous les champs sont obligatoires.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas.'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = 'Le mot de passe doit contenir au moins 8 caractères.'
    return
  }

  isSubmitting.value = true

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })

    if (error) {
      errorMessage.value = error.message
      isSubmitting.value = false
    } else {
      if (!data.user) {
        throw new Error('Aucune donnée de l\'utilisateur');
      }
      const {error } = await supabase
      .from('user_profiles')
      .insert([
        {
          user_id: data.user.id,
          username: username.value
        },
      ])


      router.push('/login')
    }
  } catch (error) {
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer.'
    isSubmitting.value = false
  }
}
</script>



<template>
  <div class="container">
    <div class="card">
      <h2>S'inscrire</h2>
      <form @submit.prevent="">

        <div class="form-group">
          <input
            type="text"
            id="username"
            placeholder="Nom d'utilisateur"
            v-model="username"
            required
            minlength="3"
            maxlength="15"
          />
          <p v-if="!username || username.length < 3" class="error">
            Le nom d'utilisateur doit comporter entre 3 et 15 caractères.
          </p>
        </div>

        <div class="form-group">
          <input
            type="email"
            id="email"
            placeholder="Email"
            v-model="email"
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
          <p v-if="!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)" class="error">
            L'email est invalide.
          </p>
        </div>

        <div class="form-group">
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            v-model="password"
            required
            minlength="8"
          />
          <p v-if="!password || password.length < 8" class="error">
            Le mot de passe doit contenir au moins 8 caractères.
          </p>
        </div>

        <div class="form-group">
          <input
            type="password"
            id="confirm_password"
            placeholder="Confirmez le mot de passe"
            v-model="confirmPassword"
            required
          />
          <p v-if="password !== confirmPassword" class="error">
            Les mots de passe ne correspondent pas.
          </p>
        </div>

        <button type="submit" @click="signUp">S'inscrire</button>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <p class="switch">
          Déjà inscrit ? <router-link to="/login">Se connecter</router-link>
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

.error {
  color: red;
  font-size: 14px;
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
