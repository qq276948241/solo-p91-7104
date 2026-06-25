<script setup lang="ts">
import { Home, Package, PlusCircle } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const tabs = [
  { name: 'home', label: '首页', path: '/', icon: Home },
  { name: 'my-posts', label: '我的发布', path: '/my-posts', icon: Package },
  { name: 'create', label: '发布', path: '/create', icon: PlusCircle },
]

const activeName = computed(() => route.name)

const go = (path: string) => {
  if (route.path !== path) router.push(path)
}
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]"
  >
    <div class="max-w-3xl mx-auto flex items-center justify-around h-16 px-2">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        class="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200"
        :class="
          activeName === tab.name
            ? 'text-primary'
            : 'text-gray-400 hover:text-gray-600'
        "
        @click="go(tab.path)"
      >
        <component :is="tab.icon" :size="tab.name === 'create' ? 30 : 22" :stroke-width="2" />
        <span class="text-xs font-medium">{{ tab.label }}</span>
        <div
          v-if="tab.name === 'create'"
          class="absolute -top-4 w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center text-white"
        >
          <PlusCircle :size="26" :stroke-width="2.4" />
        </div>
      </button>
    </div>
  </nav>
</template>
