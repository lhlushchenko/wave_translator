<script setup lang="ts">
  import { ref } from 'vue'
  import { useApiToast } from '@/composables/useApiToast.ts'
  import AuthLayout from '@/layouts/AuthLayout.vue'

  const { showApiError } = useApiToast()

  const languages = ref([
    { name: 'Українська', code: 'uk' },
    { name: 'Англійська', code: 'en' },
    { name: 'Іспанська', code: 'es' },
    { name: 'Італійська', code: 'it' },
  ]);

  const sourceLang = ref(languages.value[1].code);
  const targetLang = ref(languages.value[0].code);
  const inputText = ref<string>('')
  const translatedText = ref<string>('')

  const switchLang = () => {
    const tempSourceLang = sourceLang.value
    sourceLang.value = targetLang.value
    targetLang.value = tempSourceLang

    if (inputText.value && translatedText.value) {
      const tempInputText = inputText.value
      inputText.value = translatedText.value
      translatedText.value = tempInputText
    }
  }

  const translateText = async () => {
    try {
      const isAuthorized = localStorage.getItem('token')

      if (isAuthorized) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/translations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            text: inputText.value,
            sourceLang: sourceLang.value,
            targetLang: targetLang.value,
          })
        });

        if (!response.ok) {
          const errorData = await response.json()
          return showApiError(errorData)
        }

        const data = await response.json();
        translatedText.value = data.translatedText;
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/translations/guest`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: inputText.value,
            sourceLang: sourceLang.value,
            targetLang: targetLang.value,
          })
        });

        if (!response.ok) {
          const errorData = await response.json()
          return showApiError(errorData)
        }

        const data = await response.json();
        translatedText.value = data.translatedText;
      }
    } catch (error) {
      console.error(error)
    }
  }
</script>

<template>
  <AuthLayout>
    <div class="max-w-200 mx-auto py-10 space-y-4 text-center">
      <h1 class="text-3xl font-bold mb-12">Перекладач</h1>

      <div class="flex items-start gap-4">
        <div class="text-right">
          <Select
            v-model="sourceLang"
            :options="languages"
            optionLabel="name"
            optionValue="code"
            placeholder="Оберіть мову"
            class="mb-2"
          />
          <Textarea
            v-model="inputText"
            rows="4"
            class="w-full"
            placeholder="Введіть текст"
          />
        </div>

        <Button
          variant="outlined"
          severity="secondary"
          icon="pi pi-arrow-right-arrow-left"
          aria-label="Switch"
          @click="switchLang"
        />

        <div class="text-left">
          <Select
            v-model="targetLang"
            :options="languages"
            optionLabel="name"
            optionValue="code"
            placeholder="Оберіть мову"
            class="mb-2"
          />
          <Textarea
            v-model="translatedText"
            rows="4"
            class="w-full"
            placeholder="Введіть текст"
            disabled
          />
        </div>
      </div>

      <Button
        label="Перекласти"
        :disabled="!inputText"
        @click="translateText"
      />
    </div>
  </AuthLayout>
</template>

<style scoped>

</style>
