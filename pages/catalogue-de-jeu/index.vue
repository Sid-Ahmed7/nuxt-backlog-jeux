<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useGamesStore } from '@/stores/useGamesStore'
import { useGenresStore } from '@/stores/useGenresStore'
import { usePlatformsStore } from '@/stores/usePlatformsStore'
import { useThemeStore } from '@/stores/useThemeStore'
import { useGamesModesStore } from '@/stores/useGamesModesStore'
import GamesList from '@/components/Games/GameList.vue'
import GameFilters from '@/components/Games/GameFilters.vue'
import SearchBar from '@/components/Games/SearchBar.vue'
import Pagination from '@/components/Pagination.vue'


const gamesStore = useGamesStore()
const genresStore = useGenresStore()
const platformsStore = usePlatformsStore()
const themesStore = useThemeStore()
const gameModesStore = useGamesModesStore()

const selectedGenres = ref<string[]>([])
const selectedPlatforms = ref<string[]>([])
const selectedGameModes = ref<string[]>([])
const selectedThemes = ref<string[]>([])
// const selectedRating = ref<[number, number]>([1, 10])
const searchQuery = ref<string>('')
const showFilters = ref(false)
const error = ref<string | null>(null)

const currentPage = ref(1)
const gamesPerPage = 100


const onSearch = (query: string) => {
  searchQuery.value = query.toLowerCase()
}

const filters = computed(() => {
  return gamesStore.games.filter((game) => {
    const matchesSearch = game.name?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesPlatform =
      selectedPlatforms.value.length === 0 ||
      (Array.isArray(game.platforms) &&
        game.platforms.some((platform) => selectedPlatforms.value.includes(platform.name)))

        const matchesGenre =
        selectedGenres.value.length === 0 ||  
      (Array.isArray(game.genres) &&
        game.genres.some((genre) => selectedGenres.value.includes(genre.name))) 

        const matchesGameMode =
        selectedGameModes.value.length === 0 ||
      (Array.isArray(game.game_modes) &&
        game.game_modes.some((gameMode) => selectedGameModes.value.includes(gameMode.name)))

        const matchesTheme =
        selectedThemes.value.length === 0 ||
      (Array.isArray(game.themes) &&
        game.themes.some((theme) => selectedThemes.value.includes(theme.name)))

    return matchesSearch && matchesPlatform && matchesGenre && matchesGameMode && matchesTheme 
  })
})

const noResults = computed (() => {
  return filters.value.length === 0 
})

const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * gamesPerPage
  const end = start + gamesPerPage
  return filters.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filters.value.length / gamesPerPage)
})

onMounted(async () => {
  await gamesStore.fetchGames()
  await platformsStore.fetchPlatforms()
  await genresStore.fetchGenres()
  await themesStore.fetchThemes()
  await gameModesStore.fetchGamesModes()
  console.log('Games:', gamesStore.games)
})
</script>

<template>
  <div class="catalogue-view">
    <h1 class="catalogue-title">Catalogue des jeux</h1>
    <div class="search-bar">
      <SearchBar @search="onSearch" />
    </div>
    <button class="toggle-filters" @click="showFilters = !showFilters">
      {{ showFilters ? 'Masquer les filtres' : 'Afficher les filtres' }}
    </button>
    <div class="content" :class="{ 'filters-open': showFilters }">
      <div v-if="showFilters" class="filters">
        <GameFilters
          :platforms="platformsStore.platforms"
          :genres="genresStore.genres"
          :themes="themesStore.themes"
          :gameModes="gameModesStore.gamesModes"
          v-model:selectedGenre="selectedGenres"
          v-model:selectedPlatforms="selectedPlatforms"
          v-model:selectedGameMode="selectedGameModes"
          v-model:selectedTheme="selectedThemes"
        />
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <div v-else-if="noResults" class="no-results">
        <h2>Aucun résultat trouvé</h2>
        </div>
      <section class="games-section" v-else>
        <GamesList :games="paginatedGames" :colums="showFilters ? 5 : 8" :error="error" />
        <div class="pagination">
      <Pagination :currentPage="currentPage" :totalPages="totalPages" @update:currentPage="currentPage = $event" />
    </div>
      </section>
    
    </div>
  </div>
</template>

<style scoped>
.catalogue-view {
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.catalogue-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--main-color);
  margin-bottom: 2.5rem;
  text-align: center;
  width: 100%;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 2rem;
  width: 100%;
}

.content {
  position: relative;
  display: flex;
  justify-content: center;
  gap: 4rem;
  width: 100%;
  max-width: 100%;
}

.filters {
  max-width: 20%;
}

.toggle-filters {
  background-color: var(--main-color);
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}
.no-results {
  text-align: center;
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-top: 2rem;
  width: 100%;
  padding: 1.25rem;

}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  width: 100%;
}

.pagination button {
  background-color: #007bff;
  color: white;
  border: none;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:hover {
  background-color: #0056b3;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
