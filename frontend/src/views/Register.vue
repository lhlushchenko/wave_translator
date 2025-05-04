<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useApiToast } from '@/composables/useApiToast.ts'

  const router = useRouter()
  const { showApiSuccess, showApiError } = useApiToast()

  const email = ref<string>('')
  const password = ref<string>('')
  const error = ref<string>('')

  const register = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      });
      const data = await response.json();
      if (response.ok) {
        showApiSuccess('Реєстрація пройшла успішно! Тепер ви можете увійти.')
        localStorage.setItem('token', data.access_token);
        await router.push('/login');
      } else {
        error.value = data.message;
      }
    } catch (error) {
      showApiError(error);
    }
  }
</script>

<template>
  <div class="max-w-md mx-auto py-10 space-y-4">
    <h1 class="text-2xl font-bold mb-4">Реєстрація</h1>

    <InputText v-model="email" placeholder="Email" class="w-full" />
    <Password v-model="password" placeholder="Пароль" toggleMask class="w-full" />

    <Button label="Зареєструватися" class="w-full" @click="register" />
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>

<style scoped>

</style>
