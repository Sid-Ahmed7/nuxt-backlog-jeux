<script setup lang="ts">
import type { Filter } from "@/types/Filter";
import FilterItems from "./FilterItems.vue";
const props = defineProps<{
  platforms: Filter[];
  genres: Filter[];
  gameModes: Filter[];
  themes: Filter[];
  selectedPlatforms: string[];
  selectedGenre: string[];
  selectedGameMode: string[];
  selectedTheme: string[];
}>();

const emit = defineEmits();

const selectedPlatform = ref(props.selectedPlatforms || []);
const selectedGenreRef = ref(props.selectedGenre || []);
const selectedGameMode = ref(props.selectedGameMode || []);
const selectedTheme = ref(props.selectedTheme || []);

watch(selectedPlatform, (newPlatforms) => {
  emit("update:selectedPlatforms", newPlatforms);
});
watch(selectedGenreRef, (newGenre) => {
  emit("update:selectedGenre", newGenre);
});
watch(selectedGameMode, (newGameMode) => {
  emit("update:selectedGameMode", newGameMode);
});
watch(selectedTheme, (newTheme) => {
  emit("update:selectedTheme", newTheme);
});
</script>

<template>
  <div
    class="w-full bg-card text-white p-8 flex flex-col gap-8 overflow-y-auto"
  >
    <FilterItems
      title="Filtrer par plateforme"
      :items="platforms"
      v-model="selectedPlatform"
    />
    <FilterItems
      title="Filtrer par genre"
      :items="genres"
      v-model="selectedGenreRef"
    />
    <FilterItems
      title="Filtrer par mode de jeu"
      :items="gameModes"
      v-model="selectedGameMode"
    />
    <FilterItems
      title="Filtrer par theme"
      :items="themes"
      v-model="selectedTheme"
    />
  </div>
</template>
