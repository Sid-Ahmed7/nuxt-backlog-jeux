<script setup lang="ts">
import { useUpcomingGames } from "@/composables/useUpcomingGames";
import GamesList from "@/components/Games/GameList.vue";
import GameFilters from "@/components/Games/GameFilters.vue";
import SearchBar from "~/components/SearchBar.vue";
import Pagination from "@/components/Pagination.vue";

const genresStore = useGenresStore();
const platformsStore = usePlatformsStore();
const themesStore = useThemeStore();
const gameModesStore = useGamesModesStore();

const {
  selectedGenres,
  selectedPlatforms,
  selectedGameModes,
  selectedThemes,
  searchQuery,
  filteredGames,
  paginatedGames,
  currentPage,
  totalPages,
  noResults,
  onSearch,
  gamesPerPage,
  gamesStore,
  error,
} = useUpcomingGames();

const showFilters = ref(false);

watch(showFilters, (open) => {
  document.body.style.overflow = open ? "hidden" : "";
});

onMounted(async () => {
  await platformsStore.fetchPlatforms();
  await genresStore.fetchGenres();
  await themesStore.fetchThemes();
  await gameModesStore.fetchGamesModes();
});
</script>

<template>
  <div class="px-4 py-8 max-w-[1200px] mx-auto flex flex-col items-center">
    <div class="w-full">
      <h1
        class="text-4xl font-bold text-[var(--main-color)] mb-10 text-center w-full"
      >
        Prochaine sortie
      </h1>
      <div class="flex justify-center gap-10 mb-8 w-full">
        <SearchBar @search="onSearch" />
      </div>
    </div>

    <button
      class="bg-[var(--main-color)] text-white border-none p-4 text-base cursor-pointer rounded-lg mb-8"
      @click="showFilters = !showFilters"
    >
      {{ showFilters ? "Masquer les filtres" : "Afficher les filtres" }}
    </button>

    <div
      v-if="showFilters"
      class="fixed top-0 left-0 w-full h-full bg-black/50 z-[1000]"
      @click="showFilters = false"
    ></div>

    <div class="flex w-full max-w-[1200px] gap-8 relative">
      <div
        :class="[
          'bg-[#2d3a3f] p-8 text-white flex flex-col gap-8 fixed top-0 left-0 h-screen w-[300px] z-[1001] transition-all duration-300',
          showFilters
            ? 'translate-x-0 opacity-100'
            : '-translate-x-[120%] opacity-0',
        ]"
      >
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

      <div v-if="error" class="text-red-500 text-center w-full">
        {{ error }}
      </div>

      <div
        v-else-if="noResults"
        class="text-center text-xl text-white mt-8 w-full"
      >
        <h2>Aucun résultat trouvé</h2>
      </div>
      <section v-else class="w-full">
        <GamesList :games="paginatedGames ?? []" :error="error" />
        <div class="flex justify-center mt-6 w-full">
          <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @update:currentPage="currentPage = $event"
          />
        </div>
      </section>
    </div>
  </div>
</template>
