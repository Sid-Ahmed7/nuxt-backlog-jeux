<script setup lang="ts">
import { useGameUtils } from '@/composables/useGameUtils';
import type { Game } from '@/types/Game';

const {getCoverUrl} = useGameUtils()


defineProps<{
  game: Game | null
}>()
const emit = defineEmits(['close', 'select']);

</script>

<template>
<div class="user-game-card">
        <img :src="getCoverUrl(game?.cover?.image_id)" alt="Cover" />
        <div class="game-info">
        <h1>{{ game?.name }}</h1>
        <div class="badges">
            <span v-for="genre in game?.genres || []" :key="genre.id">{{ genre.name }}</span>
        </div>
        </div>
    

</div>
</template>