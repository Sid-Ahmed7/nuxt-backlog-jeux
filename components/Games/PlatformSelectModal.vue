<script setup lang="ts">
import type { Game } from '@/types/Game'

const emit = defineEmits(['close', 'select'])
const props = defineProps<{
    game: Game | null
}>()

const selectedPlatformId = ref<number | null>(null)

const handleSubmit = () => {
    if (selectedPlatformId.value !== null && props.game?.platforms) {
        const selectedPlatform = props.game.platforms.find(platform => platform.id === selectedPlatformId.value)
        
        if (selectedPlatform) {
            emit('select', selectedPlatform.name)
            emit('close')
        }
    }
}


watch(() => props.game, (newVal) => {
    if(newVal) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
},{ immediate: true })

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>

  <div class="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000]">
    <div class="bg-gray-800 rounded-lg p-8 w-11/12 max-w-lg flex flex-col items-center gap-6">
        <h2 class="text-white text-xl font-semibold">Choisissez la plateforme sur lequel vous avez joué</h2>
        <div class="w-full max-h-72 overflow-y-auto flex flex-col gap-4">
            <label 
                v-for="platform in game?.platforms"
                :key="platform.id"
                class="flex items-center gap-4 cursor-pointer bg-gray-700 rounded-md p-4"
            >
        
            <input type="radio"
                :value="platform.id"
                v-model="selectedPlatformId" class="form-radio text-green-00" />
                <div class="text-white font-medium">
                    <h3>{{ platform.name }}</h3>
                </div>
        </label>
        </div>
        <div class="w-full flex justify-between gap-4">
            <button @click="handleSubmit" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition">Ajouter</button>
            <button @click="$emit('close')" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition">Annuler</button>
        </div>
    </div>
</div>
</template>
