<script setup lang="ts">
// definePageMeta({
//   middleware: 'is-admin',
// })

const items = ref([
  { title: 'Item 1', enabled: true },
  { title: 'Item 2', enabled: false },
  { title: 'Item 3', enabled: true },
])

// const supabase = useSupabaseClient()

// onMounted(async () => {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()
//   console.log(user)
//   const response = await fetch('/api/user/get')
//   console.log(response)
// })
</script>
<template>
  <h1>監控台</h1>
  <ul v-for="item in items">
    <li v-if="item.enabled">{{ item.title }}</li>
  </ul>
</template>
