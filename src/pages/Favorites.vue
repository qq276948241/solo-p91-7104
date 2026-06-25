<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { X, Heart } from 'lucide-vue-next'
import { useItems } from '@/composables/useItems'
import { CATEGORY_LABELS } from '@/types'
import type { Item } from '@/types'

const router = useRouter()
const { items, favorites, toggleFavorite } = useItems()

const favoriteItems = computed(() =>
  items.value.filter((i) => favorites.value.includes(i.id)),
)

const columnLeft = computed(() =>
  favoriteItems.value.filter((_, i) => i % 2 === 0),
)
const columnRight = computed(() =>
  favoriteItems.value.filter((_, i) => i % 2 === 1),
)

const goDetail = (id: string) => {
  router.push(`/detail/${id}`)
}

const onRemoveClick = (e: Event, item: Item) => {
  e.stopPropagation()
  if (confirm(`确定取消收藏「${item.title}」吗？`)) {
    toggleFavorite(item.id)
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 pt-6">
    <header class="mb-5">
      <h1 class="text-2xl font-bold text-gray-800 mb-1">我的收藏</h1>
      <p class="text-sm text-gray-500">共 {{ favoriteItems.length }} 件收藏物品</p>
    </header>

    <div v-if="favoriteItems.length === 0" class="py-20 text-center text-gray-400">
      <Heart :size="48" class="mx-auto mb-3 text-gray-300" />
      <p class="mb-4">还没有收藏任何物品</p>
      <button class="btn-primary" @click="router.push('/')">去逛逛</button>
    </div>

    <div v-else class="flex gap-3">
      <div class="flex-1 flex flex-col gap-3">
        <div
          v-for="item in columnLeft"
          :key="item.id"
          class="card cursor-pointer relative"
          @click="goDetail(item.id)"
        >
          <div class="relative">
            <img
              :src="item.images[0]"
              :alt="item.title"
              class="w-full h-auto object-cover bg-gray-100"
              loading="lazy"
            />
            <button
              class="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm transition-transform active:scale-90 hover:bg-red-50"
              :title="'取消收藏'"
              @click="onRemoveClick($event, item)"
            >
              <X :size="14" class="text-gray-600" />
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
      </div>
      <div class="flex-1 flex flex-col gap-3">
        <div
          v-for="item in columnRight"
          :key="item.id"
          class="card cursor-pointer relative"
          @click="goDetail(item.id)"
        >
          <div class="relative">
            <img
              :src="item.images[0]"
              :alt="item.title"
              class="w-full h-auto object-cover bg-gray-100"
              loading="lazy"
            />
            <button
              class="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm transition-transform active:scale-90 hover:bg-red-50"
              :title="'取消收藏'"
              @click="onRemoveClick($event, item)"
            >
              <X :size="14" class="text-gray-600" />
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
      </div>
    </div>
  </div>
</template>
