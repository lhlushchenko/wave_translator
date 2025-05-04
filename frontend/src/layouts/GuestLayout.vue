<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
</script>

<template>
  <div class="guest-layout">
    <AppHeader />
    <main class="min-h-[calc(100vh-160px)] px-4 py-8">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>

</style>
