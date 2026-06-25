import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const read = (): T => {
    try {
      const raw = localStorage.getItem(key)
      if (raw === null) return defaultValue
      return JSON.parse(raw) as T
    } catch {
      return defaultValue
    }
  }

  const data = ref<T>(read()) as ReturnType<typeof ref<T>>

  watch(
    data,
    (value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch (e) {
        console.error('localStorage write error', e)
      }
    },
    { deep: true },
  )

  return data
}
