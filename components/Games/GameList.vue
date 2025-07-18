<script setup lang="ts">
import type { Game } from '@/types/Game'
import defaultCover from '@/assets/images/default_cover.png'


const { getCoverUrl } = useGameUtils()

const props = defineProps<{
  games: Game[]
  error?: string | null
}>()
</script>

<template>
  <div class="w-full">
    <div v-if="error" class="text-red-600 p-4 text-center">{{ error }}</div>
    <div v-else>
     <ul class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 p-0 list-none">
        <li v-for="game in games" :key="game.id" class="rounded-lg overflow-hidden shadow-md text-center relative">
          <NuxtLink :to="`/catalogue-de-jeu/${game?.slug}`">
            <div class="relative w-full h-[200px] flex justify-center items-center">
              <img
                v-if="game.cover"
                :src="getCoverUrl(game.cover?.image_id)"
                :alt="`Couverture du jeu ${game.name}`"
                class="w-full h-full object-cover"
              />
              <img
                v-else
                :src="defaultCover"
                :alt="`Couverture du jeu ${game.name}`"
                class="w-full h-full object-cover"
              />
              <div class="absolute bottom-0 w-full bg-black/40 p-4 text-white">
                <h2 class="text-sm font-medium m-0">{{ game.name }}</h2>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

