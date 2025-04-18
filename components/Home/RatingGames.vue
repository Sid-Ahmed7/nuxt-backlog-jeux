<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useGamesStore } from '@/stores/useGamesStore'
import { useGameUtils } from '@/composables/useGameUtils'
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
    return game.total_rating_count !== undefined
  })

  return topRated
    .sort((a, b) => {
      return (b.total_rating_count ?? 0) - (a.total_rating_count ?? 0)
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
          <NuxtLink :to="`/catalogue-de-jeu/${game.name}`">
            <img :src="getCoverUrl(game.cover?.image_id)" :alt="game.name" />
          </NuxtLink>
        </div>
        <div class="game-details">
          <h3>{{ game.name }}</h3>
          <p>{{ game.genres?.map(genre => genre.name).join(', ') }}</p>
          <p>{{ formatRating(game.total_rating_count) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


