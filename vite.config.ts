import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.ambeedata.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/deepl': {
        target: 'https://api-free.deepl.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/deepl/, ''),
      },
      '/rappid': {
        target: 'https://twinword-word-graph-dictionary.p.rapidapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rappid/, ''),
      },
    },
  },
})