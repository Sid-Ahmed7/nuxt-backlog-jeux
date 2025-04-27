<script setup lang="ts">
import { useGameUtils } from '@/composables/useGameUtils';
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
        newIndex =  props.screenshots.length + 1
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
        class="lightbox" 
        @click.self="closeModal"
      >
        <div class="lightbox-content">
          <div class="lightbox-header">
            <div>Capture d'écran {{ currentIndex + 1 }} / {{ screenshots?.length }}</div>
            <div class="lightbox-close" @click="closeModal">×</div>
          </div>
          
          <div class="lightbox-img-container">
            <img :src="getScreenshotUrl(screenshots && screenshots[currentIndex]?.image_id)" alt="Screenshot" >
            
            <div class="navigation-arrows">
              <div class="arrow left" @click.stop="navigateImage(-1)">&#10094;</div>
              <div class="arrow right" @click.stop="navigateImage(1)">&#10095;</div>
            </div>
          </div>
          
          <div class="lightbox-thumbnails">
            <div 
              v-for="(screenshot, index) in screenshots" 
              :key="screenshot.id"
              :class="['thumbnail', { active: currentIndex === index }]" 
              @click="changeImage(index)"
            >
            
              <img :src="getScreenshotUrl(screenshot.image_id)" :alt="`Screenshot ${index + 1}`">
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </template>
  
  <style scoped>
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    background-color: #1c1c1c;
    border: 0.0625rem solid #8e24aa;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .lightbox-header {
    padding: 0.75rem 0.9375rem;
    background: linear-gradient(to right, #1c1c1c, #6a1b9a);
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .lightbox-img-container {
    padding: 0.625rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    position: relative;
  }
  
  .lightbox-img-container img {
    max-width: 100%;
    max-height: calc(90vh - 9.375rem);
    object-fit: contain;
  }
  
  .navigation-arrows {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
  }
  
  .arrow {
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    color: #fff;
    font-size: 1.5rem;
    margin: 0 0.625rem;
    transition: background-color 0.2s;
  }
  
  .arrow:hover {
    background-color: rgba(142, 36, 170, 0.7);
  }
  
  .arrow.left {
    margin-left: 1.25rem;
  }
  
  .arrow.right {
    margin-right: 1.25rem;
  }
  
  .lightbox-thumbnails {
    background-color: #2a2a2a;
    padding: 0.625rem;
    display: flex;
    gap: 0.625rem;
  }
  
  .thumbnail {
    flex: 0 0 auto;
    width: 7.25rem;
    height: 4.0625rem;
    border-radius: 0.1875rem;
    cursor: pointer;
    position: relative;
    transition: transform 0.2s ease;
    border: 0.0625rem solid transparent;
  }
  
  .thumbnail.active {
    border: 0.0625rem solid #8e24aa;
    box-shadow: 0 0 0.3125rem rgba(142, 36, 170, 0.6);
  }
  
  .thumbnail:hover {
    transform: translateY(-0.125rem);
  }
  
  .thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.125rem;
  }
  
  .lightbox-close {
    cursor: pointer;
    font-size: 1.375rem;
  }
  </style>