type CardType = 'branca' | 'preta' | 'azul' | 'vermelha';

interface Word {
  id: number;
  text: string;
  type?: CardType; // Tipo opcional inicialmente, pois será atribuído depois
  flipped?: boolean;
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Troca elementos
  }
  return array;
}

export function assignCardTypes(words: Word[]): Word[] {
  const types: CardType[] = ['preta', ...Array(6).fill('branca'), ...Array(9).fill('azul'), ...Array(9).fill('vermelha')];
  const shuffledTypes = shuffleArray(types); // Usa o algoritmo de Fisher-Yates para embaralhar
  return words.map((word, index) => ({ ...word, type: shuffledTypes[index], flipped: false }));
}