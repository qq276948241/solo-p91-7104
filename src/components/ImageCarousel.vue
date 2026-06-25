<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Props {
  images: string[]
  aspect?: string
}

const props = withDefaults(defineProps<Props>(), {
  aspect: 'aspect-square',
})

const current = ref(0)
let timer: number | null = null

const go = (idx: number) => {
  if (props.images.length === 0) return
  current.value = (idx + props.images.length) % props.images.length
}

const prev = () => go(current.value - 1)
const next = () => go(current.value + 1)

const startAuto = () => {
  stopAuto()
  if (props.images.length <= 1) return
  timer = window.setInterval(() => {
    next()
  }, 4000)
}

const stopAuto = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch(
  () => props.images,
  () => {
    current.value = 0
    startAuto()
  },
)

onMounted(startAuto)
onBeforeUnmount(stopAuto)
</script>

<template>
  <div
    class="relative w-full overflow-hidden bg-gray-100 select-none"
    :class="aspect"
    @mouseenter="stopAuto"
    @mouseleave="startAuto"
  >
    <div
      class="flex h-full transition-transform duration-500 ease-out"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <div v-for="(img, i) in images" :key="i" class="w-full h-full flex-shrink-0">
        <img :src="img" :alt="`image-${i}`" class="w-full h-full object-cover" />
      </div>
    </div>

    <template v-if="images.length > 1">
      <button
        class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 backdrop-blur flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
        @click="prev"
      >
        <ChevronLeft :size="18" />
      </button>
      <button
        class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 backdrop-blur flex items-center justify-center text-gray-700 hover:bg-white transition-colors"
        @click="next"
      >
        <ChevronRight :size="18" />
      </button>

      <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        <span
          v-for="(_, i) in images"
          :key="i"
          class="h-1.5 rounded-full transition-all duration-300"
          :class="current === i ? 'w-5 bg-white' : 'w-1.5 bg-white/50'"
        ></span>
      </div>
    </template>
  </div>
</template>
