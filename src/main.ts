import { createApp } from 'vue'
import { router } from '@/router'
import '@/assets/main.scss'
import app from '@/app.vue'
import 'bootstrap'
import { store } from '@/store'

try {
  if ('user' in store) console.log(store.user)
  else console.log('No user info')
} catch (error) {
  console.error('Error: ', error)  
}

createApp(app)
  .use(router)
  .mount('#app')
