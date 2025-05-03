<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { UserProfile } from '@/types/UserProfile';
import ProfileHeader from '@/components/Profile/ProfileHeader.vue';
import NavBar from '@/components/Profile/NavBar.vue';
import UserGameCard from '@/components/Games/UserGameCard.vue';
import { useUserGamesStore } from '@/stores/useUserGamesStore';


const router = useRouter()
const supabase = useSupabaseClient()
const userGameStore = useUserGamesStore();
const user = ref<UserProfile |  null>(null)
const activeTab = ref<'all' | 'finished' | 'inProgress'>('all')

const { data, error } = await supabase.auth.getUser()
if( error || !data.user) {
 router.push('/login')
} 

const { data: profile, error: profileError } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('user_id', data.user?.id || '')
  .single<UserProfile>()

  if(profile) {
    user.value = {
      ...data.user,
      ...profile,
    }
    
    await userGameStore.fetchUserGames(user.value.id); 
    console.log(userGameStore.fetchUserGames(user.value.id))
  
  } else {
      router.push('/login')
    }

const filteredUserGame = computed(() => {
  if (activeTab.value == 'finished') {
    return userGameStore.userGames.filter(game => game.isFinished)
  } else if (activeTab.value == 'inProgress') {
    return userGameStore.userGames.filter(game => !game.isFinished)
  }
  return userGameStore.userGames

})
</script>

<template>

<div v-if="user" class="profile-container">
<ProfileHeader :user="user"  />
<NavBar :selectTab="activeTab" @update:tab="activeTab = $event" />

<div>
        <UserGameCard
            v-for="userGame in filteredUserGame"
            :key="userGame.id"
            :game="userGame"
            ></UserGameCard>
    </div>
</div>

<div v-else class="loading">
  <p>Chargement du profil...</p>
</div>
</template>

<style scoped>



.loading {
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
}
</style>
