<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Card from '@/components/card.vue'
import { store } from '@/store.ts'

type CardType = 'branca' | 'preta' | 'azul' | 'vermelha';

interface Word {
  text: string;
  type?: CardType; // Tipo opcional inicialmente, pois será atribuído depois
}

const route = useRoute()
const hint = ref(''), shint = ref(''), flipped = ref(false)

const url = `${import.meta.env.VITE_APP_URL}/json/words.json` // Substitua pela URL do seu JSON
const selectedWords = ref<Word[]>([]);

async function getWords(): Promise<Word[]> {
  const data = await(await fetch(url)).json()
  return data.words.map((text: string) => ({ text, type: 'branca' })); // 'branca' é um placeholder aqui
}

function pickRandomWords(words: Word[], count: number): Word[] {
  const shuffled = words.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function assignCardTypes(words: Word[]): Word[] {
  const types: CardType[] = ['preta', ...Array(5).fill('branca'), ...Array(9).fill('azul'), ...Array(9).fill('vermelha')]
  const shuffledTypes = types.sort(() => 0.5 - Math.random())
  return words.map((word, index) => ({ ...word, type: shuffledTypes[index] }))
}

async function initializeGame() {
  const response = await getWords()
  const randomWords = pickRandomWords(response, 25)
  const wordsWithTypes = assignCardTypes(randomWords)
  selectedWords.value = wordsWithTypes
}

const shuffleCards = () => initializeGame()

const become = (role: string) => {
  if (store.role !== 'spy') store.role = role
}

async function sendHint() {
  shint.value = hint.value
  hint.value = ''
}

onMounted(() => { 
  initializeGame()

  alert(route.params.id)
})
</script>
<template>
  <div class="container">
    <div class="row">
      
      <div class="col-12" v-if="shint !== ''">
        <div class="alert alert-secondary text-center" role="alert">
          <h2>{{ shint }}</h2>
        </div>
      </div>

      <div class="col-12 mb-2" v-else>
        <div class="input-group mb-3">
          <input v-model="hint" type="text" class="form-control shadow-none border-0" placeholder="Dê uma pista">
          <button class="btn btn-warning" @click.prevent="sendHint">Enviar</button>
        </div>
      </div>


      <div class="col mb-2">
        <button class="btn btn-danger me-2" @click="shuffleCards">Embaralhar</button>
        <button class="btn btn-danger me-2" @click="become('spy')">Spymaster</button>
        <button class="btn btn-danger" @click="become('agent')" :disabled="store.role === 'spy'">Agent</button>
      </div>
    </div>
    <div class="row row-cols-5 g-4">
      <div class="col" v-for="word in selectedWords" :key="word.text">
        <Card :word="word.text" :type="word.type" :flipped="flipped" />
      </div>
    </div>
  </div>
</template>
<style>
@import url("/css/sign-in.css");
</style>



