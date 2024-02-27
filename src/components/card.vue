<script setup lang="ts">
import { ref } from "vue";
import { store } from "@/store";

const flipped = ref(false);

defineProps<{
  word?: string;
  type?: string;
}>();
</script>
<template>
  <div
    class="card"
    style="width: 18rem; height: 10rem"
    :class="{ 
      'text-bg-primary': (type === 'azul' && flipped) || (store.role === 'spy' && type === 'azul'),
      'text-bg-danger': (type === 'vermelha' && flipped) || (store.role === 'spy' && type === 'vermelha'),
      'text-bg-light': (type === 'branca' && flipped) || (store.role === 'spy' && type === 'branca'),
      'text-bg-info': (type === 'preta' && flipped) || (store.role === 'spy' && type === 'preta'),
    }"
  >
    <div class="card-body">
      <h5 class="card-title">{{ word }}</h5>
      <a href="javascript:void(0)" class="stretched-link" @click="flipped = !flipped"></a>
    </div>
  </div>
</template>
