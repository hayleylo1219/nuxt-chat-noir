<script setup lang="ts">
// const { $supabase } = useNuxtApp()
const supabase = useSupabaseClient()

definePageMeta({
  middleware: 'auth',
})
const account = ref<string>('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// 使用 Email 註冊
const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  // TODO: 確認用戶名是否重複

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        show_name: account.value,
      },
    },
  })
  console.log('user:', data)
  if (error) {
  } else {
    await fetch('/api/user/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: data?.user?.id,
        name: account.value,
        email: email.value,
      }),
    })
    // 註冊成功後重新導向到登入頁面或其他頁面
    navigateTo('/user/login')
  }
}

// Google 登入
// const signInWithGoogle = async () => {
//   const { user, error } = await $supabase.auth.signInWithOAuth({
//     provider: 'google',
//   })
//   if (error) console.error(error)
// }
</script>

<template>
  <div class="w-full max-w-md rounded bg-gray-800 p-8 shadow-md">
    <h1 class="mb-6 text-center text-2xl font-bold text-white">Register</h1>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label for="account" class="mb-2 block text-white">Account</label>
        <input
          v-model.trim="account"
          type="text"
          placeholder="Enter your account"
          required
          class="w-full rounded bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="mb-2 block text-white">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
          class="w-full rounded bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div class="mb-4">
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
      <div class="mb-6">
        <label for="confirmPassword" class="mb-2 block text-white">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          required
          class="w-full rounded bg-gray-700 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        class="w-full rounded bg-blue-500 py-2 text-white transition duration-300 hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  </div>
</template>
