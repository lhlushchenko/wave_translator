<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useApiToast } from '@/composables/useApiToast'

  const { showApiError } = useApiToast()
  const history = ref([])

  const getHistory = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/history`, { method: 'GET' })
      const data = await res.json()
      if (res.ok) {
        history.value = data.history
      } else {
        throw new Error(data.message || 'Не вдалося отримати історію перекладів')
      }
    } catch (err) {
      showApiError(err)
    }
  }

  onMounted(() => {
    getHistory()
  })
</script>

<template>
  <div class="p-4">
    <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold text-center mb-4">Історія перекладів</h2>

      <div v-if="history.length === 0" class="text-center text-gray-500">
        Немає записів в історії
      </div>

      <div v-else>
        <ul>
          <li v-for="(item, index) in history" :key="index" class="border-b py-3">
            <div class="flex justify-between items-center">
              <span class="font-semibold">{{ item.date }}</span>
              <span class="text-gray-500">Переклад з {{ item.sourceLanguage }} на {{ item.targetLanguage }}</span>
            </div>
            <div class="mt-2 text-gray-800">
              <p><strong>Оригінал:</strong> {{ item.originalText }}</p>
              <p><strong>Переклад:</strong> {{ item.translatedText }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
