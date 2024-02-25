<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Card from '@/components/card.vue'

type CardType = 'branca' | 'preta' | 'azul' | 'vermelha';

interface Word {
  text: string;
  session: number;
  type: CardType;
}

// Supondo que este JSON seja importado ou definido aqui diretamente
const initialWords = [
  "Águia",
  "Castelo",
  "Chocolate",
  "Deserto",
  "Diamante",
  // Adicione mais palavras conforme necessário
];

const sessionWords = ref<Word[]>(initialWords.map((word) => ({
  text: word,
  session: 1,
  type: 'branca' // Tipo inicial padrão, será reatribuído
})));

const words = ref<Word[]>([]);

function assignCardTypes() {
  const totalWords = sessionWords.value.length;
  // Assegura uma distribuição equilibrada de tipos
  const types: CardType[] = [
    'preta', 
    ...Array(Math.max(4, Math.min(6, totalWords - 8))).fill('branca'), 
    ...Array(Math.floor((totalWords - 1) / 2)).fill('azul'), 
    ...Array(Math.ceil((totalWords - 1) / 2)).fill('vermelha')
  ];

  // Embaralha os tipos de forma aleatória
  const shuffledTypes = types.sort(() => 0.5 - Math.random());

  // Associa cada palavra a um tipo
  words.value = sessionWords.value.map((word, index) => ({
    ...word,
    type: shuffledTypes[index] || 'branca' // Por precaução
  }));
}

// function pickRandomWords(words: Word[], count: number): Word[] {
//   const shuffled = words.sort(() => 0.5 - Math.random());
//   return shuffled.slice(0, count);
// }

// function initializeGame() {
//   const randomWords = pickRandomWords(allWords, 25);
//   const wordsWithTypes = assignCardTypes(randomWords);
//   selectedWords.value = wordsWithTypes;
// }

// Embaralha as cartas ao montar o componente
onMounted(assignCardTypes);

// Método para embaralhar as cartas novamente
const shuffleCards = () => {
  assignCardTypes();
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
      <div class="col">
        <button class="btn btn-danger" @click="shuffleCards">Embaralhar</button>
      </div>
    </div>
    <div class="row row-cols-5 g-4">
      <div class="col" v-for="word in words" :key="word.text">
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



