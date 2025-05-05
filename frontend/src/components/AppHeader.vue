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
        { label: 'Перекладач', icon: 'pi pi-book', to: '/' },
        { label: 'Історія', icon: 'pi pi-history', to: '/history' },
        { label: 'Кабінет', icon: 'pi pi-user', to: '/profile' },
      ]
      : []
  })

  const logout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }
</script>

<template>
  <header class="p-2">
    <Menubar :model="menuItems">
      <template #start>
        <RouterLink class="mr-6" to="/">
          <img class="h-[70px]" src="/img/logo.svg" alt="WaveTranslation" />
        </RouterLink>
      </template>
      <template #item="{ item }">
        <RouterLink class="p-2 flex items-center" :to="item.to">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </RouterLink>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <template v-if="isAuthenticated">
            <RouterLink to="/profile">
              <Avatar icon="pi pi-user" shape="circle" class="mr-2" />
            </RouterLink>
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
  </header>
</template>
