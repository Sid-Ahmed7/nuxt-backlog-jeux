<script setup lang="ts">
import { computed } from 'vue'
import type { Game } from '@/types/Game'
import { useGameUtils } from '@/composables/useGameUtils'

const { getCoverUrl } = useGameUtils()

const props = defineProps<{
  games: Game[]
  colums?: number
  error?: string | null
}>()

const gridColumns = computed(() => {
  return props.colums ? props.colums : 8
})

</script>

<template>
  <div class="game-list">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else>
      <ul :style="{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }">
        <li v-for="game in games" :key="game.id">
          
          <NuxtLink :to="`/catalogue-de-jeu/${game?.name || 'Jeu inconnu'}`">
            <div class="cover-image">
              <img
                v-if="game.cover"
                :src="getCoverUrl(game.cover?.image_id)"
                alt="Couverture du jeu"
              />
              <div class="game-name">
                <h2>{{ game.name }}</h2>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.game-list {
  width: 100%;
}
ul {
  display: grid;
  gap: 1rem;
  padding: 0;
  list-style: none;
}

li {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
}
.cover-image {
  position: relative;
  width: 100%;
  height: 40vh;
  justify-content: center;
  align-items: center;
  display: flex;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.game-name {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem;
  box-sizing: border-box;
}
.game-name h2 {
  color: white;
  font-size: 1rem;
  margin: 0;
}

.error {
  color: red;
  padding: 10px;
  text-align: center;
}
</style>
