<script setup lang="ts">
import type {Game} from "@/types/Game"

defineProps<{
    game: Game | null
}>()

const {formatReleaseDate} = useGameUtils()

</script>
















<template>

    <div class="info-grid">
        <div class="info-card">Sortie : {{ formatReleaseDate(game?.first_release_date) }}</div>
        <div class="info-card">Plateformes : {{game?.platforms?.map(p => p.name).join(', ')}}</div>
        <div class="info-card">Genres : {{game?.genres?.map(g => g.name).join(', ')}}</div>
    </div>

    <div class="game-description">
        {{ game?.summary || "Pas de description disponible." }}
    </div>


</template>

<style scoped>
.info-grid {
  display: flex;
  gap: 1.25rem;
  padding: 1.25rem 1.875rem;
  flex-wrap: wrap;
}

.info-card {
  background-color: #2c2c2c;
  padding: 0.9375rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 500;
  flex: 1 1 11.25rem;
  color: white;
}

.game-description {
  background: #141414;
  border-left: 0.3125rem solid #8e24aa;
  padding: 1.5625rem 1.875rem;
  font-style: italic;
  line-height: 1.6;
  margin: 1.25rem 1.875rem;
  color: white;
}

</style>