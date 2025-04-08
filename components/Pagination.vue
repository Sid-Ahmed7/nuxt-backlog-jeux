<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
totalPages :{
  type: Number,
  required: true
},
currentPage :{
  type: Number,
  required: true
}
})

const emit = defineEmits()

const hasPreviousPage = computed(() => props.currentPage > 1)
const hasNextPage = computed(() => props.currentPage < props.totalPages)

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages) return
  emit('update:currentPage', page)
}

const pages = computed(() => {
  const pagesArray = []
  const firstPage = Math.max(1, props.currentPage - 2)
  const lastPage = Math.min(props.totalPages, props.currentPage + 2)
  for (let i = firstPage; i <= lastPage; i++) {
    pagesArray.push(i)
  }
  return pagesArray
})
</script>

<template>
  <div class="pagination">
    <button @click="goToPage(1)" :disabled="!hasPreviousPage">«</button>
    <button @click="goToPage(props.currentPage - 1)" :disabled="!hasPreviousPage">‹</button>
    <button v-for="page in pages" :key="page" @click="goToPage(page)" :class="{ active: page === props.currentPage }">
      {{ page }}
    </button>
    <button @click="goToPage(props.currentPage + 1)" :disabled="!hasNextPage">›</button>
    <button @click="goToPage(props.totalPages)" :disabled="!hasNextPage">»</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: 100%;
}

button {
  border: none;
  border-radius: 0.5rem;
  padding: 1.5rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>
