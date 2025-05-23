import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',  // This enables DOM globals like document/window
    globals: true,         // Allows `test` and `expect` globally
   setupFiles: './vitest.setup.js' // optional, if you have setup files
  },
})
