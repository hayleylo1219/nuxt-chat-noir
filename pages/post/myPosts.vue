<script setup lang="ts"></script>

<template>
  <div class="flex-1">
    <h2 class="mb-4 text-center text-xl font-bold text-white">My Posts</h2>
    <div class="flex min-h-screen justify-center bg-gray-900 p-4">
      <div class="w-full max-w-2xl rounded-[30px] bg-gray-800 p-6 shadow-lg">
        <Posts :fetchType="'user'" />
      </div>
    </div>
  </div>
</template>
