<script setup lang="ts">
import { on } from 'events'


const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const logout = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw('Error lors de la déconnexion:')
  } else {
    router.push('/')
  }
}


onMounted(() => {
    logout()
})
</script>
<template></template>