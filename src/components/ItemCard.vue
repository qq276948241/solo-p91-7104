<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Heart } from 'lucide-vue-next'
import type { Item } from '@/types'
import { useItems } from '@/composables/useItems'
import { CATEGORY_LABELS } from '@/types'

interface Props {
  item: Item
}

const props = defineProps<Props>()
const router = useRouter()
const { isFavorite, toggleFavorite } = useItems()

const goDetail = () => {
  router.push(`/detail/${props.item.id}`)
}

const onFavClick = (e: Event) => {
  e.stopPropagation()
  toggleFavorite(props.item.id)
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
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/85 backdrop-blur flex items-center justify-center shadow-sm transition-transform active:scale-90"
        @click="onFavClick"
      >
        <Heart
          :size="16"
          :fill="isFavorite(item.id) ? '#FF8C42' : 'none'"
          :stroke="isFavorite(item.id) ? '#FF8C42' : '#666'"
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
