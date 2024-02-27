import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vono from '@vonojs/vono'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": `${resolve(__dirname, 'src')}/`,
      "~/": `${resolve(__dirname, 'node_modules')}/`
    },
  },
  plugins: [vue(), vono()],
})