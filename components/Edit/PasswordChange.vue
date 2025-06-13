<script setup lang="ts">

const supabase = useSupabaseClient()
const router = useRouter()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const { data, error } = await supabase.auth.getUser()
if( error || !data.user) {
  router.push('/login')
}


const changePassword = async () => {

    if(newPassword.value !== confirmPassword.value) {
        alert('Les mots de passe ne correspondent pas')
        return
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.user?.email || '',
        password: currentPassword.value,
    })

    if (signInError) {
        alert('Mot de passe actuel incorrecte')
        return
    }

  const { error } = await supabase.auth.updateUser({ password: newPassword.value })
  if (error) {
    alert('Erreur lors de la mise à jour du mot de passe')
  } else {
    alert('Mot de passe mis à jour avec succès')
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  }
}


</script>

<template>
    <form @submit.prevent="changePassword">
        <div class="form-group">
            <label for="password">Nouveau mot de passe</label>
            <input type="password" id="password" v-model="newPassword" required />
        </div>
        <button type="submit">Changer le mot de passe</button>
    </form>
</template>