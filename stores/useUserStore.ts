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

  async function setUserInfo(user_id:string) {
    await $fetch('/api/user/get', {
      method: 'POST',
      body: { user_id }
    }).then((res) => {
      userInfo.value = res[0]
    return userInfo.value
    })
  }

  async function login(email:string, password:string) {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) {
        console.error('Error logging in:', error.message)
      } else {
        navigateTo('/post')
        return user
      }
  }

  async function logout() {
    await supabase.auth.signOut();
    navigateTo('/user/login')
  }

  return { userInfo, getUserInfo, setUserInfo, login, logout }
})