<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useApiToast } from '@/composables/useApiToast.ts'

  const { showApiError, showApiSuccess } = useApiToast()

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const newPassword = ref('')

  const getProfile = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, { method: 'GET' })
      const data = await res.json()
      if (res.ok) {
        name.value = data.name
        email.value = data.email
      } else {
        throw new Error(data.message || 'Не вдалося отримати дані профілю')
      }
    } catch (err) {
      showApiError(err)
    }
  }

  const updateProfile = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
          newPassword: newPassword.value,
        }),
      })
      const data = await res.json()

      if (res.ok) {
        showApiSuccess('Дані профілю успішно оновлено')
      } else {
        throw new Error(data.message || 'Не вдалося оновити профіль')
      }
    } catch (err) {
      showApiError(err)
    }
  }

  onMounted(() => {
    getProfile()
  })
</script>

<template>
  <div class="p-4">
    <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold text-center mb-4">Мій профіль</h2>

      <div class="mb-4">
        <label for="name" class="block text-sm font-semibold text-gray-700">Ім’я</label>
        <InputText v-model="name" id="name" class="w-full" />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-semibold text-gray-700">Email</label>
        <InputText v-model="email" id="email" type="email" class="w-full" disabled />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-sm font-semibold text-gray-700">Поточний пароль</label>
        <InputText v-model="password" id="password" type="password" class="w-full" />
      </div>

      <div class="mb-4">
        <label for="newPassword" class="block text-sm font-semibold text-gray-700">Новий пароль</label>
        <InputText v-model="newPassword" id="newPassword" type="password" class="w-full" />
      </div>

      <Button label="Оновити профіль" class="w-full mt-4" @click="updateProfile" />
    </div>
  </div>
</template>

<style scoped>

</style>
