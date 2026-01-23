import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-cname',
      buildEnd() {
        // Copy CNAME file to dist directory
        copyFileSync(
          resolve(__dirname, 'CNAME'),
          resolve(__dirname, 'dist', 'CNAME')
        )
      }
    }
  ],
  base: './', // Use relative path for GitHub Pages deployment
})
