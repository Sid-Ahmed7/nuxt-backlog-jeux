<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue'
import type { RegisterData } from '@/types/RegisterData'

const router = useRouter()
const authStore = useAuthStore()

const registerForm = ref<RegisterData>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)

const validateForm = (): boolean => {
  if (
    !registerForm.value.username ||
    registerForm.value.username.length < 3 ||
    registerForm.value.username.length > 15
  ) {
    errorMessage.value = "Le nom d'utilisateur doit comporter entre 3 et 15 caractères."
    return false
  }
  if (!registerForm.value.email) {
    errorMessage.value = "L'email est invalide."
    return false
  }
  if (!registerForm.value.password || registerForm.value.password.length < 6) {
    errorMessage.value = "Le mot de passe doit comporter au moins 6 caractères."
    return false
  }
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    errorMessage.value = "Les mots de passe ne correspondent pas."
    return false
  }
  errorMessage.value = ''
  return true
}

const handleRegister = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await authStore.register({
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password,
    })
    if (authStore.error) {
      errorMessage.value = authStore.error
    } else {
      successMessage.value = response
      registerForm.value = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      }
      router.push('/login')
    }
  } catch (err) {
    errorMessage.value = (err as Error).message
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <RegisterForm 
    :register-form="registerForm"
    :is-submitting="isSubmitting"
    :error-message="errorMessage"
    :success-message="successMessage"
    @submit="handleRegister" />
</template>
