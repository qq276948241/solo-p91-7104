<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { X, Upload, ImageOff } from 'lucide-vue-next'
import { useItems } from '@/composables/useItems'
import { CATEGORY_LABELS, CATEGORY_OPTIONS, type ItemCategory } from '@/types'

const router = useRouter()
const { addItem, currentUser } = useItems()

const title = ref('')
const category = ref<ItemCategory>('books')
const description = ref('')
const contactName = ref(currentUser.value.nickname)
const contactWechat = ref('')
const images = ref<string[]>([])

const valid = computed(() => {
  return (
    title.value.trim().length > 0 &&
    description.value.trim().length > 0 &&
    contactName.value.trim().length > 0 &&
    contactWechat.value.trim().length > 0 &&
    images.value.length > 0
  )
})

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const onFilesSelected = async (e: Event) => {
  const input = e.target as HTMLInputElement
  if (!input.files) return
  const files = Array.from(input.files).filter((f) => f.type.startsWith('image/'))
  for (const file of files) {
    if (images.value.length >= 6) break
    try {
      const b64 = await fileToBase64(file)
      images.value.push(b64)
    } catch (err) {
      console.error('图片读取失败', err)
    }
  }
  input.value = ''
}

const removeImage = (idx: number) => {
  images.value.splice(idx, 1)
}

const submit = () => {
  if (!valid.value) return
  const newItem = addItem({
    title: title.value.trim(),
    category: category.value,
    description: description.value.trim(),
    contactName: contactName.value.trim(),
    contactWechat: contactWechat.value.trim(),
    images: images.value,
  })
  alert('发布成功！')
  router.replace(`/detail/${newItem.id}`)
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 pt-6 pb-10">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-1">发布闲置</h1>
      <p class="text-sm text-gray-500">填写信息，让邻居看到你的闲置物品</p>
    </header>

    <form class="flex flex-col gap-5" @submit.prevent="submit">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">物品标题</label>
        <input
          v-model="title"
          type="text"
          class="input-field"
          placeholder="例如：九成新空气净化器"
          maxlength="50"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">选择分类</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="opt in CATEGORY_OPTIONS"
            :key="opt"
            type="button"
            class="chip"
            :class="category === opt ? 'chip-active' : 'chip-inactive'"
            @click="category = opt"
          >
            {{ CATEGORY_LABELS[opt] }}
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          图片 <span class="text-gray-400 text-xs">(最多6张，点击删除)</span>
        </label>
        <div class="grid grid-cols-3 gap-3">
          <div
            v-for="(img, i) in images"
            :key="i"
            class="relative aspect-square rounded-card overflow-hidden bg-gray-100"
          >
            <img :src="img" class="w-full h-full object-cover" />
            <button
              type="button"
              class="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center"
              @click="removeImage(i)"
            >
              <X :size="14" />
            </button>
          </div>
          <label
            v-if="images.length < 6"
            class="aspect-square rounded-card border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer text-gray-400 hover:border-primary hover:text-primary transition-colors bg-white"
          >
            <Upload :size="24" class="mb-1" />
            <span class="text-xs">上传图片</span>
            <input
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="onFilesSelected"
            />
          </label>
        </div>
        <div v-if="images.length === 0" class="mt-2 flex items-center gap-1 text-xs text-gray-400">
          <ImageOff :size="12" />
          <span>至少上传一张图片</span>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">物品描述</label>
        <textarea
          v-model="description"
          class="textarea-field"
          rows="4"
          placeholder="描述一下物品的成色、使用情况、交换意向等..."
          maxlength="500"
        ></textarea>
        <div class="text-right text-xs text-gray-400 mt-1">{{ description.length }}/500</div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">你的昵称</label>
          <input v-model="contactName" type="text" class="input-field" placeholder="例如：张阿姨" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">微信号</label>
          <input
            v-model="contactWechat"
            type="text"
            class="input-field"
            placeholder="请填写微信号"
          />
        </div>
      </div>

      <button type="submit" class="btn-primary w-full !py-3 text-base mt-2" :disabled="!valid">
        发布物品
      </button>
    </form>
  </div>
</template>
