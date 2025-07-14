<script setup lang="ts">
import type { ExtraGames } from '~/types/ExtraGames';




const props = defineProps<{

title: string,
extraGames?: ExtraGames[]
}>()

const {getCoverUrl} = useGameUtils()
</script>


<template>

  <div v-if="props.extraGames?.length" class="my-8 p-5 rounded-lg shadow-md ">
    <h3 class="mb-5 text-xl font-semibold text-white border-b-2 border-purple-700 pb-2">
      {{ props.title }}
    </h3>
   <ul class="grid [grid-template-columns:repeat(auto-fill,minmax(190px,1fr))] gap-2">
      <li v-for="game in props.extraGames" :key="game.id"  class="flex flex-col items-center rounded-lg p-3 transition-transform hover:-translate-y-1 min-h-[320px]" >
        <NuxtLink :to="`/catalogue-de-jeu/${game?.slug || 'jeu-inconnu'}`">
        <img :src="getCoverUrl(game.cover?.image_id)" alt="game.name"  class="w-full h-[240px] object-cover rounded-md shadow-md mb-2"
 />
      </NuxtLink>
        <span   class="text-center text-sm font-medium text-purple-400 line-clamp-2 mt-2">{{ game.name }}</span>
      </li>
    </ul>
  </div>


</template>