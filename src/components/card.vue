<script setup lang="ts">
import { ref } from 'vue'
import { store } from '@/store'

const emit = defineEmits(['flipped'])

const props = defineProps<{
  word?: string;
  type?: string;
  flipped?: boolean;
}>()

const flip = ref(props.flipped || false)

// watchEffect(() => {
//   flip.value = props.flipped
// })

const toggleFlip = () => {
  if (store.team !== store.turn || store.role === 'spy') return

  flip.value = !flip.value
  emit('flipped', flip.value)

  if (store.turn === 'red' && (props.type === 'azul' || props.type === 'branca')) store.turn = 'blue'
  else if (store.turn === 'blue' && (props.type === 'vermelha' || props.type === 'branca')) store.turn = 'red'

  if (store.turn === 'blue') document.body.style.backgroundColor = '#333A73'
  else if (store.turn === 'red') document.body.style.backgroundColor = '#FF8080'
}
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
    @click="toggleFlip"
  >
    <div class="card-body">
      <h6 class="card-title">{{ word }}</h6>
    </div>
  </div>
</template>
<style scoped>
/* .color-section {
  color: v-bind('sectionColor');
} */
</style>
