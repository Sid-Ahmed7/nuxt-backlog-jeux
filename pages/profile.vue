<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ProfileHeader from '@/components/Profile/ProfileHeader.vue';
import ProfileNavBar from '@/components/Profile/ProfileNavBar.vue';
import GameInProgress from '~/components/Chart/GameStatus.vue';
import GameByPlatform from '@/components/Chart/GameByPlatform.vue';
import GameSpentTime from '@/components/Chart/GameSpentTime.vue';
import SubNavBar from '~/components/Profile/SubNavBar.vue';
import UserGameCard from '@/components/Games/UserGameCard.vue';
import { useUserGamesStore } from '@/stores/useUserGamesStore';
import { useAuthStore } from '@/stores/useAuthStore';


const router = useRouter()
const supabase = useSupabaseClient()
const userGameStore = useUserGamesStore();
const authStore = useAuthStore()
const user = authStore.user
const activeTab = ref<'all' | 'stats'>('all')
const subFilter = ref<'all' | 'finished' | 'inProgress'>('all')



if (!user) {
  router.push('/login')
}

const { data: res, error } = await useAsyncData('profile',  async () => supabase
  .from('user_profiles')
  .select('*')
  .eq('user_id', user?.id || '')
  .maybeSingle())

   if(res.value) {
        await userGameStore.fetchUserGames(user!.id); 
        console.log(userGameStore.fetchUserGames(user!.id))
   } else {
      router.push('/login')
    }


const profile = computed(() => res.value?.data ?? null)

const filteredUserGame = computed(() => {
  if (subFilter.value == 'finished') {
    return userGameStore.userGames.filter(game => game.isFinished)
  } else if (subFilter.value == 'inProgress') {
    return userGameStore.userGames.filter(game => !game.isFinished)
  }
  return userGameStore.userGames

})
</script>

<template>

 <div v-if="profile" class="profile-container">
    
  <ProfileHeader  :user="profile" />
  <ProfileNavBar :selectTab="activeTab" @update:tab="activeTab = $event" />
  
  <div v-if="activeTab === 'all'" class="sub-navbar">
    <SubNavBar :selectTab="activeTab" @update:tab="activeTab = $event" />
    
    <div>
        <UserGameCard
            v-for="userGame in filteredUserGame"
            :key="userGame.game.id"
            :games="userGame"
            ></UserGameCard>
    </div>
    </div>

    <div v-else-if ="activeTab === 'stats'">
      <GameInProgress :games="userGameStore.userGames" />
      <GameByPlatform :games="userGameStore.userGames" />
      <GameSpentTime :games="userGameStore.userGames" />



    </div>

</div>

<div v-else class="loading">
  <p>Chargement du profil...</p>
</div>
</template>

<style scoped>


.sub-navbar {
  margin-top: 2rem;
}
.loading {
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
}
</style>
