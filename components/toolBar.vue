<script setup lang="ts">
interface Like {
  id: string
  user_id: string
  post_id: string
}
const $props = defineProps<{
  likes: Array<Like>
  postId: string
}>()

const supabase = useSupabaseClient()

const likePost = async (postId: string) => {
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) {
    console.error('User not authenticated', error)
    return
  }

  const response = await fetch('/api/post/like', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ post_id: postId, user_id: data.user.id }),
  })
  const responseData = await response.json()
  if (response.ok) {
    console.log('Post liked:', responseData)
  } else {
    console.error('Error liking post:', responseData.error)
  }
}
</script>

<template>
  <div class="flex flex-1 items-center gap-4 text-gray-400">
    <div @click="likePost($props.postId)" class="cursor-pointer">
      <span class="mr-1">喜歡</span>
      <span>{{ $props.likes.length }}</span>
    </div>
    <div class="cursor-pointer">
      <span class="mr-1">留言</span>
      <span>1</span>
    </div>
    <div class="cursor-pointer">
      <span class="mr-1">分享</span>
      <span>1</span>
    </div>
    <div class="cursor-pointer">
      <span class="mr-1">收藏</span>
      <span>1</span>
    </div>
  </div>
</template>
