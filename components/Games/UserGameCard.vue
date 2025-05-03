<script setup lang="ts">
import { useGameUtils } from '@/composables/useGameUtils';
import { useUserGamesStore } from '@/stores/useUserGamesStore';
import type { Game } from '@/types/Game';
import TimeModal from '@/components/Games/TimeModal.vue';

const {getCoverUrl} = useGameUtils()
const userGamesStore  = useUserGamesStore();

const props = defineProps<{
  game: Game & { isFinished: boolean}
}>();

const showModal = ref(false)
const isSubmitting = ref(false)


const handleSubmitTimeGame = async (time:number) => {
  isSubmitting.value = true
  if(props.game.id) {
    await userGamesStore.updateGameTime(props.game?.id, time)
    await userGamesStore.toggleFinished(props.game.id)
    showModal.value = false
  }
  isSubmitting.value = false

}

const handleRemove = () => {

  if(props.game.id) {
    userGamesStore.removeGameInUserList(props.game.id)
  }
  
}

const toogleFinished = () => {

  if(!props.game.isFinished && props.game.id) {
    showModal.value = true
  }
}

</script>

<template>
  <div class="user-game-card">
    <img
      v-if="game.cover?.image_id"
      :src="getCoverUrl(game.cover.image_id)"
      alt="Cover"
      class="cover"
    />

    <div class="game-info">
      <h2>{{ game.name }}</h2>

      <div class="platforms">
        <span
          v-for="platform in game.platforms"
          :key="platform.id"
          class="badge"
        >
          {{ platform.name || 'Platform ID: ' + platform.id }}
        </span>
      </div>

      <div class="status">
        <span>Status : {{ game.isFinished ? '✅ Terminé' : '🕹️ En cours' }}</span>
      </div>

      <div class="actions">
        <button @click="toogleFinished()" :class="{ 'completed-btn': game.isFinished }">
          {{ game.isFinished ? 'Marquer comme non terminé' : 'Marquer comme terminé' }}
        </button>
        <button @click="handleRemove" class="remove-btn">
          Supprimer
        </button>
      </div>
    </div>
    <TimeModal
    v-if="showModal"
    :showModal="showModal"
    :game="game"
    @submit="handleSubmitTimeGame"
    @close="showModal = false"
    ></TimeModal>
  </div>
</template>

<style scoped>
.user-game-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.75rem;
  padding: 1rem;
  background-color: #fff;
  transition: box-shadow 0.2s ease;
}

.user-game-card:hover {
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

.cover {
  width: 6.25rem;
  height: auto;
  border-radius: 0.5rem;
  object-fit: cover;
}

.game-info {
  flex: 1;
}

.game-info h2 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.platforms .badge {
  background-color: #eee;
  border-radius: 0.375rem;
  padding: 0.2rem 0.5rem;
  margin-right: 0.5rem;
  font-size: 0.875rem;
  display: inline-block;
  margin-bottom: 0.25rem;
}

.status {
  margin-top: 0.5rem;
  font-weight: bold;
  color: #4a5568;
}

.actions {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.actions button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  background-color: #3b82f6;
  color: white;
  transition: background-color 0.2s ease;
}

.actions button:hover {
  opacity: 0.9;
}

.actions button.completed-btn {
  background-color: #6b7280;
}

.remove-btn {
  background-color: #f87171 !important;
  color: white;
}

@media (max-width: 40rem) {
  .user-game-card {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .cover {
    width: 100%;
    max-height: 12rem;
    object-fit: contain;
    margin-bottom: 1rem;
  }
  
  .actions {
    width: 100%;
    flex-direction: column;
  }
}
</style>