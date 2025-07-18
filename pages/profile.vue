<script setup lang="ts">
import { useRouter } from 'vue-router';
import ProfileHeader from '@/components/Profile/ProfileHeader.vue';
import ProfileNavBar from '@/components/Profile/ProfileNavBar.vue';
import GameInProgress from '~/components/Chart/GameStatus.vue';
import GameByPlatform from '@/components/Chart/GameByPlatform.vue';
import UserGameCard from '@/components/Games/UserGameCard.vue';
import Pagination from '@/components/Pagination.vue';

import type { Game } from '@/types/Game';
import type { UserGame } from '@/types/UserGame';


const router = useRouter()
const supabase = useSupabaseClient()
const userGameStore = useUserGamesStore();
const authStore = useAuthStore()
const {transformUserGame} = useGameUtils()
const user = authStore.user
const activeTab = ref<'all' | 'stats'>('all')
const currentPage = ref(1)
const gamesPerPage = 6

if (!user) {
  router.push('/login')
}

const { data: res, error } = await useAsyncData('profile',  async () => supabase
  .from('user_profiles')
  .select('*')
  .eq('user_id', user?.id || '')
  .maybeSingle())

const profile = computed(() => res.value?.data ?? null)


const { data: gamesData } = await useAsyncData('detailedUserGames', async () => {
    if (!user?.id) return []

  await userGameStore.fetchUserGames(user.id)

  const gameData = await Promise.all(
    userGameStore.userGames.map(async (userGame: any) => {
      try {
        const game = await $fetch<Game[]>(`/api/userGames/${userGame.id_game}`)
        
        return transformUserGame(userGame,game[0])
      } catch (e) {
        console.error(`Erreur lors du fetch du jeu ${userGame.id_game}`, e)
        return null
      }
    })
  )

  return gameData.filter(Boolean) as UserGame[]
})

watch(() => gamesData.value, (newVal) => {
  if(newVal) {
    userGameStore.setGames(newVal)
  }
}, {immediate: true})

const userGamesWithDetails = computed(() => userGameStore.userGames ?? [])

const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * gamesPerPage
  return userGamesWithDetails.value.slice(start, start + gamesPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(userGamesWithDetails.value.length / gamesPerPage)
})

</script>

<template>

 <div v-if="profile" class="profile-container">
    
  <ProfileHeader  :user="profile" />
  <ProfileNavBar :selectTab="activeTab" @update:tab="activeTab = $event" />
  
  <div v-if="activeTab === 'all'" class="sub-navbar">
    
    <div class="user-games">
        <UserGameCard
            v-for="userGame in paginatedGames"
            :key="userGame.game.id"
            :games="userGame"
            ></UserGameCard>
    </div>
    <Pagination 
     v-if="userGamesWithDetails.length > 0"

      :totalPages="totalPages"
      :currentPage="currentPage"
      @update:currentPage="currentPage = $event" /> 
    </div>

    <div v-else-if ="activeTab === 'stats'" class="stats">
      <div class="chart-card">
      <GameInProgress :games="userGamesWithDetails" />
      </div>
      <div class="chart-card">
      <GameByPlatform :games="userGamesWithDetails" />
      </div>
    </div>

</div>

<div v-else class="loading">
  <p>Chargement du profil...</p>
</div>
</template>

<style scoped>

.user-games {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap:1.5rem;
  padding: 1rem;
}
.sub-navbar {
  margin-top: 2rem;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
}

.chart-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  max-width: 600px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
}


.loading {
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
}
</style>
