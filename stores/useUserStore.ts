export const useUserStore = defineStore('user', () => {
  const userInfo = ref<any>(null)
  const supabase = useSupabaseClient()

  async function getUserInfo() {
    if (userInfo.value) return userInfo.value
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  }

  async function login(email:string, password:string) {    
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) {
        console.error('Error logging in:', error.message)
      } else {
        userInfo.value = user
        console.log(userInfo.value)
        navigateTo('/post')
      }
  }

  async function logout() {
    await supabase.auth.signOut();
    navigateTo('/user/login')
  }

  return { userInfo, getUserInfo, login, logout }
})