<script setup lang="ts">
const props = defineProps<{
  totalPages: number;
  currentPage: number;
}>();

const emit = defineEmits();

const nbPagesButtonShow = ref<number>(5);
const hasPreviousPage = computed(() => props.currentPage > 1);
const hasNextPage = computed(() => props.currentPage < props.totalPages);

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages) return;
  emit("update:currentPage", page);
};

const pages = computed(() => {
  const pagesArray = [];
  let startPage = Math.max(
    1,
    props.currentPage - Math.floor(nbPagesButtonShow.value / 2)
  );
  let endPage = Math.min(
    props.totalPages,
    props.currentPage + Math.floor(nbPagesButtonShow.value / 2)
  );

  if (endPage - startPage + 1 < nbPagesButtonShow.value) {
    if (startPage === 1) {
      endPage = Math.min(
        props.totalPages,
        startPage + nbPagesButtonShow.value - 1
      );
    } else if (endPage === props.totalPages) {
      startPage = Math.max(1, endPage - nbPagesButtonShow.value + 1);
    }
  }
  for (let i = startPage; i <= endPage; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
});

const updateNbPages = () => {
  if (window.innerWidth < 600) {
    nbPagesButtonShow.value = 3;
  } else {
    nbPagesButtonShow.value = 5;
  }
};

onMounted(() => {
  updateNbPages();
  window.addEventListener("resize", updateNbPages);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateNbPages);
});
</script>

<template>
  <div class="flex justify-center items-center gap-4 p-4">
    <button
      type="button"
      class="px-4 py-2 rounded text-white bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400/30 disabled:text-gray-900 disabled:cursor-not-allowed cursor-pointer"
      @click="goToPage(1)"
      :disabled="!hasPreviousPage"
    >
      <<
    </button>
    <button
      type="button"
      class="px-4 py-2 rounded text-white bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400/30 disabled:text-gray-900 disabled:cursor-not-allowed cursor-pointer"
      @click="goToPage(currentPage - 1)"
      :disabled="!hasPreviousPage"
    >
      <
    </button>
    <button
      v-for="page in pages"
      :key="page"
      type="button"
      @click="goToPage(page)"
      :class="[
        'px-4 py-2 rounded text-white cursor-pointer',
        page === currentPage
          ? 'bg-amber-800 hover:bg-amber-700'
          : 'bg-gray-800 hover:bg-gray-700',
      ]"
    >
      {{ page }}
    </button>
    <button
      type="button"
      class="px-4 py-2 rounded text-white bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400/30 disabled:text-gray-900 disabled:cursor-not-allowed cursor-pointer"
      @click="goToPage(currentPage + 1)"
      :disabled="!hasNextPage"
    >
      >
    </button>
    <button
      type="button"
      class="px-4 py-2 rounded text-center text-white bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400/30 disabled:text-gray-900 disabled:cursor-not-allowed cursor-pointer"
      @click="goToPage(totalPages)"
      :disabled="!hasNextPage"
    >
      >>
    </button>
  </div>
</template>
