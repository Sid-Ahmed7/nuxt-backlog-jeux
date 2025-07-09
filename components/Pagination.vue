<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
totalPages : number,
currentPage: number
}>()

const emit = defineEmits()

const nbPages = ref(5)
const hasPreviousPage = computed(() => props.currentPage > 1)
const hasNextPage = computed(() => props.currentPage < props.totalPages)

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages) return
  emit('update:currentPage', page)
}

const pages = computed(() => {
  const pagesArray = []
  let startPage = Math.max(1, props.currentPage - Math.floor(nbPages.value / 2))
  let endPage = Math.min(props.totalPages, props.currentPage + 2)
  
  if( endPage - startPage < nbPages.value -1) {
    startPage = Math.max(1, endPage - nbPages.value + 1)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pagesArray.push(i)
  }
  return pagesArray
})

const updateNbPages = () => {
  if(window.innerWidth < 600) {
    nbPages.value = 3
  } else  {
    nbPages.value = 5
  }
}

onMounted(() => {
  updateNbPages()
  window.addEventListener('resize', updateNbPages)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateNbPages)
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
}

button {
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  background: #999;
  cursor: not-allowed;
}
.active {
  background: #388e3c;
}
</style>
