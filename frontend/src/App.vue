<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import AppToast from '@/components/AppToast.vue'

  const route = useRoute()
  console.log(route)
</script>

<template>
<!--  <component :is="route.meta.layout || 'div'">-->
    <RouterView />
<!--  </component>-->
  <AppToast />
</template>

<style scoped></style>
