<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, X } from 'lucide-vue-next'
import CategoryFilter from '@/components/CategoryFilter.vue'
import ItemCard from '@/components/ItemCard.vue'
import { useItems } from '@/composables/useItems'
import type { ItemCategory } from '@/types'

const { items } = useItems()
const category = ref<ItemCategory | 'all'>('all')
const keyword = ref('')

const clearKeyword = () => {
  keyword.value = ''
}

const filteredItems = computed(() => {
  let list = items.value

  if (category.value !== 'all') {
    list = list.filter((i) => i.category === category.value)
  }

  const kw = keyword.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(
      (i) =>
        i.title.toLowerCase().includes(kw) ||
        i.description.toLowerCase().includes(kw),
    )
  }

  return list
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

    <div class="relative mb-4">
      <div class="relative">
        <Search
          :size="18"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          v-model="keyword"
          type="text"
          class="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-card outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
          placeholder="搜索物品标题或描述..."
        />
        <button
          v-if="keyword"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-300 transition-colors"
          :title="'清空'"
          @click="clearKeyword"
        >
          <X :size="14" />
        </button>
      </div>
    </div>

    <div class="mb-4">
      <CategoryFilter v-model="category" />
    </div>

    <div v-if="filteredItems.length === 0" class="py-20 text-center text-gray-400">
      <div class="text-5xl mb-3">📦</div>
      <p>暂无匹配的物品，换个关键词试试～</p>
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
