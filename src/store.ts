import { reactive } from 'vue'

export const store = reactive({
  name: '',
  team: '',
  role: '',
  turn: 'red'
})