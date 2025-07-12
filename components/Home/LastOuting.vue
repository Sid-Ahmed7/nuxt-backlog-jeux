<script setup lang="ts">
import type { Game } from "@/types/Game";
import "@/assets/styles/games-recommendations.css";

const props = defineProps<{
  games: Game[];
}>();

const { getCoverUrl, formatReleaseDate } = useGameUtils();

const lastOutingGames = computed(() => {
  const lastOuting = props.games.filter((game) => {
    const releaseDate = game.first_release_date;
    return releaseDate && releaseDate < Math.floor(Date.now() / 1000);
  });

  return lastOuting
    .sort((first, second) => {
      const firstReleaseDate = first.first_release_date || 0;
      const secondReleaseDate = second.first_release_date || 0;
      return secondReleaseDate - firstReleaseDate;
    })
    .slice(0, 5);
});
</script>

<template>
  <div class="w-full lg:w-auto">
    <div class="flex justify-between items-center mb-4 text-main">
      <h2 class="text-xl font-semibold">Derniers jeux sortis</h2>
    </div>

    <div v-if="lastOutingGames.length === 0">
      <p class="text-text-secondary">Aucun jeu récent.</p>
    </div>

    <div v-else class="flex flex-col gap-4">
      <div
        v-for="game in lastOutingGames"
        :key="game.id"
        class="flex items-center gap-4 p-3 rounded-md bg-small-card"
      >
        <div class="w-[110px] h-[130px] flex-shrink-0">
          <NuxtLink :to="`/catalogue-de-jeu/${game.slug}`">
            <img
              :src="getCoverUrl(game.cover?.image_id)"
              :alt="game.name"
              class="w-full h-full object-cover rounded"
            />
          </NuxtLink>
        </div>

        <div class="flex flex-col justify-center">
          <h3 class="text-base text-white font-semibold mb-1">
            {{ game.name }}
          </h3>
          <p class="text-sm text-text-secondary mb-1">
            {{ formatReleaseDate(game.first_release_date) }}
          </p>
          <p class="text-sm text-text-secondary">
            {{ game.genres?.map((genre) => genre.name).join(", ") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
