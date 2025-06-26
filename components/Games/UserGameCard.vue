<script setup lang="ts">
import { useGameUtils } from '~/utils/useGameUtils';
import { useUserGamesStore } from '@/stores/useUserGamesStore';
import type { UserGame } from '@/types/UserGame';
import TimeModal from '@/components/Games/TimeModal.vue';
import { GameStatus } from '~/types/enums';

const { getCoverUrl } = useGameUtils()
const userGamesStore = useUserGamesStore();

const props = defineProps<{
  games: UserGame
}>();

const showModal = ref(false)
const isSubmitting = ref(false)

const isFinished = computed(() => {
  return props.games.status === GameStatus.Finished
})

const status = computed(() => {
  switch (props.games.status) {
    case GameStatus.NotStarted:
      return 'Non commencé';
    case GameStatus.InProgress:
      return 'En cours';
    case GameStatus.Finished:
      return 'Terminé';
    default:
      return 'Non commencé'
  }
})

const labelBtn = computed(() => {
  switch (props.games.status) {
    case GameStatus.NotStarted:
      return 'Marqué comme en cours';
    case GameStatus.InProgress:
      return 'Marqué comme terminé';
    case GameStatus.Finished:
      return 'Marqué comme en cours';
    default:
      return 'Aucun changement'
  }
})

const handleSubmitTimeGame = async ({ date, time }: { date: string; time?: number }) => {

  isSubmitting.value = true

  if (!props.games.game.id) {
    return
  }

  if (props.games.status === GameStatus.NotStarted) {
    await userGamesStore.updateStatus(props.games.game.id!, GameStatus.InProgress, date)
  } else if (props.games.status === GameStatus.InProgress) {
    await userGamesStore.updateGameTime(props.games.game?.id!, time ?? 0)
    await userGamesStore.updateStatus(props.games.game.id!, GameStatus.Finished, props.games.started_at, date)
  }

  showModal.value = false
  isSubmitting.value = false

}

const handleRemove = () => {

  if (props.games.game.id) {
    userGamesStore.removeGameInUserList(props.games.game.id)
  }

}

const toggleStatusGame = () => {
  if (!props.games.game.id) {
    return
  }

  if (props.games.status === GameStatus.NotStarted) {
    showModal.value = true
  } else if (props.games.status === GameStatus.InProgress) {
    showModal.value = true
  } else if (props.games.status === GameStatus.Finished) {
    userGamesStore.updateStatus(props.games.game.id!, GameStatus.InProgress, props.games.started_at)
  }


}

</script>

<template>
  <div class="user-game-card">
    <img v-if="games.game.cover?.image_id" :src="getCoverUrl(games.game.cover.image_id)" alt="Cover" class="cover" />

    <div class="game-info">
      <h2>{{ games.game.name }}</h2>

      <div class="platforms">
        <span class="platform">
          {{ games.platform_choose ? games?.platform_choose : 'Plateforme inconnue' }}
        </span>
      </div>

      <div class="status-time">
        <span class="status">Status : {{ status }}</span>
        <span class="time">Temps passé : {{ games.timeSpent !== undefined ? games.timeSpent + ' h' : 'Non renseigné'}}</span>
        <div class="date">
        <span v-if="games.started_at">Début : {{ new Date(games.started_at).toLocaleDateString() }}</span>
        <span v-if="games.ended_at">Fin : {{ new Date(games.ended_at).toLocaleDateString() }}</span>
        </div>
      </div>

      <div class="actions">

        <button @click="toggleStatusGame" :class="{ 'completed-btn': isFinished }">
          {{ labelBtn }}
        </button>
        <button @click="handleRemove" class="remove-btn">
          Supprimer
        </button>
      </div>
    </div>
    <TimeModal v-if="showModal" :showModal="showModal" :game="games"
      :statusGame="games.status === GameStatus.InProgress ? 'finished' : 'inProgress'" @submit="handleSubmitTimeGame"
      @close="showModal = false"></TimeModal>
  </div>
</template>

<style scoped>

.user-game-card {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  max-width: 450px;
  margin: 1rem auto;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}



.cover {
  width: 150px;
  height: auto;
  object-fit: cover;
  border-radius: 16px 0 0 16px;
}

.game-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  flex: 1;
}

.game-info h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #00ffcc;
  text-shadow: 0 0 5px #00ffcc;
}

.platform {
  background: rgba(0, 255, 204, 0.2);
  border: 1px solid #00ffcc;
  color: #00ffcc;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 0.75rem;
  display: inline-block;
}

.status-time {
  font-size: 0.875rem;
  color: #ddd;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.date {
  display: flex;
  gap: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  background: transparent;
  color: #fff;
  border: 1px solid;
}

.actions .finish {
  border-color: #00ffcc;
}

.actions .remove {
  border-color: #ff4d4d;
}

.actions .finish:hover {
  background: #00ffcc;
  color: #000;
  box-shadow: 0 0 10px #00ffcc;
}

.actions .remove:hover {
  background: #ff4d4d;
  color: #000;
  box-shadow: 0 0 10px #ff4d4d;
}

@media (max-width: 600px) {
  .user-game-card {
    grid-template-columns: 1fr;
    width: 100%;
  }

  .cover {
    width: 100%;
    height: 200px;
    border-radius: 16px 16px 0 0;
  }
  .status-time {
     grid-template-columns: 1fr;
  }
}
</style>