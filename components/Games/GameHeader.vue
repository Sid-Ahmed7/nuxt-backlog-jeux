<script setup lang="ts">
import type {Game} from "@/types/Game"

defineProps<{
    game: Game | null
}>()

const {getCoverUrl, getArtworkUrl} = useGameUtils()

</script>

<template>
  <div class="game-header" :style="{'background-image': `url(${getArtworkUrl(game?.artworks?.[0]?.image_id)})`}">
    <img :src="getCoverUrl(game?.cover?.image_id)" alt="Cover" />
    <div class="game-info">
      <h1>{{ game?.name }}</h1>
      <div class="badges">
        <span v-for="genre in game?.genres || []" :key="genre.id">{{ genre.name }}</span>
        <span v-for="mode in game?.game_modes || []" :key="mode.id">{{ mode.name }}</span>
        <span v-for="theme in game?.themes || []" :key="theme.id">{{ theme.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.game-header {
  background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9));
  padding: 3.75rem 1.875rem;
  display: flex;
  align-items: center;
  gap: 2.5rem;
  background-size: cover;
  background-position: center;
  position: relative;
}

.game-header img {
  height: 13.75rem;
  border-radius: 0.75rem;
  box-shadow: 0 0 0.625rem rgba(0,0,0,0.6);
  z-index: 2; 
}

.game-info h1 {
  font-size: 2.8rem;
  margin-bottom: 0.625rem;
}

.badges span {
  display: inline-block;
  background: linear-gradient(135deg, #6a1b9a, #8e24aa);
  box-shadow: 0 0 0.5rem #8e24aa88;
  border-radius: 3.125rem;
  padding: 0.3125rem 0.9375rem;
  margin-right: 0.625rem;
  font-size: 0.85rem;
  font-weight: bold;
  color: white;
}
</style>