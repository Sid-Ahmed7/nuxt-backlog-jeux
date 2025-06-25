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
    <div class="form-container">

      <form @submit.prevent="updateInfoUser" class="form">
        <div class="form-group">
          <label class="block">Email</label>
          <input v-model="email" type="email" class="w-full border px-3 py-2 rounded" />
        </div>
  
        <div class="form-group">
          <label class="block">Mot de passe (laisser vide si inchangé)</label>
          <input v-model="password" type="password" class="w-full border px-3 py-2 rounded" />
        </div>
  
        <div class="form-group">
          <label class="block">Nom d'utilisateur</label>
          <input v-model="username" type="text" class="w-full border px-3 py-2 rounded" />
        </div>
  
        <div class="form-group"> 
          <label class="block">Bio</label>
          <textarea v-model="bio" class="w-full border px-3 py-2 rounded" rows="3"></textarea>
        </div>
  
        <button
          type="submit"
          class="submit-btn"
          :disabled="isUpdate"
        >
          {{ isUpdate ? 'Mise à jour...' : 'Enregistrer les modifications' }}
        </button>
      </form>
    </div>
  </template>


  <style scoped>
  .form-container {
    max-width: 600px;
    margin: 4rem auto;
    padding: 2rem;
    border-radius: 1rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display:flex;
    flex-direction : column;
  }

  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--main-color);
  }

  input,textarea {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  .submit-btn {
    background-color: var(--main-color);
    color: #fff;
    font-weight: 600;
    padding: 0.75rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  .submit-btn:disabled {
    cursor: not-allowed;
  }






  </style>