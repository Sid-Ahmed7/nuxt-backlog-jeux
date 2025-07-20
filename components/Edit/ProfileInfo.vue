<script setup lang="ts">
import  type { Database } from '@/supabase'


const supabase = useSupabaseClient<Database>()
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
            .eq('user_id', userId ?? "")


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
  email.value = user.email ?? ""
  actualEmail.value = user.email ?? ""

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
  <div class="max-w-xl mx-auto my-16 p-8 rounded-xl">
    <form @submit.prevent="updateInfoUser" class="flex flex-col gap-6">
      <div class="flex flex-col">
        <label class="font-semibold mb-2 text-white">Email</label>
        <input
          v-model="email"
          type="email"
          class="w-full border border-main text-white rounded-lg px-4 py-3 text-base"
        />
      </div>

      <div class="flex flex-col">
        <label class="font-semibold mb-2 text-white">
          Mot de passe (laisser vide si inchangé)
        </label>
        <input
          v-model="password"
          type="password"
          class="w-full border border-main text-white rounded-lg px-4 py-3 text-base"
        />
      </div>

      <div class="flex flex-col">
        <label class="font-semibold mb-2 text-white">Nom d'utilisateur</label>
        <input
          v-model="username"
          type="text"
          class="w-full border border-main text-white rounded-lg px-4 py-3 text-base"
        />
      </div>

      <div class="flex flex-col">
        <label class="font-semibold mb-2 text-white">Bio</label>
        <textarea
          v-model="bio"
          rows="3"
          class="w-full border border-main text-white rounded-lg px-4 py-3 text-base"
        ></textarea>
      </div>

      <button
        type="submit"
        class="bg-main text-white font-semibold rounded-lg py-3 disabled:cursor-not-allowed disabled:bg-indigo-400"
        :disabled="isUpdate"
      >
        {{ isUpdate ? 'Mise à jour...' : 'Enregistrer les modifications' }}
      </button>
    </form>
  </div>
</template>