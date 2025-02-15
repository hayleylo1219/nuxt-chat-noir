<script setup lang="ts">
import { ref, watch } from 'vue'
import useOpenGraph from '../composables/useOpenGraphData'

interface LinkPreview {
  title?: string
  description?: string
  image?: string
  link?: string
}

// const { $supabase } = useNuxtApp()
const supabase = useSupabaseClient()

const postContent = ref('')
const linkPreview = ref<LinkPreview | null>(null)

const handleInput = async () => {
  const urlPattern = /https?:\/\/[^\s]+/g
  const urls = postContent.value.match(urlPattern)

  if (urls) {
    const url = urls[0]
    const previewData = await useOpenGraph(url)
    if (previewData) {
      linkPreview.value = previewData
    }
  } else {
    linkPreview.value = null
  }
}

const clearContent = () => {
  postContent.value = ''
  linkPreview.value = null
}

const submitPost = async () => {
  // const user = $supabase.auth.user()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // const { data, error } = await supabase.from('post').insert([
  //   {
  //     user_id: user.id,
  //     content: postContent.value,
  //     links: JSON.stringify(linkPreview.value?.link),
  //     show_link_preview: false,
  //   },
  // ])
  const response = await fetch('/api/post/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      authorId: user.id,
      content: postContent.value,
      // links: JSON.stringify(linkPreview.value?.link),
      // show_link_preview: false,
    }),
  })
  const data = await response.json()
  const error = !response.ok ? data : null

  if (error) {
    console.error('Error creating post:', error)
  } else {
    console.log('Post created:', data)
    clearContent()
  }
}
</script>

<template>
  <!-- 編輯器 -->
  <h3 class="mr-[-20px] mb-4 ml-[-20px] border-b border-gray-500 pb-4 text-center text-[16px] font-bold text-white">
    Post
  </h3>
  <!-- 使用者資訊 -->
  <div class="mb-2 flex flex-1 items-center">
    <div
      class="mr-2 h-[40px] w-[40px] rounded-[50%] bg-cover bg-center"
      :style="{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSylO_3zdKN4TEd2AWpUMTzqeNT1u1Z2Z2yJA&s')`,
      }"
    ></div>
    <div class="font-bold">kacaty123</div>
  </div>
  <textarea
    v-model="postContent"
    @input="handleInput"
    placeholder="Write your post here... Paste a URL to see a preview."
    class="h-32 w-full rounded bg-gray-700 p-2 text-sm text-white focus:ring-2 focus:ring-gray-400 focus:outline-none"
  ></textarea>
  <!-- 工具列 TODO: -->
  <!-- 連結預覽區 -->
  <div v-if="linkPreview" class="mt-4">
    <a :href="linkPreview.link" target="_blank">
      <div class="overflow-hidden rounded-sm border border-gray-500">
        <div
          class="mb-2 h-[100px] w-full rounded bg-cover bg-center"
          :style="{ backgroundImage: `url(${linkPreview.image})` }"
        ></div>
        <p class="p-2 text-sm text-white">{{ linkPreview.title }}</p>
        <p class="p-2 text-xs text-gray-400">{{ linkPreview.description }}</p>
      </div>
    </a>
  </div>
  <div class="mt-4 flex justify-end">
    <button @click="clearContent" class="mr-2 text-gray-400 hover:text-gray-200">Cancel</button>
    <button
      @click="submitPost"
      class="w-[100px] cursor-pointer rounded-[25px] bg-blue-500 px-4 py-2 text-sm text-white transition duration-300 hover:bg-blue-600"
    >
      Post
    </button>
  </div>
</template>
