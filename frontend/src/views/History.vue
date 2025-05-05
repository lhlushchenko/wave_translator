<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import dayjs from 'dayjs'
  import DataTable from 'primevue/datatable'
  import Column from 'primevue/column'
  import { useApiToast } from '@/composables/useApiToast'
  import AuthLayout from '@/layouts/AuthLayout.vue'

  const { showApiError } = useApiToast()
  const history = ref([])

  const languageNames = {
    en: 'Англійська',
    uk: 'Українська',
    es: 'Іспанська',
    it: 'Італійська',
  };

  const getHistory = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/history`, { method: 'GET', headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, } })
      const data = await res.json()
      console.log(data)
      if (res.ok) {
        history.value = data.map(item => ({
          ...item,
          sourceLanguage: languageNames[item.sourceLanguage] || item.sourceLang,
          targetLanguage: languageNames[item.targetLanguage] || item.targetLang,
          createdAt: formatedDate(item.createdAt)
        }))
      } else {
        throw new Error(data.message || 'Не вдалося отримати історію перекладів')
      }
    } catch (err) {
      showApiError(err)
    }
  }

  const formatedDate = (date: string) => {
    return dayjs(date).format('DD MMMM YYYY')
  }

  onMounted(() => {
    getHistory()
  })
</script>

<template>
  <AuthLayout>
    <div class="p-4">
      <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 class="text-2xl font-bold text-center mb-4">Історія перекладів</h2>

        <div v-if="history.length === 0" class="text-center text-gray-500">
          Немає записів в історії
        </div>

        <DataTable v-else :value="history">
          <Column field="createdAt" header="Створено"></Column>
          <Column field="sourceLanguage" header="Мова вводу"></Column>
          <Column field="targetLanguage" header="Мова перекладу"></Column>
          <Column field="originalText" header="Текст вводу"></Column>
          <Column field="translatedText" header="Текст перекладу"></Column>
        </DataTable>

<!--        <div v-else>-->
<!--          <ul>-->
<!--            <li v-for="(item, index) in history" :key="index" class="border-b py-3">-->
<!--              <div class="flex justify-between items-center">-->
<!--                <span class="font-semibold">{{ item.createdAt }}</span>-->
<!--                <span class="text-gray-500">Переклад з {{ item.sourceLanguage }} на {{ item.targetLanguage }}</span>-->
<!--              </div>-->
<!--              <div class="mt-2 text-gray-800">-->
<!--                <p><strong>Оригінал:</strong> {{ item.originalText }}</p>-->
<!--                <p><strong>Переклад:</strong> {{ item.translatedText }}</p>-->
<!--              </div>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped>

</style>
