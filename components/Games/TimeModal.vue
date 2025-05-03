<script setup lang="ts">


const props = defineProps<{
    showModal: boolean;
}>()

const emit = defineEmits()

const timeSpent = ref('')
const isSubmitting = ref(false)

const closeModal = () => {
    emit('close')
}

const handleSubmit = () => {
    if (!timeSpent.value || isSubmitting.value) {
        return
    }

    isSubmitting.value = true
    emit('submit', parseInt(timeSpent.value))
}

</script>

<template>

<div v-if="showModal" class="modal-overlay">
    <div class="modal">
        <h2>Veuillez indiquer le temps que vous avez passé sur le jeu</h2>
        <div class="input-container">
            <input
            type="number"
            v-model="timeSpent"
            placeholder="Entrez le nombre d'heures sur le jeu"
            />
        </div>
        <div class="modal-actions">
            <button @click="handleSubmit" :disabled="isSubmitting" >Confirmer</button>
            <button @click="closeModal">Annuler</button>
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
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 2rem;
  width: 80%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.input-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.input-container input {
  padding: 0.5rem;
  width: 50%;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
}

.modal-actions button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-actions button:disabled {
  background-color: #ddd;
}

.modal-actions button:hover:not(:disabled) {
  background-color: #45a049;
}
</style>