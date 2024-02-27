<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Card from '@/components/card.vue'
import { store } from '@/store'
import { shuffleArray, assignCardTypes } from '@/logics/game'

type CardType = 'branca' | 'preta' | 'azul' | 'vermelha';

interface Word {
  id: number;
  text: string;
  type?: CardType; // Tipo opcional inicialmente, pois será atribuído depois
  flipped?: boolean;
}

const route = useRoute()
const router = useRouter()

if (!route.params.id) router.push('/')

const gameSessionId = route.params.id, hint = ref(''), hintLen = ref(0), shint = ref(''), flipped = ref(false), url = `${import.meta.env.VITE_APP_URL}/json/words.json` // Substitua pela URL do seu JSON
const selectedWords = ref<Word[]>([])
let bgColor = 'red'

async function getWords(): Promise<Word[]> {
  let i = 0
  const data = await(await fetch(url)).json()
  return data.words.map((text: string) => ({ id: ++i, text, type: 'branca' })); // 'branca' é um placeholder aqui
}

function pickRandomWords(words: Word[], count: number): Word[] {
  const shuffled = shuffleArray(words); // Embaralha usando Fisher-Yates
  return shuffled.slice(0, count);
}

async function initializeGame() {
  const response = await getWords()
  const randomWords = pickRandomWords(response, 25)
  const wordsWithTypes = assignCardTypes(randomWords)
  selectedWords.value = wordsWithTypes
  flipped.value = false
}

const become = (role: string) => {
  if (store.role !== 'spy') store.role = role
}

async function sendHint() {
  if (hint.value.length < 3) return
  shint.value = hint.value

  await fetch('/hint/add', {
    method: 'POST',
    body: JSON.stringify({ sess: gameSessionId, hint: hint.value, len: hintLen.value })
  })

  hint.value = ''
}

function handleFlip(index: number, flipped: boolean) {
  selectedWords.value[index].flipped = flipped
}

function toggleTeam(team: string) {
  if (store.role === 'spy') return
  store.changeTeam(team)
}

onMounted(() => { 
  console.log(gameSessionId)
  initializeGame()
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


        <div class="row">
          <div class="col-auto">
            <select v-model="hintLen" id="hintlen" class="form-select shadow-none">
              <option value="-1" selected>∞</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div class="col">
            <div class="d-flex">
              <input v-model="hint" id="hint" type="text" class="form-control shadow-none border-0" placeholder="Dê uma pista" />
              <button class="btn btn-warning" @click.prevent="sendHint">Enviar</button>          
            </div>
        </div>
      </div>
      </div>

      <div class="col-12 mb-2">
        <div class="d-flex justify-content-around">
          <div
            class="card text-bg-danger"
            style="width: 8rem; height: 6rem; cursor: pointer;"    
            @click="toggleTeam('red')"
          >
            <div class="card-body">
              <h6 class="card-title">Time Vermelho</h6>
            </div>
          </div>
          <div
            class="card text-bg-primary"
            style="width: 8rem; height: 6rem; cursor: pointer;"    
            @click="toggleTeam('blue')"
          >
            <div class="card-body">
              <h6 class="card-title">Time Azul</h6>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 mb-2">
        <div class="d-flex justify-content-around">
          <button class="btn btn-info me-2" @click="initializeGame">Embaralhar</button>
          <button class="btn btn-success me-2" @click="become('spy')">Spymaster</button>
          <button class="btn btn-primary" @click="become('agent')" :disabled="store.role === 'spy'">Agent</button>
        </div>
      </div>

    </div>

    <div class="row row-cols-5 g-4">
      <div class="col" v-for="(word, index) in selectedWords" :key="word.id">
        <Card :word="word.text" :type="word.type" :flipped="word.flipped" @flipped="handleFlip(index, $event)" />
      </div>
    </div>
    <div class="row">
      {{ store.turn }}
    </div>
  </div>
</template>
<style lang="scss">
@import "/css/sign-in.css";

// :root {
//   --main-color: #05c;
//   --accent-color: #056;
//   // --bs-body-bg: 'red';
// }


// html, body {
//   background-color: v-bind('bgColor') !important;
// }
</style>



