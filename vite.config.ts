import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // 6001 rather than 6000: browsers treat 6000 as X11 and refuse it outright
    // with ERR_UNSAFE_PORT. `strictPort` makes a busy port an error instead of
    // a silent shift to the next one, so the address never moves.
    port: 6001,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.md'],
})
