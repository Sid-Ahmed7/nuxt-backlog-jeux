<script setup lang="ts">
import type { Game } from '@/types/Game'
import { useGameUtils } from '@/composables/useGameUtils'


const { getLogoUrl } = useGameUtils()

const emit = defineEmits(['close', 'select'])
const props = defineProps<{
    game: Game | null
}>()

const selectedPlatformId = ref<number | null>(null)

const handleSubmit = () => {
    if(selectedPlatformId.value !== null) {
        emit('select', selectedPlatformId.value)
        emit('close')
    }
}
</script>

<template>

<div class="modal-overlay">
    <div class="modal">
        <h2>Choisissez la plateforme sur lequel vous avez joué</h2>
        <div class="platform-list">
            <label 
                v-for="platform in game?.platforms"
                :key="platform.id"
                class="platform-option"
            >
        
            <input type="radio"
                :value="platform.id"
                v-model="selectedPlatformId" />
                <div class="platform-image">
                    <img :src="getLogoUrl(platform.platform_logo?.image_id)" :alt="platform.name" />
                </div>
                <div class="platform-name">
                    <h3>{{ platform.name }}</h3>
                </div>
        </label>
        </div>
        <div class="modal-actions">
            <button @click="handleSubmit">Ajouter</button>
            <button @click="$emit('close')">Annuler</button>
        </div>
    </div>
</div>
</template>

<style scoped>

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background-color: #2c2c2c;
    border-radius: 0.5rem;
    padding: 2rem;
    width: 80%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:1rem;
}

.platform-list {
    display: flex;
    flex-wrap: column;
    gap: 1rem;
    justify-content: center;
    width: 100%;
}

.platform-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #3c3c3c;
    transition: background-color 0.3s ease;
}
.platform-option input {
    margin-right: 1rem;
}

.platform-image {
    width: 50%;
    height: 50%;
}
.platform-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    width: 100%;
    justify-content: space-between;
}

.modal-actions button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
}
    




</style>