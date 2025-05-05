<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import Menubar from 'primevue/menubar'
  import Avatar from 'primevue/avatar'
  import Button from 'primevue/button'

  const router = useRouter()

  const isAuthenticated = computed(() => !!localStorage.getItem('token'))

  const menuItems = computed(() => {
    return isAuthenticated.value
      ? [
        { label: 'Перекладач', icon: 'pi-book', to: '/' },
        { label: 'Історія', icon: 'pi-history', to: '/history' },
        { label: 'Кабінет', icon: 'pi-user', to: '/profile' },
      ]
      : []
  })

  const logout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }
</script>

<template>
  <Menubar :model="menuItems" class="border-b rounded-none">
    <template #start>
      <RouterLink to="/" class="text-xl font-bold text-blue-600">WaveTranslate</RouterLink>
    </template>
    <template #item="{ item }">
      <router-link :to="item.to" custom>
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
      </router-link>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <template v-if="isAuthenticated">
          <Avatar icon="pi pi-user" shape="circle" class="mr-2" />
          <Button label="Вийти" severity="danger" size="small" @click="logout" />
        </template>
        <template v-else>
          <RouterLink to="/login">
            <Button label="Увійти" text size="small" />
          </RouterLink>
          <RouterLink to="/register">
            <Button label="Реєстрація" outlined size="small" />
          </RouterLink>
        </template>
      </div>
    </template>
  </Menubar>
</template>

<style scoped>

</style>
