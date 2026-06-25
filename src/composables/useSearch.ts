import { ref, computed, watch } from 'vue'
import { useItems } from './useItems'
import type { ItemCategory } from '@/types'

export function useSearch() {
  const { items } = useItems()

  const keyword = ref('')
  const debouncedKeyword = ref('')
  const category = ref<ItemCategory | 'all'>('all')

  let timer: ReturnType<typeof setTimeout> | null = null

  watch(keyword, (val) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      debouncedKeyword.value = val
    }, 300)
  })

  const filteredItems = computed(() => {
    let list = items.value

    if (category.value !== 'all') {
      list = list.filter((i) => i.category === category.value)
    }

    const kw = debouncedKeyword.value.trim().toLowerCase()
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

  const clearKeyword = () => {
    keyword.value = ''
  }

  return {
    keyword,
    category,
    filteredItems,
    columnLeft,
    columnRight,
    clearKeyword,
  }
}
