<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

// const { $supabase } = useNuxtApp()
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const userStore = useUserStore()

const login = async () => {
  await userStore.login(email.value, password.value)
}
</script>

<template>
  <div class="w-full max-w-md rounded bg-gray-800 p-8 shadow-md">
    <h1 class="mb-6 text-center text-2xl font-bold text-white">Login1</h1>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="email" class="mb-2 block text-white">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
          class="w-full rounded bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div class="mb-6">
        <label for="password" class="mb-2 block text-white">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
          required
          class="w-full rounded bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        class="w-full rounded bg-blue-500 py-2 text-white transition duration-300 hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  </div>
</template>
