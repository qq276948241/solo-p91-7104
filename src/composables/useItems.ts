import { computed } from 'vue'
import { useLocalStorage } from './useStorage'
import { useFavorites } from './useFavorites'
import type { Item, User } from '@/types'

const USER_ID = 'local-user-001'

const items = useLocalStorage<Item[]>('swap_items', [])
const user = useLocalStorage<User>('swap_user', {
  id: USER_ID,
  nickname: '邻居小王',
})

export function useItems() {
  const allItems = computed(() => [...items.value].sort((a, b) => b.createdAt - a.createdAt))

  const myItems = computed(() =>
    allItems.value.filter((i) => i.ownerId === user.value.id),
  )

  const getItemById = (id: string) => items.value.find((i) => i.id === id)

  const addItem = (payload: Omit<Item, 'id' | 'ownerId' | 'createdAt'>) => {
    const newItem: Item = {
      ...payload,
      id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      ownerId: user.value.id,
      createdAt: Date.now(),
    }
    items.value.unshift(newItem)
    return newItem
  }

  const deleteItem = (id: string) => {
    const idx = items.value.findIndex((i) => i.id === id)
    if (idx >= 0) items.value.splice(idx, 1)
    const { removeFavorite } = useFavorites()
    removeFavorite(id)
  }

  const currentUser = user

  return {
    items: allItems,
    myItems,
    currentUser,
    getItemById,
    addItem,
    deleteItem,
  }
}

export const seedMockData = () => {
  if (items.value.length > 0) return
  const mock: Item[] = [
    {
      id: 'item_mock_1',
      title: '九成新《JavaScript高级程序设计》',
      category: 'books',
      description: '只翻过前几章，几乎全新，适合前端入门学习。小区自提，不邮寄。',
      contactName: '张阿姨',
      contactWechat: 'zhangayi_2024',
      images: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop',
      ],
      ownerId: 'other-user-1',
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: 'item_mock_2',
      title: '小米空气净化器Pro H',
      category: 'appliances',
      description: '用了一年多，功能完好，滤芯还有一半寿命，搬家出。',
      contactName: '李先生',
      contactWechat: 'lixiansheng88',
      images: [
        'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop',
      ],
      ownerId: 'other-user-2',
      createdAt: Date.now() - 86400000,
    },
    {
      id: 'item_mock_3',
      title: '儿童纯棉卫衣 110码',
      category: 'kids-clothes',
      description: '孩子穿小了，洗过两次，无污渍，粉色很可爱。',
      contactName: '王妈妈',
      contactWechat: 'wangmama_hh',
      images: [
        'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop',
      ],
      ownerId: 'other-user-1',
      createdAt: Date.now() - 3600000 * 10,
    },
    {
      id: 'item_mock_4',
      title: '北欧风实木书桌 1.2米',
      category: 'furniture',
      description: '橡木材质，结实稳固，轻微使用痕迹，自提需拆。',
      contactName: '陈先生',
      contactWechat: 'chenxs_home',
      images: [
        'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop',
      ],
      ownerId: 'other-user-3',
      createdAt: Date.now() - 3600000 * 5,
    },
  ]
  items.value = mock
}
