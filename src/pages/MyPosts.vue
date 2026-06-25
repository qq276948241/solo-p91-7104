<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Trash2, Package } from 'lucide-vue-next'
import { useItems } from '@/composables/useItems'
import { CATEGORY_LABELS } from '@/types'

const router = useRouter()
const { myItems, deleteItem } = useItems()

const onDelete = (id: string, title: string) => {
  if (confirm(`确定删除「${title}」吗？此操作不可恢复。`)) {
    deleteItem(id)
  }
}

const goDetail = (id: string) => {
  router.push(`/detail/${id}`)
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 pt-6">
    <header class="mb-5">
      <h1 class="text-2xl font-bold text-gray-800 mb-1">我的发布</h1>
      <p class="text-sm text-gray-500">共 {{ myItems.length }} 件物品</p>
    </header>

    <div v-if="myItems.length === 0" class="py-20 text-center text-gray-400">
      <Package :size="48" class="mx-auto mb-3 text-gray-300" />
      <p class="mb-4">你还没有发布任何物品</p>
      <button class="btn-primary" @click="router.push('/create')">去发布</button>
    </div>

    <div v-else class="flex flex-col gap-3">
      <div
        v-for="item in myItems"
        :key="item.id"
        class="card p-3 flex gap-3"
      >
        <div
          class="w-24 h-24 flex-shrink-0 rounded-card overflow-hidden bg-gray-100 cursor-pointer"
          @click="goDetail(item.id)"
        >
          <img
            v-if="item.images[0]"
            :src="item.images[0]"
            :alt="item.title"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="flex-1 min-w-0 flex flex-col">
          <div class="flex items-start justify-between gap-2">
            <h3
              class="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug cursor-pointer hover:text-primary transition-colors"
              @click="goDetail(item.id)"
            >
              {{ item.title }}
            </h3>
            <button
              class="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              :title="'删除'"
              @click="onDelete(item.id, item.title)"
            >
              <Trash2 :size="16" />
            </button>
          </div>
          <div class="flex items-center gap-2 mt-auto pt-2">
            <span class="text-[11px] font-medium bg-primary-50 text-primary px-2 py-0.5 rounded-full">
              {{ CATEGORY_LABELS[item.category] }}
            </span>
            <span class="text-[11px] text-gray-400">
              {{ new Date(item.createdAt).toLocaleDateString('zh-CN') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
