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
const user = useSupabaseUser()
const activeTab = ref<'all' | 'finished' | 'inProgress'>('all')

if (!user.value) {
  router.push('/login')
}

const { data: res, error } = await useAsyncData('profile',  async () => supabase
  .from('user_profiles')
  .select('*')
  .eq('user_id', user.value!.id || '')
  .maybeSingle())

   if(res.value) {
        await userGameStore.fetchUserGames(user.value!.id); 
        console.log(userGameStore.fetchUserGames(user.value!.id))
   } else {
      router.push('/login')
    }
    const profile = computed(() => res.value?.data ?? null)


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

<div v-if="profile" class="profile-container">
<ProfileHeader  :user="profile" />

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
