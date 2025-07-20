<script setup lang="ts">
import GamesList from "@/components/Games/GameList.vue";
import GameFilters from "@/components/Games/GameFilters.vue";
import SearchBar from "~/components/SearchBar.vue";
import Pagination from "@/components/Pagination.vue";

const genresStore = useGenresStore();
const platformsStore = usePlatformsStore();
const themesStore = useThemeStore();
const gameModesStore = useGamesModesStore();
const { gameData } = await useGames();

const {
  selectedGenres,
  selectedPlatforms,
  selectedGameModes,
  selectedThemes,
  paginatedGames,
  currentPage,
  games,
  totalPages,
  noResults,
  onSearch,
  error,
} = useGameFilters();

const showFilters = ref(false);

watch(
  () => gameData.value,
  (newGames) => {
    games.value = newGames ?? [];
  },
  { immediate: true }
);

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
  <div class="px-4 py-8 max-w-screen-xl mx-auto flex flex-col items-center">
    <div class="w-full mb-10 text-center">
      <h1 class="text-4xl font-bold text-main mb-6">Catalogue des jeux</h1>
      <div class="flex justify-center gap-10 mb-6 w-full">
        <SearchBar @search="onSearch" />
      </div>
    </div>

    <button
      class="bg-amber-800 hover:bg-amber-700 text-white px-4 py-2 rounded mb-6 self-end cursor-pointer"
      @click="showFilters = !showFilters"
    >
      {{ showFilters ? "Masquer les filtres" : "Afficher les filtres" }}
    </button>

    <div
      v-if="showFilters"
      class="fixed inset-0 bg-opacity-50 z-50"
      @click="showFilters = false"
    ></div>

    <div class="flex w-full relative gap-8">
      <div
        class="bg-card text-white p-8 flex flex-col gap-6 fixed top-0 left-0 h-screen w-72 z-[1001] transition-all duration-300"
        :class="{
          '-translate-x-full opacity-0': !showFilters,
          'translate-x-0 opacity-100': showFilters,
        }"
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
      <div class="flex-1">
        <div v-if="error" class="text-red-500 text-center">{{ error }}</div>

        <div v-else-if="noResults">
          <h2 class="text-xl text-main text-center mt-8">
            Aucun résultat trouvé
          </h2>
        </div>
        <div v-else class="w-full">
          <GamesList :games="paginatedGames" :error="error" />
          <Pagination
            :currentPage="currentPage"
            :totalPages="totalPages"
            @update:currentPage="currentPage = $event"
          />
        </div>
      </div>
    </div>
  </div>
</template>
