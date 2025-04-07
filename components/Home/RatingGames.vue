<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useGamesStore } from '@/stores/useGamesStore'
import { useGameUtils } from '@/composables/usegameUtils'
import '@/assets/styles/games-recommendations.css'


const gamesStore = useGamesStore()
const { getCoverUrl, formatRating } = useGameUtils()

onMounted(async () => {
  await gamesStore.fetchGames()
})

const topRatedGames = computed(() => {
  if (!Array.isArray(gamesStore.games)) {
    return [] 
  }

  const topRated = gamesStore.games.filter((game) => {
    return game.rating !== undefined
  })

  return topRated
    .sort((a, b) => {
      return (b.rating ?? 0) - (a.rating ?? 0)
    })
    .slice(0, 5)
})



</script>

<template>
  <div class="rating-games">
    <div class="rating-games-header">
      <h2>Jeux les mieux notés</h2>
    </div>
    <div class="games-lists">
      <div v-for="game in topRatedGames" :key="game.id" class="game-item">
        <div class="game-cover">
          <img :src="getCoverUrl(game.cover?.image_id)" :alt="game.name" />
        </div>
        <div class="game-details">
          <h3>{{ game.name }}</h3>
          <p>{{ formatRating(game.rating) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


