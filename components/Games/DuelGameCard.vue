<script setup lang="ts">
import { useGameUtils } from '~/utils/useGameUtils'
import type { Game } from '@/types/Game'

const { getCoverUrl } = useGameUtils()

const props = defineProps<{
  game: Game
  isClickable?: boolean
  isWinner?: boolean
}>()

const emit = defineEmits<{
  select: [gameId: number]
}>()

const handleClick = () => {
  if (props.isClickable && props.game.id) {
    emit('select', props.game.id)
  }
}

const formattedGenres = computed(() => {
  return props.game.genres?.slice(0, 3).map(g => g.name).join(', ') || 'Genres inconnus'
})

const releaseYear = computed(() => {
  return props.game.year || 'Année inconnue'
})
</script>

<template>
  <div 
    class="bg-white/5 rounded-3xl overflow-hidden border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md transition-all duration-300 relative max-w-sm min-h-[500px] flex flex-col"
    :class="{
      'cursor-pointer transform hover:scale-105 hover:shadow-[0_12px_40px_0_rgba(34,211,238,0.3)] hover:border-cyan-400': isClickable,
      'border-yellow-400 shadow-[0_12px_40px_0_rgba(255,215,0,0.4)]': isWinner
    }"
    @click="handleClick"
  >
    <div class="h-72 relative overflow-hidden">
      <img 
        v-if="game.cover?.image_id" 
        :src="getCoverUrl(game.cover.image_id)" 
        :alt="`Couverture de ${game.name}`"
        class="w-full h-full object-cover transition-transform duration-300"
        :class="{ 'hover:scale-110': isClickable }"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-400/10 to-blue-600/10 text-cyan-400 text-lg">
        <span>Pas d'image</span>
      </div>
    </div>

    <div class="p-6 flex-1 flex flex-col gap-4">
      <h3 class="text-cyan-400 text-xl font-bold leading-tight drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
        {{ game.name }}
      </h3>
      
      <div class="flex flex-col gap-2">
        <p class="text-white text-base font-semibold">{{ releaseYear }}</p>
        <p class="text-gray-400 text-sm leading-relaxed">{{ formattedGenres }}</p>
      </div>

      <p v-if="game.summary" class="text-gray-300 text-sm leading-relaxed flex-1">
        {{ game.summary.slice(0, 150) }}{{ game.summary.length > 150 ? '...' : '' }}
      </p>

      <div v-if="isClickable" class="bg-cyan-400/10 border border-cyan-400 rounded-xl p-3 text-center mt-auto">
        <span class="text-cyan-400 font-bold text-sm block mb-1">Cliquez pour voter !</span>
        <div class="text-lg animate-bounce">👆</div>
      </div>
    </div>

    <div v-if="isWinner" class="absolute inset-0 bg-yellow-400/10 flex items-center justify-center backdrop-blur-sm">
      <div class="bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold shadow-lg animate-pulse">
        🏆 Gagnant !
      </div>
    </div>
  </div>
  </template> 