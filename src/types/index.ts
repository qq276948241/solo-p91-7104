export type ItemCategory = 'books' | 'appliances' | 'kids-clothes' | 'furniture'

export interface Item {
  id: string
  title: string
  category: ItemCategory
  description: string
  contactName: string
  contactWechat: string
  images: string[]
  ownerId: string
  createdAt: number
}

export interface User {
  id: string
  nickname: string
}

export const CATEGORY_LABELS: Record<ItemCategory | 'all', string> = {
  all: '全部',
  books: '书籍',
  appliances: '家电',
  'kids-clothes': '童装',
  furniture: '家具',
}

export const CATEGORY_OPTIONS: ItemCategory[] = ['books', 'appliances', 'kids-clothes', 'furniture']
