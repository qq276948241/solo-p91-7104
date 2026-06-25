<script setup lang="ts">
import { ref, computed } from 'vue'
import CategoryFilter from '@/components/CategoryFilter.vue'
import ItemCard from '@/components/ItemCard.vue'
import { useItems } from '@/composables/useItems'
import type { ItemCategory } from '@/types'

const { items } = useItems()
const category = ref<ItemCategory | 'all'>('all')

const filteredItems = computed(() => {
  if (category.value === 'all') return items.value
  return items.value.filter((i) => i.category === category.value)
})

const columnLeft = computed(() =>
  filteredItems.value.filter((_, i) => i % 2 === 0),
)
const columnRight = computed(() =>
  filteredItems.value.filter((_, i) => i % 2 === 1),
)
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 pt-6">
    <header class="mb-5">
      <h1 class="text-2xl font-bold text-gray-800 mb-1">邻里闲置</h1>
      <p class="text-sm text-gray-500">换物交友，让闲置流动起来</p>
    </header>

    <div class="mb-4">
      <CategoryFilter v-model="category" />
    </div>

    <div v-if="filteredItems.length === 0" class="py-20 text-center text-gray-400">
      <div class="text-5xl mb-3">📦</div>
      <p>暂无物品，快去发布一个吧～</p>
    </div>

    <div v-else class="flex gap-3">
      <div class="flex-1 flex flex-col gap-3">
        <ItemCard v-for="item in columnLeft" :key="item.id" :item="item" />
      </div>
      <div class="flex-1 flex flex-col gap-3">
        <ItemCard v-for="item in columnRight" :key="item.id" :item="item" />
      </div>
    </div>
  </div>
</template>
