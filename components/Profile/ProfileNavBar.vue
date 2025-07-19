<script setup lang="ts">

const props = defineProps<{
  selectTab: 'all' | 'stats'
}>()

const emit = defineEmits()

const setTab =(tab: 'all' | 'stats') => {
  emit('update:tab', tab)
}

</script>

<template>
  <nav class="mt-16 mb-20">
    <ul class="flex justify-center space-x-8 text-lg font-semibold">
      <li>
        <button
          @click="setTab('all')"
          :class="[
            'px-6 py-2 rounded-lg transition',
            selectTab === 'all'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-400 hover:text-indigo-400'
          ]"
        >
          Mes jeux
        </button>
      </li>
      <li>
        <button
          @click="setTab('stats')"
          :class="[
            'px-6 py-2 rounded-lg transition',
            selectTab === 'stats'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-gray-400 hover:text-indigo-400'
          ]"
        >
          Statistiques
        </button>
      </li>
    </ul>
  </nav>
</template>
