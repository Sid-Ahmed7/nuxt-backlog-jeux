<script setup lang="ts">
import type { Game } from "@/types/Game"

const props = defineProps<{
    games: Game[];
    title: string;
}>()

const { getCoverUrl } = useGameUtils()
</script>

<template>
    <div class="w-full lg:w-auto">
        <div class="flex justify-between items-center mb-4 text-main">
            <h2 class="text-xl font-semibold">{{ props.title }}</h2>
            <slot name="links"></slot>
        </div>

        <div v-if="props.games.length === 0">
            <p class="text-text-secondary">Aucun jeu disponible</p>
        </div>

        <div v-else class="flex flex-col gap-4">
            <div v-for="game in props.games" :key="game.id"
                class="flex items-center gap-4 p-3 rounded-md bg-small-card">
                <div class="w-[110px] h-[130px] flex-shrink-0">
                    <NuxtLink :to="`/catalogue-de-jeu/${game.slug}`">
                        <img :src="getCoverUrl(game.cover?.image_id)" :alt="game.name"
                            class="w-full h-full object-cover rounded" />
                    </NuxtLink>
                </div>
                <div class="flex flex-col justify-center">
                    <h3 class="text-base text-white font-semibold mb-1">
                        {{ game.name }}
                    </h3>
                    <slot name="extra-info" :game="game"></slot>
                    <p class="text-sm text-text-secondary">
                        {{game.genres?.map((genre) => genre.name).join(", ")}}
                    </p>
                </div>
            </div>
        </div>
    </div>






</template>