<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Database } from '../supabase'

const supabase = useSupabaseClient<Database>()
const router = useRouter();
const authStore = useAuthStore()

const isSubmitting = ref(false);

const handleSubmit = async ({email, password} : {email:string; password:string}) => {
  isSubmitting.value = true;
  await authStore.login(email, password)


    const {  data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

  if (!authStore.error) {
    router.push('/')
  }
  isSubmitting.value = false


 
    

}

  </script>

<template>
  <div class="container">
    <div class="card">
      <h2>Se connecter</h2>
      <LoginForm @submit="handleSubmit" />
        <p v-if="authStore.error" class="error-message">{{ authStore.error }}</p>
        <p class="switch">
          Pas encore inscrit ? <NuxtLink to="/signup">S'inscrire</NuxtLink>
        </p>
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
