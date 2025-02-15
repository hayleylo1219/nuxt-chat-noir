<script setup lang="ts">
interface Like {
  id: string
  user_id: string
  post_id: string
}

interface Post {
  id: string
  content: string
  links: string
  createdAt: string
  likes: Array<Like>
  author: {
    name: string
  }
}

// const { $supabase } = useNuxtApp()
const supabase = useSupabaseClient()

const posts = ref<Post[]>()
const postStore = usePostStore()

const $props = defineProps<{
  fetchType: 'all' | 'user'
}>()

const fetchUserPosts = async () => {
  posts.value = await postStore.getPosts($props.fetchType)
}

const formatContent = (content: string) => {
  return content.replace(/\n/g, '<br class="mb-2" />')
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString()
}

// 監聽 Supabase Realtime
const channel = supabase
  .channel('realtime-likes')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'likes' }, () => {
    console.log('偵測到新讚數，重新取得資料')
    fetchUserPosts() // 重新取得資料
  })

watchEffect(async () => {
  await fetchUserPosts()
})

// onMounted(async () => {
//   channel.subscribe() // 啟動監聽
// })

// onUnmounted(() => {
//   channel.unsubscribe() // 停止監聽
// })
</script>

<template>
  <div v-if="posts">
    <div v-for="post in posts" :key="post.id" class="mx-[-24px] border-b border-gray-500 last:border-0">
      <div class="p-6">
        <!-- 使用者資訊 -->
        <div class="mb-2 flex flex-1 items-center">
          <div
            class="mr-2 h-[40px] w-[40px] rounded-[50%] bg-cover bg-center"
            :style="{
              backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSylO_3zdKN4TEd2AWpUMTzqeNT1u1Z2Z2yJA&s')`,
            }"
          ></div>
          <div class="font-bold">{{ post.author.name }}</div>
          <p class="mt-1 ml-3 text-sm text-gray-500">{{ formatDate(post.createdAt) }}</p>
        </div>
        <div class="pl-[50px]">
          <p v-html="formatContent(post.content)" class="text-white"></p>
          <div v-if="post.links" class="mt-2">
            <div v-for="(link, index) in JSON.parse(post.links)" :key="index" class="flex items-center space-x-2">
              <a :href="link.url" target="_blank" class="text-blue-500 hover:underline">{{ link.url }}</a>
              <span v-if="link.showPreview" class="text-gray-400">(Preview)</span>
            </div>
          </div>
          <ToolBar :likes="post.likes" :postId="post.id" class="mt-5" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-white">No posts found.</p>
  </div>
</template>

<style scoped></style>
