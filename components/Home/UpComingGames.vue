<script setup lang="ts">
import type { Game } from "@/types/Game";
import "@/assets/styles/games-recommendations.css";

const props = defineProps<{
  games: Game[];
}>();
const { getCoverUrl, formatReleaseDate } = useGameUtils();

const upComingGames = computed(() => {
  return props.games
    .filter(
      (game) =>
        game.first_release_date &&
        game.first_release_date > Math.floor(Date.now() / 1000)
    )
    .sort((a, b) => (a.first_release_date ?? 0) - (b.first_release_date ?? 0))
    .slice(0, 5);
});
</script>

<template>
  <div class="w-full lg:w-auto">
    <div class="flex justify-between items-center mb-4 text-main">
      <h2 class="text-xl font-semibold">Jeux à venir</h2>
      <NuxtLink
        to="/catalogue-de-jeu/prochaine-sortie"
        class="text-main hover:text-main-hover hover:underline"
      >
        Voir plus
      </NuxtLink>
    </div>

    <div v-if="upComingGames.length === 0">
      <p class="text-text-secondary">Aucun jeu à venir.</p>
    </div>

    <div v-else class="flex flex-col gap-4">
      <div
        v-for="game in upComingGames"
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
