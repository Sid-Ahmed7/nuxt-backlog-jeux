<script setup lang="ts">
import type { Game } from '@/types/Game';

const {getScreenshotUrl} = useGameUtils();

const props = defineProps<{
  show: boolean
  screenshots: Game['screenshots']
  initialIndex: number
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'change-index', index: number): void
}>()


const currentIndex = ref(props.initialIndex)

watch(() => props.initialIndex, (newIndex) => {
    currentIndex.value = newIndex
})

watch(() => props.show, (isVisible) => {
    document.body.style.overflow = isVisible ?'hidden' : 'auto'
})

const closeModal = () => {
    emit('close')
}

const changeImage = (index: number) => {
    currentIndex.value = index;
    emit('change-index', index!);
};

const navigateImage =(d: number) => {
    if(!props.screenshots?.length) {return}

    let newIndex = currentIndex.value + d

    if(newIndex < 0) {
        newIndex =  props.screenshots.length - 1
    } else if (newIndex >= props.screenshots.length) {
        newIndex = 0
    }

    currentIndex.value = newIndex
    emit('change-index', newIndex)
};

const handleKydown = (event: KeyboardEvent) => {
    if (!props.show) {return}

    switch (event.key) {
        case 'Escape': 
            closeModal()
            break

        case 'ArrowLeft':
            navigateImage(-1)
            break
        
        case 'ArrowRight':
            navigateImage(1)
            break
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKydown)
})
</script>
<template>
    <Teleport to="body">
      <div 
        v-if="show" 
        class="fixed inset-0 bg-black/70 z-[1000] flex justify-center items-center" 
        @click.self="closeModal"
      >
        <div class="relative max-w-[90vw] max-h-[90vh] bg-small-card border border-purple-700 flex flex-col rounded-md overflow  ">
          <div class="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-small-card to-[#6a1b9a] text-white ">
            <div>Capture d'écran {{ currentIndex + 1 }} / {{ screenshots?.length }}</div>
            <div class="cursor-pointer text-2xl select-none" @click="closeModal">×</div>
          </div>
          
          <div class="p-2 overflow-hidden flex justify-center relative">
            <img :src="getScreenshotUrl(screenshots && screenshots[currentIndex]?.image_id)" alt="Screenshot" class="max-w-full max-h-[calc(90vh-3.75rem)] object-contain" >
            
            <div class="absolute inset-0 flex justify-between items-center pointer-events-none">
              <div class="w-10 h-10 bg-black bg-opacity-50 rounded-full flex justify-center items-center cursor-pointer pointer-events-auto text-white text-2xl mx-3 transition-colors" @click.stop="navigateImage(-1)">&#10094;</div>
              <div class="w-10 h-10 bg-black bg-opacity-50 rounded-full flex justify-center items-center cursor-pointer pointer-events-auto text-white text-2xl mx-3 transition-colors" @click.stop="navigateImage(1)">&#10095;</div>
            </div>
          </div>
          
          <div class="bg-[#2a2a2a] p-2 flex gap-2">
            <div 
              v-for="(screenshot, index) in screenshots" 
              :key="screenshot.id"
                       :class="[
              'flex-shrink-0 w-28 h-16 rounded-sm cursor-pointer transition-transform',
              currentIndex === index
                ? 'border-purple-700 shadow-md'
                : 'border-transparent'
            ]"
              @click="changeImage(index)"
            >
            
              <img :src="getScreenshotUrl(screenshot.image_id)" :alt="`Screenshot ${index + 1}`" class="w-full h-full object-cover rounded-sm">
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </template>
