<script setup lang="ts">
import type { Game } from "@/types/Game";
import "@/assets/styles/games-recommendations.css";

const props = defineProps<{
  games: Game[];
}>();

const { getCoverUrl, formatRating } = useGameUtils();

const topRatedGames = computed(() => {
  if (!Array.isArray(props.games)) {
    return [];
  }

  const topRated = props.games.filter((game) => {
    return game.total_rating_count;
  });

  return topRated
    .sort((a, b) => {
      return (b.total_rating_count ?? 0) - (a.total_rating_count ?? 0);
    })
    .slice(0, 5);
});
</script>

<template>
  <div class="w-full lg:w-auto">
    <div class="flex justify-between items-center mb-4 text-main">
      <h2 class="text-xl font-semibold">Jeux les mieux notés</h2>
    </div>

    <div v-if="topRatedGames.length === 0">
      <p class="text-text-secondary">Aucun jeu noté.</p>
    </div>

    <div v-else class="flex flex-col gap-4">
      <div
        v-for="game in topRatedGames"
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
            {{ game.genres?.map((genre) => genre.name).join(", ") }}
          </p>
          <p class="text-sm text-text-secondary">
            {{ formatRating(game.total_rating_count) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
