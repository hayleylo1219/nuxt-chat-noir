export const usePostStore = defineStore('post', () => {

  const posts = ref([])

  async function getPosts(fetchType: 'all' | 'user') {

    const userStore = useUserStore()
    const $user = await userStore.getUserInfo()
  
    const fetchUrl = fetchType === 'all' ? '/api/post/get' : `/api/post/get?user_id=${$user?.id}`
  
    if ($user) {
      console.log('innnnnnnn')
      const response = await fetch(fetchUrl)
      const data = await response.json()
      console.log('data:', data)
      posts.value = data
      return data
    }
  }

  return {getPosts, posts}
})