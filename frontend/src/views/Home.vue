<script setup lang="ts">
  import { ref } from 'vue'
  import { useApiToast } from '@/composables/useApiToast.ts'

  const { showApiError } = useApiToast()

  const languages = [
    { name: 'Українська', code: 'uk' },
    { name: 'Англійська', code: 'en' },
    { name: 'Іспанська', code: 'es' },
    { name: 'Італійська', code: 'it' },
  ];

  const selectedLanguage = ref(languages[1]); // default 'en'
  const inputText = ref<string>('')
  const translatedText = ref<string>('')

  const translateText = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/translations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ text: inputText.value, targetLang: 'en' })
      });
      const data = await response.json();
      translatedText.value = data.translation;
    } catch (error) {
      showApiError(error)
    }
  }
</script>

<template>
  <div class="max-w-2xl mx-auto py-10 space-y-4">
    <h1 class="text-3xl font-bold mb-4">Перекладач</h1>

    <Textarea
      v-model="inputText"
      rows="4"
      class="w-full"
      placeholder="Введіть текст"
    />

    <Dropdown
      v-model="selectedLanguage"
      :options="languages"
      optionLabel="label"
      optionValue="value"
      placeholder="Оберіть мову"
      class="w-full"
    />

    <Button
      label="Перекласти"
      class="w-full"
      @click="translateText"
    />

    <div v-if="translatedText" class="p-4 bg-gray-100 rounded shadow">
      <h2 class="font-semibold">Результат:</h2>
      <p>{{ translatedText }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
