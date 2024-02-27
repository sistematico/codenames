import { reactive } from 'vue'

export const store = reactive({
  name: '',
  team: '',
  role: '',
  turn: 'red',
  login: function(session: number, username: string) {
    localStorage.setItem("user", JSON.stringify({ session, username }));
  },
  logout: function() {
    const session = localStorage.getItem('user')
    if (session) localStorage.removeItem('user')
  } 
})