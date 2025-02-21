<script setup lang="ts">
const isModalOpen = ref(false)
const postContent = ref('')

const openPostModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  postContent.value = '' // 清空編輯器內容
}

const submitPost = () => {
  // 在這裡處理發布文字的邏輯
  console.log('Post content:', postContent.value)
  closeModal()
}

const test = ref('HELLO')
</script>

<template>
  <div class="flex-1">
    <div class="flex-1">
      <h2 class="mb-4 text-center text-xl font-bold text-white">Posts - index</h2>
      <div class="flex min-h-screen justify-center bg-gray-900 p-4">
        <div class="w-full max-w-2xl rounded-[30px] bg-gray-800 p-6 shadow-lg">
          <Posts :fetchType="'all'" />
        </div>
      </div>
    </div>

    <button
      @click="openPostModal"
      class="fixed right-[25px] bottom-[25px] h-[50px] w-[50px] cursor-pointer rounded-full bg-gray-200 text-4xl text-gray-900"
    >
      +
    </button>
    <div v-if="isModalOpen" class="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div class="modal-container w-full max-w-md rounded bg-gray-800 p-5 shadow-lg">
        <Editor />
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  animation: bounceIn 0.5s;
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
