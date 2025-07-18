<script setup lang="ts">
import type { Filter } from '@/types/Filter';


const model = defineModel<string[]>()
const props = defineProps<{
    title: string
    items: Filter[]
}>()
</script>

<template>
    <div class="flex flex-col">
      <h3 class="text-xl font-bold mb-4">{{ title }}</h3>
      <div v-for=" item in props.items" :key="item.id" class="flex item-center justify-between gap-4 mb-2 flew-wrap">
        <label :for="item.name">
          {{ item.name }}
        </label>
        <input type="checkbox" :value="item.name" v-model="model" class="w-6 h-4 accent-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" />
      </div>
    </div>

</template>