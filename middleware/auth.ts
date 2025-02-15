import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from 'nuxt/app'
// import { useSupabase } from '../composables/useSupabase.ts'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // const supabase = useSupabase()
  const supabase = useSupabaseClient()

  // 檢查用戶是否已經登入
  const { data: { user } } = await supabase.auth.getUser()

  // 如果用戶已經登入，並且嘗試訪問登入或註冊頁面，則重新導向到首頁
  if (user && (to.path === '/user/login' || to.path === '/user/register')) {
    return navigateTo('/post') // 或者 navigateTo('/dashboard')
  }
})
