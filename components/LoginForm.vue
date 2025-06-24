<script setup lang="ts">

import {ref} from 'vue';

const emit = defineEmits(['submit'])

const email = ref('')
const password = ref('')

const handleSubmit = () => {
    emit('submit', {email: email.value, password: password.value})
}
</script>

<template>

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

        <button type="submit">Se connecter</button>
    </form>
</template>

<style scoped>
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
</style>