<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Heart, X } from 'lucide-vue-next'
import type { Item } from '@/types'
import { useFavorites } from '@/composables/useFavorites'
import { CATEGORY_LABELS } from '@/types'

interface Props {
  item: Item
  removable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  removable: false,
})

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const router = useRouter()
const { isFavorited, toggleFavorite } = useFavorites()

const goDetail = () => {
  router.push(`/detail/${props.item.id}`)
}

const onFavClick = (e: Event) => {
  e.stopPropagation()
  toggleFavorite(props.item.id)
}

const onRemoveClick = (e: Event) => {
  e.stopPropagation()
  emit('remove')
}
</script>

<template>
  <div class="card cursor-pointer" @click="goDetail">
    <div class="relative">
      <img
        :src="item.images[0]"
        :alt="item.title"
        class="w-full h-auto object-cover bg-gray-100"
        loading="lazy"
      />
      <button
        v-if="removable"
        class="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm transition-transform active:scale-90 hover:bg-red-50"
        @click="onRemoveClick"
      >
        <X :size="14" class="text-gray-600" />
      </button>
      <button
        v-else
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/85 backdrop-blur flex items-center justify-center shadow-sm transition-transform active:scale-90"
        @click="onFavClick"
      >
        <Heart
          :size="16"
          :fill="isFavorited(item.id) ? '#FF8C42' : 'none'"
          :stroke="isFavorited(item.id) ? '#FF8C42' : '#666'"
          :stroke-width="2"
        />
      </button>
      <span
        class="absolute bottom-2 left-2 text-[11px] font-medium bg-primary/90 text-white px-2 py-0.5 rounded-full"
      >
        {{ CATEGORY_LABELS[item.category] }}
      </span>
    </div>
    <div class="p-3">
      <h3 class="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug mb-2">
        {{ item.title }}
      </h3>
      <div class="flex items-center gap-1.5 text-xs text-gray-500">
        <span class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-medium text-gray-600 overflow-hidden">
          {{ item.contactName.charAt(0) }}
        </span>
        <span class="truncate max-w-[100px]">{{ item.contactName }}</span>
      </div>
    </div>
  </div>
</template>
