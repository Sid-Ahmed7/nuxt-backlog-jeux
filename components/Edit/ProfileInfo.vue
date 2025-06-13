<script setup lang="ts">


const supabase = useSupabaseClient()
const router = useRouter()

const email = ref<string>('')
const username = ref<string>('')
const bio = ref<string>('')
const password = ref<string>('')
const actualEmail = ref<string>('')
const actualUsername = ref<string>('')
const actualBio = ref<string>('')
const isUpdate = ref<boolean>(false)



const updateInfoUser = async () => {
    isUpdate.value = true

    if(email.value !== actualEmail.value) {
        const {error} = await supabase.auth.updateUser({email: email.value})
        if(error) {
            alert('Erreur lors de la mise a jour')
        } else {
            actualEmail.value = email.value
        }
    }

    if(password.value.trim() !== '') {
        const {error} = await supabase.auth.updateUser({password: password.value})
        if(error) {
            alert('Erreur lors de la mise a jour')
        } else {
            password.value = ''
        }
    }

    if(username.value !== actualUsername.value || bio.value !== actualBio.value) {
        const {data: sessionData} = await supabase.auth.getSession()
        const userId = sessionData.session?.user.id
          const { error } = await supabase
            .from('user_profiles')
            .update({ username: username.value, bio: bio.value } as any)
            .eq('user_id', userId)


        if(error) {
            alert('Erreur lors de la mise a jour')
        } else {
            actualUsername.value = username.value
            actualBio.value = bio.value
        }
    }
    isUpdate.value = false
    alert('profil mis à jour')

}

onMounted(async () => {
  const { data, error } = await supabase.auth.getSession()

  if (!data?.session) {
    return router.push('/login')
  }

  const user = data.session.user
  email.value = user.email
  actualEmail.value = user.email

  const { data: userProfile, error: userProfileError } = await supabase
    .from('user_profiles')
    .select('username, bio')
    .eq('user_id', user.id)
    .maybeSingle()

  if (userProfile) {
    username.value = userProfile.username
    bio.value = userProfile.bio || ''
    actualUsername.value = userProfile.username
    actualBio.value = userProfile.bio || ''
  } else {
    await supabase.from('user_profiles').insert({
      user_id: user.id,
      username: '',
      bio: ''
    })

    const { data: newProfile } = await supabase
      .from('user_profiles')
      .select('username, bio')
      .eq('user_id', user.id)
      .maybeSingle()

    if (newProfile) {
      username.value = newProfile.username
      bio.value = newProfile.bio || ''
      actualUsername.value = newProfile.username
      actualBio.value = newProfile.bio || ''
    }
  }
})



</script>
<template>
    <div class="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 class="text-2xl font-semibold mb-4">Modifier le profil</h2>
  
  
      <form @submit.prevent="updateInfoUser" class="space-y-4">
        <div>
          <label class="block">Email</label>
          <input v-model="email" type="email" class="w-full border px-3 py-2 rounded" />
        </div>
  
        <div>
          <label class="block">Mot de passe (laisser vide si inchangé)</label>
          <input v-model="password" type="password" class="w-full border px-3 py-2 rounded" />
        </div>
  
        <div>
          <label class="block">Nom d'utilisateur</label>
          <input v-model="username" type="text" class="w-full border px-3 py-2 rounded" />
        </div>
  
        <div>
          <label class="block">Bio</label>
          <textarea v-model="bio" class="w-full border px-3 py-2 rounded" rows="3"></textarea>
        </div>
  
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          :disabled="isUpdate"
        >
          {{ isUpdate ? 'Mise à jour...' : 'Enregistrer les modifications' }}
        </button>
      </form>
    </div>
  </template>