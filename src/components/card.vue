<script setup lang="ts">
import { ref } from 'vue'
import { store } from '@/store'

const flip = ref(false)

const props = defineProps<{
  word?: string;
  type?: string;
  flipped?: boolean;
}>()
</script>
<template>
  <div
    class="card"
    style="min-width: 8rem; min-height: 6rem"
    :class="{ 
      'text-bg-primary': (props.type === 'azul' && flip) || (store.role === 'spy' && props.type === 'azul'),
      'text-bg-danger': (props.type === 'vermelha' && flip) || (store.role === 'spy' && props.type === 'vermelha'),
      'text-bg-light': (props.type === 'branca' && flip) || (store.role === 'spy' && props.type === 'branca'),
      'text-bg-dark': (props.type === 'preta' && flip) || (store.role === 'spy' && props.type === 'preta'),
    }"
  >
    <div class="card-body">
      <h6 class="card-title">{{ word }}</h6>
      <a href="javascript:void(0)" class="stretched-link" @click="flip = !flip"></a>
    </div>
  </div>
</template>
