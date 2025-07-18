<script setup lang="ts">
import type {Game} from "@/types/Game"

defineProps<{
    game: Game | null
}>()

const {getCoverUrl, getArtworkUrl} = useGameUtils()

</script>

<template>
<div class="relative flex flex-col md:flex-row items-center gap-10 p-15 bg-cover bg-center"
    :style="{ 'background-image': `url(${getArtworkUrl(game?.artworks?.[0]?.image_id)})` }"
  >    
  <img :src="getCoverUrl(game?.cover?.image_id)" :alt="`Cover du jeux ${game?.name}`" class="w-48 h-auto md:h-56 rounded-xl shadow-lg z-10" />
    <div class="z-10 text-center md:text-left">
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-4">{{ game?.name }}</h1>
      <div class="flex flex-wrap justify-center md:justify-start gap-2">
        <span class="inline-block bg-gradient-to-br from-purple-800 to-purple-600 shadow-md rounded-full px-4 py-1 text-sm font-bold text-white" v-for="genre in game?.genres || []" :key="genre.id">{{ genre.name }}</span>
        <span class="inline-block bg-gradient-to-br from-purple-800 to-purple-600 shadow-md rounded-full px-4 py-1 text-sm font-bold text-white" v-for="mode in game?.game_modes || []" :key="mode.id">{{ mode.name }}</span>
        <span class="inline-block bg-gradient-to-br from-purple-800 to-purple-600 shadow-md rounded-full px-4 py-1 text-sm font-bold text-white" v-for="theme in game?.themes || []" :key="theme.id">{{ theme.name }}</span>
      </div>
    </div>
  </div>
</template>
