<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useUpComingGames } from '@/stores/useUpComingGamesStore'
import { useGameUtils } from '@/composables/useGameUtils'
import '@/assets/styles/games-recommendations.css'

const upComingGameStore = useUpComingGames()
const {getCoverUrl, formatReleaseDate} = useGameUtils()

onMounted(async () => {
  await upComingGameStore.fetchUpComingGames()
  console.log('Upcoming Games:', upComingGameStore.upComingGames);
  
})

const upcomingGames = computed(() => {
  if (!Array.isArray(upComingGameStore.upComingGames)) {
    return [] 
  }
  return upComingGameStore.upComingGames
})



</script>

<template>
  <div class="upcoming-games">
    <div class="upcoming-games-header">
      <h2>Jeux à venir</h2>
      <NuxtLink to="/catalogue-de-jeu" class="see-more">Voir plus</NuxtLink>
    </div>
    <div v-if="upcomingGames.length === 0">
      <p>Aucun jeu à venir.</p>
    </div>
    <div v-else class="games-lists">
      <div v-for="game in upcomingGames" :key="game.id" class="game-item">
        <div class="game-cover">
          <NuxtLink :to="`/catalogue-de-jeu/${game.name}`">
            <img :src="getCoverUrl(game.cover?.image_id)" :alt="game.name" />
          </NuxtLink>
        </div>
        <div class="game-details">
          <h3>{{ game.name }}</h3>
          <p>{{ formatReleaseDate(game.release_dates?.date) }}</p>
          <p>{{ game.genres?.map(genre => genre.name).join(', ') }}</p>

        </div>
      </div>
    </div>
  </div>
</template>
