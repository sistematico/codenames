<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Card from '@/components/card.vue'
import { store } from '@/store.ts'

type CardType = 'branca' | 'preta' | 'azul' | 'vermelha';

interface Word {
  text: string;
  type?: CardType; // Tipo opcional inicialmente, pois será atribuído depois
}

const url = `${import.meta.env.VITE_APP_URL}/json/words.json` // Substitua pela URL do seu JSON
const selectedWords = ref<Word[]>([]);

async function getWords(): Promise<Word[]> {
  const data = await(await fetch(url)).json()
  // const words: Word[] = await data.json();
  // return words;
  return data.words.map((text: string) => ({ text, type: 'branca' })); // 'branca' é um placeholder aqui
}

function pickRandomWords(words: Word[], count: number): Word[] {
  const shuffled = words.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function assignCardTypes(words: Word[]): Word[] {
  const types: CardType[] = ['preta', ...Array(5).fill('branca'), ...Array(9).fill('azul'), ...Array(9).fill('vermelha')];
  const shuffledTypes = types.sort(() => 0.5 - Math.random());
  return words.map((word, index) => ({
    ...word,
    type: shuffledTypes[index]
  }));
}

async function initializeGame() {
  const response = await getWords();
  console.log(response)
  const randomWords = pickRandomWords(response, 25);
  const wordsWithTypes = assignCardTypes(randomWords);
  selectedWords.value = wordsWithTypes;
}

// Descomente para inicializar o jogo automaticamente ao carregar o componente
// onMounted(initializeGame);


// Embaralha as cartas ao montar o componente
onMounted(initializeGame);

// // Método para embaralhar as cartas novamente
const shuffleCards = () => {
  // assignCardTypes();
  initializeGame()
};

const become = (role: string) => {
  if (store.role !== 'spy') store.role = role
};
</script>
<template>
  <main class="form-signin w-100 m-auto">    

    <!-- <form>
      <img class="mb-4" src="/img/favicon.png" alt="" width="72" height="72">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
      </div>

      <div class="form-check text-start my-3">
        <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
        <label class="form-check-label" for="flexCheckDefault">
          Remember me
        </label>
      </div>
      <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
    </form> -->

  
  <div class="container">
    <div class="row">
      <div class="col mb-2">
        <button class="btn btn-danger me-2" @click="shuffleCards">Embaralhar</button>
        <button class="btn btn-danger me-2" @click="become('spy')">Spymaster</button>
        <button class="btn btn-danger" @click="become('agent')" :disabled="store.role === 'spy'">Agent</button>
      </div>
    </div>
    <div class="row row-cols-5 g-4">
      <div class="col" v-for="word in selectedWords" :key="word.text">
        <Card :word="word.text" :type="word.type" />
      </div>
    </div>
  </div>


  <!-- <div>
    <h2>Palavras Codenames</h2>
    
    <ul>
      <li v-for="word in words" :key="word.text">
        {{ word.text }} - {{ word.session }} - {{ word.type }}
      </li>
    </ul>
  </div> -->

  </main>
</template>
<style>
@import url("/css/sign-in.css");
</style>



