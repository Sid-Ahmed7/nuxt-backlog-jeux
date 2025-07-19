<script setup lang="ts">
import type { Game } from '@/types/Game';
import type { UserGame } from '~/types/UserGame';

const props = defineProps<{
  showModal: boolean;
  game: UserGame;
  statusGame: 'inProgress' | 'finished'
}>()

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'submit', data: { date: string, time?: number }): void
}>()

const selectTimeSpent = ref(props.game.timeSpent?.toString() ?? '')
const isSubmitting = ref(false)
const selectedDate = ref('')
const errorMessage = ref('')

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {

  if (!selectedDate.value || isSubmitting.value) {
    return
  }

  if (props.game.started_at && (new Date(selectedDate.value) <= new Date(props.game.started_at))) {
    errorMessage.value = ' La date de fin doit être après la date de début'
    return
  }



  const time = props.statusGame === 'finished' ? parseInt(selectTimeSpent.value) : undefined
  if (props.statusGame === 'finished' && (isNaN(time!) || time! < 0)) {
    errorMessage.value = "Veuillez entreer un temps valide"
    return
  }
  errorMessage.value = ''
  isSubmitting.value = true

  emit('submit', {
    date: selectedDate.value,
    time: time
  })
}

watch(
  () => props.showModal,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden'
      errorMessage.value = ''
    } else {
      document.body.style.overflow = ''
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  document.body.style.overflow = ''
})

</script>

<template>
  <div class="fixed inset-0 z-50 bg-black/70 bg-opacity-70 flex items-center justify-center px-4">
    <div class="bg-white rounded-xl w-full max-w-md p-6 space-y-6 shadow-xl">
      <h2 class="text-lg font-semibold text-center text-gray-800">
        {{ props.statusGame === 'inProgress'
          ? `Quand avez-vous commencé ${props.game.game.name} ?`
          : `Quand avez-vous terminé ${props.game.game.name} ?` }}
      </h2>

      <div class="space-y-4">
        <div>
          <label for="date-input" class="block text-sm text-black font-medium">Date :</label>
          <input id="date-input" type="date" v-model="selectedDate"
            class="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>

        <div v-if="props.statusGame === 'finished'">
          <label for="time-input" class="block text-black text-sm font-medium">Temps passé (heures) :</label>
          <input id="time-input" type="number" v-model="selectTimeSpent" min="0" placeholder="Ex: 10"
            class="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
      </div>
      <div v-if="errorMessage" class="text-red-600 font-semibold mt-2 text-center">
        {{ errorMessage }}
      </div>
      <div class="flex justify-end gap-4">
        <button @click="closeModal"
          class="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium">
          Annuler
        </button>
        <button @click="handleSubmit" :disabled="isSubmitting"
          class="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:bg-gray-300">
          Confirmer
        </button>
      </div>
    </div>
  </div>
</template>
