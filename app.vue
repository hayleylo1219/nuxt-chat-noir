<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Hello Vue 3 + Vite')
</script>

<template>
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
