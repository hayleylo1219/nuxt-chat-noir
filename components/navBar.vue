<template>
  <div>{{ prop.test1 }}</div>
  <!-- <div>{{ prop.test2 }}</div> -->
  <button @click="handleChange('???????????')">change</button>
  <!-- <input :value="prop.test2" @input="handleChange2($event)" /> -->
  <input type="text" v-model="test2" />
</template>

<script setup lang="ts">
// const test1 = defineModel('test1', { type: String, default: '????' })
// const test2 = defineModel('test2')
interface Prop {
  test1: string
  // test2: string
}

const prop = defineProps<Prop>()

const emits = defineEmits(['update:test1', 'update:test2'])

const handleChange = (newVal: string) => {
  emits('update:test1', newVal)
}

// const handleChange2 = $event => {
//   emits('update:test2', $event.target.value)
// }

const test2 = defineModel('test2', { type: String, default: 'MUKI space' })
</script>
