<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGamesStore } from '@/stores/useGamesStore'
import { useGameUtils } from '@/composables/useGameUtils'
import defaultCover from '@/assets/images/default_cover.png'
import '@/assets/styles/games-recommendations.css'


const gamesStore = useGamesStore()
const {getCoverUrl, formatReleaseDate} = useGameUtils()

onMounted(async () => {
  await gamesStore.fetchGames()
})

const lastOutingGames = computed(() => {
  const lastOuting = gamesStore.games.filter((game) => {
    const releaseDate = game.first_release_date
    return releaseDate && releaseDate < Math.floor(Date.now() / 1000)
  })

  return lastOuting
    .sort((first, second) => {
      const firstReleaseDate = first.first_release_date || 0
      const secondReleaseDate = second.first_release_date || 0
      return secondReleaseDate - firstReleaseDate
    })
    .slice(0, 5)
})


</script>

<template>
  <div class="last-outing">
    <div class="last-outing-header">
      <h2>Derniers jeux sortis</h2>
      <NuxtLink to="/catalogue-de-jeu" class="see-more">Voir plus</NuxtLink>
    </div>
    <div class="games-lists">
      <div v-for="game in lastOutingGames" :key="game.id" class="game-item">
        <div class="game-cover">
          <img :src="getCoverUrl(game.cover?.image_id)" :alt="game.name" />
        </div>
        <div class="game-details">
          <h3>{{ game.name }}</h3>
          <p>{{ formatReleaseDate(game.first_release_date) }}</p>
          <p>{{ game.genres.map(genre => genre.name).join(', ') }}</p>

        </div>
      </div>
    </div>
  </div>
</template>
