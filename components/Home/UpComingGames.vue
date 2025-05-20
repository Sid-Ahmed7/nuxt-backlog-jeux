<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useGamesStore } from '@/stores/useGamesStore'
import { useGameUtils } from '@/composables/useGameUtils'
import '@/assets/styles/games-recommendations.css'

const gamesStore = useGamesStore()
const {getCoverUrl, formatReleaseDate} = useGameUtils()

const upComingGames = computed(() => {
  const upComing =  gamesStore.games.filter((game)=> {
    const releaseDate = game.first_release_date
    return releaseDate && releaseDate > Math.floor(Date.now() / 1000)
  })

  return upComing.sort((first, second) => {
      const firstReleaseDate = first.first_release_date || 0
      const secondReleaseDate = second.first_release_date || 0
      return firstReleaseDate - secondReleaseDate 
    })
    .slice(0, 5)
  })

onMounted(async () => {
  await gamesStore.fetchGames()  
})


</script>

<template>
  <div class="upcoming-games">
    <div class="upcoming-games-header">
      <h2>Jeux à venir</h2>
      <NuxtLink to="/catalogue-de-jeu" class="see-more">Voir plus</NuxtLink>
    </div>
    <div v-if="upComingGames.length === 0">
      <p>Aucun jeu à venir.</p>
    </div>
    <div v-else class="games-lists">
      <div v-for="game in upComingGames" :key="game.id" class="game-item">
        <div class="game-cover">
          <NuxtLink :to="`/catalogue-de-jeu/${game.name}`">
            <img :src="getCoverUrl(game.cover?.image_id)" :alt="game.name" />
          </NuxtLink>
        </div>
        <div class="game-details">
          <h3>{{ game.name }}</h3>
          <p>{{ formatReleaseDate(game.first_release_date) }}</p>
          <p>{{ game.genres?.map(genre => genre.name).join(', ') }}</p>

        </div>
      </div>
    </div>
  </div>
</template>
