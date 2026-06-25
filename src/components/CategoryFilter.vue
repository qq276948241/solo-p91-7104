<script setup lang="ts">
import { CATEGORY_LABELS, type ItemCategory } from '@/types'

interface Props {
  modelValue: ItemCategory | 'all'
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', v: ItemCategory | 'all'): void
}>()

const categories: (ItemCategory | 'all')[] = [
  'all',
  'books',
  'appliances',
  'kids-clothes',
  'furniture',
]
</script>

<template>
  <div class="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
    <button
      v-for="cat in categories"
      :key="cat"
      class="chip"
      :class="modelValue === cat ? 'chip-active' : 'chip-inactive'"
      @click="emit('update:modelValue', cat)"
    >
      {{ CATEGORY_LABELS[cat] }}
    </button>
  </div>
</template>
