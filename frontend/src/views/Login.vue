<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useApiToast } from '@/composables/useApiToast.ts'
  import GuestLayout from '@/layouts/GuestLayout.vue'

  const router = useRouter()
  const { showApiError } = useApiToast()

  const email = ref<string>('')
  const password = ref<string>('')
  const error = ref<string>('')

  const login = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
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
        localStorage.setItem('token', data.access_token);
        await router.push('/');
      } else {
        error.value = data.message;
      }
    } catch (error) {
      showApiError(error);
    }
  }
</script>

<template>
  <GuestLayout>
    <div class="max-w-md mx-auto py-10 space-y-4">
      <h1 class="text-2xl font-bold mb-4">Вхід</h1>

      <InputText v-model="email" placeholder="Email" fluid />
      <Password v-model="password" placeholder="Пароль" toggleMask fluid :feedback="false" />

      <Button label="Увійти" class="w-full" @click="login" />
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </div>
  </GuestLayout>
</template>

<style scoped>

</style>
