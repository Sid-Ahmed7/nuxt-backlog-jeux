<script setup lang="ts">
import type { Game } from '@/types/Game'
import '@/assets/styles/games-recommendations.css'


const props = defineProps<{
  games: Game[]
}>()
const {getCoverUrl, formatReleaseDate} = useGameUtils()



const upComingGames = computed(() => {
  return props.games
    .filter((game) => game.first_release_date && game.first_release_date > Math.floor(Date.now() / 1000))
    .sort((a, b) => (a.first_release_date ?? 0) - (b.first_release_date ?? 0))
    .slice(0, 5)
  })
</script>

<template>
  <div class="upcoming-games">
    <div class="upcoming-games-header">
      <h2>Jeux à venir</h2>
      <NuxtLink to="/catalogue-de-jeu/prochaine-sortie" class="see-more">Voir plus</NuxtLink>
    </div>
    <div v-if="upComingGames.length === 0">
      <p>Aucun jeu à venir.</p>
    </div>
    <div v-else class="games-lists">
      <div v-for="game in upComingGames" :key="game.id" class="game-item">
        <div class="game-cover">
          <NuxtLink :to="`/catalogue-de-jeu/${game.slug}`">
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
