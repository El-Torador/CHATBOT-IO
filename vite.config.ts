import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.WEATHER_API || 'https://api.ambeedata.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/deepl': {
        target: process.env.DEEPL_API || 'https://api-free.deepl.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/deepl/, ''),
      },
      '/rappid': {
        target: process.env.RAPID_API || 'https://twinword-word-graph-dictionary.p.rapidapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rappid/, ''),
      },
    },
  },
})