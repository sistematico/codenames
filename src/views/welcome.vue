<script setup lang="ts">
// import { ref, onMounted } from 'vue'
// import Card from '@/components/card.vue'
// import { store } from '@/store.ts'

// async function ping() {
//   const response = await fetch('/ping')
//   const data = await response.text()
//   alert(data)
// }

// const hits = ref('')

// async function hit() {
//   const response = await fetch('/hit')
//   hits.value = await response.text()
// }

// onMounted(async () => { 
//   await hit()
// })

// const id = Math.random().toString(16).slice(-6)
const id = Math.random().toString(36).slice(-6)


</script>
<template>
  <main class="form-signin w-100 m-auto">    
    <router-link :to="`/r/${id}`">Entrar</router-link>
  </main>
</template>
<style>
@import url("/css/sign-in.css");
</style>



