<script setup lang="ts">
import type { UserGame } from '@/types/UserGame';
import TimeModal from '@/components/Games/TimeModal.vue';
import { GameStatus } from '@/types/enums';

const { getCoverUrl } = useGameUtils();
const userGamesStore = useUserGamesStore();

const props = defineProps<{
  games: UserGame
}>();

const showModal = ref(false);
const isSubmitting = ref(false);

const isFinished = computed(() => props.games.status === GameStatus.Finished);

const status = computed(() => {
  switch (props.games.status) {
    case GameStatus.NotStarted:
      return 'Non commencé';
    case GameStatus.InProgress:
      return 'En cours';
    case GameStatus.Finished:
      return 'Terminé';
    default:
      return 'Non commencé';
  }
});

const labelBtn = computed(() => {
  switch (props.games.status) {
    case GameStatus.NotStarted:
      return 'Marqué comme en cours';
    case GameStatus.InProgress:
      return 'Marqué comme terminé';
    case GameStatus.Finished:
      return 'Marqué comme en cours';
    default:
      return 'Aucun changement';
  }
});

const handleSubmitTimeGame = async ({ date, time }: { date: string; time?: number }) => {
  isSubmitting.value = true;

  if (!props.games.game.id) {
    return;
  }

  if (props.games.status === GameStatus.NotStarted) {
    await userGamesStore.updateStatus(props.games.game.id!, GameStatus.InProgress, date);
  } else if (props.games.status === GameStatus.InProgress) {
    await userGamesStore.updateGameTime(props.games.game?.id!, time ?? 0);
    await userGamesStore.updateStatus(props.games.game.id!, GameStatus.Finished, props.games.started_at, date);
  }

  showModal.value = false;
  isSubmitting.value = false;
};

const handleRemove = () => {
  if (props.games.game.id) {
    userGamesStore.removeGameInUserList(props.games.game.id);
  }
};

const toggleStatusGame = () => {
  if (!props.games.game.id) return;

  if (props.games.status === GameStatus.NotStarted || props.games.status === GameStatus.InProgress) {
    showModal.value = true;
  } else if (props.games.status === GameStatus.Finished) {
    userGamesStore.updateStatus(props.games.game.id!, GameStatus.InProgress, props.games.started_at);
  }
};
</script>

<template>
  <div
    class="flex flex-col md:flex-row bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden max-w-2xl mx-auto shadow-lg hover:shadow-indigo-700 transition duration-300 min-h-[200px]"
  >
    <div class="md:w-40 md:flex-shrink-0">
      <img
        v-if="games.game.cover?.image_id"
        :src="getCoverUrl(games.game.cover.image_id)"
        alt="Couverture du jeu"
        class="w-full h-48 md:h-full object-cover"
      />
    </div>

    <div class="flex flex-col justify-between flex-1 p-6 text-white">
      <div class="space-y-4">
        <h2 class="text-indigo-400 text-2xl font-semibold drop-shadow-md leading-tight">
          {{ games.game.name }}
        </h2>

        <div>
          <span
            class="inline-block bg-indigo-900/40 text-indigo-300 text-sm font-medium px-4 py-1 rounded-xl border border-indigo-500"
          >
            {{ games.platform_choose || 'Plateforme inconnue' }}
          </span>
        </div>

        <div class="text-gray-300 text-sm space-y-2">
          <p><strong>Status :</strong> {{ status }}</p>
          <p>
            <strong>Temps passé :</strong>
            {{ games.timeSpent !== undefined ? games.timeSpent + ' h' : 'Non renseigné' }}
          </p>
          <div class="flex gap-6 text-xs text-indigo-400">
            <span v-if="games.started_at">
              Début : {{ new Date(games.started_at).toLocaleDateString() }}
            </span>
            <span v-if="games.ended_at">
              Fin : {{ new Date(games.ended_at).toLocaleDateString() }}
            </span>
          </div>
        </div>
      </div>

          <div class="flex gap-3 pt-4 mt-auto">
        <button
          @click="toggleStatusGame"
          :class="[
            'px-6 py-2 rounded-xl font-medium text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[140px]',
            isFinished ? 'bg-indigo-400 hover:bg-indigo-500 text-black' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          ]"
        >
          {{ labelBtn }}
        </button>

        <button
          @click="handleRemove"
          class="px-6 py-2 rounded-xl font-medium text-sm bg-red-600 hover:bg-red-700 text-white transition focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[100px]"
        >
          Supprimer
        </button>
      </div>
    </div>
    <TimeModal
      v-if="showModal"
      :showModal="showModal"
      :game="games"
      :statusGame="games.status === GameStatus.InProgress ? 'finished' : 'inProgress'"
      @submit="handleSubmitTimeGame"
      @close="showModal = false"
    />
  </div>
</template>