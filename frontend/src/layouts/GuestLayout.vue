<script setup lang="ts">
  import AppHeader from '@/components/AppHeader.vue';
  import AppFooter from '@/components/AppFooter.vue';
</script>

<template>
  <div class="guest-layout relative h-full">
    <AppHeader />
    <main class="px-4 py-8">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>

</style>
