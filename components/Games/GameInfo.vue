<script setup lang="ts">
import type {Game} from "@/types/Game"

defineProps<{
    game: Game | null
}>()

const {formatReleaseDate} = useGameUtils()

</script>

<template>

    <div class="flex flex-wrap gap-5 px-6 py-5">
        <div class="bg-small-card text-white font-medium rounded-xl px-5 py-4 flex-1 min-w-[180px]">Sortie : {{ formatReleaseDate(game?.first_release_date) }}</div>
        <div class="bg-small-card text-white font-medium rounded-xl px-5 py-4 flex-1 min-w-[180px]">Plateformes : {{game?.platforms?.map(p => p.name).join(', ')}}</div>
        <div class="bg-small-card text-white font-medium rounded-xl px-5 py-4 flex-1 min-w-[180px]">Genres : {{game?.genres?.map(g => g.name).join(', ')}}</div>
    </div>

    <div class="bg-[#141414] text-white italic leading-relaxed border-l-4 border-purple-700 px-6 py-6 mx-6 my-5">
        {{ game?.summary || "Pas de description disponible." }}
    </div>


</template>
