<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Heart, MessageCircle, Copy, Check } from 'lucide-vue-next'
import { ref } from 'vue'
import ImageCarousel from '@/components/ImageCarousel.vue'
import { useItems } from '@/composables/useItems'
import { CATEGORY_LABELS } from '@/types'

const route = useRoute()
const router = useRouter()
const { getItemById, isFavorite, toggleFavorite } = useItems()

const itemId = computed(() => String(route.params.id))
const item = computed(() => getItemById(itemId.value))
const copied = ref(false)

const copyWechat = async () => {
  if (!item.value) return
  try {
    await navigator.clipboard.writeText(item.value.contactWechat)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    alert(`微信号: ${item.value.contactWechat}`)
  }
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div v-if="item" class="max-w-3xl mx-auto pb-8">
    <div class="sticky top-0 z-40 bg-background/90 backdrop-blur-md">
      <div class="flex items-center justify-between h-14 px-4">
        <button
          class="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-700 hover:bg-gray-50 transition"
          @click="goBack"
        >
          <ArrowLeft :size="20" />
        </button>
        <h2 class="font-semibold text-gray-800">物品详情</h2>
        <button
          class="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center transition"
          :class="isFavorite(item.id) ? 'text-primary' : 'text-gray-700 hover:bg-gray-50'"
          @click="toggleFavorite(item.id)"
        >
          <Heart
            :size="20"
            :fill="isFavorite(item.id) ? '#FF8C42' : 'none'"
            :stroke-width="2"
          />
        </button>
      </div>
    </div>

    <ImageCarousel :images="item.images" aspect="aspect-[4/3]" />

    <div class="px-4 mt-5">
      <div class="flex items-center gap-2 mb-3">
        <span class="text-xs font-medium bg-primary-50 text-primary px-2.5 py-1 rounded-full">
          {{ CATEGORY_LABELS[item.category] }}
        </span>
        <span class="text-xs text-gray-400">
          {{ new Date(item.createdAt).toLocaleDateString('zh-CN') }}
        </span>
      </div>

      <h1 class="text-xl font-bold text-gray-900 mb-3 leading-snug">
        {{ item.title }}
      </h1>

      <div class="card p-4 mb-4">
        <h3 class="text-sm font-semibold text-gray-700 mb-2">物品描述</h3>
        <p class="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
          {{ item.description }}
        </p>
      </div>

      <div class="card p-4 mb-4">
        <h3 class="text-sm font-semibold text-gray-700 mb-3">发布人</h3>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-lg font-bold text-primary">
            {{ item.contactName.charAt(0) }}
          </div>
          <div class="flex-1">
            <div class="font-medium text-gray-800">{{ item.contactName }}</div>
            <div class="text-xs text-gray-400 mt-0.5">小区邻居</div>
          </div>
        </div>
      </div>

      <div class="card p-4">
        <h3 class="text-sm font-semibold text-gray-700 mb-3">联系方式</h3>
        <div class="flex items-center gap-3 bg-gray-50 rounded-card p-3">
          <MessageCircle :size="20" class="text-primary flex-shrink-0" />
          <div class="flex-1">
            <div class="text-xs text-gray-400">微信号</div>
            <div class="font-medium text-gray-800">{{ item.contactWechat }}</div>
          </div>
          <button
            class="btn-outline !px-3 !py-1.5 text-sm flex items-center gap-1"
            @click="copyWechat"
          >
            <Check v-if="copied" :size="14" />
            <Copy v-else :size="14" />
            <span>{{ copied ? '已复制' : '复制' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="max-w-3xl mx-auto px-4 py-20 text-center text-gray-400">
    <div class="text-5xl mb-3">😕</div>
    <p class="mb-4">物品不存在或已被删除</p>
    <button class="btn-primary" @click="router.push('/')">返回首页</button>
  </div>
</template>
