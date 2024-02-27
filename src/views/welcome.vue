<script setup lang="ts">
// import { ref, onMounted } from 'vue'
// import Card from '@/components/card.vue'
import { store } from '@/store.ts'

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
    <div class="container align-items-center">
      <div class="row d-flex justify-content-center">
        <div class="col-auto">
          <label for="apelido" class="col-form-label">Apelido</label>
        </div>
        <div class="col-auto">
          <input v-model="store.name" type="text" id="apelido" class="form-control shadow-none" aria-describedby="apelidoHelpInline">
        </div>
        <div class="col-auto d-flex align-items-center">
          <span id="apelidoHelpInline" class="form-text">
            Precisa ter entre 3-20 caracteres.
          </span>
        </div>
        <div class="col-auto">
          <router-link class="btn btn-primary" :to="`/r/${id}`">Entrar</router-link>
        </div>
      </div>
    </div> 
  </main>
</template>
<style scoped>
@import url("/css/sign-in.css");

.form-control:focus {
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);
  border-color: #495057;
  outline: 0;
  box-shadow: none;
}
</style>



