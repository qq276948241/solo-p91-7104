import { computed } from 'vue'
import { useLocalStorage } from './useStorage'
import { useItems } from './useItems'
import type { Item } from '@/types'

const favorites = useLocalStorage<string[]>('swap_favorites', [])

export function useFavorites() {
  const { items } = useItems()

  const isFavorited = (id: string) => favorites.value.includes(id)

  const toggleFavorite = (id: string) => {
    const idx = favorites.value.indexOf(id)
    if (idx >= 0) {
      favorites.value.splice(idx, 1)
    } else {
      favorites.value.push(id)
    }
  }

  const removeFavorite = (id: string) => {
    const idx = favorites.value.indexOf(id)
    if (idx >= 0) favorites.value.splice(idx, 1)
  }

  const favoriteItems = computed(() =>
    items.value.filter((i) => favorites.value.includes(i.id)),
  )

  return {
    favorites,
    favoriteItems,
    isFavorited,
    toggleFavorite,
    removeFavorite,
  }
}
