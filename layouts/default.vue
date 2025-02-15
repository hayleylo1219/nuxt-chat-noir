<script setup lang="ts">
const userStore = useUserStore()
const logout = async () => {
  await userStore.logout()
}
</script>

<!-- layouts/default.vue -->
<template>
  <div class="flex min-h-screen flex-col bg-gray-900 text-white">
    <!-- 🔹 Navbar -->
    <!-- <nav class="bg-blue-500 p-4 text-white">
      <NuxtLink to="/" class="mr-4">首頁</NuxtLink>
      <NuxtLink to="/about">關於我們</NuxtLink>
    </nav> -->
    <button class="text-white" @click="logout">logout</button>

    <!-- 🔹 頁面內容 -->
    <main class="flex flex-1 items-center justify-center">
      <slot />
      <!-- 這裡會放入各個 `pages/` 的內容 -->
    </main>

    <!-- 🔹 Footer -->
    <footer class="bg-gray-800 p-4 text-center text-white">&copy; 2025 le chat noir</footer>
  </div>
</template>
