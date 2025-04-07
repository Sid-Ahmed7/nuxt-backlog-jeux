<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useUpComingGames } from '@/stores/useUpcomingGamesStore'
import { useGameUtils } from '@/composables/useGameUtils'
import '@/assets/styles/games-recommendations.css'

const upComingGameStore = useUpComingGames()
const {getCoverUrl, formatReleaseDate} = useGameUtils()

onMounted(async () => {
  await upComingGameStore.fetchUpComingGames()
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
      <nuxt-link to="/jeux" class="see-more">Voir plus</nuxt-link>
    </div>
    <div v-if="upcomingGames.length === 0">
      <p>Aucun jeu à venir.</p>
    </div>
    <div v-else class="games-lists">
      <div v-for="game in upcomingGames" :key="game.id" class="game-item">
        <div class="game-cover">
          <img :src="getCoverUrl(game.cover?.image_id)" :alt="game.name" />
        </div>
        <div class="game-details">
          <h3>{{ game.name }}</h3>
          <p>{{ game.release_dates }}</p>
          <p>{{ game.genres }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
