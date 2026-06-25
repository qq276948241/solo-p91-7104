<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Heart } from 'lucide-vue-next'
import ItemCard from '@/components/ItemCard.vue'
import { useFavorites } from '@/composables/useFavorites'

const router = useRouter()
const { favoriteItems, removeFavorite } = useFavorites()

const columnLeft = computed(() =>
  favoriteItems.value.filter((_, i) => i % 2 === 0),
)
const columnRight = computed(() =>
  favoriteItems.value.filter((_, i) => i % 2 === 1),
)

const onRemove = (id: string, title: string) => {
  if (confirm(`确定取消收藏「${title}」吗？`)) {
    removeFavorite(id)
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
        <ItemCard
          v-for="item in columnLeft"
          :key="item.id"
          :item="item"
          removable
          @remove="onRemove(item.id, item.title)"
        />
      </div>
      <div class="flex-1 flex flex-col gap-3">
        <ItemCard
          v-for="item in columnRight"
          :key="item.id"
          :item="item"
          removable
          @remove="onRemove(item.id, item.title)"
        />
      </div>
    </div>
  </div>
</template>
